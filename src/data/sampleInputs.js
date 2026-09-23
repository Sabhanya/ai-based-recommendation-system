/**
 * Realistic presets and sample data for Croply AI
 * Useful for 1-click form testing and realistic demo showcases.
 */

export const SAMPLE_INPUT_PRESETS = [
  {
    id: "paddy_monsoon",
    titleEn: "Kharif Paddy (Monsoon Delta)",
    titleTe: "ఖరీఫ్ వరి (డెల్టా వర్షాకాలం)",
    icon: "🌾",
    descriptionEn: "High N, moderate P/K, slightly acidic soil, warm & humid with high rainfall.",
    descriptionTe: "ఎక్కువ నత్రజని, తేలికపాటి ఆమ్ల నేల, అధిక వర్షపాతం మరియు ఉక్కపోత.",
    values: {
      N: 90,
      P: 45,
      K: 45,
      pH: 6.5,
      temperature: 26,
      humidity: 82,
      rainfall: 220,
      location: "East Godavari, AP",
      season: "Kharif",
      soilType: "Clayey Loam"
    }
  },
  {
    id: "cotton_black_soil",
    titleEn: "Black Soil Cotton (Kharif Cash)",
    titleTe: "నల్ల రేగడి పత్తి (ఖరీఫ్ వాణిజ్య పంట)",
    icon: "🌱",
    descriptionEn: "High N, warm climate, moderate moisture in deep black cotton soils.",
    descriptionTe: "ఎక్కువ నత్రజని, వేడి వాతావరణం, లోతైన నల్ల రేగడి నేలలు.",
    values: {
      N: 120,
      P: 50,
      K: 20,
      pH: 7.0,
      temperature: 28,
      humidity: 72,
      rainfall: 80,
      location: "Guntur / Warangal",
      season: "Kharif",
      soilType: "Black Soil"
    }
  },
  {
    id: "groundnut_red_soil",
    titleEn: "Groundnut (Red Sandy Soil)",
    titleTe: "వేరుశనగ (ఎర్ర గరప నేలలు)",
    icon: "🥜",
    descriptionEn: "Moderate N, high P, well-drained red soil with moderate rainfall.",
    descriptionTe: "మధ్యస్థ నత్రజని, అధిక భాస్వరం, తేలికపాటి ఎర్ర నేలలు.",
    values: {
      N: 30,
      P: 65,
      K: 30,
      pH: 6.5,
      temperature: 27,
      humidity: 58,
      rainfall: 60,
      location: "Anantapur / Kurnool",
      season: "Kharif",
      soilType: "Red Sandy Soil"
    }
  },
  {
    id: "wheat_rabi",
    titleEn: "Winter Wheat (Rabi Season)",
    titleTe: "శీతాకాలపు గోధుమ (రబీ కాలం)",
    icon: "🌾",
    descriptionEn: "High N, moderate P, cool winter temperatures and dry ripening conditions.",
    descriptionTe: "చల్లని వాతావరణం, సమతుల్య ఎరువులు మరియు తక్కువ వర్షపాతం.",
    values: {
      N: 110,
      P: 55,
      K: 40,
      pH: 6.8,
      temperature: 19,
      humidity: 55,
      rainfall: 60,
      location: "Indo-Gangetic Plains",
      season: "Rabi",
      soilType: "Alluvial Soil"
    }
  },
  {
    id: "chickpea_dry_rabi",
    titleEn: "Chickpea (Rabi Pulse)",
    titleTe: "శనగ పంట (రబీ పప్పుధాన్యం)",
    icon: "🫘",
    descriptionEn: "Low N, high P & K, low humidity and residual winter soil moisture.",
    descriptionTe: "తక్కువ నత్రజని, అధిక భాస్వరం, పొడి వాతావరణం మరియు శీతాకాల తేమ.",
    values: {
      N: 40,
      P: 68,
      K: 80,
      pH: 7.2,
      temperature: 20,
      humidity: 18,
      rainfall: 80,
      location: "Prakasam / Kurnool",
      season: "Rabi",
      soilType: "Black Soil"
    }
  },
  {
    id: "tomato_vegetable",
    titleEn: "Commercial Tomato (Loamy Soil)",
    titleTe: "టమాట కూరగాయ (గరప నేలలు)",
    icon: "🍅",
    descriptionEn: "Balanced NPK, fertile humus-rich loam with controlled irrigation.",
    descriptionTe: "సమతుల్య ఎరువులు, సారవంతమైన నేల మరియు అనుకూల ఉష్ణోగ్రత.",
    values: {
      N: 100,
      P: 60,
      K: 60,
      pH: 6.5,
      temperature: 25,
      humidity: 65,
      rainfall: 75,
      location: "Madanapalle / Chittoor",
      season: "Year-round",
      soilType: "Loamy Soil"
    }
  }
];

// Sample images for testing the Crop Identification page immediately
export const SAMPLE_CROP_IMAGES = [
  {
    id: "sample_rice",
    name: "Rice (Paddy)",
    nameTe: "వరి",
    category: "Cereals",
    url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    confidence: 0.96,
    cropKey: "rice"
  },
  {
    id: "sample_maize",
    name: "Maize (Corn)",
    nameTe: "మొక్కజొన్న",
    category: "Cereals",
    url: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80",
    confidence: 0.94,
    cropKey: "maize"
  },
  {
    id: "sample_cotton",
    name: "Cotton",
    nameTe: "పత్తి",
    category: "Cash Crops",
    url: "https://images.unsplash.com/photo-1594897030560-69c1cf6ddc58?auto=format&fit=crop&w=600&q=80",
    confidence: 0.95,
    cropKey: "cotton"
  },
  {
    id: "sample_groundnut",
    name: "Groundnut (Peanut)",
    nameTe: "వేరుశనగ",
    category: "Oilseeds",
    url: "https://images.unsplash.com/photo-1567892328003-885474c1064d?auto=format&fit=crop&w=600&q=80",
    confidence: 0.92,
    cropKey: "groundnut"
  },
  {
    id: "sample_wheat",
    name: "Wheat",
    nameTe: "గోధుమ",
    category: "Cereals",
    url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    confidence: 0.97,
    cropKey: "wheat"
  },
  {
    id: "sample_tomato",
    name: "Tomato",
    nameTe: "టమాట",
    category: "Vegetables",
    url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    confidence: 0.98,
    cropKey: "tomato"
  }
];
