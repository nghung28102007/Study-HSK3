/**
 * HSK 3 Gamification Engine - 8 Orthographic Minigames + Boss Battle + Fever Mode + Twin-Character Microscope
 * Strictly engineered to cure "Character Blindness" & Pinyin Dependency.
 */

window.HSKGames = (function () {
  let activeGameId = 'game1'; // 'game1'..'game8' | 'boss'
  let score = 0;
  let combo = 0;
  let maxCombo = 0;
  let questionIndex = 0;
  let currentWord = null;
  let currentPool = [];
  let gameLocked = false;

  // Game 1 state (IME Candidate Trap)
  let imeStage = 'typing'; // 'typing' | 'candidates' | 'done'
  let imeCandidates = [];

  // Game 2 state (Character Lego Assembly)
  let legoTargetChars = [];
  let legoSelectedChars = [];
  let legoMatrix = [];
  const LEGO_HOTKEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];

  // Game 3, 4, 6 state (4 options)
  let currentOptions = [];
  let clozeRescueShown = false;

  // Game 5 state (60s Matrix Speed Match 4x4)
  let matrixMode = 'meaning'; // 'meaning' (Hanzi <-> Meaning) | 'radical' (Hanzi <-> Radical + HanViet)
  let matrixCards = [];
  let matrixFirstPick = null;
  let matrixMatchedPairs = 0;
  let matrixTimeLeft = 60;
  let matrixTimerId = null;
  let matrixMistakesThisRound = 0;
  const MATRIX_HOTKEYS = ['1', '2', '3', '4', '5', '6', '7', '8', 'Q', 'W', 'E', 'R', 'A', 'S', 'D', 'F'];

  // Game 6 state (Audio Blitz 5s)
  let audioBlitzTimeLeft = 5.0;
  let audioBlitzTimerId = null;

  // Game 7 state (Radical Sniper)
  let sniperTimeLeft = 25;
  let sniperTimerId = null;
  let sniperWave = 1;
  let sniperMission = null;
  let sniperBoard = [];
  let sniperRemainingTargets = 0;

  // Game 8 state (Sentence Jumble / 連詞成句)
  let jumbleItem = null;
  let jumblePoolChunks = []; // [{ id, text, used }]
  let jumbleSelectedOrder = []; // indices into jumblePoolChunks

  // Boss Battle state (Đấu Boss Cuối Bài)
  let bossState = {
    active: false,
    lessonKey: 'all',
    bossName: 'Ma Vương Mù Mặt Chữ',
    maxHp: 1000,
    hp: 1000,
    playerHearts: 3,
    roundCount: 0,
    subMode: 'radar' // 'ime' | 'lego' | 'radar' | 'audio' | 'finisher'
  };

  // Targeted Campaign state
  let campaignActive = false;
  let campaignWords = [];

  // Emergency Pinyin Rescue state ("Chỉ dùng khi thật sự cần")
  let gamePinyinRevealed = false;
  let charPinyinCache = null;

  const COMMON_CHAR_PINYIN = {
    '我': 'wǒ', '你': 'nǐ', '他': 'tā', '她': 'tā', '们': 'men', '的': 'de', '了': 'le', '吗': 'ma', '呢': 'ne', '吧': 'ba',
    '在': 'zài', '是': 'shì', '有': 'yǒu', '没': 'méi', '不': 'bù', '很': 'hěn', '都': 'dōu', '也': 'yě', '还': 'hái', '就': 'jiù',
    '要': 'yào', '会': 'huì', '能': 'néng', '可': 'kě', '以': 'yǐ', '去': 'qù', '来': 'lái', '回': 'huí', '到': 'dào', '走': 'zǒu',
    '看': 'kàn', '听': 'tīng', '说': 'shuō', '读': 'dú', '写': 'xiě', '吃': 'chī', '喝': 'hē', '买': 'mǎi', '卖': 'mài', '穿': 'chuān',
    '住': 'zhù', '坐': 'zuò', '开': 'kāi', '关': 'guān', '找': 'zhǎo', '今': 'jīn', '明': 'míng', '昨': 'zuó', '天': 'tiān', '年': 'nián',
    '月': 'yuè', '日': 'rì', '星': 'xīng', '期': 'qī', '点': 'diǎn', '分': 'fēn', '早': 'zǎo', '上': 'shàng', '下': 'xià', '午': 'wǔ',
    '晚': 'wǎn', '前': 'qián', '后': 'hòu', '里': 'lǐ', '外': 'wài', '左': 'zuǒ', '右': 'yòu', '东': 'dōng', '西': 'xī', '南': 'nán', '北': 'běi',
    '大': 'dà', '小': 'xiǎo', '多': 'duō', '少': 'shǎo', '好': 'hǎo', '坏': 'huài', '冷': 'lěng', '热': 'rè', '高': 'gāo', '兴': 'xìng',
    '漂': 'piào', '亮': 'liàng', '快': 'kuài', '慢': 'màn', '忙': 'máng', '累': 'lèi', '贵': 'guì', '新': 'xīn', '旧': 'jiù',
    '人': 'rén', '家': 'jiā', '学': 'xué', '校': 'xiào', '生': 'shēng', '老': 'lǎo', '师': 'shī', '朋': 'péng', '友': 'yǒu',
    '医': 'yī', '院': 'yuàn', '公': 'gōng', '司': 'sī', '商': 'shāng', '店': 'diàn', '饭': 'fàn', '馆': 'guǎn', '水': 'shuǐ', '果': 'guǒ',
    '茶': 'chá', '咖': 'kā', '啡': 'fēi', '牛': 'niú', '奶': 'nǎi', '菜': 'cài', '米': 'mǐ', '面': 'miàn', '肉': 'ròu', '鱼': 'yú',
    '衣': 'yī', '服': 'fú', '车': 'chē', '飞': 'fēi', '机': 'jī', '火': 'huǒ', '电': 'diàn', '视': 'shì', '脑': 'nǎo', '影': 'yǐng',
    '话': 'huà', '书': 'shū', '字': 'zì', '汉': 'Hàn', '语': 'yǔ', '题': 'tí', '问': 'wèn', '课': 'kè', '考': 'kǎo', '试': 'shì',
    '工': 'gōng', '作': 'zuò', '休': 'xiū', '息': 'xī', '睡': 'shuì', '觉': 'jiào', '床': 'chuáng', '房': 'fáng', '间': 'jiān', '门': 'mén',
    '桌': 'zhuō', '椅': 'yǐ', '钱': 'qián', '块': 'kuài', '元': 'yuán', '件': 'jiàn', '张': 'zhāng', '本': 'běn', '个': 'gè', '位': 'wèi',
    '双': 'shuāng', '杯': 'bēi', '瓶': 'píng', '碗': 'wǎn', '盘': 'pán', '爸': 'bà', '妈': 'mā', '哥': 'gē', '姐': 'jiě', '弟': 'dì', '妹': 'mèi',
    '晴': 'qíng', '睛': 'jīng', '情': 'qíng', '请': 'qǐng', '清': 'qīng', '精': 'jīng', '跟': 'gēn', '很': 'hěn', '恨': 'hèn', '根': 'gēn', '银': 'yín', '眼': 'yǎn',
    '打': 'dǎ', '扫': 'sǎo', '把': 'bǎ', '拉': 'lā', '接': 'jiē', '换': 'huàn', '搬': 'bān', '拿': 'ná', '末': 'mò', '未': 'wèi', '术': 'shù', '木': 'mù', '林': 'lín', '树': 'shù',
    '裤': 'kù', '裙': 'qún', '衬': 'chèn', '衫': 'shān', '被': 'bèi', '礼': 'lǐ', '祝': 'zhù', '渴': 'kě', '河': 'hé', '湖': 'hú', '洗': 'xǐ', '澡': 'zǎo', '泳': 'yǒng', '活': 'huó',
    '己': 'jǐ', '已': 'yǐ', '巳': 'sì', '记': 'jì', '纪': 'jì', '起': 'qǐ', '改': 'gǎi', '入': 'rù', '八': 'bā', '介': 'jiè', '全': 'quán',
    '续': 'xù', '实': 'shí', '头': 'tóu', '太': 'tài', '犬': 'quǎn', '夫': 'fū', '哭': 'kū', '目': 'mù', '白': 'bái', '百': 'bǎi', '自': 'zì', '旦': 'dàn',
    '体': 'tǐ', '信': 'xìn', '但': 'dàn', '借': 'jiè', '跑': 'pǎo', '踢': 'tī', '跳': 'tiào', '远': 'yuǎn', '近': 'jìn', '送': 'sòng', '迟': 'chí', '过': 'guò',
    '忘': 'wàng', '想': 'xiǎng', '急': 'jí', '意': 'yì', '感': 'gǎn', '惯': 'guàn', '懂': 'dǒng', '怕': 'pà', '唱': 'chàng', '叫': 'jiào', '嘴': 'zuǐ', '啤': 'pí', '响': 'xiǎng',
    '讲': 'jiǎng', '认': 'rèn', '议': 'yì', '谁': 'shuí', '满': 'mǎn', '担': 'dān', '袜': 'wà', '春': 'chūn', '晒': 'shài'
  };

  function getCharPinyinMap() {
    if (charPinyinCache) return charPinyinCache;
    charPinyinCache = { ...COMMON_CHAR_PINYIN };
    const all = window.HSKStorage ? window.HSKStorage.getAllVocab() : [];
    all.forEach(w => {
      charPinyinCache[w.hanzi] = w.pinyin;
      (w.decomposition || []).forEach(d => {
        if (d.char && d.pinyin && !charPinyinCache[d.char]) {
          charPinyinCache[d.char] = d.pinyin;
        }
      });
    });
    return charPinyinCache;
  }

  function getPinyinForHanzi(hanziStr) {
    if (!hanziStr) return '';
    if (currentWord && currentWord.hanzi === hanziStr) {
      return currentWord.pinyin;
    }
    const map = getCharPinyinMap();
    if (map[hanziStr]) return map[hanziStr];

    const all = window.HSKStorage ? window.HSKStorage.getAllVocab() : [];
    const exact = all.find(w => w.hanzi === hanziStr);
    if (exact) return exact.pinyin;

    // Multi-character fallback: join character pinyins
    return Array.from(hanziStr)
      .map(ch => map[ch] || '')
      .filter(Boolean)
      .join(' ') || hanziStr;
  }

  function renderPinyinRescueButtonHTML(customLabel = null) {
    const label = customLabel || '🆘 Hiện Pinyin (Chỉ dùng khi thật sự cần • Phím P)';
    return `
      <button
        type="button"
        id="btn-game-pinyin-rescue"
        class="px-3 py-1 rounded-lg ${
          gamePinyinRevealed
            ? 'bg-amber-500/30 text-amber-200 border-amber-400'
            : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/35'
        } text-xs font-semibold border transition inline-flex items-center gap-1"
        title="Chỉ bấm khi bạn thực sự bí âm đọc! (Phím tắt: P)"
      >
        <span>${gamePinyinRevealed ? '👁️ Đã hiện Pinyin cứu trợ (Phím P để ẩn)' : label}</span>
      </button>
    `;
  }

  function toggleGamePinyinRescue() {
    gamePinyinRevealed = !gamePinyinRevealed;
    if (gamePinyinRevealed) {
      if (currentWord && window.HSKStorage) {
        window.HSKStorage.recordPinyinPeek(currentWord.id);
      }
      if (window.HSKApp && window.HSKApp.refreshHeaderStats) {
        window.HSKApp.refreshHeaderStats();
      }
      // In Game 6 Audio Blitz, give +2.5s extra breathing room when using Pinyin rescue
      if (activeGameId === 'game6' && !gameLocked && audioBlitzTimeLeft > 0) {
        audioBlitzTimeLeft = Math.min(5.0, +(audioBlitzTimeLeft + 2.5).toFixed(1));
      }
    }

    document.querySelectorAll('.game-rescue-pinyin').forEach(el => {
      el.classList.toggle('hidden', !gamePinyinRevealed);
    });

    const btn = document.getElementById('btn-game-pinyin-rescue');
    if (btn) {
      btn.className = `px-3 py-1 rounded-lg ${
        gamePinyinRevealed
          ? 'bg-amber-500/30 text-amber-200 border-amber-400'
          : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/35'
      } text-xs font-semibold border transition inline-flex items-center gap-1`;
      btn.innerHTML = `<span>${
        gamePinyinRevealed
          ? '👁️ Đã hiện Pinyin cứu trợ (Phím P để ẩn)'
          : '🆘 Hiện Pinyin (Chỉ dùng khi thật sự cần • Phím P)'
      }</span>`;
    }
  }

  function bindPinyinRescueButton() {
    const btn = document.getElementById('btn-game-pinyin-rescue');
    if (btn) {
      btn.addEventListener('click', toggleGamePinyinRescue);
    }
  }

  // Single-character lookalike families for Game 2 & Game 7
  const CONFUSABLE_CHAR_FAMILIES = [
    ['晴', '睛', '情', '请', '清', '精'],
    ['跟', '很', '恨', '根', '银', '眼'],
    ['打', '扫', '把', '拉', '接', '换', '搬', '拿'],
    ['末', '未', '本', '术', '木', '林', '树', '果'],
    ['裤', '裙', '衬', '衫', '被', '礼', '祝', '视'],
    ['渴', '喝', '河', '湖', '洗', '澡', '泳', '活'],
    ['己', '已', '巳', '记', '纪', '起', '改'],
    ['人', '入', '八', '个', '介', '全', '会'],
    ['买', '卖', '读', '续', '实', '头'],
    ['大', '太', '犬', '头', '天', '夫', '哭'],
    ['日', '目', '白', '百', '自', '旧', '旦', '早'],
    ['休', '体', '信', '位', '住', '但', '作', '借']
  ];

  // Radical Missions for Game 7 (Radical Sniper)
  const RADICAL_MISSIONS = [
    {
      id: 'hand',
      radicalCode: '扌/手',
      title: 'Bộ Thủ 扌 / 手 (Tài Gảy - Cái Tay)',
      hint: 'Các hành động dùng bàn tay: đánh, quét, cầm, nắm, chuyển, đổi...',
      targets: [
        { char: '打', info: 'đả - đánh/gọi' },
        { char: '扫', info: 'tảo - quét dọn' },
        { char: '把', info: 'bả - cầm/nắm' },
        { char: '拿', info: 'na - cầm lấy' },
        { char: '搬', info: 'ban - dọn/chuyển' },
        { char: '换', info: 'hoán - đổi' },
        { char: '接', info: 'tiếp - đón/nhận' },
        { char: '拉', info: 'lạp - kéo' },
        { char: '担', info: 'đam - gánh/lo' },
        { char: '找', info: 'trảo - tìm kiếm' }
      ],
      traps: ['渴', '喝', '跟', '晴', '睛', '河', '洗', '裤', '被', '树', '休', '借', '吃', '跑', '看', '听']
    },
    {
      id: 'water',
      radicalCode: '氵',
      title: 'Bộ Thủy 氵 (Ba Chấm Thủy - Nước)',
      hint: 'Các chữ có 3 giọt nước bên trái: khát, sông, hồ, tắm, rửa, sạch...',
      targets: [
        { char: '渴', info: 'khát - khát nước' },
        { char: '河', info: 'hà - con sông' },
        { char: '湖', info: 'hồ - mặt hồ' },
        { char: '洗', info: 'tẩy - giặt/rửa' },
        { char: '澡', info: 'tảo - tắm rửa' },
        { char: '清', info: 'thanh - trong sạch' },
        { char: '满', info: 'mãn - đầy/hài lòng' },
        { char: '泳', info: 'vịnh - bơi lội' },
        { char: '汉', info: 'Hán - tiếng Hán' },
        { char: '没', info: 'một - không có' }
      ],
      traps: ['喝', '晴', '睛', '请', '情', '打', '扫', '冷', '冰', '次', '决', '准', '跟', '很', '礼', '祝']
    },
    {
      id: 'speech',
      radicalCode: '讠',
      title: 'Bộ Ngôn 讠 (Lời Nói / Ngôn Ngữ)',
      hint: 'Các chữ liên quan đến nói năng, nhớ, mời, giảng, thảo luận...',
      targets: [
        { char: '请', info: 'thỉnh - xin mời' },
        { char: '记', info: 'ký - nhớ/ghi' },
        { char: '讲', info: 'giảng - giảng giải' },
        { char: '话', info: 'thoại - lời nói' },
        { char: '读', info: 'độc - đọc' },
        { char: '课', info: 'khóa - bài học' },
        { char: '试', info: 'thí - thi/thử' },
        { char: '认', info: 'nhận - nhận biết' },
        { char: '议', info: 'nghị - bàn bạc' },
        { char: '谁', info: 'thùy - ai' }
      ],
      traps: ['晴', '睛', '情', '清', '己', '已', '买', '卖', '渴', '喝', '裤', '衬', '视', '礼', '活', '汁']
    },
    {
      id: 'mouth',
      radicalCode: '口',
      title: 'Bộ Khẩu 口 (Cái Miệng)',
      hint: 'Các chữ dùng miệng: uống, ăn, khóc, cười, hát, hỏi, bia...',
      targets: [
        { char: '喝', info: 'hát - uống' },
        { char: '吃', info: 'ngật - ăn' },
        { char: '哭', info: 'khốc - khóc' },
        { char: '唱', info: 'xướng - ca hát' },
        { char: '叫', info: 'khiếu - gọi' },
        { char: '嘴', info: 'chủy - cái miệng' },
        { char: '咖', info: 'gia - cà phê' },
        { char: '啡', info: 'phi - cà phê' },
        { char: '啤', info: 'ti - bia' },
        { char: '响', info: 'hưởng - kêu vang' }
      ],
      traps: ['渴', '日', '目', '国', '园', '回', '困', '图', '四', '西', '晴', '睛', '白', '百', '甜', '知']
    },
    {
      id: 'heart',
      radicalCode: '忄/心',
      title: 'Bộ Tâm 忄 / 心 (Trái Tim & Cảm Xúc)',
      hint: 'Tâm trạng, tình cảm, lo lắng, sợ hãi, quên, bận, giận...',
      targets: [
        { char: '情', info: 'tình - tình cảm' },
        { char: '忙', info: 'mang - bận rộn' },
        { char: '怕', info: 'phạ - sợ hãi' },
        { char: '忘', info: 'vong - quên' },
        { char: '想', info: 'tưởng - nhớ/nghĩ' },
        { char: '急', info: 'cấp - sốt ruột' },
        { char: '意', info: 'ý - ý nghĩa' },
        { char: '感', info: 'cảm - cảm thấy' },
        { char: '惯', info: 'quán - thói quen' },
        { char: '懂', info: 'đổng - hiểu' }
      ],
      traps: ['晴', '睛', '请', '清', '精', '亡', '木', '相', '音', '咸', '贯', '重', '跟', '很', '慢', '漫']
    },
    {
      id: 'cloth_spirit',
      radicalCode: '衤',
      title: 'Bộ Y 衤 (Quần Áo - Có 2 chấm bên phải)',
      hint: 'Cực dễ nhầm với Bộ Thị 礻 (Lễ nghi)! Bộ Y 衤 có thêm 1 nét phẩy nhỏ: quần, váy, áo sơ mi, chăn...',
      targets: [
        { char: '裤', info: 'khố - cái quần' },
        { char: '裙', info: 'quần - cái váy' },
        { char: '衬', info: 'sấn - áo sơ mi' },
        { char: '衫', info: 'sam - áo sơ mi' },
        { char: '被', info: 'bị - cái chăn/bị' },
        { char: '袜', info: 'mạt - đôi tất' }
      ],
      traps: ['礼', '祝', '视', '神', '福', '社', '祖', '补', '打', '把', '渴', '喝', '跟', '很', '根', '银']
    },
    {
      id: 'sun_eye',
      radicalCode: '日',
      title: 'Bộ Nhật 日 (Mặt Trời & Thời Gian - 1 nét ngang giữa)',
      hint: 'Phân biệt với Bộ Mục 目 (Con mắt có 2 nét ngang)! Chọn chữ có Bộ Nhật 日:',
      targets: [
        { char: '晴', info: 'tình - trời nắng' },
        { char: '明', info: 'minh - ngày mai/sáng' },
        { char: '早', info: 'tảo - buổi sáng sớm' },
        { char: '晚', info: 'vãn - buổi tối' },
        { char: '昨', info: 'tạc - hôm qua' },
        { char: '春', info: 'xuân - mùa xuân' },
        { char: '旧', info: 'cựu - cũ kỹ' },
        { char: '晒', info: 'sái - phơi nắng' }
      ],
      traps: ['睛', '眼', '睡', '看', '眉', '着', '真', '直', '目', '自', '白', '百', '月', '朋', '胖', '腿']
    },
    {
      id: 'foot_walk',
      radicalCode: '⻊/辶',
      title: 'Bộ Túc ⻊ & Bộ Sước 辶 (Đôi Chân & Bước Đi)',
      hint: 'Các chữ liên quan đến đi lại, chạy nhảy, theo sau, đường sá, gần, xa...',
      targets: [
        { char: '跟', info: 'cân - đi theo/cùng' },
        { char: '跑', info: 'bào - chạy' },
        { char: '踢', info: 'thích - đá bóng' },
        { char: '跳', info: 'khiêu - nhảy' },
        { char: '远', info: 'viễn - xa' },
        { char: '近', info: 'cận - gần' },
        { char: '送', info: 'tống - tiễn/tặng' },
        { char: '迟', info: 'trì - đến muộn' },
        { char: '过', info: 'quá - đi qua' },
        { char: '还', info: 'hoàn - trả lại/vẫn' }
      ],
      traps: ['很', '恨', '根', '银', '眼', '包', '易', '兆', '元', '斤', '关', '尺', '寸', '不', '打', '拿']
    }
  ];

  function stopTimers() {
    if (matrixTimerId) {
      clearInterval(matrixTimerId);
      matrixTimerId = null;
    }
    if (audioBlitzTimerId) {
      clearInterval(audioBlitzTimerId);
      audioBlitzTimerId = null;
    }
    if (sniperTimerId) {
      clearInterval(sniperTimerId);
      sniperTimerId = null;
    }
  }

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function getActivePool() {
    if (campaignActive && campaignWords.length > 0) {
      return campaignWords;
    }
    const settings = window.HSKStorage.getSettings();
    const list = window.HSKStorage.getVocabByLesson(settings.selectedLesson);
    return list.length >= 4 ? list : window.HSKStorage.getAllVocab();
  }

  /**
   * Score & Combo Handler with FEVER MODE (Combo >= 5 -> x2 Score!)
   */
  function registerComboHit(basePoints = 100) {
    combo++;
    maxCombo = Math.max(maxCombo, combo);
    const isFever = combo >= 5;
    const multiplier = isFever ? 2 : 1;
    const gained = (basePoints + combo * 15) * multiplier;
    score += gained;

    if (combo === 5 && window.HSKSound && window.HSKSound.playFever) {
      window.HSKSound.playFever();
    } else if (window.HSKSound) {
      window.HSKSound.playTing(combo);
    }

    updateHUD();
    return { gained, isFever };
  }

  function registerComboMiss() {
    combo = 0;
    if (window.HSKSound) window.HSKSound.playBuzz();
    updateHUD();
  }

  /**
   * 1-vs-1 Twin-Character Microscope Component ("Soi Kính Hiển Vi Cặp Chữ Dễ Nhầm")
   */
  function renderTwinDiffHTML(targetWord, pickedHanzi) {
    if (!targetWord || !pickedHanzi || targetWord.hanzi === pickedHanzi) return '';
    const diff = window.HSKStorage.lookupTwinDiff(targetWord, pickedHanzi);
    if (!diff) return '';

    return `
      <div class="p-4 rounded-2xl bg-slate-950/95 border-2 border-indigo-500/40 space-y-3 mt-2 shadow-xl">
        <div class="flex items-center justify-between border-b border-slate-800 pb-2">
          <span class="text-xs font-extrabold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            🔬 Soi Kính Hiển Vi Đối Kháng 1-vs-1 (Tại sao bạn bị lừa?)
          </span>
          <span class="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
            Đã lưu cặp nhầm lẫn vào QA
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- LEFT: TRUE TARGET -->
          <div class="p-3.5 rounded-xl bg-emerald-950/35 border border-emerald-500/50 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase">
                ✓ Chữ Đúng Cần Tìm
              </span>
              <span class="text-xs font-mono-code text-emerald-300 font-bold">${diff.target.pinyin}</span>
            </div>
            <div class="flex items-baseline gap-3 pt-1">
              <span class="font-hanzi-serif text-4xl font-bold text-white">${diff.target.hanzi}</span>
              <div>
                <div class="text-xs font-bold text-amber-300 uppercase">[${diff.target.hanViet}]</div>
                <div class="text-sm font-extrabold text-emerald-200">${diff.target.meaning}</div>
              </div>
            </div>
            <div class="text-xs text-indigo-200 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
              <strong class="text-amber-300">Bộ thủ cốt lõi:</strong> ${diff.target.radicals}
            </div>
            <div class="text-[11px] text-slate-300 leading-snug">
              💡 ${diff.target.mnemonic}
            </div>
          </div>

          <!-- RIGHT: IMPOSTOR CULPRIT -->
          <div class="p-3.5 rounded-xl bg-rose-950/35 border border-rose-500/50 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-extrabold uppercase">
                ❌ Kẻ Mạo Danh Bạn Bấm
              </span>
              <span class="text-xs font-mono-code text-rose-300 font-bold">${diff.culprit.pinyin}</span>
            </div>
            <div class="flex items-baseline gap-3 pt-1">
              <span class="font-hanzi-serif text-4xl font-bold text-rose-200">${diff.culprit.hanzi}</span>
              <div>
                <div class="text-xs font-bold text-amber-300/80 uppercase">[${diff.culprit.hanViet}]</div>
                <div class="text-sm font-extrabold text-rose-200">${diff.culprit.meaning}</div>
              </div>
            </div>
            <div class="text-xs text-rose-200 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
              <strong class="text-rose-400">Điểm khác biệt:</strong> ${diff.culprit.radicals}
            </div>
            <div class="text-[11px] text-slate-300 leading-snug">
              ⚠️ ${diff.culprit.mnemonic}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Distractor Generator Algorithm:
   * Prioritizes word.visualDistractors, then words sharing a character, then words sharing a radical or length.
   */
  function generateVisualDistractors(targetWord, count = 3) {
    const all = window.HSKStorage.getAllVocab();
    const chosen = new Set();
    chosen.add(targetWord.hanzi);

    const result = [];

    // 1. Explicit visualDistractors from schema
    if (Array.isArray(targetWord.visualDistractors)) {
      for (const d of shuffle(targetWord.visualDistractors)) {
        if (d && !chosen.has(d) && result.length < count) {
          chosen.add(d);
          result.push(d);
        }
      }
    }

    // 2. Scan database for words sharing at least 1 character
    if (result.length < count) {
      const targetChars = Array.from(targetWord.hanzi);
      const sharedCharWords = shuffle(
        all.filter(w => w.hanzi !== targetWord.hanzi && Array.from(w.hanzi).some(c => targetChars.includes(c)))
      );
      for (const w of sharedCharWords) {
        if (!chosen.has(w.hanzi) && result.length < count) {
          chosen.add(w.hanzi);
          result.push(w.hanzi);
        }
      }
    }

    // 3. Scan database for words sharing a radical
    if (result.length < count) {
      const targetRadicals = (targetWord.decomposition || []).map(d => d.radical.split(' ')[0]);
      const sharedRadicalWords = shuffle(
        all.filter(w =>
          w.hanzi !== targetWord.hanzi &&
          (w.decomposition || []).some(d => targetRadicals.includes(d.radical.split(' ')[0]))
        )
      );
      for (const w of sharedRadicalWords) {
        if (!chosen.has(w.hanzi) && result.length < count) {
          chosen.add(w.hanzi);
          result.push(w.hanzi);
        }
      }
    }

    // 4. Fallback: same character length
    if (result.length < count) {
      const sameLen = shuffle(all.filter(w => w.hanzi.length === targetWord.hanzi.length && !chosen.has(w.hanzi)));
      for (const w of sameLen) {
        if (!chosen.has(w.hanzi) && result.length < count) {
          chosen.add(w.hanzi);
          result.push(w.hanzi);
        }
      }
    }

    return result.slice(0, count);
  }

  /**
   * Generate 5 IME Candidates (1 correct + 4 homophones/visual traps) for Game 1
   */
  function generateIMECandidates(targetWord) {
    const chosen = new Set([targetWord.hanzi]);
    const distractors = [];

    if (Array.isArray(targetWord.homophones)) {
      for (const h of targetWord.homophones) {
        if (h && !chosen.has(h) && distractors.length < 4) {
          chosen.add(h);
          distractors.push(h);
        }
      }
    }

    const vis = generateVisualDistractors(targetWord, 4);
    for (const v of vis) {
      if (!chosen.has(v) && distractors.length < 4) {
        chosen.add(v);
        distractors.push(v);
      }
    }

    return shuffle([targetWord.hanzi, ...distractors.slice(0, 4)]);
  }

  /**
   * Switch or Initialize a Minigame
   */
  function startGame(gameId, isCampaign = false, customList = null) {
    stopTimers();
    bossState.active = (gameId === 'boss');
    activeGameId = gameId || 'game1';
    campaignActive = isCampaign;
    if (isCampaign && Array.isArray(customList) && customList.length > 0) {
      campaignWords = customList;
    } else if (!isCampaign) {
      campaignWords = [];
    }

    currentPool = shuffle(getActivePool());
    questionIndex = 0;
    gameLocked = false;

    // Update active tab styling
    document.querySelectorAll('[data-game-tab]').forEach(btn => {
      const gid = btn.getAttribute('data-game-tab');
      if (gid === activeGameId) {
        btn.className = gid === 'boss'
          ? 'px-3.5 py-2 rounded-xl font-extrabold text-xs sm:text-sm bg-rose-600 text-white shadow-lg shadow-rose-600/30 transition flex items-center gap-1.5'
          : 'px-3.5 py-2 rounded-xl font-semibold text-xs sm:text-sm bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 transition flex items-center gap-1.5';
      } else {
        btn.className = gid === 'boss'
          ? 'px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/40 transition flex items-center gap-1.5'
          : 'px-3.5 py-2 rounded-xl font-medium text-xs sm:text-sm bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60 transition flex items-center gap-1.5';
      }
    });

    updateHUD();

    if (activeGameId === 'game5') {
      initGame5Matrix();
    } else if (activeGameId === 'game7') {
      initGame7Sniper();
    } else if (activeGameId === 'boss') {
      const settings = window.HSKStorage.getSettings();
      initBossBattle(settings.selectedLesson, customList);
    } else {
      loadNextQuestion();
    }
  }

  function startBossBattle(lessonKey = null, customList = null) {
    if (lessonKey) {
      window.HSKStorage.saveSettings({ selectedLesson: String(lessonKey) });
      const selectEl = document.getElementById('global-lesson-select');
      if (selectEl) selectEl.value = String(lessonKey);
    }
    startGame('boss', false, customList);
  }

  function updateHUD() {
    const scoreEl = document.getElementById('game-hud-score');
    const comboEl = document.getElementById('game-hud-combo');
    const streakEl = document.getElementById('game-hud-streak');
    const modeEl = document.getElementById('game-hud-mode');
    const stageEl = document.getElementById('game-stage-container');

    if (scoreEl) scoreEl.textContent = score;
    if (comboEl) {
      if (combo >= 5) {
        comboEl.innerHTML = `🔥x${combo} <span class="text-xs bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/50">FEVER x2</span>`;
        comboEl.className = 'text-lg font-extrabold text-amber-400 animate-pulse';
      } else {
        comboEl.textContent = `x${combo}`;
        comboEl.className = combo >= 3
          ? 'text-lg font-extrabold text-amber-400'
          : 'text-lg font-bold text-indigo-400';
      }
    }
    if (stageEl) {
      stageEl.classList.toggle('fever-mode-stage', combo >= 5);
    }
    if (streakEl) streakEl.textContent = maxCombo;
    if (modeEl) {
      if (bossState.active) {
        modeEl.innerHTML = `<span class="px-2.5 py-1 rounded-full bg-rose-500/25 border border-rose-500/50 text-rose-200 text-xs font-extrabold">🐉 Đấu Boss Sinh Tồn</span>`;
      } else if (campaignActive) {
        modeEl.innerHTML = `<span class="px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">🎯 Chiến Dịch Đặc Trị (${campaignWords.length} từ)</span>`;
      } else {
        const s = window.HSKStorage.getSettings();
        const label = s.selectedLesson === 'all' ? 'Toàn bộ Bài 1-20' : s.selectedLesson === 'drill' ? 'Sổ Thù Vặt' : `Bài ${s.selectedLesson}`;
        modeEl.innerHTML = `<span class="px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">📚 ${label}</span>`;
      }
    }
  }

  function loadNextQuestion() {
    stopTimers();
    gameLocked = false;
    gamePinyinRevealed = false;

    if (bossState.active) {
      loadNextBossTurn();
      return;
    }

    if (!currentPool.length) {
      currentPool = shuffle(getActivePool());
    }
    if (questionIndex >= currentPool.length) {
      if (campaignActive) {
        advanceCampaignStage();
        return;
      }
      currentPool = shuffle(getActivePool());
      questionIndex = 0;
    }

    currentWord = currentPool[questionIndex];
    questionIndex++;

    if (activeGameId === 'game1') {
      renderGame1IME();
    } else if (activeGameId === 'game2') {
      renderGame2Lego();
    } else if (activeGameId === 'game3') {
      renderGame3Radar();
    } else if (activeGameId === 'game4') {
      renderGame4Cloze();
    } else if (activeGameId === 'game6') {
      renderGame6AudioBlitz();
    } else if (activeGameId === 'game8') {
      renderGame8Jumble();
    }
  }

  function advanceCampaignStage() {
    if (window.HSKSound) window.HSKSound.playVictory();
    const stageEl = document.getElementById('game-stage-container');
    if (!stageEl) return;

    const remaining = window.HSKStorage.getTargetedDrillWords();
    if (activeGameId === 'game1') {
      stageEl.innerHTML = `
        <div class="p-8 text-center space-y-4">
          <div class="text-4xl">🔥</div>
          <h3 class="text-2xl font-bold text-white">Hoàn thành Chặng 1: Bộ Gõ Pinyin (IME)!</h3>
          <p class="text-slate-300 max-w-md mx-auto">Chuyển sang Chặng 2: <strong>Phẫu Thuật Chữ Hán (Character Lego)</strong> để rèn khả năng tách ghép từng chữ đơn.</p>
          <button id="btn-campaign-next-stage" class="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg transition">
            Tiếp tục Chặng 2: Phẫu Thuật Chữ Hán →
          </button>
        </div>
      `;
      document.getElementById('btn-campaign-next-stage').addEventListener('click', () => {
        startGame('game2', true, campaignWords);
      });
    } else if (activeGameId === 'game2') {
      stageEl.innerHTML = `
        <div class="p-8 text-center space-y-4">
          <div class="text-4xl">🎧</div>
          <h3 class="text-2xl font-bold text-white">Hoàn thành Chặng 2: Phẫu Thuật Chữ Hán!</h3>
          <p class="text-slate-300 max-w-md mx-auto">Chặng Cuối: <strong>Phản Xạ Bắt Âm – Chém Chữ (Audio Blitz 5 Giây)</strong> để khóa chặt liên kết Âm thanh → Mặt chữ.</p>
          <button id="btn-campaign-stage3" class="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg transition">
            Bắt đầu Chặng 3: Bắt Âm Chém Chữ →
          </button>
        </div>
      `;
      document.getElementById('btn-campaign-stage3').addEventListener('click', () => {
        startGame('game6', true, campaignWords);
      });
    } else {
      campaignActive = false;
      stageEl.innerHTML = `
        <div class="p-8 text-center space-y-4">
          <div class="text-5xl">🏆</div>
          <h3 class="text-2xl font-extrabold text-emerald-400">Chiến Dịch Đặc Trị 3 Chặng Hoàn Tất!</h3>
          <p class="text-slate-300 max-w-lg mx-auto">
            Bạn đã vượt qua toàn bộ bài kiểm tra mặt chữ nghiêm ngặt. Số từ còn trong Sổ Thù Vặt hiện tại: <strong>${remaining.length}</strong>.
          </p>
          <div class="flex items-center justify-center gap-3 pt-2">
            <button id="btn-campaign-finish-dash" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition">
              Xem Bảng Điều Khiển QA
            </button>
            <button id="btn-campaign-replay" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition">
              Đấu Boss Kiểm Tra Luôn 🐉
            </button>
          </div>
        </div>
      `;
      document.getElementById('btn-campaign-finish-dash').addEventListener('click', () => {
        if (window.HSKApp) window.HSKApp.switchTab('analytics');
      });
      document.getElementById('btn-campaign-replay').addEventListener('click', () => {
        startGame('boss', false);
      });
    }
  }

  // ============================================================================
  // GAME 1: "GIẢ LẬP BỘ GÕ PINYIN" (IME CANDIDATE TRAP)
  // ============================================================================
  function renderGame1IME() {
    imeStage = 'typing';
    imeCandidates = generateIMECandidates(currentWord);
    const stageEl = document.getElementById('game-stage-container');
    if (!stageEl) return;

    const decompHint = (currentWord.decomposition || [])
      .map(d => `<span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs border border-slate-700">Bộ thủ gợi ý: ${d.radical}</span>`)
      .join(' ');

    stageEl.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-6">
        <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
          <span>⌨️ <strong>GAME 1: GIẢ LẬP BỘ GÕ PINYIN (SOGOU/macOS IME TRAP)</strong></span>
          <span>Bài ${currentWord.lesson}: ${currentWord.lessonTitle}</span>
        </div>

        <!-- Meaning & Audio Prompt -->
        <div class="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <span>Từ loại: ${currentWord.wordType || 'v/n'}</span>
            <span>•</span>
            <span>Số chữ Hán: ${currentWord.hanzi.length} chữ</span>
          </div>
          <h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">${currentWord.meaning}</h3>
          <div class="game-rescue-pinyin hidden text-sm font-mono-code text-amber-300 font-bold bg-amber-500/10 py-1 px-3 rounded-xl border border-amber-500/30 inline-block">
            🆘 Pinyin: ${window.HSKSound.renderColoredPinyin(currentWord.pinyin, currentWord)} (Gõ: ${currentWord.pinyinClean})
          </div>
          <div class="flex items-center justify-center gap-2 flex-wrap pt-1">
            ${decompHint}
            <button type="button" id="btn-ime-audio" class="px-3 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition">
              🔊 Nghe âm đọc
            </button>
            ${renderPinyinRescueButtonHTML()}
          </div>
        </div>

        <!-- Step 1: Pinyin Input Field -->
        <div class="space-y-2">
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Bước 1: Gõ Pinyin không dấu (hoặc có dấu) rồi bấm Enter / Space:
          </label>
          <div class="relative flex items-center gap-2">
            <input
              type="text"
              id="ime-pinyin-input"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
              placeholder="Ví dụ: gõ '${currentWord.pinyinClean.slice(0, 2)}...' rồi nhấn Enter"
              class="w-full px-4 py-3.5 rounded-xl bg-slate-950 border-2 border-indigo-500/50 focus:border-indigo-400 focus:outline-none text-lg font-mono-code text-emerald-300 tracking-wider shadow-inner"
            />
            <button type="button" id="btn-ime-submit-pinyin" class="px-5 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm whitespace-nowrap transition">
              Gõ Xong ↵
            </button>
          </div>
          <div id="ime-step1-feedback" class="text-xs text-slate-400 min-h-[1.25rem]">
            💡 Mẹo: Bạn đã thuộc âm Pinyin, nhưng sau khi gõ đúng âm, <strong>Chốt chặn mặt chữ</strong> sẽ bật ra 5 chữ đồng âm/gần nét!
          </div>
        </div>

        <!-- Step 2: Sogou / macOS IME Candidate Bar (Hidden until Step 1 passed) -->
        <div id="ime-candidate-wrapper" class="hidden space-y-3 animate-success-pop">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-amber-400">
              🎯 Bước 2 (Chốt chặn mặt chữ): Bấm phím số [1] - [5] hoặc Click để chọn đúng chữ Hán!
            </span>
            <span class="text-xs text-slate-400 font-mono-code">IME: <span id="ime-typed-buffer" class="text-emerald-400 font-bold"></span></span>
          </div>

          <div id="ime-candidate-bar" class="ime-candidate-bar p-3.5 rounded-2xl grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            ${imeCandidates
              .map(
                (cand, idx) => `
              <button
                type="button"
                data-ime-cand="${cand}"
                data-ime-idx="${idx + 1}"
                class="group flex sm:flex-col items-center justify-between sm:justify-center gap-1.5 p-3 rounded-xl bg-slate-800/70 hover:bg-indigo-600/30 border border-slate-700/80 hover:border-indigo-400 transition text-left sm:text-center"
              >
                <span class="kbd-pill text-indigo-300 group-hover:bg-indigo-500 group-hover:text-white">${idx + 1}</span>
                <span class="font-hanzi-serif text-3xl sm:text-4xl font-bold text-white tracking-wide">${cand}</span>
                <span class="game-rescue-pinyin ${gamePinyinRevealed ? '' : 'hidden'} text-xs font-mono-code text-amber-300">${getPinyinForHanzi(cand)}</span>
              </button>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Post-Answer Orthographic Explanation Box -->
        <div id="ime-explanation-box" class="hidden p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-3"></div>
      </div>
    `;

    const inputEl = document.getElementById('ime-pinyin-input');
    const submitBtn = document.getElementById('btn-ime-submit-pinyin');
    const audioBtn = document.getElementById('btn-ime-audio');
    bindPinyinRescueButton();

    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        window.HSKSound.speak(currentWord.hanzi);
      });
    }

    function checkPinyinStep() {
      if (imeStage !== 'typing') return;
      const typed = window.HSKStorage.normalizePinyinClean(inputEl.value);
      const targetClean = window.HSKStorage.normalizePinyinClean(currentWord.pinyinClean || currentWord.pinyin);
      const fbEl = document.getElementById('ime-step1-feedback');

      if (!typed) {
        fbEl.innerHTML = `<span class="text-amber-400">Hãy gõ Pinyin của từ có nghĩa "${currentWord.meaning}"!</span>`;
        return;
      }

      if (typed === targetClean) {
        imeStage = 'candidates';
        if (window.HSKSound) window.HSKSound.playStrokeHit();
        inputEl.disabled = true;
        inputEl.classList.add('opacity-70');
        submitBtn.classList.add('hidden');
        fbEl.innerHTML = `<span class="text-emerald-400 font-semibold">✓ Đúng âm Pinyin (${currentWord.pinyin})! Bây giờ hãy nhìn kỹ cấu trúc bộ thủ để chọn đúng chữ Hán bên dưới (Phím 1-5):</span>`;

        const wrapper = document.getElementById('ime-candidate-wrapper');
        const buffer = document.getElementById('ime-typed-buffer');
        if (buffer) buffer.textContent = `${typed} (${currentWord.pinyin})`;
        if (wrapper) wrapper.classList.remove('hidden');
      } else {
        inputEl.classList.remove('animate-shake');
        void inputEl.offsetWidth;
        inputEl.classList.add('animate-shake');
        if (window.HSKSound) window.HSKSound.playBuzz();
        fbEl.innerHTML = `<span class="text-rose-400 font-semibold">❌ Pinyin chưa khớp! Gợi ý chữ cái đầu: <strong>${targetClean.slice(0, 2)}...</strong> (${targetClean.length} ký tự)</span>`;
      }
    }

    if (inputEl) {
      inputEl.focus();
      inputEl.addEventListener('input', () => {
        const typed = window.HSKStorage.normalizePinyinClean(inputEl.value);
        const targetClean = window.HSKStorage.normalizePinyinClean(currentWord.pinyinClean || currentWord.pinyin);
        if (typed === targetClean) {
          checkPinyinStep();
        }
      });
      inputEl.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          checkPinyinStep();
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', checkPinyinStep);
    }

    stageEl.querySelectorAll('[data-ime-cand]').forEach(btn => {
      btn.addEventListener('click', () => {
        const picked = btn.getAttribute('data-ime-cand');
        handleIMECandidatePick(picked, btn);
      });
    });
  }

  function handleIMECandidatePick(pickedHanzi, btnEl) {
    if (imeStage !== 'candidates' || gameLocked) return;
    gameLocked = true;
    imeStage = 'done';

    const expBox = document.getElementById('ime-explanation-box');
    const isCorrect = pickedHanzi === currentWord.hanzi;

    if (isCorrect) {
      registerComboHit(100);
      window.HSKStorage.recordSuccess(currentWord.id, 18);
      if (window.HSKSound) window.HSKSound.speak(currentWord.hanzi);
      if (btnEl) btnEl.classList.add('animate-success-pop', 'bg-emerald-600/40', 'border-emerald-400');
    } else {
      registerComboMiss();
      window.HSKStorage.recordMistake(currentWord.id, pickedHanzi);
      if (btnEl) btnEl.classList.add('animate-shake', 'bg-rose-600/40', 'border-rose-400');

      document.querySelectorAll('[data-ime-cand]').forEach(b => {
        if (b.getAttribute('data-ime-cand') === currentWord.hanzi) {
          b.classList.add('bg-emerald-600/30', 'border-emerald-400');
        }
      });
    }

    if (window.HSKApp && window.HSKApp.refreshHeaderStats) {
      window.HSKApp.refreshHeaderStats();
    }

    const decompHTML = (currentWord.decomposition || [])
      .map(
        d => `
        <div class="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-hanzi-serif text-xl font-bold text-white">${d.char}</span>
            <span class="text-indigo-400 font-semibold">${d.hanViet} (${d.pinyin})</span>
          </div>
          <div class="text-amber-300 font-medium">${d.radical}</div>
          <div class="text-slate-300">${d.mnemonic}</div>
        </div>`
      )
      .join('');

    const twinDiffHTML = !isCorrect ? renderTwinDiffHTML(currentWord, pickedHanzi) : '';

    if (expBox) {
      expBox.classList.remove('hidden');
      expBox.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div>
            ${
              isCorrect
                ? `<span class="text-emerald-400 font-bold">🎉 Chính xác! Bạn đã vượt qua bẫy bộ gõ Pinyin!</span>`
                : `<span class="text-rose-400 font-bold">⚠️ Sập bẫy mặt chữ! Bạn chọn "${pickedHanzi}" thay vì "${currentWord.hanzi}" (Đã ghi vào Sổ Thù Vặt)</span>`
            }
          </div>
          <button type="button" id="btn-ime-next" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition whitespace-nowrap">
            Câu tiếp theo (Enter) →
          </button>
        </div>
        ${twinDiffHTML}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">${decompHTML}</div>
      `;
      document.getElementById('btn-ime-next').addEventListener('click', loadNextQuestion);
    }
  }

  // ============================================================================
  // GAME 2: "PHẪU THUẬT CHỮ HÁN" (CHARACTER LEGO / COMPONENT ASSEMBLY)
  // ============================================================================
  function renderGame2Lego() {
    const multiCharPool = currentPool.filter(w => w.hanzi.length >= 2);
    if (currentWord.hanzi.length < 2 && multiCharPool.length > 0) {
      currentWord = multiCharPool[questionIndex % multiCharPool.length];
    }

    legoTargetChars = Array.from(currentWord.hanzi);
    legoSelectedChars = [];

    const matrixSet = new Set(legoTargetChars);

    const distractorSources = [
      ...(currentWord.visualDistractors || []),
      ...(currentWord.homophones || [])
    ];
    distractorSources.forEach(wordStr => {
      Array.from(wordStr).forEach(ch => {
        if (/[\u4e00-\u9fa5]/.test(ch) && matrixSet.size < 12) {
          matrixSet.add(ch);
        }
      });
    });

    legoTargetChars.forEach(ch => {
      CONFUSABLE_CHAR_FAMILIES.forEach(fam => {
        if (fam.includes(ch)) {
          fam.forEach(fChar => {
            if (matrixSet.size < 12) matrixSet.add(fChar);
          });
        }
      });
    });

    const fallbackChars = shuffle(CONFUSABLE_CHAR_FAMILIES.flat());
    for (const ch of fallbackChars) {
      if (matrixSet.size >= 12) break;
      matrixSet.add(ch);
    }

    legoMatrix = shuffle(Array.from(matrixSet).slice(0, 12));

    const stageEl = document.getElementById('game-stage-container');
    if (!stageEl) return;

    if (window.HSKSound) {
      window.HSKSound.speak(currentWord.hanzi);
    }

    const radicalFormula = (currentWord.decomposition || [])
      .map((d, idx) => `<span class="px-2 py-0.5 rounded bg-slate-800 text-amber-300 text-xs border border-slate-700">Chữ #${idx + 1}: ${d.radical}</span>`)
      .join(' + ');

    stageEl.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-5">
        <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
          <span>🧩 <strong>GAME 2: PHẪU THUẬT CHỮ HÁN (LEGO 12 Ô • PHÍM TẮT 1-9, 0, -, =)</strong></span>
          <span>Trị bệnh: Nhìn cụm thì quen, tách chữ lẻ là mù</span>
        </div>

        <!-- Prompt -->
        <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-3">
          <div class="flex items-center justify-center gap-2 flex-wrap">
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              Ghép ${legoTargetChars.length} chữ Hán theo đúng thứ tự
            </span>
            <button type="button" id="btn-lego-audio" class="px-3 py-1 rounded-lg bg-indigo-600/25 hover:bg-indigo-600/40 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition">
              🔊 Nghe lại (Phím R)
            </button>
            ${renderPinyinRescueButtonHTML()}
          </div>
          <h3 class="text-2xl sm:text-3xl font-extrabold text-white">${currentWord.meaning}</h3>
          <div class="game-rescue-pinyin hidden text-base font-mono-code text-amber-300 font-bold">
            🆘 Pinyin: ${window.HSKSound.renderColoredPinyin(currentWord.pinyin, currentWord)}
          </div>
          <p class="text-xs text-slate-400">Hán Việt: <strong class="text-amber-300 uppercase">${currentWord.hanViet}</strong></p>
          <div class="flex items-center justify-center gap-1.5 flex-wrap pt-0.5">${radicalFormula}</div>

          <!-- Target Assembly Slots -->
          <div id="lego-slots-bar" class="flex items-center justify-center gap-3 pt-2">
            ${legoTargetChars
              .map(
                (_, idx) => `
              <div
                data-lego-slot="${idx}"
                class="w-20 h-20 rounded-2xl border-2 border-dashed border-indigo-500/50 bg-slate-950 flex flex-col items-center justify-center transition"
              >
                <span class="text-xs text-slate-500 font-mono-code">Chữ #${idx + 1}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- 12-Character Lookalike Matrix with Hotkey Badges -->
        <div class="grid grid-cols-4 sm:grid-cols-6 gap-2.5" id="lego-matrix-grid">
          ${legoMatrix
            .map(
              (ch, i) => `
            <button
              type="button"
              data-lego-char="${ch}"
              data-lego-idx="${i}"
              data-lego-key="${LEGO_HOTKEYS[i]}"
              class="relative h-20 rounded-2xl bg-slate-800/80 hover:bg-indigo-600/30 border border-slate-700 hover:border-indigo-400 flex flex-col items-center justify-center font-hanzi-serif text-3xl sm:text-4xl font-bold text-white transition shadow-sm group"
            >
              <span class="absolute top-1.5 left-1.5 kbd-pill text-[10px] text-slate-400 group-hover:text-white">${LEGO_HOTKEYS[i]}</span>
              <span>${ch}</span>
              <span class="game-rescue-pinyin hidden text-[11px] font-mono-code text-amber-300 leading-none mt-1 font-normal">${getPinyinForHanzi(ch)}</span>
            </button>
          `
            )
            .join('')}
        </div>

        <div id="lego-feedback-box" class="hidden p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-3"></div>
      </div>
    `;

    const audioBtn = document.getElementById('btn-lego-audio');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => window.HSKSound.speak(currentWord.hanzi));
    }
    bindPinyinRescueButton();

    stageEl.querySelectorAll('[data-lego-char]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (gameLocked || btn.disabled) return;
        const pickedChar = btn.getAttribute('data-lego-char');
        const nextSlotIdx = legoSelectedChars.length;
        const expectedChar = legoTargetChars[nextSlotIdx];

        if (pickedChar === expectedChar) {
          legoSelectedChars.push(pickedChar);
          btn.disabled = true;
          btn.classList.add('opacity-35', 'border-emerald-500', 'bg-emerald-900/20');
          if (window.HSKSound) window.HSKSound.playStrokeHit();

          const slotEl = stageEl.querySelector(`[data-lego-slot="${nextSlotIdx}"]`);
          if (slotEl) {
            slotEl.className = 'w-20 h-20 rounded-2xl border-2 border-emerald-400 bg-emerald-500/15 flex items-center justify-center font-hanzi-serif text-4xl font-bold text-white animate-success-pop';
            slotEl.textContent = pickedChar;
          }

          if (legoSelectedChars.length === legoTargetChars.length) {
            gameLocked = true;
            registerComboHit(120);
            window.HSKStorage.recordSuccess(currentWord.id, 20);
            if (window.HSKSound) {
              window.HSKSound.speak(currentWord.hanzi);
            }
            if (window.HSKApp && window.HSKApp.refreshHeaderStats) {
              window.HSKApp.refreshHeaderStats();
            }
            showLegoCompletion(true, null);
          }
        } else {
          registerComboMiss();
          btn.classList.remove('animate-shake');
          void btn.offsetWidth;
          btn.classList.add('animate-shake', 'border-rose-500', 'bg-rose-500/20');
          window.HSKStorage.recordMistake(currentWord.id, pickedChar);
          if (window.HSKApp && window.HSKApp.refreshHeaderStats) {
            window.HSKApp.refreshHeaderStats();
          }
          showLegoCompletion(false, pickedChar);
        }
      });
    });
  }

  function showLegoCompletion(isCompleteSuccess, wrongChar) {
    const fbBox = document.getElementById('lego-feedback-box');
    if (!fbBox) return;
    fbBox.classList.remove('hidden');

    if (!isCompleteSuccess) {
      const expected = legoTargetChars[legoSelectedChars.length];
      const decomp = (currentWord.decomposition || []).find(d => d.char === expected);
      const twinDiffHTML = renderTwinDiffHTML(
        {
          hanzi: expected,
          pinyin: decomp ? decomp.pinyin : currentWord.pinyin,
          hanViet: decomp ? decomp.hanViet : currentWord.hanViet,
          meaning: `Chữ #${legoSelectedChars.length + 1} của "${currentWord.hanzi}" (${currentWord.meaning})`,
          decomposition: decomp ? [decomp] : []
        },
        wrongChar
      );
      fbBox.innerHTML = `
        <div class="text-xs sm:text-sm text-rose-400 font-semibold">
          ⚠️ Nhầm chữ đơn! Bạn vừa bấm <strong>"${wrongChar}"</strong>, nhưng vị trí #${legoSelectedChars.length + 1} cần chữ <strong>"${expected}"</strong> có <strong>${decomp ? decomp.radical : 'bộ thủ chuẩn'}</strong>. Hãy nhìn bảng đối kháng dưới đây rồi bấm chọn lại:
        </div>
        ${twinDiffHTML}
      `;
      return;
    }

    const decompCards = (currentWord.decomposition || [])
      .map(
        d => `
      <div class="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs">
        <span class="font-hanzi-serif text-xl font-bold text-emerald-300 mr-1.5">${d.char}</span>
        <span class="font-semibold text-indigo-300">[${d.hanViet}]</span> •
        <span class="text-amber-300">${d.radical}</span>: ${d.mnemonic}
      </div>`
      )
      .join('');

    fbBox.innerHTML = `
      <div class="flex items-center justify-between pb-2 border-b border-slate-800">
        <span class="text-emerald-400 font-bold text-sm">🧩 Phẫu thuật thành công: ${currentWord.hanzi} (${currentWord.meaning})!</span>
        <button type="button" id="btn-lego-next" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition">
          Từ tiếp theo (Enter) →
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">${decompCards}</div>
    `;
    document.getElementById('btn-lego-next').addEventListener('click', loadNextQuestion);
  }

  // ============================================================================
  // GAME 3: "TÌM KẺ MẠO DANH" (VISUAL CONFUSION RADAR)
  // ============================================================================
  function renderGame3Radar() {
    const distractors = generateVisualDistractors(currentWord, 3);
    currentOptions = shuffle([currentWord.hanzi, ...distractors]);

    const stageEl = document.getElementById('game-stage-container');
    if (!stageEl) return;

    stageEl.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-6">
        <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
          <span>🕵️ <strong>GAME 3: TÌM KẺ MẠO DANH (VISUAL CONFUSION RADAR)</strong></span>
          <span>Phím tắt: Bấm [1] - [4] để chọn nhanh • [P] Cứu trợ Pinyin</span>
        </div>

        <div class="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-3">
          <div class="flex items-center justify-center gap-2 flex-wrap">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold border border-amber-500/30">
              Cảnh báo: 3 kẻ mạo danh có chung bộ thủ hoặc hình dáng cực giống!
            </span>
            <button type="button" id="btn-radar-audio" class="px-3 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/35 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition">
              🔊 Nghe Audio
            </button>
            ${renderPinyinRescueButtonHTML()}
          </div>
          <h3 class="text-2xl sm:text-3xl font-extrabold text-white">${currentWord.meaning}</h3>
          <div class="game-rescue-pinyin hidden text-base font-mono-code text-amber-300 font-bold">
            🆘 Pinyin cần tìm: ${window.HSKSound.renderColoredPinyin(currentWord.pinyin, currentWord)}
          </div>
          <p class="text-xs text-slate-400">Hán Việt: <span class="text-indigo-300 font-semibold uppercase">${currentWord.hanViet}</span> • Từ loại: ${currentWord.wordType}</p>
        </div>

        <div class="grid grid-cols-2 gap-3.5" id="radar-options-grid">
          ${currentOptions
            .map(
              (opt, idx) => `
            <button
              type="button"
              data-radar-opt="${opt}"
              data-radar-idx="${idx + 1}"
              class="group p-6 rounded-2xl bg-slate-800/75 hover:bg-indigo-600/25 border-2 border-slate-700/80 hover:border-indigo-400 transition flex items-center justify-between"
            >
              <span class="kbd-pill text-slate-300 group-hover:bg-indigo-500 group-hover:text-white">${idx + 1}</span>
              <div class="flex flex-col items-center mx-auto">
                <span class="font-hanzi-serif text-4xl sm:text-5xl font-bold text-white tracking-wider">${opt}</span>
                <span class="game-rescue-pinyin hidden text-xs font-mono-code text-amber-300 mt-1">${getPinyinForHanzi(opt)}</span>
              </div>
            </button>
          `
            )
            .join('')}
        </div>

        <div id="radar-feedback-box" class="hidden p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-3"></div>
      </div>
    `;

    const audioBtn = document.getElementById('btn-radar-audio');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => window.HSKSound.speak(currentWord.hanzi));
    }
    bindPinyinRescueButton();

    stageEl.querySelectorAll('[data-radar-opt]').forEach(btn => {
      btn.addEventListener('click', () => {
        handleRadarPick(btn.getAttribute('data-radar-opt'), btn);
      });
    });
  }

  function handleRadarPick(pickedHanzi, btnEl) {
    if (gameLocked) return;
    gameLocked = true;

    const isCorrect = pickedHanzi === currentWord.hanzi;
    const fbBox = document.getElementById('radar-feedback-box');

    if (isCorrect) {
      registerComboHit(100);
      window.HSKStorage.recordSuccess(currentWord.id, 16);
      if (window.HSKSound) {
        window.HSKSound.speak(currentWord.hanzi);
      }
      if (btnEl) btnEl.classList.add('animate-success-pop', 'bg-emerald-600/30', 'border-emerald-400');
    } else {
      registerComboMiss();
      window.HSKStorage.recordMistake(currentWord.id, pickedHanzi);
      if (btnEl) btnEl.classList.add('animate-shake', 'bg-rose-600/30', 'border-rose-400');

      document.querySelectorAll('[data-radar-opt]').forEach(b => {
        if (b.getAttribute('data-radar-opt') === currentWord.hanzi) {
          b.classList.add('bg-emerald-600/30', 'border-emerald-400');
        }
      });
    }

    if (window.HSKApp && window.HSKApp.refreshHeaderStats) {
      window.HSKApp.refreshHeaderStats();
    }

    const decompInfo = (currentWord.decomposition || [])
      .map(d => `<span class="text-emerald-300 font-bold">${d.char}</span> (${d.radical}: ${d.mnemonic})`)
      .join(' | ');

    const twinDiffHTML = !isCorrect ? renderTwinDiffHTML(currentWord, pickedHanzi) : '';

    if (fbBox) {
      fbBox.classList.remove('hidden');
      fbBox.innerHTML = `
        <div class="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div class="text-xs sm:text-sm font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}">
            ${
              isCorrect
                ? `🎯 Mắt đại bàng! Bạn đã nhận diện chuẩn "${currentWord.hanzi}"!`
                : `❌ Bị kẻ mạo danh "${pickedHanzi}" đánh lừa! Chữ đúng là "${currentWord.hanzi}".`
            }
          </div>
          <button type="button" id="btn-radar-next" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition whitespace-nowrap">
            Tiếp tục (Enter) →
          </button>
        </div>
        ${twinDiffHTML}
        <div class="text-xs text-slate-300 leading-relaxed">
          🔍 <strong>Phân tích chiết tự:</strong> ${decompInfo}
        </div>
      `;
      document.getElementById('btn-radar-next').addEventListener('click', loadNextQuestion);
    }
  }

  // ============================================================================
  // GAME 4: "ĐỌC HIỂU TRONG RỪNG CHỮ" (ZERO-PINYIN CONTEXT CLOZE)
  // ============================================================================
  function renderGame4Cloze() {
    clozeRescueShown = false;
    const distractors = generateVisualDistractors(currentWord, 3);
    currentOptions = shuffle([currentWord.hanzi, ...distractors]);

    const exHanzi = (currentWord.example && currentWord.example.hanzi) || `请记住${currentWord.hanzi}这个词。`;
    const exPinyin = (currentWord.example && currentWord.example.pinyin) || currentWord.pinyin;
    const maskedExPinyin = exPinyin.replace(new RegExp(currentWord.pinyin, 'i'), '[ ____ ]');
    const clozeSentence = exHanzi.includes(currentWord.hanzi)
      ? exHanzi.replace(currentWord.hanzi, `<span class="inline-block px-4 py-1 mx-1 rounded-xl bg-indigo-500/20 border-2 border-dashed border-indigo-400 text-indigo-300 font-mono-code text-xl">[ ____ ]</span>`)
      : `${exHanzi} <span class="inline-block px-4 py-1 mx-1 rounded-xl bg-indigo-500/20 border-2 border-dashed border-indigo-400 text-indigo-300 font-mono-code text-xl">[ ____ ]</span>`;

    const stageEl = document.getElementById('game-stage-container');
    if (!stageEl) return;

    stageEl.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-6">
        <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
          <span>🌲 <strong>GAME 4: ĐỌC HIỂU TRONG RỪNG CHỮ (ZERO-PINYIN CONTEXT CLOZE)</strong></span>
          <span class="text-rose-400 font-semibold">🚫 Mặc định ẩn Pinyin • Bấm [P] nếu thật sự cần</span>
        </div>

        <!-- Pure Hanzi Sentence Box -->
        <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-800 space-y-4 text-center">
          <div class="text-xs text-slate-400">Đọc các chữ Hán xung quanh trong câu để suy luận từ còn thiếu:</div>
          <div class="font-hanzi-serif text-3xl sm:text-4xl font-bold text-white leading-relaxed tracking-wide py-2">
            ${clozeSentence}
          </div>

          <div class="game-rescue-pinyin hidden text-sm font-mono-code text-amber-300 font-semibold bg-amber-500/10 py-1.5 px-3 rounded-xl border border-amber-500/30">
            🆘 Pinyin câu: ${maskedExPinyin} <span class="text-indigo-300 ml-2">(Từ cần điền: ${currentWord.pinyin})</span>
          </div>

          <div class="flex items-center justify-center gap-2.5 flex-wrap pt-1">
            <button type="button" id="btn-cloze-rescue" class="px-3.5 py-1.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/40 text-indigo-300 text-xs font-semibold transition">
              📖 Dịch nghĩa từng chữ trong câu
            </button>
            ${renderPinyinRescueButtonHTML()}
          </div>

          <!-- Character-by-character Rescue Gloss Panel -->
          <div id="cloze-rescue-panel" class="hidden pt-3 border-t border-slate-800 text-left space-y-2"></div>
        </div>

        <!-- 4 Hanzi Choices -->
        <div class="grid grid-cols-2 gap-3.5">
          ${currentOptions
            .map(
              (opt, idx) => `
            <button
              type="button"
              data-cloze-opt="${opt}"
              data-cloze-idx="${idx + 1}"
              class="group p-5 rounded-2xl bg-slate-800/75 hover:bg-indigo-600/25 border-2 border-slate-700/80 hover:border-indigo-400 transition flex items-center justify-between"
            >
              <span class="kbd-pill text-slate-300 group-hover:bg-indigo-500 group-hover:text-white">${idx + 1}</span>
              <div class="flex flex-col items-center mx-auto">
                <span class="font-hanzi-serif text-3xl sm:text-4xl font-bold text-white">${opt}</span>
                <span class="game-rescue-pinyin hidden text-xs font-mono-code text-amber-300 mt-1">${getPinyinForHanzi(opt)}</span>
              </div>
            </button>
          `
            )
            .join('')}
        </div>

        <div id="cloze-feedback-box" class="hidden p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-2"></div>
      </div>
    `;

    bindPinyinRescueButton();
    const rescueBtn = document.getElementById('btn-cloze-rescue');
    if (rescueBtn) {
      rescueBtn.addEventListener('click', () => {
        const panel = document.getElementById('cloze-rescue-panel');
        if (!panel) return;
        panel.classList.toggle('hidden');
        if (!clozeRescueShown) {
          clozeRescueShown = true;
          const maskedSentence = exHanzi.replace(currentWord.hanzi, '□');
          const glossMap = window.HSK3_CHAR_GLOSS || {};
          const tokensHTML = Array.from(maskedSentence)
            .filter(ch => ch.trim() !== '')
            .map(ch => {
              if (ch === '□') {
                return `<span class="px-2 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold">[Từ cần điền]</span>`;
              }
              if (/[，。？！、：“”]/u.test(ch)) {
                return '';
              }
              const gloss = glossMap[ch] || 'chữ HSK';
              return `
                <div class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs">
                  <span class="font-hanzi-serif text-base font-bold text-white">${ch}</span>
                  <span class="text-slate-300">= ${gloss}</span>
                </div>
              `;
            })
            .join('');

          panel.innerHTML = `
            <div class="text-xs text-amber-300 font-semibold mb-1">💡 Giải nghĩa từng chữ xung quanh & dịch câu:</div>
            <div class="flex flex-wrap gap-1.5">${tokensHTML}</div>
            <div class="text-xs text-slate-300 pt-1.5">👉 <strong>Nghĩa cả câu:</strong> "${currentWord.example ? currentWord.example.meaning : currentWord.meaning}"</div>
          `;
        }
      });
    }

    stageEl.querySelectorAll('[data-cloze-opt]').forEach(btn => {
      btn.addEventListener('click', () => {
        handleClozePick(btn.getAttribute('data-cloze-opt'), btn);
      });
    });
  }

  function handleClozePick(pickedHanzi, btnEl) {
    if (gameLocked) return;
    gameLocked = true;

    const isCorrect = pickedHanzi === currentWord.hanzi;
    const fbBox = document.getElementById('cloze-feedback-box');

    if (isCorrect) {
      registerComboHit(110);
      window.HSKStorage.recordSuccess(currentWord.id, 18);
      if (window.HSKSound) {
        window.HSKSound.speak(currentWord.example ? currentWord.example.hanzi : currentWord.hanzi);
      }
      if (btnEl) btnEl.classList.add('animate-success-pop', 'bg-emerald-600/30', 'border-emerald-400');
    } else {
      registerComboMiss();
      window.HSKStorage.recordMistake(currentWord.id, pickedHanzi);
      if (btnEl) btnEl.classList.add('animate-shake', 'bg-rose-600/30', 'border-rose-400');

      document.querySelectorAll('[data-cloze-opt]').forEach(b => {
        if (b.getAttribute('data-cloze-opt') === currentWord.hanzi) {
          b.classList.add('bg-emerald-600/30', 'border-emerald-400');
        }
      });
    }

    if (window.HSKApp && window.HSKApp.refreshHeaderStats) {
      window.HSKApp.refreshHeaderStats();
    }

    const twinDiffHTML = !isCorrect ? renderTwinDiffHTML(currentWord, pickedHanzi) : '';

    if (fbBox) {
      fbBox.classList.remove('hidden');
      fbBox.innerHTML = `
        <div class="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <span class="text-xs sm:text-sm font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}">
            ${isCorrect ? '🎉 Đọc hiểu ngữ cảnh xuất sắc!' : `❌ Điền sai! Từ đúng là "${currentWord.hanzi}" (${currentWord.meaning})`}
          </span>
          <button type="button" id="btn-cloze-next" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition">
            Câu tiếp theo (Enter) →
          </button>
        </div>
        ${twinDiffHTML}
        <div class="text-sm text-white font-hanzi-serif pt-1">${currentWord.example ? currentWord.example.hanzi : currentWord.hanzi}</div>
        <div class="text-xs text-slate-300">${currentWord.example ? currentWord.example.meaning : currentWord.meaning}</div>
      `;
      document.getElementById('btn-cloze-next').addEventListener('click', loadNextQuestion);
    }
  }

  // ============================================================================
  // GAME 5: "ĐẤU TRƯỜNG SINH TỒN 60 GIÂY" (4x4 MATRIX SPEED MATCH)
  // ============================================================================
  function initGame5Matrix() {
    stopTimers();
    gamePinyinRevealed = false;
    const pool = shuffle(getActivePool());
    const eightWords = pool.slice(0, 8);

    matrixCards = [];
    eightWords.forEach(w => {
      matrixCards.push({
        uid: `H_${w.id}`,
        wordId: w.id,
        type: 'hanzi',
        display: w.hanzi,
        pinyin: w.pinyin,
        sub: `Bài ${w.lesson}`,
        matched: false
      });

      if (matrixMode === 'radical') {
        const radText = (w.decomposition || []).map(d => d.radical.split(' ')[0]).join(' + ');
        matrixCards.push({
          uid: `M_${w.id}`,
          wordId: w.id,
          type: 'meaning',
          display: `Bộ: ${radText || 'HSK'}`,
          sub: `[${w.hanViet}] • ${w.meaning}`,
          matched: false
        });
      } else {
        matrixCards.push({
          uid: `M_${w.id}`,
          wordId: w.id,
          type: 'meaning',
          display: w.meaning,
          sub: `[${w.hanViet}]`,
          matched: false
        });
      }
    });

    matrixCards = shuffle(matrixCards);
    matrixFirstPick = null;
    matrixMatchedPairs = 0;
    matrixTimeLeft = 60;
    matrixMistakesThisRound = 0;

    renderGame5Board();

    matrixTimerId = setInterval(() => {
      matrixTimeLeft--;
      const timerEl = document.getElementById('matrix-timer-display');
      if (timerEl) {
        timerEl.textContent = `${Math.max(0, matrixTimeLeft)}s`;
        if (matrixTimeLeft <= 12) {
          timerEl.className = 'text-xl font-mono-code font-extrabold text-rose-400 animate-pulse';
        }
      }
      if (matrixTimeLeft <= 0) {
        stopTimers();
        finishGame5(false);
      }
    }, 1000);
  }

  function renderGame5Board() {
    const stageEl = document.getElementById('game-stage-container');
    if (!stageEl) return;

    stageEl.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-sm font-bold text-white">⚡ ĐẤU TRƯỜNG 60S (LƯỚI 4x4)</span>
            <button
              type="button"
              id="btn-matrix-toggle-mode"
              class="px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition"
            >
              ${matrixMode === 'meaning' ? '🔄 Chế độ: Ghép Chữ ↔ Nghĩa' : '🔬 Chế độ: Ghép Chữ ↔ Bộ Thủ'}
            </button>
            ${renderPinyinRescueButtonHTML()}
          </div>
          <div class="flex items-center gap-4">
            <div class="text-xs text-slate-400">Đã ghép: <strong id="matrix-pairs-count" class="text-emerald-400">${matrixMatchedPairs}/8</strong></div>
            <div class="flex items-center gap-1.5">
              <span class="text-xs text-slate-400">⏱️ Còn lại:</span>
              <span id="matrix-timer-display" class="text-xl font-mono-code font-extrabold text-emerald-400">${matrixTimeLeft}s</span>
              <span id="matrix-penalty-toast" class="hidden text-xs font-extrabold text-rose-400 animate-bounce">-2s PHẠT!</span>
            </div>
          </div>
        </div>

        <!-- 4x4 Matrix Grid with Keyboard Hotkeys -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3" id="matrix-grid-container">
          ${matrixCards
            .map(
              (card, idx) => `
            <button
              type="button"
              data-matrix-uid="${card.uid}"
              data-matrix-idx="${idx}"
              data-matrix-key="${MATRIX_HOTKEYS[idx]}"
              class="relative h-24 sm:h-28 p-3 rounded-2xl bg-slate-800/85 hover:bg-slate-800 border-2 border-slate-700/80 hover:border-indigo-400/70 transition flex flex-col items-center justify-center text-center select-none group"
            >
              <span class="absolute top-1.5 left-1.5 kbd-pill text-[10px] text-slate-400 group-hover:text-white">${MATRIX_HOTKEYS[idx]}</span>
              ${
                card.type === 'hanzi'
                  ? `<span class="font-hanzi-serif text-3xl sm:text-4xl font-bold text-white">${card.display}</span>
                     <span class="game-rescue-pinyin ${gamePinyinRevealed ? '' : 'hidden'} text-xs font-mono-code text-amber-300 font-bold mt-0.5">${card.pinyin || getPinyinForHanzi(card.display)}</span>
                     <span class="text-[11px] text-indigo-400 mt-0.5">Chữ Hán • ${card.sub}</span>`
                  : `<span class="text-sm sm:text-base font-bold text-emerald-200 line-clamp-2">${card.display}</span>
                     <span class="text-[11px] text-amber-300/90 mt-1 line-clamp-1">${card.sub}</span>`
              }
            </button>
          `
            )
            .join('')}
        </div>
      </div>
    `;

    bindPinyinRescueButton();
    const modeBtn = document.getElementById('btn-matrix-toggle-mode');
    if (modeBtn) {
      modeBtn.addEventListener('click', () => {
        matrixMode = matrixMode === 'meaning' ? 'radical' : 'meaning';
        initGame5Matrix();
      });
    }

    stageEl.querySelectorAll('[data-matrix-uid]').forEach(btn => {
      btn.addEventListener('click', () => {
        const uid = btn.getAttribute('data-matrix-uid');
        handleMatrixCardClick(uid, btn);
      });
    });
  }

  function handleMatrixCardClick(uid, btnEl) {
    if (matrixTimeLeft <= 0) return;
    const card = matrixCards.find(c => c.uid === uid);
    if (!card || card.matched) return;

    if (!matrixFirstPick) {
      matrixFirstPick = { card, btnEl };
      btnEl.classList.add('border-indigo-400', 'bg-indigo-600/25', 'scale-[1.02]');
      if (card.type === 'hanzi') {
        window.HSKSound.speak(card.display);
      }
      return;
    }

    if (matrixFirstPick.card.uid === card.uid) {
      matrixFirstPick.btnEl.classList.remove('border-indigo-400', 'bg-indigo-600/25', 'scale-[1.02]');
      matrixFirstPick = null;
      return;
    }

    const first = matrixFirstPick;
    matrixFirstPick = null;

    if (first.card.wordId === card.wordId && first.card.type !== card.type) {
      first.card.matched = true;
      card.matched = true;
      matrixMatchedPairs++;
      registerComboHit(80);
      window.HSKStorage.recordSuccess(card.wordId, 14);

      [first.btnEl, btnEl].forEach(b => {
        b.disabled = true;
        b.className = 'relative h-24 sm:h-28 p-3 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/40 opacity-35 flex flex-col items-center justify-center text-center scale-95 transition';
      });

      const countEl = document.getElementById('matrix-pairs-count');
      if (countEl) countEl.textContent = `${matrixMatchedPairs}/8`;

      if (matrixMatchedPairs === 8) {
        stopTimers();
        if (window.HSKSound) window.HSKSound.playVictory();
        finishGame5(true);
      }
    } else {
      registerComboMiss();
      matrixMistakesThisRound++;
      matrixTimeLeft = Math.max(0, matrixTimeLeft - 2);

      window.HSKStorage.recordMistake(first.card.wordId);
      window.HSKStorage.recordMistake(card.wordId);

      const toast = document.getElementById('matrix-penalty-toast');
      const timerEl = document.getElementById('matrix-timer-display');
      if (timerEl) timerEl.textContent = `${matrixTimeLeft}s`;
      if (toast) {
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 900);
      }

      [first.btnEl, btnEl].forEach(b => {
        b.classList.remove('border-indigo-400', 'bg-indigo-600/25', 'scale-[1.02]');
        b.classList.add('animate-shake', 'border-rose-500');
        setTimeout(() => b.classList.remove('animate-shake', 'border-rose-500'), 450);
      });

      if (window.HSKApp && window.HSKApp.refreshHeaderStats) {
        window.HSKApp.refreshHeaderStats();
      }
    }
  }

  function finishGame5(won) {
    const stageEl = document.getElementById('game-stage-container');
    if (!stageEl) return;
    if (window.HSKApp && window.HSKApp.refreshHeaderStats) {
      window.HSKApp.refreshHeaderStats();
    }

    stageEl.innerHTML = `
      <div class="max-w-xl mx-auto p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
        <div class="text-5xl">${won ? '⚡🏆' : '⏰💥'}</div>
        <h3 class="text-2xl font-extrabold ${won ? 'text-emerald-400' : 'text-rose-400'}">
          ${won ? `Phá Đảo Lưới 4x4! (Còn dư ${matrixTimeLeft} giây)` : 'Hết Giờ Sinh Tồn!'}
        </h3>
        <p class="text-sm text-slate-300">
          Đã ghép đúng <strong>${matrixMatchedPairs}/8</strong> cặp • Số lần ghép sai bị phạt (-2s): <strong class="text-rose-400">${matrixMistakesThisRound}</strong>.
          ${matrixMistakesThisRound > 0 ? '<br/>Các cặp ghép nhầm đã được tự động ghi vào <strong>Sổ Thù Vặt (Targeted Drill)</strong>!' : ''}
        </p>
        <div class="flex items-center justify-center gap-3 pt-2">
          <button type="button" id="btn-matrix-again" class="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition">
            🔄 Ván mới 60 giây
          </button>
        </div>
      </div>
    `;
    document.getElementById('btn-matrix-again').addEventListener('click', initGame5Matrix);
  }

  // ============================================================================
  // GAME 6: "BẮT ÂM CHÉM CHỮ" (5-SECOND AUDIO BLITZ / 听音辨字)
  // ============================================================================
  function renderGame6AudioBlitz() {
    stopTimers();
    const distractors = [];
    const chosen = new Set([currentWord.hanzi]);

    if (Array.isArray(currentWord.homophones)) {
      for (const h of shuffle(currentWord.homophones)) {
        if (h && !chosen.has(h) && distractors.length < 2) {
          chosen.add(h);
          distractors.push(h);
        }
      }
    }
    for (const v of generateVisualDistractors(currentWord, 3)) {
      if (!chosen.has(v) && distractors.length < 3) {
        chosen.add(v);
        distractors.push(v);
      }
    }

    currentOptions = shuffle([currentWord.hanzi, ...distractors.slice(0, 3)]);
    audioBlitzTimeLeft = 5.0;

    const stageEl = document.getElementById('game-stage-container');
    if (!stageEl) return;

    if (window.HSKSound) {
      window.HSKSound.speak(currentWord.hanzi, 1.0);
    }

    stageEl.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-6">
        <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
          <span>🎧 <strong>GAME 6: PHẢN XẠ BẮT ÂM – CHÉM CHỮ (5-SECOND AUDIO BLITZ)</strong></span>
          <span class="text-amber-400 font-semibold">⚡ Tai nghe âm → Mắt bắt thẳng mặt chữ</span>
        </div>

        <!-- Zero-Text Audio Prompt + 5.0s Countdown Bar -->
        <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-800 text-center space-y-4">
          <div class="flex items-center justify-between text-xs">
            <span class="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 font-semibold">
              🚫 Đã ẩn Nghĩa Việt, Hán Việt & Pinyin
            </span>
            <span id="blitz-timer-text" class="font-mono-code text-base font-extrabold text-emerald-400">5.0s</span>
          </div>

          <!-- Progress Bar -->
          <div class="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div id="blitz-timer-bar" class="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 transition-all duration-100" style="width: 100%"></div>
          </div>

          <div class="py-2 flex flex-col items-center gap-3">
            <button
              type="button"
              id="btn-blitz-replay"
              class="w-20 h-20 rounded-full bg-indigo-600/25 hover:bg-indigo-600/40 border-2 border-indigo-400 text-3xl flex items-center justify-center shadow-lg shadow-indigo-500/20 transition hover:scale-105"
              title="Nghe lại âm thanh (Phím R)"
            >
              🔊
            </button>
            <div class="game-rescue-pinyin hidden text-sm font-mono-code text-amber-300 font-bold bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/30">
              🆘 Pinyin: ${window.HSKSound.renderColoredPinyin(currentWord.pinyin, currentWord)} • Nghĩa: ${currentWord.meaning} (+2.5s cứu trợ)
            </div>
            <div class="flex items-center justify-center gap-2 flex-wrap">
              <span class="text-xs text-slate-300">
                Nghe kỹ phát âm và chọn đúng mặt chữ Hán trong <strong>5 giây</strong>! (Bấm <kbd class="kbd-pill">R</kbd> nghe lại)
              </span>
              ${renderPinyinRescueButtonHTML()}
            </div>
          </div>
        </div>

        <!-- 4 Hanzi Options -->
        <div class="grid grid-cols-2 gap-3.5" id="blitz-options-grid">
          ${currentOptions
            .map(
              (opt, idx) => `
            <button
              type="button"
              data-blitz-opt="${opt}"
              data-blitz-idx="${idx + 1}"
              class="group p-6 rounded-2xl bg-slate-800/80 hover:bg-indigo-600/25 border-2 border-slate-700/80 hover:border-indigo-400 transition flex items-center justify-between"
            >
              <span class="kbd-pill text-slate-300 group-hover:bg-indigo-500 group-hover:text-white">${idx + 1}</span>
              <div class="flex flex-col items-center mx-auto">
                <span class="font-hanzi-serif text-4xl sm:text-5xl font-bold text-white tracking-wider">${opt}</span>
                <span class="game-rescue-pinyin hidden text-xs font-mono-code text-amber-300 mt-1">${getPinyinForHanzi(opt)}</span>
              </div>
            </button>
          `
            )
            .join('')}
        </div>

        <div id="blitz-feedback-box" class="hidden p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-3"></div>
      </div>
    `;

    bindPinyinRescueButton();
    const replayBtn = document.getElementById('btn-blitz-replay');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        window.HSKSound.speak(currentWord.hanzi, 0.95);
      });
    }

    stageEl.querySelectorAll('[data-blitz-opt]').forEach(btn => {
      btn.addEventListener('click', () => {
        handleAudioBlitzPick(btn.getAttribute('data-blitz-opt'), btn);
      });
    });

    audioBlitzTimerId = setInterval(() => {
      if (gameLocked) {
        clearInterval(audioBlitzTimerId);
        return;
      }
      audioBlitzTimeLeft = Math.max(0, +(audioBlitzTimeLeft - 0.1).toFixed(1));
      const textEl = document.getElementById('blitz-timer-text');
      const barEl = document.getElementById('blitz-timer-bar');
      if (textEl) {
        textEl.textContent = `${audioBlitzTimeLeft.toFixed(1)}s`;
        if (audioBlitzTimeLeft <= 1.8) {
          textEl.className = 'font-mono-code text-base font-extrabold text-rose-400 animate-pulse';
        }
      }
      if (barEl) {
        barEl.style.width = `${(audioBlitzTimeLeft / 5.0) * 100}%`;
      }
      if (audioBlitzTimeLeft <= 0) {
        clearInterval(audioBlitzTimerId);
        audioBlitzTimerId = null;
        handleAudioBlitzPick('__TIMEOUT__', null);
      }
    }, 100);
  }

  function handleAudioBlitzPick(pickedHanzi, btnEl) {
    if (gameLocked) return;
    gameLocked = true;
    stopTimers();

    const isTimeout = pickedHanzi === '__TIMEOUT__';
    const isCorrect = !isTimeout && pickedHanzi === currentWord.hanzi;
    const fbBox = document.getElementById('blitz-feedback-box');

    if (isCorrect) {
      const speedBonus = Math.round(audioBlitzTimeLeft * 15);
      registerComboHit(110 + speedBonus);
      window.HSKStorage.recordSuccess(currentWord.id, 18);
      if (window.HSKSound) window.HSKSound.speak(currentWord.hanzi);
      if (btnEl) btnEl.classList.add('animate-success-pop', 'bg-emerald-600/30', 'border-emerald-400');
    } else {
      registerComboMiss();
      window.HSKStorage.recordMistake(currentWord.id, isTimeout ? null : pickedHanzi);
      if (btnEl) btnEl.classList.add('animate-shake', 'bg-rose-600/30', 'border-rose-400');

      document.querySelectorAll('[data-blitz-opt]').forEach(b => {
        if (b.getAttribute('data-blitz-opt') === currentWord.hanzi) {
          b.classList.add('bg-emerald-600/30', 'border-emerald-400');
        }
      });
    }

    if (window.HSKApp && window.HSKApp.refreshHeaderStats) {
      window.HSKApp.refreshHeaderStats();
    }

    const twinDiffHTML = (!isCorrect && !isTimeout) ? renderTwinDiffHTML(currentWord, pickedHanzi) : '';

    if (fbBox) {
      fbBox.classList.remove('hidden');
      fbBox.innerHTML = `
        <div class="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div class="text-xs sm:text-sm font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}">
            ${
              isCorrect
                ? `⚡ Phản xạ thần tốc! "${currentWord.hanzi}" = ${currentWord.meaning} [${currentWord.hanViet}]`
                : isTimeout
                ? `⏰ Quá 5 giây! Đáp án là "${currentWord.hanzi}" (${currentWord.meaning})`
                : `❌ Nghe âm chọn nhầm chữ "${pickedHanzi}"! Đáp án đúng là "${currentWord.hanzi}" (${currentWord.meaning})`
            }
          </div>
          <button type="button" id="btn-blitz-next" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition whitespace-nowrap">
            Tiếp theo (Enter) →
          </button>
        </div>
        ${twinDiffHTML}
      `;
      document.getElementById('btn-blitz-next').addEventListener('click', loadNextQuestion);
    }
  }

  // ============================================================================
  // GAME 7: "XẠ THỦ BỘ THỦ" (RADICAL SNIPER / ĐẬP CHUỘT BỘ THỦ)
  // ============================================================================
  function initGame7Sniper() {
    stopTimers();
    sniperTimeLeft = 25;
    sniperWave = 1;
    spawnSniperWave();

    sniperTimerId = setInterval(() => {
      sniperTimeLeft--;
      const timerEl = document.getElementById('sniper-timer-display');
      if (timerEl) {
        timerEl.textContent = `${Math.max(0, sniperTimeLeft)}s`;
        if (sniperTimeLeft <= 8) {
          timerEl.className = 'text-xl font-mono-code font-extrabold text-rose-400 animate-pulse';
        }
      }
      if (sniperTimeLeft <= 0) {
        stopTimers();
        finishGame7Sniper();
      }
    }, 1000);
  }

  function spawnSniperWave() {
    gamePinyinRevealed = false;
    sniperMission = RADICAL_MISSIONS[(sniperWave - 1 + Math.floor(Math.random() * RADICAL_MISSIONS.length)) % RADICAL_MISSIONS.length];
    const targetPicks = shuffle(sniperMission.targets).slice(0, 6);
    const trapPicks = shuffle(sniperMission.traps).slice(0, 10);

    sniperRemainingTargets = targetPicks.length;
    sniperBoard = shuffle([
      ...targetPicks.map(t => ({ char: t.char, info: t.info, isTarget: true, hit: false })),
      ...trapPicks.map(ch => ({ char: ch, info: 'Bẫy khác bộ thủ!', isTarget: false, hit: false }))
    ]);

    renderGame7SniperBoard();
  }

  function renderGame7SniperBoard() {
    const stageEl = document.getElementById('game-stage-container');
    if (!stageEl || !sniperMission) return;

    stageEl.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 bg-slate-900/95 p-4 rounded-2xl border border-slate-800">
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-extrabold border border-indigo-500/30">
                Đợt (Wave) #${sniperWave}
              </span>
              <span class="text-xs text-slate-400">Còn lại trên bảng: <strong id="sniper-targets-left" class="text-emerald-400">${sniperRemainingTargets}</strong> chữ</span>
              ${renderPinyinRescueButtonHTML()}
            </div>
            <h3 class="text-lg sm:text-xl font-extrabold text-amber-300 mt-1">
              🔫 Nhiệm vụ: Bắn hạ mọi chữ có <span class="underline decoration-indigo-400 text-white">${sniperMission.title}</span>
            </h3>
            <p class="text-xs text-slate-400">${sniperMission.hint}</p>
          </div>

          <div class="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
            <span class="text-xs text-slate-400">⏱️ Thời gian:</span>
            <span id="sniper-timer-display" class="text-xl font-mono-code font-extrabold text-emerald-400">${sniperTimeLeft}s</span>
          </div>
        </div>

        <!-- 4x4 Radical Sniper Grid -->
        <div class="grid grid-cols-4 gap-3" id="sniper-grid">
          ${sniperBoard
            .map(
              (tile, idx) => `
            <button
              type="button"
              data-sniper-idx="${idx}"
              class="h-24 rounded-2xl bg-slate-800/85 hover:bg-indigo-600/25 border-2 border-slate-700/80 hover:border-indigo-400 transition flex flex-col items-center justify-center cursor-crosshair select-none"
            >
              <span class="font-hanzi-serif text-4xl font-bold text-white">${tile.char}</span>
              <span class="game-rescue-pinyin ${gamePinyinRevealed ? '' : 'hidden'} text-xs font-mono-code text-amber-300 font-bold leading-none mt-0.5">${getPinyinForHanzi(tile.char)}</span>
              <span class="sniper-sub text-[11px] text-slate-400 mt-1">🎯 Ngắm bắn</span>
            </button>
          `
            )
            .join('')}
        </div>
      </div>
    `;

    bindPinyinRescueButton();
    stageEl.querySelectorAll('[data-sniper-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-sniper-idx'), 10);
        handleSniperTileClick(idx, btn);
      });
    });
  }

  function handleSniperTileClick(idx, btnEl) {
    if (sniperTimeLeft <= 0) return;
    const tile = sniperBoard[idx];
    if (!tile || tile.hit) return;
    tile.hit = true;

    const subEl = btnEl.querySelector('.sniper-sub');

    if (tile.isTarget) {
      sniperRemainingTargets--;
      sniperTimeLeft = Math.min(45, sniperTimeLeft + 1);
      if (window.HSKSound && window.HSKSound.playSniperShot) {
        window.HSKSound.playSniperShot();
      }
      registerComboHit(65);
      window.HSKSound.speak(tile.char);

      btnEl.disabled = true;
      btnEl.className = 'h-24 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex flex-col items-center justify-center animate-success-pop';
      if (subEl) {
        subEl.textContent = `✓ ${tile.info} (+1s)`;
        subEl.className = 'sniper-sub text-[11px] text-emerald-300 font-bold mt-1';
      }

      const leftEl = document.getElementById('sniper-targets-left');
      if (leftEl) leftEl.textContent = sniperRemainingTargets;
      const timerEl = document.getElementById('sniper-timer-display');
      if (timerEl) timerEl.textContent = `${sniperTimeLeft}s`;

      if (sniperRemainingTargets === 0) {
        sniperWave++;
        sniperTimeLeft = Math.min(45, sniperTimeLeft + 4);
        if (window.HSKSound) window.HSKSound.playVictory();
        setTimeout(() => {
          if (sniperTimeLeft > 0 && activeGameId === 'game7') {
            spawnSniperWave();
          }
        }, 550);
      }
    } else {
      sniperTimeLeft = Math.max(0, sniperTimeLeft - 2);
      registerComboMiss();
      btnEl.className = 'h-24 rounded-2xl bg-rose-500/25 border-2 border-rose-500 flex flex-col items-center justify-center animate-shake';
      if (subEl) {
        subEl.textContent = `💥 Bẫy khác bộ! (-2s)`;
        subEl.className = 'sniper-sub text-[11px] text-rose-300 font-bold mt-1';
      }
      const timerEl = document.getElementById('sniper-timer-display');
      if (timerEl) timerEl.textContent = `${sniperTimeLeft}s`;
    }
  }

  function finishGame7Sniper() {
    const stageEl = document.getElementById('game-stage-container');
    if (!stageEl) return;
    stageEl.innerHTML = `
      <div class="max-w-xl mx-auto p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
        <div class="text-5xl">🔫🏅</div>
        <h3 class="text-2xl font-extrabold text-emerald-400">Kết Thúc Ca Gác Bộ Thủ!</h3>
        <p class="text-sm text-slate-300">
          Bạn đã càn quét đến <strong>Đợt (Wave) #${sniperWave}</strong> • Tổng điểm: <strong class="text-emerald-400">${score}</strong> • Kỷ lục Combo: <strong class="text-amber-400">x${maxCombo}</strong>
        </p>
        <button type="button" id="btn-sniper-again" class="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition">
          🔄 Bắn tiếp ván mới
        </button>
      </div>
    `;
    document.getElementById('btn-sniper-again').addEventListener('click', initGame7Sniper);
  }

  // ============================================================================
  // GAME 8: "XẾP TOA TÀU NGỮ PHÁP" (SENTENCE JUMBLE / 連詞成句 - HSK 3 WRITING PART 1)
  // ============================================================================
  function renderGame8Jumble() {
    const curated = window.HSK3_SENTENCE_JUMBLE || [];
    const s = window.HSKStorage.getSettings();
    let pool = curated;

    if (s.selectedLesson !== 'all' && s.selectedLesson !== 'drill') {
      const lessonNum = parseInt(s.selectedLesson, 10);
      const lessonMatches = curated.filter(item => item.lesson === lessonNum);
      if (lessonMatches.length > 0) {
        pool = lessonMatches;
      }
    }

    if (pool.length > 0) {
      jumbleItem = pool[(questionIndex - 1) % pool.length];
    } else {
      jumbleItem = curated[0];
    }

    jumblePoolChunks = shuffle(
      jumbleItem.chunks.map((text, idx) => ({
        id: idx,
        text,
        used: false
      }))
    );
    jumbleSelectedOrder = [];

    paintGame8JumbleStage();
  }

  function paintGame8JumbleStage() {
    const stageEl = document.getElementById('game-stage-container');
    if (!stageEl || !jumbleItem) return;

    const assembledSlotsHTML = jumbleItem.chunks
      .map((_, slotIdx) => {
        const chunkIdx = jumbleSelectedOrder[slotIdx];
        const chunkObj = chunkIdx !== undefined ? jumblePoolChunks[chunkIdx] : null;
        if (chunkObj) {
          return `
            <button
              type="button"
              data-jumble-remove="${slotIdx}"
              class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-rose-600 text-white shadow-md transition flex flex-col items-center"
              title="Bấm để gỡ toa tàu này"
            >
              <span class="font-hanzi-serif text-2xl font-bold">${chunkObj.text}</span>
              <span class="game-rescue-pinyin ${gamePinyinRevealed ? '' : 'hidden'} text-[11px] font-mono-code text-amber-200">${getPinyinForHanzi(chunkObj.text)}</span>
            </button>
          `;
        }
        return `
          <div class="px-5 py-2.5 rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/60 text-slate-500 text-xs font-mono-code">
            Toa #${slotIdx + 1}
          </div>
        `;
      })
      .join('');

    const poolButtonsHTML = jumblePoolChunks
      .map(
        (chunk, idx) => `
        <button
          type="button"
          data-jumble-pick="${idx}"
          ${chunk.used ? 'disabled' : ''}
          class="px-4 py-3 rounded-2xl border-2 transition flex items-center gap-2 ${
            chunk.used
              ? 'bg-slate-900/40 border-slate-800 opacity-30 cursor-not-allowed'
              : 'bg-slate-800/90 hover:bg-indigo-600/30 border-slate-700 hover:border-indigo-400 text-white'
          }"
        >
          <span class="kbd-pill text-indigo-300">${idx + 1}</span>
          <div class="flex flex-col items-center">
            <span class="font-hanzi-serif text-2xl sm:text-3xl font-bold">${chunk.text}</span>
            <span class="game-rescue-pinyin ${gamePinyinRevealed ? '' : 'hidden'} text-xs font-mono-code text-amber-300">${getPinyinForHanzi(chunk.text)}</span>
          </div>
        </button>
      `
      )
      .join('');

    stageEl.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6">
        <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
          <span>🚂 <strong>GAME 8: XẾP TOA TÀU NGỮ PHÁP (連詞成句 • ĐỀ VIẾT HSK 3 PHẦN 1)</strong></span>
          <span>Phím tắt: [1]-[${jumblePoolChunks.length}] nối toa • [Backspace] gỡ • [P] Pinyin</span>
        </div>

        <div class="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              Bài ${jumbleItem.lesson} • Sắp xếp các mảnh chữ Hán thành câu đúng ngữ pháp
            </span>
            <div class="flex items-center gap-2.5 flex-wrap">
              ${renderPinyinRescueButtonHTML()}
              <button type="button" id="btn-jumble-reset" class="text-xs text-slate-400 hover:text-white underline">
                ↺ Xếp lại từ đầu
              </button>
            </div>
          </div>

          <!-- Hint Meaning -->
          <div class="text-sm text-amber-300 font-medium">
            💡 Nghĩa câu cần ghép: <strong>"${jumbleItem.meaning}"</strong>
          </div>

          <div class="game-rescue-pinyin ${gamePinyinRevealed ? '' : 'hidden'} text-xs font-mono-code text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
            🆘 Pinyin cả câu: <strong>${jumbleItem.pinyin}</strong>
          </div>

          <!-- Railway Track Assembly Zone -->
          <div class="p-4 rounded-2xl bg-slate-950 border-2 border-indigo-500/30 min-h-[76px] flex flex-wrap items-center gap-2.5">
            <span class="text-xl mr-1">🚂</span>
            ${assembledSlotsHTML}
          </div>
        </div>

        <!-- Shuffled Word Cars -->
        <div class="flex flex-wrap items-center justify-center gap-3">
          ${poolButtonsHTML}
        </div>

        <div id="jumble-feedback-box" class="hidden p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-2"></div>
      </div>
    `;

    bindPinyinRescueButton();
    const resetBtn = document.getElementById('btn-jumble-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (gameLocked) return;
        jumblePoolChunks.forEach(c => { c.used = false; });
        jumbleSelectedOrder = [];
        paintGame8JumbleStage();
      });
    }

    stageEl.querySelectorAll('[data-jumble-pick]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (gameLocked) return;
        const idx = parseInt(btn.getAttribute('data-jumble-pick'), 10);
        pickJumbleChunk(idx);
      });
    });

    stageEl.querySelectorAll('[data-jumble-remove]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (gameLocked) return;
        const slotIdx = parseInt(btn.getAttribute('data-jumble-remove'), 10);
        removeJumbleChunkAt(slotIdx);
      });
    });
  }

  function pickJumbleChunk(poolIdx) {
    const chunk = jumblePoolChunks[poolIdx];
    if (!chunk || chunk.used || gameLocked) return;
    chunk.used = true;
    jumbleSelectedOrder.push(poolIdx);
    if (window.HSKSound) window.HSKSound.playStrokeHit();

    paintGame8JumbleStage();

    if (jumbleSelectedOrder.length === jumblePoolChunks.length) {
      verifyJumbleSentence();
    }
  }

  function removeJumbleChunkAt(slotIdx) {
    if (gameLocked || slotIdx < 0 || slotIdx >= jumbleSelectedOrder.length) return;
    const poolIdx = jumbleSelectedOrder[slotIdx];
    if (jumblePoolChunks[poolIdx]) {
      jumblePoolChunks[poolIdx].used = false;
    }
    jumbleSelectedOrder.splice(slotIdx, 1);
    paintGame8JumbleStage();
  }

  function verifyJumbleSentence() {
    const userSentence = jumbleSelectedOrder.map(i => jumblePoolChunks[i].text).join('');
    const cleanUser = userSentence.replace(/[，。？！、\s]/g, '');
    const validTargets = [jumbleItem.answer, ...(jumbleItem.altAnswers || [])].map(s => s.replace(/[，。？！、\s]/g, ''));

    const isCorrect = validTargets.includes(cleanUser);
    const fbBox = document.getElementById('jumble-feedback-box');

    if (isCorrect) {
      gameLocked = true;
      registerComboHit(140);
      if (window.HSKSound) {
        window.HSKSound.speak(jumbleItem.answer, 0.95);
      }
      if (fbBox) {
        fbBox.classList.remove('hidden');
        fbBox.innerHTML = `
          <div class="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <span class="text-emerald-400 font-bold text-sm">🎉 Ghép câu chuẩn ngữ pháp HSK 3!</span>
            <button type="button" id="btn-jumble-next" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition">
              Câu tiếp theo (Enter) →
            </button>
          </div>
          <div class="font-hanzi-serif text-2xl font-bold text-white pt-1">${jumbleItem.answer}。</div>
          <div class="text-xs font-mono-code text-indigo-300">${jumbleItem.pinyin}</div>
          <div class="text-xs text-amber-300 font-medium">📐 <strong>Điểm ngữ pháp:</strong> ${jumbleItem.grammar}</div>
        `;
        document.getElementById('btn-jumble-next').addEventListener('click', loadNextQuestion);
      }
    } else {
      registerComboMiss();
      if (fbBox) {
        fbBox.classList.remove('hidden');
        fbBox.innerHTML = `
          <div class="flex items-center justify-between gap-2">
            <span class="text-rose-400 font-bold text-xs sm:text-sm">
              ❌ Thứ tự từ chưa đúng ngữ pháp! Gợi ý cấu trúc: <strong>${jumbleItem.grammar}</strong>
            </span>
            <button type="button" id="btn-jumble-retry" class="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 text-xs font-bold transition">
              Xếp lại
            </button>
          </div>
        `;
        document.getElementById('btn-jumble-retry').addEventListener('click', () => {
          jumblePoolChunks.forEach(c => { c.used = false; });
          jumbleSelectedOrder = [];
          paintGame8JumbleStage();
        });
      }
    }
  }

  // ============================================================================
  // BOSS BATTLE MODE: "ĐẤU BOSS CUỐI BÀI" (1000 HP + HANZI WRITER CRITICAL FINISHER)
  // ============================================================================
  function initBossBattle(lessonKey = 'all', customList = null) {
    stopTimers();
    const s = window.HSKStorage.getSettings();
    const key = lessonKey || s.selectedLesson || 'all';
    const lessonMeta = (window.HSK3_LESSONS_META || []).find(m => String(m.lesson) === String(key));

    bossState = {
      active: true,
      lessonKey: key,
      bossName: lessonMeta
        ? `Boss Bài ${lessonMeta.lesson}: Hắc Ám Mù Chữ (${lessonMeta.title})`
        : 'Đại Ma Vương HSK 3 (Toàn Tập Bài 1-20)',
      maxHp: 1000,
      hp: 1000,
      playerHearts: 3,
      roundCount: 0,
      subMode: 'radar'
    };

    currentPool = Array.isArray(customList) && customList.length > 0 ? shuffle(customList) : shuffle(getActivePool());
    questionIndex = 0;
    loadNextBossTurn();
  }

  function loadNextBossTurn() {
    stopTimers();
    gameLocked = false;
    gamePinyinRevealed = false;

    if (bossState.hp <= 0) {
      renderBossVictoryScreen();
      return;
    }
    if (bossState.playerHearts <= 0) {
      renderBossDefeatScreen();
      return;
    }

    if (questionIndex >= currentPool.length) {
      currentPool = shuffle(getActivePool());
      questionIndex = 0;
    }
    currentWord = currentPool[questionIndex];
    questionIndex++;
    bossState.roundCount++;

    // Every 3rd turn or when Boss HP <= 300 -> Trigger HANZI WRITER CRITICAL STROKE FINISHER!
    if (bossState.hp <= 300 || bossState.roundCount % 3 === 0) {
      bossState.subMode = 'finisher';
    } else if (bossState.roundCount % 3 === 1) {
      bossState.subMode = 'radar';
    } else {
      bossState.subMode = 'cloze';
    }

    renderBossStage();
  }

  function getBossHeaderHTML() {
    const hpPct = Math.max(0, Math.round((bossState.hp / bossState.maxHp) * 100));
    const heartsHTML = [1, 2, 3]
      .map(i => `<span class="text-lg ${i <= bossState.playerHearts ? 'text-rose-500' : 'text-slate-700'}">❤️</span>`)
      .join('');

    return `
      <div id="boss-header-card" class="p-4 rounded-2xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-indigo-950/80 border-2 border-rose-500/40 space-y-2.5 shadow-xl">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2.5">
            <span id="boss-avatar-icon" class="text-3xl">🐉</span>
            <div>
              <div class="text-xs font-extrabold uppercase tracking-wider text-rose-400">⚔️ Đấu Trường Boss Cuối Bài</div>
              <h3 class="text-sm sm:text-base font-extrabold text-white">${bossState.bossName}</h3>
            </div>
          </div>
          <div class="flex items-center gap-3 bg-slate-950/90 px-3.5 py-1.5 rounded-xl border border-slate-800">
            <span class="text-xs text-slate-400">Sinh mệnh:</span>
            <div class="flex items-center gap-1">${heartsHTML}</div>
          </div>
        </div>

        <!-- Boss HP Bar -->
        <div class="space-y-1">
          <div class="flex items-center justify-between text-xs font-mono-code">
            <span class="text-rose-300 font-bold">HP BOSS: ${bossState.hp} / ${bossState.maxHp}</span>
            <span class="text-amber-300">Hiệp #${bossState.roundCount}</span>
          </div>
          <div class="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden border border-rose-500/30">
            <div
              id="boss-hp-fill"
              class="h-full bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-400 transition-all duration-300"
              style="width: ${hpPct}%"
            ></div>
          </div>
        </div>
      </div>
    `;
  }

  function renderBossStage() {
    const stageEl = document.getElementById('game-stage-container');
    if (!stageEl) return;

    if (bossState.subMode === 'finisher') {
      // HANZI WRITER CRITICAL HIT FINISHER!
      stageEl.innerHTML = `
        <div class="max-w-2xl mx-auto space-y-5">
          ${getBossHeaderHTML()}

          <div class="p-5 rounded-2xl bg-slate-900/95 border-2 border-amber-500/50 text-center space-y-3">
            <div class="flex items-center justify-center gap-2 flex-wrap">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/40 animate-pulse">
                ⚡ ĐÒN KẾT LIỄU CHÍ MẠNG (CRITICAL STROKE FINISHER • -300 HP BOSS!)
              </div>
              ${renderPinyinRescueButtonHTML()}
            </div>
            <h4 class="text-2xl font-extrabold text-white">${currentWord.meaning} <span class="text-sm text-amber-300 uppercase">[${currentWord.hanViet}]</span></h4>
            <div class="game-rescue-pinyin hidden text-sm font-mono-code text-amber-300 font-bold">
              🆘 Pinyin: ${currentWord.pinyin}
            </div>
            <p class="text-xs text-slate-300">
              Dùng chuột vẽ chuẩn các nét của từ này trên ô kẻ dưới đây để tung đòn <strong>Chí Mạng (-300 HP)</strong> vào Boss!
            </p>
            <div id="boss-writer-canvases" class="flex flex-wrap items-center justify-center gap-4 py-2"></div>
            <div id="boss-writer-status" class="text-xs font-semibold text-emerald-400">
              Hãy vẽ trực tiếp từng nét lên ô kẻ!
            </div>
            <div class="pt-1">
              <button type="button" id="btn-boss-skip-finisher" class="text-xs text-slate-400 hover:text-white underline">
                Bỏ qua đòn vẽ tay (Chuyển sang chọn đáp án nhanh)
              </button>
            </div>
          </div>
        </div>
      `;

      bindPinyinRescueButton();
      const writerBox = document.getElementById('boss-writer-canvases');
      const writerStatus = document.getElementById('boss-writer-status');
      if (writerBox && window.HSKWriter) {
        window.HSKWriter.renderWordCanvases(currentWord, writerBox, writerStatus);
        window.HSKWriter.startFullWordStrokeQuiz(writerStatus, () => {
          // Critical Hit Callback!
          dealBossDamage(300, true);
        });
      }

      const skipBtn = document.getElementById('btn-boss-skip-finisher');
      if (skipBtn) {
        skipBtn.addEventListener('click', () => {
          bossState.subMode = 'radar';
          renderBossStage();
        });
      }
      return;
    }

    // Standard Boss Turn (Radar or Cloze)
    const distractors = generateVisualDistractors(currentWord, 3);
    currentOptions = shuffle([currentWord.hanzi, ...distractors]);

    const promptHTML = bossState.subMode === 'cloze' && currentWord.example
      ? `<div class="flex items-center justify-center gap-2 flex-wrap">
           <span class="text-xs text-indigo-300 uppercase font-bold">Đòn Tấn Công Ngữ Cảnh (Điền từ vào câu):</span>
           ${renderPinyinRescueButtonHTML()}
         </div>
         <div class="font-hanzi-serif text-2xl sm:text-3xl font-bold text-white py-1">
           ${currentWord.example.hanzi.replace(currentWord.hanzi, '<span class="px-3 py-0.5 rounded bg-rose-500/20 border border-rose-400 text-rose-300">[ ? ]</span>')}
         </div>
         <div class="game-rescue-pinyin hidden text-xs font-mono-code text-amber-300 font-bold">
           🆘 Pinyin câu: ${(currentWord.example.pinyin || '').replace(new RegExp(currentWord.pinyin, 'i'), '[ ? ]')} (Đáp án: ${currentWord.pinyin})
         </div>
         <div class="text-xs text-slate-300">"${currentWord.example.meaning}"</div>`
      : `<div class="flex items-center justify-center gap-2 flex-wrap">
           <span class="text-xs text-amber-300 uppercase font-bold">Đòn Tấn Công Phá Bẫy Mặt Chữ (-200 HP Boss):</span>
           ${renderPinyinRescueButtonHTML()}
         </div>
         <h4 class="text-2xl sm:text-3xl font-extrabold text-white">${currentWord.meaning}</h4>
         <div class="game-rescue-pinyin hidden text-sm font-mono-code text-amber-300 font-bold">
           🆘 Pinyin cần tìm: ${currentWord.pinyin}
         </div>
         <div class="text-xs text-slate-400">Hán Việt: <strong class="text-indigo-300 uppercase">${currentWord.hanViet}</strong></div>`;

    stageEl.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-5">
        ${getBossHeaderHTML()}

        <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-2">
          ${promptHTML}
        </div>

        <div class="grid grid-cols-2 gap-3.5">
          ${currentOptions
            .map(
              (opt, idx) => `
            <button
              type="button"
              data-boss-opt="${opt}"
              data-boss-idx="${idx + 1}"
              class="group p-5 rounded-2xl bg-slate-800/80 hover:bg-rose-600/25 border-2 border-slate-700 hover:border-rose-400 transition flex items-center justify-between"
            >
              <span class="kbd-pill text-slate-300 group-hover:bg-rose-500 group-hover:text-white">${idx + 1}</span>
              <div class="flex flex-col items-center mx-auto">
                <span class="font-hanzi-serif text-3xl sm:text-4xl font-bold text-white">${opt}</span>
                <span class="game-rescue-pinyin hidden text-xs font-mono-code text-amber-300 mt-1">${getPinyinForHanzi(opt)}</span>
              </div>
            </button>
          `
            )
            .join('')}
        </div>

        <div id="boss-feedback-box" class="hidden p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-3"></div>
      </div>
    `;

    bindPinyinRescueButton();
    stageEl.querySelectorAll('[data-boss-opt]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (gameLocked) return;
        const picked = btn.getAttribute('data-boss-opt');
        if (picked === currentWord.hanzi) {
          btn.classList.add('animate-success-pop', 'bg-emerald-600/30', 'border-emerald-400');
          dealBossDamage(200, false);
        } else {
          btn.classList.add('animate-shake', 'bg-rose-600/30', 'border-rose-400');
          takeBossPlayerDamage(picked);
        }
      });
    });
  }

  function dealBossDamage(dmg, isCrit) {
    gameLocked = true;
    const actualDmg = combo >= 5 ? Math.round(dmg * 1.25) : dmg;
    bossState.hp = Math.max(0, bossState.hp - actualDmg);
    registerComboHit(isCrit ? 200 : 120);
    window.HSKStorage.recordSuccess(currentWord.id, 20);

    if (isCrit && window.HSKSound && window.HSKSound.playCriticalHit) {
      window.HSKSound.playCriticalHit();
    } else if (window.HSKSound && window.HSKSound.playBossHit) {
      window.HSKSound.playBossHit();
    }
    if (window.HSKSound) {
      window.HSKSound.speak(currentWord.hanzi);
    }

    const headerCard = document.getElementById('boss-header-card');
    if (headerCard) {
      headerCard.classList.add('animate-boss-hit');
    }
    const hpFill = document.getElementById('boss-hp-fill');
    if (hpFill) {
      hpFill.style.width = `${Math.max(0, Math.round((bossState.hp / bossState.maxHp) * 100))}%`;
    }

    setTimeout(() => {
      loadNextBossTurn();
    }, isCrit ? 1100 : 750);
  }

  function takeBossPlayerDamage(pickedHanzi) {
    gameLocked = true;
    bossState.playerHearts = Math.max(0, bossState.playerHearts - 1);
    registerComboMiss();
    window.HSKStorage.recordMistake(currentWord.id, pickedHanzi);

    const fbBox = document.getElementById('boss-feedback-box');
    if (fbBox) {
      fbBox.classList.remove('hidden');
      fbBox.innerHTML = `
        <div class="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <span class="text-rose-400 font-bold text-xs sm:text-sm">
            💥 Boss phản đòn (-1 ❤️)! Bạn chọn nhầm "${pickedHanzi}", đáp án đúng là "${currentWord.hanzi}".
          </span>
          <button type="button" id="btn-boss-continue" class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition">
            Đánh tiếp (Enter) →
          </button>
        </div>
        ${renderTwinDiffHTML(currentWord, pickedHanzi)}
      `;
      document.getElementById('btn-boss-continue').addEventListener('click', loadNextBossTurn);
    }
  }

  function renderBossVictoryScreen() {
    bossState.active = false;
    window.HSKStorage.recordBossVictory(bossState.lessonKey);
    if (window.HSKSound) window.HSKSound.playVictory();
    if (window.HSKApp && window.HSKApp.refreshHeaderStats) {
      window.HSKApp.refreshHeaderStats();
    }

    const stageEl = document.getElementById('game-stage-container');
    if (!stageEl) return;

    stageEl.innerHTML = `
      <div class="max-w-xl mx-auto p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950/80 border-2 border-amber-400/60 text-center space-y-4 shadow-2xl">
        <div class="text-6xl animate-bounce">👑🐉</div>
        <div class="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-400/40">
          HUY HIỆU DIỆT BOSS ĐÃ MỞ KHÓA!
        </div>
        <h3 class="text-2xl sm:text-3xl font-extrabold text-white">
          Hạ Gục ${bossState.bossName}!
        </h3>
        <p class="text-sm text-slate-300">
          Bạn đã tiêu diệt hoàn toàn 1000 HP của Boss và giành được <strong>Vương Miện Vàng 👑</strong> trên Bảng Heatmap!
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button type="button" id="btn-boss-win-again" class="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition">
            ⚔️ Khiêu chiến lại Boss
          </button>
          <button type="button" id="btn-boss-win-heatmap" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition">
            🗺️ Xem Vương Miện trên Heatmap
          </button>
        </div>
      </div>
    `;
    document.getElementById('btn-boss-win-again').addEventListener('click', () => initBossBattle(bossState.lessonKey));
    document.getElementById('btn-boss-win-heatmap').addEventListener('click', () => {
      if (window.HSKApp) window.HSKApp.switchTab('analytics');
    });
  }

  function renderBossDefeatScreen() {
    bossState.active = false;
    const stageEl = document.getElementById('game-stage-container');
    if (!stageEl) return;

    stageEl.innerHTML = `
      <div class="max-w-xl mx-auto p-8 rounded-2xl bg-slate-900 border-2 border-rose-500/40 text-center space-y-4">
        <div class="text-5xl">💔🐉</div>
        <h3 class="text-2xl font-extrabold text-rose-400">Hết Mạng! Boss Còn ${bossState.hp} HP!</h3>
        <p class="text-sm text-slate-300">
          Những mặt chữ làm bạn mất máu đã được đưa vào <strong>Sổ Thù Vặt</strong>. Hãy ôn lại bộ thủ rồi phục thù nhé!
        </p>
        <div class="flex items-center justify-center gap-3 pt-2">
          <button type="button" id="btn-boss-retry" class="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition">
            🔥 Phục Thù Ngay
          </button>
        </div>
      </div>
    `;
    document.getElementById('btn-boss-retry').addEventListener('click', () => initBossBattle(bossState.lessonKey));
  }

  /**
   * Handle global keyboard shortcuts inside Game Tab without conflicting with Game 1 Input
   */
  function handleKeyDown(e) {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
      return;
    }

    // Emergency Pinyin Rescue toggle with P key in all games
    if (e.key === 'p' || e.key === 'P') {
      e.preventDefault();
      toggleGamePinyinRescue();
      return;
    }

    // Replay audio with R in games
    if ((e.key === 'r' || e.key === 'R') && currentWord && activeGameId !== 'game5') {
      e.preventDefault();
      window.HSKSound.speak(currentWord.hanzi);
      return;
    }

    if (e.key === 'Enter' && gameLocked) {
      e.preventDefault();
      loadNextQuestion();
      return;
    }

    // Number keys 1-5 for Game 1 Candidate Bar
    if (activeGameId === 'game1' && imeStage === 'candidates' && !gameLocked) {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 5) {
        e.preventDefault();
        const btn = document.querySelector(`[data-ime-idx="${num}"]`);
        if (btn) btn.click();
      }
      return;
    }

    // Hotkeys 1-9, 0, -, = for Game 2 Lego Matrix
    if (activeGameId === 'game2' && !gameLocked) {
      const keyIdx = LEGO_HOTKEYS.indexOf(e.key);
      if (keyIdx >= 0) {
        e.preventDefault();
        const btn = document.querySelector(`[data-lego-idx="${keyIdx}"]`);
        if (btn && !btn.disabled) btn.click();
      }
      return;
    }

    // Number keys 1-4 for Game 3, Game 4, Game 6 & Boss Mode
    if ((activeGameId === 'game3' || activeGameId === 'game4' || activeGameId === 'game6' || activeGameId === 'boss') && !gameLocked) {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 4) {
        e.preventDefault();
        const selector =
          activeGameId === 'game3'
            ? `[data-radar-idx="${num}"]`
            : activeGameId === 'game4'
            ? `[data-cloze-idx="${num}"]`
            : activeGameId === 'game6'
            ? `[data-blitz-idx="${num}"]`
            : `[data-boss-idx="${num}"]`;
        const btn = document.querySelector(selector);
        if (btn) btn.click();
      }
      return;
    }

    // Hotkeys for Game 5 Matrix (1-8, Q, W, E, R, A, S, D, F)
    if (activeGameId === 'game5' && matrixTimeLeft > 0) {
      const upper = e.key.toUpperCase();
      const idx = MATRIX_HOTKEYS.indexOf(upper);
      if (idx >= 0) {
        e.preventDefault();
        const btn = document.querySelector(`[data-matrix-idx="${idx}"]`);
        if (btn && !btn.disabled) btn.click();
      }
      return;
    }

    // Hotkeys for Game 8 Sentence Jumble (1-7 to pick, Backspace to undo)
    if (activeGameId === 'game8' && !gameLocked) {
      if (e.key === 'Backspace' && jumbleSelectedOrder.length > 0) {
        e.preventDefault();
        removeJumbleChunkAt(jumbleSelectedOrder.length - 1);
        return;
      }
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= jumblePoolChunks.length) {
        e.preventDefault();
        pickJumbleChunk(num - 1);
      }
    }
  }

  return {
    startGame,
    startBossBattle,
    handleKeyDown,
    stopTimers,
    renderTwinDiffHTML
  };
})();
