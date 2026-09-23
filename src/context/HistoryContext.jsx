import React, { createContext, useContext, useState, useEffect } from 'react';

const HistoryContext = createContext();

const STORAGE_KEY = 'croply_recommendation_history';

// Default initial history item so users immediately see how records look on first run
const INITIAL_DEMO_HISTORY = [
  {
    id: "demo-hist-1",
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    type: "recommendation",
    inputs: {
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
    },
    topCrop: {
      id: "rice",
      name: "Rice (Paddy)",
      nameTe: "వరి (వరి ధాన్యం)",
      score: 0.96,
      reason: "Optimal nitrogen level, favorable warm temperature (26°C), high humidity (82%), and abundant rainfall (220mm) match paddy requirements perfectly."
    },
    recommendations: [
      {
        id: "rice",
        name: "Rice (Paddy)",
        nameTe: "వరి (వరి ధాన్యం)",
        score: 0.96,
        reason: "Optimal nitrogen level, favorable warm temperature (26°C), high humidity (82%), and abundant rainfall (220mm) match paddy requirements perfectly."
      },
      {
        id: "maize",
        name: "Maize (Corn)",
        nameTe: "మొక్కజొన్న",
        score: 0.88,
        reason: "Favorable temperature and adequate soil nutrients support strong vegetative maize growth."
      },
      {
        id: "sugarcane",
        name: "Sugarcane",
        nameTe: "చెరకు",
        score: 0.82,
        reason: "High rainfall and clay loam soil conditions are well-suited for long-duration sugarcane cultivation."
      }
    ]
  },
  {
    id: "demo-hist-2",
    timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
    type: "identification",
    crop: {
      id: "cotton",
      name: "Cotton",
      nameTe: "పత్తి",
      confidence: 0.95,
      category: "Cash Crops"
    },
    imageUrl: "https://images.unsplash.com/photo-1594897030560-69c1cf6ddc58?auto=format&fit=crop&w=400&q=80"
  }
];

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_DEMO_HISTORY;
    } catch (e) {
      return INITIAL_DEMO_HISTORY;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  }, [history]);

  const addHistoryItem = (item) => {
    const newItem = {
      id: `rec-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date().toISOString(),
      ...item
    };
    setHistory(prev => [newItem, ...prev]);
    return newItem;
  };

  const deleteHistoryItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  // Compute analytics for farmer dashboard
  const totalCount = history.length;
  const recentItem = history.length > 0 ? history[0] : null;

  // Calculate most frequent recommended crop
  const cropCounts = {};
  history.forEach(item => {
    if (item.topCrop && item.topCrop.name) {
      cropCounts[item.topCrop.name] = (cropCounts[item.topCrop.name] || 0) + 1;
    } else if (item.crop && item.crop.name) {
      cropCounts[item.crop.name] = (cropCounts[item.crop.name] || 0) + 1;
    }
  });

  let topCrop = "Rice (Paddy)";
  let maxCount = 0;
  Object.keys(cropCounts).forEach(cropName => {
    if (cropCounts[cropName] > maxCount) {
      maxCount = cropCounts[cropName];
      topCrop = cropName;
    }
  });

  return (
    <HistoryContext.Provider
      value={{
        history,
        addHistoryItem,
        deleteHistoryItem,
        clearHistory,
        stats: {
          totalCount,
          recentItem,
          topCrop: totalCount > 0 ? topCrop : "None yet",
          cropDistribution: cropCounts
        }
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within HistoryProvider");
  }
  return context;
};
