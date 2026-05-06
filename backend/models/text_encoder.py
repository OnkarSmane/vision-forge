import torch
from transformers import CLIPTokenizer, CLIPTextModel

class TextEncoder:
    def __init__(self):
        print("Loading text encoder...")
        
        model_id = "openai/clip-vit-base-patch32"
        
        self.tokenizer = CLIPTokenizer.from_pretrained(model_id)
        self.model = CLIPTextModel.from_pretrained(model_id)
        self.model.eval()
        
        print("Text encoder ready!")

    def encode(self, prompt):
        """
        Takes a text prompt and converts it to numbers.
        
        Example:
        Input:  "a red rose in watercolor style"
        Output: a tensor (matrix of numbers) that the AI understands
        
        Steps:
        1. Tokenizer splits the text into small pieces called tokens
           "watercolor" becomes ["water", "color"]
        2. Each token gets converted to a number
        3. Those numbers go through the neural network
        4. Out comes a matrix of numbers representing the meaning of your text
        """
        inputs = self.tokenizer(
            prompt,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=77
        )
        
        with torch.no_grad():
            outputs = self.model(**inputs)
        
        return outputs.last_hidden_state

    def encode_to_vector(self, prompt):
        """
        Same as encode() but returns a single flat vector instead of a matrix.
        Shape: (1, 512) — 512 numbers representing your entire prompt.
        """
        inputs = self.tokenizer(
            prompt,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=77
        )
        
        with torch.no_grad():
            outputs = self.model(**inputs)
        
        return outputs.pooler_output
