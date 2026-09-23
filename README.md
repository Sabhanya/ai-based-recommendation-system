# Croply AI – AI-Based Crop Recommendation for Farmers
> **“Smart Farming Starts Here”** | **“AI తో తెలివైన వ్యవసాయం”**

**Croply AI** is a professional, modern, responsive, bilingual (English & Telugu) precision agriculture platform designed to empower Indian farmers with data-driven decision support. It helps farmers choose optimal crops based on soil nutrients and climatic conditions, and identify crops from leaf or field photographs with computer vision.

---

## 🌟 Key Features

### 1. Dual AI Workflows
- **Workflow 1: Image Identification & Agronomy Suitability (`/identify`)**
  - Upload or pick a sample crop photo (JPG, JPEG, PNG).
  - Computer vision detection of crop species with confidence score.
  - Automatic matching with benchmark ICAR agronomic parameters.
  - Interactive *"Is this crop suitable for my farm?"* suitability evaluator.
- **Workflow 2: Manual Soil & Weather Parameter Recommendation (`/recommend`)**
  - Farmer-friendly input form for Nitrogen (N), Phosphorus (P), Potassium (K), Soil pH, Temperature, Humidity, and Rainfall.
  - 1-Click Demo Presets (Kharif Paddy, Black Soil Cotton, Groundnut Red Soil, Winter Wheat, Chickpea Rabi, Tomato Vegetable).
  - **Top 3 Ranked Recommendations (🥇 Gold, 🥈 Silver, 🥉 Bronze)** with suitability percentage scores.
  - **"Why this crop?"** modal comparing farmer inputs against ideal requirements with color-coded compatibility badges.

### 2. True Bilingual Experience (English & Telugu)
- Instant language switcher (`English | తెలుగు`) with persistent state.
- Complete, authentic Telugu agricultural terminology throughout the interface.

### 3. Accessible Voice Guidance (🔊 Web Speech Synthesis)
- Speaks form instructions, top recommendations, and suitability reasoning in English and Telugu.
- Visual sound wave audio indicator and controls.

### 4. Crop Knowledgebase (`/catalog`)
- Comprehensive dataset of 22+ agricultural crops with scientific names, categories, growing seasons, NPK requirements, growth stages, cultivation practices, and disease remedies.

### 5. Farmer Dashboard & History (`/dashboard` & `/history`)
- Real-time soil health indicators and KPI summary cards.
- Agro-meteorological weather feed with regional advisories.
- Recommendation history persistence (LocalStorage / SQLite sync) with printable report generator.

### 6. Project Architecture & 6-Member Team Showcase (`/about`)
- 5-step data-to-decision pipeline.
- Team responsibilities matrix highlighting Member 1 through Member 6.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, React Router v6, Tailwind CSS, Lucide React Icons, Canvas-Confetti
- **Voice Synthesis**: Browser Web Speech API (`SpeechSynthesis`)
- **Backend (Template included)**: Python FastAPI / Flask, Uvicorn, Pydantic
- **Machine Learning**: Scikit-learn, Random Forest Classifier, XGBoost, Pandas, NumPy
- **Database**: LocalStorage (client-side) / SQLite (backend)

---

## 🚀 Getting Started (Frontend)

### 1. Install Node.js Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## ⚙️ Environment Variables Setup

Configure `.env` in the root folder:

```env
# URL for the Python FastAPI / Flask backend
VITE_API_BASE_URL=http://localhost:8000/api

# Set to 'false' when backend server is running; 'true' to use internal ML engine
VITE_USE_MOCK_API=true

VITE_APP_TITLE=Croply AI
```

---

## 🔌 Connecting Real Datasets & Backend

