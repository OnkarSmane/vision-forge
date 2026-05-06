import base64
from io import BytesIO
from PIL import Image

def image_to_base64(image):
    """
    Converts a PIL image to a base64 string.
    
    Why do we need this?
    We cannot send an image directly over the internet.
    So we convert it to a long string of text (base64),
    send that string to the frontend,
    and the frontend converts it back to an image to display.
    
    Think of it like this:
    Image → encode → long text string → send → decode → Image
    """
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return encoded
