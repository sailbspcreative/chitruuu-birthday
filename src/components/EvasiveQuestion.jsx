import React, { useState, useRef } from 'react';
import bubuDuduImg from '../assets/bubu_dudu_birthday.png';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function EvasiveQuestion({ onYes }) {
  // Coordinates for the evasive "No" button
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0, isMoved: false });
  const [toastMessage, setToastMessage] = useState('');
  const [hoverCount, setHoverCount] = useState(0);
  const containerRef = useRef(null);

  const playfulToasts = [
    "Nice try! 😜",
    "You can't say No! 💖",
    "Click YES already! 🥰",
    "Nope, not happening! 🙈",
    "Catch me if you can! 🏃‍♀️",
    "Chitruuu, just click YES! 🥺",
    "No is not an option! ✨"
  ];

  // Mobile & desktop safe evasive button teleportation
  const moveNoButton = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    sound.playPop();

    const nextToast = playfulToasts[hoverCount % playfulToasts.length];
    setToastMessage(nextToast);
    setHoverCount(prev => prev + 1);

    // Calculate mobile-friendly viewport bounds
    const maxDistanceX = Math.min(window.innerWidth * 0.35, 140);
    const maxDistanceY = Math.min(window.innerHeight * 0.3, 160);

    const randomX = (Math.random() - 0.5) * maxDistanceX * 2;
    const randomY = (Math.random() - 0.5) * maxDistanceY * 2;

    setNoPosition({
      x: randomX,
      y: randomY,
      isMoved: true
    });
  };

  const handleYes = () => {
    sound.playPop();
    // Fire confetti cannons
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff']
    });
    onYes();
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center justify-between min-h-screen px-4 py-6 select-none overflow-hidden touch-none"
    >
      {/* Top Banner - Replica of Image 2 */}
      <div className="w-full flex flex-col items-center mt-2 sm:mt-4">
        <h1 className="font-handwriting text-3xl sm:text-5xl text-rose-700 font-bold text-center drop-shadow-sm tracking-wide">
          Happy Birthday,
        </h1>
        <h2 className="font-handwriting text-3xl sm:text-5xl text-rose-600 font-bold text-center mt-1 flex items-center gap-2">
          <span>💖 Chitruuu 💖</span>
        </h2>
      </div>

      {/* Bubu & Dudu Birthday Illustration Card (Image 2 replica) */}
      <div className="relative my-2 sm:my-4 flex flex-col items-center">
        <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-xl border-4 border-white/80 bg-pink-100/60 p-2 transform hover:scale-102 transition-transform duration-300">
          <img 
            src={bubuDuduImg} 
            alt="Cute Bear and Panda Birthday Cake Illustration"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* Playful Toast Notification */}
      {toastMessage ? (
        <div className="animate-bounce bg-rose-500 text-white text-xs font-rounded font-semibold px-4 py-1.5 rounded-full shadow-lg border border-rose-300">
          {toastMessage}
        </div>
      ) : (
        <div className="h-6"></div>
      )}

      {/* Question & Interactive Buttons - Replica of Images 3, 4, 5 */}
      <div className="w-full flex flex-col items-center mb-6 sm:mb-8 gap-4">
        <p className="font-body text-base sm:text-xl font-medium text-rose-900 italic tracking-wide text-center px-2">
          Are you excited for what's next?
        </p>

        <div className="relative flex items-center justify-center gap-4 sm:gap-6 w-full min-h-[70px]">
          {/* YES Button - Glowing Pink */}
          <button
            onClick={handleYes}
            className="px-7 sm:px-9 py-3 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-rounded font-bold text-base sm:text-lg shadow-lg hover:shadow-rose-400/50 transition-all duration-300 transform hover:scale-105 z-10"
          >
            Yes 💕
          </button>

          {/* NO Button - Mobile Touch & Desktop Evasive Teleporting Button */}
          <div
            style={
              noPosition.isMoved
                ? {
                    transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                    transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }
                : {}
            }
            className="z-20 inline-block"
          >
            <button
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
              onClick={moveNoButton}
              className="px-7 sm:px-9 py-3 rounded-full bg-white text-rose-700 font-rounded font-bold text-base sm:text-lg border-2 border-rose-300 shadow-md hover:bg-rose-50 active:scale-95 transition-all duration-200"
            >
              No 😜
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