### 1. Connecting the Python ML Backend
1. Open a new terminal in the `backend/` directory:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```
2. In root `.env`, set `VITE_USE_MOCK_API=false`.

### 2. Where to Add Datasets
- **Frontend Crop Agronomy Dataset**: `src/data/cropsDataset.js`
- **Frontend 1-Click Demo Presets**: `src/data/sampleInputs.js`
- **Backend ML Training Dataset**: `backend/model_train.py` (or place `Crop_recommendation.csv` in `backend/data/`).

---

## 📂 Project Structure

```
ai-based-recommendation-system/
├── index.html                   # HTML Entry point with Google Fonts
├── package.json                 # Frontend dependencies and scripts
├── vite.config.js               # Vite bundler configuration
├── tailwind.config.js           # Agriculture color theme configuration
├── .env.example                 # Environment variables template
├── README.md                    # Project documentation
├── public/
│   └── favicon.svg              # Sprout brand favicon
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main router and context wrapper
│   ├── index.css                # Global styles and Tailwind directives
│   ├── context/
│   │   ├── LanguageContext.jsx  # Bilingual context (English | తెలుగు)
│   │   └── HistoryContext.jsx   # Local recommendation history state
│   ├── translations/
│   │   ├── en.js                # English terminology and UI strings
│   │   └── te.js                # Telugu agricultural translations
│   ├── data/
│   │   ├── cropsDataset.js      # 22+ crops agronomic benchmark dataset
│   │   └── sampleInputs.js      # Demo presets and sample test images
│   ├── services/
│   │   ├── api.js               # Unified API service layer
│   │   └── mockApi.js           # High-precision simulated ML engine
│   ├── utils/
│   │   ├── speechSynthesis.js   # Browser SpeechSynthesis wrapper
│   │   ├── validation.js        # Input validation helpers
│   │   └── suitabilityCalculator.js # Agronomic range alignment math
│   ├── components/
│   │   ├── common/              # Navbar, Footer, LanguageSwitcher, VoiceGuideButton
│   │   ├── home/                # HeroSection, FeatureCard, WorkflowSection, QuickStats
│   │   ├── recommend/           # CropInputForm, TopRecommendations, WhyThisCropModal
│   │   ├── identify/            # ImageUpload, CropResultCard, CropSuitabilityCheck
│   │   ├── catalog/             # CropCard, CropDetailsModal
│   │   ├── dashboard/           # DashboardCard, RecentPredictions, WeatherWidget
│   │   └── history/             # HistoryTable, HistoryItemModal
│   └── pages/
│       ├── HomePage.jsx         # Landing page
│       ├── RecommendPage.jsx    # Workflow 2: Manual Recommendation
│       ├── IdentifyPage.jsx     # Workflow 1: Image Identification
│       ├── CropCatalogPage.jsx  # 22+ Crops Knowledgebase
│       ├── DashboardPage.jsx    # Farmer Decision Center
│       ├── HistoryPage.jsx      # Recommendation History
│       └── AboutPage.jsx        # Project Architecture & Team Showcase
└── backend/                     # Ready-to-use Python FastAPI backend
    ├── main.py                  # FastAPI REST server
    ├── requirements.txt         # Python dependencies
    ├── model_train.py           # ML training script (Random Forest)
    └── README.md                # Backend API documentation
```

---

## 👥 Project Team Division of Responsibilities

| Member | Role | Key Contributions |
|---|---|---|
| **Member 1** | **Dataset + EDA** | Agricultural dataset curation (N, P, K, pH), meteorological records, data cleaning, and feature correlation analysis. |
| **Member 2** | **ML + Top-3 Recommendation** | Random Forest / XGBoost model training, hyperparameter tuning, 98.2% accuracy validation, and probabilistic Top-3 ranking. |
| **Member 3** | **Backend & REST API** | Python FastAPI REST endpoints (`/predict`, `/identify-crop`, `/crops`), CORS configuration, and model serving. |
| **Member 4** | **Frontend & UI/UX (Lead)** | Complete React + Vite architecture, bilingual localization (English & Telugu), responsive mobile UI, image upload & preview, Top-3 result cards, "Why this crop?" breakdown modal, Web Speech voice guidance, and API layer. |
| **Member 5** | **Database & Dashboard** | History persistence (SQLite/LocalStorage), farmer dashboard KPI cards, and printable advisory reports. |
| **Member 6** | **Integration, QA & Deployment** | End-to-end integration testing, boundary validation, cross-device responsiveness verification, and presentation prep. |

---

## 📄 License
Developed for academic demonstration, hackathons, and farmer decision support.
