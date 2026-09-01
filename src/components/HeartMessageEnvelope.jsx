import React, { useState } from 'react';
import envelopeImg from '../assets/envelope_heart_msg.png';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function HeartMessageEnvelope({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    sound.playPop();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff']
    });
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-4 py-8 select-none text-center">
      {/* Title */}
      <div className="mt-4">
        <h2 className="font-handwriting text-4xl sm:text-5xl text-rose-700 font-bold tracking-wide flex items-center justify-center gap-2">
          <span>A Message From My Heart</span>
          {isOpen && <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-pulse" />}
        </h2>
      </div>

      {/* Screen 1: Closed Envelope (Image 1 replica) */}
      {!isOpen ? (
        <div 
          onClick={handleOpen}
          className="my-auto cursor-pointer group flex flex-col items-center gap-6 transform hover:scale-105 transition-all duration-300"
        >
          <div className="relative w-64 h-48 sm:w-72 sm:h-52 bg-white/80 rounded-3xl p-4 shadow-2xl border border-pink-100 flex items-center justify-center overflow-hidden">
            <img 
              src={envelopeImg} 
              alt="Sealed Heart Envelope"
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
            />
            <div className="absolute inset-0 border-2 border-rose-300/40 rounded-3xl animate-pulse"></div>
          </div>

          <div className="animate-bounce flex flex-col items-center">
            <p className="font-handwriting text-2xl text-rose-600 font-bold italic">
              Tap the envelope
            </p>
            <span className="text-xs text-rose-400 font-body">💖 💖 💖</span>
          </div>
        </div>
      ) : (
        /* Screen 2: Opened Letter Card (Image 2 replica) */
        <div className="my-4 w-full max-w-md bg-[#fffaf5] p-6 sm:p-8 rounded-3xl shadow-2xl border-2 border-rose-200/80 relative text-left font-handwriting leading-relaxed text-rose-950 animate-fade-in">
          {/* Top Heart Badge */}
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center shadow-md">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>

          <p className="text-2xl font-bold text-rose-800 mb-3">Dear Chitruuu,</p>

          <p className="text-xl sm:text-2xl text-rose-900 mb-3">
            Happy Birthday to someone truly special! 🎂
          </p>

          <p className="text-xl sm:text-2xl text-rose-900 mb-3">
            You are Sweet Soul, Super Loyal, My Rock, and I'm so grateful to have you in my life.
          </p>

          <p className="text-xl sm:text-2xl text-rose-900 mb-3">
            You bring so much warmth and sweetness into my life. Every moment with you is precious.
          </p>

          <p className="text-xl sm:text-2xl text-rose-900 mb-3">
            On your special day, I wish you all the happiness, love, and joy that you deserve. May this year bring you countless beautiful moments and wonderful memories.
          </p>

          <p className="text-xl sm:text-2xl text-rose-900 mb-4">
            Here's to celebrating you today and always! 🎉
          </p>

          <div className="text-right mt-4 pt-2 border-t border-rose-200/60">
            <p className="text-xl text-rose-700 italic">With love and best wishes,</p>
            <p className="text-xl sm:text-2xl font-rounded font-bold text-rose-800 flex items-center justify-end gap-1.5 mt-1 tracking-wide">
              <span>Your ViHi</span>
              <span>💖</span>
            </p>
          </div>

          {/* Cute Kitten Illustative Footer */}
          <div className="flex justify-end mt-2 text-xl">🐱 🐱 💖</div>
        </div>
      )}

      {/* Navigation Button */}
      {isOpen && (
        <div className="mb-4">
          <button
            onClick={() => {
              sound.playPop();
              onNext();
            }}
            className="px-8 py-3.5 rounded-full bg-rose-500 text-white font-rounded font-bold text-base shadow-xl flex items-center gap-2 hover:bg-rose-600 transform hover:scale-105 active:scale-95 transition-all"
          >
            One Last Thing... 🎁
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
