class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playTone(freq = 440, type = "sine", duration = 0.08, gain = 0.05) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      g.gain.setValueAtTime(gain, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playClick() { this.playTone(600, "triangle", 0.04, 0.04); }
  playHover() { this.playTone(320, "sine", 0.03, 0.02); }
  playSuccess() {
    this.playTone(523.25, "sine", 0.1, 0.05);
    setTimeout(() => this.playTone(659.25, "sine", 0.15, 0.05), 80);
  }
  playMilestone() {
    this.playTone(440, "triangle", 0.1, 0.06);
    setTimeout(() => this.playTone(554.37, "triangle", 0.1, 0.06), 90);
    setTimeout(() => this.playTone(659.25, "triangle", 0.25, 0.07), 180);
  }
  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

export const sound = new SoundManager();
