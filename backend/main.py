import os
import json
import re
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

# --- CONFIGURATION ---
# Use the latest stable model. 
# Options: "llama-3.1-70b-versatile", "mixtral-8x7b-32768", "llama3-70b-8192","openai/gpt-oss-20b"
MODEL_NAME = "openai/gpt-oss-20b" 

app = FastAPI()

# Allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq Client
api_key = os.environ.get("GROQ_API_KEY")
if not api_key:
    print("❌ ERROR: GROQ_API_KEY not found! Check your .env file.")
    client = None
else:
    try:
        client = Groq(api_key=api_key)
        print(f"✅ Connected to Groq. Using model: {MODEL_NAME}")
    except Exception as e:
        print(f"❌ Failed to initialize Groq: {e}")
        client = None

# --- MODELS ---
class CareerDetail(BaseModel):
    id: str
    title: str
    company: str
    role: str
    tags: List[str]

class UserSelections(BaseModel):
    likedCareerIds: List[str]
    likedCareersDetails: List[CareerDetail]

class RoadmapRequest(BaseModel):
    chosenPath: str
    skills: List[str]
    careerData: Optional[List[CareerDetail]] = None

# --- HELPER: CLEAN AI OUTPUT ---
def clean_and_parse_json(text):
    """
    Tries to extract JSON from AI text that might contain markdown or explanations.
    """
    try:
        # 1. Try direct parse
        return json.loads(text)
    except json.JSONDecodeError:
        pass # Continue to cleanup strategies

    try:
        # 2. Extract from ```json ... ``` blocks
        match = re.search(r'```json\s*(.*?)\s*```', text, re.DOTALL)
        if match:
            return json.loads(match.group(1))
        
        # 3. Extract from ``` ... ``` blocks (generic code block)
        match = re.search(r'```\s*(.*?)\s*```', text, re.DOTALL)
        if match:
            return json.loads(match.group(1))

        # 4. Brute force: Find the first outer { ... } or [ ... ]
        match = re.search(r'(\{.*\}|\[.*\])', text, re.DOTALL)
        if match:
            return json.loads(match.group(1))
            
    except Exception as e:
        print(f"⚠️ JSON Parse Failed: {e}")
    
    # If all fails, raise error with the raw text for debugging
    raise ValueError(f"Could not parse JSON. Raw output: {text[:100]}...")

# --- ENDPOINTS ---

@app.post("/api/generate-career-paths")
async def generate_career_paths(selections: UserSelections):
    if not client:
        raise HTTPException(status_code=500, detail="Server not configured")

    try:
        liked_titles = ", ".join([c.title for c in selections.likedCareersDetails])
        liked_tags = list(set([tag for c in selections.likedCareersDetails for tag in c.tags]))
        
        print(f"👉 Generating paths for: {liked_titles}")

        prompt = f"""
        User likes: {liked_titles}. Interests: {', '.join(liked_tags)}.
        
        Suggest 6 distinct career paths.
        
        Strictly output a JSON Array of objects. No markdown, no conversational text.
        Structure:
        [
          {{
            "id": "unique-id",
            "title": "Job Title",
            "matchScore": 85,
            "growthRate": "+15%",
            "averageSalary": "$100k",
            "requiredSkills": ["Skill1", "Skill2"],
            "industry": "Tech",
            "description": "One sentence summary."
          }}
        ]
        """

        completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a strict JSON API. Return ONLY JSON data."},
                {"role": "user", "content": prompt}
            ],
            model=MODEL_NAME,
            temperature=0.2, 
        )

        raw_text = completion.choices[0].message.content
        return clean_and_parse_json(raw_text)

    except Exception as e:
        print(f"❌ Error generating paths: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-roadmap")
async def generate_roadmap(request: RoadmapRequest):
    if not client:
        raise HTTPException(status_code=500, detail="Server not configured")

    try:
        print(f"👉 Generating roadmap for: {request.chosenPath}")

        prompt = f"""
        Create a career roadmap for a "{request.chosenPath}".
        User's current skills: {', '.join(request.skills)}.
        
        Output STRICT JSON with this EXACT structure:
        {{
          "mermaidCode": "graph TD; A[Start] --> B[Next];",
          "timeline": [
            {{
              "title": "Phase 1: Foundations",
              "description": "Learn X, Y, Z.",
              "timeframe": "1-3 Months"
            }}
          ]
        }}
        
        IMPORTANT: 
        1. The 'mermaidCode' must be a single valid string.
        2. Do NOT output markdown formatting like ```json.
        3. Do NOT add conversational text.
        """

        completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a strict JSON API. Return ONLY JSON data."},
                {"role": "user", "content": prompt}
            ],
            model=MODEL_NAME,
            temperature=0.2,
        )

        raw_text = completion.choices[0].message.content
        
        # Debug: Print raw response if it fails usually
        # print(f"DEBUG RAW: {raw_text}") 
        
        return clean_and_parse_json(raw_text)

    except Exception as e:
        print(f"❌ Error generating roadmap: {e}")
        # Look at your terminal to see this specific error!
        raise HTTPException(status_code=500, detail=f"Backend Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)