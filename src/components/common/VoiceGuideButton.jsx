import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { speechService } from '../../utils/speechSynthesis';
import { useLanguage } from '../../context/LanguageContext';

export const VoiceGuideButton = ({ 
  text, 
  labelEn = "🔊 Listen", 
  labelTe = "🔊 వినండి", 
  className = "",
  size = "md" 
}) => {
  const { language, isTelugu } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    setIsSupported(speechService.isSupported());

    const handleVisibility = () => {
      if (document.hidden) {
        speechService.stop();
        setIsPlaying(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      speechService.stop();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const handleTogglePlay = (e) => {
    // Prevent default and ensure bubbling does not cause conflicts
    e.preventDefault();

    if (!isSupported) {
      alert(isTelugu ? "ఈ బ్రౌజర్‌లో వాయిస్ సదుపాయం అందుబాటులో లేదు." : "Voice guidance is not supported in this browser.");
      return;
    }

    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
    } else {
      if (!text || text.trim() === "") return;
      speechService.speak(
        text,
        language,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        (err) => {
          console.warn("Audio playback notice:", err);
          setIsPlaying(false);
        }
      );
    }
  };

  const label = isTelugu ? labelTe : labelEn;

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-3 text-base gap-2.5"
  }[size] || "px-4 py-2 text-sm gap-2";

  return (
    <div
      onClick={handleTogglePlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTogglePlay(e); } }}
      className={`inline-flex items-center justify-center rounded-xl font-bold transition-all select-none cursor-pointer ${
        isPlaying
          ? 'bg-amber-100 text-amber-950 border border-amber-300 ring-2 ring-amber-400/40 shadow-sm'
          : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-300 active:scale-98'
      } ${sizeClasses} ${className}`}
      title={isPlaying ? (isTelugu ? "వాయిస్ ఆపడానికి ఇక్కడ క్లిక్ చేయండి" : "Click to stop voice") : (isTelugu ? "వాయిస్ వినడానికి ఈ బటన్‌పై ఎక్కడైనా క్లిక్ చేయండి" : "Click anywhere to hear audio")}
      aria-label={isPlaying ? "Stop audio voice reading" : "Read text out loud"}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-1 h-4">
            <span className="w-1 bg-amber-600 rounded-full animate-wave-1"></span>
            <span className="w-1 bg-amber-600 rounded-full animate-wave-2"></span>
            <span className="w-1 bg-amber-600 rounded-full animate-wave-3"></span>
          </div>
          <span className="font-extrabold">{isTelugu ? "⏹ ఆపండి" : "⏹ Stop"}</span>
          <VolumeX className="w-4 h-4 ml-0.5 text-amber-800 flex-shrink-0" />
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>{label}</span>
        </>
      )}
    </div>
  );
};
