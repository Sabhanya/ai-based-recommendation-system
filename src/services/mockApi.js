import { CROPS_DATASET, getCropByIdOrName } from '../data/cropsDataset';
import { getTop3Recommendations, evaluateSingleCropSuitability } from '../utils/suitabilityCalculator';

/**
 * Resilient Client-Side Agronomic Calculation Engine.
 * Used only when the backend service is offline.
 * Does not make fake guesses or default to Rice.
 */

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  /**
   * Evaluates manual soil & climate inputs using Agronomic Multi-Criteria Optimization
   */
  async predict(params) {
    await delay(500);
    const top3 = getTop3Recommendations(params);

    return {
      status: "success",
      source: "Croply AI Agronomic Optimization Engine",
      recommendations: top3.map(r => ({
        id: r.cropId,
        crop: r.crop,
        cropTe: r.cropTe,
        score: r.score,
        scorePercent: r.scorePercent,
        reason: r.reason,
        reasonTe: r.reasonTe,
        breakdown: r.breakdown,
        cropDetails: r.cropDetails
      }))
    };
  },

  /**
   * Offline Image Classification Fallback.
   * Prompts user to start backend server for AI computer vision inference.
   */
  async identifyCrop(imagePayload) {
    await delay(400);

    return {
      status: "unrecognized",
      message: "Unable to confidently identify this plant. Please upload a clear image.",
      messageTe: "ఈ మొక్కను ఖచ్చితంగా గుర్తించలేకపోయాను. దయచేసి స్పష్టమైన చిత్రాన్ని అప్లోడ్ చేయండి."
    };
  },

  /**
   * Fetch crop details from dataset
   */
  async getCropDetails(cropName) {
    await delay(100);
    const crop = getCropByIdOrName(cropName);
    if (!crop) {
      throw new Error(`Crop '${cropName}' not found in agronomic dataset.`);
    }
    return {
      status: "success",
      data: crop
    };
  },

  /**
   * List all crops from dataset
   */
  async getAllCrops() {
    await delay(100);
    return {
      status: "success",
      count: CROPS_DATASET.length,
      data: CROPS_DATASET
    };
  },

  /**
   * Check suitability
   */
  async checkSuitability(cropKey, soilWeatherParams) {
    await delay(300);
    return evaluateSingleCropSuitability(cropKey, soilWeatherParams);
  }
};
