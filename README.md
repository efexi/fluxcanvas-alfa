# 📦 fluxcanvas-alfa

> ⚙️ FluxCanvas ALFA — App de escritorio para generación y manipulación multimedia.  
> Usando **Vue 3 + TypeScript + Electron** como frontend y **FastAPI (Python 3.11)** como backend de IA local.

---

## 🧱 ESTRUCTURA

```
fluxcanvas-alfa/
├── ai-services/         # Backend en Python (FastAPI)
├── generated/           # Imágenes y archivos generados
└── desktop/
    └── flux-ui/         # Vue 3 + Electron (TS)
```

---

## 🚀 Requisitos

- Python **3.11.x**
- Node.js **16+**
- npm
- (opcional) [`gh` CLI](https://cli.github.com/) para conectar con GitHub

---

## 🧠 Backend Python (FastAPI)

```bash
cd ai-services

# Crear entorno virtual
python3.11 -m venv .venv
source .venv/bin/activate

# Instalar dependencias
pip install fastapi uvicorn pillow

# Correr el servidor localmente
python server.py
```

Accede a: `http://127.0.0.1:5000/generate-image` para generar una imagen blanca de 256x256.

---

## 💻 Frontend Vue 3 + TypeScript

```bash
cd desktop/flux-ui

# Instalar dependencias
npm install

# Levantar frontend
npm run dev
```

La app estará disponible en `http://localhost:5173`

---

## 🧪 Modo Escritorio (Electron)

> Electron también levanta el backend automáticamente.

```bash
cd desktop/flux-ui
npm run start
```

---

## 🔧 Scripts útiles (pendiente agregar)

```bash
# Lanzar todo en paralelo (en el futuro)
make dev
# o bash start.sh
```

---

## 📂 .gitignore sugerido

```
# Python
ai-services/.venv/

# Node
node_modules/
dist/

# Generados
generated/

# IDE
.vscode/
.idea/
```

---

## ✅ Comprobación funcional

- [x] Click en botón → `GET /generate-image`
- [x] Se genera `generated/image.png`
- [x] App corre en modo web y modo escritorio

---

## ✨ Autor

**Efexi**  
Universo: Dark Link Project, War Fome, LYSA  
💻 https://github.com/efexi