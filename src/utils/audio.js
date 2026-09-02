import arzKiyaHaiAudio from '../assets/arz_kiya_hai_instrumental.webm';

// Web Audio API & Instrumental Background Audio Manager
class SoundFX {
  constructor() {
    this.ctx = null;
    this.bgAudio = new Audio(arzKiyaHaiAudio);
    this.bgAudio.loop = true;
    this.bgAudio.volume = 0.5; // Sweet ambient volume
    this.isBGMPlaying = false;
  }

  initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play "Arz Kiya Hai" Instrumental background song
  playBackgroundMusic() {
    this.initCtx();
    this.bgAudio.play().then(() => {
      this.isBGMPlaying = true;
    }).catch(err => {
      console.log('Audio autoplay waiting for user click:', err);
    });
  }

  pauseBackgroundMusic() {
    this.bgAudio.pause();
    this.isBGMPlaying = false;
  }

  toggleBackgroundMusic() {
    if (this.bgAudio.paused) {
      this.playBackgroundMusic();
      return true;
    } else {
      this.pauseBackgroundMusic();
      return false;
    }
  }

  isMusicPlaying() {
    return !this.bgAudio.paused;
  }

  // Cute pop sound effect for clicks
  playPop() {
    try {
      this.initCtx();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      console.log('Audio init required', e);
    }
  }

  // White noise sound for candle blow out
  playBlowout() {
    try {
      this.initCtx();
      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 600;
      
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      
      noise.start();
    } catch (e) {
      console.log('Audio err', e);
    }
  }

  // Backwards compatibility method
  playBirthdaySong() {
    this.playBackgroundMusic();
  }
}

export const sound = new SoundFX();
