import torch
from diffusers import StableDiffusionPipeline
from PIL import Image

class SDLoRAModel:
    def __init__(self, lora_repo_id=None):
        """
        lora_repo_id: the HuggingFace repo ID of the LoRA weights.
        If None, we just use base Stable Diffusion without any LoRA.
        """
        print("Loading Stable Diffusion 1.5...")
        
        # Check if GPU is available
        # cuda = NVIDIA GPU, mps = Apple GPU, cpu = no GPU
        if torch.cuda.is_available():
            self.device = "cuda"
        else:
            self.device = "cpu"
            
        print(f"Running on: {self.device.upper()}")
        
        # float16 uses less memory on GPU, float32 for CPU
        self.dtype = torch.float16 if self.device == "cuda" else torch.float32
        
        # Load the model from HuggingFace
        # This downloads ~4GB on first run, then it is cached
        self.pipe = StableDiffusionPipeline.from_pretrained(
            "runwayml/stable-diffusion-v1-5",
            torch_dtype=self.dtype,
            safety_checker=None,
            requires_safety_checker=False
        )
        
        # Load LoRA weights if provided
        if lora_repo_id:
            print(f"Loading LoRA from: {lora_repo_id}")
            self.pipe.load_lora_weights(lora_repo_id)
            print("LoRA loaded!")
        
        # Move model to GPU or CPU
        self.pipe = self.pipe.to(self.device)
        
        # This saves memory by processing in smaller chunks
        self.pipe.enable_attention_slicing()
        
        print("Stable Diffusion ready!")

    def generate(self, prompt, num_steps=20, guidance_scale=7.5, width=512, height=512):
        """
        Generates an image from a text prompt.
        
        prompt:         what you want to generate
        num_steps:      how many steps to refine the image
                        more steps = better quality but slower
                        20 is a good balance
        guidance_scale: how strictly to follow the prompt
                        7.5 is default, higher = follows prompt more
        width, height:  size of output image in pixels
        """
        print(f"Generating: {prompt}")
        
        with torch.no_grad():
            result = self.pipe(
                prompt=prompt,
                num_inference_steps=num_steps,
                guidance_scale=guidance_scale,
                width=width,
                height=height
            )
        
        image = result.images[0]
        print("Image generated!")
        return image
