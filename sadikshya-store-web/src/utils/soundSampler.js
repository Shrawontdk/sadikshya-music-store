// Realistic Web Audio Tone Synthesizer for Instrument Sound Previews
class SoundSampler {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentOscillators = [];
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playFrequencies(freqs = [320, 110, 440], duration = 1.8, type = "percussive") {
    this.init();
    this.stop();

    const now = this.ctx.currentTime;
    this.isPlaying = true;

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Instrument timbre synthesis
      if (type === "singing_bowl") {
        osc.type = "sine";
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.3 / (idx + 1), now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 1.5);
      } else if (type === "wind") {
        osc.type = "triangle";
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.25 / (idx + 1), now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      } else {
        // Madal / Percussion resonance
        osc.type = idx === 0 ? "triangle" : "sine";
        gain.gain.setValueAtTime(0.4 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      }

      osc.frequency.setValueAtTime(freq, now);
      if (idx === 0) {
        // slight pitch bend for authentic hand drum slap
        osc.frequency.exponentialRampToValueAtTime(freq * 0.85, now + 0.15);
      }

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.5);

      this.currentOscillators.push(osc);
    });

    setTimeout(() => {
      this.isPlaying = false;
    }, duration * 1000);
  }

  stop() {
    this.currentOscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // already stopped
      }
    });
    this.currentOscillators = [];
    this.isPlaying = false;
  }
}

export const soundSampler = new SoundSampler();
