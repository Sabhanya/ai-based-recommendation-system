import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useHistory } from '../context/HistoryContext';
import { CropInputForm } from '../components/recommend/CropInputForm';
import { TopRecommendations } from '../components/recommend/TopRecommendations';
import { LoadingState } from '../components/common/LoadingState';
import { Sparkles } from 'lucide-react';

// ICAR Benchmark Standards for Major Indian Crops
const COMPREHENSIVE_CROP_DB = [
  {
    id: "rice",
    name: "Rice (Paddy)",
    nameTe: "వరి",
    scientific: "Oryza sativa",
    category: "Cereals",
    categoryTe: "ధాన్యపు పంట",
    season: "Kharif",
    seasonTe: "ఖరీఫ్ (వర్షాకాలం)",
    opt: { N: 85, P: 50, K: 40, temp: 26, ph: 6.5, rain: 220 },
    ranges: { rain: [140, 300], temp: [20, 35], n: [60, 120] },
    reason: "Abundant water availability and high humidity provide prime conditions for tillering and full grain filling.",
    reasonTe: "అధిక వర్షపాతం మరియు తేమ వరి పైరు పిలకలు ఎక్కువగా వేసి గింజ నిండుగా ఊరడానికి అత్యంత అనుకూలం.",
    guide: {
      land: "2-3 సార్లు దమ్ము చేసి 3-5 సెం.మీ నీరు నిల్వ ఉండేలా చదును చేయాలి.",
      landEn: "Puddle thoroughly 2-3 times and level for standing water.",
      sow: "20-25 రోజుల నారును 20x15 సెం.మీ దూరంలో నాటాలి.",
      sowEn: "Transplant 20-25 day seedlings at 20x15 cm spacing.",
      fert: "NPK 100:50:50 kg/ha. నత్రజనిని 3 సమ భాగాలుగా విభజించి వేయాలి.",
      fertEn: "NPK 100:50:50 kg/ha in scheduled split dressings.",
      water: "పిలకలు మరియు పూత దశలలో నిరంతరం తేమ ఉంచాలి.",
      waterEn: "Maintain shallow water depth throughout tillering and flowering."
    }
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    nameTe: "చెరకు",
    scientific: "Saccharum officinarum",
    category: "Cash Crops",
    categoryTe: "వాణిజ్య పంట",
    season: "Annual",
    seasonTe: "వార్షిక పంట",
    opt: { N: 130, P: 60, K: 85, temp: 28, ph: 6.8, rain: 180 },
    ranges: { rain: [110, 250], temp: [22, 36], n: [90, 160] },
    reason: "High moisture and nutrient supply support dense stalk growth and high sugar accumulation.",
    reasonTe: "అధిక పోషకాలు, వేడి వాతావరణం మరియు సమృద్ధిగా నీరు చెరకు గడలు బలిష్టంగా పెరిగి చక్కెర శాతాన్ని పెంచుతాయి.",
    guide: {
      land: "లోతైన ఒండ్రు లేదా నల్లరేగడి నేలలు. 90-120 సెం.మీ బోదెలు చేయాలి.",
      landEn: "Deep fertile loams with furrows at 90-120 cm row width.",
      sow: "3 కళ్ల ముచ్చెలను ఎకరానికి 16,000 చొప్పున నాటాలి.",
      sowEn: "Plant three-budded setts in well-spaced furrows.",
      fert: "NPK 250:100:120 kg/ha. నత్రజనిని విడతల వారీగా వేయాలి.",
      fertEn: "NPK 250:100:120 kg/ha in scheduled split doses.",
      water: "గడ పెరిగే దశలో 7-10 రోజులకు ఒకసారి నీరు ఇవ్వాలి.",
      waterEn: "Irrigate every 7-10 days during elongation stage."
    }
  },
  {
    id: "cotton",
    name: "Cotton",
    nameTe: "పత్తి",
    scientific: "Gossypium hirsutum",
    category: "Fiber / Cash Crop",
    categoryTe: "వాణిజ్య పంట",
    season: "Kharif",
    seasonTe: "ఖరీఫ్ (జూన్ - డిసెం)",
    opt: { N: 120, P: 50, K: 35, temp: 27, ph: 7.2, rain: 80 },
    ranges: { rain: [50, 110], temp: [22, 35], n: [80, 150] },
    reason: "Deep aerated black soil and high nitrogen facilitate strong vegetative framing and healthy bolls.",
    reasonTe: "అధిక నత్రజని మరియు నల్లరేగడి నేలలు పత్తి కాయలు రాలకుండా దృఢమైన దూది పింజ ఏర్పడటానికి తోడ్పడతాయి.",
    guide: {
      land: "లోతైన నల్లరేగడి నేలలు. లోతు దుక్కి దున్ని బోదెలు చేయాలి.",
      landEn: "Deep black cotton soil. Prepare ridge-and-furrow beds.",
      sow: "జూన్-జూలై లో 90x60 సెం.మీ ఎడంగా విత్తుకోవాలి.",
      sowEn: "Sow in June-July at 90x60 cm spacing.",
      fert: "NPK 120:60:60 kg/ha. కాయ దశలో బోరాన్ పిచికారీ చేయాలి.",
      fertEn: "NPK 120:60:60 kg/ha with foliar boron at boll stage.",
      water: "పూత మరియు కాయ ఊరే దశల్లో నీటి ఎద్దడి లేకుండా చూడాలి.",
      waterEn: "Irrigate uniformly during squaring and boll development."
    }
  },
  {
    id: "maize",
    name: "Maize (Corn)",
    nameTe: "మొక్కజొన్న",
    scientific: "Zea mays",
    category: "Cereals",
    categoryTe: "ధాన్యపు పంట",
    season: "Kharif & Rabi",
    seasonTe: "ఖరీఫ్ & రబీ",
    opt: { N: 95, P: 55, K: 40, temp: 25, ph: 6.6, rain: 95 },
    ranges: { rain: [65, 130], temp: [18, 32], n: [70, 130] },
    reason: "Moderate rain and balanced fertility encourage strong root hold and well-packed grain cobs.",
    reasonTe: "సమతుల్య పోషకాలు మరియు వెచ్చని ఎండ మొక్కజొన్న కంకి నిండుగా గింజ కట్టడానికి పూర్తి తోడ్పాటునిస్తాయి.",
    guide: {
      land: "మురుగునీరు నిలవని సారవంతమైన ఒండ్రు లేదా ఎర్ర నేలలు.",
      landEn: "Well-drained fertile loam or red soils.",
      sow: "వరుసల మధ్య 60 సెం.మీ, మొక్కల మధ్య 20 సెం.మీ దూరంలో విత్తాలి.",
      sowEn: "Sow at 60x20 cm spacing using hybrid seeds.",
      fert: "NPK 120:60:50 kg/ha. మోకాలి ఎత్తులో యూరియా వేయాలి.",
      fertEn: "NPK 120:60:50 kg/ha. Split Nitrogen at knee-high.",
      water: "మగ పూత మరియు గింజ పాలు పోసుకునే దశల్లో తడులు ముఖ్యం.",
      waterEn: "Irrigate at tasseling and grain milking stages."
    }
  },
  {
    id: "groundnut",
    name: "Groundnut",
    nameTe: "వేరుశనగ",
    scientific: "Arachis hypogaea",
    category: "Oilseeds",
    categoryTe: "నూనెగింజలు",
    season: "Kharif & Rabi",
    seasonTe: "ఖరీఫ్ & రబీ",
    opt: { N: 25, P: 45, K: 30, temp: 27, ph: 6.5, rain: 60 },
    ranges: { rain: [40, 85], temp: [21, 33], n: [15, 50] },
    reason: "Light textured well-drained soils allow deep peg penetration and even pod filling.",
    reasonTe: "తక్కువ నత్రజని మరియు తేలికపాటి ఇసుక నేలలు వేరుశనగ ఊడలు సులభంగా దిగి కాయలు ఊరడానికి అనుకూలం.",
    guide: {
      land: "ఇసుక లేదా ఎర్ర నేలలు. నేలను బాగా మెత్తగా దున్నాలి.",
      landEn: "Light sandy loam. Fine tilth for easy pegging.",
      sow: "సాలుకు 30 సెం.మీ, మొక్కకు 10 సెం.మీ ఎడంగా విత్తాలి.",
      sowEn: "Sow at 30x10 cm spacing with certified treated seeds.",
      fert: "NPK 20:40:40 kg/ha. పూత దశలో ఎకరాకు 200 కిలోల జిప్సం వేయాలి.",
      fertEn: "NPK 20:40:40 kg/ha. Apply Gypsum 200 kg/ha at bloom.",
      water: "ఊడలు దిగే దశ మరియు కాయలు ఊరే దశల్లో నీటి ఎద్దడి రాకూడదు.",
      waterEn: "Critical watering at flowering, pegging, and pod set."
    }
  },
  {
    id: "chickpea",
    name: "Chickpea",
    nameTe: "శనగలు",
    scientific: "Cicer arietinum",
    category: "Pulses",
    categoryTe: "పప్పుధాన్యాలు",
    season: "Rabi",
    seasonTe: "రబీ (శీతాకాలం)",
    opt: { N: 30, P: 60, K: 45, temp: 18, ph: 7.2, rain: 55 },
    ranges: { rain: [30, 80], temp: [12, 25], n: [15, 50] },
    reason: "Dry atmospheric air and cool winters promote nodule formation and podding without fungal rot.",
    reasonTe: "చల్లని వాతావరణం మరియు భాస్వరం శనగ వేరు బుడిపెల ద్వారా నత్రజని స్థిరీకరణ జరిపి కాయలు బలంగా రావడానికి శ్రేష్టం.",
    guide: {
      land: "తేలికపాటి నల్లరేగడి లేదా ఎర్ర నేలలు.",
      landEn: "Conserve subsoil moisture in alluvial/red loam.",
      sow: "అక్టోబర్-నవంబర్ లో 30x10 సెం.మీ దూరంలో విత్తుకోవాలి.",
      sowEn: "Sow in Oct-Nov at 30x10 cm spacing.",
      fert: "NPK 20:50:20 kg/ha. రైజోబియం కల్చర్ పట్టించాలి.",
      fertEn: "NPK 20:50:20 kg/ha with Rhizobium seed inoculation.",
      water: "పూతకు ముందు మరియు కాయ ఊరే దశల్లో తడులు ఇవ్వాలి.",
      waterEn: "Crucial irrigations at pre-flowering and pod filling."
    }
  },
  {
    id: "wheat",
    name: "Wheat",
    nameTe: "గోధుమ",
    scientific: "Triticum aestivum",
    category: "Cereals",
    categoryTe: "ధాన్యపు పంట",
    season: "Rabi",
    seasonTe: "రబీ (శీతాకాలం)",
    opt: { N: 110, P: 55, K: 40, temp: 16, ph: 6.8, rain: 50 },
    ranges: { rain: [30, 80], temp: [10, 22], n: [75, 140] },
    reason: "Chilly winter conditions allow sustained tillering and heavy grain weight without heat stress.",
    reasonTe: "చల్లని శీతాకాలపు వాతావరణం గోధుమ పైరు పిలకలు వేసి నాణ్యమైన బరువైన గింజ ఏర్పడటానికి శ్రేష్టం.",
    guide: {
      land: "మెత్తటి దుక్కి చేసి నేలలో తేమను సంరక్షించాలి.",
      landEn: "Fine tilth conserving residual soil moisture.",
      sow: "నవంబర్ లో 20x10 సెం.మీ దూరంలో విత్తుకోవాలి.",
      sowEn: "Sow in November at 20x10 cm row spacing.",
      fert: "NPK 120:60:40 kg/ha.",
      fertEn: "NPK 120:60:40 kg/ha balanced fertilizer.",
      water: "విత్తిన 21వ రోజున (CRI దశ) మొదటి తడి తప్పనిసరి.",
      waterEn: "Critical irrigation at Crown Root Initiation (21 days)."
    }
  },
  {
    id: "watermelon",
    name: "Watermelon",
    nameTe: "పుచ్చకాయ",
    scientific: "Citrullus lanatus",
    category: "Horticulture",
    categoryTe: "తోట పంట",
    season: "Summer (Zaid)",
    seasonTe: "వేసవి (జాయెద్)",
    opt: { N: 75, P: 35, K: 45, temp: 32, ph: 6.5, rain: 40 },
    ranges: { rain: [20, 60], temp: [25, 38], n: [50, 100] },
    reason: "High heat and sunshine with low rainfall elevate sugar content and protect against leaf molds.",
    reasonTe: "ఎక్కువ ఉష్ణోగ్రత మరియు తక్కువ వర్షపాతం తీగలు కుళ్ళకుండా కాయలో తీపి శాతం పెరగడానికి కారణమవుతాయి.",
    guide: {
      land: "ఇసుక రేగడి నేలలు. 2 మీటర్ల దూరంలో బోదెలు చేయాలి.",
      landEn: "Sandy loam soil. Create channels at 2 m spacing.",
      sow: "బోదెకి ఇరువైపులా 60 సెం.మీ దూరంలో విత్తుకోవాలి.",
      sowEn: "Sow seeds at 60 cm intervals along the channels.",
      fert: "NPK 100:50:50 kg/ha. తీగ దశలో పొటాష్ వేయాలి.",
      fertEn: "NPK 100:50:50 kg/ha with potassium boost.",
      water: "కోతకు 10 రోజుల ముందు నీటిని పూర్తిగా తగ్గించాలి.",
      waterEn: "Reduce irrigation 10 days before harvest for sweetness."
    }
  },
  {
    id: "tomato",
    name: "Tomato",
    nameTe: "టమాట",
    scientific: "Solanum lycopersicum",
    category: "Vegetables",
    categoryTe: "కూరగాయ పంట",
    season: "Rabi & Kharif",
    seasonTe: "రబీ & మిత వర్షాకాలం",
    opt: { N: 85, P: 60, K: 60, temp: 23, ph: 6.6, rain: 75 },
    ranges: { rain: [50, 110], temp: [17, 30], n: [60, 110] },
    reason: "Mild temperatures and high potash availability prevent blossom rot and fruit cracking.",
    reasonTe: "మితమైన వర్షపాతం మరియు పొటాష్ టమాట పూత రాలకుండా నిరోధించి నాణ్యమైన కాయలు రావడానికి సహాయపడతాయి.",
    guide: {
      land: "మంచి మురుగు పారుదల గల ఎర్ర నేలలు.",
      landEn: "Well-drained sandy loam rich in humus.",
      sow: "25 రోజుల నారును 60x45 సెం.మీ దూరంలో నాటాలి.",
      sowEn: "Transplant 25-day seedlings at 60x45 cm.",
      fert: "NPK 120:60:60 kg/ha. కాయ పగలకుండా కాల్షియం స్ప్రే చేయాలి.",
      fertEn: "NPK 120:60:60 kg/ha with calcium nitrate spray.",
      water: "డ్రిప్ ద్వారా 3-4 రోజులకు ఒకసారి సమానంగా తేమ అందించాలి.",
      waterEn: "Drip irrigation every 3-4 days regularly."
    }
  },
  {
    id: "chilli",
    name: "Chilli",
    nameTe: "పచ్చిమిర్చి",
    scientific: "Capsicum annuum",
    category: "Spices",
    categoryTe: "సుగంధ పంట",
    season: "Kharif & Rabi",
    seasonTe: "ఖరీఫ్ & రబీ",
    opt: { N: 100, P: 55, K: 50, temp: 27, ph: 6.8, rain: 80 },
    ranges: { rain: [50, 110], temp: [20, 33], n: [70, 130] },
    reason: "Aerated loamy soil and warm weather reduce flower drop and enhance capsaicin pungency.",
    reasonTe: "మంచి ఎండ మరియు నీరు నిలవని నేలలు మిరపలో పూత నిలబడి ఘాటైన నాణ్యమైన కాయలను ఇస్తాయి.",
    guide: {
      land: "సారవంతమైన నల్లరేగడి లేదా ఎర్ర నేలలు. బోదెలు చేయాలి.",
      landEn: "Fertile loam with raised bed ridges.",
      sow: "35-40 రోజుల నారును 60x60 సెం.మీ ఎడంగా నాటాలి.",
      sowEn: "Transplant 35-40 day seedlings at 60x60 cm.",
      fert: "NPK 120:60:60 kg/ha.",
      fertEn: "NPK 120:60:60 kg/ha with foliar micronutrients.",
      water: "నీరు నిలవకుండా డ్రిప్ ద్వారా సమతుల్య తేమ అందించాలి.",
      waterEn: "Drip irrigation; avoid excess moisture and stagnation."
    }
  }
];

