from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from PIL import Image
import os
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/generated", StaticFiles(directory="../generated"), name="generated")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate-image")
def generate_image():
    os.makedirs("../generated", exist_ok=True)
    img = Image.new("RGB", (256, 256), color=(255, 255, 255))
    img.save("../generated/image.png")
    return {"status": "ok", "message": "Imagen generada"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
