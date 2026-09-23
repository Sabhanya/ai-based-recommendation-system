const rawBase = import.meta.env?.VITE_API_URL || "http://127.0.0.1:8000";
const API_BASE_URL = rawBase.replace(/\/api\/?$/, "").replace(/\/+$/, "");

export const api = {
  identifyCrop: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE_URL}/api/identify-crop`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorData = null;
        try {
          errorData = await response.json();
        } catch (e) {
          const errorText = await response.text();
          errorData = { detail: errorText };
        }

        const detailMsg = typeof errorData?.detail === 'object'
          ? (errorData.detail.message || errorData.detail.messageTe || JSON.stringify(errorData.detail))
          : (errorData?.detail || `Server Error (${response.status})`);

        const err = new Error(detailMsg);
        err.status = response.status;
        err.data = errorData;
        throw err;
      }

      return await response.json();
    } catch (error) {
      console.error("API identifyCrop Error:", error);
      throw error;
    }
  },

  recommendCrop: async (params) => {
    try {
      // ph మరియు pH రెండూ ఉండేలా నార్మలైజ్ చేయడం
      const payload = {
        ...params,
        ph: params.ph !== undefined ? Number(params.ph) : (params.pH !== undefined ? Number(params.pH) : 6.5),
        pH: params.pH !== undefined ? Number(params.pH) : (params.ph !== undefined ? Number(params.ph) : 6.5),
        N: Number(params.N || 80),
        P: Number(params.P || 45),
        K: Number(params.K || 40),
        temperature: Number(params.temperature || 25),
        humidity: Number(params.humidity || 80),
        rainfall: Number(params.rainfall || 150)
      };

      const response = await fetch(`${API_BASE_URL}/api/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API recommendCrop Error:", error);
      throw error;
    }
  },

  predictCrop: async (params) => {
    return await api.recommendCrop(params);
  },
};

export default api;