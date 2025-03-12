import { SOUNDS } from '../assets/sounds';

export class SoundManager {
  private static context: AudioContext | null = null;
  private static initialized = false;
  private static switchSound: AudioBuffer | null = null;

  static async init() {
    if (this.initialized) return;
    try {
      this.context = new AudioContext();
      // 加载切换音效
      const response = await fetch('/sounds/switch.mp3');
      const arrayBuffer = await response.arrayBuffer();
      this.switchSound = await this.context.decodeAudioData(arrayBuffer);
      this.initialized = true;
    } catch (e) {
      console.warn('Audio context initialization failed:', e);
    }
  }

  static async play(soundName: 'click' | 'success' | 'switch' | 'erase') {
    try {
      if (!this.initialized || !this.context) {
        await this.init();
      }

      if (soundName === 'switch' && this.switchSound) {
        const source = this.context!.createBufferSource();
        const gainNode = this.context!.createGain();
        gainNode.gain.setValueAtTime(0.3, this.context!.currentTime);
        
        source.buffer = this.switchSound;
        source.connect(gainNode);
        gainNode.connect(this.context!.destination);
        source.start();
        return;
      }

      // 其他音效仍然使用振荡器生成
      const oscillator = this.context!.createOscillator();
      const gainNode = this.context!.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.context!.destination);

      switch (soundName) {
        case 'click':
          oscillator.frequency.setValueAtTime(800, this.context!.currentTime);
          gainNode.gain.setValueAtTime(0.1, this.context!.currentTime);
          oscillator.start(this.context!.currentTime);
          oscillator.stop(this.context!.currentTime + 0.05);
          break;
        case 'success':
          oscillator.frequency.setValueAtTime(1200, this.context!.currentTime);
          gainNode.gain.setValueAtTime(0.1, this.context!.currentTime);
          oscillator.start(this.context!.currentTime);
          oscillator.stop(this.context!.currentTime + 0.15);
          break;
        case 'erase':
          oscillator.frequency.setValueAtTime(400, this.context!.currentTime);
          gainNode.gain.setValueAtTime(0.1, this.context!.currentTime);
          oscillator.start(this.context!.currentTime);
          oscillator.stop(this.context!.currentTime + 0.1);
          break;
      }
    } catch (e) {
      console.warn('Sound play failed:', e);
    }
  }
}
