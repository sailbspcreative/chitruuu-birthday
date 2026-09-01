import React, { useState } from 'react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Send, Sparkles, ArrowRight } from 'lucide-react';

export default function SkyLanterns({ onFinish }) {
  const [wishText, setWishText] = useState('');
  const [releasedWishes, setReleasedWishes] = useState([
    { id: 1, text: "Happy 21st Birthday Chitruuu! ✨", x: 20, y: 70 },
    { id: 2, text: "Always stay happy & blessed! 💖", x: 75, y: 60 }
  ]);
  const [isReleasing, setIsReleasing] = useState(false);

  // Release lantern and send wish to WhatsApp silently in background
  const handleReleaseWish = (e) => {
    e.preventDefault();
    if (!wishText.trim() || isReleasing) return;

    sound.playPop();
    setIsReleasing(true);

    const wishMessage = wishText.trim();

    const newWish = {
      id: Date.now(),
      text: wishMessage,
      x: Math.floor(Math.random() * 60) + 20,
      y: 85
    };

    setReleasedWishes(prev => [...prev, newWish]);

    // Fireworks effect
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.7 }
    });

    // Send wish to WhatsApp (Number: 7987393599 embedded in API URL, unmentioned in UI)
    const encodedText = encodeURIComponent(
      `✨ Chitruuu's Birthday Wish ✨\n\n"${wishMessage}"\n\n- Released with Sky Lantern 🏮💖`
    );
    const whatsappUrl = `https://wa.me/917987393599?text=${encodedText}`;

    // Open WhatsApp in browser / app
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setWishText('');
      setIsReleasing(false);
      // Advance to Grand Final Celebration
      onFinish();
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-pink-950 text-white flex flex-col items-center justify-between px-4 py-8 select-none overflow-hidden">
      {/* Background Starry Glow & Floating Lanterns */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {releasedWishes.map((wish) => (
          <div
            key={wish.id}
            style={{
              left: `${wish.x}%`,
              top: `${wish.y}%`,
            }}
            className="absolute transform -translate-x-1/2 animate-float flex flex-col items-center group cursor-pointer"
          >
            {/* Glowing Lantern Graphic */}
            <div className="w-12 h-16 bg-gradient-to-t from-amber-500 via-orange-400 to-amber-200 rounded-t-xl rounded-b-md shadow-2xl border border-amber-200/50 flex flex-col items-center justify-end pb-1 animate-pulse-glow">
              <div className="w-3 h-3 bg-yellow-200 rounded-full blur-[2px] animate-ping mb-1"></div>
            </div>
            <span className="font-handwriting text-base text-amber-200 drop-shadow-md mt-1 whitespace-nowrap">
              {wish.text}
            </span>
          </div>
        ))}
      </div>

      {/* Top Header */}
      <div className="text-center mt-2 z-10">
        <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-pink-200 border border-white/20 backdrop-blur-md">
          🎆 Final Surprise: Sky Lantern Wishes
        </span>
        <h2 className="font-handwriting text-4xl sm:text-5xl text-pink-200 font-bold mt-2">
          Make a Wish for Chitruuu 🌌
        </h2>
        <p className="font-body text-xs sm:text-sm text-pink-100/80 mt-1 max-w-xs mx-auto">
          Type your wish below and release a glowing sky lantern into the night sky!
        </p>
      </div>

      {/* Wish Release Form */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl z-10 my-6">
        <form onSubmit={handleReleaseWish} className="flex flex-col gap-3">
          <label className="font-rounded font-semibold text-sm text-pink-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Your Birthday Wish:
          </label>
          <input
            type="text"
            value={wishText}
            onChange={(e) => setWishText(e.target.value)}
            placeholder="Type your secret wish here... ✨"
            className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-pink-200/60 font-body text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            type="submit"
            disabled={!wishText.trim() || isReleasing}
            className="mt-1 w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:scale-95 text-white font-rounded font-bold text-base shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" />
            {isReleasing ? "Releasing Lantern... 🏮" : "Release Sky Lantern 🏮✨"}
          </button>
        </form>
      </div>

      {/* Skip directly to Grand Celebration */}
      <div className="z-10 mb-4">
        <button
          onClick={onFinish}
          className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-rounded font-semibold text-pink-100 flex items-center gap-1.5 backdrop-blur-md transition-all"
        >
          Grand Celebration Screen 🎉 <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
