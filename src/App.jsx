import React, { useState } from 'react';
import CardEntry from './components/CardEntry';
import EvasiveQuestion from './components/EvasiveQuestion';
import CakeBlowout from './components/CakeBlowout';
import PhotoGallery from './components/PhotoGallery';
import SecretEnvelopes from './components/SecretEnvelopes';
import HeartMessageEnvelope from './components/HeartMessageEnvelope';
import OneLastThingGift from './components/OneLastThingGift';
import GrandCelebration from './components/GrandCelebration';
import SkyLanterns from './components/SkyLanterns';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  // Final Stage Flow:
  // 1: CardEntry
  // 2: EvasiveQuestion
  // 3: CakeBlowout
  // 4: PhotoGallery
  // 5: SecretEnvelopes
  // 6: HeartMessageEnvelope
  // 7: OneLastThingGift
  // 8: GrandCelebration (Second Last Page: Fireworks & Birthday Queen Card)
  // 9: SkyLanterns (Final Last Page: Wish Lantern Release & WhatsApp Forwarding)
  const [stage, setStage] = useState(1);

  // Generate random floating hearts for cute background
  const hearts = Array.from({ length: 15 });

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 font-body overflow-x-hidden">
      
      {/* Floating Hearts Background Layer */}
      {stage !== 8 && stage !== 9 && (
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
        {stage === 6 && <HeartMessageEnvelope onNext={() => setStage(7)} />}
        {stage === 7 && <OneLastThingGift onNext={() => setStage(8)} />}
        {stage === 8 && <GrandCelebration onNext={() => setStage(9)} />}
        {stage === 9 && <SkyLanterns onRestart={() => setStage(1)} />}
      </div>
    </div>
  );
}
