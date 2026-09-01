import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { sound } from '../utils/audio';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (!isPlaying) {
      sound.playBirthdaySong();
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMusic}
        className="p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-pink-200 text-rose-600 hover:bg-rose-50 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
        title="Toggle Birthday Music"
      >
        {isPlaying ? (
          <div className="flex items-center gap-1.5">
            <Volume2 className="w-5 h-5 text-rose-500 animate-pulse" />
            <span className="text-xs font-rounded font-bold text-rose-600 hidden sm:inline">Music ON</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <VolumeX className="w-5 h-5 text-rose-400" />
            <span className="text-xs font-rounded font-bold text-rose-400 hidden sm:inline">Play Music 🎵</span>
          </div>
        )}
      </button>
    </div>
  );
}
