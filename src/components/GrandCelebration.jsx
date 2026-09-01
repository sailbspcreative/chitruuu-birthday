import React, { useEffect } from 'react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Gift, Award, RotateCcw, PartyPopper } from 'lucide-react';
import chitruuu2 from '../assets/chitruuu_2.jpg';

export default function GrandCelebration({ onRestart }) {
  useEffect(() => {
    sound.playBirthdaySong();

    // Continuous fireworks show
    const end = Date.now() + (5 * 1000);
    const colors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffd166', '#06d6a0', '#118ab2'];

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-600 via-pink-600 to-purple-900 text-white flex flex-col items-center justify-between px-4 py-8 select-none text-center">
      
      {/* Top Banner */}
      <div className="mt-4 animate-bounce">
        <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-yellow-200 border border-white/30 backdrop-blur-md flex items-center gap-1.5 justify-center">
          <PartyPopper className="w-4 h-4 text-yellow-300" />
          Grand Birthday Celebration 🥳
        </span>
      </div>

      {/* Main Birthday Hero Card */}
      <div className="w-full max-w-md bg-white/15 backdrop-blur-md p-6 rounded-3xl border border-white/30 shadow-2xl my-6 flex flex-col items-center relative overflow-hidden">
        
        {/* Glowing Photo Badge */}
        <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-amber-300 shadow-2xl my-2 animate-pulse-glow">
          <img 
            src={chitruuu2} 
            alt="Chitruuu Birthday Queen" 
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Crown Icon */}
        <div className="text-4xl -mt-6 z-10 filter drop-shadow-lg">👑</div>

        <h1 className="font-handwriting text-5xl sm:text-6xl text-amber-200 font-bold mt-2 tracking-wide drop-shadow-md">
          Happy 21st Birthday,
        </h1>
        <h2 className="font-handwriting text-4xl sm:text-5xl text-white font-bold drop-shadow-md mb-2">
          Chitruuu! 💖✨
        </h2>

        <p className="font-body text-sm sm:text-base text-pink-100 italic leading-relaxed px-2 my-3">
          "May your 21st year bring you endless reasons to smile, unforgettable adventures, warm laughter, and all the happiness your heart can hold!"
        </p>

        {/* Gift Highlights */}
        <div className="grid grid-cols-3 gap-2 w-full mt-4">
          <div className="bg-white/10 p-2.5 rounded-2xl border border-white/20 flex flex-col items-center">
            <span className="text-2xl">🍰</span>
            <span className="font-rounded text-[11px] text-pink-200 font-semibold mt-1">Sweet Year</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-2xl border border-white/20 flex flex-col items-center">
            <span className="text-2xl">🌟</span>
            <span className="font-rounded text-[11px] text-pink-200 font-semibold mt-1">Shine Bright</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-2xl border border-white/20 flex flex-col items-center">
            <span className="text-2xl">💖</span>
            <span className="font-rounded text-[11px] text-pink-200 font-semibold mt-1">Best Friend</span>
          </div>
        </div>
      </div>

      {/* Replay Celebration Button */}
      <div className="mb-4">
        <button
          onClick={() => {
            sound.playPop();
            onRestart();
          }}
          className="px-8 py-3.5 rounded-full bg-white text-rose-700 font-rounded font-bold text-base shadow-2xl flex items-center gap-2 hover:bg-rose-50 transform hover:scale-105 active:scale-95 transition-all"
        >
          <RotateCcw className="w-5 h-5 text-rose-600" />
          Replay Birthday Magical Journey 🎂
        </button>
      </div>
    </div>
  );
}
