import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { sound } from '../utils/audio';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check initial playing state
    const interval = setInterval(() => {
      setIsPlaying(sound.isMusicPlaying());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    const newState = sound.toggleBackgroundMusic();
    setIsPlaying(newState);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMusic}
        className="px-3 py-2 rounded-full bg-white/85 backdrop-blur-md shadow-lg border border-pink-200 text-rose-600 hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
        title="Toggle Arz Kiya Hai Instrumental Music"
      >
        {isPlaying ? (
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-rose-500 animate-pulse" />
            <span className="text-xs font-rounded font-bold text-rose-600">
              Arz Kiya Hai 🎶
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <VolumeX className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-rounded font-bold text-rose-400">
              Play Song 🎵
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
