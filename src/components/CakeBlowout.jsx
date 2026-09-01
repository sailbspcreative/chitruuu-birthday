import React, { useState } from 'react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Wind, ArrowRight } from 'lucide-react';

export default function CakeBlowout({ onNext }) {
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [isBlownOut, setIsBlownOut] = useState(false);

  const blowOutCandles = () => {
    if (isBlownOut) return;
    
    sound.playBlowout();
    sound.playBirthdaySong();
    setCandlesLit([false, false, false]);
    setIsBlownOut(true);

    // Multi-stage confetti celebration
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-4 py-8 select-none text-center">
      {/* Title */}
      <div className="mt-4">
        <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-600 border border-rose-300">
          🎂 Stage 2: Birthday Cake Wish
        </span>
        <h2 className="font-handwriting text-4xl sm:text-5xl text-rose-700 font-bold mt-3">
          Make a Wish, Chitruuu! 🕯️
        </h2>
        <p className="font-body text-sm text-rose-900/80 mt-1">
          {isBlownOut ? "Your wish is sent to the stars! ✨" : "Tap the candles or button to blow them out 💨"}
        </p>
      </div>

      {/* Birthday Cake Art */}
      <div className="relative my-8 flex flex-col items-center">
        {/* Candles Row */}
        <div className="flex justify-center gap-8 mb-[-8px] z-10">
          {candlesLit.map((isLit, index) => (
            <div 
              key={index}
              onClick={blowOutCandles}
              className="cursor-pointer flex flex-col items-center group"
            >
              {/* Flame or Smoke */}
              {isLit ? (
                <div className="flame"></div>
              ) : (
                <div className="relative">
                  <div className="smoke"></div>
                  <div className="w-1.5 h-3 bg-gray-400 rounded-t"></div>
                </div>
              )}
              {/* Candle Stick */}
              <div className="w-3.5 h-16 bg-gradient-to-b from-pink-200 via-rose-300 to-pink-400 rounded-t-sm shadow-sm border border-pink-300/50 flex flex-col items-center justify-between py-1">
                <div className="w-full h-1 bg-white/60"></div>
                <div className="w-full h-1 bg-white/60"></div>
                <div className="w-full h-1 bg-white/60"></div>
              </div>
            </div>
          ))}
        </div>

        {/* 3-Tier Birthday Cake Container */}
        <div 
          onClick={blowOutCandles}
          className="cursor-pointer relative flex flex-col items-center transform hover:scale-105 transition-transform duration-300"
        >
          {/* Top Layer */}
          <div className="w-40 h-14 bg-gradient-to-r from-pink-300 via-rose-400 to-pink-300 rounded-t-3xl border-b-4 border-rose-400/30 flex items-center justify-center shadow-md">
            <span className="font-rounded font-bold text-white text-xs tracking-wider uppercase">
              21 & Fabulous
            </span>
          </div>

          {/* Middle Layer */}
          <div className="w-56 h-16 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 border-b-4 border-pink-500/30 flex items-center justify-around px-4 shadow-md">
            <span className="text-xl">🍓</span>
            <span className="text-xl">✨</span>
            <span className="text-xl">🍓</span>
            <span className="text-xl">✨</span>
            <span className="text-xl">🍓</span>
          </div>

          {/* Base Layer */}
          <div className="w-72 h-20 bg-gradient-to-r from-pink-400 via-rose-500 to-pink-400 rounded-b-3xl flex items-center justify-center shadow-xl border-t border-pink-300/40 relative overflow-hidden">
            <div className="absolute inset-0 flex justify-between px-6 items-center opacity-30">
              <span className="text-2xl">💖</span>
              <span className="text-2xl">💖</span>
              <span className="text-2xl">💖</span>
            </div>
            <p className="font-handwriting text-3xl font-bold text-white z-10 tracking-widest drop-shadow-sm">
              Happy Birthday Chitruuu
            </p>
          </div>

          {/* Cake Stand */}
          <div className="w-80 h-5 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-full shadow-lg border border-pink-200 mt-1"></div>
        </div>
      </div>

      {/* Blow Out Button or Next Button */}
      <div className="mb-8 flex flex-col items-center gap-4">
        {!isBlownOut ? (
          <button
            onClick={blowOutCandles}
            className="px-8 py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-rounded font-bold text-base shadow-xl flex items-center gap-2 transition-all transform hover:scale-105"
          >
            <Wind className="w-5 h-5 animate-pulse" />
            Blow Out Candles 💨
          </button>
        ) : (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <div className="flex items-center gap-2 text-rose-600 font-rounded font-semibold text-base">
              <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
              Wish Made! 🎉 Time to explore memories!
            </div>
            <button
              onClick={onNext}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-rounded font-bold text-base shadow-xl flex items-center gap-2 hover:shadow-rose-400/50 transform hover:scale-105 transition-all"
            >
              Continue to Memories 📸
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
