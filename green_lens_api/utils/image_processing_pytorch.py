import io
from PIL import Image
import torchvision.transforms as transforms
import torch

def preprocess_image_pytorch(image_bytes: bytes, target_size=(224, 224)):
    """
    Preprocesses an image for a PyTorch image classification model.
    Adjust transformations based on how model will be  trained.
    """
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    transform = transforms.Compose([
        transforms.Resize(target_size),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    return transform(image).unsqueeze(3) 