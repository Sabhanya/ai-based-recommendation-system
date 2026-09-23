/**
 * Input validation helpers for soil and climate parameters.
 * Provides farmer-friendly error messages in English and Telugu.
 */

export const PARAM_LIMITS = {
  N: { min: 0, max: 250, labelEn: "Nitrogen (N)", labelTe: "నత్రజని (N)", unit: "kg/ha" },
  P: { min: 0, max: 250, labelEn: "Phosphorus (P)", labelTe: "భాస్వరం (P)", unit: "kg/ha" },
  K: { min: 0, max: 250, labelEn: "Potassium (K)", labelTe: "పొటాషియం (K)", unit: "kg/ha" },
  pH: { min: 3.5, max: 9.5, labelEn: "Soil pH", labelTe: "నేల pH విలువ", unit: "" },
  temperature: { min: 0, max: 55, labelEn: "Temperature", labelTe: "ఉష్ణోగ్రత", unit: "°C" },
  humidity: { min: 5, max: 100, labelEn: "Humidity", labelTe: "తేమ శాతం", unit: "%" },
  rainfall: { min: 5, max: 500, labelEn: "Rainfall", labelTe: "వర్షపాతం", unit: "mm" },
};

export const validateParam = (key, value, lang = 'en') => {
  const meta = PARAM_LIMITS[key];
  if (!meta) return null;

  const label = lang === 'te' ? meta.labelTe : meta.labelEn;

  if (value === '' || value === null || value === undefined) {
    return lang === 'te' 
      ? `దయచేసి ${label} విలువను నమోదు చేయండి.`
      : `Please enter a value for ${label}.`;
  }

  const num = Number(value);
  if (isNaN(num)) {
    return lang === 'te'
      ? `దయచేసి ${label} కోసం సరైన సంఖ్యను నమోదు చేయండి.`
      : `Please enter a valid numeric number for ${label}.`;
  }

  if (num < meta.min || num > meta.max) {
    return lang === 'te'
      ? `${label} విలువ తప్పనిసరిగా ${meta.min} మరియు ${meta.max} ${meta.unit} మధ్య ఉండాలి.`
      : `${label} must be between ${meta.min} and ${meta.max} ${meta.unit}.`;
  }

  return null;
};

export const validateForm = (formValues, lang = 'en') => {
  const errors = {};
  const requiredKeys = ['N', 'P', 'K', 'pH', 'temperature', 'humidity', 'rainfall'];

  requiredKeys.forEach(key => {
    const err = validateParam(key, formValues[key], lang);
    if (err) {
      errors[key] = err;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
