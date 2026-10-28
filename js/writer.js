/**
 * Hanzi Writer 3.5 Integration Module
 * Muscle Memory & Stroke Order Quiz Engine (Multi-character Canvas Splitter)
 */

window.HSKWriter = (function () {
  let writerInstances = [];
  let activeWord = null;
  let showOutlineInQuiz = false;

  function destroyInstances() {
    writerInstances = [];
  }

  /**
   * Render split character canvases for a vocabulary item inside containerId
   */
  function renderWordCanvases(wordItem, containerEl, statusEl) {
    destroyInstances();
    activeWord = wordItem;
    if (!containerEl || !wordItem) return;

    containerEl.innerHTML = '';
    const chars = Array.from(wordItem.hanzi).filter(c => /[\u4e00-\u9fa5]/.test(c));

    if (!window.HanziWriter) {
      containerEl.innerHTML = `
        <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm">
          Đang tải thư viện HanziWriter CDN... Hãy kiểm tra kết nối mạng nếu khung tập viết chưa hiển thị.
        </div>`;
      return;
    }

    const isLight = document.documentElement.classList.contains('light');
    const strokeColor = isLight ? '#0f172a' : '#f8fafc';
    const radicalColor = '#6366f1'; // Indigo highlight for radical
    const outlineColor = isLight ? '#cbd5e1' : '#334155';
    const drawingColor = '#10b981';

    chars.forEach((char, index) => {
      const decomp = (wordItem.decomposition || []).find(d => d.char === char) || {
        char,
        pinyin: '',
        hanViet: '',
        radical: 'Bộ thủ HSK',
        mnemonic: ''
      };

      const wrapper = document.createElement('div');
      wrapper.className = 'flex flex-col items-center gap-2.5 bg-slate-900/50 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-700/60';

      const header = document.createElement('div');
      header.className = 'flex items-center justify-between w-full px-1 text-xs';
      header.innerHTML = `
        <span class="font-bold text-indigo-400">Chữ #${index + 1}: <span class="font-hanzi-serif text-base text-white">${char}</span> (${decomp.hanViet || ''})</span>
        <span class="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">${decomp.radical || ''}</span>
      `;

      const canvasBox = document.createElement('div');
      const canvasId = `hanzi-canvas-${wordItem.id}-${index}`;
      canvasBox.id = canvasId;
      canvasBox.className = 'stroke-canvas-box flex items-center justify-center cursor-crosshair select-none';
      canvasBox.style.width = '180px';
      canvasBox.style.height = '180px';

      const controls = document.createElement('div');
      controls.className = 'flex items-center gap-1.5 w-full justify-center';
      controls.innerHTML = `
        <button type="button" data-action="animate-single" data-idx="${index}"
          class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition">
          ▶ Xem nét
        </button>
        <button type="button" data-action="quiz-single" data-idx="${index}"
          class="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition">
          ✍️ Tự viết
        </button>
      `;

      const feedbackLine = document.createElement('div');
      feedbackLine.id = `hanzi-feedback-${index}`;
      feedbackLine.className = 'text-xs text-slate-400 h-4 text-center font-medium';
      feedbackLine.textContent = 'Sẵn sàng luyện nét';

      wrapper.appendChild(header);
      wrapper.appendChild(canvasBox);
      wrapper.appendChild(controls);
      wrapper.appendChild(feedbackLine);
      containerEl.appendChild(wrapper);

      try {
        const writer = window.HanziWriter.create(canvasId, char, {
          width: 176,
          height: 176,
          padding: 12,
          showOutline: true,
          showCharacter: true,
          strokeAnimationSpeed: 1.15,
          delayBetweenStrokes: 160,
          strokeColor,
          radicalColor,
          outlineColor,
          drawingColor,
          drawingWidth: 18,
          showHintAfterMisses: 3,
          highlightOnComplete: true,
          highlightColor: '#10b981'
        });

        writerInstances.push({
          index,
          char,
          writer,
          canvasBox,
          feedbackLine
        });
      } catch (err) {
        console.warn('HanziWriter create error:', err);
      }
    });

    // Bind single-character buttons
    containerEl.querySelectorAll('button[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const action = btn.getAttribute('data-action');
        if (action === 'animate-single') {
          animateSingle(idx);
        } else if (action === 'quiz-single') {
          startSingleQuiz(idx, statusEl);
        }
      });
    });
  }

  function animateSingle(index) {
    const inst = writerInstances[index];
    if (!inst) return;
    inst.canvasBox.classList.remove('quiz-active', 'quiz-mistake');
    inst.writer.cancelQuiz();
    inst.writer.showCharacter();
    inst.writer.showOutline();
    inst.feedbackLine.textContent = `Đang mô phỏng thứ tự nét chữ "${inst.char}"...`;
    inst.feedbackLine.className = 'text-xs text-indigo-400 h-4 text-center font-medium';
    inst.writer.animateCharacter({
      onComplete: () => {
        inst.feedbackLine.textContent = `Hoàn tất mô phỏng nét chữ "${inst.char}"`;
      }
    });
  }

  function animateAllSequential() {
    if (!writerInstances.length) return;
    let idx = 0;
    function next() {
      if (idx >= writerInstances.length) return;
      const inst = writerInstances[idx];
      inst.canvasBox.classList.remove('quiz-active', 'quiz-mistake');
      inst.writer.cancelQuiz();
      inst.writer.showCharacter();
      inst.writer.showOutline();
      inst.feedbackLine.textContent = `Đang viết mẫu chữ "${inst.char}"...`;
      inst.writer.animateCharacter({
        onComplete: () => {
          inst.feedbackLine.textContent = `Đã viết xong "${inst.char}"`;
          idx++;
          setTimeout(next, 260);
        }
      });
    }
    next();
  }

  function startSingleQuiz(index, statusEl, onCompleteCallback = null) {
    const inst = writerInstances[index];
    if (!inst) return;

    inst.writer.hideCharacter();
    if (showOutlineInQuiz) {
      inst.writer.showOutline();
    } else {
      inst.writer.hideOutline();
    }

    inst.canvasBox.classList.add('quiz-active');
    inst.feedbackLine.textContent = `Dùng chuột/trackpad vẽ nét #1 của "${inst.char}"`;
    inst.feedbackLine.className = 'text-xs text-emerald-400 h-4 text-center font-semibold';

    let strokeMisses = 0;

    inst.writer.quiz({
      showHintAfterMisses: 3,
      markStrokeCorrectAfterMisses: false,
      onMistake: function (strokeData) {
        strokeMisses++;
        inst.canvasBox.classList.remove('quiz-mistake');
        void inst.canvasBox.offsetWidth;
        inst.canvasBox.classList.add('quiz-mistake');
        if (window.HSKSound) window.HSKSound.playBuzz();

        const missesOnThisStroke = strokeData.mistakesOnStroke || strokeMisses;
        if (missesOnThisStroke >= 3) {
          inst.feedbackLine.textContent = `⚠️ Sai ${missesOnThisStroke} lần nét #${strokeData.strokeNum + 1}! Đã bật gợi ý nét đỏ!`;
          inst.feedbackLine.className = 'text-xs text-rose-400 h-4 text-center font-bold';
          if (activeWord && window.HSKStorage) {
            window.HSKStorage.recordMistake(activeWord.id);
          }
        } else {
          inst.feedbackLine.textContent = `Chưa chuẩn nét #${strokeData.strokeNum + 1} (Sai ${missesOnThisStroke}/3 lần)`;
          inst.feedbackLine.className = 'text-xs text-amber-400 h-4 text-center font-medium';
        }
      },
      onCorrectStroke: function (strokeData) {
        if (window.HSKSound) window.HSKSound.playStrokeHit();
        const remaining = strokeData.strokesRemaining;
        inst.feedbackLine.textContent = remaining > 0
          ? `✓ Chuẩn nét #${strokeData.strokeNum + 1}! Còn ${remaining} nét`
          : `🎉 Tuyệt vời! Đã viết xong chữ "${inst.char}"`;
        inst.feedbackLine.className = 'text-xs text-emerald-400 h-4 text-center font-semibold';
      },
      onComplete: function (summaryData) {
        inst.canvasBox.classList.remove('quiz-active', 'quiz-mistake');
        inst.feedbackLine.textContent = `🏆 Hoàn thành "${inst.char}" (Lỗi: ${summaryData.totalMistakes} nét)`;
        inst.feedbackLine.className = 'text-xs text-emerald-300 h-4 text-center font-bold';
        if (statusEl) {
          statusEl.textContent = `Đã hoàn thành tự viết chữ "${inst.char}" với ${summaryData.totalMistakes} lỗi.`;
        }
        if (onCompleteCallback) {
          onCompleteCallback(summaryData);
        }
      }
    });
  }

  /**
   * Start Stroke Quiz Mode across all characters of the current word
   */
  function startFullWordStrokeQuiz(statusEl, onAllCompleteCallback = null) {
    if (!writerInstances.length) return;
    let completedCount = 0;
    let totalMistakesAll = 0;

    if (statusEl) {
      statusEl.textContent = `Chế độ Tự Viết Chữ (Ẩn nét): Hãy dùng chuột vẽ từng nét cho cả từ "${activeWord ? activeWord.hanzi : ''}"!`;
    }

    writerInstances.forEach((inst, idx) => {
      startSingleQuiz(idx, statusEl, (summary) => {
        completedCount++;
        totalMistakesAll += summary.totalMistakes || 0;
        if (completedCount === writerInstances.length) {
          if (window.HSKSound) window.HSKSound.playVictory();
          if (activeWord && window.HSKStorage) {
            window.HSKStorage.recordStrokeSuccess(activeWord.id);
          }
          if (statusEl) {
            statusEl.textContent = `🎉 Xuất sắc! Bạn đã tự tay viết hoàn chỉnh từ "${activeWord.hanzi}" (Tổng lỗi: ${totalMistakesAll})! +20 Mastery Score!`;
          }
          if (window.HSKApp && window.HSKApp.refreshHeaderStats) {
            window.HSKApp.refreshHeaderStats();
          }
          if (typeof onAllCompleteCallback === 'function') {
            onAllCompleteCallback(totalMistakesAll);
          }
        }
      });
    });
  }

  function toggleOutlineInQuiz() {
    showOutlineInQuiz = !showOutlineInQuiz;
    return showOutlineInQuiz;
  }

  return {
    renderWordCanvases,
    animateAllSequential,
    startFullWordStrokeQuiz,
    toggleOutlineInQuiz
  };
})();
