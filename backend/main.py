from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Gicheva Art API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "https://gichevaart.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Gicheva Art API", "status": "online"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/artworks")
async def get_artworks():
    # TODO: Implement database connection
    return {
        "artworks": [
            {
                "id": "1",
                "title": "Sample Artwork",
                "description": "This is a sample artwork",
                "imageUrl": "https://via.placeholder.com/400",
                "price": 500,
                "available": True
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)