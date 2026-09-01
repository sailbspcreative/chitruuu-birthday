import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Mail, Gift, Sparkles, Heart, Edit2, Check, ArrowRight } from 'lucide-react';
import TimeCounter from './TimeCounter';

export default function SecretEnvelopes({ onNext }) {
  const initialLetters = [
    {
      id: 1,
      title: "Why You're Amazing 💖",
      icon: "💌",
      content: "Happy Birthday Chitruuu! You bring so much light, smiles, and laughter into everyone's life. Thank you for being such a sweet, kind, and wonderful friend! May your 21st year bring you all the happiness in the world!"
    },
    {
      id: 2,
      title: "Virtual Birthday Coupon 🍦",
      icon: "🎁",
      content: "This coupon entitles Chitruuu to: 1x Unlimited Ice Cream Treat, 1x Late Night Gossip Session, and 1x Forever Bestie Hug! Valid 365 days a year!"
    },
    {
      id: 3,
      title: "A Special Birthday Wish 🌟",
      icon: "✨",
      content: "As you turn 21, I wish you endless adventures, dream achievements, gorgeous smiles, good health, and infinite memories ahead! Keep shining bright, Chitruuu!"
    }
  ];

  const [letters, setLetters] = useState(initialLetters);
  const [openId, setOpenId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const toggleLetter = (id) => {
    sound.playPop();
    setOpenId(openId === id ? null : id);
  };

  const startEdit = (e, letter) => {
    e.stopPropagation();
    setEditingId(letter.id);
    setEditText(letter.content);
  };

  const saveEdit = (e, id) => {
    e.stopPropagation();
    setLetters(prev => prev.map(item => item.id === id ? { ...item, content: editText } : item));
    setEditingId(null);
    sound.playPop();
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-4 py-8 select-none">
      {/* Top Header */}
      <div className="text-center mt-2">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-600 border border-rose-300">
          💌 Stage 4: Secret Envelopes
        </span>
        <h2 className="font-handwriting text-4xl sm:text-5xl text-rose-700 font-bold mt-2">
          Special Notes for Chitruuu 💖
        </h2>
        <p className="font-body text-xs sm:text-sm text-rose-900/80 mt-1">
          Tap any envelope below to unlock secret birthday wishes!
        </p>
      </div>

      {/* Live Time Counter Integration */}
      <TimeCounter />

      {/* Secret Envelopes Stack */}
      <div className="w-full max-w-md my-4 flex flex-col gap-4">
        {letters.map((letter) => {
          const isOpen = openId === letter.id;
          return (
            <div
              key={letter.id}
              onClick={() => toggleLetter(letter.id)}
              className={`cursor-pointer rounded-3xl p-5 transition-all duration-500 border shadow-lg ${
                isOpen 
                  ? 'bg-white border-rose-300 shadow-rose-200/50 scale-102' 
                  : 'bg-white/80 backdrop-blur-md border-pink-100 hover:bg-white hover:scale-101'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{letter.icon}</span>
                  <h3 className="font-rounded font-bold text-base sm:text-lg text-rose-800">
                    {letter.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => startEdit(e, letter)}
                    className="p-1.5 rounded-full hover:bg-rose-50 text-rose-400 hover:text-rose-600 transition-colors"
                    title="Edit Note"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <span className="text-rose-400 text-xs font-body">
                    {isOpen ? 'Tap to close ▲' : 'Tap to open ▼'}
                  </span>
                </div>
              </div>

              {/* Envelope Body */}
              {isOpen && (
                <div className="mt-4 pt-4 border-t border-rose-100 animate-fade-in">
                  {editingId === letter.id ? (
                    <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full p-3 rounded-xl border border-rose-300 text-sm font-body focus:outline-none focus:ring-2 focus:ring-rose-400"
                        rows={4}
                      />
                      <button
                        onClick={(e) => saveEdit(e, letter.id)}
                        className="self-end px-4 py-1.5 rounded-full bg-rose-500 text-white font-rounded font-bold text-xs flex items-center gap-1 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" /> Save Note
                      </button>
                    </div>
                  ) : (
                    <p className="font-body text-sm sm:text-base text-gray-700 leading-relaxed italic">
                      "{letter.content}"
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Next: Sky Lanterns */}
      <div className="mb-4 mt-2">
        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-full bg-rose-500 text-white font-rounded font-bold text-base shadow-xl flex items-center gap-2 hover:bg-rose-600 transform hover:scale-105 active:scale-95 transition-all"
        >
          Final Surprise: Sky Lantern Wishes 🌌
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
