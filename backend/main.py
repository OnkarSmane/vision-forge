import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from models.sd_lora import SDLoRAModel
from models.text_encoder import TextEncoder
from utils.image_utils import image_to_base64

load_dotenv()

app = FastAPI(title="VisionForge API")

# This allows the React frontend to talk to this backend
# Without this the browser would block the connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# We load models once when server starts
# Not on every request - that would take forever
sd_model = None
text_encoder = None

@app.on_event("startup")
async def load_models():
    global sd_model, text_encoder
    
    print("Loading models...")
    
    lora_repo = os.getenv("LORA_REPO_ID", None)
    sd_model = SDLoRAModel(lora_repo_id=lora_repo)
    text_encoder = TextEncoder()
    
    print("All models loaded. Server is ready!")

# This defines what the request from frontend looks like
class GenerateRequest(BaseModel):
    prompt: str
    mode: str = "sd"
    num_steps: int = 20
    guidance: float = 7.5

@app.get("/health")
def health_check():
    """
    Simple check to see if server is running.
    Frontend calls this first before doing anything.
    """
    return {
        "status": "ok",
        "models_loaded": sd_model is not None
    }

@app.post("/generate")
async def generate_image(req: GenerateRequest):
    """
    Main endpoint.
    Receives a prompt from frontend.
    Returns a generated image as base64 string.
    """
    if not req.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")
    
    try:
        if req.mode == "sd":
            image = sd_model.generate(
                prompt=req.prompt,
                num_steps=req.num_steps,
                guidance_scale=req.guidance
            )
        else:
            raise HTTPException(status_code=501, detail="CGAN coming on Day 4")
        
        return {
            "image": image_to_base64(image),
            "mode": req.mode,
            "prompt": req.prompt
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
