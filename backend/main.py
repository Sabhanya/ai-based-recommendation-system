import math
from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

# Image classifier remains 100% untouched
from image_classifier import vision_classifier

app = FastAPI(title="CroplyAI Dynamic Engine", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "CroplyAI Engine"}

# IMAGE CLASSIFICATION (100% Untouched)
@app.post("/api/identify-crop")
@app.post("/identify-crop")
async def identify_crop(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        return vision_classifier.classify_image_bytes(contents, filename=file.filename or "")
    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"[IMAGE ERROR]: {e}")
        raise HTTPException(
            status_code=422,
            detail="ఇది పంట లేదా ఆకు చిత్రం కాదు. దయచేసి స్పష్టమైన పంట ఫోటోను అప్‌లోడ్ చేయండి."
        )

# Kaggle / ICAR Precision 22 Benchmark Crops
# [N, P, K, Temp, Humidity, pH, Rainfall]
DATASET_22_CROPS = [
    {
        "id": "rice", "name": "Rice (Paddy)", "nameTe": "వరి", "scientific": "Oryza sativa",
        "category": "Cereals", "categoryTe": "ధాన్యపు పంట", "season": "Kharif & Rabi", "seasonTe": "ఖరీఫ్ & రబీ",
        "center": [80.0, 48.0, 40.0, 24.0, 82.0, 6.4, 236.0],
        "reason": "High rainfall and standing water capability perfectly fulfill the semi-aquatic growth requirements of Rice.",
        "reasonTe": "అధిక వర్షపాతం, ఎక్కువ తేమ మరియు నేలలో నీరు నిల్వ ఉండే లక్షణాలు వరి పంట ఏపుగా పెరిగి అధిక దిగుబడి ఇవ్వడానికి అత్యంత అనుకూలం.",
        "guide": {
            "land": "2-3 సార్లు దమ్ము చేసి 3-5 సెం.మీ నీరు నిల్వ ఉండేలా చదును చేయాలి.",
            "landEn": "Puddle 2-3 times thoroughly and level for 3-5 cm standing water.",
            "sow": "20-25 రోజుల నారును 20x15 సెం.మీ దూరంలో నాటాలి.",
            "sowEn": "Transplant 20-25 day seedlings at 20x15 cm spacing.",
            "fert": "NPK 100:50:50 kg/ha. నత్రజనిని 3 సమ భాగాలుగా విభజించి వేయాలి.",
            "fertEn": "NPK 100:50:50 kg/ha with scheduled split dressings.",
            "water": "పిలకలు తొడిగే దశ, చిరుపొట్ట మరియు పూత దశలలో నిరంతరం తేమ ఉంచాలి.",
            "waterEn": "Maintain shallow submergence during tillering, panicle, and bloom."
        }
    },
    {
        "id": "maize", "name": "Maize (Corn)", "nameTe": "మొక్కజొన్న", "scientific": "Zea mays",
        "category": "Cereals", "categoryTe": "ధాన్యపు పంట", "season": "Kharif & Rabi", "seasonTe": "ఖరీఫ్ & రబీ",
        "center": [78.0, 48.0, 20.0, 22.5, 65.0, 6.2, 85.0],
        "reason": "Balanced nitrogen and moderate precipitation provide the rapid vegetative expansion required for Maize cob filling.",
        "reasonTe": "సమతుల్య నత్రజని మరియు మితమైన వర్షపాతం మొక్కజొన్న కంకి నిండుగా గింజ కట్టడానికి పూర్తి తోడ్పాటునిస్తాయి.",
        "guide": {
            "land": "మురుగునీరు నిలవని సారవంతమైన ఒండ్రు లేదా ఎర్ర నేలలు శ్రేష్టం.",
            "landEn": "Well-drained fertile loam or red soil with organic matter.",
            "sow": "వరుసల మధ్య 60 సెం.మీ, మొక్కల మధ్య 20 సెం.మీ ఉండేలా విత్తుకోవాలి.",
            "sowEn": "Sow at 60x20 cm spacing using certified hybrid seeds.",
            "fert": "NPK 120:60:50 kg/ha. మోకాలి ఎత్తు మరియు పూత దశల్లో యూరియా వేయాలి.",
            "fertEn": "NPK 120:60:50 kg/ha. Split Nitrogen at knee-high and tasseling.",
            "water": "మగ పూత, ఆడ కంకి మరియు గింజ పాలు పోసుకునే దశల్లో తడులు ఇవ్వాలి.",
            "waterEn": "Irrigate at knee-high, tasseling, and grain milking stages."
        }
    },
    {
        "id": "chickpea", "name": "Chickpea", "nameTe": "శనగలు", "scientific": "Cicer arietinum",
        "category": "Pulses", "categoryTe": "పప్పుధాన్యాలు", "season": "Rabi (Oct - March)", "seasonTe": "రబీ (అక్టో - మార్చి)",
        "center": [40.0, 68.0, 80.0, 19.0, 17.0, 7.3, 80.0],
        "reason": "Dry, cool weather with residual soil moisture drives active root nodulation and heavy pod bearing for Chickpea.",
        "reasonTe": "తక్కువ ఉష్ణోగ్రత మరియు పొడి వాతావరణం శనగ పంటలో వేరు బుడిపెల ద్వారా నత్రజని స్థిరీకరణ జరిగి కాయలు సమృద్ధిగా కట్టడానికి అనుకూలం.",
        "guide": {
            "land": "తేలికపాటి నల్లరేగడి లేదా ఎర్ర నేలలు. లోతు దుక్కి చేసి తేమ ఆరనివ్వకూడదు.",
            "landEn": "Conserve subsoil moisture in light black or alluvial loam.",
            "sow": "అక్టోబర్-నవంబర్ లో 30x10 సెం.మీ దూరంలో విత్తుకోవాలి.",
            "sowEn": "Sow in Oct-Nov at 30x10 cm spacing at 5-7 cm depth.",
            "fert": "NPK 20:50:20 kg/ha. విత్తనాలకు రైజోబియం కల్చర్ పట్టించాలి.",
            "fertEn": "NPK 20:50:20 kg/ha with Rhizobium seed inoculation.",
            "water": "పూతకు ముందు (35వ రోజు) మరియు కాయ ఊరే దశలో (60వ రోజు) తడులు ఇవ్వాలి.",
            "waterEn": "Crucial irrigations at pre-flowering and pod filling."
        }
    },
    {
        "id": "cotton", "name": "Cotton", "nameTe": "పత్తి", "scientific": "Gossypium hirsutum",
        "category": "Cash Crops", "categoryTe": "వాణిజ్య పంట", "season": "Kharif (June - Dec)", "seasonTe": "ఖరీఫ్ (జూన్ - డిసెం)",
        "center": [118.0, 46.0, 20.0, 24.0, 80.0, 6.9, 80.0],
        "reason": "High nitrogen bioavailability coupled with warm conditions stimulates boll retention and superior lint elongation.",
        "reasonTe": "అధిక నత్రజని మరియు వెచ్చని వాతావరణం పత్తి కాయలు రాలకుండా పటిష్టమైన దూది పింజ ఏర్పడటానికి దోహదపడతాయి.",
        "guide": {
            "land": "లోతైన నల్లరేగడి నేలలు అనుకూలం. నేలను మెత్తగా దున్ని బోదెలు చేయాలి.",
            "landEn": "Deep black cotton soil. Fine tilth followed by ridges.",
            "sow": "జూన్-జూలై లో 90x60 సెం.మీ ఎడంగా విత్తుకోవాలి.",
            "sowEn": "Sow in June-July at 90x60 cm row-to-plant spacing.",
            "fert": "NPK 120:60:60 kg/ha. కాయ దశలో జింక్, బోరాన్ పిచికారీ చేయాలి.",
            "fertEn": "NPK 120:60:60 kg/ha with foliar micronutrient boosts.",
            "water": "పూత మరియు కాయ ఊరే కీలక దశల్లో నీటి ఎద్దడి లేకుండా చూడాలి.",
            "waterEn": "Irrigate at square formation and boll development."
        }
    },
    {
        "id": "groundnut", "name": "Groundnut", "nameTe": "వేరుశనగ", "scientific": "Arachis hypogaea",
        "category": "Oilseeds", "categoryTe": "నూనెగింజలు", "season": "Kharif & Rabi", "seasonTe": "ఖరీఫ్ & రబీ",
        "center": [22.0, 48.0, 24.0, 27.5, 58.0, 6.5, 68.0],
        "reason": "Friable light soil texture and warm soil temperature promote effortless pegging and high-density kernel development.",
        "reasonTe": "తేలికపాటి ఇసుక నేలలు వేరుశనగ ఊడలు నేలలోకి సులభంగా దిగి దృఢమైన కాయలు ఊరడానికి అనుకూలమైన వాతావరణాన్ని కల్పిస్తాయి.",
        "guide": {
            "land": "ఇసుక లేదా ఎర్ర నేలలు. నేలను బాగా మెత్తగా దున్నాలి.",
            "landEn": "Light sandy loam or red soil. Fine tilth for easy pegging.",
            "sow": "సాలుకు 30 సెం.మీ, మొక్కకు 10 సెం.మీ ఎడంగా విత్తుకోవాలి.",
            "sowEn": "Sow at 30x10 cm spacing with certified treated seeds.",
            "fert": "NPK 20:40:40 kg/ha. పూత దశలో ఎకరాకు 200 కిలోల జిప్సం వేయాలి.",
            "fertEn": "NPK 20:40:40 kg/ha. Apply Gypsum 200 kg/ha at bloom.",
            "water": "ఊడలు దిగే దశ మరియు కాయలు ఊరే దశల్లో నీటి ఎద్దడి రాకుండా చూడాలి.",
            "waterEn": "Critical irrigations at flowering, pegging, and pod set."
        }
    },
    {
        "id": "blackgram", "name": "Blackgram (Urad)", "nameTe": "మినుములు", "scientific": "Vigna mungo",
        "category": "Pulses", "categoryTe": "పప్పుధాన్యాలు", "season": "Kharif & Rabi", "seasonTe": "ఖరీఫ్ & రబీ",
        "center": [40.0, 68.0, 20.0, 29.5, 65.0, 7.1, 68.0],
        "reason": "Moderate rainfall and warm climate trigger rapid vegetative branching and synchronous pulse pod maturity.",
        "reasonTe": "మితమైన వర్షపాతం మరియు వెచ్చని వాతావరణం మినుము పైరులో కొమ్మలు ఎక్కువగా వచ్చి ఏకకాలంలో కాయలు పక్వానికి రావడానికి సహాయపడతాయి.",
        "guide": {
            "land": "మురుగునీరు నిలవని నేలలు లేదా వరి కోతల తర్వాత జీరో టిల్లేజ్ పద్ధతి.",
            "landEn": "Fertile well-drained loam or relay cropping in rice fallows.",
            "sow": "30x10 సెం.మీ దూరంలో విత్తుకోవాలి. విత్తన శుద్ధి తప్పనిసరి.",
            "sowEn": "Sow at 30x10 cm with Rhizobium-treated seeds.",
            "fert": "NPK 20:40:20 kg/ha. పూత దశలో 2% డీఏపీ పిచికారీ చేయాలి.",
            "fertEn": "NPK 20:40:20 kg/ha. Foliar spray of 2% DAP at flowering.",
            "water": "విత్తిన వెంటనే ఒక తడి, పూత మరియు కాయ దశలలో తేమ ఉండేలా చూడాలి.",
            "waterEn": "Provide life irrigation, followed by flowering and pod set."
        }
    },
    {
        "id": "lentil", "name": "Lentil (Masoor)", "nameTe": "మసూర్ పప్పు", "scientific": "Lens culinaris",
        "category": "Pulses", "categoryTe": "పప్పుధాన్యాలు", "season": "Rabi (Winter)", "seasonTe": "రబీ (శీతాకాలం)",
        "center": [18.0, 68.0, 20.0, 24.5, 66.0, 6.9, 45.0],
        "reason": "Low moisture tolerance and cool temperatures encourage efficient pod formation without excess vegetative growth.",
        "reasonTe": "తక్కువ వర్షపాతం మరియు చల్లని వాతావరణం మసూర్ పప్పు పంట అనవసరంగా ఏపుగా పెరగకుండా కాయలు బాగా పట్టేలా చేస్తాయి.",
        "guide": {
            "land": "మధ్యస్థ నల్లరేగడి లేదా ఒండ్రు నేలలు. తేమ ఆరిపోకుండా తక్కువ దుక్కులు చేయాలి.",
            "landEn": "Medium black or alluvial loam with minimal tillage.",
            "sow": "అక్టోబర్ 15 నుండి నవంబర్ 15 మధ్య 25 సెం.మీ వరుసల దూరంలో విత్తుకోవాలి.",
            "sowEn": "Optimum sowing: Mid-Oct to Mid-Nov. Row spacing of 25 cm.",
            "fert": "NPK 20:40:20 kg/ha. తక్కువ నత్రజని సరిపోతుంది.",
            "fertEn": "NPK 20:40:20 kg/ha with low nitrogen dependency.",
            "water": "శాఖా పెరుగుదల మరియు కాయ కట్టే దశల్లో 1-2 రక్షక తడులు సరిపోతాయి.",
            "waterEn": "Requires only 1-2 light irrigations at pre-flowering."
        }
    },
    {
        "id": "tomato", "name": "Tomato", "nameTe": "టమాట", "scientific": "Solanum lycopersicum",
        "category": "Vegetables", "categoryTe": "కూరగాయ పంట", "season": "Rabi & Kharif", "seasonTe": "రబీ & ఖరీఫ్",
        "center": [95.0, 65.0, 55.0, 23.0, 68.0, 6.6, 92.0],
        "reason": "High phosphorus, potassium, and temperate warmth drive prolific blossom clusters and firm fruit development for Tomato.",
        "reasonTe": "సమతుల్య భాస్వరం మరియు పొటాషియం టమాట పూత రాలకుండా నిరోధించి మంచి రంగు, బరువు గల కాయలు రావడానికి సహాయపడతాయి.",
        "guide": {
            "land": "మంచి నీటి పారుదల గల ఎర్ర లేదా ఒండ్రు నేలలు. ఎకరాకు 10 టన్నుల ఎరువు వేయాలి.",
            "landEn": "Well-drained loam. Incorporate 10 tons compost/acre.",
            "sow": "25 రోజుల నారును 60x45 సెం.మీ దూరంలో నాటుకోవాలి.",
            "sowEn": "Transplant 25-day seedlings at 60x45 cm spacing.",
            "fert": "NPK 120:60:60 kg/ha. కాయ పగలకుండా కాల్షియం, బోరాన్ స్ప్రే చేయాలి.",
            "fertEn": "NPK 120:60:60 kg/ha with calcium nitrate foliar spray.",
            "water": "డ్రిప్ ద్వారా 3-4 రోజులకు ఒకసారి సమానంగా తేమ అందించాలి.",
            "waterEn": "Drip irrigation every 3-4 days; avoid soil drying."
        }
    },
    {
        "id": "brinjal", "name": "Brinjal (Eggplant)", "nameTe": "వంకాయ", "scientific": "Solanum melongena",
        "category": "Vegetables", "categoryTe": "కూరగాయ పంట", "season": "Year-round", "seasonTe": "ఏడాది పొడవునా",
        "center": [105.0, 52.0, 50.0, 26.0, 72.0, 6.7, 85.0],
        "reason": "Steady tropical warmth and continuous nutrient availability sustain heavy continuous flushes of Brinjal.",
        "reasonTe": "సమశీతోష్ణ వాతావరణం మరియు స్థిరమైన పోషకాలు వంకాయలో నిరంతరం పూత మరియు నాణ్యమైన కాతను అందిస్తాయి.",
        "guide": {
            "land": "లోతు దుక్కి దున్ని ఎకరాకు 10 టన్నుల పశువుల ఎరువు వేసి ఎత్తైన బోదెలు చేయాలి.",
            "landEn": "Deep plowing with 10 tons FYM/acre into raised beds.",
            "sow": "30-35 రోజుల నారును 75x60 సెం.మీ ఎడంగా నాటాలి.",
            "sowEn": "Transplant 30-35 day seedlings at 75x60 cm spacing.",
            "fert": "NPK 100:60:60 kg/ha. కాత ప్రారంభమైనప్పటి నుంచి పొటాష్ వేయాలి.",
            "fertEn": "NPK 100:60:60 kg/ha. Boost potassium during fruiting.",
            "water": "తేలికపాటి తడులను 4-6 రోజుల వ్యవధిలో క్రమం తప్పకుండా ఇవ్వాలి.",
            "waterEn": "Light irrigations every 4-6 days; avoid water stagnation."
        }
    },
    {
        "id": "chilli", "name": "Chilli", "nameTe": "పచ్చిమిర్చి", "scientific": "Capsicum annuum",
        "category": "Spices / Veg", "categoryTe": "సుగంధ / కూరగాయ పంట", "season": "Kharif & Rabi", "seasonTe": "ఖరీఫ్ & రబీ",
        "center": [100.0, 58.0, 52.0, 27.5, 66.0, 6.6, 95.0],
        "reason": "Moderate rainfall and warm climate prevent fungal drop and boost capsaicin pungency in Chilli.",
        "reasonTe": "సమతుల్య తేమ మరియు వెచ్చని వాతావరణం మిరపలో పూత రాలకుండా నిరోధించి ఘాటైన నాణ్యమైన కాయలు రావడానికి శ్రేష్టం.",
        "guide": {
            "land": "సారవంతమైన నల్లరేగడి లేదా ఎర్ర నేలలు. ఎత్తైన బోదెలు చేయాలి.",
            "landEn": "Fertile loam or red soil with raised bed preparation.",
            "sow": "35-40 రోజుల నారును 60x60 సెం.మీ ఎడంగా నాటుకోవాలి.",
            "sowEn": "Transplant 35-40 day seedlings at 60x60 cm spacing.",
            "fert": "NPK 120:60:60 kg/ha. కాయల దశలో సూక్ష్మ పోషకాలు పిచికారీ చేయాలి.",
            "fertEn": "NPK 120:60:60 kg/ha with foliar micronutrients.",
            "water": "నీరు నిలవకుండా డ్రిప్ ద్వారా సమతుల్య తేమ అందించాలి.",
            "waterEn": "Drip irrigation; avoid excess moisture and stagnation."
        }
    },
    {
        "id": "sugarcane", "name": "Sugarcane", "nameTe": "చెరకు", "scientific": "Saccharum officinarum",
        "category": "Commercial Crops", "categoryTe": "వాణిజ్య పంట", "season": "Spring / Autumn", "seasonTe": "వసంతం / శరదృతువు",
        "center": [140.0, 60.0, 80.0, 28.0, 80.0, 6.6, 185.0],
        "reason": "Deep soil nutrient reservoirs, intense sunlight, and heavy irrigation drive massive biomass and cane sugar content.",
        "reasonTe": "అధిక పోషకాలు, వేడి వాతావరణం మరియు సమృద్ధిగా నీరు చెరకు గడలు బలిష్టంగా పెరిగి చక్కెర శాతాన్ని పెంచడానికి అనుకూలం.",
        "guide": {
            "land": "లోతైన ఒండ్రు నేలలు. ఎకరాకు 15 టన్నుల పశువుల ఎరువుతో బోదెలు తీయాలి.",
            "landEn": "Deep loamy soil with furrows at 90-120 cm row width.",
            "sow": "3 కళ్ల ముచ్చెలను ఎకరానికి 16,000 చొప్పున నాటాలి.",
            "sowEn": "Plant three-budded setts at 90-120 cm row spacing.",
            "fert": "NPK 250:100:120 kg/ha. నత్రజనిని 30, 60, 90 రోజులలో విభజించి వేయాలి.",
            "fertEn": "NPK 250:100:120 kg/ha in scheduled split doses.",
            "water": "గడ పెరిగే కీలక దశలో 7-10 రోజులకు ఒకసారి నీరు ఇవ్వాలి.",
            "waterEn": "Irrigate every 7-10 days during elongation stage."
        }
    },
    {
        "id": "watermelon", "name": "Watermelon", "nameTe": "పుచ్చకాయ", "scientific": "Citrullus lanatus",
        "category": "Horticulture", "categoryTe": "పండ్ల తోట", "season": "Summer (Zaid)", "seasonTe": "వేసవి (జాయెద్)",
        "center": [98.0, 18.0, 50.0, 25.5, 88.0, 6.5, 50.0],
        "reason": "Sandy loam texture and hot dry sunshine optimize sugar brix accumulation and massive fruit size.",
        "reasonTe": "తేలికపాటి ఇసుక నేలలు మరియు వెచ్చని ఎండ పుచ్చకాయ తీగలు బాగా పాకి తియ్యని భారీ కాయలు కాయడానికి అత్యుత్తమం.",
        "guide": {
            "land": "ఇసుక రేగడి నేలలు. 2 మీటర్ల దూరంలో బోదెలు చేయాలి.",
            "landEn": "Sandy loam soil. Create channels at 2 m spacing.",
            "sow": "బోదెకి ఇరువైపులా 60 సెం.మీ దూరంలో విత్తనాలు విత్తుకోవాలి.",
            "sowEn": "Sow seeds at 60 cm intervals along the channels.",
            "fert": "NPK 100:50:50 kg/ha. తీగ సాగే దశలో నత్రజని వేయాలి.",
            "fertEn": "NPK 100:50:50 kg/ha. Apply Nitrogen during vining.",
            "water": "కాయ కోతకు 10 రోజుల ముందు నీటిని తగ్గించాలి.",
            "waterEn": "Reduce irrigation 10 days before harvest for sweetness."
        }
    },
    {
        "id": "apple", "name": "Apple", "nameTe": "యాపిల్", "scientific": "Malus domestica",
        "category": "Fruits", "categoryTe": "పండ్ల తోట", "season": "Temperate Winter", "seasonTe": "చలికాలం",
        "center": [20.0, 135.0, 200.0, 22.5, 92.0, 5.9, 110.0],
        "reason": "High potassium and phosphorus with high elevation cooling provide necessary chill hours and crisp fruit quality.",
        "reasonTe": "అత్యధిక పొటాషియం మరియు భాస్వరం యాపిల్ కాయ రంగు మరియు నిల్వ సామర్థ్యాన్ని పెంచడానికి సంపూర్ణంగా తోడ్పడతాయి.",
        "guide": {
            "land": "లోతైన సారవంతమైన కొండ నేలలు. సేంద్రీయ ఎరువులతో గుంతలు నింపాలి.",
            "landEn": "Deep well-drained mountain soil with rich organic mulch.",
            "sow": "గ్రాఫ్టింగ్ మొక్కలను 4x4 మీటర్ల దూరంలో నాటుకోవాలి.",
            "sowEn": "Plant grafted saplings at 4x4 m spacing.",
            "fert": "పొటాషియం మరియు భాస్వరం ఎరువులను చెట్టు పాదుల్లో వేయాలి.",
            "fertEn": "Boost Potassium and Phosphorus fertilizers in root zone.",
            "water": "పూత మరియు కాయ ఎదుగుదల సమయంలో తడులు ఇవ్వాలి.",
            "waterEn": "Maintain soil moisture throughout fruit sizing."
        }
    },
    {
        "id": "coffee", "name": "Coffee", "nameTe": "కాఫీ", "scientific": "Coffea arabica",
        "category": "Plantation", "categoryTe": "తోట పంట", "season": "Post-Monsoon", "seasonTe": "వర్షాకాలం తర్వాత",
        "center": [100.0, 28.0, 30.0, 25.5, 58.0, 6.8, 160.0],
        "reason": "High rainfall, well-drained slope soils and gentle temperature optimize coffee berry sweetness and bean density.",
        "reasonTe": "అధిక వర్షపాతం మరియు వాలుగా ఉండే తోట నేలలు కాఫీ గింజలు నాణ్యంగా తయారవ్వడానికి అనుకూలం.",
        "guide": {
            "land": "నీరు నిలవని కొండ వాలు నేలలు. నీడ చెట్లను పెంచాలి.",
            "landEn": "Hilly terrain with good shade tree canopy.",
            "sow": "ఆరోగ్యకరమైన మొక్కలను 2.5 x 2.5 మీటర్లలో నాటాలి.",
            "sowEn": "Plant seedlings at 2.5 x 2.5 m spacing.",
            "fert": "NPK 120:90:120 kg/ha. కాయ కోత తర్వాత ఎరువులు వేయాలి.",
            "fertEn": "NPK 120:90:120 kg/ha in scheduled split applications.",
            "water": "పూత వచ్చే సమయంలో స్ప్రింక్లర్ల ద్వారా నీరు అందించాలి.",
            "waterEn": "Sprinkler irrigation at blossom and backing periods."
        }
    }
]

