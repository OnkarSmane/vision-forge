# 🌸 VisionForge — Text to Image Generator

A full-stack Generative AI web application that generates images from text prompts using Stable Diffusion + LoRA and a custom CGAN with attention layers.

## 🚀 Features
- Text to image generation using Stable Diffusion 1.5 + LoRA
- Custom CGAN with self-attention and cross-attention layers
- CLIP text encoder for prompt understanding
- Oxford-102 Flowers dataset analysis
- FastAPI backend + React frontend

## 🛠️ Tech Stack
- **Frontend:** React 18, Tailwind CSS, Axios
- **Backend:** FastAPI, Python
- **ML Models:** Stable Diffusion 1.5, LoRA, PyTorch CGAN
- **Text Encoder:** OpenAI CLIP
- **Dataset:** Oxford-102 Flowers

## 📁 Project Structure

vision-forge/
backend/
models/
sd_lora.py        # Stable Diffusion + LoRA
cgan.py           # Custom CGAN with attention
text_encoder.py   # CLIP text encoder
utils/
image_utils.py    # Image processing
main.py             # FastAPI server
frontend/
src/
App.js            # Main React app
App.css           # Styles
notebooks/
01_dataset_eda.py   # Oxford-102 EDA

## ⚙️ How to Run

### Backend (Google Colab)
1. Open Colab with T4 GPU
2. Run the startup cell in the notebook
3. Copy the ngrok URL

### Frontend (Local)
```bash
cd vision-forge-frontend
npm install
npm start
```

## 📊 Dataset
Oxford-102 Flowers — 102 classes, 8189 images
[Google Drive Link](#)

## 👨‍💻 Built by
Onkar Mane — SVKM's NMIMS 2026