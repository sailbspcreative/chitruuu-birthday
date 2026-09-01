import React, { useState } from 'react';
import CardEntry from './components/CardEntry';
import EvasiveQuestion from './components/EvasiveQuestion';
import CakeBlowout from './components/CakeBlowout';
import PhotoGallery from './components/PhotoGallery';
import SecretEnvelopes from './components/SecretEnvelopes';
import SkyLanterns from './components/SkyLanterns';
import GrandCelebration from './components/GrandCelebration';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  // Stage 1: CardEntry, Stage 2: EvasiveQuestion, Stage 3: CakeBlowout, Stage 4: PhotoGallery, Stage 5: SecretEnvelopes, Stage 6: SkyLanterns, Stage 7: GrandCelebration
  const [stage, setStage] = useState(1);

  // Generate random floating hearts for cute background
  const hearts = Array.from({ length: 15 });

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 font-body overflow-x-hidden">
      
      {/* Floating Hearts Background Layer */}
      {stage !== 6 && stage !== 7 && (
        <div className="heart-bg">
          {hearts.map((_, i) => (
            <div
              key={i}
              className="floating-heart"
              style={{
                left: `${Math.random() * 95}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 6}s`
              }}
            >
              💖
            </div>
          ))}
        </div>
      )}

      {/* Floating Audio Player Control */}
      <MusicPlayer />

      {/* Main Content Viewport Container */}
      <div className="relative z-10 max-w-lg mx-auto min-h-screen flex flex-col justify-center">
        {stage === 1 && <CardEntry onOpen={() => setStage(2)} />}
        {stage === 2 && <EvasiveQuestion onYes={() => setStage(3)} />}
        {stage === 3 && <CakeBlowout onNext={() => setStage(4)} />}
        {stage === 4 && <PhotoGallery onNext={() => setStage(5)} />}
        {stage === 5 && <SecretEnvelopes onNext={() => setStage(6)} />}
        {stage === 6 && <SkyLanterns onFinish={() => setStage(7)} />}
        {stage === 7 && <GrandCelebration onRestart={() => setStage(1)} />}
      </div>
    </div>
  );
}
