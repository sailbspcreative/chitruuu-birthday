import React, { useState } from 'react';
import chitruuu1 from '../assets/chitruuu_1.jpg';
import chitruuu2 from '../assets/chitruuu_2.jpg';
import chitruuu3 from '../assets/chitruuu_3.jpg';
import chitruuu4 from '../assets/chitruuu_4.jpg';
import bubuDuduImg from '../assets/bubu_dudu_birthday.png';
import heartQrImg from '../assets/heart_qr_card.png';
import { sound } from '../utils/audio';
import { Plus, Heart, ArrowRight, X, Sparkles } from 'lucide-react';

export default function PhotoGallery({ onNext }) {
  const defaultPhotos = [
    {
      id: 1,
      url: chitruuu2,
      caption: "Pretty in Pink 💖",
      date: "The Birthday Queen 🌸"
    },
    {
      id: 2,
      url: chitruuu4,
      caption: "Waterfall Whispers 🌊",
      date: "Pure Magic ✨"
    },
    {
      id: 3,
      url: chitruuu1,
      caption: "Grace & Elegance ✨",
      date: "Traditional Vibes 👑"
    },
    {
      id: 4,
      url: chitruuu3,
      caption: "Nature Smiles with You 🌿",
      date: "Serene & Gorgeous 💚"
    },
    {
      id: 5,
      url: bubuDuduImg,
      caption: "Double Cute Celebration 🐻🐼",
      date: "Sweet Memories"
    },
    {
      id: 6,
      url: heartQrImg,
      caption: "Straight from the Heart 💖",
      date: "Best Friend Forever"
    }
  ];

  const [photos, setPhotos] = useState(defaultPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Handle local file upload for additional photos
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhoto = {
          id: Date.now() + Math.random(),
          url: event.target.result,
          caption: "Chitruuu's Special Memory 💖",
          date: "Uploaded Photo"
        };
        setPhotos(prev => [newPhoto, ...prev]);
        sound.playPop();
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-4 py-8 select-none">
      {/* Header */}
      <div className="text-center mt-2">
        <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-600 border border-rose-300 shadow-sm flex items-center gap-1.5 justify-center w-fit mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          Stage 3: Chitruuu's Photo Gallery
        </span>
        <h2 className="font-handwriting text-4xl sm:text-5xl text-rose-700 font-bold mt-2">
          Precious Memories 💕
        </h2>
        <p className="font-body text-xs sm:text-sm text-rose-900/80 mt-1 max-w-xs mx-auto">
          Tap any polaroid picture to expand or upload more photos of Chitruuu below!
        </p>
      </div>

      {/* Upload Button */}
      <div className="my-4">
        <label className="cursor-pointer px-5 py-2.5 rounded-full bg-white text-rose-600 font-rounded font-bold text-xs sm:text-sm shadow-md border border-rose-200 flex items-center gap-2 hover:bg-rose-50 transition-all transform hover:scale-105 active:scale-95">
          <Plus className="w-4 h-4 text-rose-500" />
          <span>Add More Photos 📷</span>
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            onChange={handleUpload}
            className="hidden" 
          />
        </label>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md my-2 px-2">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => {
              sound.playPop();
              setSelectedPhoto(photo);
            }}
            className={`cursor-pointer p-3 bg-white rounded-2xl shadow-xl border border-pink-100 transform transition-all duration-300 hover:scale-105 hover:z-10 ${
              index % 2 === 0 ? '-rotate-2' : 'rotate-2'
            }`}
          >
            <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-rose-50 mb-2">
              <img 
                src={photo.url} 
                alt={photo.caption}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="font-handwriting text-base sm:text-lg text-rose-800 font-bold truncate text-center">
              {photo.caption}
            </p>
            <p className="font-body text-[10px] text-rose-400 text-center uppercase tracking-wider font-semibold">
              {photo.date}
            </p>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 sm:p-6 rounded-3xl max-w-sm w-full relative shadow-2xl animate-fade-in flex flex-col items-center border border-rose-100"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden my-2 bg-rose-50 shadow-inner">
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.caption}
                className="w-full h-full object-cover object-top" 
              />
            </div>
            <p className="font-handwriting text-2xl sm:text-3xl text-rose-700 font-bold mt-2 text-center">
              {selectedPhoto.caption}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-rose-500 font-body mt-1">
              <Heart className="w-4 h-4 fill-rose-500" />
              <span className="font-semibold">{selectedPhoto.date}</span>
            </div>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <div className="mb-4 mt-4">
        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-full bg-rose-500 text-white font-rounded font-bold text-base shadow-xl flex items-center gap-2 hover:bg-rose-600 transform hover:scale-105 active:scale-95 transition-all"
        >
          Next: Life Ticker & Secret Wishes 💌
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