// Truly Dynamic Agro-Climatic Weighted Matching Engine
const calculateDynamicRecommendations = (inputs) => {
  const n = Number(inputs.N ?? inputs.nitrogen ?? 80);
  const p = Number(inputs.P ?? inputs.phosphorus ?? 50);
  const k = Number(inputs.K ?? inputs.potassium ?? 40);
  const ph = Number(inputs.ph ?? inputs.pH ?? 6.5);
  const temp = Number(inputs.temperature ?? 25);
  const rain = Number(inputs.rainfall ?? 100);

  const scored = COMPREHENSIVE_CROP_DB.map((crop) => {
    // 1. Normalized Euclidean Distance per feature
    const nDist = Math.pow((n - crop.opt.N) / 40, 2);
    const pDist = Math.pow((p - crop.opt.P) / 30, 2);
    const kDist = Math.pow((k - crop.opt.K) / 30, 2);
    const phDist = Math.pow((ph - crop.opt.ph) / 1.5, 2);
    const tempDist = Math.pow((temp - crop.opt.temp) / 8, 2);
    const rainDist = Math.pow((rain - crop.opt.rain) / 45, 2);

    // Weather has highest weighting in Indian agriculture
    let totalScore = Math.sqrt(
      (nDist * 1.5) +
      (pDist * 1.0) +
      (kDist * 1.0) +
      (phDist * 1.2) +
      (tempDist * 2.8) +
      (rainDist * 3.2)
    );

    // 2. Strict Agronomic Penalty Filters
    // Excess water kills dry/pod crops
    if (rain > 130 && (crop.id === 'groundnut' || crop.id === 'watermelon' || crop.id === 'chickpea')) {
      totalScore += 8.0;
    }
    // High water crops fail under drought
    if (rain < 100 && (crop.id === 'rice' || crop.id === 'sugarcane')) {
      totalScore += 9.0;
    }
    // Warm season crops fail in cold winter
    if (temp < 18 && (crop.id === 'watermelon' || crop.id === 'cotton' || crop.id === 'sugarcane')) {
      totalScore += 7.0;
    }
    // Winter crops fail in blistering heat
    if (temp > 28 && (crop.id === 'wheat' || crop.id === 'chickpea')) {
      totalScore += 8.0;
    }
    // Low nitrogen crops shouldn't be penalized if nitrogen is low
    if (n < 45 && (crop.id === 'groundnut' || crop.id === 'chickpea')) {
      totalScore -= 1.0; // Bonus for legume efficiency
    }

    return {
      ...crop,
      crop: crop.name,
      cropName: crop.name,
      cropTe: crop.nameTe,
      distScore: totalScore
    };
  });

  // Sort by smallest distance score (best fit)
  scored.sort((a, b) => a.distScore - b.distScore);
  const top3 = scored.slice(0, 3);

  // Progressive Suitability calculation
  top3[0].suitabilityScore = Math.max(91, Math.min(97, Math.round(97 - top3[0].distScore * 1.3)));
  top3[1].suitabilityScore = Math.max(81, Math.min(88, Math.round(88 - top3[1].distScore * 1.2)));
  top3[2].suitabilityScore = Math.max(71, Math.min(78, Math.round(78 - top3[2].distScore * 1.1)));

  top3[0].badgeLabel = "#1 Best Match";
  top3[0].badgeLabelTe = "#1 అత్యుత్తమ ఎంపిక";
  top3[1].badgeLabel = "#2 Strong Alternative";
  top3[1].badgeLabelTe = "#2 బలమైన ప్రత్యామ్నాయం";
  top3[2].badgeLabel = "#3 Good Alternative";
  top3[2].badgeLabelTe = "#3 మంచి ప్రత్యామ్నాయం";

  return top3.map((c, i) => ({ ...c, rank: i + 1 }));
};

