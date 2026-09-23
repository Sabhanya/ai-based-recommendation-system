/**
 * Voice Guidance utility using the Browser Web SpeechSynthesis API.
 * Supports English and Telugu voice synthesis with automatic voice selection and graceful fallback.
 */

class SpeechHelper {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.isSpeaking = false;
    this.currentUtterance = null;
    
    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  isSupported() {
    return !!this.synth;
  }

  hasTeluguVoice() {
    return this.voices.some(v => v.lang.startsWith('te') || v.name.toLowerCase().includes('telugu'));
  }

  getVoice(lang = 'en') {
    if (this.voices.length === 0) {
      this.loadVoices();
    }

    if (lang === 'te') {
      // Look for Telugu voice
      const teluguVoice = this.voices.find(v => v.lang.startsWith('te') || v.name.toLowerCase().includes('telugu'));
      if (teluguVoice) return teluguVoice;
      
      // Look for Indian English as closest accent if Telugu voice is missing
      const indianVoice = this.voices.find(v => v.lang === 'en-IN' || v.name.toLowerCase().includes('india'));
      if (indianVoice) return indianVoice;
    }

    // Default to Indian English or standard English
    const enInVoice = this.voices.find(v => v.lang === 'en-IN');
    if (enInVoice) return enInVoice;

    const enVoice = this.voices.find(v => v.lang.startsWith('en'));
    return enVoice || this.voices[0] || null;
  }

  speak(text, lang = 'en', onStart = null, onEnd = null, onError = null) {
    if (!this.synth) {
      if (onError) onError(new Error("Speech synthesis not supported on this browser"));
      return;
    }

    this.stop();

    if (!text || text.trim() === '') return;

    try {
      const cleanText = text.replace(/[#*`_~]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voice = this.getVoice(lang);

      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = lang === 'te' ? 'te-IN' : 'en-IN';
      }

      utterance.rate = lang === 'te' ? 0.9 : 0.95; // Slightly slower for clear farmer comprehension
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (onStart) onStart();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (event) => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        if (onError) onError(event);
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
      this.isSpeaking = false;
      if (onError) onError(err);
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
    }
  }
}

export const speechService = new SpeechHelper();
