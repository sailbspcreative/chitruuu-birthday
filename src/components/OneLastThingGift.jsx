import React, { useState } from 'react';
import bubuDuduImg from '../assets/bubu_dudu_birthday.png';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Gift, Heart, ArrowRight } from 'lucide-react';

export default function OneLastThingGift({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    sound.playPop();
    sound.playBirthdaySong();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#ffd166', '#ffffff']
    });
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-4 py-8 select-none text-center">
      {/* Header */}
      <div className="mt-4">
        <h2 className="font-handwriting text-4xl sm:text-5xl text-rose-700 font-bold tracking-wide">
          One Last Thing...
        </h2>
        {!isOpen && (
          <p className="font-handwriting text-2xl text-rose-500 font-medium italic mt-1 animate-bounce">
            Tap the gift
          </p>
        )}
      </div>

      {/* Screen 1: Closed Gift Box (Image 3 replica) */}
      {!isOpen ? (
        <div 
          onClick={handleOpenGift}
          className="my-auto cursor-pointer group flex flex-col items-center transform hover:scale-110 transition-all duration-300"
        >
          {/* Custom Stylized Pink Ribbon Gift Box */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 bg-gradient-to-br from-pink-200 via-rose-300 to-pink-200 rounded-3xl p-6 shadow-2xl border-4 border-white flex items-center justify-center animate-pulse-glow">
            {/* Satin Bow Ribbons */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-rose-400/80 shadow-md"></div>
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-rose-400/80 shadow-md"></div>

            {/* Gift Icon */}
            <div className="z-10 w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <Gift className="w-10 h-10 text-rose-500" />
            </div>
          </div>
          <span className="mt-6 text-sm font-rounded font-semibold text-rose-400">🎁 Click to open your surprise!</span>
        </div>
      ) : (
        /* Screen 2: Opened Gift Box Card (Image 4 replica) */
        <div className="my-auto w-full max-w-sm bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-pink-100 flex flex-col items-center animate-fade-in relative">
          
          {/* Top Heart Badge */}
          <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center shadow-lg border-2 border-white">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>

          {/* Cute Line Bunny & Bear Illustration Card */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-pink-200 shadow-md bg-pink-50 p-2 my-2">
            <img 
              src={bubuDuduImg} 
              alt="Cute Bunny & Bear Birthday Cake Illustration" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Text Content */}
          <h3 className="font-handwriting text-3xl sm:text-4xl text-rose-600 font-bold mt-3 flex items-center gap-1.5">
            <span>Lots of love for you</span>
            <span className="text-2xl">💖</span>
          </h3>

          <p className="font-body text-base text-rose-900/90 font-medium italic mt-1">
            Once again, Happy Birthday Chitruuu! 🥳✨
          </p>
        </div>
      )}

      {/* Continue to Sky Lantern Wish */}
      {isOpen && (
        <div className="mb-4">
          <button
            onClick={() => {
              sound.playPop();
              onNext();
            }}
            className="px-8 py-3.5 rounded-full bg-rose-500 text-white font-rounded font-bold text-base shadow-xl flex items-center gap-2 hover:bg-rose-600 transform hover:scale-105 active:scale-95 transition-all"
          >
            Make a Wish & Launch Sky Lantern 🏮✨
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
