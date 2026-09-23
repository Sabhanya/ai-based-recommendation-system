import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SAMPLE_CROP_IMAGES } from '../../data/sampleInputs';
import { VoiceGuideButton } from '../common/VoiceGuideButton';
import { 
  UploadCloud, 
  Camera, 
  Image as ImageIcon, 
  X, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  Loader2
} from 'lucide-react';

export const ImageUpload = ({ onIdentify, isProcessing = false }) => {
  const { t, isTelugu } = useLanguage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingSample, setIsLoadingSample] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (file.type && !validTypes.includes(file.type.toLowerCase())) {
      setError(isTelugu ? "దయచేసి JPG, JPEG, PNG లేదా WEBP ఫార్మాట్ చిత్రాన్ని ఎంచుకోండి." : "Please select a valid JPG, JPEG, PNG or WEBP image file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError(isTelugu ? "చిత్రం పరిమాణం 20MB కంటే తక్కువగా ఉండాలి." : "Image file size must be less than 20MB.");
      return;
    }

    setError(null);
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Convert image URL / remote sample to an authentic File object reliably
  const urlToFile = async (url, filename = "crop_sample.jpg") => {
    try {
      const res = await fetch(url, { mode: 'cors' });
      if (res.ok) {
        const blob = await res.blob();
        return new File([blob], filename, { type: blob.type || 'image/jpeg' });
      }
    } catch (e) {
      console.warn("Direct fetch blob failed, using Canvas fallback:", e);
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || 224;
        canvas.height = img.naturalHeight || 224;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], filename, { type: "image/jpeg" }));
          } else {
            resolve(null);
          }
        }, "image/jpeg", 0.92);
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });
  };

  const handleSelectSample = async (sample) => {
    setIsLoadingSample(true);
    setError(null);
    try {
      const file = await urlToFile(sample.url, `${sample.id}.jpg`);
      if (file) {
        setSelectedFile(file);
        setPreviewUrl(sample.url);
      } else {
        setError(isTelugu ? "నమూనా చిత్రాన్ని లోడ్ చేయలేకపోయాము. దయచేసి ఫైల్ అప్‌లోడ్ చేయండి." : "Could not load sample image. Please upload a file.");
      }
    } catch (err) {
      console.warn("Could not load sample image:", err);
      setError(isTelugu ? "నమూనా చిత్రాన్ని లోడ్ చేయలేకపోయాము." : "Could not load sample image. Please upload a file.");
    } finally {
      setIsLoadingSample(false);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile && !previewUrl) {
      setError(isTelugu ? "దయచేసి పంట ఫోటోను అప్‌లోడ్ చేయండి లేదా నమూనా చిత్రాన్ని ఎంచుకోండి." : "Please upload a crop image or select a sample image.");
      return;
    }

    if (selectedFile) {
      onIdentify({
        file: selectedFile,
        imageUrl: previewUrl
      });
    }
  };

  const instructionVoice = isTelugu
    ? "పంటను గుర్తించడానికి మీ పంట లేదా ఆకు ఫోటోను ఇక్కడ అప్‌లోడ్ చేయండి. లేదా తక్షణ పరీక్ష కోసం కింద ఉన్న నమూనా ఫోటోలలో ఒకదాన్ని ఎంచుకుని 'పంటను గుర్తించండి' క్లిక్ చేయండి."
    : "To identify your crop, upload a leaf, fruit or field photo here, or select one of the sample images below, and click Identify Crop.";

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Sample Image Quick Picker */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/70 border border-amber-200 shadow-soft">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-900 uppercase tracking-wide">
            <Zap className="w-4 h-4 text-amber-600 fill-amber-400" />
            <span>{t('identify.sampleGalleryTitle')}</span>
          </div>

          <VoiceGuideButton 
            text={instructionVoice}
            labelEn="Voice Instructions 🔊"
            labelTe="సూచనలు వినండి 🔊"
            size="sm"
          />
        </div>

        {/* Sample Crop Thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {SAMPLE_CROP_IMAGES.map((sample) => {
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                disabled={isLoadingSample || isProcessing}
                className="p-2 rounded-2xl text-left transition-all border group relative overflow-hidden flex flex-col items-center bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 active:scale-95 shadow-2xs"
              >
                <div className="w-full h-16 rounded-xl overflow-hidden mb-1.5 bg-slate-100 relative">
                  <img 
                    src={sample.url} 
                    alt={sample.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                    loading="lazy"
                  />
                  {isLoadingSample && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    </div>
                  )}
                </div>
                <span className="text-xs font-bold text-slate-800 text-center truncate w-full">
                  {isTelugu ? sample.nameTe : sample.name}
                </span>
                <span className="text-[10px] text-amber-800 font-semibold">{sample.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Drag & Drop / Preview Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft">
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={(e) => handleFile(e.target.files[0])}
          className="hidden"
          id="crop-image-input"
        />

        {!previewUrl ? (
          /* Dropzone */
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[260px] ${
              dragActive
                ? 'border-agri-500 bg-agri-50 scale-[0.99]'
                : 'border-slate-300 hover:border-agri-400 hover:bg-slate-50/80 bg-slate-50/40'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-agri-100 text-agri-700 flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>

            <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
              {t('identify.uploadPrompt')}
            </h4>
            <p className="text-xs text-slate-500 max-w-sm">
              {t('identify.uploadSubtext')}
            </p>

            <button
              type="button"
              className="mt-5 btn-secondary py-2.5 px-5 text-xs font-bold"
            >
              <Camera className="w-4 h-4 text-agri-700" />
              <span>{isTelugu ? "ఫైల్ ఎంచుకోండి / ఫోటో తీయండి" : "Browse Image / Take Photo"}</span>
            </button>
          </div>
        ) : (
          /* Image Preview */
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-agri-600" />
                <span className="font-bold text-slate-900 text-sm">{t('identify.previewTitle')}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  className="btn-outline py-1.5 px-3 text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t('identify.changeBtn')}</span>
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                  aria-label="Remove selected image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-slate-950 max-h-80 sm:max-h-96 flex items-center justify-center border border-slate-200 shadow-inner">
              <img 
                src={previewUrl} 
                alt="Selected crop preview" 
                className="max-h-80 sm:max-h-96 w-auto object-contain"
              />
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!previewUrl || isProcessing}
            className="w-full sm:w-auto btn-primary py-4 px-10 text-base shadow-lg shadow-agri-600/25 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-harvest-300" />
                <span>{t('identify.processingBtn')}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-harvest-300" />
                <span>{t('identify.identifyBtn')}</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
