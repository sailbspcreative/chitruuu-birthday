import React from 'react';
import heartQrImg from '../assets/heart_qr_card.png';
import { sound } from '../utils/audio';

export default function CardEntry({ onOpen }) {
  const handleTap = () => {
    sound.playPop();
    sound.playBirthdaySong();
    onOpen();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center select-none">
      {/* Floating Header Badges */}
      <div className="mb-6 animate-float">
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/70 text-rose-500 shadow-sm border border-rose-200/50">
          ✨ Special Birthday Wishes ✨
        </span>
      </div>

      {/* Main Glassmorphic QR Card Container - Replica of Image 1 */}
      <div 
        onClick={handleTap}
        className="group relative cursor-pointer transform transition-all duration-500 hover:scale-105 active:scale-95"
      >
        <div className="w-72 sm:w-80 p-6 rounded-3xl bg-white/85 backdrop-blur-md shadow-2xl border border-pink-100 flex flex-col items-center relative overflow-hidden">
          
          {/* Top Title */}
          <h2 className="font-handwriting text-3xl sm:text-4xl text-pink-600 font-bold mb-4 tracking-wide">
            Chitruuu's Birthday!
          </h2>

          {/* Heart QR Graphic Center (Image 1 replica) */}
          <div className="relative w-56 h-56 my-2 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center bg-rose-50/50">
            <img 
              src={heartQrImg} 
              alt="Chitruuu's Birthday Heart QR" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Heart Pulsing Ring */}
            <div className="absolute inset-0 border-2 border-rose-300/40 rounded-2xl animate-pulse"></div>
          </div>

          {/* Pink Bottom Bar Accent */}
          <div className="w-full h-1.5 bg-gradient-to-r from-pink-300 via-rose-500 to-pink-300 rounded-full mt-4"></div>

          {/* Shimmer light effect overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </div>

      {/* Tap to Open Prompt */}
      <div 
        onClick={handleTap}
        className="mt-8 cursor-pointer group flex flex-col items-center gap-2"
      >
        <p className="font-rounded text-lg text-rose-600/90 font-medium tracking-wide animate-bounce">
          Tap to open 💖
        </p>
        <span className="text-xs text-rose-400 font-body opacity-80">
          (Turn on sound for magic 🎵)
        </span>
      </div>
    </div>
  );
}
