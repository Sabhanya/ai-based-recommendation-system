# Croply AI - Backend & ML Model Server

This directory contains the Python FastAPI backend and machine learning training pipeline for **Croply AI**.

---

## 1. Quick Start

### Step 1: Install Python dependencies
```bash
pip install -r requirements.txt
```

### Step 2: (Optional) Train the ML model
```bash
python model_train.py
```

### Step 3: Start the FastAPI development server
```bash
uvicorn main:app --reload --port 8000
```

The interactive API documentation will be available at:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 2. API Endpoints Contract

### 1. Manual Crop Recommendation: `POST /api/predict`
**Request Payload:**
```json
{
  "N": 90,
  "P": 45,
  "K": 45,
  "pH": 6.5,
  "temperature": 26.0,
  "humidity": 82.0,
  "rainfall": 220.0,
  "location": "East Godavari, AP",
  "season": "Kharif",
  "soilType": "Clayey Loam"
}
```

**Expected Response Format:**
```json
{
  "status": "success",
  "source": "Croply AI Multi-Criteria Optimization Model",
  "recommendations": [
    {
      "crop": "Rice (Paddy)",
      "cropTe": "వరి (వరి ధాన్యం)",
      "score": 0.96,
      "scorePercent": "96%",
      "reason": "Rice is recommended because your soil pH (6.5), temperature (26°C), and rainfall (220mm) match optimal requirements.",
      "reasonTe": "మీ నేల pH (6.5), ఉష్ణోగ్రత (26°C), మరియు వర్షపాతం (220mm) వరి పంటకు సరైన పరిధిలో ఉన్నాయి."
    },
    {
      "crop": "Maize (Corn)",
      "cropTe": "మొక్కజొన్న",
      "score": 0.88,
      "scorePercent": "88%",
      "reason": "Suitable soil nutrients and climate conditions support strong vegetative growth.",
      "reasonTe": "నేల పోషకాలు మరియు వాతావరణం మొక్కజొన్న ఎదుగుదలకు అనుకూలంగా ఉన్నాయి."
    },
    {
      "crop": "Sugarcane",
      "cropTe": "చెరకు",
      "score": 0.82,
      "scorePercent": "82%",
      "reason": "High rainfall and clay loam soil conditions are well-suited for sugarcane.",
      "reasonTe": "అధిక వర్షపాతం మరియు బంక నేలలు చెరకు సాగుకు చాలా అనుకూలం."
    }
  ]
}
```

---

### 2. Crop Image Identification: `POST /api/identify-crop`
**Request Payload:** `multipart/form-data` with file field `image`

**Expected Response Format:**
```json
{
  "status": "success",
  "crop": "Rice (Paddy)",
  "cropTe": "వరి (వరి ధాన్యం)",
  "confidence": 0.96,
  "confidencePercent": "96%"
}
```

---

## 3. Connecting to the React Frontend

In the root directory, update your `.env` file:
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_USE_MOCK_API=false
```

When `VITE_USE_MOCK_API=false`, the React frontend will send live HTTP requests to `http://localhost:8000/api/predict` and `http://localhost:8000/api/identify-crop`.
If the backend is ever stopped, Croply AI will automatically fall back to its internal heuristic engine without crashing or disrupting the user.

---

## 4. Team Responsibilities

- **Member 1 (Dataset + EDA)**: Place cleaned datasets in `backend/data/Crop_recommendation.csv`.
- **Member 2 (ML Engineer)**: Update `model_train.py` with custom hyperparameters or CNN weights.
- **Member 3 (Backend Architect)**: Maintain `main.py` routes and ensure CORS integrity.
- **Member 5 (Database Engineer)**: Integrate SQLite or PostgreSQL in `main.py` for persistent user logs.
- **Member 6 (QA & Integration)**: Test response payloads against the contract above.
