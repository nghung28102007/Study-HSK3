/**
 * Main Application Controller (UI State, 3D Flashcards + Dictation 听写, Reading Explorer, Anti-Pinyin Guard, QA Dashboard & Keyboard Router)
 */

window.HSKApp = (function () {
  let activeTab = 'flashcard'; // 'flashcard' | 'games' | 'reading' | 'vocab' | 'analytics'
  let flashcardList = [];
  let currentCardIdx = 0;
  let isCardFlipped = false;
  let cardDimension = 1; // 1: Hanzi -> Meaning, 2: Meaning -> Hanzi, 3: Audio Dictation (听写)
  let holdingKeyH = false;
  let currentReadingLesson = 1;

  function init() {
    const { settings } = window.HSKStorage.init();
    applyTheme(settings.darkMode);
    applyAntiPinyinBodyClass(settings.strictAntiPinyin);
    window.HSKSound.setSpeechRate(settings.speechRate || 1.0);

    populateLessonSelector(settings.selectedLesson);
    populateReadingSelector(settings.selectedLesson);
    reloadFlashcardDeck();
    bindGlobalEvents();
    refreshHeaderStats();
    renderFlashcardView();
    renderReadingView();
    if (window.HSKRadicals) window.HSKRadicals.init();
    renderVocabExplorer();
    renderAnalyticsDashboard();
    registerPWA();
  }

  function registerPWA() {
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.protocol === 'http:')) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.innerHTML = isDark ? '🌙 Dark' : '☀️ Light';
    }
  }

  function applyAntiPinyinBodyClass(strict) {
    if (strict) {
      document.body.classList.add('anti-pinyin-strict');
    } else {
      document.body.classList.remove('anti-pinyin-strict');
    }
    const btn = document.getElementById('btn-toggle-antipinyin');
    if (btn) {
      if (strict) {
        btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1.5 transition';
        btn.innerHTML = '🛡️ Cai Nghiện Pinyin: BẬT';
      } else {
        btn.className = 'px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition';
        btn.innerHTML = '👁️ Cai Nghiện Pinyin: TẮT';
      }
    }
  }

  function populateLessonSelector(selectedVal) {
    const selectEl = document.getElementById('global-lesson-select');
    if (!selectEl) return;

    const meta = window.HSK3_LESSONS_META || [];
    let html = `<option value="all">📚 Toàn bộ HSK 3 (Bài 1 - Bài 20)</option>`;
    html += `<option value="drill">🎯 Sổ Thù Vặt (Từ hay nhầm / nhìn trộm Pinyin)</option>`;
    meta.forEach(m => {
      html += `<option value="${m.lesson}">Bài ${m.lesson}: ${m.title} (${m.titleVi})</option>`;
    });
    selectEl.innerHTML = html;
    selectEl.value = selectedVal || 'all';
  }

  function populateReadingSelector(selectedVal) {
    const selectEl = document.getElementById('reading-lesson-select');
    if (!selectEl) return;
    const dialogues = window.HSK3_MINI_DIALOGUES || [];
    selectEl.innerHTML = dialogues
      .map(d => `<option value="${d.lesson}">Bài ${d.lesson}: ${d.title}</option>`)
      .join('');
    const num = parseInt(selectedVal, 10);
    if (num >= 1 && num <= 20) {
      currentReadingLesson = num;
      selectEl.value = String(num);
    }
  }

  function reloadFlashcardDeck(customDeck = null) {
    if (Array.isArray(customDeck) && customDeck.length > 0) {
      flashcardList = customDeck;
    } else {
      const s = window.HSKStorage.getSettings();
      flashcardList = window.HSKStorage.getVocabByLesson(s.selectedLesson);
    }
    currentCardIdx = 0;
    isCardFlipped = false;
  }

  function getCurrentWord() {
    if (!flashcardList.length) {
      flashcardList = window.HSKStorage.getAllVocab();
    }
    return flashcardList[currentCardIdx] || flashcardList[0];
  }

  function switchTab(tabId) {
    activeTab = tabId;
    if (tabId !== 'games' && window.HSKGames) {
      window.HSKGames.stopTimers();
    }

    document.querySelectorAll('[data-nav-tab]').forEach(btn => {
      const tid = btn.getAttribute('data-nav-tab');
      if (tid === tabId) {
        btn.className = 'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 transition flex items-center gap-1.5';
      } else {
        btn.className = 'px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 transition flex items-center gap-1.5';
      }
    });

    ['flashcard', 'games', 'reading', 'radicals', 'vocab', 'analytics'].forEach(section => {
      const el = document.getElementById(`view-${section}`);
      if (el) {
        if (section === tabId) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      }
    });

    if (tabId === 'flashcard') {
      renderFlashcardView();
    } else if (tabId === 'games') {
      window.HSKGames.startGame('game1');
    } else if (tabId === 'reading') {
      renderReadingView();
    } else if (tabId === 'radicals') {
      if (window.HSKRadicals) window.HSKRadicals.render();
    } else if (tabId === 'vocab') {
      renderVocabExplorer();
    } else if (tabId === 'analytics') {
      renderAnalyticsDashboard();
    }
  }

  function jumpToWordFlashcard(wordId) {
    if (!wordId) return;
    flashcardList = window.HSKStorage.getAllVocab();
    currentCardIdx = Math.max(0, flashcardList.findIndex(w => w.id === wordId));
    isCardFlipped = false;
    switchTab('flashcard');
  }

  function refreshHeaderStats() {
    const diag = window.HSKStorage.getDiagnostics();
    const elMastered = document.getElementById('stat-header-mastered');
    const elDue = document.getElementById('stat-header-due');
    const elPeeks = document.getElementById('stat-header-peeks');
    const elCriminals = document.getElementById('stat-header-criminals');

    if (elMastered) elMastered.textContent = `${diag.masteredWords}/${diag.totalWords} (${diag.masteredPct}%)`;
    if (elDue) elDue.textContent = diag.dueForReview;
    if (elPeeks) elPeeks.textContent = diag.totalPeeks;
    if (elCriminals) elCriminals.textContent = diag.criminals.length;
  }

  // ============================================================================
  // FLASHCARD 3D (SM-2) + 3 DIMENSIONS (INCLUDING DICTATION 听写) + HANZI WRITER
  // ============================================================================
  function renderFlashcardView() {
    const word = getCurrentWord();
    if (!word) return;

    const rec = window.HSKStorage.getWordRecord(word.id);
    const settings = window.HSKStorage.getSettings();

    const counterEl = document.getElementById('fc-counter');
    if (counterEl) {
      counterEl.textContent = `${currentCardIdx + 1} / ${flashcardList.length}`;
    }

    const lessonBadgeEl = document.getElementById('fc-lesson-badge');
    if (lessonBadgeEl) {
      lessonBadgeEl.textContent = `Bài ${word.lesson}: ${word.lessonTitle}`;
    }

    const masteryEl = document.getElementById('fc-mastery-badge');
    if (masteryEl) {
      const m = rec.masteryScore || 0;
      const colorCls = m >= 80
        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        : m >= 40
        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        : 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      masteryEl.className = `px-2.5 py-1 rounded-full text-xs font-bold border ${colorCls}`;
      masteryEl.innerHTML = `Mastery: ${m}% • Peek: ${rec.pinyinPeekCount || 0} lần`;
    }

    const card3dEl = document.getElementById('flashcard-3d-box');
    if (card3dEl) {
      if (isCardFlipped) {
        card3dEl.classList.add('is-flipped');
      } else {
        card3dEl.classList.remove('is-flipped');
      }
    }

    const frontContentEl = document.getElementById('fc-front-content');
    if (frontContentEl) {
      if (cardDimension === 1) {
        // Chiều 1: Nhận diện mặt chữ (CHỈ CÓ chữ Hán 80px KaiTi/Noto Serif SC)
        const hanziHTML = window.HSKSound.renderColoredHanzi(word, settings.toneColors && isCardFlipped);
        frontContentEl.innerHTML = `
          <div class="flex flex-col items-center justify-center h-full text-center px-4 select-none">
            <span class="text-[11px] uppercase tracking-widest text-indigo-400 font-semibold mb-3">
              Chiều 1: Nhìn Mặt Chữ Hán Độc Lập (Tuyệt đối không nhìn Pinyin)
            </span>
            <div class="font-hanzi-serif text-[76px] sm:text-[88px] leading-none font-bold text-white tracking-wider my-4 drop-shadow">
              ${hanziHTML}
            </div>

            <!-- Anti-Pinyin Peek Trap Zone on Front -->
            <div class="mt-4 flex flex-col items-center gap-2">
              <div
                id="fc-front-pinyin-peek"
                data-peek-word="${word.id}"
                class="pinyin-mask px-4 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700"
                title="Giữ chuột hoặc bấm phím H để xem Pinyin (Sẽ bị trừ điểm thông thạo!)"
              >
                <span class="pinyin-text text-xl font-mono-code">
                  ${window.HSKSound.renderColoredPinyin(word.pinyin, word)}
                </span>
              </div>
              <span class="text-[11px] text-slate-400">
                Bấm <kbd class="kbd-pill">Space</kbd> để lật thẻ • Giữ <kbd class="kbd-pill">H</kbd> nếu quên âm đọc (Bị phạt -15% Mastery)
              </span>
            </div>
          </div>
        `;
      } else if (cardDimension === 2) {
        // Chiều 2: Nghĩa tiếng Việt -> Nhớ bộ thủ trong đầu
        frontContentEl.innerHTML = `
          <div class="flex flex-col items-center justify-center h-full text-center px-6 space-y-4">
            <span class="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
              Chiều 2: Giả Lập Bộ Gõ (IME Recall - Nhớ Bộ Thủ Trong Đầu)
            </span>
            <div class="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              Từ loại: ${word.wordType || 'v/n'} • Số chữ: ${word.hanzi.length} chữ Hán
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white">${word.meaning}</h2>
            <p class="text-sm text-amber-300/90 max-w-md">
              🧠 Hãy hình dung trong đầu: Từ này gồm những bộ thủ nào? Viết nét nào trước, nét nào sau trước khi bấm <kbd class="kbd-pill">Space</kbd> lật thẻ!
            </p>
            <button
              type="button"
              id="btn-fc-front-audio"
              class="px-4 py-2 rounded-xl bg-indigo-600/25 hover:bg-indigo-600/40 text-indigo-200 text-xs font-bold border border-indigo-500/40 transition"
            >
              🔊 Nghe phát âm gợi ý (Phím A)
            </button>
          </div>
        `;
      } else {
        // Chiều 3: 🎧 Chính Tả 听写 (Audio Dictation Mode - Zero Hanzi & Zero Pinyin on Front)
        frontContentEl.innerHTML = `
          <div class="flex flex-col items-center justify-center h-full text-center px-6 space-y-4">
            <span class="text-xs uppercase tracking-widest text-amber-400 font-extrabold">
              Chiều 3: 🎧 Kiểm Tra Chính Tả 听写 (Nghe Âm → Tự Viết Chữ Hán)
            </span>
            <button
              type="button"
              id="btn-fc-front-audio"
              class="w-20 h-20 rounded-full bg-indigo-600/30 hover:bg-indigo-600/50 border-2 border-indigo-400 text-3xl flex items-center justify-center shadow-lg shadow-indigo-500/25 transition hover:scale-105"
              title="Bấm để nghe phát âm (Phím A)"
            >
              🔊
            </button>
            <div class="space-y-1">
              <div class="text-xs text-slate-400">Gợi ý nghĩa: <strong class="text-white">${word.meaning}</strong> (${word.hanzi.length} chữ Hán)</div>
              <div class="text-xs text-emerald-300">
                👉 Dùng chuột tự viết vào ô kẻ bên phải <strong>HOẶC</strong> gõ trực tiếp chữ Hán vào ô dưới đây:
              </div>
            </div>
            <div class="flex items-center gap-2 w-full max-w-sm" id="fc-dictation-box">
              <input
                type="text"
                id="fc-dictation-input"
                autocomplete="off"
                placeholder="Gõ chữ Hán (${word.hanzi.length} chữ) rồi Enter..."
                class="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-indigo-500/50 focus:border-indigo-400 focus:outline-none text-center font-hanzi-serif text-xl text-white"
              />
              <button
                type="button"
                id="btn-fc-dictation-check"
                class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
              >
                Chấm ↵
              </button>
            </div>
            <div id="fc-dictation-feedback" class="text-xs min-h-[1.25rem] text-slate-400">
              Khung tập viết bên phải đã tự động bật chế độ <strong>Ẩn Nét Mẫu</strong> để bạn chép chính tả!
            </div>
          </div>
        `;
      }
    }

    // Render Back Face
    const backContentEl = document.getElementById('fc-back-content');
    if (backContentEl) {
      const coloredHanzi = window.HSKSound.renderColoredHanzi(word, settings.toneColors);
      const coloredPinyin = window.HSKSound.renderColoredPinyin(word.pinyin, word);
      const decompCards = (word.decomposition || [])
        .map(
          d => `
          <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-left space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-hanzi-serif text-2xl font-bold text-white">${d.char}</span>
              <span class="text-xs font-bold text-indigo-300 uppercase">[${d.hanViet}] • ${d.pinyin}</span>
            </div>
            <div class="text-xs font-semibold text-amber-300">Bộ thủ: ${d.radical}</div>
            <div class="text-xs text-slate-300 leading-snug">💡 ${d.mnemonic}</div>
          </div>
        `
        )
        .join('');

      const distractorsBadges = (word.visualDistractors || [])
        .map(
          d => `<span class="px-2 py-0.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 font-hanzi-serif text-sm font-semibold">${d}</span>`
        )
        .join(' ');

      backContentEl.innerHTML = `
        <div class="flex flex-col justify-between h-full p-5 sm:p-6 space-y-4 overflow-y-auto">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div class="flex items-center gap-4">
              <div class="font-hanzi-serif text-5xl font-bold tracking-wider">${coloredHanzi}</div>
              <div>
                <div class="text-lg font-mono-code">${coloredPinyin}</div>
                <div class="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Hán Việt: ${word.hanViet} • (${word.wordType})
                </div>
                <div class="text-base font-extrabold text-white mt-0.5">${word.meaning}</div>
              </div>
            </div>

            <div class="flex items-center gap-1.5">
              <button type="button" data-tts-rate="1.0" class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition">
                🔊 1.0x Chuẩn
              </button>
              <button type="button" data-tts-rate="0.8" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 text-xs font-bold transition">
                🐢 0.8x Chậm
              </button>
            </div>
          </div>

          <div class="space-y-1.5">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              🔬 Chiết Tự Bộ Thủ & Mẹo Nhớ Không Gian:
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              ${decompCards}
            </div>
          </div>

          <div class="flex items-center gap-2 flex-wrap text-xs">
            <span class="text-rose-400 font-bold">⚠️ Cẩn thận nhầm với:</span>
            ${distractorsBadges}
          </div>

          <div class="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5 text-left">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-semibold text-indigo-400 uppercase">Câu ví dụ HSK 3 (Ẩn Pinyin):</span>
              <button type="button" id="btn-fc-example-audio" class="text-xs text-indigo-300 hover:text-indigo-200 font-semibold">
                🔊 Đọc cả câu
              </button>
            </div>
            <div class="font-hanzi-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
              ${word.example ? word.example.hanzi : ''}
            </div>
            <div
              data-peek-word="${word.id}"
              class="pinyin-mask text-xs font-mono-code text-slate-300"
            >
              <span class="pinyin-text">${word.example ? word.example.pinyin : ''}</span>
            </div>
            <div class="text-xs text-emerald-300 font-medium">
              → ${word.example ? word.example.meaning : ''}
            </div>
          </div>
        </div>
      `;
    }

    bindPinyinPeekMasks(document.getElementById('flashcard-3d-box'));

    const frontAudioBtn = document.getElementById('btn-fc-front-audio');
    if (frontAudioBtn) {
      frontAudioBtn.addEventListener('click', e => {
        e.stopPropagation();
        window.HSKSound.speak(word.hanzi, 1.0);
      });
    }

    // Bind Chiều 3 Dictation Input
    const dictInput = document.getElementById('fc-dictation-input');
    const dictCheckBtn = document.getElementById('btn-fc-dictation-check');
    const dictFb = document.getElementById('fc-dictation-feedback');
    if (dictInput && dictCheckBtn) {
      dictInput.addEventListener('click', e => e.stopPropagation());
      const verifyDictation = e => {
        if (e) e.stopPropagation();
        const val = dictInput.value.trim();
        if (!val) return;
        if (val === word.hanzi) {
          window.HSKStorage.recordStrokeSuccess(word.id);
          if (window.HSKSound) window.HSKSound.playVictory();
          if (dictFb) {
            dictFb.innerHTML = `<span class="text-emerald-400 font-bold">🎉 Chính tả chuẩn 100%: "${word.hanzi}" (+20 Mastery)!</span>`;
          }
          refreshHeaderStats();
          setTimeout(() => {
            if (!isCardFlipped) flipCurrentCard();
          }, 500);
        } else {
          window.HSKStorage.recordMistake(word.id, val);
          if (window.HSKSound) window.HSKSound.playBuzz();
          if (dictFb) {
            dictFb.innerHTML = `<span class="text-rose-400 font-bold">❌ Chưa đúng mặt chữ! Bạn gõ "${val}", hãy nhìn ô tập viết bên phải hoặc bấm Space lật thẻ.</span>`;
          }
          refreshHeaderStats();
        }
      };
      dictCheckBtn.addEventListener('click', verifyDictation);
      dictInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          verifyDictation(e);
        }
      });
    }

    document.querySelectorAll('[data-tts-rate]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const r = parseFloat(btn.getAttribute('data-tts-rate')) || 1.0;
        window.HSKSound.speak(word.hanzi, r);
      });
    });

    const exAudioBtn = document.getElementById('btn-fc-example-audio');
    if (exAudioBtn) {
      exAudioBtn.addEventListener('click', e => {
        e.stopPropagation();
        if (word.example && word.example.hanzi) {
          window.HSKSound.speak(word.example.hanzi, 0.95);
        }
      });
    }

    // Render Hanzi Writer Canvases for this word
    const writerContainer = document.getElementById('hanzi-writer-canvases');
    const writerStatus = document.getElementById('hanzi-writer-status');
    if (writerContainer && window.HSKWriter) {
      window.HSKWriter.renderWordCanvases(word, writerContainer, writerStatus);
      // If Chiều 3 (Dictation 听写) is active, automatically hide the character & start stroke quiz + play audio!
      if (cardDimension === 3 && !isCardFlipped) {
        window.HSKSound.speak(word.hanzi, 1.0);
        window.HSKWriter.startFullWordStrokeQuiz(writerStatus, () => {
          if (!isCardFlipped) flipCurrentCard();
        });
      }
    }
  }

  // ============================================================================
  // VIEW 2.5: ZERO-PINYIN MINI-DIALOGUES & READING COMPREHENSION (BÀI 1 - 20)
  // ============================================================================
  function renderReadingView() {
    const dialogues = window.HSK3_MINI_DIALOGUES || [];
    const dialogue = dialogues.find(d => d.lesson === Number(currentReadingLesson)) || dialogues[0];
    if (!dialogue) return;

    const boxEl = document.getElementById('reading-dialogue-box');
    const quizEl = document.getElementById('reading-quiz-box');
    if (!boxEl || !quizEl) return;

    // Build vocabulary matcher sorted by length descending so 2-3 char words match before single chars
    const allVocab = window.HSKStorage.getAllVocab();
    const sortedWords = [...allVocab].sort((a, b) => b.hanzi.length - a.hanzi.length);

    function tokenizeHanziLine(sentence) {
      let i = 0;
      let html = '';
      while (i < sentence.length) {
        const rest = sentence.slice(i);
        let matchedWord = null;
        for (const w of sortedWords) {
          if (rest.startsWith(w.hanzi)) {
            matchedWord = w;
            break;
          }
        }
        if (matchedWord) {
          html += `<span class="dialogue-word-token font-hanzi-serif text-2xl sm:text-3xl font-bold text-white" data-read-word-id="${matchedWord.id}" data-read-char="${matchedWord.hanzi}">${matchedWord.hanzi}</span>`;
          i += matchedWord.hanzi.length;
        } else {
          const ch = sentence[i];
          if (/[\u4e00-\u9fa5]/.test(ch)) {
            html += `<span class="dialogue-word-token font-hanzi-serif text-2xl sm:text-3xl font-bold text-white" data-read-char="${ch}">${ch}</span>`;
          } else {
            html += `<span class="font-hanzi-serif text-2xl sm:text-3xl text-slate-400">${ch}</span>`;
          }
          i++;
        }
      }
      return html;
    }

    const linesHTML = dialogue.lines
      .map(
        (line, idx) => `
        <div class="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-extrabold border border-indigo-500/30">
              🗣️ ${line.speaker}
            </span>
            <button
              type="button"
              data-speak-line="${idx}"
              class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold transition"
            >
              🔊 Nghe câu này
            </button>
          </div>
          <div class="leading-relaxed py-1">
            ${tokenizeHanziLine(line.hanzi)}
          </div>
          <div class="flex flex-wrap items-center gap-3 pt-1 border-t border-slate-900">
            <div class="pinyin-mask text-xs font-mono-code text-slate-300">
              <span class="pinyin-text">${line.pinyin}</span>
            </div>
            <details class="text-xs text-slate-400 cursor-pointer">
              <summary class="hover:text-emerald-300 font-semibold">Xem dịch nghĩa câu</summary>
              <span class="text-emerald-300 pl-2">→ ${line.meaning}</span>
            </details>
          </div>
        </div>
      `
      )
      .join('');

    boxEl.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-wider text-indigo-400">Bài ${dialogue.lesson} • Bài Khóa Không Pinyin</span>
          <h3 class="text-xl font-extrabold text-white font-hanzi-serif mt-0.5">${dialogue.title}</h3>
        </div>
        <span class="px-3 py-1 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold">
          📐 Ngữ pháp: ${dialogue.grammarNote}
        </span>
      </div>
      <div class="space-y-3">${linesHTML}</div>
    `;

    bindPinyinPeekMasks(boxEl);

    boxEl.querySelectorAll('[data-speak-line]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-speak-line'), 10);
        if (dialogue.lines[idx]) {
          window.HSKSound.speak(dialogue.lines[idx].hanzi, 0.95);
        }
      });
    });

    boxEl.querySelectorAll('.dialogue-word-token').forEach(tok => {
      tok.addEventListener('click', () => {
        boxEl.querySelectorAll('.dialogue-word-token').forEach(t => t.classList.remove('active-token'));
        tok.classList.add('active-token');
        const wordId = tok.getAttribute('data-read-word-id');
        const rawChar = tok.getAttribute('data-read-char');
        inspectDialogueWord(wordId, rawChar);
      });
    });

    // Render Reading Comprehension Quiz
    const q = dialogue.question;
    quizEl.innerHTML = `
      <div class="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
        🎯 Câu Hỏi Đọc Hiểu Bài ${dialogue.lesson} (Sát Đề Đọc HSK 3)
      </div>
      <div class="font-hanzi-serif text-xl sm:text-2xl font-bold text-white">
        ❓ ${q.prompt}
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        ${q.options
          .map(
            (opt, i) => `
          <button
            type="button"
            data-reading-opt="${opt}"
            class="p-3.5 rounded-xl bg-slate-800/80 hover:bg-indigo-600/25 border border-slate-700 hover:border-indigo-400 text-left font-hanzi-serif text-lg font-bold text-white transition flex items-center gap-2.5"
          >
            <span class="kbd-pill text-indigo-300">${String.fromCharCode(65 + i)}</span>
            <span>${opt}</span>
          </button>
        `
          )
          .join('')}
      </div>
      <div id="reading-quiz-feedback" class="hidden p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs"></div>
    `;

    quizEl.querySelectorAll('[data-reading-opt]').forEach(btn => {
      btn.addEventListener('click', () => {
        const picked = btn.getAttribute('data-reading-opt');
        const fb = document.getElementById('reading-quiz-feedback');
        if (!fb) return;
        fb.classList.remove('hidden');
        if (picked === q.answer) {
          if (window.HSKSound) window.HSKSound.playTing(2);
          btn.classList.add('border-emerald-400', 'bg-emerald-600/30');
          fb.innerHTML = `<span class="text-emerald-400 font-bold">🎉 Chính xác!</span> <span class="text-slate-300">${q.explanation}</span>`;
        } else {
          if (window.HSKSound) window.HSKSound.playBuzz();
          btn.classList.add('border-rose-400', 'bg-rose-600/30');
          fb.innerHTML = `<span class="text-rose-400 font-bold">❌ Chưa đúng! Đáp án là "${q.answer}".</span> <span class="text-slate-300">${q.explanation}</span>`;
        }
      });
    });
  }

  function inspectDialogueWord(wordId, rawChar) {
    const inspectorEl = document.getElementById('reading-word-inspector');
    if (!inspectorEl) return;

    if (rawChar && window.HSKSound) {
      window.HSKSound.speak(rawChar, 0.95);
    }

    const word = wordId ? window.HSKStorage.getWordById(wordId) : null;
    if (word) {
      const decompHTML = (word.decomposition || [])
        .map(
          d => `
          <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-hanzi-serif text-xl font-bold text-white">${d.char}</span>
              <span class="text-indigo-300 font-semibold">[${d.hanViet}] • ${d.pinyin}</span>
            </div>
            <div class="text-amber-300 font-medium">${d.radical}</div>
            <div class="text-slate-300">${d.mnemonic}</div>
          </div>`
        )
        .join('');

      inspectorEl.innerHTML = `
        <div class="flex items-center justify-between">
          <div>
            <div class="font-hanzi-serif text-4xl font-bold text-white">${word.hanzi}</div>
            <div class="text-sm font-mono-code text-indigo-300 mt-0.5">${word.pinyin} • [${word.hanViet}]</div>
          </div>
          <button
            type="button"
            id="btn-inspector-speak"
            class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
          >
            🔊 Nghe
          </button>
        </div>
        <div class="text-base font-extrabold text-emerald-300">${word.meaning} <span class="text-xs text-slate-400 font-normal">(Bài ${word.lesson})</span></div>
        <div class="space-y-2">${decompHTML}</div>
        <button
          type="button"
          id="btn-inspector-jump-fc"
          class="w-full py-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-bold border border-slate-700 transition"
        >
          ✍️ Mở Thẻ 3D & Tập Viết Từ Này →
        </button>
      `;

      document.getElementById('btn-inspector-speak').addEventListener('click', () => {
        window.HSKSound.speak(word.hanzi, 0.9);
      });
      document.getElementById('btn-inspector-jump-fc').addEventListener('click', () => {
        flashcardList = window.HSKStorage.getAllVocab();
        currentCardIdx = Math.max(0, flashcardList.findIndex(w => w.id === word.id));
        isCardFlipped = false;
        switchTab('flashcard');
      });
      return;
    }

    // Fallback single character lookup from HSK3_CHAR_GLOSS
    const gloss = (window.HSK3_CHAR_GLOSS && window.HSK3_CHAR_GLOSS[rawChar]) || 'Chữ Hán thông dụng trong ngữ cảnh HSK';
    inspectorEl.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="font-hanzi-serif text-4xl font-bold text-white">${rawChar}</span>
        <button type="button" id="btn-inspector-speak-char" class="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold">
          🔊 Nghe
        </button>
      </div>
      <div class="text-sm font-bold text-emerald-300">Nghĩa & Âm Hán Việt: ${gloss}</div>
    `;
    document.getElementById('btn-inspector-speak-char').addEventListener('click', () => {
      window.HSKSound.speak(rawChar, 0.9);
    });
  }

  /**
   * Bind mousedown / touchstart Pinyin Peek detector to any `.pinyin-mask` inside container
   */
  function bindPinyinPeekMasks(rootEl) {
    if (!rootEl) return;
    rootEl.querySelectorAll('.pinyin-mask').forEach(maskEl => {
      let alreadyPenalizedThisHold = false;

      const startPeek = e => {
        e.stopPropagation();
        maskEl.classList.add('peeking');
        const wordId = maskEl.getAttribute('data-peek-word');
        if (wordId && !alreadyPenalizedThisHold) {
          alreadyPenalizedThisHold = true;
          const updated = window.HSKStorage.recordPinyinPeek(wordId);
          showPeekPenaltyToast(wordId, updated ? updated.pinyinPeekCount : 1);
          refreshHeaderStats();
        }
      };

      const endPeek = e => {
        e.stopPropagation();
        maskEl.classList.remove('peeking');
        alreadyPenalizedThisHold = false;
      };

      maskEl.addEventListener('mousedown', startPeek);
      maskEl.addEventListener('mouseup', endPeek);
      maskEl.addEventListener('mouseleave', endPeek);
      maskEl.addEventListener('touchstart', startPeek, { passive: true });
      maskEl.addEventListener('touchend', endPeek);
    });
  }

  function showPeekPenaltyToast(wordId, peekCount) {
    const word = window.HSKStorage.getWordById(wordId);
    const toast = document.getElementById('anti-pinyin-toast');
    if (!toast || !word) return;

    toast.innerHTML = `
      ⚠️ <strong>Phát hiện nhìn trộm Pinyin từ "${word.hanzi}"!</strong>
      (Lần #${peekCount} • -15% Mastery • Đã đưa vào danh sách bắt buộc test lại trong Minigame!)
    `;
    toast.classList.remove('hidden');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 3400);
  }

  function flipCurrentCard() {
    isCardFlipped = !isCardFlipped;
    if (window.HSKSound) window.HSKSound.playFlip();
    const card3dEl = document.getElementById('flashcard-3d-box');
    if (card3dEl) {
      card3dEl.classList.toggle('is-flipped', isCardFlipped);
    }
    if (isCardFlipped) {
      const word = getCurrentWord();
      if (word && window.HSKSound) {
        window.HSKSound.speak(word.hanzi);
      }
    }
  }

  function gradeCurrentCard(grade) {
    const word = getCurrentWord();
    if (!word) return;

    window.HSKStorage.applySM2Review(word.id, grade);
    if (grade === 1) {
      if (window.HSKSound) window.HSKSound.playBuzz();
    } else {
      if (window.HSKSound) window.HSKSound.playTing(grade - 1);
    }

    refreshHeaderStats();
    nextCard();
  }

  function nextCard() {
    if (!flashcardList.length) return;
    isCardFlipped = false;
    currentCardIdx = (currentCardIdx + 1) % flashcardList.length;
    renderFlashcardView();
  }

  function prevCard() {
    if (!flashcardList.length) return;
    isCardFlipped = false;
    currentCardIdx = (currentCardIdx - 1 + flashcardList.length) % flashcardList.length;
    renderFlashcardView();
  }

  // ============================================================================
  // TAB 3: VOCABULARY & RADICAL DECOMPOSITION EXPLORER
  // ============================================================================
  function renderVocabExplorer() {
    const gridEl = document.getElementById('vocab-explorer-grid');
    if (!gridEl) return;

    const searchInput = document.getElementById('vocab-search-input');
    const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
    const settings = window.HSKStorage.getSettings();
    const list = window.HSKStorage.getVocabByLesson(settings.selectedLesson);

    const filtered = list.filter(w => {
      if (!query) return true;
      return (
        w.hanzi.includes(query) ||
        w.meaning.toLowerCase().includes(query) ||
        (w.hanViet && w.hanViet.toLowerCase().includes(query)) ||
        (w.pinyinClean && w.pinyinClean.toLowerCase().includes(query)) ||
        (w.decomposition || []).some(d => d.radical.toLowerCase().includes(query) || d.mnemonic.toLowerCase().includes(query))
      );
    });

    const countEl = document.getElementById('vocab-explorer-count');
    if (countEl) countEl.textContent = `${filtered.length} từ vựng`;

    gridEl.innerHTML = filtered
      .map(w => {
        const rec = window.HSKStorage.getWordRecord(w.id);
        const m = rec.masteryScore || 0;
        const coloredHanzi = window.HSKSound.renderColoredHanzi(w, settings.toneColors);
        const coloredPinyin = window.HSKSound.renderColoredPinyin(w.pinyin, w);

        const decompList = (w.decomposition || [])
          .map(
            d => `<div class="text-xs text-slate-300"><strong class="text-indigo-300 font-hanzi-serif text-sm">${d.char}</strong> [${d.hanViet}] • <span class="text-amber-300">${d.radical}</span>: ${d.mnemonic}</div>`
          )
          .join('');

        return `
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 transition flex flex-col justify-between gap-3">
            <div>
              <div class="flex items-start justify-between gap-2">
                <div>
                  <span class="text-[11px] font-semibold text-slate-400">Bài ${w.lesson} • ${w.wordType}</span>
                  <div class="font-hanzi-serif text-4xl font-bold mt-0.5">${coloredHanzi}</div>
                </div>
                <div class="flex flex-col items-end gap-1">
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    m >= 80
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : rec.inErrorLog
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-slate-800 text-slate-400'
                  }">
                    ${m}% ${rec.inErrorLog ? '• ⚠️ Hay nhầm' : ''}
                  </span>
                  <button
                    type="button"
                    data-vocab-speak="${w.hanzi}"
                    class="px-2 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 text-xs transition"
                  >
                    🔊 Đọc
                  </button>
                </div>
              </div>

              <div class="mt-2 flex items-center gap-2 flex-wrap">
                <div data-peek-word="${w.id}" class="pinyin-mask bg-slate-800/80 border border-slate-700">
                  <span class="pinyin-text text-sm font-mono-code">${coloredPinyin}</span>
                </div>
                <span class="text-xs font-bold text-amber-300 uppercase">[${w.hanViet}]</span>
              </div>

              <div class="text-base font-bold text-white mt-1.5">${w.meaning}</div>

              <div class="mt-2.5 pt-2.5 border-t border-slate-800/80 space-y-1">
                ${decompList}
              </div>
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
              <span class="text-slate-400">Nhìn trộm Pinyin: <strong class="text-amber-300">${rec.pinyinPeekCount || 0}</strong></span>
              <button
                type="button"
                data-vocab-drill="${w.id}"
                class="px-3 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white font-semibold transition"
              >
                ✍️ Luyện nét & Thẻ →
              </button>
            </div>
          </div>
        `;
      })
      .join('');

    bindPinyinPeekMasks(gridEl);

    gridEl.querySelectorAll('[data-vocab-speak]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.HSKSound.speak(btn.getAttribute('data-vocab-speak'));
      });
    });

    gridEl.querySelectorAll('[data-vocab-drill]').forEach(btn => {
      btn.addEventListener('click', () => {
        const wid = btn.getAttribute('data-vocab-drill');
        const idx = flashcardList.findIndex(w => w.id === wid);
        if (idx >= 0) {
          currentCardIdx = idx;
        } else {
          flashcardList = window.HSKStorage.getAllVocab();
          currentCardIdx = Math.max(0, flashcardList.findIndex(w => w.id === wid));
        }
        isCardFlipped = false;
        switchTab('flashcard');
      });
    });
  }

  // ============================================================================
  // TAB 4: QA & ANALYTICS DASHBOARD (HEATMAP + BOSS CROWNS + TWIN-DIFF MICROSCOPE)
  // ============================================================================
  function renderAnalyticsDashboard() {
    const diag = window.HSKStorage.getDiagnostics();

    const crownsBadge = document.getElementById('analytics-crowns-badge');
    if (crownsBadge) {
      crownsBadge.textContent = `👑 ${diag.totalCrowns || 0}/20 Boss Đã Hạ`;
    }

    // 1. Render Lesson Heatmap (Lessons 1 - 20)
    const heatmapEl = document.getElementById('analytics-heatmap-grid');
    if (heatmapEl) {
      heatmapEl.innerHTML = diag.lessonStats
        .map(ls => {
          let cardStyle = 'bg-slate-900/90 border-slate-800 text-slate-300';
          let statusBadge = `<span class="text-[11px] text-slate-400">Chưa học</span>`;

          if (ls.masteredPct >= 80) {
            cardStyle = 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200 shadow-lg shadow-emerald-950/30';
            statusBadge = `<span class="text-[11px] font-bold text-emerald-400">✓ Đã thuộc ${ls.masteredPct}%</span>`;
          } else if (ls.weak > 0) {
            cardStyle = 'bg-rose-950/45 border-rose-500/50 text-rose-200';
            statusBadge = `<span class="text-[11px] font-bold text-rose-400">⚠️ ${ls.weak} từ mù chữ</span>`;
          } else if (ls.avgScore > 0) {
            cardStyle = 'bg-amber-950/40 border-amber-500/45 text-amber-200';
            statusBadge = `<span class="text-[11px] font-bold text-amber-400">Đang luyện (${ls.masteredPct}%)</span>`;
          }

          return `
            <div class="p-3.5 rounded-2xl border-2 ${cardStyle} flex flex-col justify-between gap-2 transition hover:border-indigo-400">
              <div class="cursor-pointer space-y-1.5" data-heatmap-lesson="${ls.lesson}">
                <div class="flex items-center justify-between w-full">
                  <span class="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <span>Bài ${ls.lesson}</span>
                    ${ls.bossDefeated ? '<span title="Đã hạ Boss bài này!">👑</span>' : ''}
                  </span>
                  ${statusBadge}
                </div>
                <div class="font-hanzi-serif text-lg font-bold text-white truncate">${ls.title}</div>
                <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div class="h-full ${ls.masteredPct >= 80 ? 'bg-emerald-400' : ls.weak > 0 ? 'bg-rose-500' : 'bg-amber-400'}" style="width: ${Math.max(ls.masteredPct, ls.avgScore)}%"></div>
                </div>
                <div class="flex items-center justify-between text-[11px] opacity-80">
                  <span>Thuộc: ${ls.mastered}/${ls.total}</span>
                  <span>TB: ${ls.avgScore}%</span>
                </div>
              </div>
              <div class="pt-1.5 border-t border-slate-800/70 flex items-center justify-between gap-1.5">
                <button
                  type="button"
                  data-heatmap-read="${ls.lesson}"
                  class="flex-1 py-1 rounded-lg bg-slate-800/90 hover:bg-indigo-600/30 text-[11px] font-semibold text-indigo-300 transition"
                >
                  📜 Bài khóa
                </button>
                <button
                  type="button"
                  data-heatmap-boss="${ls.lesson}"
                  class="flex-1 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-600 text-[11px] font-bold text-rose-300 hover:text-white border border-rose-500/30 transition"
                >
                  🐉 Đấu Boss
                </button>
              </div>
            </div>
          `;
        })
        .join('');

      heatmapEl.querySelectorAll('[data-heatmap-lesson]').forEach(el => {
        el.addEventListener('click', () => {
          const lNum = el.getAttribute('data-heatmap-lesson');
          window.HSKStorage.saveSettings({ selectedLesson: lNum });
          const selectEl = document.getElementById('global-lesson-select');
          if (selectEl) selectEl.value = lNum;
          reloadFlashcardDeck();
          switchTab('flashcard');
        });
      });

      heatmapEl.querySelectorAll('[data-heatmap-read]').forEach(btn => {
        btn.addEventListener('click', () => {
          const lNum = parseInt(btn.getAttribute('data-heatmap-read'), 10) || 1;
          currentReadingLesson = lNum;
          const readSel = document.getElementById('reading-lesson-select');
          if (readSel) readSel.value = String(lNum);
          switchTab('reading');
        });
      });

      heatmapEl.querySelectorAll('[data-heatmap-boss]').forEach(btn => {
        btn.addEventListener('click', () => {
          const lNum = btn.getAttribute('data-heatmap-boss');
          switchTab('games');
          window.HSKGames.startBossBattle(lNum);
        });
      });
    }

    // 2. Render Top Confused Characters ("Tội Phạm Mặt Chữ") with 1-vs-1 Twin Microscope
    const criminalsEl = document.getElementById('analytics-criminals-list');
    if (criminalsEl) {
      if (diag.criminals.length === 0) {
        criminalsEl.innerHTML = `
          <div class="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
            <div class="text-3xl">✨</div>
            <div class="text-base font-bold text-emerald-400">Danh sách "Tội Phạm Mặt Chữ" đang trống!</div>
            <p class="text-xs text-slate-400 max-w-md mx-auto">
              Khi bạn bấm phím <kbd class="kbd-pill">H</kbd> để xem trộm Pinyin hoặc chọn nhầm chữ Hán trong 8 Minigame, hệ thống sẽ tự động bắt giữ các mặt chữ đó vào đây để "đặc trị".
            </p>
          </div>
        `;
      } else {
        criminalsEl.innerHTML = diag.criminals
          .slice(0, 20)
          .map(({ word, record }) => {
            const confusedEntries = Object.entries(record.confusedWith || {});
            const primaryCulprit = confusedEntries.length > 0
              ? confusedEntries.sort((a, b) => b[1] - a[1])[0][0]
              : (word.visualDistractors && word.visualDistractors[0]) || null;

            const confusedHTML = confusedEntries.length
              ? confusedEntries
                  .map(([hz, cnt]) => `<span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-hanzi-serif text-sm border border-rose-500/30">${hz} (${cnt}x)</span>`)
                  .join(' ')
              : (word.visualDistractors || [])
                  .slice(0, 2)
                  .map(hz => `<span class="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-hanzi-serif text-sm">${hz}</span>`)
                  .join(' ');

            const diffHTML = primaryCulprit && window.HSKGames && window.HSKGames.renderTwinDiffHTML
              ? window.HSKGames.renderTwinDiffHTML(word, primaryCulprit)
              : '';

            return `
              <div class="p-4 rounded-2xl bg-slate-900/90 border border-rose-500/30 space-y-3">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div class="flex items-center gap-4">
                    <div class="font-hanzi-serif text-4xl font-bold text-white bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
                      ${word.hanzi}
                    </div>
                    <div class="space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-white">${word.meaning}</span>
                        <span class="text-xs text-amber-300 uppercase">[${word.hanViet}]</span>
                        <span class="text-xs text-slate-400">• Bài ${word.lesson}</span>
                      </div>
                      <div class="flex items-center gap-3 text-xs">
                        <span class="text-rose-400 font-semibold">❌ Chọn nhầm: ${record.wrongCount || 0} lần</span>
                        <span class="text-amber-400 font-semibold">👁️ Xem trộm Pinyin: ${record.pinyinPeekCount || 0} lần</span>
                        <span class="text-indigo-300">Mastery: ${record.masteryScore || 0}%</span>
                      </div>
                      <div class="flex items-center gap-1.5 flex-wrap text-xs text-slate-400 pt-0.5">
                        <span>Hay nhầm với:</span>
                        ${confusedHTML}
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-2">
                    ${
                      primaryCulprit
                        ? `<button
                            type="button"
                            data-criminal-diff="${word.id}"
                            class="px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold transition whitespace-nowrap"
                          >
                            🔬 Soi 1-vs-1 (${word.hanzi} vs ${primaryCulprit})
                          </button>`
                        : ''
                    }
                    <button
                      type="button"
                      data-criminal-practice="${word.id}"
                      class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition whitespace-nowrap"
                    >
                      ✍️ Tập viết ngay
                    </button>
                  </div>
                </div>

                <div id="criminal-diff-box-${word.id}" class="hidden">
                  ${diffHTML}
                </div>
              </div>
            `;
          })
          .join('');

        criminalsEl.querySelectorAll('[data-criminal-diff]').forEach(btn => {
          btn.addEventListener('click', () => {
            const wid = btn.getAttribute('data-criminal-diff');
            const box = document.getElementById(`criminal-diff-box-${wid}`);
            if (box) box.classList.toggle('hidden');
          });
        });

        criminalsEl.querySelectorAll('[data-criminal-practice]').forEach(btn => {
          btn.addEventListener('click', () => {
            const wid = btn.getAttribute('data-criminal-practice');
            flashcardList = window.HSKStorage.getAllVocab();
            currentCardIdx = Math.max(0, flashcardList.findIndex(w => w.id === wid));
            isCardFlipped = false;
            switchTab('flashcard');
          });
        });
      }
    }
  }

  /**
   * Launch "Chiến Dịch Đặc Trị" (Targeted Drill Campaign)
   */
  function startTargetedDrillCampaign() {
    let weakWords = window.HSKStorage.getTargetedDrillWords();
    if (weakWords.length === 0) {
      const all = window.HSKStorage.getAllVocab();
      weakWords = all.slice(0, 8);
      weakWords.forEach(w => window.HSKStorage.recordMistake(w.id));
      refreshHeaderStats();
    }

    reloadFlashcardDeck(weakWords);
    switchTab('games');
    window.HSKGames.startGame('game1', true, weakWords);
  }

  /**
   * Launch "⚡ Học Nhanh 10 Phút" (Daily Smart Session)
   */
  function startDailySmartSession() {
    const smartDeck = window.HSKStorage.getSmartDailySessionWords(10);
    reloadFlashcardDeck(smartDeck);
    switchTab('flashcard');

    const toast = document.getElementById('anti-pinyin-toast');
    if (toast) {
      toast.className = 'fixed bottom-5 right-5 z-50 max-w-md px-4 py-3 rounded-2xl bg-emerald-950/95 border-2 border-emerald-400 text-emerald-200 text-xs shadow-2xl backdrop-blur-md';
      toast.innerHTML = `
        ⚡ <strong>Đã tạo Lộ Trình Học Nhanh 10 Phút (${smartDeck.length} từ trọng tâm)!</strong><br/>
        Bao gồm các từ trong Sổ Thù Vặt + từ đến hạn ôn SM-2 + từ mới. Hãy lật thẻ & tập viết nét hoặc bấm sang tab <strong>8 Minigame</strong> để chiến ngay!
      `;
      toast.classList.remove('hidden');
      clearTimeout(toast._hideTimer);
      toast._hideTimer = setTimeout(() => {
        toast.classList.add('hidden');
        toast.className = 'hidden fixed bottom-5 right-5 z-50 max-w-md px-4 py-3 rounded-2xl bg-rose-950/95 border-2 border-rose-500 text-rose-200 text-xs shadow-2xl backdrop-blur-md animate-bounce';
      }, 4500);
    }
  }

  // ============================================================================
  // GLOBAL EVENT LISTENERS & KEYBOARD SHORTCUT ROUTER
  // ============================================================================
  function bindGlobalEvents() {
    document.querySelectorAll('[data-nav-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        switchTab(btn.getAttribute('data-nav-tab'));
      });
    });

    document.querySelectorAll('[data-game-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.HSKGames.startGame(btn.getAttribute('data-game-tab'), false);
      });
    });

    const dailyBtn = document.getElementById('btn-start-daily-session');
    if (dailyBtn) {
      dailyBtn.addEventListener('click', startDailySmartSession);
    }

    const lessonSelect = document.getElementById('global-lesson-select');
    if (lessonSelect) {
      lessonSelect.addEventListener('change', () => {
        const val = lessonSelect.value;
        window.HSKStorage.saveSettings({ selectedLesson: val });
        const num = parseInt(val, 10);
        if (num >= 1 && num <= 20) {
          currentReadingLesson = num;
          const readSel = document.getElementById('reading-lesson-select');
          if (readSel) readSel.value = String(num);
        }
        reloadFlashcardDeck();
        if (activeTab === 'flashcard') renderFlashcardView();
        if (activeTab === 'games') window.HSKGames.startGame('game1', false);
        if (activeTab === 'reading') renderReadingView();
        if (activeTab === 'vocab') renderVocabExplorer();
      });
    }

    const readingSelect = document.getElementById('reading-lesson-select');
    if (readingSelect) {
      readingSelect.addEventListener('change', () => {
        currentReadingLesson = parseInt(readingSelect.value, 10) || 1;
        renderReadingView();
      });
    }

    const speakAllDialogueBtn = document.getElementById('btn-reading-speak-all');
    if (speakAllDialogueBtn) {
      speakAllDialogueBtn.addEventListener('click', () => {
        const dialogues = window.HSK3_MINI_DIALOGUES || [];
        const d = dialogues.find(item => item.lesson === Number(currentReadingLesson)) || dialogues[0];
        if (d) {
          const fullText = d.lines.map(l => l.hanzi).join(' ');
          window.HSKSound.speak(fullText, 0.92);
        }
      });
    }

    const antiPinyinBtn = document.getElementById('btn-toggle-antipinyin');
    if (antiPinyinBtn) {
      antiPinyinBtn.addEventListener('click', () => {
        const current = window.HSKStorage.getSettings().strictAntiPinyin;
        const next = !current;
        window.HSKStorage.saveSettings({ strictAntiPinyin: next });
        applyAntiPinyinBodyClass(next);
      });
    }

    const toneBtn = document.getElementById('btn-toggle-tones');
    if (toneBtn) {
      toneBtn.addEventListener('click', () => {
        const current = window.HSKStorage.getSettings().toneColors;
        const next = !current;
        window.HSKStorage.saveSettings({ toneColors: next });
        toneBtn.innerHTML = next ? '🎨 Màu Thanh Điệu: BẬT' : '🎨 Màu Thanh Điệu: TẮT';
        if (activeTab === 'flashcard') renderFlashcardView();
        if (activeTab === 'vocab') renderVocabExplorer();
      });
    }

    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const current = window.HSKStorage.getSettings().darkMode;
        const next = !current;
        window.HSKStorage.saveSettings({ darkMode: next });
        applyTheme(next);
        if (activeTab === 'flashcard') renderFlashcardView();
      });
    }

    const card3dEl = document.getElementById('flashcard-3d-box');
    if (card3dEl) {
      card3dEl.addEventListener('click', e => {
        if (e.target.closest('button') || e.target.closest('input') || e.target.closest('.pinyin-mask')) return;
        flipCurrentCard();
      });
    }

    const btnPrev = document.getElementById('btn-fc-prev');
    const btnNext = document.getElementById('btn-fc-next');
    const btnFlip = document.getElementById('btn-fc-flip');
    if (btnPrev) btnPrev.addEventListener('click', prevCard);
    if (btnNext) btnNext.addEventListener('click', nextCard);
    if (btnFlip) btnFlip.addEventListener('click', flipCurrentCard);

    // Flashcard 3-Dimension Switcher (Chiều 1, Chiều 2, Chiều 3 听写)
    document.querySelectorAll('[data-fc-dim]').forEach(btn => {
      btn.addEventListener('click', () => {
        cardDimension = parseInt(btn.getAttribute('data-fc-dim'), 10) || 1;
        isCardFlipped = false;
        document.querySelectorAll('[data-fc-dim]').forEach(b => {
          const d = parseInt(b.getAttribute('data-fc-dim'), 10);
          b.className = d === cardDimension
            ? 'px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white transition'
            : 'px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition';
        });
        renderFlashcardView();
      });
    });

    document.querySelectorAll('[data-sm2-grade]').forEach(btn => {
      btn.addEventListener('click', () => {
        const g = parseInt(btn.getAttribute('data-sm2-grade'), 10);
        gradeCurrentCard(g);
      });
    });

    const btnAnimateAll = document.getElementById('btn-writer-animate-all');
    const btnQuizAll = document.getElementById('btn-writer-quiz-all');
    const btnToggleOutline = document.getElementById('btn-writer-toggle-outline');
    const statusEl = document.getElementById('hanzi-writer-status');

    if (btnAnimateAll) {
      btnAnimateAll.addEventListener('click', () => {
        window.HSKWriter.animateAllSequential();
      });
    }
    if (btnQuizAll) {
      btnQuizAll.addEventListener('click', () => {
        window.HSKWriter.startFullWordStrokeQuiz(statusEl);
      });
    }
    if (btnToggleOutline) {
      btnToggleOutline.addEventListener('click', () => {
        const show = window.HSKWriter.toggleOutlineInQuiz();
        btnToggleOutline.textContent = show ? '👁️ Khung mờ khi viết: BẬT' : '🚫 Khung mờ khi viết: ẨN (Khó)';
      });
    }

    const searchInput = document.getElementById('vocab-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', renderVocabExplorer);
    }

    document.querySelectorAll('[data-action="start-targeted-drill"]').forEach(btn => {
      btn.addEventListener('click', startTargetedDrillCampaign);
    });

    const modalEl = document.getElementById('modal-data-manager');
    const btnOpenModal = document.getElementById('btn-open-data-modal');
    const btnCloseModal = document.getElementById('btn-close-data-modal');
    const btnExportJson = document.getElementById('btn-data-export');
    const btnImportRun = document.getElementById('btn-data-import');
    const btnResetAll = document.getElementById('btn-data-reset');
    const dataTextarea = document.getElementById('data-manager-textarea');
    const dataStatus = document.getElementById('data-manager-status');

    if (btnOpenModal && modalEl) {
      btnOpenModal.addEventListener('click', () => {
        modalEl.classList.remove('hidden');
      });
    }
    if (btnCloseModal && modalEl) {
      btnCloseModal.addEventListener('click', () => {
        modalEl.classList.add('hidden');
      });
    }
    if (btnExportJson && dataTextarea) {
      btnExportJson.addEventListener('click', () => {
        dataTextarea.value = window.HSKStorage.exportDataBundle();
        if (dataStatus) {
          dataStatus.innerHTML = `<span class="text-emerald-400">✓ Đã xuất dữ liệu JSON ra khung bên dưới. Bạn có thể copy lưu trữ!</span>`;
        }
      });
    }
    if (btnImportRun && dataTextarea) {
      btnImportRun.addEventListener('click', () => {
        try {
          const res = window.HSKStorage.importData(dataTextarea.value);
          reloadFlashcardDeck();
          refreshHeaderStats();
          renderFlashcardView();
          renderVocabExplorer();
          renderAnalyticsDashboard();
          if (dataStatus) {
            dataStatus.innerHTML = `<span class="text-emerald-400 font-bold">🎉 Nhập thành công ${res.count} mục dữ liệu (${res.mode}) vào localStorage!</span>`;
          }
        } catch (err) {
          if (dataStatus) {
            dataStatus.innerHTML = `<span class="text-rose-400 font-bold">❌ Lỗi nhập dữ liệu: ${err.message}</span>`;
          }
        }
      });
    }
    if (btnResetAll) {
      btnResetAll.addEventListener('click', () => {
        window.HSKStorage.resetAllProgress();
        reloadFlashcardDeck();
        refreshHeaderStats();
        renderFlashcardView();
        renderAnalyticsDashboard();
        if (dataStatus) {
          dataStatus.innerHTML = `<span class="text-amber-400 font-semibold">Đã xóa lịch sử học về mặc định ban đầu.</span>`;
        }
      });
    }

    // KEYBOARD SHORTCUT ROUTER (Conflict-Free with Inputs!)
    window.addEventListener('keydown', e => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      const isTypingInInput = activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select';

      if (isTypingInInput) {
        return;
      }

      if ((e.key === 'h' || e.key === 'H') && !holdingKeyH) {
        holdingKeyH = true;
        document.body.classList.add('global-peek-active');
        const word = getCurrentWord();
        if (word && activeTab === 'flashcard') {
          const updated = window.HSKStorage.recordPinyinPeek(word.id);
          showPeekPenaltyToast(word.id, updated ? updated.pinyinPeekCount : 1);
          refreshHeaderStats();
          renderFlashcardView();
          document.body.classList.add('global-peek-active');
        }
        return;
      }

      if (activeTab === 'games') {
        window.HSKGames.handleKeyDown(e);
        return;
      }

      if (activeTab === 'flashcard') {
        if (e.code === 'Space') {
          e.preventDefault();
          flipCurrentCard();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextCard();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevCard();
        } else if (e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          const w = getCurrentWord();
          if (w) window.HSKSound.speak(w.hanzi);
        } else if (e.key === 'w' || e.key === 'W') {
          e.preventDefault();
          window.HSKWriter.startFullWordStrokeQuiz(document.getElementById('hanzi-writer-status'));
        } else if (['1', '2', '3', '4'].includes(e.key)) {
          e.preventDefault();
          gradeCurrentCard(parseInt(e.key, 10));
        }
      }
    });

    window.addEventListener('keyup', e => {
      if (e.key === 'h' || e.key === 'H') {
        holdingKeyH = false;
        document.body.classList.remove('global-peek-active');
      }
    });
  }

  return {
    init,
    switchTab,
    jumpToWordFlashcard,
    refreshHeaderStats,
    startTargetedDrillCampaign,
    startDailySmartSession
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  window.HSKApp.init();
});
