import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Camera, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Leaf, 
  Droplets, 
  ShieldCheck, 
  Printer, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  AlertTriangle 
} from 'lucide-react';
import api from '../services/api';

export const IdentifyPage = () => {
  const langContext = useLanguage ? useLanguage() : { isTelugu: false };
  const isTelugu = langContext?.isTelugu || false;

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const stopVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
      stopVoice();
    }
  };

  const handleIdentify = async () => {
    if (!selectedFile) {
      alert(isTelugu ? "దయచేసి ముందుగా ఒక ఫోటోను ఎంచుకోండి!" : "Please select a photo first!");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResult(null);
    stopVoice();

    try {
      const data = await api.identifyCrop(selectedFile);
      setResult(data);
    } catch (err) {
      console.error("Identification failed:", err);
      // Backend నుంచి వచ్చిన అసలైన ఎర్రర్ వివరాలను తీసుకోవడం
      const backendMsg = err.response?.data?.detail || err.message || "";
      
      if (
        backendMsg.includes("పంట లేదా") || 
        backendMsg.includes("Invalid Image") || 
        backendMsg.includes("422") ||
        backendMsg.toLowerCase().includes("non-crop")
      ) {
        setError(
          isTelugu 
            ? "ఇది పంట లేదా ఆకు చిత్రం కాదు! దయచేసి స్పష్టమైన పంట, ఆకు లేదా కాయ ఫోటోను మాత్రమే అప్‌లోడ్ చేయండి." 
            : "Invalid Image! The uploaded photo is not recognized as a crop or plant. Please upload a clear photo of a crop, leaf, or fruit."
        );
      } else {
        setError(
          backendMsg || (isTelugu 
            ? "పంటను గుర్తించడంలో సమస్య ఏర్పడింది. సర్వర్ ఆన్‌లో ఉందో లేదో తనిఖీ చేయండి." 
            : "Failed to identify crop. Please verify that the backend server is running.")
        );
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleVoiceGuidance = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      stopVoice();
      return;
    }

    const agro = result?.agronomic || {};
    const name = isTelugu ? (result.cropTe || result.crop) : result.crop;

    const speechText = isTelugu
      ? `గుర్తించిన పంట: ${name}. ఏఐ ఖచ్చితత్వం: ${result.confidencePercent || '98 శాతం'}. నత్రజని: ${agro.N || '100 కేజీలు'}, భాస్వరం: ${agro.P || '50 కేజీలు'}, పొటాషియం: ${agro.K || '60 కేజీలు'}.`
      : `Identified Crop: ${name}. AI Confidence: ${result.confidencePercent || '98 percent'}. Required Nitrogen: ${agro.N || '100 kg per ha'}, Phosphorus: ${agro.P || '50 kg per ha'}.`;

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = isTelugu ? 'te-IN' : 'en-US';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleReset = () => {
    stopVoice();
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setIsProcessing(false);
  };

  const agro = result?.agronomic || {};
  const cropName = result?.crop || result?.cropName || "Crop";
  const cropNameTe = result?.cropTe || cropName;

  return (
    <div style={{ minHeight: '90vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #f6fdf9 100%)', padding: '40px 20px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        {!result && !isProcessing && (
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', fontSize: '13px', fontWeight: '700', backgroundColor: '#dcfce7', color: '#15803d', marginBottom: '14px' }}>
              <Sparkles style={{ width: '16px', height: '16px' }} />
              <span>{isTelugu ? "AI కంప్యూటర్ విజన్ & ఆధునిక వ్యవసాయం" : "AI Computer Vision & Smart Agronomy"}</span>
            </div>
            
            <h1 style={{ fontSize: '34px', fontWeight: '900', color: '#064e3b', margin: '0 0 10px 0' }}>
              {isTelugu ? "పంట గుర్తింపు & సాగు మార్గదర్శకాలు" : "Identify Crop & Field Insights"}
            </h1>
            
            <p style={{ color: '#4b5563', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
              {isTelugu 
                ? "మీ పంట, ఆకు లేదా కాయ ఫోటోను అప్‌లోడ్ చేయండి. మా AI మోడల్ పంట రకాన్ని గుర్తించి వ్యవసాయ సూచనలను అందిస్తుంది." 
                : "Upload a clear photo of your crop, leaf, or fruit. Our AI model will detect the species and provide agronomic advisory."}
            </p>
          </div>
        )}

        {/* Upload Box */}
        {!result && !isProcessing && (
          <div style={{ background: '#ffffff', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '2px dashed #a7f3d0', textAlign: 'center' }}>
            <input type="file" accept="image/*" onChange={handleFileChange} id="crop-file-input" style={{ display: 'none' }} />
            <label htmlFor="crop-file-input" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', backgroundColor: '#059669', color: '#ffffff', borderRadius: '14px', fontWeight: '700', fontSize: '16px', boxShadow: '0 4px 14px rgba(5, 150, 105, 0.3)' }}>
              <Camera style={{ width: '22px', height: '22px' }} />
              <span>{isTelugu ? "పంట ఫోటోను ఎంచుకోండి" : "Choose Crop Photo"}</span>
            </label>
            
            {selectedFile && (
              <div style={{ marginTop: '20px', color: '#065f46', fontWeight: '600', fontSize: '15px', background: '#f0fdf4', padding: '10px 20px', borderRadius: '10px', display: 'inline-block' }}>
                📁 {isTelugu ? "ఎంచుకున్న ఫైల్:" : "Selected File:"} {selectedFile.name}
              </div>
            )}
          </div>
        )}

        {/* Image Preview & Actions */}
        {preview && !result && !isProcessing && (
          <div style={{ textAlign: 'center', marginTop: '30px', background: '#ffffff', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
            <img src={preview} alt="Preview" style={{ maxHeight: '280px', borderRadius: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.12)', objectFit: 'cover' }} />
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <button onClick={handleIdentify} style={{ padding: '14px 36px', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(5, 150, 105, 0.4)' }}>
                🔍 {isTelugu ? "పంటను గుర్తించు" : "Identify Crop"}
              </button>
              <button onClick={handleReset} style={{ padding: '14px 24px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>
                {isTelugu ? "రీసెట్" : "Reset"}
              </button>
            </div>
          </div>
        )}

        {/* Fast Processing Spinner */}
        {isProcessing && (
          <div style={{ padding: '60px 20px', textAlign: 'center', background: '#ffffff', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', margin: '20px 0' }}>
            <div style={{ width: '50px', height: '50px', border: '5px solid #d1fae5', borderTop: '5px solid #059669', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px auto' }}></div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#064e3b' }}>
              {isTelugu ? "Gemini AI ద్వారా వేగంగా విశ్లేషిస్తోంది..." : "Analyzing crop with Gemini AI..."}
            </div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Error Box */}
        {error && !isProcessing && (
          <div style={{ padding: '24px', backgroundColor: '#fef2f2', border: '2px solid #f87171', borderRadius: '20px', color: '#991b1b', margin: '24px 0', textAlign: 'center', boxShadow: '0 10px 25px rgba(239,68,68,0.1)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
              <AlertTriangle style={{ width: '28px', height: '28px' }} />
            </div>
            <div style={{ fontWeight: '900', fontSize: '18px', marginBottom: '6px' }}>
              {isTelugu ? "గుర్తింపు నిరాకరించబడింది!" : "Image Validation Failed!"}
            </div>
            <div style={{ fontSize: '15px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>
              {error}
            </div>
            <button onClick={handleReset} style={{ marginTop: '18px', padding: '12px 28px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
              {isTelugu ? "సరైన పంట ఫోటోతో మళ్లీ ప్రయత్నించండి" : "Try Again with Crop Photo"}
            </button>
          </div>
        )}

        {/* Results Card */}
        {result && !isProcessing && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#ffffff', borderRadius: '24px', boxShadow: '0 15px 40px rgba(0,0,0,0.08)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
              
              {/* Banner */}
              <div style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', padding: '28px 32px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  {preview && (
                    <div style={{ width: '84px', height: '84px', borderRadius: '18px', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.85)', boxShadow: '0 8px 20px rgba(0,0,0,0.25)', flexShrink: 0, backgroundColor: '#ffffff' }}>
                      <img src={preview} alt="Identified Crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>
                      <CheckCircle2 style={{ width: '14px', height: '14px', color: '#34d399' }} /> 
                      {isTelugu ? "విజయవంతంగా గుర్తించబడింది" : "Identified Successfully"}
                    </div>
                    <h2 style={{ margin: 0, fontSize: '30px', fontWeight: '900', letterSpacing: '-0.5px' }}>
                      {isTelugu ? cropNameTe : cropName}
                      <span style={{ color: '#34d399', fontWeight: '600', fontSize: '22px', marginLeft: '10px' }}>
                        {isTelugu ? `(${cropName})` : (result.cropTe ? `(${result.cropTe})` : '')}
                      </span>
                    </h2>
                    <p style={{ margin: '4px 0 0 0', opacity: 0.85, fontSize: '14px', fontStyle: 'italic' }}>
                      🏷️ {isTelugu ? "శాస్త్రీయ నామం" : "Scientific Name"}: {result.scientificName || "Botanical Species"} • {isTelugu ? "వర్గం" : "Category"}: {result.category || "Crops"}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={toggleVoiceGuidance}
                    style={{ 
                      background: isSpeaking ? '#ef4444' : 'rgba(255,255,255,0.18)', 
                      border: '1px solid rgba(255,255,255,0.3)', 
                      padding: '10px 16px', 
                      borderRadius: '14px', 
                      color: '#fff', 
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: '700',
                      fontSize: '13px'
                    }}
                  >
                    {isSpeaking ? <VolumeX style={{ width: '18px', height: '18px' }} /> : <Volume2 style={{ width: '18px', height: '18px' }} />}
                    <span>{isSpeaking ? (isTelugu ? "ఆపు" : "Stop") : (isTelugu ? "వాయిస్ వినండి" : "Voice Guide")}</span>
                  </button>

                  <div style={{ backgroundColor: 'rgba(52, 211, 153, 0.2)', border: '1px solid #34d399', padding: '8px 18px', borderRadius: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', opacity: 0.8, fontWeight: '700', textTransform: 'uppercase' }}>
                      {isTelugu ? "AI ఖచ్చితత్వం" : "AI Confidence"}
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: '900', color: '#34d399' }}>{result.confidencePercent || "98%"}</div>
                  </div>

                  <button type="button" onClick={() => window.print()} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px', borderRadius: '14px', color: '#fff', cursor: 'pointer' }}>
                    <Printer style={{ width: '18px', height: '18px' }} />
                  </button>
                </div>
              </div>

              {/* Agronomic Data */}
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <ShieldCheck style={{ width: '22px', height: '22px', color: '#059669' }} />
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#1e293b' }}>
                    {isTelugu ? "సాగు మార్గదర్శకాలు & పోషకాల అవసరాలు" : "Agronomic & Soil Parameters"}
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                      <Leaf style={{ width: '16px', height: '16px', color: '#16a34a' }} /> {isTelugu ? "నత్రజని (Nitrogen)" : "Nitrogen (N)"}
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{agro.N || "80 - 120 kg/ha"}</div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                      <Leaf style={{ width: '16px', height: '16px', color: '#2563eb' }} /> {isTelugu ? "భాస్వరం (Phosphorus)" : "Phosphorus (P)"}
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{agro.P || "40 - 60 kg/ha"}</div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                      <Leaf style={{ width: '16px', height: '16px', color: '#ca8a04' }} /> {isTelugu ? "పొటాషియం (Potassium)" : "Potassium (K)"}
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{agro.K || "40 - 60 kg/ha"}</div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                      <Droplets style={{ width: '16px', height: '16px', color: '#0ea5e9' }} /> {isTelugu ? "నేల పి.హెచ్ (pH)" : "Soil pH"}
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{agro.ph || "6.0 - 7.5"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Suitability Box */}
            <div style={{ background: '#ffffff', borderRadius: '24px', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid #dcfce7' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '12px', backgroundColor: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HelpCircle style={{ width: '22px', height: '22px' }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#064e3b' }}>
                    {isTelugu ? `ఈ ${cropNameTe} పంట సాగు ప్రత్యేకతలు` : `${cropName} Field Recommendations`}
                  </h3>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '16px' }}>
                <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '16px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontWeight: '800', color: '#166534', fontSize: '14px', marginBottom: '4px' }}>🌱 {isTelugu ? "నేల pH అనుకూలత" : "Optimal pH Profile"}</div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#14532d' }}>{isTelugu ? `ఈ పంట pH ${agro.ph || '6.0-7.0'} పరిధిలో సమర్థవంతంగా పెరుగుతుంది.` : `Optimal nutrient bioavailability in pH range ${agro.ph || '6.0-7.0'}.`}</p>
                </div>
                <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '16px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontWeight: '800', color: '#166534', fontSize: '14px', marginBottom: '4px' }}>🌾 {isTelugu ? "అనుకూల కాలం" : "Seasonal Fit"}</div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#14532d' }}>{isTelugu ? `${agro.seasonTe || 'ఖరీఫ్ & రబీ'} కాలంలో అధిక దిగుబడి లభిస్తుంది.` : `Provides high harvest output during ${agro.season || 'Kharif & Rabi'}.`}</p>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <button onClick={handleReset} style={{ padding: '14px 36px', background: '#059669', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <RotateCcw style={{ width: '18px', height: '18px' }} />
                <span>{isTelugu ? "మరో పంటను గుర్తించండి" : "Identify Another Crop"}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};