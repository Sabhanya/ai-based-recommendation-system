import io
import json
import re
from PIL import Image
import google.generativeai as genai
from fastapi import HTTPException

# Your active Google Gemini API Keys
API_KEYS = [
    "AQ.Ab8RN6L9FkubY0-JAeeKVmCdXukCEBQ3obRF2RFH7XlwXzuMuQ",
    "AQ.Ab8RN6Ktc7b5NeHJWJa4qISSjKJ7ACGlp1wO0oF3CvA0Z9sgAg",
    "AQ.Ab8RN6JuSVG5RdtnO5pct-X32h6e1xo0m_mBF2_V-IbbXh6vng",
    "AQ.Ab8RN6IVFq4KJSo3toSxO4hU7JPw05KzkyFsvlxBCMKAOjNILQ"
]

CURRENT_KEY_INDEX = 0

def configure_key(index: int):
    global CURRENT_KEY_INDEX
    CURRENT_KEY_INDEX = index % len(API_KEYS)
    active_key = API_KEYS[CURRENT_KEY_INDEX]
    genai.configure(api_key=active_key)
    print(f"[API ROTATION]: Active Key #{CURRENT_KEY_INDEX + 1}")

configure_key(0)

class ResilientGeminiVisionClassifier:
    def classify_image_bytes(self, image_bytes: bytes, filename: str = ""):
        global CURRENT_KEY_INDEX
        try:
            pil_image = Image.open(io.BytesIO(image_bytes))
            if pil_image.mode != "RGB":
                pil_image = pil_image.convert("RGB")
            pil_image.thumbnail((768, 768))
        except Exception:
            raise HTTPException(status_code=400, detail="చెల్లని ఇమేజ్ ఫైల్ ఫార్మాట్.")

        prompt = """
        You are an expert agricultural Computer Vision AI for 'Croply AI' platform.
        Analyze this image strictly:

        1. Is there ANY agricultural crop, plant, leaf, flower, fruit, vegetable, grain, or field visible?
           - If it is a screenshot or photo that CONTAINS an actual crop/leaf/fruit/plant, consider it VALID and identify that crop.
           - If there is NO crop, plant, produce, or field anywhere in the image (e.g., pure chart, diagram, text document, invoice, selfie, human face, gadget, car, empty room, blank paper), return:
             {"is_crop": false, "message": "ఇది పంట లేదా వ్యవసాయ సంబంధిత చిత్రం కాదు. దయచేసి స్పష్టమైన పంట లేదా ఆకు ఫోటోను మాత్రమే అప్‌లోడ్ చేయండి."}

        2. If YES, identify the exact crop and return ONLY this raw JSON structure:
        {
          "is_crop": true,
          "crop": "Exact Crop Name in English (e.g. Rice, Cotton, Tomato, Banana, Maize, Chilli, Mango, Watermelon, Potato, Sugarcane, Cabbage, Cauliflower, Brinjal, Wheat, Groundnut, Apple)",
          "cropTe": "ఖచ్చితమైన తెలుగు పేరు (ఉదా: వరి, పత్తి, టమాట, అరటి, మొక్కజొన్న, మిరప, మామిడి, పుచ్చకాయ, బంగాళాదుంప, చెరకు, క్యాబేజీ, కాలీఫ్లవర్, వంకాయ, గోధుమ, వేరుశనగ, యాపిల్)",
          "scientificName": "Scientific Botanical Name",
          "category": "Cereals / Fruits / Vegetables / Cash Crops / Pulses / Plantation / Spices",
          "confidencePercent": "98%",
          "agronomic": {
             "N": "80 - 120 kg/ha",
             "P": "40 - 60 kg/ha",
             "K": "40 - 60 kg/ha",
             "ph": "6.0 - 7.5",
             "temp": "20° - 32°C",
             "rainfall": "800 - 1200 mm",
             "season": "Kharif & Rabi",
             "seasonTe": "ఖరీఫ్ & రబీ",
             "water": "Medium"
          }
        }
        Do not wrap in markdown quotes. Return strictly raw JSON.
        """

        total_keys = len(API_KEYS)
        last_error = ""

        # Using gemini-3.6-flash as requested by Google's API service
        for attempt in range(total_keys):
            try:
                model = genai.GenerativeModel("gemini-3.6-flash")
                response = model.generate_content([prompt, pil_image])
                raw_text = response.text.strip()
                print(f"\n[GEMINI 3.6 FLASH SUCCESS]: {raw_text}\n")

                match = re.search(r"\{.*\}", raw_text, re.DOTALL)
                clean_json = match.group(0) if match else raw_text
                data = json.loads(clean_json)

                if not data.get("is_crop", True):
                    error_msg = data.get(
                        "message", 
                        "ఇది పంట లేదా ఆకు చిత్రం కాదు. దయచేసి స్పష్టమైన పంట ఫోటోను మాత్రమే అప్‌లోడ్ చేయండి."
                    )
                    raise HTTPException(status_code=422, detail=error_msg)

                return data

            except HTTPException as he:
                raise he
            except Exception as e:
                err_msg = str(e)
                last_error = err_msg
                print(f"[KEY #{CURRENT_KEY_INDEX + 1} ERROR]: {err_msg}")
                # Switch to the next key in the pool
                next_index = (CURRENT_KEY_INDEX + 1) % total_keys
                configure_key(next_index)

        raise HTTPException(
            status_code=500,
            detail=f"AI సర్వర్‌లో లోపం ఏర్పడింది: {last_error}"
        )

vision_classifier = ResilientGeminiVisionClassifier()