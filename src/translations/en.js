/**
 * English Language Dictionary for Croply AI
 * Farmer-focused terminology without technical jargon
 */

export const en = {
  brand: {
    name: "Croply AI",
    tagline: "Smart Farming Starts Here",
    subtagline: "AI-powered crop recommendations and plant identification based on soil and environmental conditions.",
    badge: "Bilingual AI Agri-Advisor"
  },
  nav: {
    home: "Home",
    recommend: "Get Recommendation",
    identify: "Identify Crop",
    catalog: "Crop Catalog",
    dashboard: "Dashboard",
    history: "History",
    about: "About"
  },
  hero: {
    badge: "🌾 India's Farmer-First Agricultural AI",
    title: "Precision Farming Decision Support for Every Indian Farmer",
    subtitle: "Input your soil nutrients and climate parameters or upload a crop photo to receive genuine AI-powered recommendations with suitability reasoning.",
    ctaPrimary: "Get Crop Recommendation",
    ctaSecondary: "Identify My Crop",
    quickStats: {
      accuracy: "Trained ML Models",
      crops: "80+ Agricultural Crops",
      languages: "English & తెలుగు Support",
      speed: "Direct Farmer Advice"
    }
  },
  features: {
    heading: "Smart Farming Features",
    subheading: "Designed for simplicity in the field and rigorous technical accuracy.",
    item1: {
      title: "AI Crop Recommendation",
      desc: "Recommend top-performing crops based on NPK soil nutrients, pH, rainfall, temperature, and humidity."
    },
    item2: {
      title: "Soil & Weather Analysis",
      desc: "Evaluate your farm's macro and micro-environmental parameters against benchmark agronomy requirements."
    },
    item3: {
      title: "Crop Image Identification",
      desc: "Upload a crop leaf or farm image to identify the plant species and verify regional suitability."
    },
    item4: {
      title: "Top 3 Ranked Recommendations",
      desc: "Receive 1st, 2nd, and 3rd rank crop alternatives with suitability scores for diversified risk management."
    },
    item5: {
      title: "Bilingual Support (EN | తెలుగు)",
      desc: "Fully translated in farmer-friendly Telugu and English with voice audio guidance for accessibility."
    },
    item6: {
      title: "Farmer-Friendly Interface",
      desc: "Large touch buttons, clear visual indicators, 1-click test presets, and printable advisory summaries."
    }
  },
  workflows: {
    heading: "How Croply AI Works",
    subheading: "Two intuitive AI workflows designed for real agricultural field decisions.",
    workflow1: {
      badge: "Workflow 1",
      title: "Crop Image Identification & Suitability",
      step1: "Upload Crop Photo",
      step2: "Computer Vision Recognition",
      step3: "Agronomy Parameter Match",
      step4: "Suitability & Soil Advice"
    },
    workflow2: {
      badge: "Workflow 2",
      title: "Soil & Climate Manual Recommendation",
      step1: "Enter Soil & Climate",
      step2: "Trained ML Model Inference",
      step3: "Top 3 Ranked Recommendations",
      step4: "Transparent 'Why This Crop?'"
    }
  },
  form: {
    title: "Soil & Environmental Parameters",
    subtitle: "Enter your farm's soil test report and climate conditions to find the most suitable crops.",
    presetsTitle: "⚡ Quick Demo Presets (1-Click Fill):",
    soilSection: "1. Soil Nutrients & pH",
    soilSectionDesc: "Enter values from your soil health card (SHC)",
    envSection: "2. Environmental & Climate Parameters",
    envSectionDesc: "Enter average seasonal temperature, humidity and rainfall",
    optionalSection: "3. Location & Field Details (Optional)",
    optionalSectionDesc: "Helps tailor season and regional agro-climatic context",
    
    nLabel: "Nitrogen (N)",
    nHelp: "Ratio of Nitrogen content in soil (0 - 250 kg/ha)",
    pLabel: "Phosphorus (P)",
    pHelp: "Ratio of Phosphorus content in soil (0 - 250 kg/ha)",
    kLabel: "Potassium (K)",
    kHelp: "Ratio of Potassium content in soil (0 - 250 kg/ha)",
    phLabel: "Soil pH Level",
    phHelp: "Acidity / Alkalinity level of soil (3.5 to 9.5. 6.0-7.5 is optimal)",
    
    tempLabel: "Temperature (°C)",
    tempHelp: "Average seasonal temperature in degrees Celsius (0 - 55 °C)",
    humidityLabel: "Humidity (%)",
    humidityHelp: "Relative atmospheric humidity percentage (5 - 100 %)",
    rainfallLabel: "Rainfall (mm)",
    rainfallHelp: "Average seasonal rainfall in millimeters (5 - 500 mm)",

    locationLabel: "District / Region",
    locationPlaceholder: "e.g. East Godavari, Warangal, Kurnool",
    seasonLabel: "Growing Season",
    seasonPlaceholder: "Select Season",
    soilTypeLabel: "Soil Type",
    soilTypePlaceholder: "Select Soil Type",

    submitBtn: "Get Crop Recommendation",
    submittingBtn: "Analyzing Soil & Climate...",
    clearBtn: "Clear Form",
    voiceReadBtn: "Read Form Instructions 🔊",

    seasons: {
      kharif: "Kharif (Monsoon / June - Nov)",
      rabi: "Rabi (Winter / Oct - March)",
      zaid: "Zaid (Summer / March - June)",
      yearround: "Year-Round / Perennial"
    },
    soilTypes: {
      alluvial: "Alluvial Soil (ఒండ్రు నేలలు)",
      black: "Black Cotton Soil (నల్ల రేగడి)",
      red: "Red Sandy Loam (ఎర్ర గరప నేలలు)",
      clay: "Clayey Soil (బంక నేలలు)",
      sandy: "Sandy Soil (ఇసుక నేలలు)",
      laterite: "Laterite Soil (లేటరైట్ నేలలు)"
    }
  },
  results: {
    heading: "Top 3 Recommended Crops",
    subheading: "Based on your entered soil nutrients and environmental parameters:",
    rank1: "🥇 #1 Best Match",
    rank2: "🥈 #2 Strong Alternative",
    rank3: "🥉 #3 Good Alternative",
    suitabilityScore: "Recommendation Score",
    whyBtn: "Why this crop?",
    viewDetailsBtn: "View Crop Guide",
    readResultsBtn: "Read Recommendations Out Loud 🔊",
    stopAudioBtn: "Stop Speaking ⏹️",
    saveToHistory: "Saved to History",
    tryAgainBtn: "Modify Parameters / Try Again",
    printBtn: "Print / Save Advisory Report",
    modalTitle: "Why is {crop} recommended for your farm?",
    parameterComparison: "Farmer Input vs Crop Ideal Requirements",
    paramName: "Parameter",
    yourValue: "Your Value",
    idealRange: "Ideal Crop Range",
    status: "Compatibility Match",
    closeModal: "Close"
  },
  identify: {
    title: "Identify My Crop",
    subtitle: "Upload a photo of your crop, leaf, or field to detect the species and verify suitability for your region.",
    uploadPrompt: "Drag & drop a crop photo here, or click to browse",
    uploadSubtext: "Supports JPG, JPEG, PNG, WEBP (Max 15MB)",
    sampleGalleryTitle: "Or choose a sample crop image for testing:",
    previewTitle: "Selected Crop Image",
    removeBtn: "Remove Image",
    changeBtn: "Choose Another",
    identifyBtn: "Identify Crop",
    processingBtn: "Analyzing crop image with AI...",
    resultTitle: "Identified Crop Result",
    confidenceText: "AI Identification Confidence",
    matchedParameters: "Agronomic Parameters for Identified Crop",
    suitabilitySection: "Is this crop suitable for your soil & climate?",
    checkSuitabilityBtn: "Check Field Suitability",
    suitabilityResult: {
      suitable: "✅ Highly Suitable for Your Farm",
      moderate: "⚠️ Moderately Suitable (Manage Soil Nutrients)",
      unsuitable: "❌ Not Recommended for Current Conditions"
    },
    unrecognizedError: "Unable to confidently identify this plant. Please upload a clear image."
  },
  catalog: {
    title: "Agricultural Crop Knowledgebase",
    subtitle: "Explore optimal agronomy parameters, nutrient requirements, seasons, and disease guides for 80+ Indian crops.",
    searchPlaceholder: "Search crops by name (e.g. Tomato, Potato, వరి, Mango)...",
    allCategory: "All Categories",
    viewDetails: "View Cultivation Guide",
    nRequirement: "N (Nitrogen)",
    pRequirement: "P (Phosphorus)",
    kRequirement: "K (Potassium)",
    phRequirement: "pH Range",
    tempRequirement: "Temp Range",
    rainRequirement: "Rainfall Need",
    season: "Season",
    soil: "Soil Type",
    water: "Water Requirement"
  },
  history: {
    title: "Recommendation History",
    subtitle: "Review and manage your past soil analyses and crop recommendations.",
    emptyTitle: "No recommendations recorded yet.",
    emptyDesc: "Run a crop recommendation or crop identification to start tracking your farm advisory history.",
    colDate: "Date & Time",
    colInputs: "Soil & Climate Inputs",
    colTopCrop: "Top Recommendation",
    colAlternatives: "Alternatives",
    colActions: "Actions",
    viewBtn: "View Details",
    deleteBtn: "Delete",
    clearAllBtn: "Clear All History",
    filterPlaceholder: "Filter by crop name or location..."
  },
  dashboard: {
    title: "Farmer Advisory Dashboard",
    subtitle: "Overview of soil health analyses, top recommended crops, and seasonal agricultural tips.",
    kpiTotal: "Total Recommendations",
    kpiTopCrop: "Most Recommended Crop",
    kpiRecent: "Latest Recommendation",
    kpiAccuracy: "AI Model Status",
    recentHeading: "Recent Farm Analyses",
    quickActionsHeading: "Quick Farming Actions",
    tipTitle: "🌾 Agro-Advisory Tip of the Day",
    tipBody: "Before sowing, conduct a soil test to avoid excess fertilizer application. Split dosing increases nutrient use efficiency by up to 25%."
  },
  about: {
    title: "About RythuMitra AI",
    subtitle: "A smart farming assistant designed to help Indian farmers make informed agricultural decisions.",
    missionBadge: "Our Mission",
    descriptionTitle: "What RythuMitra AI Does",
    descriptionText: "RythuMitra AI is a smart farming assistant that helps farmers identify plants and crops from images and choose suitable crops using soil and weather information.",
    howItHelpsTitle: "How It Helps Farmers",
    features: [
      {
        title: "Crop & Plant Image Identification",
        desc: "Upload a plant or crop photo to quickly identify the species and view detailed cultivation guidance."
      },
      {
        title: "Soil & Weather Based Recommendation",
        desc: "Enter your soil nutrients (N, P, K, pH) and local weather conditions to receive the Top 3 most suitable crops for your land."
      },
      {
        title: "Bilingual & Voice Support",
        desc: "Available in English and Telugu with voice assistance so every farmer can easily access advice."
      }
    ],
    purposeTitle: "Our Purpose",
    purposeText: "To support farmers with clear, reliable, and easy-to-use digital advice that reduces risk, prevents fertilizer waste, and improves harvest yield."
  },
  voice: {
    ready: "Click anywhere on this button to hear instructions",
    listening: "Speaking...",
    stopped: "Audio stopped",
    fallbackNotice: "Voice speech is not supported in this browser. Instructions are displayed on screen."
  },
  validation: {
    requiredField: "Please enter a value for {field}.",
    invalidNumber: "Please enter a valid numeric value for {field}.",
    outOfRange: "{field} must be between {min} and {max}.",
    invalidPh: "Soil pH must be between 3.5 and 9.5."
  },
  footer: {
    aboutText: "Croply AI – Precision Agriculture Platform for Indian Farmers. Providing reliable AI crop recommendations in English & Telugu.",
    kisanHelpline: "Kisan Call Center (Toll-Free): 1800-180-1551",
    rights: "© 2026 Croply AI Project. Developed for farmer decision support."
  }
};