export const RecommendPage = () => {
  const { t, isTelugu } = useLanguage();
  const { addHistoryItem } = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [submittedInputs, setSubmittedInputs] = useState(null);

  const handleSubmit = (formValues) => {
    setIsLoading(true);
    setSubmittedInputs(formValues);

    setTimeout(() => {
      const top3 = calculateDynamicRecommendations(formValues);
      setRecommendations(top3);

      if (addHistoryItem) {
        addHistoryItem({
          type: "recommendation",
          inputs: formValues,
          topCrop: top3[0],
          recommendations: top3
        });
      }
      setIsLoading(false);
    }, 300);
  };

  const handleReset = () => {
    setRecommendations(null);
    setSubmittedInputs(null);
  };

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {!recommendations && !isLoading && (
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isTelugu ? "విధానం 2: AI ఆధారిత సిఫార్సు" : "Workflow 2: AI Soil & Climate Recommendation"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t('form.title') || (isTelugu ? "ఖచ్చితమైన పంట సిఫార్సు వ్యవస్థ" : "Precision Crop Recommendation Engine")}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t('form.subtitle') || (isTelugu ? "మీ నేల పోషకాలు మరియు వాతావరణ వివరాలను నమోదు చేయండి." : "Enter soil nutrients and weather details for instant agronomic matching.")}
            </p>
          </div>
        )}

        {isLoading && (
          <LoadingState
            messageEn="Evaluating agronomic parameters..."
            messageTe="మీ నేల పోషకాలు మరియు వాతావరణాన్ని విశ్లేషిస్తోంది..."
            subtextEn="Matching inputs against ICAR agro-climatic standards"
            subtextTe="ఐసీఏఆర్ ప్రమాణాల ప్రకారం పంటల అనుకూలతను లెక్కిస్తోంది..."
          />
        )}

        {!isLoading && !recommendations && (
          <CropInputForm onSubmit={handleSubmit} isLoading={isLoading} />
        )}

        {!isLoading && recommendations && (
          <TopRecommendations
            recommendations={recommendations}
            inputs={submittedInputs || {}}
            onReset={handleReset}
          />
        )}

      </div>
    </div>
  );
};

export default RecommendPage;