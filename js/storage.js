/**
 * Storage, SRS SM-2 State, Weakness Telemetry & Data Crawler/Importer Engine
 */

window.HSKStorage = (function () {
  const PROGRESS_KEY = 'hsk3_cognitive_progress_v1';
  const CUSTOM_VOCAB_KEY = 'hsk3_custom_vocab_v1';
  const SETTINGS_KEY = 'hsk3_app_settings_v1';
  const RADICALS_KEY = 'hsk3_radicals_progress_v1';

  let progressMap = {};
  let radicalProgressMap = {};
  let customVocabList = [];
  let settings = {
    strictAntiPinyin: true,
    toneColors: true,
    darkMode: true,
    selectedLesson: 'all', // 'all' or 1..20 or 'drill'
    speechRate: 1.0
  };

  function init() {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      if (savedProgress) {
        progressMap = JSON.parse(savedProgress) || {};
      }
      const savedCustom = localStorage.getItem(CUSTOM_VOCAB_KEY);
      if (savedCustom) {
        customVocabList = JSON.parse(savedCustom) || [];
      }
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      if (savedSettings) {
        settings = { ...settings, ...JSON.parse(savedSettings) };
      }
      const savedRadicals = localStorage.getItem(RADICALS_KEY);
      if (savedRadicals) {
        radicalProgressMap = JSON.parse(savedRadicals) || {};
      }
    } catch (e) {
      console.error('Storage init error:', e);
    }
    return { settings };
  }

  function saveRadicalProgress() {
    try {
      localStorage.setItem(RADICALS_KEY, JSON.stringify(radicalProgressMap));
    } catch (e) {
      console.error('Save radical progress error:', e);
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressMap));
    } catch (e) {
      console.error('Save progress error:', e);
    }
  }

  function saveSettings(partial) {
    settings = { ...settings, ...partial };
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Save settings error:', e);
    }
    return settings;
  }

  function getSettings() {
    return settings;
  }

  // Merge default dataset with any custom imported items
  function getAllVocab() {
    const base = window.HSK3_DEFAULT_VOCAB || [];
    if (!customVocabList.length) return base;
    const map = new Map();
    base.forEach(item => map.set(item.id, item));
    customVocabList.forEach(item => map.set(item.id, item));
    return Array.from(map.values());
  }

  function getVocabByLesson(lessonFilter) {
    const all = getAllVocab();
    if (!lessonFilter || lessonFilter === 'all') return all;
    if (lessonFilter === 'drill') {
      const drillList = getTargetedDrillWords();
      return drillList.length > 0 ? drillList : all.slice(0, 15);
    }
    const num = parseInt(lessonFilter, 10);
    return all.filter(w => Number(w.lesson) === num);
  }

  function getWordById(id) {
    return getAllVocab().find(w => w.id === id) || null;
  }

  function getWordRecord(id) {
    if (!progressMap[id]) {
      progressMap[id] = {
        id,
        masteryScore: 0,       // 0..100
        pinyinPeekCount: 0,    // Times user peeked at Pinyin
        wrongCount: 0,         // Times user picked wrong character
        correctCount: 0,       // Times user recognized character cleanly
        strokeCompleted: 0,    // Times user completed stroke writing quiz
        inErrorLog: false,     // Flagged for "Sổ Thù Vặt" / Targeted Drill
        confusedWith: {},      // { "打扫": 2, "大蒜": 1 }
        // SM-2 Anki fields
        repetitions: 0,
        easeFactor: 2.5,
        interval: 0,           // in days (or 0.0007 for 1 minute)
        nextReviewDate: 0,     // timestamp ms
        lastReviewed: 0
      };
    }
    return progressMap[id];
  }

  /**
   * LOGIC TESTER: Strict Anti-Pinyin Peek Penalty
   * Every time user peeks at Pinyin (Key H or Hold Mouse), increment pinyinPeekCount,
   * drop Mastery Score by 15 points, and force into Targeted Drill ("Sổ Thù Vặt").
   */
  function recordPinyinPeek(wordId) {
    if (!wordId) return null;
    const rec = getWordRecord(wordId);
    rec.pinyinPeekCount = (rec.pinyinPeekCount || 0) + 1;
    rec.masteryScore = Math.max(0, (rec.masteryScore || 0) - 15);
    rec.inErrorLog = true;
    // Also bring review date closer so SRS re-tests it soon
    rec.nextReviewDate = Math.min(rec.nextReviewDate || Date.now(), Date.now() + 60 * 1000);
    saveProgress();

    if (window.HSKSound) {
      window.HSKSound.playPeekWarning();
    }
    return rec;
  }

  /**
   * Record game / quiz mistake & track visual confusion culprit
   */
  function recordMistake(wordId, confusedHanzi = null) {
    if (!wordId) return null;
    const rec = getWordRecord(wordId);
    rec.wrongCount = (rec.wrongCount || 0) + 1;
    rec.masteryScore = Math.max(0, (rec.masteryScore || 0) - 18);
    rec.inErrorLog = true;
    rec.repetitions = 0;
    rec.interval = 0.0007; // 1 min
    rec.nextReviewDate = Date.now() + 60 * 1000;

    if (confusedHanzi && confusedHanzi !== '') {
      if (!rec.confusedWith) rec.confusedWith = {};
      rec.confusedWith[confusedHanzi] = (rec.confusedWith[confusedHanzi] || 0) + 1;
    }
    saveProgress();
    return rec;
  }

  /**
   * Record clean orthographic recognition success
   */
  function recordSuccess(wordId, boost = 16, clearDrillIfHigh = true) {
    if (!wordId) return null;
    const rec = getWordRecord(wordId);
    rec.correctCount = (rec.correctCount || 0) + 1;
    rec.masteryScore = Math.min(100, (rec.masteryScore || 0) + boost);
    if (clearDrillIfHigh && rec.masteryScore >= 80 && rec.correctCount >= 2) {
      rec.inErrorLog = false;
    }
    saveProgress();
    return rec;
  }

  function recordStrokeSuccess(wordId) {
    if (!wordId) return null;
    const rec = getWordRecord(wordId);
    rec.strokeCompleted = (rec.strokeCompleted || 0) + 1;
    rec.masteryScore = Math.min(100, (rec.masteryScore || 0) + 20);
    saveProgress();
    return rec;
  }

  /**
   * SM-2 Algorithm (Anki-style 4-button grading)
   * Grade 1: Mù chữ (Repeat after 1 minute, reset repetitions, drop mastery)
   * Grade 2: Nhớ mang máng (Hard - interval * 1.2, ease - 0.15)
   * Grade 3: Nhớ được (Good - standard SM-2 progression)
   * Grade 4: Khắc cốt ghi tâm (Easy - bonus interval, ease + 0.15, high mastery)
   */
  function applySM2Review(wordId, grade) {
    const rec = getWordRecord(wordId);
    const now = Date.now();
    rec.lastReviewed = now;

    if (grade === 1) {
      // [1] Mù chữ -> Lặp lại sau 1 phút
      rec.repetitions = 0;
      rec.interval = 1 / 1440; // 1 minute in days
      rec.easeFactor = Math.max(1.3, (rec.easeFactor || 2.5) - 0.2);
      rec.nextReviewDate = now + 60 * 1000;
      rec.wrongCount = (rec.wrongCount || 0) + 1;
      rec.masteryScore = Math.max(5, (rec.masteryScore || 0) - 20);
      rec.inErrorLog = true;
    } else if (grade === 2) {
      // [2] Nhớ mang máng -> 10 phút hoặc 1 ngày
      rec.repetitions = Math.max(1, rec.repetitions);
      rec.easeFactor = Math.max(1.3, (rec.easeFactor || 2.5) - 0.15);
      if (rec.interval < 0.5) {
        rec.interval = 0.5; // 12 hours
        rec.nextReviewDate = now + 12 * 3600 * 1000;
      } else {
        rec.interval = Math.max(1, Math.round(rec.interval * 1.2));
        rec.nextReviewDate = now + rec.interval * 86400 * 1000;
      }
      rec.masteryScore = Math.min(100, Math.max(30, (rec.masteryScore || 0) + 8));
    } else if (grade === 3) {
      // [3] Nhớ được
      rec.repetitions = (rec.repetitions || 0) + 1;
      if (rec.repetitions === 1) {
        rec.interval = 1;
      } else if (rec.repetitions === 2) {
        rec.interval = 3;
      } else {
        rec.interval = Math.round(rec.interval * (rec.easeFactor || 2.5));
      }
      rec.nextReviewDate = now + rec.interval * 86400 * 1000;
      rec.correctCount = (rec.correctCount || 0) + 1;
      rec.masteryScore = Math.min(100, Math.max(60, (rec.masteryScore || 0) + 22));
      if (rec.masteryScore >= 80) rec.inErrorLog = false;
    } else if (grade === 4) {
      // [4] Khắc cốt ghi tâm
      rec.repetitions = (rec.repetitions || 0) + 1;
      rec.easeFactor = Math.min(3.2, (rec.easeFactor || 2.5) + 0.15);
      if (rec.repetitions === 1) {
        rec.interval = 4;
      } else {
        rec.interval = Math.round(Math.max(4, rec.interval * rec.easeFactor * 1.3));
      }
      rec.nextReviewDate = now + rec.interval * 86400 * 1000;
      rec.correctCount = (rec.correctCount || 0) + 1;
      rec.masteryScore = Math.min(100, Math.max(85, (rec.masteryScore || 0) + 35));
      rec.inErrorLog = false;
    }

    saveProgress();
    return rec;
  }

  /**
   * Get words flagged as weak / confused / peeked for Targeted Drill ("Chiến Dịch Đặc Trị")
   */
  function getTargetedDrillWords() {
    const all = getAllVocab();
    return all
      .filter(w => {
        const r = progressMap[w.id];
        if (!r) return false;
        return r.inErrorLog || r.pinyinPeekCount > 0 || r.wrongCount > 0 || (r.lastReviewed > 0 && r.masteryScore < 55);
      })
      .sort((a, b) => {
        const ra = getWordRecord(a.id);
        const rb = getWordRecord(b.id);
        const scoreA = (ra.wrongCount * 3) + (ra.pinyinPeekCount * 2) - (ra.masteryScore / 20);
        const scoreB = (rb.wrongCount * 3) + (rb.pinyinPeekCount * 2) - (rb.masteryScore / 20);
        return scoreB - scoreA;
      });
  }

  /**
   * Compute Analytics & Lesson Heatmap Diagnostics (Lessons 1 - 20)
   */
  function getDiagnostics() {
    const all = getAllVocab();
    const now = Date.now();
    let totalWords = all.length;
    let masteredWords = 0;
    let dueForReview = 0;
    let totalPeeks = 0;
    let totalMistakes = 0;

    const lessonStats = [];
    for (let l = 1; l <= 20; l++) {
      const meta = (window.HSK3_LESSONS_META || []).find(m => m.lesson === l) || {
        lesson: l,
        title: `Bài ${l}`,
        titleVi: ''
      };
      const words = all.filter(w => Number(w.lesson) === l);
      let lMastered = 0;
      let lLearning = 0;
      let lWeak = 0;
      let sumMastery = 0;

      words.forEach(w => {
        const r = getWordRecord(w.id);
        sumMastery += r.masteryScore || 0;
        if (r.masteryScore >= 80) {
          lMastered++;
        } else if (r.inErrorLog || r.wrongCount > 0 || r.pinyinPeekCount > 0) {
          lWeak++;
        } else if (r.masteryScore > 0) {
          lLearning++;
        }
      });

      const pct = words.length > 0 ? Math.round((lMastered / words.length) * 100) : 0;
      const avgScore = words.length > 0 ? Math.round(sumMastery / words.length) : 0;

      lessonStats.push({
        lesson: l,
        title: meta.title,
        titleVi: meta.titleVi,
        total: words.length,
        mastered: lMastered,
        learning: lLearning,
        weak: lWeak,
        masteredPct: pct,
        avgScore,
        bossDefeated: isBossDefeated(l)
      });
    }

    let totalCrowns = lessonStats.filter(ls => ls.bossDefeated).length;

    all.forEach(w => {
      const r = getWordRecord(w.id);
      if (r.masteryScore >= 80) masteredWords++;
      if (!r.nextReviewDate || r.nextReviewDate <= now) dueForReview++;
      totalPeeks += r.pinyinPeekCount || 0;
      totalMistakes += r.wrongCount || 0;
    });

    // Top Confused Characters ("Tội Phạm Mặt Chữ")
    const criminals = all
      .map(w => {
        const r = getWordRecord(w.id);
        const dangerIndex = (r.wrongCount || 0) * 3 + (r.pinyinPeekCount || 0) * 2;
        return {
          word: w,
          record: r,
          dangerIndex
        };
      })
      .filter(item => item.dangerIndex > 0 || item.record.inErrorLog)
      .sort((a, b) => b.dangerIndex - a.dangerIndex);

    return {
      totalWords,
      masteredWords,
      masteredPct: totalWords > 0 ? Math.round((masteredWords / totalWords) * 100) : 0,
      dueForReview,
      totalPeeks,
      totalMistakes,
      totalCrowns,
      lessonStats,
      criminals
    };
  }

  function recordBossVictory(lessonKey) {
    const key = String(lessonKey || settings.selectedLesson || 'all');
    if (!settings.bossCrowns) settings.bossCrowns = {};
    settings.bossCrowns[key] = true;
    saveSettings({ bossCrowns: settings.bossCrowns });
    return settings.bossCrowns;
  }

  function isBossDefeated(lessonKey) {
    const key = String(lessonKey || 'all');
    return Boolean(settings.bossCrowns && settings.bossCrowns[key]);
  }

  /**
   * 1-vs-1 Twin-Character Diff Lookup ("Soi Kính Hiển Vi Cặp Chữ Dễ Nhầm")
   * Compares targetWord against a confusedHanzi (either a full word or a single char)
   */
  function lookupTwinDiff(targetWord, confusedHanzi) {
    if (!targetWord || !confusedHanzi) return null;
    const all = getAllVocab();
    const glossMap = window.HSK3_CHAR_GLOSS || {};

    // Try exact word match first
    const exactMatch = all.find(w => w.hanzi === confusedHanzi);
    if (exactMatch) {
      const targetRadicals = (targetWord.decomposition || []).map(d => `${d.char}: ${d.radical}`).join(' • ');
      const culpritRadicals = (exactMatch.decomposition || []).map(d => `${d.char}: ${d.radical}`).join(' • ');
      const targetMnemonics = (targetWord.decomposition || []).map(d => d.mnemonic).join(' | ');
      const culpritMnemonics = (exactMatch.decomposition || []).map(d => d.mnemonic).join(' | ');
      return {
        target: {
          hanzi: targetWord.hanzi,
          pinyin: targetWord.pinyin,
          hanViet: targetWord.hanViet,
          meaning: targetWord.meaning,
          radicals: targetRadicals || 'Bộ thủ chuẩn',
          mnemonic: targetMnemonics || ''
        },
        culprit: {
          hanzi: exactMatch.hanzi,
          pinyin: exactMatch.pinyin,
          hanViet: exactMatch.hanViet,
          meaning: exactMatch.meaning,
          radicals: culpritRadicals || 'Bộ thủ khác biệt',
          mnemonic: culpritMnemonics || ''
        }
      };
    }

    // Try matching decomposition characters across all vocab
    const charInfos = [];
    Array.from(confusedHanzi).forEach(ch => {
      let foundDecomp = null;
      let parentWord = null;
      for (const w of all) {
        const d = (w.decomposition || []).find(item => item.char === ch);
        if (d) {
          foundDecomp = d;
          parentWord = w;
          break;
        }
      }
      if (foundDecomp) {
        charInfos.push({
          char: ch,
          pinyin: foundDecomp.pinyin,
          hanViet: foundDecomp.hanViet,
          radical: foundDecomp.radical,
          mnemonic: foundDecomp.mnemonic,
          sampleMeaning: parentWord ? `trong từ "${parentWord.hanzi}" (${parentWord.meaning})` : ''
        });
      } else {
        charInfos.push({
          char: ch,
          pinyin: '—',
          hanViet: 'Hán tự gần nét',
          radical: 'Khác bộ thủ gốc',
          mnemonic: glossMap[ch] ? `Nghĩa gốc: ${glossMap[ch]}` : `Chữ gây nhiễu thị giác với "${targetWord.hanzi}"`,
          sampleMeaning: glossMap[ch] || 'Từ đồng âm / gần hình dáng'
        });
      }
    });

    const targetRadicals = (targetWord.decomposition || []).map(d => `${d.char}: ${d.radical}`).join(' • ');
    const targetMnemonics = (targetWord.decomposition || []).map(d => `${d.char} (${d.mnemonic})`).join(' | ');

    return {
      target: {
        hanzi: targetWord.hanzi,
        pinyin: targetWord.pinyin,
        hanViet: targetWord.hanViet,
        meaning: targetWord.meaning,
        radicals: targetRadicals,
        mnemonic: targetMnemonics
      },
      culprit: {
        hanzi: confusedHanzi,
        pinyin: charInfos.map(c => c.pinyin).join(' '),
        hanViet: charInfos.map(c => c.hanViet).join(' '),
        meaning: charInfos.map(c => c.sampleMeaning || c.mnemonic).join('; '),
        radicals: charInfos.map(c => `${c.char}: ${c.radical}`).join(' • '),
        mnemonic: charInfos.map(c => c.mnemonic).join(' | ')
      }
    };
  }

  /**
   * Build 10-Minute Daily Smart Session Deck (Sổ Thù Vặt + Due SM-2 + Unmastered Lesson Words)
   */
  function getSmartDailySessionWords(limit = 10) {
    const all = getAllVocab();
    const now = Date.now();
    const chosenIds = new Set();
    const result = [];

    // 1. Top weak/criminal words (up to 4)
    const criminals = getTargetedDrillWords();
    for (const w of criminals) {
      if (result.length >= 4) break;
      if (!chosenIds.has(w.id)) {
        chosenIds.add(w.id);
        result.push(w);
      }
    }

    // 2. Due SM-2 words that have been reviewed at least once (up to 4)
    const dueWords = all.filter(w => {
      const r = progressMap[w.id];
      return r && r.lastReviewed > 0 && r.nextReviewDate <= now && !chosenIds.has(w.id);
    });
    for (const w of dueWords) {
      if (result.length >= 8) break;
      chosenIds.add(w.id);
      result.push(w);
    }

    // 3. Fill remaining up to `limit` from current lesson unmastered words
    const lessonPool = getVocabByLesson(settings.selectedLesson);
    for (const w of lessonPool) {
      if (result.length >= limit) break;
      const r = getWordRecord(w.id);
      if (!chosenIds.has(w.id) && (r.masteryScore || 0) < 80) {
        chosenIds.add(w.id);
        result.push(w);
      }
    }

    // Fallback if all mastered
    for (const w of lessonPool) {
      if (result.length >= limit) break;
      if (!chosenIds.has(w.id)) {
        chosenIds.add(w.id);
        result.push(w);
      }
    }

    return result;
  }

  /**
   * Strip tone marks to generate clean Pinyin for IME input matching
   */
  function normalizePinyinClean(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ü/g, 'v')
      .replace(/[^a-z0-9]/g, '');
  }

  /**
   * Import JSON or Raw Text Vocabulary into localStorage
   */
  function importData(rawInput) {
    const trimmed = (rawInput || '').trim();
    if (!trimmed) throw new Error('Dữ liệu đầu vào trống!');

    // Case 1: JSON format
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        let added = 0;
        parsed.forEach((item, idx) => {
          if (item && item.hanzi && item.meaning) {
            const cleanItem = {
              id: item.id || `CUSTOM_${Date.now()}_${idx}`,
              lesson: Number(item.lesson) || 1,
              lessonTitle: item.lessonTitle || `Bài ${item.lesson || 1}`,
              hanzi: item.hanzi.trim(),
              pinyin: item.pinyin || '',
              pinyinClean: item.pinyinClean || normalizePinyinClean(item.pinyin || ''),
              hanViet: item.hanViet || '',
              wordType: item.wordType || 'n/v',
              meaning: item.meaning.trim(),
              decomposition: Array.isArray(item.decomposition) && item.decomposition.length > 0
                ? item.decomposition
                : Array.from(item.hanzi.trim()).map(ch => ({
                    char: ch,
                    pinyin: item.pinyin || '',
                    hanViet: item.hanViet || '',
                    radical: 'Bộ thủ chuẩn HSK',
                    mnemonic: `Ghi nhớ cấu trúc không gian của chữ ${ch}`
                  })),
              visualDistractors: Array.isArray(item.visualDistractors) && item.visualDistractors.length > 0
                ? item.visualDistractors
                : ['打算', '复习', '清楚', '满意'],
              homophones: Array.isArray(item.homophones) && item.homophones.length > 0
                ? item.homophones
                : [item.hanzi.trim()],
              example: item.example && item.example.hanzi
                ? item.example
                : {
                    hanzi: `请认真记住“${item.hanzi.trim()}”这个词。`,
                    pinyin: `Qǐng rènzhēn jìzhù "${item.pinyin || ''}" zhège cí.`,
                    meaning: `Hãy ghi nhớ kỹ từ "${item.meaning.trim()}".`
                  }
            };
            const existingIdx = customVocabList.findIndex(v => v.id === cleanItem.id || v.hanzi === cleanItem.hanzi);
            if (existingIdx >= 0) {
              customVocabList[existingIdx] = cleanItem;
            } else {
              customVocabList.push(cleanItem);
            }
            added++;
          }
        });
        localStorage.setItem(CUSTOM_VOCAB_KEY, JSON.stringify(customVocabList));
        return { count: added, mode: 'JSON Array' };
      } else if (parsed.vocab || parsed.progress) {
        if (Array.isArray(parsed.vocab)) {
          customVocabList = parsed.vocab;
          localStorage.setItem(CUSTOM_VOCAB_KEY, JSON.stringify(customVocabList));
        }
        if (parsed.progress) {
          progressMap = { ...progressMap, ...parsed.progress };
          saveProgress();
        }
        return { count: (parsed.vocab || []).length, mode: 'Full Backup Bundle' };
      }
    }

    // Case 2: Raw lines (e.g., "打算 | dǎsuàn | đả toán | dự định | 1")
    const lines = trimmed.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    let added = 0;
    lines.forEach((line, idx) => {
      const parts = line.split(/\s*(?:\||;|\t|-)\s*/);
      if (parts.length >= 2) {
        const hanzi = parts[0].trim();
        const pinyin = parts[1].trim();
        const hanViet = parts.length >= 4 ? parts[2].trim() : '';
        const meaning = parts.length >= 4 ? parts[3].trim() : (parts[2] ? parts[2].trim() : 'Từ vựng nhập thêm');
        const lesson = parts.length >= 5 ? ( parseInt(parts[4], 10) || 1 ) : 1;

        const newItem = {
          id: `RAW_${Date.now()}_${idx}`,
          lesson,
          lessonTitle: `Bài ${lesson} (Custom)`,
          hanzi,
          pinyin,
          pinyinClean: normalizePinyinClean(pinyin),
          hanViet: hanViet || 'Hán Việt',
          wordType: 'vocab',
          meaning,
          decomposition: Array.from(hanzi).map(ch => ({
            char: ch,
            pinyin,
            hanViet: hanViet || '',
            radical: 'Tự động tách chữ',
            mnemonic: `Quan sát kỹ nét chữ ${ch} trong từ ${hanzi}`
          })),
          visualDistractors: [],
          homophones: [hanzi],
          example: {
            hanzi: `我在学习“${hanzi}”这个词语。`,
            pinyin: `Wǒ zài xuéxí "${pinyin}" zhège cíyǔ.`,
            meaning: `Tôi đang học từ "${meaning}".`
          }
        };
        customVocabList.push(newItem);
        added++;
      }
    });

    if (added === 0) {
      throw new Error('Không nhận diện được định dạng. Hãy nhập JSON hoặc từng dòng theo mẫu: Chữ Hán | Pinyin | Hán Việt | Nghĩa | Bài');
    }
    localStorage.setItem(CUSTOM_VOCAB_KEY, JSON.stringify(customVocabList));
    return { count: added, mode: 'Raw Text Crawler' };
  }

  function exportDataBundle() {
    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        totalVocab: getAllVocab().length,
        customVocab: customVocabList,
        progress: progressMap,
        vocabSample: getAllVocab().slice(0, 5)
      },
      null,
      2
    );
  }

  function resetAllProgress() {
    progressMap = {};
    radicalProgressMap = {};
    customVocabList = [];
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(RADICALS_KEY);
    localStorage.removeItem(CUSTOM_VOCAB_KEY);
  }

  function getRadicalRecord(radKey) {
    if (!radKey) return { mastered: false, correct: 0, wrong: 0 };
    if (!radicalProgressMap[radKey]) {
      radicalProgressMap[radKey] = {
        mastered: false,
        correct: 0,
        wrong: 0
      };
    }
    return radicalProgressMap[radKey];
  }

  function setRadicalMastered(radKey, masteredState) {
    if (!radKey) return null;
    const rec = getRadicalRecord(radKey);
    rec.mastered = Boolean(masteredState);
    saveRadicalProgress();
    return rec;
  }

  function recordRadicalQuiz(radKey, isCorrect) {
    if (!radKey) return null;
    const rec = getRadicalRecord(radKey);
    if (isCorrect) {
      rec.correct = (rec.correct || 0) + 1;
      if (rec.correct >= 2) rec.mastered = true;
    } else {
      rec.wrong = (rec.wrong || 0) + 1;
      rec.mastered = false;
    }
    saveRadicalProgress();
    return rec;
  }

  function getAllRadicalProgress() {
    return radicalProgressMap;
  }

  // Seed initial realistic demo diagnostics if brand new so user can also test Targeted Drill immediately or anytime
  function clearFromErrorLog(wordId) {
    const rec = getWordRecord(wordId);
    rec.inErrorLog = false;
    saveProgress();
  }

  return {
    init,
    getSettings,
    saveSettings,
    getAllVocab,
    getVocabByLesson,
    getWordById,
    getWordRecord,
    recordPinyinPeek,
    recordMistake,
    recordSuccess,
    recordStrokeSuccess,
    applySM2Review,
    getTargetedDrillWords,
    getDiagnostics,
    normalizePinyinClean,
    importData,
    exportDataBundle,
    resetAllProgress,
    clearFromErrorLog,
    recordBossVictory,
    isBossDefeated,
    lookupTwinDiff,
    getSmartDailySessionWords,
    getRadicalRecord,
    setRadicalMastered,
    recordRadicalQuiz,
    getAllRadicalProgress
  };
})();