def extract_user_inputs(body: dict):
    # Extracts parameters from any case or alias
    def get_val(keys, default):
        for k in keys:
            if k in body and body[k] is not None:
                try:
                    return float(body[k])
                except (ValueError, TypeError):
                    pass
        return default

    n = get_val(["N", "n", "nitrogen", "Nitrogen"], 80.0)
    p = get_val(["P", "p", "phosphorus", "Phosphorus"], 45.0)
    k = get_val(["K", "k", "potassium", "Potassium"], 40.0)
    ph = get_val(["ph", "pH", "Ph", "soil_ph"], 6.5)
    temp = get_val(["temperature", "temp", "Temperature"], 25.0)
    hum = get_val(["humidity", "Humidity"], 65.0)
    rain = get_val(["rainfall", "rain", "Rainfall"], 100.0)

    return [n, p, k, temp, hum, ph, rain]

def calculate_agronomic_distance(user_vec, crop_ideal):
    # Normalized scales to avoid skewness
    scales = [140.0, 140.0, 200.0, 35.0, 100.0, 14.0, 300.0]
    weights = [1.2, 1.1, 1.1, 1.2, 0.9, 1.3, 1.5]

    dist_sq = 0.0
    for i in range(7):
        diff = (user_vec[i] - crop_ideal[i]) / scales[i]
        dist_sq += weights[i] * (diff ** 2)

    dist = math.sqrt(dist_sq)
    # Convert distance to a dynamic 70% - 98% suitability percentage
    score = max(70, min(98, round((1.0 - (dist / 2.0)) * 100)))
    return score, dist

