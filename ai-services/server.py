from fastapi import FastAPI
import io
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from PIL import Image
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
GENERATED_DIR = os.path.join(BASE_DIR, "../generated")

from fastapi.staticfiles import StaticFiles

app = FastAPI()
os.makedirs(GENERATED_DIR, exist_ok=True)
app.mount("/generated", StaticFiles(directory=GENERATED_DIR), name="generated")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate-image")
def generate_image():
    os.makedirs(GENERATED_DIR, exist_ok=True)
    img = Image.new("RGB", (256, 256), color=(255, 255, 255))
    img.save(os.path.join(GENERATED_DIR, "image.png"))
    return {"status": "ok", "message": "Imagen generada"}

# --- SEGMENTATION ENDPOINT ---
from fastapi import UploadFile, File
import torch
from torchvision import models, transforms
import numpy as np

SEGMENTED_IMAGE_PATH = os.path.join(GENERATED_DIR, "segmented.png")

def get_dominant_color(image_array):
    pixels = image_array.reshape(-1, 3)
    pixels = pixels[(pixels[:,0] != 0) | (pixels[:,1] != 0) | (pixels[:,2] != 0)]
    if len(pixels) == 0:
        return (0, 0, 0)
    dominant = np.mean(pixels, axis=0).astype(int)
    return tuple(dominant)

model = models.segmentation.deeplabv3_resnet101(pretrained=True).eval()

preprocess = transforms.Compose([
    transforms.Resize((512, 512)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                        std=[0.229, 0.224, 0.225]),
])

@app.post("/segmentar")
async def segmentar(file: UploadFile = File(...)):
    from PIL import Image as PILImage
    contents = await file.read()
    image = PILImage.open(io.BytesIO(contents)).convert("RGB")
    input_tensor = preprocess(image).unsqueeze(0)

    with torch.no_grad():
        output = model(input_tensor)["out"][0]
    output_predictions = output.argmax(0).byte().cpu().numpy()

    person_mask = (output_predictions == 15).astype(np.uint8) * 255
    np_image = np.array(image.resize((512, 512)))
    segmented = np.zeros_like(np_image)
    segmented[person_mask == 255] = np_image[person_mask == 255]

    dominant = get_dominant_color(segmented)
    hex_color = '#%02x%02x%02x' % dominant

    segmented_pil = PILImage.fromarray(segmented)
    segmented_pil.save(SEGMENTED_IMAGE_PATH)

    return {"part": "persona", "dominant_rgb": dominant, "hex": hex_color}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
