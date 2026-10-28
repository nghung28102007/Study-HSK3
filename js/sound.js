/**
 * Web Audio API Synthesizer & Mandarin SpeechSynthesis Engine + Tone Colorizer
 * Zero external audio dependencies.
 */

window.HSKSound = (function () {
  let audioCtx = null;
  let soundEnabled = true;
  let defaultSpeechRate = 1.0;

  function getCtx() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, type, duration, delay = 0, gainVal = 0.14) {
    if (!soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(gainVal, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  // Crisp "Ting!" chime on correct answer
  function playTing(combo = 1) {
    const pitchBoost = Math.min(combo - 1, 8) * 35;
    playTone(587.33 + pitchBoost, 'sine', 0.14, 0, 0.15);
    playTone(880 + pitchBoost, 'triangle', 0.28, 0.07, 0.16);
  }

  // Low dissonant "Buzz!" on wrong answer or Pinyin peek penalty
  function playBuzz() {
    playTone(165, 'sawtooth', 0.18, 0, 0.14);
    playTone(130.81, 'sawtooth', 0.25, 0.09, 0.15);
  }

  // Subtle penalty tick when peeking at Pinyin
  function playPeekWarning() {
    playTone(311.13, 'sine', 0.11, 0, 0.09);
    playTone(261.63, 'sine', 0.15, 0.06, 0.09);
  }

  // Soft card flip sound
  function playFlip() {
    playTone(420, 'sine', 0.07, 0, 0.06);
  }

  // Stroke completion tick
  function playStrokeHit() {
    playTone(740, 'sine', 0.08, 0, 0.09);
  }

  // Fanfare on finishing drill/game
  function playVictory() {
    playTone(523.25, 'triangle', 0.15, 0, 0.15);
    playTone(659.25, 'triangle', 0.15, 0.1, 0.15);
    playTone(783.99, 'triangle', 0.15, 0.2, 0.15);
    playTone(1046.5, 'sine', 0.4, 0.3, 0.18);
  }

  // Energetic rising chord when entering Fever Mode (Combo >= 5)
  function playFever() {
    playTone(440, 'triangle', 0.12, 0, 0.16);
    playTone(554.37, 'triangle', 0.12, 0.06, 0.16);
    playTone(659.25, 'triangle', 0.14, 0.12, 0.18);
    playTone(880, 'sine', 0.32, 0.18, 0.2);
  }

  // Heavy impact sound when hitting the Boss
  function playBossHit() {
    playTone(220, 'sawtooth', 0.12, 0, 0.18);
    playTone(660, 'triangle', 0.18, 0.04, 0.17);
  }

  // Epic Critical Hit fanfare on HanziWriter Stroke Finisher
  function playCriticalHit() {
    playTone(587.33, 'sawtooth', 0.12, 0, 0.18);
    playTone(880, 'triangle', 0.14, 0.07, 0.18);
    playTone(1174.66, 'sine', 0.35, 0.14, 0.22);
  }

  // Crisp sniper shot sound for Game 7 (Radical Sniper)
  function playSniperShot() {
    playTone(987.77, 'sine', 0.07, 0, 0.14);
    playTone(1318.51, 'triangle', 0.11, 0.03, 0.15);
  }

  // SpeechSynthesis Mandarin TTS
  function speak(text, customRate = null) {
    if (!('speechSynthesis' in window) || !text) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'zh-CN';
      utter.rate = customRate !== null ? customRate : defaultSpeechRate;
      utter.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const zhVoice =
        voices.find(v => v.lang === 'zh-CN' && (v.name.includes('Xiaoxiao') || v.name.includes('Google') || v.name.includes('Ting-Ting'))) ||
        voices.find(v => v.lang === 'zh-CN') ||
        voices.find(v => v.lang.startsWith('zh'));

      if (zhVoice) {
        utter.voice = zhVoice;
      }
      window.speechSynthesis.speak(utter);
    } catch (e) {
      console.warn('TTS Error:', e);
    }
  }

  // Detect tone 1-5 from a Pinyin syllable with tone marks
  function detectTone(syllable) {
    if (!syllable) return 5;
    if (/[āēīōūǖĀĒĪŌŪǕ]/.test(syllable)) return 1;
    if (/[áéíóúǘÁÉÍÓÚǗ]/.test(syllable)) return 2;
    if (/[ǎěǐǒǔǚǍĚǏǑǓǙ]/.test(syllable)) return 3;
    if (/[àèìòùǜÀÈÌÒÙǛ]/.test(syllable)) return 4;
    return 5;
  }

  // Split multi-syllable pinyin into roughly matching syllables for character count
  function splitPinyinSyllables(pinyinStr, charCount) {
    if (!pinyinStr) return [];
    const trimmed = pinyinStr.trim();
    if (trimmed.includes(' ')) {
      const spaceParts = trimmed.split(/\s+/);
      if (spaceParts.length === charCount) return spaceParts;
    }

    // Regex tokenizer for Mandarin pinyin syllables with tone marks
    const tokenRegex = /([b-df-hj-np-tv-zB-DF-HJ-NP-TV-Z]*[a-zA-ZāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜ]+(?:'[a-zA-ZāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜ]+)?)/g;
    // Heuristic syllable splitter for standard HSK words
    const vowelSyllableRegex = /[bpmfdtnlgkhjqxzcsrywBPMFDTNLGKHJQXZCSRYW]?h?[iuvüūúǔùǖǘǚǜ]?[aāáǎàeēéěèoōóǒòiīíǐìuūúǔùüǖǘǚǜ]+(?:ng|n|r)?/gi;
    const matches = trimmed.match(vowelSyllableRegex);
    if (matches && matches.length >= charCount) {
      return matches.slice(0, charCount);
    }
    return [trimmed];
  }

  // Render tone-colored HTML for Pinyin
  function renderColoredPinyin(pinyinStr, wordItem = null) {
    if (wordItem && Array.isArray(wordItem.decomposition) && wordItem.decomposition.length > 0) {
      return wordItem.decomposition
        .map(d => {
          const t = detectTone(d.pinyin);
          return `<span class="tone-${t} font-semibold">${d.pinyin}</span>`;
        })
        .join(' ');
    }
    const parts = splitPinyinSyllables(pinyinStr, 4);
    return parts
      .map(p => {
        const t = detectTone(p);
        return `<span class="tone-${t} font-semibold">${p}</span>`;
      })
      .join(' ');
  }

  // Render tone-colored Hanzi characters when Tone Color Mode is active
  function renderColoredHanzi(wordItem, enableToneColor = true) {
    if (!wordItem) return '';
    const chars = Array.from(wordItem.hanzi);
    if (!enableToneColor) {
      return chars.map(c => `<span>${c}</span>`).join('');
    }
    const decomp = wordItem.decomposition || [];
    const syllables = splitPinyinSyllables(wordItem.pinyin, chars.length);

    return chars
      .map((ch, idx) => {
        const py = (decomp[idx] && decomp[idx].pinyin) || syllables[idx] || wordItem.pinyin;
        const tone = detectTone(py);
        return `<span class="tone-${tone}" title="Thanh ${tone === 5 ? 'nhẹ' : tone}">${ch}</span>`;
      })
      .join('');
  }

  function setSpeechRate(rate) {
    defaultSpeechRate = rate;
  }

  function getSpeechRate() {
    return defaultSpeechRate;
  }

  function toggleSound() {
    soundEnabled = !soundEnabled;
    return soundEnabled;
  }

  function isSoundEnabled() {
    return soundEnabled;
  }

  return {
    playTing,
    playBuzz,
    playPeekWarning,
    playFlip,
    playStrokeHit,
    playVictory,
    playFever,
    playBossHit,
    playCriticalHit,
    playSniperShot,
    speak,
    detectTone,
    renderColoredPinyin,
    renderColoredHanzi,
    setSpeechRate,
    getSpeechRate,
    toggleSound,
    isSoundEnabled
  };
})();