@app.post("/api/recommend")
@app.post("/api/recommend-crops")
@app.post("/api/predict-crop")
@app.post("/api/predict")
@app.post("/predict")
async def recommend_crops(request: Request):
    try:
        body = await request.json()
    except Exception:
        body = {}

    user_vec = extract_user_inputs(body)

    ranked = []
    for crop in DATASET_22_CROPS:
        score, dist = calculate_agronomic_distance(user_vec, crop["center"])
        ranked.append({
            "id": crop["id"],
            "crop": crop["name"],
            "cropName": crop["name"],
            "name": crop["name"],
            "cropTe": crop["nameTe"],
            "nameTe": crop["nameTe"],
            "scientific": crop["scientific"],
            "category": crop["category"],
            "categoryTe": crop["categoryTe"],
            "season": crop["season"],
            "seasonTe": crop["seasonTe"],
            "suitabilityScore": score,
            "dist": dist,
            "reason": crop["reason"],
            "reasonTe": crop["reasonTe"],
            "guide": crop["guide"]
        })

    # Sort strictly by lowest distance to the user's specific inputs
    ranked.sort(key=lambda x: x["dist"])

    # Pick top 3 unique crops matching the exact inputs
    top3 = ranked[:3]

    top3[0]["badgeLabel"] = "#1 Best Match"
    top3[0]["badgeLabelTe"] = "#1 అత్యుత్తమ ఎంపిక"
    top3[1]["badgeLabel"] = "#2 Strong Alternative"
    top3[1]["badgeLabelTe"] = "#2 బలమైన ప్రత్యామ్నాయం"
    top3[2]["badgeLabel"] = "#3 Good Alternative"
    top3[2]["badgeLabelTe"] = "#3 మంచి ప్రత్యామ్నాయం"

    for i, r in enumerate(top3):
        r["rank"] = i + 1

    return {
        "status": "success",
        "recommendations": top3,
        "topCrops": top3
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)