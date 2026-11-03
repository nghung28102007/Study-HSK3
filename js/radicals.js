/**
 * HSK 3 Radical Mastery Studio (Phòng Thí Nghiệm 50+ Bộ Thủ Cốt Lõi & 137 Bộ Thủ HSK 3)
 * Features:
 *  1. Explorer & Deep-Dive Inspector + HanziWriter Stroke Practice
 *  2. 3D Radical Flip Flashcards
 *  3. 10 Confusable Twin-Radical Microscope Comparisons
 *  4. 3-Mode Interactive Radical Quiz & Speed Challenge
 */

window.HSKRadicals = (function () {
  let activeSubTab = 'explorer'; // 'explorer' | 'flashcard' | 'twins' | 'quiz'
  let currentCategory = 'kangxi214'; // 'kangxi214' | 'all' | 'human' | 'action' | 'mind_speech' | 'nature' | 'objects_places' | 'confusable' | 'full137'
  let currentStrokeFilter = 0;   // 0 = all strokes, 1..17 = specific stroke count, 100 = 10+ strokes
  let searchQuery = '';
  let selectedRadicalKey = '氵';
  let activeWriterInstance = null;
  let activeWriterChar = '水';

  // Flashcard state
  let fcIndex = 0;
  let fcFlipped = false;
  let fcOnlyUnmastered = false;
  let fcDeckMode = 'core'; // 'core' (50 bộ cốt lõi) | 'kangxi214' (214 bộ Khang Hy)

  // Quiz state
  let quizMode = 'mixed'; // 'mixed' | 'meaning' | 'char_to_rad' | 'twin_trap'
  let quizPoolMode = 'core'; // 'core' | 'kangxi214'
  let quizScore = 0;
  let quizCombo = 0;
  let quizQuestion = null;
  let quizLocked = false;

  const CORE_RADICALS = [
    // ==================== 1. CON NGƯỜI & CƠ THỂ (human) ====================
    {
      radical: '亻',
      standalone: '人',
      variants: '亻 (nhân đứng - trái) • 人 (chữ độc lập)',
      name: 'Bộ Nhân Đứng',
      pinyin: 'rén',
      hanViet: 'nhân',
      strokes: 2,
      position: 'Đứng bên trái chữ',
      category: 'human',
      meaning: 'Con người, đại từ chỉ người, nghề nghiệp, phẩm chất và hành vi con người',
      origin: 'Hình người nhìn nghiêng đang đứng thẳng.',
      mnemonic: 'Có người (亻) đứng bên trái: bạn (你), anh ấy (他), nghỉ ngơi (休 = người tựa gốc cây 木), cơ thể (体), tin tưởng (信 = lời người nói).',
      confusableWith: {
        rad: '彳',
        name: 'Bộ Xích (Bước chân trái)',
        tip: '亻 chỉ có 1 nét phẩy trên (người đứng: 他, 休, 信); còn 彳 có 2 nét phẩy (bước chân đi trên đường: 很, 得, 行).'
      },
      sampleChars: ['他', '你', '们', '休', '体', '信', '作', '住', '位', '借', '件', '像', '假', '健']
    },
    {
      radical: '人',
      standalone: '人',
      variants: '人 (chữ độc lập) • 𠆢 (nhân nón - bao trên)',
      name: 'Bộ Nhân (Nhân Nón)',
      pinyin: 'rén',
      hanViet: 'nhân',
      strokes: 2,
      position: 'Độc lập hoặc bao phía trên',
      category: 'human',
      meaning: 'Con người, mái che, sự tụ họp, cùng nhau',
      origin: 'Hình đôi chân người đứng vững hoặc mái nhà che chở.',
      mnemonic: 'Hai nét phẩy và mác chống vào nhau: người (人), biết/gặp gỡ (会), cái ô (伞), giới thiệu (介), hôm nay (今), toàn bộ (全).',
      confusableWith: {
        rad: '入 / 八',
        name: 'Bộ Nhập (入) & Bộ Bát (八)',
        tip: '人 nét phẩy trái cao hơn; 入 nét mác phải đè lên phẩy trái; 八 hai nét tách rời nhau ở đỉnh.'
      },
      sampleChars: ['人', '会', '伞', '个', '介', '今', '全', '拿', '以']
    },
    {
      radical: '女',
      standalone: '女',
      variants: '女 (trái hoặc dưới)',
      name: 'Bộ Nữ',
      pinyin: 'nǚ',
      hanViet: 'nữ',
      strokes: 3,
      position: 'Bên trái hoặc phía dưới',
      category: 'human',
      meaning: 'Phụ nữ, phái nữ, thành viên nữ trong gia đình, hôn nhân, sự duyên dáng',
      origin: 'Hình người phụ nữ quỳ ngồi đoan trang, hai tay đan trước ngực.',
      mnemonic: 'Các chữ chỉ người nữ hoặc hôn nhân đều có 女: mẹ (妈), chị (姐), em gái (妹), bà (奶), dì (姨), kết hôn (婚), tốt đẹp (好 = có nếp 女 có tẻ 子).',
      confusableWith: {
        rad: '母',
        name: 'Chữ Mẫu (Mẹ)',
        tip: '女 có 3 nét thanh thoát; 母 có khung vuông và 2 dấu chấm ở giữa.'
      },
      sampleChars: ['女', '好', '妈', '姐', '妹', '奶', '姨', '婚', '如']
    },
    {
      radical: '子',
      standalone: '子',
      variants: '子 (dưới, trái hoặc độc lập)',
      name: 'Bộ Tử',
      pinyin: 'zǐ',
      hanViet: 'tử',
      strokes: 3,
      position: 'Bên trái, phía dưới hoặc hậu tố danh từ',
      category: 'human',
      meaning: 'Con cái, đứa trẻ, hạt giống, hậu tố danh từ đồ vật',
      origin: 'Hình em bé quấn tã đang giơ hai tay.',
      mnemonic: 'Đứa trẻ (子) ngồi dưới mái nhà (宀) học viết chữ Tự (字) và chữ Học (学); đứa trẻ dưới cây lúa (禾) là Mùa vụ (季).',
      confusableWith: {
        rad: '了',
        name: 'Chữ Liễu (了)',
        tip: '子 có nét ngang cắt qua ở giữa (2 cánh tay em bé); 了 không có nét ngang.'
      },
      sampleChars: ['子', '字', '学', '季', '孩', '游']
    },
    {
      radical: '口',
      standalone: '口',
      variants: '口 (khẩu - nhỏ gọn)',
      name: 'Bộ Khẩu',
      pinyin: 'kǒu',
      hanViet: 'khẩu',
      strokes: 3,
      position: 'Bên trái, dưới hoặc trong',
      category: 'human',
      meaning: 'Cái miệng, ăn uống, ca hát, kêu gọi, âm thanh, lối ra vào',
      origin: 'Hình cái miệng đang mở.',
      mnemonic: 'Mọi hoạt động dùng miệng: ăn (吃), uống (喝), hát (唱), khóc (哭), gọi (叫), cái miệng (嘴), đồ uống (咖啡, 啤酒), vang vọng (响).',
      confusableWith: {
        rad: '囗',
        name: 'Bộ Vi (Tường vây quanh)',
        tip: '口 nhỏ gọn nằm một góc là cái miệng (喝, 吃, 唱); 囗 to bao trọn bên ngoài chữ là tường vây quanh (国, 园, 图, 回).'
      },
      sampleChars: ['口', '喝', '吃', '哭', '唱', '叫', '嘴', '咖', '啡', '啤', '响', '只', '句', '可']
    },
    {
      radical: '目',
      standalone: '目',
      variants: '目 (mục - 2 nét ngang giữa)',
      name: 'Bộ Mục',
      pinyin: 'mù',
      hanViet: 'mục',
      strokes: 5,
      position: 'Bên trái hoặc phía dưới',
      category: 'human',
      meaning: 'Con mắt, thị giác, nhìn ngắm, giấc ngủ, sự chân thật',
      origin: 'Hình con mắt dựng dọc với 2 nét ngang ở giữa là tròng mắt.',
      mnemonic: 'Có 2 nét ngang bên trong là Con mắt (目): con mắt (眼睛), ngủ (睡觉 - sụp mí mắt), nhìn (看 = tay che trên mắt), thẳng/thật (直, 真), nhìn nhau (相).',
      confusableWith: {
        rad: '日',
        name: 'Bộ Nhật (Mặt trời)',
        tip: '目 có 2 nét ngang giữa = Con mắt (睛 con ngươi, 眼 mắt, 睡 ngủ); 日 chỉ có 1 nét ngang giữa = Mặt trời (晴 trời nắng, 明 sáng).'
      },
      sampleChars: ['目', '眼', '睛', '睡', '看', '着', '真', '直', '相', '冒']
    },
    {
      radical: '耳',
      standalone: '耳',
      variants: '耳 (nhĩ - cái tai)',
      name: 'Bộ Nhĩ',
      pinyin: 'ěr',
      hanViet: 'nhĩ',
      strokes: 6,
      position: 'Bên trái hoặc phía dưới',
      category: 'human',
      meaning: 'Cái tai, lắng nghe, trò chuyện, sự thông minh',
      origin: 'Hình vành tai người nhìn nghiêng.',
      mnemonic: 'Dùng tai (耳) lắng nghe khi trò chuyện (聊); người thông minh (聪明) biết dùng tai nghe, mắt nhìn, miệng hỏi, tâm nghĩ.',
      confusableWith: {
        rad: '目',
        name: 'Bộ Mục (Con mắt)',
        tip: '耳 có nét ngang trên và dưới vươn dài ra ngoài như vành tai; 目 đóng khung chữ nhật kín.'
      },
      sampleChars: ['耳', '聊', '聪', '闻']
    },
    {
      radical: '月',
      standalone: '月',
      variants: '月 (Bộ Nhục khi đứng trái • Bộ Nguyệt khi đứng phải)',
      name: 'Bộ Nhục / Bộ Nguyệt',
      pinyin: 'ròu / yuè',
      hanViet: 'nhục / nguyệt',
      strokes: 4,
      position: 'Bên trái (Nhục - cơ thể) hoặc bên phải (Nguyệt - trăng)',
      category: 'human',
      meaning: 'Thịt, bộ phận cơ thể người (Nhục) • Mặt trăng, tháng, thời gian (Nguyệt)',
      origin: 'Khi đứng bên trái thường là biến thể của chữ Nhục (肉 - thịt); khi đứng phải là chữ Nguyệt (月 - mặt trăng).',
      mnemonic: 'Quy tắc vàng: Trái Nhục (bộ phận cơ thể: 胖 béo, 腿 đùi, 脚 chân, 脸 mặt) — Phải Nguyệt (trăng/thời gian: 明 sáng, 期 kỳ hạn).',
      confusableWith: {
        rad: '日',
        name: 'Bộ Nhật (Mặt trời)',
        tip: '月 hẹp dài, mở chân dưới và có 2 nét ngang giữa.'
      },
      sampleChars: ['月', '胖', '腿', '脚', '脸', '服', '育', '有', '明', '期']
    },
    {
      radical: '页',
      standalone: '页',
      variants: '页 (hiệt - bên phải)',
      name: 'Bộ Hiệt',
      pinyin: 'yè',
      hanViet: 'hiệt',
      strokes: 6,
      position: 'Bên phải chữ',
      category: 'human',
      meaning: 'Cái đầu, khuôn mặt, trang giấy, đề mục, ngoái nhìn',
      origin: 'Hình cái đầu người nổi bật trên thân mình.',
      mnemonic: 'Liên quan đến cái đầu/mặt hoặc trang giấy: quay đầu chăm sóc (顾), râu/cần phải (须), đề bài (题), làm phiền/đau đầu (烦).',
      confusableWith: {
        rad: '贝',
        name: 'Bộ Bối (Tiền bạc)',
        tip: '页 có thêm nét ngang và phẩy trên đỉnh (như cái trán trên đầu); 贝 không có nét ngang đỉnh.'
      },
      sampleChars: ['顾', '须', '题']
    },
    {
      radical: '疒',
      standalone: '病',
      variants: '疒 (nạch - bao trên trái)',
      name: 'Bộ Nạch',
      pinyin: 'nè',
      hanViet: 'nạch',
      strokes: 5,
      position: 'Bao phía trên và bên trái',
      category: 'human',
      meaning: 'Bệnh tật, đau ốm, triệu chứng suy nhược cơ thể',
      origin: 'Hình chiếc giường bệnh và người nằm đổ mồ hôi (2 chấm trái).',
      mnemonic: 'Cứ thấy mái nhà có thêm 2 chấm bên trái (疒) là đang nằm giường bệnh: ốm/bệnh (病), đau nhức (疼), gầy ốm (瘦).',
      confusableWith: {
        rad: '广',
        name: 'Bộ Nghiễm (Mái hiên)',
        tip: '疒 có thêm 2 nét chấm-hất bên trái (đổ mồ hôi vì bệnh: 病, 疼, 瘦); 广 không có 2 chấm trái (mái nhà: 店, 床, 康).'
      },
      sampleChars: ['病', '疼', '瘦']
    },
    {
      radical: '尸',
      standalone: '尸',
      variants: '尸 (thi - bao trên trái)',
      name: 'Bộ Thi',
      pinyin: 'shī',
      hanViet: 'thi',
      strokes: 3,
      position: 'Bao phía trên và bên trái',
      category: 'human',
      meaning: 'Cơ thể người đang ngồi/nằm, tầng nhà, nơi cư trú',
      origin: 'Hình người ngồi hoặc mái nhà nhiều tầng.',
      mnemonic: 'Chỉ nơi cư trú hoặc tầng lớp: tầng lầu (层), cư trú (居), căn phòng (屋), cái thước (尺).',
      confusableWith: {
        rad: '户',
        name: 'Bộ Hộ (Cửa 1 cánh)',
        tip: '尸 không có chấm trên đỉnh; 户 có thêm 1 nét chấm ở trên.'
      },
      sampleChars: ['层', '居', '屋', '尺']
    },

    // ==================== 2. HÀNH ĐỘNG & DI CHUYỂN (action) ====================
    {
      radical: '扌',
      standalone: '手',
      variants: '扌 (tài gảy - đứng trái) • 手 (thủ - đứng dưới/độc lập)',
      name: 'Bộ Thủ (Tài Gảy)',
      pinyin: 'shǒu',
      hanViet: 'thủ',
      strokes: 3,
      position: 'Bên trái (扌) hoặc phía dưới (手)',
      category: 'action',
      meaning: 'Bàn tay và mọi động tác dùng tay: đánh, quét, cầm, nắm, dọn, đổi, đón, kéo',
      origin: 'Hình bàn tay với các ngón tay xòe ra.',
      mnemonic: 'Bộ thủ tần suất số 1 về hành động! Mọi việc dùng tay đều có 扌: đánh (打), quét (扫), cầm (把, 拿), dọn chuyển (搬), đổi (换), đón (接), kéo (拉), tìm (找), xách (提).',
      confusableWith: {
        rad: '木',
        name: 'Bộ Mộc (Cây gỗ)',
        tip: '扌 (Tài gảy) có móc câu ở đáy và nét hất chéo; 木 (Mộc) có 2 nét phẩy-mác tỏa ra hai bên như rễ cây.'
      },
      sampleChars: ['打', '扫', '把', '拿', '搬', '换', '接', '拉', '担', '找', '提', '护', '择', '据', '手']
    },
    {
      radical: '辶',
      standalone: '走',
      variants: '辶 (sước - bao dưới trái)',
      name: 'Bộ Sước',
      pinyin: 'chuò',
      hanViet: 'sước',
      strokes: 3,
      position: 'Bao phía dưới và bên trái',
      category: 'action',
      meaning: 'Bước đi, con đường, sự di chuyển, khoảng cách xa gần',
      origin: 'Hình bước chân đi trên đường dài.',
      mnemonic: 'Con thuyền lướt trên đường bộ: xa (远), gần (近), đi qua (过), trả lại/vẫn (还), tiễn/tặng (送), đến muộn (迟), gặp gỡ (遇), lựa chọn (选), đón (迎).',
      confusableWith: {
        rad: '廴',
        name: 'Bộ Dẫn (Bước dài)',
        tip: '辶 có 1 dấu chấm rời phía trên; 廴 không có dấu chấm rời.'
      },
      sampleChars: ['远', '近', '过', '还', '送', '迟', '遇', '选', '迎', '道', '边', '进']
    },
    {
      radical: '⻊',
      standalone: '足',
      variants: '⻊ (túc đứng trái) • 足 (chữ độc lập)',
      name: 'Bộ Túc',
      pinyin: 'zú',
      hanViet: 'túc',
      strokes: 7,
      position: 'Bên trái chữ',
      category: 'action',
      meaning: 'Bàn chân, chạy, nhảy, đá bóng, bước theo sau',
      origin: 'Hình đầu gối (口) và bàn chân ở dưới (止).',
      mnemonic: 'Hoạt động của đôi chân: đi theo (跟), chạy bộ (跑), đá bóng (踢), nhảy lên (跳), con đường (路).',
      confusableWith: {
        rad: '走',
        name: 'Bộ Tẩu (Đi/Chạy)',
        tip: '⻊ trên là hình vuông 口 (đầu gối), đứng gọn bên trái; 走 trên là chữ Thổ 土 (đất), vươn nét mác dài đỡ bên dưới.'
      },
      sampleChars: ['跟', '跑', '踢', '跳', '路', '足']
    },
    {
      radical: '走',
      standalone: '走',
      variants: '走 (tẩu - bao dưới trái)',
      name: 'Bộ Tẩu',
      pinyin: 'zǒu',
      hanViet: 'tẩu',
      strokes: 7,
      position: 'Bao phía dưới và bên trái',
      category: 'action',
      meaning: 'Đi bộ, chạy nhanh, vượt qua, thức dậy',
      origin: 'Hình người vung tay chạy trên mặt đất (土).',
      mnemonic: 'Bước chân chạy nhanh: đi bộ (走), thức dậy/bắt đầu (起), vượt qua/ngày càng (越), siêu việt (超), hứng thú (趣).',
      confusableWith: {
        rad: '⻊',
        name: 'Bộ Túc (Cái chân)',
        tip: '走 có phần trên là chữ Thổ (土); ⻊ có phần trên là chữ Khẩu (口).'
      },
      sampleChars: ['走', '起', '越', '超', '趣']
    },
    {
      radical: '彳',
      standalone: '行',
      variants: '彳 (xích - 2 phẩy bên trái)',
      name: 'Bộ Xích',
      pinyin: 'chì',
      hanViet: 'xích',
      strokes: 3,
      position: 'Bên trái chữ',
      category: 'action',
      meaning: 'Bước chân trái, đi bộ trên phố, hành trình, đạt được',
      origin: 'Nửa bên trái của chữ Hành (行 - giao lộ đường phố).',
      mnemonic: 'Hai nét phẩy như 2 bước chân đi trên phố: đi/ngành nghề (行), đường phố (街), đạt được/phải (得), rất (很), hướng về (往).',
      confusableWith: {
        rad: '亻',
        name: 'Bộ Nhân Đứng (1 phẩy)',
        tip: '彳 có 2 nét phẩy (bước chân: 很, 得, 行, 街); 亻 chỉ có 1 nét phẩy (con người: 他, 你, 休).'
      },
      sampleChars: ['很', '得', '行', '街', '往']
    },
    {
      radical: '刂',
      standalone: '刀',
      variants: '刂 (đao đứng - bên phải) • 刀 (đao - dưới/trái)',
      name: 'Bộ Đao (Đao Đứng)',
      pinyin: 'dāo',
      hanViet: 'đao',
      strokes: 2,
      position: 'Bên phải (刂) hoặc phía dưới (刀)',
      category: 'action',
      meaning: 'Con dao, cắt, gọt, cạo, chải, phân chia, khắc chạm',
      origin: 'Hình lưỡi dao sắc bén dựng đứng.',
      mnemonic: 'Dùng dao (刂/刀) để cắt chia: chia/phút (分), khác biệt/đừng (别), cạo/gió thổi (刮), chải/quét (刷), khắc/15 phút (刻), đến (到), vừa mới/cứng (刚), phía trước (前).',
      confusableWith: {
        rad: '力',
        name: 'Bộ Lực (Sức mạnh)',
        tip: '刀 (Đao) nét phẩy KHÔNG xuyên qua nét ngang trên; 力 (Lực) nét phẩy đâm xuyên lên đỉnh!'
      },
      sampleChars: ['分', '别', '到', '前', '刚', '刻', '刮', '刷', '刀']
    },
    {
      radical: '力',
      standalone: '力',
      variants: '力 (lực - phải hoặc dưới)',
      name: 'Bộ Lực',
      pinyin: 'lì',
      hanViet: 'lực',
      strokes: 2,
      position: 'Bên phải hoặc phía dưới',
      category: 'action',
      meaning: 'Sức lực, cơ bắp, nỗ lực, vận động, giải quyết công việc',
      origin: 'Hình cánh tay gồng cơ bắp hoặc chiếc cày.',
      mnemonic: 'Bỏ sức lực ra làm việc: vận động (动), nỗ lực/chăm chỉ (努力), làm/giải quyết (办), thêm vào (加).',
      confusableWith: {
        rad: '刀',
        name: 'Bộ Đao (Con dao)',
        tip: '力 có đầu nét phẩy nhô hẳn lên trên nét ngang như bắp tay cuồn cuộn.'
      },
      sampleChars: ['力', '动', '努', '办', '加']
    },
    {
      radical: '攵',
      standalone: '文',
      variants: '攵 (phộc - bên phải)',
      name: 'Bộ Phộc',
      pinyin: 'pū',
      hanViet: 'phộc',
      strokes: 4,
      position: 'Bên phải chữ',
      category: 'action',
      meaning: 'Tay cầm roi/thước gõ nhẹ, dạy học, đặt để, đếm số',
      origin: 'Hình bàn tay cầm que gõ nhẹ để rèn giũa, dạy bảo.',
      mnemonic: 'Thầy giáo cầm thước: dạy học (教), đặt để/thả (放), đếm/môn Toán (数), chuyện cũ/nguyên cớ (故), thay đổi (改).',
      confusableWith: {
        rad: '夂',
        name: 'Bộ Trĩ (Bước chân theo sau)',
        tip: '攵 có 4 nét (đứng bên phải: 放, 教, 数); 夂 chỉ có 3 nét (đứng phía dưới: 复 ôn tập, 夏 mùa hè).'
      },
      sampleChars: ['放', '教', '数', '故', '改']
    },
    {
      radical: '又',
      standalone: '又',
      variants: '又 (hựu - bàn tay phải)',
      name: 'Bộ Hựu',
      pinyin: 'yòu',
      hanViet: 'hựu',
      strokes: 2,
      position: 'Bên trái, dưới hoặc phải',
      category: 'action',
      meaning: 'Bàn tay phải, sự lặp lại một lần nữa, bắt tay kết bạn',
      origin: 'Hình bàn tay phải với các ngón tay.',
      mnemonic: 'Hai bàn tay nắm nhau là Bạn bè (友), một đôi (双); lặp lại (又), phát triển (发), thay đổi (变), chú (叔).',
      confusableWith: {
        rad: '攵',
        name: 'Bộ Phộc',
        tip: '又 chỉ có 2 nét đơn giản; 攵 có 4 nét.'
      },
      sampleChars: ['又', '友', '发', '变', '叔', '双', '欢']
    },
    {
      radical: '见',
      standalone: '见',
      variants: '见 (kiến - phải hoặc dưới)',
      name: 'Bộ Kiến',
      pinyin: 'jiàn',
      hanViet: 'kiến',
      strokes: 4,
      position: 'Bên phải hoặc phía dưới',
      category: 'action',
      meaning: 'Nhìn thấy, gặp gỡ, nhận thức, cảm giác',
      origin: 'Hình con mắt to đặt trên đôi chân người (儿).',
      mnemonic: 'Đôi mắt biết đi để nhìn thấy: nhìn/gặp (见), cảm thấy/giấc ngủ (觉), tivi/thị giác (视), hiện tại (现).',
      confusableWith: {
        rad: '贝',
        name: 'Bộ Bối (Tiền bạc)',
        tip: '见 nét cuối là sổ cong móc dài (như đôi chân 儿: 见, 觉, 视); 贝 nét cuối là chấm ngắn (tiền bạc: 贵, 赛, 买).'
      },
      sampleChars: ['见', '觉', '视', '现']
    },

    // ==================== 3. NGÔN NGỮ & TÂM LÝ (mind_speech) ====================
    {
      radical: '讠',
      standalone: '言',
      variants: '讠 (ngôn giản thể - bên trái) • 言 (chữ độc lập)',
      name: 'Bộ Ngôn',
      pinyin: 'yán',
      hanViet: 'ngôn',
      strokes: 2,
      position: 'Bên trái chữ',
      category: 'mind_speech',
      meaning: 'Lời nói, ngôn ngữ, hỏi han, giảng dạy, ghi nhớ, bàn bạc',
      origin: 'Giản thể từ chữ 言 (hình làn hơi phát ra từ miệng khi nói).',
      mnemonic: 'Mọi hoạt động dùng lời nói: nói (说, 话, 讲), xin mời (请), đọc (读), bài học (课), nhận ra (认), ghi nhớ (记), thử/thi (试), bàn bạc (议), từ ngữ (词语), ai (谁).',
      confusableWith: {
        rad: '氵',
        name: 'Bộ Thủy (3 chấm nước)',
        tip: '讠 chỉ có 2 nét (1 chấm + 1 nét ngang sổ hất liền nhau); 氵 là 3 giọt chấm rời nhau.'
      },
      sampleChars: ['说', '话', '请', '读', '课', '认', '记', '讲', '试', '议', '词', '调', '该', '语', '谁']
    },
    {
      radical: '忄',
      standalone: '心',
      variants: '忄 (tâm đứng - bên trái)',
      name: 'Bộ Tâm Đứng',
      pinyin: 'xīn',
      hanViet: 'tâm',
      strokes: 3,
      position: 'Bên trái chữ',
      category: 'mind_speech',
      meaning: 'Trái tim, cảm xúc, tâm trạng, tính tình, thói quen',
      origin: 'Biến thể đứng của chữ Tâm (心) khi đứng bên trái chữ.',
      mnemonic: 'Cảm xúc trong tim: tình cảm (情), bận rộn (忙 = tâm mất), sợ hãi (怕), thói quen (惯), kỳ lạ/trách (怪), vui/nhanh (快), chậm (慢), hiểu (懂).',
      confusableWith: {
        rad: '氵',
        name: 'Bộ Thủy (Ba chấm thủy)',
        tip: '忄 có 1 nét sổ thẳng đứng ở giữa và 2 chấm hai bên; 氵 là 3 nét chấm-hất xếp dọc.'
      },
      sampleChars: ['情', '忙', '怕', '惯', '怪', '快', '慢', '懂', '恨']
    },
    {
      radical: '心',
      standalone: '心',
      variants: '心 (tâm đáy - phía dưới)',
      name: 'Bộ Tâm (Tâm Đáy)',
      pinyin: 'xīn',
      hanViet: 'tâm',
      strokes: 4,
      position: 'Phía dưới chữ',
      category: 'mind_speech',
      meaning: 'Trái tim, suy nghĩ, nỗi nhớ, ý chí, lòng biết ơn',
      origin: 'Hình quả tim với các buồng tim.',
      mnemonic: 'Đặt quả tim (心) ở đáy chữ để suy ngẫm: nhớ/nghĩ (想), quên (忘 = mất tâm), sốt ruột (急), luôn luôn/tổng (总), ý nghĩa (意), cảm thấy (感), mong muốn (愿), nhất định (必).',
      confusableWith: {
        rad: '灬',
        name: 'Bộ Hỏa Đáy (4 chấm lửa)',
        tip: '心 có nét nằm móc cong như chiếc thuyền; 灬 là 4 chấm lửa rời nhau.'
      },
      sampleChars: ['心', '想', '忘', '急', '总', '意', '感', '愿', '必', '息']
    },
    {
      radical: '音',
      standalone: '音',
      variants: '音 (âm - độc lập hoặc trên)',
      name: 'Bộ Âm',
      pinyin: 'yīn',
      hanViet: 'âm',
      strokes: 9,
      position: 'Độc lập hoặc phía trên',
      category: 'mind_speech',
      meaning: 'Âm thanh, tiếng vang, âm nhạc',
      origin: 'Hình miệng phát ra tiếng ngân vang.',
      mnemonic: 'Trên là Lập (立), dưới là Nhật (日): âm nhạc (音乐), tiếng động (声音); thêm Tâm (心) ở dưới thành Ý nghĩa (意 = tiếng vang trong tim).',
      confusableWith: {
        rad: '言',
        name: 'Chữ Ngôn',
        tip: '音 dưới cùng là chữ Nhật (日); 言 dưới cùng là chữ Khẩu (口).'
      },
      sampleChars: ['音', '意']
    },

    // ==================== 4. THIÊN NHIÊN & NGUYÊN TỐ (nature) ====================
    {
      radical: '氵',
      standalone: '水',
      variants: '氵 (ba chấm thủy - đứng trái) • 水 (thủy - độc lập)',
      name: 'Bộ Thủy (Ba Chấm Thủy)',
      pinyin: 'shuǐ',
      hanViet: 'thủy',
      strokes: 3,
      position: 'Bên trái chữ',
      category: 'nature',
      meaning: 'Nước, chất lỏng, sông hồ, biển, tắm giặt, khát nước, trong sạch',
      origin: 'Hình 3 giọt nước bắn lên từ dòng sông (水).',
      mnemonic: 'Siêu bộ thủ HSK! Hễ thấy 3 chấm nước (氵) là liên quan chất lỏng: khát nước (渴), tắm rửa (洗澡), bơi lội (游泳), sông hồ (河, 湖), trong sạch (清), đầy (满), rượu (酒).',
      confusableWith: {
        rad: '冫',
        name: 'Bộ Băng (Hai chấm băng)',
        tip: '氵 có 3 giọt = Nước chảy/chất lỏng (渴, 洗, 河); 冫 chỉ có 2 giọt = Nước đá/lạnh giá (冷, 冰, 冬) hoặc quyết đoán (决, 准).'
      },
      sampleChars: ['水', '渴', '洗', '澡', '游', '泳', '河', '湖', '清', '满', '汉', '没', '活', '法', '酒', '注']
    },
    {
      radical: '冫',
      standalone: '冰',
      variants: '冫 (hai chấm băng - bên trái)',
      name: 'Bộ Băng (Hai Chấm Băng)',
      pinyin: 'bīng',
      hanViet: 'băng',
      strokes: 2,
      position: 'Bên trái chữ',
      category: 'nature',
      meaning: 'Nước đá, băng giá, lạnh lẽo, mùa đông, tinh khiết, dứt khoát',
      origin: 'Hình 2 tinh thể băng đông cứng.',
      mnemonic: 'Chỉ có 2 chấm = Lạnh đóng băng hoặc dứt khoát như băng: lạnh (冷), nước đá (冰), mùa đông (冬), sạch tinh khiết (净), quyết định (决定), chuẩn bị (准备), tình huống (况).',
      confusableWith: {
        rad: '氵',
        name: 'Bộ Thủy (Ba chấm thủy)',
        tip: 'Nhớ mẹo đếm chấm: 2 chấm (冫) = Băng giá lạnh lẽo; 3 chấm (氵) = Nước lỏng!'
      },
      sampleChars: ['冷', '冰', '冬', '净', '决', '准', '况', '次']
    },
    {
      radical: '木',
      standalone: '木',
      variants: '木 (mộc - trái, dưới hoặc độc lập)',
      name: 'Bộ Mộc',
      pinyin: 'mù',
      hanViet: 'mộc',
      strokes: 4,
      position: 'Bên trái, dưới hoặc độc lập',
      category: 'nature',
      meaning: 'Cây cối, rừng, gỗ, đồ nội thất bằng gỗ, hoa quả',
      origin: 'Hình cái cây có cành ở trên và rễ ở dưới.',
      mnemonic: '1 cây là Mộc (木), 2 cây là rừng Lâm (林), 3 cây là rừng rậm Sâm (森). Đồ gỗ & cây cối: cây (树), bàn (桌), ghế (椅), cầu thang (梯), lầu (楼), trường học (校), kiểm tra (检查), ngọn (末), gốc (本), quả (果).',
      confusableWith: {
        rad: '禾 / 扌',
        name: 'Bộ Hòa (禾 - Lúa) & Bộ Thủ (扌 - Tay)',
        tip: '木 đỉnh thẳng; 禾 có thêm nét phẩy cong trên đỉnh như bông lúa cúi đầu; 扌 nét sổ có móc câu.'
      },
      sampleChars: ['木', '树', '末', '本', '果', '楼', '梯', '桌', '椅', '校', '样', '极', '根', '板', '检', '查', '楚', '条']
    },
    {
      radical: '日',
      standalone: '日',
      variants: '日 (nhật - 1 nét ngang giữa)',
      name: 'Bộ Nhật',
      pinyin: 'rì',
      hanViet: 'nhật',
      strokes: 4,
      position: 'Bên trái, trên hoặc dưới',
      category: 'nature',
      meaning: 'Mặt trời, ánh nắng, ban ngày, thời gian, các mùa',
      origin: 'Hình mặt trời tỏa sáng.',
      mnemonic: 'Chỉ có 1 nét ngang giữa là Mặt trời (日): trời nắng (晴), ngày mai/sáng (明 = nhật + nguyệt), sáng sớm (早), buổi tối (晚), hôm qua (昨), mùa xuân (春), cũ (旧), phơi nắng (晒).',
      confusableWith: {
        rad: '目',
        name: 'Bộ Mục (Con mắt)',
        tip: '日 có 1 nét ngang (Mặt trời: 晴 nắng); 目 có 2 nét ngang (Con mắt: 睛 con ngươi mắt).'
      },
      sampleChars: ['日', '晴', '明', '早', '晚', '昨', '春', '旧', '是', '易', '更', '最', '晒']
    },
    {
      radical: '火',
      standalone: '火',
      variants: '火 (hỏa - đứng trái) • 灬 (bốn chấm hỏa - nằm dưới đáy)',
      name: 'Bộ Hỏa & Bốn Chấm Hỏa (灬)',
      pinyin: 'huǒ',
      hanViet: 'hỏa',
      strokes: 4,
      position: 'Bên trái (火) hoặc dưới đáy chữ (灬)',
      category: 'nature',
      meaning: 'Ngọn lửa, sức nóng, đun nấu, chiếu sáng, đốt cháy',
      origin: 'Hình ngọn lửa bốc cao; khi nằm dưới đáy chữ biến thành 4 chấm lửa (灬).',
      mnemonic: 'Đứng trái là 火: lửa (火), đèn (灯), đốt/sốt (烧), rèn luyện (炼). Nằm đáy là 4 chấm lửa 灬: nóng (热), chiếu sáng (照), giờ/đốt (点), tự nhiên (然), con gấu (熊).',
      confusableWith: {
        rad: '氵',
        name: 'Bộ Thủy (Nước)',
        tip: '4 dấu chấm ở đáy chữ (灬) là LỬA đun bên dưới (热 nóng, 照 chiếu sáng), tuyệt đối không phải là nước!'
      },
      sampleChars: ['火', '灯', '烧', '炼', '热', '照', '点', '然', '熊', '黑']
    },
    {
      radical: '土',
      standalone: '土',
      variants: '土 (thổ - trái hoặc dưới)',
      name: 'Bộ Thổ',
      pinyin: 'tǔ',
      hanViet: 'thổ',
      strokes: 3,
      position: 'Bên trái hoặc phía dưới',
      category: 'nature',
      meaning: 'Đất đai, mặt đất, thành phố, địa điểm, biên giới, bụi bẩn',
      origin: 'Hình mầm cây mọc lên từ mặt đất (nét ngang dưới dài hơn nét ngang trên).',
      mnemonic: 'Liên quan đến đất đai và địa điểm: đất/địa điểm (地), thành phố (城), môi trường/biên giới (境), hỏng/đất lở (坏), ngồi trên đất (坐), sân bãi (场).',
      confusableWith: {
        rad: '士',
        name: 'Bộ Sĩ (Kẻ sĩ)',
        tip: '土 (Thổ - đất) nét ngang DƯỚI dài hơn nét trên; 士 (Sĩ: 声) nét ngang TRÊN dài hơn nét dưới!'
      },
      sampleChars: ['土', '地', '城', '境', '坏', '坐', '场', '块']
    },
    {
      radical: '艹',
      standalone: '草',
      variants: '艹 (thảo đầu - trên đỉnh)',
      name: 'Bộ Thảo (Thảo Đầu)',
      pinyin: 'cǎo',
      hanViet: 'thảo',
      strokes: 3,
      position: 'Trên đỉnh chữ',
      category: 'nature',
      meaning: 'Cỏ cây, hoa lá, rau quả, trà, dược thảo',
      origin: 'Hình hai mầm cỏ mọc vươn lên.',
      mnemonic: 'Đội mũ cỏ (艹) trên đầu là thực vật: cỏ (草), hoa (花), trà (茶), rau/món ăn (菜), màu xanh chàm (蓝), đốt/lễ tết (节), thuốc (药), chuối (蕉).',
      confusableWith: {
        rad: '⺮',
        name: 'Bộ Trúc (Tre trúc)',
        tip: '艹 chỉ có 3 nét (1 ngang cắt 2 sổ: cỏ hoa mềm 草, 茶, 菜); ⺮ có 6 nét (2 cụm lá tre: đồ tre cứng 筷, 箱, 算).'
      },
      sampleChars: ['草', '花', '茶', '菜', '蓝', '节', '药', '蕉']
    },
    {
      radical: '⺮',
      standalone: '竹',
      variants: '⺮ (trúc đầu - trên đỉnh) • 竹 (chữ độc lập)',
      name: 'Bộ Trúc',
      pinyin: 'zhú',
      hanViet: 'trúc',
      strokes: 6,
      position: 'Trên đỉnh chữ',
      category: 'nature',
      meaning: 'Cây tre, cây trúc, đồ đan bằng tre, bàn tính, sách thẻ tre',
      origin: 'Hình hai nhánh lá tre rủ xuống.',
      mnemonic: 'Đồ dùng làm bằng tre thời xưa: đôi đũa (筷 = tre + nhanh), cái thùng/vali (箱), tính toán (算), trả lời (答), cái giỏ (篮), nụ cười (笑).',
      confusableWith: {
        rad: '艹',
        name: 'Bộ Thảo (Cỏ)',
        tip: '⺮ gồm 2 chữ K nằm ngang đối xứng (6 nét); 艹 là 1 nét ngang cắt 2 nét sổ (3 nét).'
      },
      sampleChars: ['算', '答', '筷', '箱', '篮', '笑', '第']
    },
    {
      radical: '禾',
      standalone: '禾',
      variants: '禾 (hòa - trái hoặc trên)',
      name: 'Bộ Hòa',
      pinyin: 'hé',
      hanViet: 'hòa',
      strokes: 5,
      position: 'Bên trái hoặc phía trên',
      category: 'nature',
      meaning: 'Cây lúa, mùa màng, hạt giống, trồng trọt',
      origin: 'Hình cây lúa (木) có bông lúa trĩu nặng uốn cong trên đỉnh (丿).',
      mnemonic: 'Cây lúa (禾) gặp nắng lửa (火) là mùa Thu (秋); gieo trồng (种); mùa vụ (季); bí mật (秘); hòa hợp (和 = có lúa ăn vào miệng 口).',
      confusableWith: {
        rad: '木',
        name: 'Bộ Mộc (Cây gỗ)',
        tip: '禾 có thêm 1 nét phẩy nhỏ nằm nghiêng trên đỉnh như bông lúa cúi đầu.'
      },
      sampleChars: ['和', '秋', '种', '季', '秘']
    },
    {
      radical: '雨',
      standalone: '雨',
      variants: '雨 (vũ - trên đỉnh hoặc độc lập)',
      name: 'Bộ Vũ',
      pinyin: 'yǔ',
      hanViet: 'vũ',
      strokes: 8,
      position: 'Phía trên chữ',
      category: 'nature',
      meaning: 'Mưa, tuyết, mây, sương, hiện tượng thời tiết',
      origin: 'Hình những hạt mưa rơi từ vòm trời và đám mây xuống.',
      mnemonic: 'Bầu trời rơi xuống 4 hạt mưa: mưa (雨), tuyết (雪), cần thiết (需), số không/mưa lẻ tẻ (零).',
      confusableWith: {
        rad: '西',
        name: 'Bộ Tây',
        tip: '雨 có 4 dấu chấm hạt mưa bên trong.'
      },
      sampleChars: ['雨', '雪', '需', '零']
    },

    // ==================== 5. ĐỒ VẬT, NHÀ CỬA & ĐỜI SỐNG (objects_places) ====================
    {
      radical: '宀',
      standalone: '家',
      variants: '宀 (miên - mái nhà có chấm đỉnh)',
      name: 'Bộ Miên',
      pinyin: 'mián',
      hanViet: 'miên',
      strokes: 3,
      position: 'Trên đỉnh chữ',
      category: 'objects_places',
      meaning: 'Mái nhà kín, gia đình, phòng ốc, sự an toàn, yên định',
      origin: 'Hình mái nhà có ống khói/đỉnh nóc ở giữa và tường hai bên.',
      mnemonic: 'Dưới mái nhà (宀): có lợn (豕) là Gia đình (家); có phụ nữ (女) là An toàn (安); căn phòng (室), khách khứa (客), hoàn thành (完), quyết định (定), dung thứ (容), sợ/hại (害).',
      confusableWith: {
        rad: '冖',
        name: 'Bộ Mịch (Khăn trùm)',
        tip: '宀 (Miên) có 1 nét chấm trên đỉnh mái nhà (家, 安, 室); 冖 không có chấm đỉnh (写 viết).'
      },
      sampleChars: ['家', '安', '完', '定', '室', '客', '容', '害', '字', '实']
    },
    {
      radical: '广',
      standalone: '广',
      variants: '广 (nghiễm - mái hiên rộng)',
      name: 'Bộ Nghiễm',
      pinyin: 'guǎng',
      hanViet: 'nghiễm',
      strokes: 3,
      position: 'Bao phía trên và bên trái',
      category: 'objects_places',
      meaning: 'Mái hiên rộng, cửa hàng, nhà cửa, chiếc giường, sức khỏe',
      origin: 'Hình ngôi nhà lớn xây tựa vào sườn núi.',
      mnemonic: 'Không gian rộng dưới mái hiên (广): cửa hàng (店), chiếc giường gỗ (床), khỏe mạnh (康), nên/ứng (应), chỗ ngồi (座).',
      confusableWith: {
        rad: '厂 / 疒',
        name: 'Bộ Hán (厂) & Bộ Nạch (疒)',
        tip: '广 có 1 chấm trên đỉnh (nhà cửa: 店, 床, 康); 厂 không có chấm đỉnh (sườn núi/lịch sử: 历); 疒 có thêm 2 chấm mồ hôi bên trái (bệnh tật: 病, 疼).'
      },
      sampleChars: ['店', '床', '康', '应', '座', '度']
    },
    {
      radical: '衤',
      standalone: '衣',
      variants: '衤 (bộ Y đứng trái - 2 chấm phải) • 衣 (chữ độc lập)',
      name: 'Bộ Y (Quần Áo)',
      pinyin: 'yī',
      hanViet: 'y',
      strokes: 5,
      position: 'Bên trái (衤) hoặc phía dưới (衣)',
      category: 'objects_places',
      meaning: 'Quần áo, váy vóc, áo sơ mi, chăn đệm, tất vớ',
      origin: 'Biến thể đứng của chữ Y (衣 - chiếc áo cổ chéo có 2 tay áo).',
      mnemonic: 'CỰC QUAN TRỌNG: Bộ Y (衤) có 2 nét nhỏ bên phải (may áo phải có 2 ống tay): cái quần (裤), cái váy (裙), áo sơ mi (衬衫), cái chăn/bị (被), đôi tất (袜).',
      confusableWith: {
        rad: '礻',
        name: 'Bộ Thị (Lễ nghi/Thần linh)',
        tip: '衤 có 2 nét chấm/phẩy bên phải = Quần áo (裤, 裙, 衬衫, 被); 礻 chỉ có 1 chấm phải = Lễ nghi/Cúng tế (礼, 祝, 视)!'
      },
      sampleChars: ['衣', '裤', '裙', '衬', '衫', '被', '袜']
    },
    {
      radical: '礻',
      standalone: '示',
      variants: '礻 (bộ Thị đứng trái - 1 chấm phải) • 示 (chữ độc lập)',
      name: 'Bộ Thị (Lễ Nghi)',
      pinyin: 'shì',
      hanViet: 'thị',
      strokes: 4,
      position: 'Bên trái (礻) hoặc phía dưới (示)',
      category: 'objects_places',
      meaning: 'Bàn thờ, lễ nghi, quà tặng, lời chúc phúc, thần linh',
      origin: 'Biến thể đứng của chữ Thị (示 - bàn thờ cúng tế trời đất).',
      mnemonic: 'Chỉ có 1 chấm bên phải = Bàn thờ lễ nghi: lễ phép/quà tặng (礼物), chúc mừng (祝), nhìn/tivi (视), thần linh (神), hạnh phúc (福).',
      confusableWith: {
        rad: '衤',
        name: 'Bộ Y (Quần áo)',
        tip: 'Nhớ câu thần chú: "Thị lễ 1 chấm (礼, 祝) — Y áo 2 chấm (裤, 衬衫, 被)"!'
      },
      sampleChars: ['礼', '祝', '视', '神', '福', '社', '票']
    },
    {
      radical: '饣',
      standalone: '食',
      variants: '饣 (thực giản thể - bên trái) • 食 (chữ độc lập)',
      name: 'Bộ Thực',
      pinyin: 'shí',
      hanViet: 'thực',
      strokes: 3,
      position: 'Bên trái chữ',
      category: 'objects_places',
      meaning: 'Thức ăn, cơm nước, đồ uống, đói bụng, ăn no, nhà hàng',
      origin: 'Giản thể của chữ Thực (食 - bát cơm đầy có nắp đậy).',
      mnemonic: 'Mọi thứ liên quan đến ăn uống: bữa cơm (饭), đói bụng (饿), ăn no (饱), đồ uống (饮), nhà hàng/quán (馆), bánh (饼).',
      confusableWith: {
        rad: '钅',
        name: 'Bộ Kim (Kim loại)',
        tip: '饣 có 3 nét mềm mại (ăn uống: 饭, 饿, 饱, 饮); 钅 có 5 nét cứng cáp với 2 nét ngang giữa (kim loại: 钱, 银, 铁).'
      },
      sampleChars: ['饭', '饿', '饱', '饮', '馆', '饼']
    },
    {
      radical: '钅',
      standalone: '金',
      variants: '钅 (kim giản thể - bên trái) • 金 (chữ độc lập)',
      name: 'Bộ Kim',
      pinyin: 'jīn',
      hanViet: 'kim',
      strokes: 5,
      position: 'Bên trái chữ',
      category: 'objects_places',
      meaning: 'Kim loại, vàng bạc, tiền bạc, sắt thép, gương kính, đồng hồ',
      origin: 'Giản thể từ chữ Kim (金 - quặng kim loại dưới đất).',
      mnemonic: 'Đồ kim loại và tiền bạc: tiền (钱), bạc/ngân hàng (银), sắt/tàu điện ngầm (铁), kính/gương (镜), rèn luyện (锻), đồng hồ (钟), sai/mạ vàng (错).',
      confusableWith: {
        rad: '饣',
        name: 'Bộ Thực (Thức ăn)',
        tip: '钅 có 2 nét ngang và 1 nét sổ hất ở dưới như lưỡi kiếm kim loại.'
      },
      sampleChars: ['钱', '银', '铁', '镜', '锻', '钟', '错', '铅']
    },
    {
      radical: '纟',
      standalone: '糸',
      variants: '纟 (mịch giản thể - bên trái) • 糸 (dưới)',
      name: 'Bộ Mịch (Tơ Lụa)',
      pinyin: 'mì',
      hanViet: 'mịch',
      strokes: 3,
      position: 'Bên trái chữ',
      category: 'objects_places',
      meaning: 'Sợi tơ, dây thừng, dệt vải, màu sắc nhuộm vải, kết nối, cấp bậc',
      origin: 'Hình bó sợi tơ xoắn lại.',
      mnemonic: 'Dùng sợi tơ để nối kết hoặc nhuộm màu: trải qua (经), cấp bậc (级), kết thúc/kết hôn (结), cuối cùng (终), luyện tập (练), thành tích (绩), màu đỏ (红), màu xanh lá (绿), cho/cung cấp (给).',
      confusableWith: {
        rad: '幺',
        name: 'Bộ Yêu (Nhỏ)',
        tip: '纟 có nét hất ngang ở dưới cùng.'
      },
      sampleChars: ['经', '级', '结', '终', '练', '绩', '红', '绿', '给', '系', '续']
    },
    {
      radical: '车',
      standalone: '车',
      variants: '车 (xa - trái hoặc độc lập)',
      name: 'Bộ Xa',
      pinyin: 'chē',
      hanViet: 'xa',
      strokes: 4,
      position: 'Bên trái hoặc độc lập',
      category: 'objects_places',
      meaning: 'Xe cộ, bánh xe, phương tiện giao thông, so sánh nặng nhẹ',
      origin: 'Hình chiếc xe có bánh xe và trục xe.',
      mnemonic: 'Liên quan đến xe cộ: xe (车), chiếc xe (辆), nhẹ nhàng (轻), so sánh (较).',
      confusableWith: {
        rad: '东',
        name: 'Chữ Đông (Phía Đông)',
        tip: '车 không có hai chân phẩy-mác ở dưới như chữ Đông (东).'
      },
      sampleChars: ['车', '辆', '轻', '较']
    },
    {
      radical: '阝',
      standalone: '院',
      variants: '阝 (Trái: Bộ Phụ - gò đất • Phải: Bộ Ấp - vùng đất)',
      name: 'Bộ Phụ (Trái) & Bộ Ấp (Phải)',
      pinyin: 'fù / yì',
      hanViet: 'phụ / ấp',
      strokes: 2,
      position: 'Bên trái (Phụ) hoặc bên phải (Ấp)',
      category: 'objects_places',
      meaning: 'Gò đất, bậc thang, ánh nắng (Trái) • Vùng đất, thành thị, hàng xóm (Phải)',
      origin: 'Hình bậc thang sườn đồi (阜 -> 阝 trái) và vùng cư trú (邑 -> 阝 phải).',
      mnemonic: 'Quy tắc Đôi Tai (阝): Đứng TRÁI là gò đất/bậc thang: mặt trời/dương (阳), viện (院), trừ ra (除), gần/kèm (附), dì (阿). Đứng PHẢI là vùng đất/xóm làng: bưu điện (邮), hàng xóm (邻), đều/thủ đô (都).',
      confusableWith: {
        rad: '卩',
        name: 'Bộ Tiết (Đốt tre)',
        tip: '阝 có bụng uốn cong như vành tai; 卩 gấp góc vuông.'
      },
      sampleChars: ['阳', '院', '除', '附', '阿', '邻', '邮', '都', '那']
    },
    {
      radical: '囗',
      standalone: '国',
      variants: '囗 (vi - khung lớn bao quanh 4 phía)',
      name: 'Bộ Vi',
      pinyin: 'wéi',
      hanViet: 'vi',
      strokes: 3,
      position: 'Bao quanh 4 phía bên ngoài chữ',
      category: 'objects_places',
      meaning: 'Tường thành vây quanh, biên giới quốc gia, khu vườn, bản đồ',
      origin: 'Hình bức tường bao bọc bốn phía.',
      mnemonic: 'Khung tường lớn bao trọn chữ bên trong: đất nước (国 = tường bảo vệ ngọc 玉), công viên/vườn (园), bản đồ (图), quay về (回), nguyên nhân (因), khốn khó (困 = cây 木 bị nhốt trong tường).',
      confusableWith: {
        rad: '口',
        name: 'Bộ Khẩu (Cái miệng)',
        tip: '囗 to lớn ôm trọn chữ khác vào lòng (国, 园, 图); 口 nhỏ nhắn nằm bên cạnh chữ khác (喝, 吃, 唱).'
      },
      sampleChars: ['国', '园', '图', '回', '因', '困']
    },
    {
      radical: '门',
      standalone: '门',
      variants: '门 (môn - khung cửa)',
      name: 'Bộ Môn',
      pinyin: 'mén',
      hanViet: 'môn',
      strokes: 3,
      position: 'Bao ngoài 3 phía',
      category: 'objects_places',
      meaning: 'Cánh cửa, cổng, khoảng không gian, hỏi thăm, lắng nghe',
      origin: 'Hình hai cánh cửa mở ra.',
      mnemonic: 'Qua khung cửa (门): ánh nắng (日) lọt qua khe cửa là không gian/thời gian (间); ghé miệng (口) vào cửa để hỏi (问); ghé tai (耳) vào cửa để nghe tin tức (闻).',
      confusableWith: {
        rad: '冂',
        name: 'Bộ Quynh (Vùng biên)',
        tip: '门 có dấu chấm ở góc trên trái; 冂 là khung trơn (như trong 周, 网).'
      },
      sampleChars: ['门', '间', '问', '闻']
    },
    {
      radical: '贝',
      standalone: '贝',
      variants: '贝 (bối - trái hoặc dưới)',
      name: 'Bộ Bối',
      pinyin: 'bèi',
      hanViet: 'bối',
      strokes: 4,
      position: 'Bên trái hoặc phía dưới',
      category: 'objects_places',
      meaning: 'Vỏ sò tiền tệ cổ đại, tiền của, đắt đỏ, mua bán, thi đấu trao thưởng',
      origin: 'Hình vỏ sò biển (đồng tiền cổ của Trung Hoa).',
      mnemonic: 'Có vỏ sò (贝) là có tiền của/giải thưởng: đắt/quý giá (贵), thi đấu (赛), nhân viên (员), chúc mừng tặng quà (贺).',
      confusableWith: {
        rad: '见',
        name: 'Bộ Kiến (Nhìn thấy)',
        tip: '贝 nét cuối là chấm ngắn (tiền bạc: 贵, 赛); 见 nét cuối là sổ cong móc dài (nhìn thấy: 见, 觉).'
      },
      sampleChars: ['贵', '赛', '员']
    },
    {
      radical: '巾',
      standalone: '巾',
      variants: '巾 (cân - dưới hoặc trái)',
      name: 'Bộ Cân',
      pinyin: 'jīn',
      hanViet: 'cân',
      strokes: 3,
      position: 'Phía dưới hoặc bên trái',
      category: 'objects_places',
      meaning: 'Khăn vải, mũ nón, chợ búa, giúp đỡ, thường xuyên',
      origin: 'Hình chiếc khăn vải treo trên móc.',
      mnemonic: 'Đồ bằng vải vóc: cái mũ (帽), khăn/giúp đỡ (帮), thành thị/chợ (市), thường xuyên (常), tấm màn (帐).',
      confusableWith: {
        rad: '币',
        name: 'Chữ Tệ (Tiền tệ)',
        tip: '巾 không có nét phẩy trên đầu; 币 có thêm nét phẩy trên đỉnh.'
      },
      sampleChars: ['帽', '帮', '市', '常', '带']
    },
    {
      radical: '王',
      standalone: '王',
      variants: '王 (bộ Ngọc đứng trái) • 玉 (ngọc - độc lập)',
      name: 'Bộ Ngọc (Chữ Vương Trái)',
      pinyin: 'yù / wáng',
      hanViet: 'ngọc / vương',
      strokes: 4,
      position: 'Bên trái chữ',
      category: 'objects_places',
      meaning: 'Đá quý, ngọc bích, trân quý, mài giũa lý lẽ, vòng tròn',
      origin: 'Hình 3 viên ngọc xâu trên một sợi dây (khi đứng trái bỏ dấu chấm của chữ 玉 thành 王).',
      mnemonic: 'Khi đứng bên trái chữ, chữ 王 chính là Bộ Ngọc (đá quý): hiện ra lấp lánh (现), mài ngọc/lý lẽ (理), chia ngọc/lớp học (班), vòng ngọc/môi trường (环).',
      confusableWith: {
        rad: '土',
        name: 'Bộ Thổ (Đất)',
        tip: '王 có 3 nét ngang; 土 chỉ có 2 nét ngang.'
      },
      sampleChars: ['现', '理', '班', '环', '玩']
    },
    {
      radical: '马',
      standalone: '马',
      variants: '马 (mã - trái, dưới hoặc độc lập)',
      name: 'Bộ Mã',
      pinyin: 'mǎ',
      hanViet: 'mã',
      strokes: 3,
      position: 'Bên trái, dưới hoặc độc lập',
      category: 'objects_places',
      meaning: 'Con ngựa, cưỡi ngựa, chạy nhanh, lập tức',
      origin: 'Hình con ngựa với bờm ngựa, bốn chân và đuôi.',
      mnemonic: 'Liên quan đến ngựa và tốc độ: con ngựa/ngay lập tức (马上), cưỡi ngựa/đạp xe (骑), mẹ (妈 - mượn âm), mắng (骂).',
      confusableWith: {
        rad: '鸟',
        name: 'Bộ Điểu (Con chim)',
        tip: '马 không có chấm mắt và nét phẩy trên đỉnh đầu như con chim (鸟).'
      },
      sampleChars: ['马', '骑', '妈']
    },
    {
      radical: '牜',
      standalone: '牛',
      variants: '牜 (ngưu đứng trái) • 牛 (độc lập)',
      name: 'Bộ Ngưu',
      pinyin: 'niú',
      hanViet: 'ngưu',
      strokes: 4,
      position: 'Bên trái hoặc độc lập',
      category: 'objects_places',
      meaning: 'Con trâu, con bò, sữa bò, sự vật, đặc biệt',
      origin: 'Hình đầu trâu bò với hai chiếc sừng cong lên.',
      mnemonic: 'Con bò (牛): sữa bò (牛奶), đồ vật/sự vật (物), đặc biệt (特别).',
      confusableWith: {
        rad: '午',
        name: 'Chữ Ngọ (Buổi trưa)',
        tip: '牛 nét sổ đâm xuyên lên đỉnh đầu; 午 nét sổ không đâmทะลุ nét trên.'
      },
      sampleChars: ['牛', '物', '特']
    }
  ];

  // 10 Confusable Radical Pairs for Tab 3 ("Soi Kính Hiển Vi Cặp Bộ Thủ Sinh Đôi")
  const CONFUSABLE_PAIRS = [
    {
      id: 'pair_water_ice',
      title: '1. Bộ Thủy 氵 (3 chấm) vs Bộ Băng 冫 (2 chấm)',
      left: {
        rad: '氵',
        name: 'Bộ Thủy (Ba chấm thủy)',
        meaning: 'Nước lỏng, sông hồ, tắm giặt, khát nước',
        rule: 'Có 3 giọt chấm-hất = Nước ở thể lỏng',
        examples: ['渴 (khát nước)', '洗澡 (tắm rửa)', '河 (con sông)', '游泳 (bơi lội)', '清楚 (trong sạch/rõ)']
      },
      right: {
        rad: '冫',
        name: 'Bộ Băng (Hai chấm băng)',
        meaning: 'Nước đá, lạnh giá, mùa đông, quyết đoán',
        rule: 'Chỉ có 2 giọt = Đông cứng thành băng hoặc dứt khoát',
        examples: ['冷 (lạnh)', '冰 (băng đá)', '冬 (mùa đông)', '干净 (sạch tinh khiết)', '决定 (quyết định)']
      },
      memoryHack: 'Đếm số chấm bên trái: 3 giọt (氵) là nước chảy; 2 giọt (冫) là trời lạnh đóng băng!'
    },
    {
      id: 'pair_cloth_spirit',
      title: '2. Bộ Y 衤 (Quần áo - 2 chấm phải) vs Bộ Thị 礻 (Lễ nghi - 1 chấm phải)',
      left: {
        rad: '衤',
        name: 'Bộ Y (Biến thể của 衣)',
        meaning: 'Quần áo, váy, sơ mi, chăn đệm, tất',
        rule: 'Có 2 nét nhỏ bên phải (tượng trưng 2 ống tay áo)',
        examples: ['裤子 (cái quần)', '衬衫 (áo sơ mi)', '裙子 (cái váy)', '被 (cái chăn)', '袜子 (đôi tất)']
      },
      right: {
        rad: '礻',
        name: 'Bộ Thị (Biến thể của 示)',
        meaning: 'Bàn thờ, lễ nghi, chúc phúc, thần linh',
        rule: 'Chỉ có 1 nét chấm bên phải (bàn thờ cúng tế)',
        examples: ['礼物 (quà/lễ vật)', '祝 (chúc mừng)', '电视 (tivi/thị giác)', '神 (thần linh)', '福 (hạnh phúc)']
      },
      memoryHack: 'Câu thần chú bất bại: "Thị lễ 1 chấm (礻: 礼, 祝) — Y áo 2 chấm (衤: 裤, 衬衫, 被)"!'
    },
    {
      id: 'pair_sun_eye',
      title: '3. Bộ Nhật 日 (1 ngang giữa) vs Bộ Mục 目 (2 ngang giữa)',
      left: {
        rad: '日',
        name: 'Bộ Nhật (Mặt trời)',
        meaning: 'Mặt trời, ánh nắng, ngày tháng, thời gian',
        rule: 'Chỉ có 1 nét ngang ở giữa khung',
        examples: ['晴天 (trời nắng)', '明天 (ngày mai)', '早上 (sáng sớm)', '春 (mùa xuân)', '晒 (phơi nắng)']
      },
      right: {
        rad: '目',
        name: 'Bộ Mục (Con mắt)',
        meaning: 'Con mắt, nhìn ngắm, ngủ nghỉ, chân thật',
        rule: 'Có 2 nét ngang ở giữa khung (như con ngươi mắt)',
        examples: ['眼睛 (con mắt)', '睡觉 (ngủ)', '看 (nhìn)', '真正 (chân thật)', '一直 (thẳng suốt)']
      },
      memoryHack: 'Trời chỉ có 1 Mặt trời (日 = 1 nét ngang: 晴 nắng); Mắt có 2 mí mắt (目 = 2 nét ngang: 睛 con mắt)!'
    },
    {
      id: 'pair_person_step',
      title: '4. Bộ Nhân Đứng 亻 (1 phẩy) vs Bộ Xích 彳 (2 phẩy)',
      left: {
        rad: '亻',
        name: 'Bộ Nhân Đứng (Con người)',
        meaning: 'Con người, đại từ, tư thế của người',
        rule: 'Chỉ có 1 nét phẩy ở trên + 1 nét sổ thẳng',
        examples: ['他 (anh ấy)', '休息 (nghỉ ngơi)', '身体 (cơ thể)', '相信 (tin tưởng)', '借 (mượn)']
      },
      right: {
        rad: '彳',
        name: 'Bộ Xích (Bước chân trái)',
        meaning: 'Bước chân đi lại trên đường phố, hành trình',
        rule: 'Có 2 nét phẩy song song ở trên + 1 nét sổ',
        examples: ['很 (rất)', '得 (đạt được/phải)', '银行 (ngân hàng)', '街道 (đường phố)', '往 (hướng về)']
      },
      memoryHack: '1 phẩy (亻) là 1 người đứng yên; 2 phẩy (彳) là 2 chân bước đi trên đường!'
    },
    {
      id: 'pair_hand_tree_grain',
      title: '5. Bộ Thủ 扌 (Tay) vs Bộ Mộc 木 (Cây) vs Bộ Hòa 禾 (Lúa)',
      left: {
        rad: '扌',
        name: 'Bộ Thủ / Tài Gảy (Cái tay)',
        meaning: 'Bàn tay cầm, nắm, đánh, quét, đổi, chuyển',
        rule: 'Nét sổ có móc câu ở đáy + nét dưới hất chéo lên',
        examples: ['打扫 (quét dọn)', '把 (cầm/đem)', '搬 (chuyển dọn)', '换 (đổi)', '接 (đón)']
      },
      right: {
        rad: '木 / 禾',
        name: 'Bộ Mộc (木 - Cây) & Bộ Hòa (禾 - Lúa)',
        meaning: 'Cây gỗ, đồ gỗ (木) • Cây lúa, mùa màng (禾)',
        rule: 'Có 2 nét phẩy-mác như rễ cây (禾 thêm bông lúa cúi đầu ở đỉnh)',
        examples: ['树 (cây)', '桌子 (cái bàn)', '检查 (kiểm tra)', '秋 (mùa thu)', '种 (trồng cây)']
      },
      memoryHack: 'Cái tay (扌) co ngón móc lên để cầm nắm; Cái cây (木) cắm rễ phẩy-mác xuống đất!'
    },
    {
      id: 'pair_bamboo_grass',
      title: '6. Bộ Trúc ⺮ (Tre trúc - 6 nét) vs Bộ Thảo 艹 (Cỏ hoa - 3 nét)',
      left: {
        rad: '⺮',
        name: 'Bộ Trúc (Tre trúc)',
        meaning: 'Tre trúc, đũa tre, thùng/vali, bàn tính, trả lời',
        rule: 'Gồm 2 cụm lá tre hình chữ K nằm ngang (6 nét)',
        examples: ['筷子 (đôi đũa)', '行李箱 (vali)', '打算 (dự định)', '回答 (trả lời)', '笑 (cười)']
      },
      right: {
        rad: '艹',
        name: 'Bộ Thảo (Cỏ cây)',
        meaning: 'Cỏ, hoa, lá trà, rau củ, trái cây, thuốc',
        rule: '1 nét ngang cắt qua 2 nét sổ ngắn (3 nét)',
        examples: ['草 (cỏ)', '花 (hoa)', '茶 (trà)', '菜 (rau/món ăn)', '蓝 (xanh lam)']
      },
      memoryHack: 'Đồ vật cứng đan bằng tre dùng ⺮ (筷 đũa, 箱 thùng); Cỏ hoa lá mềm mại dùng 艹 (草 cỏ, 茶 trà)!'
    },
    {
      id: 'pair_mouth_enclosure',
      title: '7. Bộ Khẩu 口 (Miệng nhỏ) vs Bộ Vi 囗 (Tường vây lớn)',
      left: {
        rad: '口',
        name: 'Bộ Khẩu (Cái miệng)',
        meaning: 'Miệng ăn, uống, hát, khóc, gọi, hỏi',
        rule: 'Ô vuông nhỏ nằm bên trái hoặc dưới chữ khác',
        examples: ['喝 (uống)', '吃 (ăn)', '哭 (khóc)', '唱 (hát)', '嘴 (miệng)']
      },
      right: {
        rad: '囗',
        name: 'Bộ Vi (Tường thành vây quanh)',
        meaning: 'Biên giới đất nước, khu vườn, bản đồ, bao vây',
        rule: 'Khung vuông lớn bao bọc trọn vẹn chữ khác ở bên trong',
        examples: ['国家 (đất nước)', '公园 (công viên)', '地图 (bản đồ)', '回答 (quay về/trả lời)', '因为 (bởi vì)']
      },
      memoryHack: 'Khẩu (口) nhỏ là cái miệng nằm cạnh chữ; Vi (囗) to là bức tường ôm chữ vào lòng!'
    },
    {
      id: 'pair_roof_shelter_sickness',
      title: '8. Bộ Miên 宀 (Nhà kín) vs Bộ Nghiễm 广 (Hiên rộng) vs Bộ Nạch 疒 (Giường bệnh)',
      left: {
        rad: '宀 / 广',
        name: 'Bộ Miên (宀) & Bộ Nghiễm (广)',
        meaning: 'Gia đình, phòng ốc (宀) • Cửa hàng, giường, sức khỏe (广)',
        rule: '宀 che kín 2 bên; 广 mở trống bên phải, không có chấm trái',
        examples: ['家 (nhà)', '教室 (phòng học)', '安静 (yên tĩnh)', '商店 (cửa hàng)', '健康 (khỏe mạnh)']
      },
      right: {
        rad: '疒',
        name: 'Bộ Nạch (Bệnh tật)',
        meaning: 'Ốm đau, bệnh tật, đau nhức, gầy gò',
        rule: 'Giống 广 nhưng có thêm 2 nét chấm-hất bên trái (mồ hôi bệnh)',
        examples: ['生病 (bị ốm)', '头疼 (đau đầu)', '瘦 (gầy)', '病房 (phòng bệnh)']
      },
      memoryHack: 'Thấy mái nhà có 2 giọt mồ hôi bên trái (疒) là đang nằm viện (病, 疼, 瘦)!'
    },
    {
      id: 'pair_food_metal',
      title: '9. Bộ Thực 饣 (Thức ăn - 3 nét) vs Bộ Kim 钅 (Kim loại - 5 nét)',
      left: {
        rad: '饣',
        name: 'Bộ Thực (Ăn uống)',
        meaning: 'Cơm, đồ uống, đói, no, nhà hàng',
        rule: 'Chỉ có 3 nét, bụng dưới trống thoáng',
        examples: ['米饭 (cơm)', '饿 (đói)', '饱 (no)', '饮料 (đồ uống)', '饭馆 (nhà hàng)']
      },
      right: {
        rad: '钅',
        name: 'Bộ Kim (Kim loại & Tiền bạc)',
        meaning: 'Tiền, bạc, sắt thép, gương kính, đồng hồ',
        rule: 'Có 5 nét với 2 nét ngang cắt qua nét sổ dọc',
        examples: ['钱 (tiền)', '银行 (ngân hàng)', '地铁 (tàu điện ngầm)', '眼镜 (kính mắt)', '锻炼 (rèn luyện)']
      },
      memoryHack: 'Thực (饣) 3 nét mềm như bát cơm; Kim (钅) 5 nét sắc nhọn như thanh kiếm sắt!'
    },
    {
      id: 'pair_knife_power',
      title: '10. Bộ Đao 刀/刂 (Con dao) vs Bộ Lực 力 (Sức mạnh)',
      left: {
        rad: '刀 / 刂',
        name: 'Bộ Đao (Con dao cắt)',
        meaning: 'Cắt, chia, khắc, cạo, chải, sắc bén',
        rule: 'Nét phẩy của 刀 bắt đầu từ nét ngang, KHÔNG nhô đầu lên trên',
        examples: ['分 (chia/phút)', '别人 (người khác)', '刮风 (gió thổi)', '刷牙 (đánh răng)', '一刻 (15 phút)']
      },
      right: {
        rad: '力',
        name: 'Bộ Lực (Sức lực cơ bắp)',
        meaning: 'Sức mạnh, vận động, nỗ lực, giải quyết',
        rule: 'Đầu nét phẩy đâm xuyên nhô cao lên trên nét ngang',
        examples: ['运动 (vận động)', '努力 (nỗ lực)', '办法 (cách giải quyết)', '参加 (tham gia)']
      },
      memoryHack: 'Lực (力) nhô đầu lên trên như cánh tay gồng cơ bắp; Đao (刀) bằng đầu như sống dao!'
    }
  ];

  // ============================================================================
  // COMPLETE 214 KANGXI RADICALS (TRỌN BỘ 214 BỘ THỦ KHANG HY CHUẨN #1 - #214)
  // Format: [kangxiId, radical, variants, pinyin, hanViet, strokes, meaning, sampleCharsCSV, mnemonic]
  // ============================================================================
  const KANGXI_214_RAW = [
    // --- 1 NÉT (#1 - #6) ---
    [1, '一', '', 'yī', 'nhất', 1, 'Số một, thứ nhất, sự khởi đầu, ngang bằng', '一,三,上,下,万,丈', 'Một nét gạch ngang duy nhất biểu thị số 1 hoặc đường chân trời.'],
    [2, '丨', '', 'gǔn', 'cổn', 1, 'Nét sổ thẳng từ trên xuống, xuyên suốt', '中,串,丰,书', 'Một nét sổ dọc đâm xuyên qua tâm chữ Trung (中 - ở giữa).'],
    [3, '丶', '', 'zhǔ', 'chủ', 1, 'Điểm chấm, ngọn đèn bấc lửa', '主,太,头,为,永', 'Chấm lửa trên ngọn đèn dầu tạo thành chữ Chủ (主).'],
    [4, '丿', '', 'piě', 'phiệt', 1, 'Nét phẩy nghiêng từ phải sang trái', '久,么,之,乎,乘,年', 'Nét phẩy mềm mại vuốt nghiêng sang trái.'],
    [5, '乙', '乚,乛', 'yǐ', 'ất', 1, 'Can Ất, vị trí thứ hai, mầm cây uốn cong vươn lên', '乙,九,也,习,买,乱,乳', 'Nét uốn cong mềm dẻo như mầm cây vươn lên mặt đất.'],
    [6, '亅', '', 'jué', 'quyết', 1, 'Nét sổ có móc câu ở đáy', '了,才,事,求,争,予', 'Nét sổ thẳng có chiếc móc câu ngược ở dưới đáy (như chữ 了).'],
    // --- 2 NÉT (#7 - #29) ---
    [7, '二', '', 'èr', 'nhị', 2, 'Số hai, đôi, trời và đất song hành', '二,五,云,些,互,井', 'Hai nét gạch ngang song song biểu thị số 2 (trời trên, đất dưới).'],
    [8, '亠', '', 'tóu', 'đầu', 2, 'Phần đầu, mái đậy phía trên chữ', '亡,交,京,亲,亮,高,享', 'Một chấm trên một nét ngang như cái nắp đậy trên đỉnh chữ (京, 亮, 高).'],
    [9, '人', '亻,𠆢', 'rén', 'nhân', 2, 'Con người, nhân loại, đại từ và hành vi con người', '人,他,你,们,休,体,信,作,住,借', 'Hình người đứng thẳng (人) hoặc đứng nghiêng bên trái chữ (亻).'],
    [10, '儿', '', 'ér', 'nhi', 2, 'Đứa trẻ, con trai, đôi chân người phía dưới chữ', '儿,先,元,光,兄,免,克,允', 'Đôi chân người nâng đỡ phía dưới chữ Tiên (先), Quang (光), Nguyên (元).'],
    [11, '入', '', 'rù', 'nhập', 2, 'Đi vào, thu nhập, thâm nhập', '入,全,内,两', 'Nét mác phải đè lên nét phẩy trái như bước chân đi vào trong.'],
    [12, '八', '丷', 'bā', 'bát', 2, 'Số tám, phân chia, tách rời sang hai bên', '八,公,六,共,关,兴,兵,典', 'Hai nét phẩy mác tách rời nhau biểu thị sự chia tách và số 8.'],
    [13, '冂', '', 'jiōng', 'quynh', 2, 'Vùng biên giới xa, khung bao ba phía (trống đáy)', '同,网,周,用,冈,内', 'Khung vây ba mặt trên-trái-phải như tấm lưới (网) hoặc chữ Đồng (同).'],
    [14, '冖', '', 'mì', 'mịch', 2, 'Khăn trùm lên trên, che đậy', '写,军,冠,农,冤', 'Mái khăn trùm không có chấm trên đầu: Viết (写), Quân đội (军), Quán quân (冠).'],
    [15, '冫', '', 'bīng', 'băng', 2, 'Nước đá, băng giá, lạnh lẽo, mùa đông, quyết đoán', '冰,冷,冬,净,决,准,凉,冻', 'Hai giọt nước đông cứng thành băng giá mùa đông (冷 lạnh, 冰 băng, 冬 đông).'],
    [16, '几', '', 'jī', 'kỷ', 2, 'Cái bàn trà nhỏ, ghế đôn, mấy/bao nhiêu', '几,风,机,朵,凭,凡', 'Hình chiếc bàn nhỏ có hai chân cong: Mấy (几个), Bàn (茶几), Cơn gió (风).'],
    [17, '凵', '', 'kǎn', 'khảm', 2, 'Hố sâu, cái hộp há miệng hứng phía trên', '凶,出,画,函,击', 'Hình cái hố sâu mở miệng lên trên như khung dưới chữ Xuất (出), Họa (画).'],
    [18, '刀', '刂,⺈', 'dāo', 'đao', 2, 'Con dao, vũ khí sắc bén, cắt, chia, khắc, chải', '刀,分,切,别,到,刻,刷,刮,利', 'Hình con dao (刀) hoặc lưỡi dao dựng đứng bên phải chữ (刂: 到, 刻, 刷).'],
    [19, '力', '', 'lì', 'lực', 2, 'Sức mạnh cơ bắp, nỗ lực, vận động, giải quyết', '力,办,加,动,努,勇,劳,助', 'Hình cánh tay gồng cơ bắp: Nỗ lực (努力), Vận động (运动), Cách làm (办法).'],
    [20, '勹', '', 'bāo', 'bao', 2, 'Bao bọc, gói ghém, ôm vào lòng', '包,勺,句,勿,匆,匀', 'Hình dáng người cúi xuống vòng tay ôm gói đồ vật (包 cái túi/bánh bao, 勺 cái thìa).'],
    [21, '匕', '', 'bǐ', 'chủy', 2, 'Cái thìa/muỗng, dao găm ngắn, biến đổi', '匕,北,比,化,匙,疑', 'Hình chiếc thìa múc canh (钥匙 chìa khóa/thìa) hoặc người xoay lưng (北 Bắc, 化 Hóa).'],
    [22, '匚', '', 'fāng', 'phương', 2, 'Cái tủ, hộp vuông mở nắp bên phải', '医,区,匹,巨,匠,匪', 'Hình chiếc hộp đựng đồ mở bên phải như hộp dụng cụ y tế (医 bác sĩ/y viện).'],
    [23, '匸', '', 'xì', 'hệ', 2, 'Che giấu, cất giấu kín đáo (nhập chung với 匚 trong giản thể)', '区,匹,医,匿', 'Khung che đậy vật được cất giấu bên trong (khu vực 区, ẩn nấp 匿).'],
    [24, '十', '', 'shí', 'thập', 2, 'Số mười, chữ thập, bốn phương tám hướng, đầy đủ', '十,千,午,半,华,南,协,博', 'Nét ngang (Đông-Tây) giao nét sổ (Bắc-Nam) tạo thành số 10 trọn vẹn.'],
    [25, '卜', '⺊', 'bǔ', 'bốc', 2, 'Xem bói, vết nứt trên mai rùa khi bói toán', '卜,占,卡,卢,卧,外,处', 'Vết nứt dọc ngang trên mai rùa nướng lửa khi xem bói thời cổ (占 chiếm/bói, 外 ngoài).'],
    [26, '卩', '㔾', 'jié', 'tiết', 2, 'Đốt tre làm ấn tín, người quỳ gối tuân lệnh', '卫,印,危,即,却,卷,卵', 'Hình nửa con dấu bằng đốt tre hoặc người đang quỳ gối (危 nguy hiểm, 印 con dấu).'],
    [27, '厂', '', 'hàn', 'hán', 2, 'Sườn núi đá nhô ra, nhà xưởng rộng', '厂,历,厅,压,厚,原,厨,厌', 'Vách đá nhô ra tạo chỗ trú: Lịch sử (历史), Phòng khách (客厅), Nhà bếp (厨房).'],
    [28, '厶', '', 'sī', 'khổ / tư', 2, 'Riêng tư, cá nhân, cuộn tơ cánh tay', '去,参,台,云,私,县', 'Hình vòng khép kín chỉ sự riêng tư (私) hoặc tham gia (参加).'],
    [29, '又', '', 'yòu', 'hựu', 2, 'Bàn tay phải, lại nữa, lặp lại hành động', '又,友,双,发,取,受,叔,欢', 'Hình bàn tay phải: Hai tay nắm nhau thành Bạn bè (友), hai tay cùng cầm là Đôi (双).'],
    // --- 3 NÉT (#30 - #60) ---
    [30, '口', '', 'kǒu', 'khẩu', 3, 'Cái miệng, ăn uống, ca hát, khóc, gọi, hỏi', '口,吃,喝,唱,哭,叫,问,号,嘴', 'Hình cái miệng đang mở để ăn (吃), uống (喝), hát (唱), khóc (哭), hỏi (问).'],
    [31, '囗', '', 'wéi', 'vi', 3, 'Tường thành bao vây bốn phía, biên giới quốc gia, khu vườn', '国,园,图,回,因,困,圈,固', 'Khung vuông lớn bao trọn bên ngoài chữ: Quốc gia (国家), Công viên (公园), Bản đồ (地图).'],
    [32, '土', '', 'tǔ', 'thổ', 3, 'Đất đai, bùn đất, địa điểm, công trình xây dựng', '土,地,在,坐,城,坏,块,场,墙', 'Mầm cây mọc lên từ hai tầng đất: Mặt đất (地), Thành phố (城), Quảng trường (场).'],
    [33, '士', '', 'shì', 'sĩ', 3, 'Học trò, kẻ sĩ, người có học thức, chiến sĩ, âm thanh', '士,声,壮,处,壶,吉,壳', 'Nét ngang trên dài hơn nét ngang dưới (ngược với 土): Âm thanh (声音), Cường tráng (壮).'],
    [34, '夂', '', 'zhǐ', 'truy', 3, 'Bước chân theo sau từ phía sau', '冬,处,备,复,夏,各', 'Hình bàn chân bước chậm rãi theo sau: Mùa đông (冬), Chuẩn bị (备), Ôn tập (复).'],
    [35, '夊', '', 'suī', 'tuy', 3, 'Bước đi chậm chạp, kéo lê chân', '夏,复,爱,凌,俊', 'Hình bàn chân bước đi thong thả dưới chữ Mùa hè (夏), Yêu thương (爱).'],
    [36, '夕', '', 'xī', 'tịch', 3, 'Buổi chiều tà, ban đêm, trăng khuyết, nhiều', '夕,外,多,夜,够,梦', 'Hình vầng trăng khuyết lúc hoàng hôn: Ban đêm (夜), Giấc mơ (梦), Nhiều (多).'],
    [37, '大', '', 'dà', 'đại', 3, 'To lớn, vĩ đại, người trưởng thành dang rộng tay chân', '大,太,天,夫,头,奇,奖,套', 'Hình người đứng dang rộng hai tay hai chân: To lớn (大), Bầu trời (天), Kỳ lạ (奇).'],
    [38, '女', '', 'nǚ', 'nữ', 3, 'Phụ nữ, con gái, thành viên nữ trong gia đình, hôn nhân', '女,好,妈,姐,妹,奶,姨,婚,姑', 'Hình người phụ nữ đoan trang: Mẹ (妈), Chị (姐), Em gái (妹), Bà (奶), Kết hôn (婚).'],
    [39, '子', '孑,孒', 'zǐ', 'tử', 3, 'Con cái, đứa trẻ, hạt giống, hậu tố danh từ đồ vật', '子,字,学,孩,季,孙,孝,孤', 'Hình em bé giơ hai tay: Đứa trẻ (孩子), Học tập (学习), Chữ viết (汉字), Mùa (季节).'],
    [40, '宀', '', 'mián', 'miên', 3, 'Mái nhà có tường che kín hai bên, gia đình, phòng ốc, yên tĩnh', '家,室,安,完,客,定,宝,宾,宿', 'Hình mái nhà có ống khói và hai tường bao: Gia đình (家), Phòng học (教室), Yên tĩnh (安静).'],
    [41, '寸', '', 'cùn', 'thốn', 3, 'Đơn vị đo (1 tấc), phép tắc, bàn tay bắt mạch', '寸,对,导,封,射,尊,将,寻', 'Bàn tay có dấu chấm chỉ vị trí huyệt mạch ở cổ tay: Đúng/Đối (对), Tôn trọng (尊).'],
    [42, '小', '⺌,⺍', 'xiǎo', 'tiểu', 3, 'Nhỏ bé, ít ỏi, hạt cát nhỏ', '小,少,尖,尘,尚,尝,光,常', 'Ba hạt nhỏ tách rời: Trên nhỏ (小) dưới lớn (大) là Nhọn (尖); Nhỏ (小) + đất (土) là Bụi (尘).'],
    [43, '尢', '尣,尤', 'wāng', 'uông', 3, 'Người đi khập khiễng, cong chân, đặc biệt', '尤,就,尴,尬', 'Hình người có một chân bước lệch: Đặc biệt (尤其), Ngay lập tức/Thì (就).'],
    [44, '尸', '', 'shī', 'thi', 3, 'Cơ thể người nằm/ngồi, mái tầng nhà, cái đuôi, thước đo', '尺,尽,尾,局,居,屋,层,展', 'Hình người ngồi hoặc mái nhà nhiều tầng: Tầng lầu (层), Cư trú (居), Căn phòng (屋).'],
    [45, '屮', '', 'chè', 'triệt', 3, 'Mầm cỏ mới nhú lên khỏi mặt đất', '出,屯,逆,茁', 'Hình mầm non vừa đâm chồi có hai nhánh lá hai bên.'],
    [46, '山', '', 'shān', 'sơn', 3, 'Núi non, đỉnh núi, hòn đảo, bờ biển', '山,岁,岛,岸,峰,崇,岩,峡', 'Hình 3 đỉnh núi nhấp nhô: Núi (山), Tuổi (岁), Hòn đảo (岛), Bờ biển (岸).'],
    [47, '巛', '川', 'chuān', 'xuyên', 3, 'Sông ngòi, dòng nước chảy cuồn cuộn', '川,州,巡,顺,巢', 'Hình 3 dòng nước sông uốn lượn chảy song song: Dòng sông (川), Thuận lợi (顺).'],
    [48, '工', '', 'gōng', 'công', 3, 'Công việc, người thợ, thước đo chữ T, khéo léo, bên trái', '工,左,巧,差,巨,贡,项', 'Hình chiếc thước thợ xây chữ T: Công việc (工作), Bên trái (左边), Kém/Thiếu (差).'],
    [49, '己', '已,巳', 'jǐ', 'kỷ', 3, 'Bản thân mình, tự mình; phân biệt với Dĩ (已) và Tỵ (巳)', '己,已,巳,记,起,改,包,导', 'Kỷ (己 - tự mình) mở miệng; Dĩ (已 - đã) hé nửa miệng; Tỵ (巳) đóng kín miệng.'],
    [50, '巾', '', 'jīn', 'cân', 3, 'Khăn vải, mũ, rèm, cờ, chợ búa, giúp đỡ', '巾,帽,帮,带,市,师,布,帐,席', 'Hình chiếc khăn vải treo rủ xuống: Cái mũ (帽子), Giúp đỡ (帮忙), Mang theo (带).'],
    [51, '干', '', 'gān', 'can', 3, 'Khô ráo, sạch sẽ, làm việc, năm tháng, bình an', '干,平,年,并,幸,岸,汗', 'Hình chạc cây phòng vệ: Sạch sẽ (干净), Năm (年), Bình an (平), Hạnh phúc (幸福).'],
    [52, '幺', '乡', 'yāo', 'yêu', 3, 'Nhỏ nhắn, sợi tơ mảnh nhỏ mới se', '幺,幼,乡,幻,幽,几', 'Hình cuộn tơ cực nhỏ mới kéo ra từ kén tằm: Nhỏ tuổi (幼), Quê hương (乡).'],
    [53, '广', '', 'guǎng', 'nghiễm', 3, 'Mái nhà rộng mở bên sườn núi, cửa hàng, giường, sức khỏe', '广,店,床,座,庭,度,康,应,厨', 'Mái hiên rộng mở bên phải: Cửa hàng (商店), Giường (床), Chỗ ngồi (座位), Khỏe mạnh (健康).'],
    [54, '廴', '', 'yǐn', 'dẫn', 3, 'Bước đi dài, kéo dài hành trình, xây dựng', '建,延,廷', 'Bước đi vươn dài (không có chấm trên như 辶): Xây dựng (建设), Kéo dài (延).'],
    [55, '廾', '', 'gǒng', 'củng', 3, 'Hai bàn tay chắp lại dâng vật lên', '开,弄,异,弃,弊', 'Hình hai bàn tay cùng giơ lên mở cửa (开) hoặc làm/chơi (弄).'],
    [56, '弋', '', 'yì', 'dặc', 3, 'Cọc gỗ buộc dây bắn tên, quy tắc mẫu mực', '式,代,武,贰', 'Hình chiếc cọc đóng xuống đất làm chuẩn mực: Hình thức/Kiểu (正式, 方式), Thời đại (代).'],
    [57, '弓', '', 'gōng', 'cung', 3, 'Cây cung bắn tên, uốn cong, co giãn, anh em', '弓,张,引,弟,弱,强,弹,弯', 'Hình cánh cung uốn cong: Mở/Tờ (张), Em trai (弟弟), Mạnh mẽ (强), Yếu (弱).'],
    [58, '彐', '彑,⺕', 'jì', 'kệ', 3, 'Đầu nhím, bàn tay cầm chổi quét, ghi chép', '归,当,录,雪,扫,妇,寻', 'Hình bàn tay cầm chổi trong chữ Quét dọn (打扫), Tuyết (雪), Ghi chép (记录).'],
    [59, '彡', '', 'shān', 'sam', 3, 'Lông dài, tóc dài, nét vẽ trang trí, bóng hình, màu sắc', '影,彩,形,须,衫,彦,彭', 'Ba nét phẩy song song như vệt sáng tối hoặc họa tiết: Điện ảnh/Bóng (电影), Màu sắc (色彩).'],
    [60, '彳', '', 'chì', 'xích', 3, 'Bước chân trái, đi lại trên đường phố, hành trình', '很,得,行,往,待,街,律,彻', 'Hai nét phẩy trên + một nét sổ dọc như bước chân đi trên phố (街道, 银行, 很).'],
    // --- 4 NÉT (#61 - #94) ---
    [61, '心', '忄,⺗', 'xīn', 'tâm', 4, 'Trái tim, tâm trạng, cảm xúc, suy nghĩ, trí nhớ, lo lắng', '心,想,忘,忙,快,慢,懂,怕,急,情', 'Trái tim (心) ở dưới cho suy nghĩ (想, 忘); Tâm đứng (忄) ở trái cho cảm xúc (忙, 快, 慢, 懂).'],
    [62, '戈', '', 'gē', 'qua', 4, 'Cây thương/kích cổ đại, chiến tranh, bảo vệ, tôi/thành công', '戈,我,战,成,或,戏,戒,划', 'Hình vũ khí mũi giáo cổ đại: Tôi (我), Hoàn thành (完成), Trò chơi/Kịch (游戏).'],
    [63, '户', '戶,戸', 'hù', 'hộ', 4, 'Cánh cửa đơn, hộ gia đình, căn phòng, nơi chốn', '户,房,所,扇,扁,护', 'Hình một cánh cửa gỗ có bản lề: Căn phòng (房间), Nơi chốn/Cho nên (所以), Bảo vệ (保护).'],
    [64, '手', '扌,龵', 'shǒu', 'thủ', 4, 'Bàn tay, cầm, nắm, đánh, quét, đẩy, đổi, chuyển, đón', '手,拿,打,扫,把,拉,推,换,搬,接', 'Bàn tay 5 ngón (手: 拿 cầm) hoặc Tài gảy (扌) bên trái cho mọi động tác của tay (打扫, 搬, 换).'],
    [65, '支', '', 'zhī', 'chi', 4, 'Cành cây, chi nhánh, nâng đỡ, kỹ thuật', '支,技,枝,鼓,翅', 'Hình bàn tay (又) cầm một cành tre (十): Ủng hộ/Chi nhánh (支持), Kỹ thuật (技).'],
    [66, '攴', '攵', 'pū', 'phộc', 4, 'Bàn tay cầm gậy gõ nhẹ, dạy học, buông thả, câu chuyện, sửa đổi', '教,放,故,改,敢,数,政,效,救', 'Tay cầm thước gõ nhịp dạy học (教), đặt/thả (放), chuyện cũ (故事), toán học (数学).'],
    [67, '文', '', 'wén', 'văn', 4, 'Văn chương, chữ viết, văn hóa, hoa văn', '文,齐,斋,斑,斐', 'Hình các nét hoa văn giao nhau: Văn hóa (文化), Tiếng Trung (中文).'],
    [68, '斗', '', 'dǒu', 'đẩu', 4, 'Cái đấu đong thóc gạo, gáo múc nước, khoa học, nguyên liệu', '斗,料,斜,科,斟', 'Hình chiếc gáo có cán dài dùng để đong: Đồ uống/Nguyên liệu (饮料), Khoa học (科学).'],
    [69, '斤', '', 'jīn', 'cân', 4, 'Cái rìu chặt gỗ, đơn vị cân (0.5 kg), mới mẻ, gần gũi', '斤,新,近,所,断,斯,欣', 'Hình lưỡi rìu sắc bén: Dùng rìu (斤) đẽo cây (木) làm đồ Mới (新), Gần (近).'],
    [70, '方', '', 'fāng', 'phương', 4, 'Hình vuông, phương hướng, địa phương, du lịch, bên cạnh', '方,放,旁,旅,族,旗,施', 'Hình lá cờ chỉ hướng: Phương hướng/Nơi (地方), Du lịch (旅游), Bên cạnh (旁边), Thuận tiện (方便).'],
    [71, '无', '旡', 'wú', 'vô', 4, 'Không có, hư vô, đã rồi', '无,既,抚', 'Không có (无论 bất luận, 既然 đã... thì...).'],
    [72, '日', '', 'rì', 'nhật', 4, 'Mặt trời, ánh nắng, ban ngày, thời gian, mùa xuân', '日,明,晴,早,晚,晒,春,昨,时,星', 'Hình mặt trời có 1 nét ngang giữa: Trời nắng (晴), Sáng mai (明天), Sớm (早), Phơi nắng (晒).'],
    [73, '曰', '', 'yuē', 'viết', 4, 'Nói rằng, thốt lời (khung rộng và thấp hơn chữ Nhật 日)', '曰,曲,更,曾,最,替', 'Hình cái miệng có làn hơi bay ra khi nói: Hơn nữa (更), Nhất (最), Bài hát/Cong (曲).'],
    [74, '月', '⺼', 'yuè', 'nguyệt', 4, 'Mặt trăng, tháng năm (kiêm Bộ Nhục 肉 chỉ các bộ phận cơ thể)', '月,明,期,朋,腿,脚,胖,脸,肚,服', 'Vầng trăng khuyết (月亮, 星期) hoặc cơ thịt trên cơ thể người (腿 đùi, 脚 chân, 脸 mặt, 胖 béo).'],
    [75, '木', '', 'mù', 'mộc', 4, 'Cây cối, gỗ, rừng rậm, bàn ghế, trường học, kiểm tra', '木,树,林,森,桌,椅,楼,校,果,查', 'Hình cây có cành và rễ: Cây (树), Bàn ghế (桌椅), Tầng lầu (楼), Trường (校), Kiểm tra (检查).'],
    [76, '欠', '', 'qiàn', 'khiếm', 4, 'Há miệng ngáp, thổi hơi, thiếu nợ, vui vẻ ca hát', '欠,欢,歌,次,吹,欺,歉,饮', 'Hình người há miệng thở hơi: Thích/Hoan nghênh (喜欢/欢迎), Ca hát (唱歌), Lần (次).'],
    [77, '止', '', 'zhǐ', 'chỉ', 4, 'Bàn chân, dừng lại, bước đi chính xác, lịch sử', '止,正,步,武,此,历,肯', 'Hình bàn chân có các ngón chân: Bước đi (步), Chính xác (正在), Lịch sử (历史).'],
    [78, '歹', '歺', 'dǎi', 'đãi', 4, 'Xương tàn, nguy hiểm, đặc thù', '歹,死,殊,残,殆,殖', 'Hình mảnh xương tàn: Đặc biệt/Đặc thù (特殊).'],
    [79, '殳', '', 'shū', 'thù', 4, 'Vũ khí cán dài, gậy tre đánh gõ, giai đoạn, giống nhau', '段,般,毁,毅,投', 'Hình bàn tay (又) cầm gậy dài: Đoạn/Khoảng (一段时间), Giống nhau/Bình thường (一般).'],
    [80, '毋', '母', 'wú', 'vô / mẫu', 4, 'Đừng, chớ; biến thể chữ Mẫu (母) chỉ người mẹ, mỗi ngày', '母,每,毒,贯', 'Chữ Mẫu (母) có hai dấu chấm tượng trưng sữa mẹ nuôi con: Mỗi (每天), Bố mẹ (父母).'],
    [81, '比', '', 'bǐ', 'tỷ', 4, 'So sánh, thi đấu, sát cạnh nhau, tốt nghiệp', '比,毕,毙,批', 'Hai người đứng cạnh nhau để so chiều cao: So sánh (比较), Thi đấu (比赛), Tốt nghiệp (毕业).'],
    [82, '毛', '', 'máo', 'mao', 4, 'Lông thú, tóc, len dạ, khăn mặt, đồng hào', '毛,毯,毫,尾,笔', 'Hình sợi lông mềm mại: Khăn mặt (毛巾), Bút lông (毛笔), Thảm (地毯).'],
    [83, '氏', '', 'shì', 'thị', 4, 'Họ tộc, gia tộc, nhân dân', '氏,民,昏', 'Dòng họ gốc rễ của nhân dân (人民). Thêm chấm ở đáy thành Đê (氐: 低 thấp, 底 đáy).'],
    [84, '气', '', 'qì', 'khí', 4, 'Không khí, hơi nước, mây mù, thời tiết, tức giận', '气,汽,氧,氛,氢', 'Những làn mây và hơi khí bốc lên: Thời tiết (天气), Tức giận (生气), Khách sáo (客气).'],
    [85, '水', '氵,氺', 'shuǐ', 'thủy', 4, 'Nước, sông hồ, chất lỏng, tắm giặt, khát nước, bơi lội', '水,河,海,洗,澡,渴,泳,汤,清,汉', 'Dòng nước chảy (水) hoặc 3 giọt nước (氵) bên trái: Khát (渴), Tắm (洗澡), Sông (河), Rõ/Sạch (清楚).'],
    [86, '火', '灬', 'huǒ', 'hỏa', 4, 'Ngọn lửa, sức nóng, đèn đuốc, nấu nướng, mùa hè', '火,灯,烧,烤,热,然,点,照,熊,秋', 'Ngọn lửa cháy (火: 灯 đèn, 发烧 sốt) hoặc 4 chấm lửa dưới đáy nồi (灬: 热 nóng, 点 giờ/đốt, 照 chiếu).'],
    [87, '爪', '爫', 'zhǎo', 'trảo', 4, 'Móng vuốt, bàn tay úp từ trên xuống để hái hoặc trao nhận', '爪,爬,爱,采,受,妥,爵', 'Bàn tay chụp từ trên xuống: Yêu thương (爱), Leo trèo (爬山), Chấp nhận (接受).'],
    [88, '父', '', 'fù', 'phụ', 4, 'Người cha, bậc trưởng bối nam giới', '父,爸,爷,斧', 'Bàn tay cầm rìu lao động trụ cột gia đình: Bố (爸爸), Ông nội (爷爷), Phụ thân (父亲).'],
    [89, '爻', '', 'yáo', 'hào', 4, 'Hào trong Kinh Dịch, đan chéo nhau', '爻,爽,尔', 'Các thanh tre đan chéo nhau tạo thành quẻ bói: Sảng khoái/Mát mẻ (凉爽).'],
    [90, '爿', '丬', 'qiáng', 'tường', 4, 'Tấm ván gỗ bên trái, cái giường, hình trạng, cường tráng', '床,状,墙,壮,将,奖', 'Nửa thân cây gỗ bên trái (giản thể là 丬): Cái giường (床), Hình trạng (状), Tương lai/Sẽ (将).'],
    [91, '片', '', 'piàn', 'phiến', 4, 'Mảnh mỏng, tấm ván phải, bức ảnh, thẻ bài', '片,版,牌,牒', 'Nửa thân cây gỗ bên phải xẻ thành tấm mỏng: Bức ảnh (照片), Minh tinh/Danh thiếp (名片).'],
    [92, '牙', '', 'yá', 'nha', 4, 'Răng hàm, răng nanh, đánh răng, xuyên qua', '牙,穿,呀,邪,芽', 'Hình chiếc răng hàm sắc nhọn: Đánh răng (刷牙), Mặc/Xuyên qua (穿 = răng 牙 khoét hang 穴).'],
    [93, '牛', '牜', 'niú', 'ngưu', 4, 'Con trâu, con bò, sữa bò, sự vật, đặc biệt', '牛,物,特,牧,牵,牺,件', 'Đầu trâu bò có đôi sừng cong: Sữa bò (牛奶), Động vật/Lễ vật (动物/礼物), Đặc biệt (特别).'],
    [94, '犬', '犭', 'quǎn', 'khuyển', 4, 'Con chó, loài thú bốn chân (mèo, khỉ, sư tử), đoán', '犬,狗,猫,猪,猴,狮,猜,独,狼', 'Chữ Khuyển (犬) hoặc bộ Khuyển (犭) bên trái: Chó (狗), Mèo (猫), Đoán (猜), Độc lập (独).'],
    // --- 5 NÉT (#95 - #117) ---
    [95, '玄', '', 'xuán', 'huyền', 5, 'Màu đen huyền bí, sâu xa, tỷ lệ', '玄,率,兹', 'Sợi tơ nhuộm màu đen thẫm huyền ảo: Hiệu suất/Tỷ lệ (效率).'],
    [96, '玉', '王,⺩', 'yù', 'ngọc / vương', 5, 'Đá ngọc quý, trang sức, nhà vua, chơi đùa, quả bóng, hiện tại', '玉,王,班,玩,现,球,理,玻,璃,珍', 'Chuỗi 3 viên ngọc quý (王/玉): Chơi (玩), Hiện tại (现在), Bóng (球), Lớp/Làm (班).'],
    [97, '瓜', '', 'guā', 'qua', 5, 'Quả dưa (dưa hấu, dưa chuột), bầu bí, cánh hoa', '瓜,瓣,瓢,弧', 'Hình quả dưa treo giữa những dây leo: Dưa hấu (西瓜), Cánh hoa (花瓣).'],
    [98, '瓦', '', 'wǎ', 'ngõa', 5, 'Ngói lợp nhà, đồ gốm sứ, cái bình/chai', '瓦,瓶,瓷,瓮', 'Hình viên ngói đất nung: Cái bình/Chai lọ (瓶子, 花瓶).'],
    [99, '甘', '', 'gān', 'cam', 5, 'Ngọt ngào, ngon lành, cam tâm', '甘,甜,某,甚', 'Cái miệng ngậm đồ ăn ngọt: Ngọt ngào (甜 = lưỡi 舌 nếm vị ngọt 甘).'],
    [100, '生', '', 'shēng', 'sinh', 5, 'Sinh trưởng, nảy mầm, cuộc sống, học sinh, sinh nhật, tiên sinh', '生,甥,产,胜,姓', 'Mầm cây mọc vươn lên từ mặt đất (土): Học sinh (学生), Sinh nhật (生日), Bị ốm (生病).'],
    [101, '用', '', 'yòng', 'dụng', 5, 'Sử dụng, dùng, có ích, chi phí', '用,甩,甫,备', 'Chiếc thùng gỗ có quai xách đem ra sử dụng: Dùng (用), Không cần (不用), Tác dụng (作用).'],
    [102, '田', '', 'tián', 'điền', 5, 'Ruộng đất, cánh đồng, đàn ông, bức tranh, ở lại, thế giới', '田,男,画,留,界,畏,番,略', 'Ô ruộng có bờ ngăn chữ thập: Đàn ông (男), Bức tranh (画), Ở lại/Du học (留学), Thế giới (世界).'],
    [103, '疋', '⺪', 'pǐ', 'thất / sơ', 5, 'Tấm vải, bàn chân bước đi, rõ ràng, nghi ngờ', '楚,疏,疑,蛋', 'Hình bàn chân và bắp chân: Rõ ràng (清楚), Quả trứng (鸡蛋), Nghi ngờ (怀疑).'],
    [104, '疒', '', 'nè', 'nạch', 5, 'Giường bệnh, ốm đau, bệnh tật, đau nhức, gầy yếu', '病,疼,痛,瘦,疯,疗,痒,疾', 'Người nằm trên giường (广) toát 2 giọt mồ hôi bên trái: Bị bệnh (生病), Đau (疼), Gầy (瘦).'],
    [105, '癶', '', 'bō', 'bát', 5, 'Hai bàn chân đạp sang hai bên để leo lên cao, xuất phát', '登,发,癸', 'Hai bàn chân đạp vững leo lên đỉnh núi (登山) hoặc xuất phát (出发).'],
    [106, '白', '', 'bái', 'bạch', 5, 'Màu trắng, trong sáng, rõ ràng, số một trăm, của (trợ từ)', '白,百,的,皇,皆,皂', 'Tia nắng mặt trời chiếu trắng xóa: Màu trắng (白), Hiểu rõ (明白), Một trăm (百), Của (的).'],
    [107, '皮', '', 'pí', 'bì', 5, 'Da thú, vỏ cây, giày da, chăn đệm, mệt mỏi', '皮,破,被,疲,披,波', 'Bàn tay (又) lột tấm da: Giày da (皮鞋), Vỏ/Da (皮), Chăn/Bị (被), Phá vỡ (破).'],
    [108, '皿', '', 'mǐn', 'mãnh', 5, 'Bát đĩa, chậu, hộp đựng thức ăn nước uống, muối', '皿,盘,盆,盒,盐,盖,益,盛', 'Chiếc bát/khay có chân đế rộng: Cái đĩa (盘子), Chậu (盆), Hộp (盒), Muối (盐).'],
    [109, '目', '', 'mù', 'mục', 5, 'Con mắt, thị giác, nhìn ngắm, ngủ nghỉ, chân thật, kính mắt', '目,眼,睛,看,睡,着,真,直,眉,相', 'Con mắt có 2 nét ngang con ngươi ở giữa: Con mắt (眼睛), Ngủ (睡觉), Nhìn (看), Thật (真).'],
    [110, '矛', '', 'máo', 'mâu', 5, 'Cây giáo/mâu đâm, mâu thuẫn, mềm mại', '矛,柔,矜', 'Hình mũi giáo dài: Mâu thuẫn (矛盾), Mềm mại (温柔).'],
    [111, '矢', '', 'shǐ', 'thỉ', 5, 'Mũi tên bắn, thẳng thắn, ngắn, thấp bé, tri thức', '矢,知,短,矮,矩', 'Hình mũi tên nhọn: Biết (知道), Ngắn (短), Thấp lùn (矮).'],
    [112, '石', '', 'shí', 'thạch', 5, 'Hòn đá, sỏi đá, cái bát sứ, cứng rắn, nghiên cứu', '石,碗,破,硬,研,确,码,础', 'Hòn đá (口) dưới vách núi (厂): Cái bát (碗), Cứng (硬), Vỡ (破), Chắc chắn (确).'],
    [113, '示', '礻', 'shì', 'thị / kỳ', 5, 'Bàn thờ thần linh, lễ nghi, quà cáp, chúc phúc, tivi', '示,礼,祝,神,福,社,视,禁,票', 'Bàn thờ (示) hoặc bộ Thị 1 chấm phải (礻): Lễ vật/Quà (礼物), Chúc (祝), Tivi (电视), Biểu thị (表示).'],
    [114, '禸', '', 'róu', 'nhựu', 5, 'Dấu chân thú dẫm trên đất, rời xa', '离,禽,禹', 'Hình vết chân thú in xuống đất: Rời khỏi/Cách (离开, 离).'],
    [115, '禾', '', 'hé', 'hòa', 5, 'Cây lúa, mùa màng, mùa thu, trồng cây, khoa học, thuê', '禾,秋,种,租,香,秀,科,称,季', 'Cây lúa có bông trĩu hạt cúi đầu ở đỉnh: Mùa thu (秋), Trồng/Loại (种), Thuê (租), Mùa (季).'],
    [116, '穴', '', 'xué', 'huyệt', 5, 'Hang động, lỗ trống, bầu trời, cửa sổ, mặc/xuyên qua, đột nhiên', '穴,空,穿,窗,突,穷,究', 'Mái hang đá: Điều hòa/Rảnh (空调/有空), Mặc/Xuyên (穿), Cửa sổ (窗户), Đột nhiên (突然).'],
    [117, '立', '', 'lì', 'lập', 5, 'Đứng thẳng, thành lập, nhà ga/trạm dừng, âm thanh, kết thúc', '立,站,亲,音,章,竟,端,童', 'Người đứng thẳng hai chân trên mặt đất: Trạm/Đứng (站), Âm nhạc (音), Cuối cùng (终于/竟).'],
    // --- 6 NÉT (#118 - #146) ---
    [118, '竹', '⺮', 'zhú', 'trúc', 6, 'Tre trúc, đũa tre, thùng/vali, giỏ bóng, tính toán, trả lời, cười', '竹,筷,箱,篮,算,答,笑,笔,第,简', 'Hai nhành lá tre (⺮): Đôi đũa (筷子), Vali (行李箱), Bóng rổ (篮球), Dự định (打算), Cười (笑), Đơn giản (简单).'],
    [119, '米', '', 'mǐ', 'mễ', 6, 'Hạt gạo, cơm, kẹo đường, bánh ngọt, tinh thần, đơn vị mét', '米,糖,糕,粮,粉,粗,精,粥,类', 'Bốn hạt gạo quanh bông lúa: Cơm (米饭), Kẹo (糖), Bánh kem (蛋糕), Tinh thần (精神).'],
    [120, '糸', '纟,糹', 'mì', 'mịch', 6, 'Sợi tơ, dây thừng, dệt vải, màu sắc, giấy, luyện tập, cấp bậc', '红,绿,纸,练,级,经,结,给,终,约', 'Cuộn sợi tơ (纟 bên trái): Màu đỏ (红), Màu lục (绿), Giấy (纸), Luyện tập (练习), Lớp/Cấp (年级), Đã từng/Kinh qua (已经/经理).'],
    [121, '缶', '', 'fǒu', 'phủ', 6, 'Vò sành, bình gốm bụng to miệng nhỏ, thiếu thốn', '缸,缺,罐,陶', 'Chiếc vò gốm: Thiếu/Khuyết điểm (缺少, 缺点), Lon nước (罐).'],
    [122, '网', '罒,⺲', 'wǎng', 'võng', 6, 'Tấm lưới đánh cá, mạng Internet, đặt để', '网,罗,置,罪,罚,署', 'Hình tấm lưới đan mắt cáo (上网 lên mạng) hoặc 4 mắt lưới nằm ngang trên đầu chữ (罒).'],
    [123, '羊', '⺶,⺷', 'yáng', 'dương', 6, 'Con dê, con cừu, thịt cừu, vẻ đẹp, tươi ngon, kém/thiếu', '羊,美,差,着,群,鲜,羞', 'Đầu dê có 2 sừng cong: Thịt cừu (羊肉), Đẹp (美), Tươi ngon (新鲜 = cá 鱼 + dê 羊), Kém (差).'],
    [124, '羽', '', 'yǔ', 'vũ', 6, 'Lông vũ cánh chim, vỗ cánh bay, ôn tập, cầu lông', '羽,习,翠,翻,翔,翅', 'Đôi cánh chim có lớp lông vũ: Ôn tập (复习), Tập quán (习惯), Cầu lông (羽毛球).'],
    [125, '老', '耂', 'lǎo', 'lão', 6, 'Người già, thầy cô giáo, luôn luôn, kỳ thi', '老,考,者,孝', 'Hình cụ già tóc dài chống gậy: Thầy giáo (老师), Luôn (总是/老是), Kỳ thi (考试).'],
    [126, '而', '', 'ér', 'nhi', 6, 'Hơn nữa, mà, nhưng mà, kiên nhẫn', '而,耐,耍,需', 'Hình bộ râu dưới cằm, dùng làm liên từ Hơn nữa (而且), Kiên nhẫn (耐心).'],
    [127, '耒', '', 'lěi', 'lỗi', 6, 'Cái cày gỗ có nhiều răng, cày cấy ruộng đồng', '耕,耗,籍', 'Chiếc cày gỗ có răng cày đất nông nghiệp: Cày cấy (耕), Tiêu hao (耗).'],
    [128, '耳', '', 'ěr', 'nhĩ', 6, 'Cái tai, lắng nghe, thông minh, nghề nghiệp, liên hệ', '耳,聪,取,职,联,聊,敢', 'Hình vành tai người: Cái tai (耳朵), Thông minh (聪明), Trò chuyện (聊天).'],
    [129, '聿', '⺻', 'yù', 'duật', 6, 'Cây bút lông viết chữ, luật pháp, xây dựng, sách vở', '律,建,书,肃,肇', 'Bàn tay cầm quản bút lông thẳng đứng: Luật sư/Luật pháp (律师/法律), Sách (书).'],
    [130, '肉', '月,⺼', 'ròu', 'nhục', 6, 'Thịt, cơ bắp, các bộ phận cơ thể người (chân, mặt, bụng, béo)', '肉,腿,脚,脸,胖,肚,胸,脑,背,育', 'Miếng thịt có vân thớ (牛肉, 羊肉), khi ghép chữ biến thành bộ Nhục (月: 腿, 脚, 脸, 胖).'],
    [131, '臣', '', 'chén', 'thần', 6, 'Bề tôi, quan đại thần, nằm nghỉ', '臣,卧,藏,临', 'Con mắt nhìn xuống khi bề tôi cúi mình: Phòng ngủ (卧室), Cất giấu (藏).'],
    [132, '自', '', 'zì', 'tự', 6, 'Cái mũi, tự bản thân mình, nghỉ ngơi', '自,息,臭,咱', 'Hình cái mũi ở giữa mặt: Tự mình (自己), Nghỉ ngơi (休息 = tim 心 thở đều qua mũi 自).'],
    [133, '至', '', 'zhì', 'chí', 6, 'Đi đến nơi, đạt tới cực điểm, phòng học, thậm chí', '至,到,室,致', 'Mũi tên cắm xuống đất (土) báo hiệu đã Đến nơi: Đến (到), Phòng học (教室), Thậm chí (甚至).'],
    [134, '臼', '', 'jiù', 'cữu', 6, 'Cái cối giã gạo, hai bàn tay vốc lên, cũ kỹ, hứng thú', '舅,旧,儿,兴,舀', 'Chiếc cối đá giã gạo: Cũ (旧), Hứng thú/Vui vẻ (感兴趣, 高兴), Cậu (舅舅).'],
    [135, '舌', '', 'shé', 'thiệt', 6, 'Cái lưỡi, nếm vị ngọt, gió thổi, lộn xộn', '舌,甜,乱,辞,刮,舒', 'Cái lưỡi thò ra từ miệng (口): Ngọt (甜), Gió thổi (刮风), Thoải mái (舒服).'],
    [136, '舛', '', 'chuǎn', 'suyển', 6, 'Hai bàn chân bước ngược chiều nhau, múa nhảy', '舞,舜', 'Hai bàn chân bước nhịp nhàng đối xứng trong điệu Múa (跳舞).'],
    [137, '舟', '', 'zhōu', 'chu', 6, 'Con thuyền, tàu bè, cái đĩa, bình thường', '舟,船,航,般,盘,舰', 'Chiếc thuyền gỗ có mũi cong: Con thuyền (船), Cái đĩa (盘子), Bình thường/Giống (一般).'],
    [138, '艮', '', 'gěn', 'cấn', 6, 'Dừng lại, cứng cỏi, rất, đi theo, ngân hàng, con mắt', '艮,很,跟,根,银,限,眼,艰', 'Gốc chữ rất phổ biến trong HSK: Rất (很), Với/Đi theo (跟), Ngân hàng (银行), Con mắt (眼睛).'],
    [139, '色', '', 'sè', 'sắc', 6, 'Màu sắc, sắc mặt, vẻ đẹp rực rỡ', '色,艳', 'Sắc diện biểu lộ trên gương mặt: Màu sắc (颜色).'],
    [140, '艸', '艹', 'cǎo', 'thảo', 6, 'Cỏ cây, hoa lá, trà, rau củ, trái cây, thuốc thảo mộc', '草,花,茶,菜,药,蓝,苹,蕉,节,苦', 'Hai mầm cỏ mọc trên đầu chữ (艹): Cỏ (草), Hoa (花), Trà (茶), Rau (菜), Táo (苹果), Chuối (香蕉), Lễ/Tiết (节).'],
    [141, '虍', '', 'hū', 'hổ', 6, 'Vằn da hổ, con hổ, suy nghĩ lo lắng, nơi chốn', '虎,虑,虚,处', 'Đầu hổ và bộ lông vằn: Con hổ (老虎), Suy nghĩ/Cân nhắc (考虑), Nơi chốn (处).'],
    [142, '虫', '', 'chóng', 'trùng', 6, 'Côn trùng, sâu bọ, trứng, tôm, cua, rắn, mật ong', '虫,蛋,虾,蛇,蜂,蝶,蜜,蛙', 'Hình con sâu/rắn: Quả trứng (鸡蛋), Con tôm (虾), Mật ong (蜂蜜), Con rắn (蛇).'],
    [143, '血', '', 'xuè', 'huyết', 6, 'Máu huyết, nhiệt huyết, huyết thống', '血,衅', 'Giọt máu (丶) nhỏ vào chiếc chén lễ (皿): Máu (血).'],
    [144, '行', '', 'xíng', 'hành / hàng', 6, 'Ngã tư đường, đi bộ, ngân hàng, đường phố, hành lý', '行,街,衡,衍', 'Ngã tư đường lớn gồm bước chân trái (彳) và phải (亍): Đường phố (街道), Ngân hàng (银行), Hành lý (行李).'],
    [145, '衣', '衤', 'yī', 'y', 6, 'Quần áo, trang phục, váy, sơ mi, chăn đệm, đồng hồ/biểu thị', '衣,裤,衫,裙,被,袜,袋,装,表', 'Áo cổ chéo (衣服) hoặc bộ Y 2 chấm phải (衤): Quần (裤子), Sơ mi (衬衫), Váy (裙子), Chăn (被).'],
    [146, '襾', '西,覀', 'yà', 'á / tây', 6, 'Che đậy phía trên, phương Tây, muốn/cần, vé', '西,要,覆,票,栗', 'Hình chim về tổ lúc mặt trời lặn phương Tây (西), Cần/Muốn (要, 需要), Vé (票).'],
    // --- 7 NÉT (#147 - #166) ---
    [147, '见', '見', 'jiàn', 'kiến', 7, 'Nhìn thấy, gặp mặt, cảm thấy, tivi, phát hiện', '见,视,觉,观,现,规,览', 'Con mắt lớn (目) đặt trên đôi chân (儿): Gặp mặt (见面), Cảm thấy/Ngủ (觉得/睡觉), Tivi (电视).'],
    [148, '角', '', 'jiǎo', 'giác', 7, 'Sừng thú, góc tường, đồng hào (0.1 tệ), giải quyết/hiểu', '角,解,触', 'Chiếc sừng trâu bò có vân khía: Góc/Đồng hào (角), Hiểu/Giải quyết (了解, 解决).'],
    [149, '言', '讠,訁', 'yán', 'ngôn', 7, 'Lời nói, ngôn ngữ, hỏi, mời, đọc, giảng, quen biết, bài học', '言,话,说,请,读,讲,认,识,课,谢', 'Lời nói phát ra từ miệng (讠 bên trái): Nói (说话), Mời (请), Quen biết (认识), Bài học (课), Cảm ơn (谢).'],
    [150, '谷', '', 'gǔ', 'cốc', 7, 'Thung lũng khe núi, suối nguồn, dễ dàng/bao dung', '谷,欲,容,俗', 'Khe nước chảy mở rộng giữa hai sườn núi: Dễ dàng (容易), Phong tục (俗).'],
    [151, '豆', '', 'dòu', 'đậu', 7, 'Hạt đậu, bát chân cao đựng đồ lễ, ngắn', '豆,短,登,头,豌', 'Chiếc bát cổ chân cao, chỉ các loại đậu (咖啡豆 hạt cà phê, 豆腐 đậu phụ), Ngắn (短).'],
    [152, '豕', '', 'shǐ', 'thỉ', 7, 'Con lợn (heo), gia đình, con voi, hình ảnh', '家,象,猪,豪,豫', 'Con lợn bụng béo 4 chân: Gia đình (家 = mái nhà 宀 có nuôi lợn 豕), Con voi/Giống (大象/像).'],
    [153, '豸', '', 'zhì', 'trãi', 7, 'Loài thú săn mồi thân dài (báo, chồn), lịch sự/diện mạo', '貌,豹,貂', 'Con báo săn mồi có lưng uốn dài: Lễ phép/Diện mạo (礼貌).'],
    [154, '贝', '貝', 'bèi', 'bối', 7, 'Vỏ sò làm tiền tệ cổ, tiền bạc, đắt, mua bán, thi đấu, chúc mừng', '贝,贵,买,卖,贺,赛,贷,费,赢,宾', 'Vỏ sò biển làm tiền cổ: Đắt/Quý (贵), Mua (买), Bán (卖), Thi đấu (比赛), Siêu thị (超市).'],
    [155, '赤', '', 'chì', 'xích', 7, 'Màu đỏ rực, chân thành, tha thứ', '赤,赦,赫', 'Con người (大) đứng bên ngọn lửa lớn (火) ánh lên màu đỏ rực.'],
    [156, '走', '', 'zǒu', 'tẩu', 7, 'Đi bộ, chạy, thức dậy, vượt qua, càng ngày càng, thú vị', '走,起,越,超,趣,赶,赴', 'Người vung tay (土) bước chân (止) đi nhanh: Đi (走), Dậy (起床), Càng (越来越), Siêu thị (超市), Thú vị (有趣).'],
    [157, '足', '⻊', 'zú', 'túc', 7, 'Bàn chân, đá bóng, chạy, nhảy, con đường, đi theo', '足,跑,跳,踢,路,跟,跌,距,踊', 'Đầu gối (口) và bàn chân (止): Đá bóng (踢足球), Chạy (跑步), Nhảy (跳舞), Đường (路), Với/Theo (跟).'],
    [158, '身', '', 'shēn', 'thân', 7, 'Thân thể, cơ thể người, nằm nghỉ', '身,射,躺,躯', 'Hình cơ thể người nhìn nghiêng: Cơ thể/Sức khỏe (身体), Nằm xuống (躺).'],
    [159, '车', '車', 'chē', 'xa', 7, 'Xe cộ, chiếc xe, nhẹ nhàng, so sánh, chuyển động', '车,辆,轻,较,转,软,轮,输,载', 'Chiếc xe có trục và 2 bánh xe: Xe hơi/Tàu (汽车/火车), Lượng từ chiếc xe (辆), Nhẹ (轻), So sánh (比较).'],
    [160, '辛', '', 'xīn', 'tân', 7, 'Cay nồng, vất vả, cực nhọc, làm việc/giải quyết', '辛,辣,辞,辟,办', 'Vị cay hoặc sự vất vả: Vất vả (辛苦), Cay (辣), Văn phòng/Cách làm (办公室/办法).'],
    [161, '辰', '', 'chén', 'thần', 7, 'Buổi sáng sớm (giờ Thìn 7h-9h), tinh tú, chấn động', '辰,晨,震,唇', 'Chiếc liềm vỏ sò cắt cỏ lúc bình minh: Buổi sáng sớm (早晨).'],
    [162, '辵', '辶,⻌', 'chuò', 'sước', 7, 'Bước đi trên đường dài, xa gần, đưa tiễn, chọn lựa, gặp gỡ, muộn', '这,那,远,近,送,过,还,选,迎,迟,道', 'Bước chân đi trên đường (辶): Xa (远), Gần (近), Tiễn/Tặng (送), Chọn (选择), Đón (欢迎), Đến muộn (迟到).'],
    [163, '邑', '阝(phải)', 'yì', 'ấp', 7, 'Thành phố, vùng đất, thủ đô, hàng xóm, bộ phận (Leo đồi bên phải)', '那,都,邮,部,邻,郊,郭,邦', 'Bộ Ấp (阝 đứng bên PHẢI chữ) chỉ vùng đất, đô thị: Đều/Thủ đô (都), Hàng xóm (邻居), Bưu điện (邮).'],
    [164, '酉', '', 'yǒu', 'dậu', 7, 'Bình ủ rượu, bia rượu, chua, say, tỉnh giấc', '酒,酸,醒,醉,配,醋,酱,酬', 'Vò sành ủ rượu có vạch nước bên trong: Rượu bia (啤酒), Chua (酸), Tỉnh giấc (醒).'],
    [165, '釆', '', 'biàn', 'biện', 7, 'Phân biệt dấu chân thú, giải thích rõ ràng, quen thuộc', '释,番,悉', 'Nhìn dấu chân thú để phân biệt: Giải thích (解释), Quen thuộc (熟悉).'],
    [166, '里', '', 'lǐ', 'lý', 7, 'Làng xóm, bên trong, dặm đường (500m), nặng/quan trọng', '里,重,野,量', 'Có ruộng (田) và đất (土) là nơi ở: Bên trong (里), Nặng/Quan trọng (重, 重要), Số lượng (量).'],
    // --- 8 NÉT (#167 - #175) ---
    [167, '金', '钅,釒', 'jīn', 'kim', 8, 'Kim loại, vàng bạc, tiền tệ, ngân hàng, tàu điện ngầm, đồng hồ, kính', '金,钱,银,铁,钟,镜,错,铅,锻,锅', 'Quặng kim loại (钅 bên trái): Tiền (钱), Ngân hàng (银行), Tàu điện ngầm (地铁), Đồng hồ (钟), Kính mắt (眼镜), Rèn luyện (锻炼).'],
    [168, '长', '長,镸', 'cháng', 'trường / trưởng', 8, 'Dài lâu, mái tóc dài, lớn lên, trưởng thành, hiệu trưởng', '长,张,账,套', 'Hình người có mái tóc dài: Dài (长 - cháng), Lớn lên/Trưởng (长大/校长 - zhǎng).'],
    [169, '门', '門', 'mén', 'môn', 8, 'Cánh cổng hai cánh, cửa ra vào, hỏi, thời gian/phòng, tin tức', '门,问,间,闻,闹,闪,闭,闲,阅', 'Cổng lớn 2 cánh: Cửa (门), Hỏi (问), Phòng/Thời gian (房间/时间), Tin tức (新闻), Náo nhiệt (热闹).'],
    [170, '阜', '阝(trái)', 'fù', 'phụ', 8, 'Gò đất cao, sườn núi, bậc thềm, mặt trời, học viện, trừ ra (Leo đồi bên trái)', '院,阳,阴,除,际,阿,附,降,随,陪', 'Bộ Phụ (阝 đứng bên TRÁI chữ) chỉ sườn đồi, bậc thang: Mặt trời (太阳), Học viện/Bệnh viện (学院/医院), Trừ ra (除了), Gần đây (附近).'],
    [171, '隶', '', 'lì', 'đãi / lệ', 8, 'Đuổi kịp, bắt lấy, khỏe mạnh', '隶,康', 'Bàn tay (又) nắm giữ từ phía sau: Khỏe mạnh (健康).'],
    [172, '隹', '', 'zhuī', 'chuy', 8, 'Loài chim đuôi ngắn, khó khăn, ai, chuẩn bị, đẩy', '难,谁,推,准,集,售,雌', 'Hình chú chim đuôi ngắn: Khó khăn (难, 难过), Ai (谁), Đẩy (推), Chuẩn bị (准备).'],
    [173, '雨', '⻗', 'yǔ', 'vũ', 8, 'Mưa, tuyết, mây, số không/lẻ, cần thiết, sấm sét', '雨,雪,云,零,雷,雾,需,霜,露', 'Bốn hạt mưa rơi từ vòm trời: Mưa (下雨), Tuyết (雪), Số 0 (零), Cần thiết (需要).'],
    [174, '青', '靑', 'qīng', 'thanh', 8, 'Màu xanh tươi trẻ, thanh niên, mời, nước trong, trời nắng, con mắt, tình cảm, yên tĩnh', '青,请,清,晴,睛,情,静,精', 'Bộ gốc "Gia đình họ Thanh (qīng/jīng)": Mời (请), Sạch (清楚), Nắng (晴), Mắt (眼睛), Tình cảm (情), Yên tĩnh (安静).'],
    [175, '非', '', 'fēi', 'phi', 8, 'Không phải, vô cùng, cà phê, dựa vào, xếp hàng', '非,靠,排,辈,悲,啡', 'Đôi cánh chim vỗ ngược chiều nhau: Vô cùng (非常), Cà phê (咖啡), Dựa vào (靠).'],
    // --- 9 NÉT (#176 - #186) ---
    [176, '面', '靣', 'miàn', 'diện', 9, 'Khuôn mặt, bề mặt, phía/bên, mì sợi, bánh mì, gặp mặt', '面,腼', 'Khuôn mặt người có mắt và đường viền má: Mì sợi (面条), Bánh mì (面包), Gặp mặt (见面).'],
    [177, '革', '', 'gé', 'cách', 9, 'Da thuộc, đôi giày, cải cách', '革,鞋,靴,鞭', 'Tấm da thú căng phẳng đã thuộc kỹ: Đôi giày (鞋, 皮鞋).'],
    [178, '韦', '韋', 'wéi', 'vi', 9, 'Da thuộc mềm, vây quanh, dẻo dai', '韦,韧,韩', 'Hai bàn chân đi tuần tra vòng quanh thành trì.'],
    [179, '韭', '', 'jiǔ', 'phỉ / cửu', 9, 'Rau hẹ (loài rau mọc thành bụi trên mặt đất)', '韭', 'Hình những lá rau hẹ mọc thẳng đứng từ mặt đất (一): Bánh hẹ (韭菜).'],
    [180, '音', '', 'yīn', 'âm', 9, 'Âm thanh, tiếng nhạc, âm nhạc, ý nghĩa', '音,意,韵,章', 'Lời nói phát ra thành giai điệu: Âm nhạc (音乐), Thanh âm (声音), Ý nghĩa (意思).'],
    [181, '页', '頁', 'yè', 'hiệt', 9, 'Cái đầu người, khuôn mặt, trang sách, câu hỏi/đề bài, chăm sóc, phải', '页,题,须,顾,顿,预,领,颜,颗,顺', 'Hình cái đầu người: Đề bài/Câu hỏi (题, 问题), Chăm sóc (照顾), Phải (必须), Màu sắc (颜色).'],
    [182, '风', '風', 'fēng', 'phong', 9, 'Cơn gió, gió thổi, phong cảnh, bay phấp phới', '风,飘,刮,飙', 'Làn gió cuốn cánh buồm: Gió thổi (刮风), Phong cảnh (风景).'],
    [183, '飞', '飛', 'fēi', 'phi', 9, 'Bay lượn, máy bay, cất cánh', '飞', 'Hình chim sải đôi cánh bay vút lên trời: Máy bay (飞机).'],
    [184, '食', '饣,飠', 'shí', 'thực', 9, 'Thức ăn, cơm gạo, đồ uống, đói, no, nhà hàng, bánh nướng', '食,饭,饿,饱,饮,馆,饼,饺,餐,饲', 'Nồi cơm tỏa hương (饣 bên trái): Cơm (米饭), Đói (饿), No (饱), Đồ uống (饮料), Nhà hàng (饭馆).'],
    [185, '首', '', 'shǒu', 'thủ', 9, 'Cái đầu, đứng đầu, đầu tiên, con đường', '首,道', 'Cái đầu người có tóc trên đỉnh: Đầu tiên (首先), Con đường/Biết (道, 知道).'],
    [186, '香', '', 'xiāng', 'hương', 9, 'Mùi thơm, hương thơm, ngon miệng, quả chuối', '香,馨', 'Lúa chín (禾) nấu tỏa vị ngọt thơm (日): Thơm ngon (香), Quả chuối (香蕉).'],
    // --- 10 NÉT (#187 - #194) ---
    [187, '马', '馬', 'mǎ', 'mã', 10, 'Con ngựa, cưỡi ngựa/đạp xe, lập tức, tài xế, kiểm tra', '马,骑,骗,驾,骂,骄,验,惊', 'Con ngựa có bờm và 4 vó phi nhanh: Con ngựa (马), Lập tức (马上), Đạp xe/Cưỡi (骑).'],
    [188, '骨', '', 'gǔ', 'cốt', 10, 'Bộ xương, khớp xương, cốt cách', '骨,髓,骷', 'Khớp xương phía trên gắn với cơ thịt (月) phía dưới: Xương (骨头).'],
    [189, '高', '', 'gāo', 'cao', 10, 'Cao lớn, lầu cao, vui vẻ, nâng cao', '高,敲', 'Tòa tháp cổng thành hai tầng cao vút: Cao (高), Vui vẻ (高兴), Nâng cao (提高).'],
    [190, '髟', '', 'biāo', 'bưu', 10, 'Mái tóc dài, râu tóc', '发,须,髻,鬓', 'Búi tóc dài (长) với 3 lọn tóc rủ xuống (彡): Tóc (头发).'],
    [191, '鬥', '斗(đấu)', 'dòu', 'đấu', 10, 'Chiến đấu, tranh đấu, ồn ào náo nhiệt (giản thể gộp vào 斗)', '闹,斗,哄', 'Hai người giao đấu với nhau: Ồn ào/Náo nhiệt (热闹 = chợ 市 đông người tranh luận 門/斗).'],
    [192, '鬯', '', 'chàng', 'sưởng', 10, 'Rượu nếp ủ thảo mộc thơm dùng trong lễ tế', '鬯,郁', 'Bình rượu quý ủ hương thảo mộc thơm ngát.'],
    [193, '鬲', '', 'lì', 'cách', 10, 'Nồi đồng ba chân rỗng để đun nấu, ngăn cách', '鬲,融,隔', 'Chiếc vạc ba chân rỗng chứa nước đun trên lửa: Ngăn cách (隔).'],
    [194, '鬼', '', 'guǐ', 'quỷ', 10, 'Con ma, linh hồn, tinh ranh, sức hấp dẫn', '鬼,魂,魔,魅', 'Nhân vật đeo mặt nạ lớn trong lễ hội cổ: Hấp dẫn/Quyến rũ (魅力).'],
    // --- 11 NÉT (#195 - #200) ---
    [195, '鱼', '魚', 'yú', 'ngư', 11, 'Con cá, hải sản, tươi ngon', '鱼,鲜,鲤,鲸', 'Con cá có đầu, thân vảy (田) và cái đuôi (一): Con cá (鱼), Tươi ngon (新鲜).'],
    [196, '鸟', '鳥', 'niǎo', 'điểu', 11, 'Con chim, gà, vịt, gia cầm', '鸟,鸡,鸭,鹅,鸽,鹏', 'Chú chim có mỏ, mắt (丶) và lông đuôi: Con chim (鸟), Con gà (鸡), Trứng gà (鸡蛋).'],
    [197, '卤', '鹵', 'lǔ', 'lỗ', 11, 'Muối mặn tự nhiên, nước sốt kho hầm', '卤,咸,碱', 'Hạt muối kết tinh trong ruộng muối: Vị mặn (咸).'],
    [198, '鹿', '', 'lù', 'lộc', 11, 'Con hươu, con nai, vẻ đẹp lộng lẫy', '鹿,丽,麟', 'Con hươu có cặp sừng nhánh trên đầu: Xinh đẹp (美丽).'],
    [199, '麦', '麥', 'mài', 'mạch', 11, 'Lúa mì, lúa mạch, bánh mì', '麦,麸,面', 'Cây lúa mì: Bánh mì (面包), Yến mạch (燕麦).'],
    [200, '麻', '', 'má', 'ma', 11, 'Cây gai dầu, sợi đay, tê mỏi, làm phiền', '麻,摩,魔', 'Hai bó sợi gai (林) phơi dưới mái hiên (广): Làm phiền (麻烦), Tê cay (麻辣).'],
    // --- 12 NÉT (#201 - #204) ---
    [201, '黄', '黃', 'huáng', 'hoàng', 12, 'Màu vàng, đất hoàng thổ, hoàng kim', '黄,横', 'Màu vàng óng của cánh đồng lúa chín: Màu vàng (黄色).'],
    [202, '黍', '', 'shǔ', 'thử', 12, 'Lúa nếp hạt vàng dùng nấu rượu hoặc làm bánh dẻo', '黍,黏,黎', 'Cây lúa (禾) ngâm trong nước (水) có độ kết dính cao: Dính (黏).'],
    [203, '黑', '', 'hēi', 'hắc', 12, 'Màu đen, bóng tối, bảng đen, im lặng', '黑,默,点,党', 'Khói đen bám trên ống khói khi đun lửa (灬) ở dưới: Màu đen (黑), Bảng đen (黑板).'],
    [204, '黹', '', 'zhǐ', 'chỉ', 12, 'May vá, thêu thùa kim chỉ', '黹,黼', 'Hình những đường kim mũi chỉ đan xen trên tấm vải.'],
    // --- 13 NÉT (#205 - #208) ---
    [205, '黾', '黽', 'mǐn', 'mãnh', 13, 'Con ếch, con cóc, nỗ lực cố gắng', '黾,蛙,鳖', 'Hình con ếch nhìn từ trên lưng xuống với cái bụng tròn và 4 chân.'],
    [206, '鼎', '', 'dǐng', 'đỉnh', 13, 'Cái đỉnh đồng ba chân hai tai, quyền lực tối cao', '鼎', 'Chiếc đỉnh đồng 3 chân tượng trưng cho lời nói chắc như đinh đóng cột (一言九鼎).'],
    [207, '鼓', '', 'gǔ', 'cổ', 13, 'Cái trống, đánh trống, cổ vũ khích lệ', '鼓,鼙', 'Mặt trống có giá đỡ bên trái + bàn tay (支) cầm dùi gõ bên phải: Cổ vũ (鼓励).'],
    [208, '鼠', '', 'shǔ', 'thử', 13, 'Con chuột, loài gặm nhấm, chuột máy tính', '鼠,鼬', 'Con chuột có răng nhọn phía trên và đuôi dài phía dưới: Con chuột (老鼠, 鼠标).'],
    // --- 14 NÉT (#209 - #210) ---
    [209, '鼻', '', 'bí', 'tỵ', 14, 'Cái mũi, khứu giác, ngửi', '鼻,鼾', 'Gồm chữ Tự (自 - cái mũi) ở trên + sống mũi (畀) ở dưới: Cái mũi (鼻子).'],
    [210, '齐', '齊', 'qí', 'tề', 14, 'Đều đặn, bằng phẳng, gọn gàng chỉnh tề', '齐,剂,济', 'Những bông lúa mọc cao bằng phẳng đều tăm tắp: Gọn gàng chỉnh tề (整齐).'],
    // --- 15 NÉT (#211) ---
    [211, '齿', '齒', 'chǐ', 'xỉ', 15, 'Hàm răng, răng cưa, tuổi tác', '齿,龄', 'Hàm răng xếp đều trong khuôn miệng (凵) với chữ Chỉ (止) chỉ âm ở trên: Răng (牙齿), Tuổi (年龄).'],
    // --- 16 NÉT (#212 - #213) ---
    [212, '龙', '龍', 'lóng', 'long', 16, 'Con rồng, linh vật biểu tượng quyền uy và may mắn', '龙,袭,聋,笼', 'Rồng thiêng uốn lượn bay lên mây: Con rồng (龙), Đèn lồng (灯笼).'],
    [213, '龟', '龜', 'guī', 'quy', 16, 'Con rùa, trường thọ, mai rùa', '龟,龝', 'Con rùa có đầu nhô lên trên, mai rùa ở giữa và cái đuôi cong ở dưới: Con rùa (乌龟).'],
    // --- 17 NÉT (#214) ---
    [214, '龠', '', 'yuè', 'dược', 17, 'Ống sáo trúc nhiều lỗ thời cổ đại, hòa hợp âm nhạc', '龠,龢', 'Bộ thủ thứ 214 (17 nét - nhiều nét nhất): Hình chiếc sáo trúc nhiều ống ghép lại thổi thành nhạc lễ.']
  ];

  /**
   * Build enriched list of radicals by linking with HSK3_DEFAULT_VOCAB
   * Modes:
   *  - 'core': 50 high-frequency HSK radicals & left/top/bottom variants
   *  - 'kangxi214': All 214 standard Kangxi Radicals (#1 to #214)
   *  - 'full137': 137 radicals extracted from HSK 3 vocabulary decompositions
   *  - 'all_merged': Union of kangxi214 + core + full137 for Inspector lookup
   */
  function getEnrichedRadicals(mode = 'core') {
    const allVocab = window.HSKStorage ? window.HSKStorage.getAllVocab() : (window.HSK3_DEFAULT_VOCAB || []);
    const vocabByRad = new Map();

    allVocab.forEach(w => {
      (w.decomposition || []).forEach(d => {
        const radSymbol = (d.radical || '').trim().split(/\s+/)[0];
        if (!radSymbol) return;
        if (!vocabByRad.has(radSymbol)) {
          vocabByRad.set(radSymbol, {
            fullLabel: d.radical,
            chars: new Set(),
            words: [],
            mnemonics: []
          });
        }
        const entry = vocabByRad.get(radSymbol);
        entry.chars.add(d.char);
        if (!entry.words.some(existing => existing.id === w.id)) {
          entry.words.push(w);
        }
        if (d.mnemonic && entry.mnemonics.length < 3) {
          entry.mnemonics.push(`${d.char}: ${d.mnemonic}`);
        }
      });
    });

    // Map Kangxi IDs by symbol & variant for cross-referencing
    const kangxiBySymbol = new Map();
    KANGXI_214_RAW.forEach(row => {
      const [kxId, radSym, varStr] = row;
      kangxiBySymbol.set(radSym, kxId);
      if (varStr) {
        varStr.split(',').forEach(v => {
          const cleanV = v.replace(/\(.*?\)/g, '').trim();
          if (cleanV && !kangxiBySymbol.has(cleanV)) {
            kangxiBySymbol.set(cleanV, kxId);
          }
        });
      }
    });

    const coreMap = new Map();
    const enrichedCore = CORE_RADICALS.map(rad => {
      const matched = vocabByRad.get(rad.radical) || vocabByRad.get(rad.standalone) || {
        chars: new Set(),
        words: []
      };
      const matchedWords = [...matched.words];
      allVocab.forEach(w => {
        if (!matchedWords.some(mw => mw.id === w.id)) {
          if (rad.sampleChars.some(sc => w.hanzi.includes(sc))) {
            matchedWords.push(w);
          }
        }
      });

      const mergedChars = Array.from(new Set([...rad.sampleChars, ...Array.from(matched.chars)]));
      const kxId = kangxiBySymbol.get(rad.radical) || kangxiBySymbol.get(rad.standalone) || null;
      const item = {
        ...rad,
        kangxiId: kxId,
        isCore: true,
        hskWords: matchedWords,
        allChars: mergedChars
      };
      coreMap.set(rad.radical, item);
      return item;
    });

    if (mode === 'core') {
      return enrichedCore;
    }

    // Build the full 214 Kangxi Radicals list (#1 to #214)
    const enrichedKangxi214 = KANGXI_214_RAW.map(row => {
      const [kxId, radSym, varStr, pinyin, hanViet, strokes, meaning, sampleCSV, mnemonic] = row;
      const sampleChars = sampleCSV.split(',').map(s => s.trim()).filter(Boolean);
      const variantSymbols = varStr
        ? varStr.split(',').map(v => v.replace(/\(.*?\)/g, '').trim()).filter(Boolean)
        : [];

      // Find any rich core entry matching this Kangxi radical or its primary variant
      const richCore =
        coreMap.get(radSym) ||
        variantSymbols.map(v => coreMap.get(v)).find(Boolean) ||
        null;

      // Gather HSK 3 words from decomposition + sampleChars
      const hskWords = [];
      const charSet = new Set(sampleChars);

      [radSym, ...variantSymbols].forEach(sym => {
        const vEntry = vocabByRad.get(sym);
        if (vEntry) {
          vEntry.chars.forEach(c => charSet.add(c));
          vEntry.words.forEach(w => {
            if (!hskWords.some(existing => existing.id === w.id)) {
              hskWords.push(w);
            }
          });
        }
      });

      allVocab.forEach(w => {
        if (!hskWords.some(mw => mw.id === w.id)) {
          if (sampleChars.some(sc => sc.length === 1 && w.hanzi.includes(sc))) {
            hskWords.push(w);
          }
        }
      });

      const allChars = Array.from(charSet);
      // Choose a valid standard CJK character for HanziWriter stroke practice
      const drawableChar =
        (richCore && richCore.standalone) ||
        sampleChars.find(c => c.length === 1) ||
        radSym;

      return {
        kangxiId: kxId,
        radical: radSym,
        standalone: drawableChar,
        variants: varStr ? `${radSym} • Biến thể: ${varStr}` : `${radSym} (Bộ Khang Hy #${kxId})`,
        name: `Bộ ${hanViet.charAt(0).toUpperCase() + hanViet.slice(1)}`,
        pinyin,
        hanViet,
        strokes,
        position: richCore ? richCore.position : `Bộ Khang Hy #${kxId} (${strokes} nét)`,
        category: richCore ? richCore.category : 'objects_places',
        meaning: richCore ? richCore.meaning : meaning,
        origin: richCore ? richCore.origin : `Bộ thủ thứ #${kxId} trong 214 Bộ Thủ Khang Hy (${strokes} nét).`,
        mnemonic: richCore ? richCore.mnemonic : mnemonic,
        confusableWith: richCore ? richCore.confusableWith : null,
        sampleChars,
        allChars,
        hskWords,
        isCore: Boolean(richCore)
      };
    });

    if (mode === 'kangxi214') {
      return enrichedKangxi214;
    }

    // Merge remaining radicals from the 137 vocabulary decomposition radicals
    const extraRadicals = [];
    vocabByRad.forEach((val, radKey) => {
      if (coreMap.has(radKey)) return;
      const bracketMatch = val.fullLabel.match(/\(([^)]+)\)/);
      const desc = bracketMatch ? bracketMatch[1] : val.fullLabel;
      const parts = desc.split(/\s*-\s*/);
      const hanViet = parts[0] || 'Bộ HSK';
      const meaning = parts[1] || `Bộ thủ cấu tạo chữ (${desc})`;
      const sampleChars = Array.from(val.chars);

      extraRadicals.push({
        kangxiId: kangxiBySymbol.get(radKey) || null,
        radical: radKey,
        standalone: sampleChars[0] || radKey,
        variants: val.fullLabel,
        name: `Bộ ${hanViet}`,
        pinyin: '',
        hanViet: hanViet.toLowerCase(),
        strokes: 3,
        position: 'Thành phần cấu tạo chữ HSK 3',
        category: 'objects_places',
        meaning: meaning.charAt(0).toUpperCase() + meaning.slice(1),
        origin: `Xuất hiện trong ${val.words.length} từ vựng giáo trình HSK 3.`,
        mnemonic: val.mnemonics.join(' • ') || `Ghi nhớ bộ ${val.fullLabel} qua các từ HSK 3.`,
        confusableWith: null,
        sampleChars,
        allChars: sampleChars,
        hskWords: val.words,
        isCore: false
      });
    });

    if (mode === 'full137') {
      return [...enrichedCore, ...extraRadicals];
    }

    // 'all_merged': deduplicated union of kangxi214 + enrichedCore + extraRadicals
    const mergedMap = new Map();
    [...enrichedCore, ...enrichedKangxi214, ...extraRadicals].forEach(item => {
      if (!mergedMap.has(item.radical)) {
        mergedMap.set(item.radical, item);
      }
    });
    return Array.from(mergedMap.values());
  }

  function getFilteredRadicals() {
    let mode = 'core';
    if (currentCategory === 'kangxi214') {
      mode = 'kangxi214';
    } else if (currentCategory === 'full137') {
      mode = 'full137';
    }
    const list = getEnrichedRadicals(mode);
    const q = searchQuery.trim().toLowerCase();

    return list.filter(item => {
      if (currentCategory === 'confusable' && !item.confusableWith) return false;
      if (
        currentCategory !== 'all' &&
        currentCategory !== 'kangxi214' &&
        currentCategory !== 'confusable' &&
        currentCategory !== 'full137' &&
        item.category !== currentCategory
      ) {
        return false;
      }
      if (currentStrokeFilter > 0) {
        if (currentStrokeFilter === 100) {
          if (item.strokes < 10) return false;
        } else if (item.strokes !== currentStrokeFilter) {
          return false;
        }
      }
      if (!q) return true;
      const kxMatch = item.kangxiId && (`#${item.kangxiId}` === q || `${item.kangxiId}` === q || `bộ ${item.kangxiId}` === q);
      return (
        kxMatch ||
        item.radical.includes(q) ||
        item.standalone.includes(q) ||
        (item.variants && item.variants.toLowerCase().includes(q)) ||
        item.name.toLowerCase().includes(q) ||
        item.hanViet.toLowerCase().includes(q) ||
        (item.pinyin && item.pinyin.toLowerCase().includes(q)) ||
        item.meaning.toLowerCase().includes(q) ||
        item.mnemonic.toLowerCase().includes(q) ||
        item.allChars.some(c => c.includes(q))
      );
    });
  }

  function render() {
    const rootEl = document.getElementById('view-radicals');
    if (!rootEl) return;

    const kxList = getEnrichedRadicals('kangxi214');
    const coreList = getEnrichedRadicals('core');
    const masteredKx = kxList.filter(r => window.HSKStorage.getRadicalRecord(r.radical).mastered).length;
    const masteredCore = coreList.filter(r => window.HSKStorage.getRadicalRecord(r.radical).mastered).length;

    const headerStatsEl = document.getElementById('radicals-mastery-summary');
    if (headerStatsEl) {
      headerStatsEl.innerHTML = `Đã thuộc: <strong class="text-emerald-400 font-mono-code">${masteredCore}/50</strong> bộ cốt lõi • <strong class="text-amber-300 font-mono-code">${masteredKx}/214</strong> bộ Khang Hy`;
    }

    // Update sub-tab buttons
    rootEl.querySelectorAll('[data-rad-subtab]').forEach(btn => {
      const tab = btn.getAttribute('data-rad-subtab');
      if (tab === activeSubTab) {
        btn.className = 'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transition flex items-center gap-1.5';
      } else {
        btn.className = 'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition flex items-center gap-1.5';
      }
    });

    ['explorer', 'flashcard', 'twins', 'quiz'].forEach(sub => {
      const subEl = document.getElementById(`rad-subview-${sub}`);
      if (subEl) {
        subEl.classList.toggle('hidden', sub !== activeSubTab);
      }
    });

    if (activeSubTab === 'explorer') {
      renderExplorerSubView();
    } else if (activeSubTab === 'flashcard') {
      renderFlashcardSubView();
    } else if (activeSubTab === 'twins') {
      renderTwinsSubView();
    } else if (activeSubTab === 'quiz') {
      if (!quizQuestion) generateNextQuizQuestion();
      renderQuizSubView();
    }
  }

  // ============================================================================
  // SUB-VIEW 1: EXPLORER GRID + DEEP-DIVE INSPECTOR & HANZI WRITER
  // ============================================================================
  function renderExplorerSubView() {
    const filtered = getFilteredRadicals();
    const countEl = document.getElementById('rad-explorer-count');
    if (countEl) {
      countEl.textContent = `Hiển thị ${filtered.length} bộ thủ`;
    }

    // Highlight active category pill
    document.querySelectorAll('[data-rad-cat]').forEach(btn => {
      const cat = btn.getAttribute('data-rad-cat');
      if (cat === currentCategory) {
        btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white border border-indigo-400 shadow-md transition';
      } else {
        btn.className = 'px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700 transition';
      }
    });

    const strokeSelectEl = document.getElementById('rad-stroke-filter');
    if (strokeSelectEl) {
      strokeSelectEl.value = String(currentStrokeFilter);
    }

    const gridEl = document.getElementById('rad-explorer-grid');
    if (!gridEl) return;

    if (!filtered.some(r => r.radical === selectedRadicalKey) && filtered.length > 0) {
      selectedRadicalKey = filtered[0].radical;
      activeWriterChar = filtered[0].standalone || filtered[0].allChars[0] || '水';
    }

    if (filtered.length === 0) {
      gridEl.innerHTML = `
        <div class="col-span-full p-8 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-2">
          <div class="text-2xl">🔍</div>
          <div class="text-sm font-bold text-white">Không tìm thấy bộ thủ phù hợp với bộ lọc hiện tại</div>
          <p class="text-xs text-slate-400">Hãy thử chọn "👑 Trọn bộ 214 Bộ Thủ Khang Hy" hoặc chọn "Tất cả số nét" nhé!</p>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = filtered
      .map(rad => {
        const isSelected = rad.radical === selectedRadicalKey;
        const rec = window.HSKStorage.getRadicalRecord(rad.radical);
        const charPills = rad.allChars
          .slice(0, 7)
          .map(ch => `<span class="px-1.5 py-0.5 rounded bg-slate-950 text-slate-200 font-hanzi-serif text-sm border border-slate-800">${ch}</span>`)
          .join('');
        const kxBadge = rad.kangxiId
          ? `<span class="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono-code text-[10px] font-bold border border-indigo-500/30">Bộ #${rad.kangxiId}</span>`
          : '';

        return `
          <div
            data-rad-card="${rad.radical}"
            class="p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between gap-3 ${
              isSelected
                ? 'bg-indigo-950/40 border-indigo-400 shadow-lg shadow-indigo-500/15'
                : 'bg-slate-900/90 border-slate-800 hover:border-indigo-500/50'
            }"
          >
            <div>
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-3">
                  <div class="w-14 h-14 rounded-2xl bg-slate-950 border border-indigo-500/30 flex items-center justify-center font-hanzi-serif text-4xl font-bold text-white shadow-inner shrink-0">
                    ${rad.radical}
                  </div>
                  <div>
                    <div class="flex items-center gap-1.5 flex-wrap">
                      ${kxBadge}
                      <h4 class="text-sm font-extrabold text-white">${rad.name}</h4>
                      <span class="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-[10px] font-bold uppercase border border-amber-500/30">
                        [${rad.hanViet}]
                      </span>
                    </div>
                    <div class="text-[11px] text-slate-400 mt-0.5">
                      ${rad.strokes} nét • ${rad.variants || rad.position}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  data-rad-toggle-master="${rad.radical}"
                  class="px-2 py-1 rounded-lg text-[11px] font-bold border transition shrink-0 ${
                    rec.mastered
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }"
                  title="Đánh dấu đã thuộc / chưa thuộc bộ thủ này"
                >
                  ${rec.mastered ? '✓ Đã thuộc' : '○ Chưa thuộc'}
                </button>
              </div>

              <div class="text-xs font-bold text-emerald-300 mt-2.5">
                🎯 Biểu ý: ${rad.meaning}
              </div>

              <p class="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
                💡 ${rad.mnemonic}
              </p>
            </div>

            <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <div class="flex items-center gap-1 flex-wrap">
                <span class="text-[10px] text-slate-400 mr-0.5">Chữ mẫu:</span>
                ${charPills}
              </div>
              <button
                type="button"
                data-rad-jump-vocab="${rad.radical}"
                class="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 underline-offset-2 hover:underline whitespace-nowrap"
              >
                ${rad.hskWords.length > 0 ? `📚 ${rad.hskWords.length} từ HSK 3 →` : 'Xem chi tiết →'}
              </button>
            </div>
          </div>
        `;
      })
      .join('');

    gridEl.querySelectorAll('[data-rad-card]').forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('[data-rad-toggle-master]') || e.target.closest('[data-rad-jump-vocab]')) return;
        const key = card.getAttribute('data-rad-card');
        selectRadicalForInspector(key, false);
      });
    });

    gridEl.querySelectorAll('[data-rad-jump-vocab]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const key = btn.getAttribute('data-rad-jump-vocab');
        selectRadicalForInspector(key, true);
      });
    });

    gridEl.querySelectorAll('[data-rad-toggle-master]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const key = btn.getAttribute('data-rad-toggle-master');
        const cur = window.HSKStorage.getRadicalRecord(key).mastered;
        window.HSKStorage.setRadicalMastered(key, !cur);
        if (!cur && window.HSKSound) window.HSKSound.playTing(1);
        render();
      });
    });

    renderRadicalInspector();
  }

  function selectRadicalForInspector(radKey, scrollToVocab = false) {
    selectedRadicalKey = radKey;
    const all = getEnrichedRadicals('all_merged');
    const found = all.find(r => r.radical === radKey) || all[0];
    if (found) {
      activeWriterChar = found.standalone || found.allChars[0] || '水';
    }
    renderExplorerSubView();

    const gridEl = document.getElementById('rad-explorer-grid');
    const inspectorEl = document.getElementById('rad-inspector-panel');
    if (!inspectorEl) return;

    // Align the non-sticky inspector panel to current viewport position on desktop so it never feels "fixed/stuck" when scrolling the page
    if (gridEl && window.innerWidth >= 1024) {
      const gridRect = gridEl.getBoundingClientRect();
      const topNavHeight = 100;
      if (gridRect.top < topNavHeight) {
        const desiredOffset = Math.max(0, Math.round(topNavHeight - gridRect.top));
        const maxOffset = Math.max(0, gridEl.offsetHeight - 320);
        inspectorEl.style.marginTop = `${Math.min(desiredOffset, maxOffset)}px`;
      } else {
        inspectorEl.style.marginTop = '0px';
      }
    } else {
      inspectorEl.style.marginTop = '0px';
    }

    setTimeout(() => {
      if (scrollToVocab) {
        const vocabSec = document.getElementById('rad-inspector-vocab-section');
        if (vocabSec) {
          vocabSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (window.innerWidth < 1024) {
        inspectorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 40);
  }

  function renderRadicalInspector() {
    const inspectorEl = document.getElementById('rad-inspector-panel');
    if (!inspectorEl) return;

    const all = getEnrichedRadicals('all_merged');
    const rad = all.find(r => r.radical === selectedRadicalKey) || all[0];
    if (!rad) return;

    const rec = window.HSKStorage.getRadicalRecord(rad.radical);
    const practiceChars = Array.from(new Set([rad.standalone, ...rad.allChars])).filter(c => /[\u4e00-\u9fa5]/.test(c)).slice(0, 10);
    if (!practiceChars.includes(activeWriterChar) && practiceChars.length > 0) {
      activeWriterChar = practiceChars[0];
    }

    const practiceCharButtons = practiceChars
      .map(
        ch => `
        <button
          type="button"
          data-rad-writer-char="${ch}"
          class="w-9 h-9 rounded-xl font-hanzi-serif text-lg font-bold border transition flex items-center justify-center ${
            ch === activeWriterChar
              ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
          }"
          title="Bấm để luyện viết chữ ${ch}"
        >
          ${ch}
        </button>
      `
      )
      .join('');

    const confusableHTML = rad.confusableWith
      ? `
        <div class="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-1">
          <div class="text-xs font-extrabold text-rose-300 flex items-center gap-1.5">
            <span>⚠️ Cẩn thận nhầm với:</span>
            <span class="px-2 py-0.5 rounded bg-rose-500/20 font-hanzi-serif text-base text-white">${rad.confusableWith.rad}</span>
            <span>(${rad.confusableWith.name})</span>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">${rad.confusableWith.tip}</p>
        </div>
      `
      : '';

    const hskWordsHTML = rad.hskWords.length > 0
      ? rad.hskWords
          .map(
            w => `
            <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 flex items-center justify-between gap-2 transition">
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-hanzi-serif text-xl font-bold text-white">${w.hanzi}</span>
                  <span class="text-[11px] font-bold text-amber-300 uppercase">[${w.hanViet}]</span>
                  <span class="text-[10px] text-slate-500">Bài ${w.lesson}</span>
                </div>
                <div class="text-xs text-slate-300">${w.meaning}</div>
              </div>
              <div class="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  data-rad-word-speak="${w.hanzi}"
                  class="px-2 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 text-xs"
                  title="Nghe phát âm"
                >
                  🔊
                </button>
                <button
                  type="button"
                  data-rad-word-jump="${w.id}"
                  class="px-2 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-semibold transition"
                  title="Mở thẻ Flashcard 3D của từ này"
                >
                  🃏 Thẻ
                </button>
              </div>
            </div>
          `
          )
          .join('')
      : `<div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">Chữ Hán mẫu thông dụng chứa bộ này: <strong class="font-hanzi-serif text-base text-white ml-1">${rad.allChars.join(' • ')}</strong></div>`;

    inspectorEl.innerHTML = `
      <div class="space-y-4">
        <!-- Header Info -->
        <div class="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
          <div class="flex items-center gap-3.5">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600/30 to-slate-950 border-2 border-indigo-400 flex items-center justify-center font-hanzi-serif text-5xl font-bold text-white shadow-lg shrink-0">
              ${rad.radical}
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                ${rad.kangxiId ? `<span class="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono-code text-xs font-bold border border-indigo-500/30">Bộ #${rad.kangxiId}</span>` : ''}
                <h3 class="text-lg font-extrabold text-white">${rad.name}</h3>
                <span class="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase border border-amber-500/30">
                  Hán Việt: ${rad.hanViet}
                </span>
              </div>
              <div class="text-xs text-indigo-300 font-medium mt-0.5">${rad.variants}</div>
              <div class="text-xs text-slate-400 mt-0.5">Số nét: <strong>${rad.strokes} nét</strong> • Vị trí: <strong>${rad.position}</strong></div>
            </div>
          </div>

          <div class="flex flex-col items-end gap-1.5 shrink-0">
            <button
              type="button"
              id="btn-rad-inspector-speak"
              class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
            >
              🔊 Nghe âm
            </button>
            <button
              type="button"
              id="btn-rad-inspector-master"
              class="px-3 py-1 rounded-xl text-xs font-bold border transition ${
                rec.mastered
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }"
            >
              ${rec.mastered ? '✓ Đã thuộc bộ này' : '○ Đánh dấu Đã thuộc'}
            </button>
          </div>
        </div>

        <!-- Core Semantic & Mnemonic -->
        <div class="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
          <div class="text-xs font-bold text-emerald-400">
            🎯 Ý nghĩa biểu ý: <span class="text-white">${rad.meaning}</span>
          </div>
          <div class="text-xs text-slate-300 leading-relaxed">
            🏛️ <strong>Nguồn gốc tượng hình:</strong> ${rad.origin}
          </div>
          <div class="text-xs text-amber-200 leading-relaxed">
            💡 <strong>Mẹo nhớ nhanh:</strong> ${rad.mnemonic}
          </div>
        </div>

        ${confusableHTML}

        <!-- HSK 3 Vocabulary Containing This Radical (PLACED IMMEDIATELY VISIBLE NEAR TOP) -->
        <div id="rad-inspector-vocab-section" class="p-3.5 rounded-2xl bg-slate-950/90 border border-indigo-500/30 space-y-2.5">
          <div class="flex items-center justify-between">
            <div class="text-xs font-extrabold uppercase tracking-wider text-indigo-300">
              📚 Từ Vựng HSK 3 Chứa ${rad.name} (${rad.hskWords.length} từ):
            </div>
            <span class="text-[11px] text-slate-400">Lăn chuột tự nhiên để xem hết ↓</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${hskWordsHTML}
          </div>
        </div>

        <!-- Interactive HanziWriter Studio for Radical & Sample Characters -->
        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-extrabold uppercase tracking-wider text-indigo-400">
              ✍️ Tập Viết Nét Bộ Thủ & Chữ Mẫu (Hanzi Writer)
            </span>
            <span class="text-[11px] text-slate-400">Đang chọn: <strong class="text-white font-hanzi-serif text-sm">${activeWriterChar}</strong></span>
          </div>

          <!-- Character Switcher Pills -->
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-[11px] text-slate-400 mr-1">Chọn chữ:</span>
            ${practiceCharButtons}
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-4 pt-1">
            <div
              id="rad-hanzi-writer-box"
              class="stroke-canvas-box flex items-center justify-center cursor-crosshair select-none shrink-0"
              style="width: 164px; height: 164px;"
            ></div>

            <div class="flex-1 space-y-2.5 w-full">
              <div class="flex flex-wrap gap-2">
                <button
                  type="button"
                  id="btn-rad-writer-animate"
                  class="flex-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                >
                  ▶ Xem nét mẫu
                </button>
                <button
                  type="button"
                  id="btn-rad-writer-quiz"
                  class="flex-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition"
                >
                  ✍️ Tự vẽ nét
                </button>
              </div>
              <div
                id="rad-writer-feedback"
                class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 text-center"
              >
                Bấm "✍️ Tự vẽ nét" rồi dùng chuột viết chữ "${activeWriterChar}" lên ô kẻ!
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind audio & mastery buttons
    const speakBtn = document.getElementById('btn-rad-inspector-speak');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        window.HSKSound.speak(rad.standalone || rad.allChars[0] || rad.radical, 0.9);
      });
    }

    const masterBtn = document.getElementById('btn-rad-inspector-master');
    if (masterBtn) {
      masterBtn.addEventListener('click', () => {
        window.HSKStorage.setRadicalMastered(rad.radical, !rec.mastered);
        if (!rec.mastered && window.HSKSound) window.HSKSound.playTing(1);
        render();
      });
    }

    // Bind character switcher for HanziWriter
    inspectorEl.querySelectorAll('[data-rad-writer-char]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeWriterChar = btn.getAttribute('data-rad-writer-char');
        window.HSKSound.speak(activeWriterChar, 0.95);
        renderRadicalInspector();
      });
    });

    // Bind HSK word actions
    inspectorEl.querySelectorAll('[data-rad-word-speak]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.HSKSound.speak(btn.getAttribute('data-rad-word-speak'), 0.95);
      });
    });

    inspectorEl.querySelectorAll('[data-rad-word-jump]').forEach(btn => {
      btn.addEventListener('click', () => {
        const wid = btn.getAttribute('data-rad-word-jump');
        if (window.HSKApp && window.HSKApp.jumpToWordFlashcard) {
          window.HSKApp.jumpToWordFlashcard(wid);
        }
      });
    });

    // Mount HanziWriter instance
    mountRadicalHanziWriter(activeWriterChar, rad.radical);
  }

  function mountRadicalHanziWriter(charToDraw, radKey) {
    const boxEl = document.getElementById('rad-hanzi-writer-box');
    const fbEl = document.getElementById('rad-writer-feedback');
    if (!boxEl || !window.HanziWriter || !charToDraw) return;

    boxEl.innerHTML = '';
    const isLight = document.documentElement.classList.contains('light');
    try {
      activeWriterInstance = window.HanziWriter.create('rad-hanzi-writer-box', charToDraw, {
        width: 156,
        height: 156,
        padding: 10,
        showOutline: true,
        showCharacter: true,
        strokeAnimationSpeed: 1.15,
        delayBetweenStrokes: 160,
        strokeColor: isLight ? '#0f172a' : '#f8fafc',
        radicalColor: '#6366f1',
        outlineColor: isLight ? '#cbd5e1' : '#334155',
        drawingColor: '#10b981',
        drawingWidth: 18,
        showHintAfterMisses: 3,
        highlightOnComplete: true,
        highlightColor: '#10b981'
      });

      const animBtn = document.getElementById('btn-rad-writer-animate');
      const quizBtn = document.getElementById('btn-rad-writer-quiz');

      if (animBtn) {
        animBtn.addEventListener('click', () => {
          boxEl.classList.remove('quiz-active', 'quiz-mistake');
          activeWriterInstance.cancelQuiz();
          activeWriterInstance.showCharacter();
          activeWriterInstance.showOutline();
          if (fbEl) fbEl.textContent = `Đang mô phỏng thứ tự nét chữ "${charToDraw}"...`;
          activeWriterInstance.animateCharacter({
            onComplete: () => {
              if (fbEl) fbEl.textContent = `Đã mô phỏng xong chữ "${charToDraw}".`;
            }
          });
        });
      }

      if (quizBtn) {
        quizBtn.addEventListener('click', () => {
          boxEl.classList.add('quiz-active');
          activeWriterInstance.hideCharacter();
          activeWriterInstance.showOutline();
          if (fbEl) fbEl.innerHTML = `<span class="text-emerald-400 font-semibold">Hãy dùng chuột vẽ từng nét chữ "${charToDraw}"!</span>`;
          activeWriterInstance.quiz({
            showHintAfterMisses: 3,
            onMistake: strokeData => {
              boxEl.classList.remove('quiz-mistake');
              void boxEl.offsetWidth;
              boxEl.classList.add('quiz-mistake');
              if (window.HSKSound) window.HSKSound.playBuzz();
              if (fbEl) fbEl.innerHTML = `<span class="text-rose-400">Chưa chuẩn nét #${strokeData.strokeNum + 1}! Hãy thử lại.</span>`;
            },
            onCorrectStroke: strokeData => {
              if (window.HSKSound) window.HSKSound.playStrokeHit();
              if (fbEl) fbEl.innerHTML = `<span class="text-emerald-400">✓ Chuẩn nét #${strokeData.strokeNum + 1}! Còn ${strokeData.strokesRemaining} nét.</span>`;
            },
            onComplete: summary => {
              boxEl.classList.remove('quiz-active', 'quiz-mistake');
              if (window.HSKSound) window.HSKSound.playVictory();
              window.HSKStorage.setRadicalMastered(radKey, true);
              if (fbEl) fbEl.innerHTML = `<span class="text-emerald-300 font-bold">🏆 Hoàn thành chữ "${charToDraw}" (Lỗi: ${summary.totalMistakes})! Đã đánh dấu thuộc bộ thủ!</span>`;
            }
          });
        });
      }
    } catch (e) {
      console.warn('Radical HanziWriter error:', e);
    }
  }

  // ============================================================================
  // SUB-VIEW 2: 3D RADICAL FLASHCARDS
  // ============================================================================
  function renderFlashcardSubView() {
    const containerEl = document.getElementById('rad-subview-flashcard');
    if (!containerEl) return;

    let deck = getEnrichedRadicals(fcDeckMode);
    if (fcOnlyUnmastered) {
      const unmastered = deck.filter(r => !window.HSKStorage.getRadicalRecord(r.radical).mastered);
      if (unmastered.length > 0) deck = unmastered;
    }

    if (fcIndex >= deck.length) fcIndex = 0;
    const rad = deck[fcIndex];
    const rec = window.HSKStorage.getRadicalRecord(rad.radical);

    const sampleWordsHTML = rad.hskWords.length > 0
      ? rad.hskWords
          .slice(0, 6)
          .map(
            w => `<span class="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"><strong class="font-hanzi-serif text-base text-white mr-1">${w.hanzi}</strong> [${w.hanViet}] ${w.meaning}</span>`
          )
          .join(' ')
      : rad.allChars
          .map(
            c => `<span class="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-sm font-hanzi-serif text-white">${c}</span>`
          )
          .join(' ');

    containerEl.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-5">
        <div class="flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
          <div class="flex items-center gap-2.5">
            <span class="px-3 py-1 rounded-lg bg-slate-800 text-indigo-300 font-mono-code text-xs font-bold">
              Thẻ ${fcIndex + 1} / ${deck.length}
            </span>
            ${
              rad.kangxiId
                ? `<span class="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono-code text-xs font-bold border border-indigo-500/30">Bộ Khang Hy #${rad.kangxiId}</span>`
                : ''
            }
            <span class="text-xs font-semibold text-slate-300">${rad.name}</span>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              id="btn-rad-fc-deckmode"
              class="px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                fcDeckMode === 'kangxi214'
                  ? 'bg-indigo-600 text-white border-indigo-400'
                  : 'bg-slate-800 text-indigo-300 border-slate-700 hover:text-white'
              }"
            >
              ${fcDeckMode === 'kangxi214' ? '👑 Bộ thẻ: Đủ 214 Bộ Khang Hy' : '📚 Bộ thẻ: 50 Bộ Cốt Lõi (Bấm đổi sang 214 Bộ)'}
            </button>
            <button
              type="button"
              id="btn-rad-fc-filter"
              class="px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                fcOnlyUnmastered
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }"
            >
              ${fcOnlyUnmastered ? '🎯 Đang lọc: Bộ Chưa Thuộc' : 'Tất cả thẻ'}
            </button>
            <span class="px-2.5 py-1 rounded-full text-xs font-bold ${
              rec.mastered ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
            }">
              ${rec.mastered ? '✓ Đã thuộc' : '○ Chưa thuộc'}
            </span>
          </div>
        </div>

        <!-- 3D Flip Card for Radical -->
        <div class="perspective-container">
          <div id="rad-fc-3d-box" class="flashcard-3d cursor-pointer select-none ${fcFlipped ? 'is-flipped' : ''}">
            <!-- FRONT -->
            <div class="flashcard-face bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-800 hover:border-indigo-500/50 shadow-2xl flex flex-col items-center justify-center p-6 text-center">
              <span class="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-2">
                Nhìn Ký Hiệu Bộ Thủ → Đoán Tên Bộ, Ý Nghĩa & Chữ Mẫu
              </span>
              <div class="font-hanzi-serif text-[92px] sm:text-[110px] leading-none font-bold text-white my-4 drop-shadow">
                ${rad.radical}
              </div>
              <div class="px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs text-slate-300">
                ${rad.kangxiId ? `<strong>Bộ Khang Hy #${rad.kangxiId}</strong> • ` : ''}Số nét: <strong>${rad.strokes} nét</strong> • Vị trí: <strong>${rad.position}</strong>
              </div>
              <p class="text-xs text-slate-400 mt-5">
                🔄 Bấm vào thẻ để lật xem giải phẫu bộ thủ & mẹo nhớ!
              </p>
            </div>

            <!-- BACK -->
            <div class="flashcard-face flashcard-back bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-indigo-500/50 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
              <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                <div class="flex items-center gap-4">
                  <div class="font-hanzi-serif text-6xl font-bold text-white">${rad.radical}</div>
                  <div class="text-left">
                    <h3 class="text-xl font-extrabold text-white">${rad.name} ${rad.kangxiId ? `<span class="text-xs text-indigo-400 font-mono-code">(#${rad.kangxiId})</span>` : ''}</h3>
                    <div class="text-xs font-bold text-amber-300 uppercase">
                      Âm Hán Việt: [${rad.hanViet}] • Pinyin: ${rad.pinyin}
                    </div>
                    <div class="text-xs text-slate-400 mt-0.5">${rad.variants}</div>
                  </div>
                </div>
                <button
                  type="button"
                  id="btn-rad-fc-speak"
                  class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  🔊 Nghe
                </button>
              </div>

              <div class="space-y-2.5 text-left my-3">
                <div class="text-sm font-extrabold text-emerald-300">
                  🎯 Ý nghĩa biểu ý: <span class="text-white">${rad.meaning}</span>
                </div>
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                  💡 <strong>Mẹo nhớ:</strong> ${rad.mnemonic}
                </div>
                ${
                  rad.confusableWith
                    ? `<div class="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200">
                        ⚠️ <strong>Phân biệt với ${rad.confusableWith.rad} (${rad.confusableWith.name}):</strong> ${rad.confusableWith.tip}
                      </div>`
                    : ''
                }
              </div>

              <div class="space-y-1.5 text-left border-t border-slate-800 pt-3">
                <div class="text-[11px] font-bold uppercase text-slate-400">Chữ Hán & từ vựng tiêu biểu chứa bộ này:</div>
                <div class="flex flex-wrap gap-1.5">${sampleWordsHTML}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            type="button"
            id="btn-rad-fc-prev"
            class="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-800 transition"
          >
            ← Bộ trước
          </button>
          <button
            type="button"
            id="btn-rad-fc-unmaster"
            class="p-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 text-xs font-bold border border-rose-500/30 transition"
          >
            ❌ Chưa thuộc (Ôn lại)
          </button>
          <button
            type="button"
            id="btn-rad-fc-master"
            class="p-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-bold border border-emerald-500/30 transition"
          >
            ✓ Đã thuộc bộ này!
          </button>
          <button
            type="button"
            id="btn-rad-fc-next"
            class="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-800 transition"
          >
            Bộ tiếp →
          </button>
        </div>
      </div>
    `;

    const cardBox = document.getElementById('rad-fc-3d-box');
    if (cardBox) {
      cardBox.addEventListener('click', e => {
        if (e.target.closest('button')) return;
        fcFlipped = !fcFlipped;
        if (window.HSKSound) window.HSKSound.playFlip();
        cardBox.classList.toggle('is-flipped', fcFlipped);
      });
    }

    const speakBtn = document.getElementById('btn-rad-fc-speak');
    if (speakBtn) {
      speakBtn.addEventListener('click', e => {
        e.stopPropagation();
        window.HSKSound.speak(rad.standalone || rad.allChars[0], 0.9);
      });
    }

    const deckModeBtn = document.getElementById('btn-rad-fc-deckmode');
    if (deckModeBtn) {
      deckModeBtn.addEventListener('click', () => {
        fcDeckMode = fcDeckMode === 'core' ? 'kangxi214' : 'core';
        fcIndex = 0;
        fcFlipped = false;
        renderFlashcardSubView();
      });
    }

    document.getElementById('btn-rad-fc-filter').addEventListener('click', () => {
      fcOnlyUnmastered = !fcOnlyUnmastered;
      fcIndex = 0;
      fcFlipped = false;
      renderFlashcardSubView();
    });

    document.getElementById('btn-rad-fc-prev').addEventListener('click', () => {
      fcFlipped = false;
      fcIndex = (fcIndex - 1 + deck.length) % deck.length;
      renderFlashcardSubView();
    });

    document.getElementById('btn-rad-fc-next').addEventListener('click', () => {
      fcFlipped = false;
      fcIndex = (fcIndex + 1) % deck.length;
      renderFlashcardSubView();
    });

    document.getElementById('btn-rad-fc-unmaster').addEventListener('click', () => {
      window.HSKStorage.setRadicalMastered(rad.radical, false);
      if (window.HSKSound) window.HSKSound.playBuzz();
      fcFlipped = false;
      fcIndex = (fcIndex + 1) % deck.length;
      render();
    });

    document.getElementById('btn-rad-fc-master').addEventListener('click', () => {
      window.HSKStorage.setRadicalMastered(rad.radical, true);
      if (window.HSKSound) window.HSKSound.playTing(2);
      fcFlipped = false;
      fcIndex = (fcIndex + 1) % deck.length;
      render();
    });
  }

  // ============================================================================
  // SUB-VIEW 3: 10 CONFUSABLE TWIN-RADICAL MICROSCOPE COMPARISONS
  // ============================================================================
  function renderTwinsSubView() {
    const containerEl = document.getElementById('rad-subview-twins');
    if (!containerEl) return;

    containerEl.innerHTML = `
      <div class="space-y-4">
        <div class="p-4 rounded-2xl bg-gradient-to-r from-rose-950/70 via-slate-900 to-indigo-950/70 border border-rose-500/30 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 class="text-base sm:text-lg font-extrabold text-white">
              ⚖️ Bảng Soi Kính Hiển Vi 10 Cặp Bộ Thủ Sinh Đôi Dễ Nhầm Nhất
            </h3>
            <p class="text-xs text-slate-300">
              90% lỗi chọn nhầm chữ Hán trong kỳ thi HSK 3 đến từ việc nhìn lộn các cặp bộ thủ chỉ chênh nhau 1 nét chấm hoặc 1 nét ngang dưới đây!
            </p>
          </div>
          <button
            type="button"
            id="btn-twins-start-quiz"
            class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shadow-lg transition"
          >
            ⚡ Test Phản Xạ Phân Biệt Ngay →
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          ${CONFUSABLE_PAIRS.map(
            pair => `
            <div class="p-5 rounded-2xl bg-slate-900/95 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div class="space-y-3">
                <div class="text-sm font-extrabold text-amber-300 border-b border-slate-800 pb-2">
                  ${pair.title}
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <!-- Left Radical -->
                  <div class="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-500/30 space-y-1.5">
                    <div class="flex items-center gap-2.5">
                      <span class="font-hanzi-serif text-4xl font-bold text-white bg-slate-950 px-3 py-1 rounded-xl border border-emerald-500/40">${pair.left.rad}</span>
                      <div>
                        <div class="text-xs font-extrabold text-emerald-300">${pair.left.name}</div>
                        <div class="text-[11px] text-slate-300">${pair.left.meaning}</div>
                      </div>
                    </div>
                    <div class="text-xs text-amber-200 font-medium">🔍 Đặc điểm: ${pair.left.rule}</div>
                    <div class="flex flex-wrap gap-1 pt-1">
                      ${pair.left.examples.map(ex => `<span class="px-2 py-0.5 rounded bg-slate-950 text-[11px] text-slate-200 border border-slate-800">${ex}</span>`).join('')}
                    </div>
                  </div>

                  <!-- Right Radical -->
                  <div class="p-3.5 rounded-xl bg-indigo-950/25 border border-indigo-500/30 space-y-1.5">
                    <div class="flex items-center gap-2.5">
                      <span class="font-hanzi-serif text-4xl font-bold text-white bg-slate-950 px-3 py-1 rounded-xl border border-indigo-500/40">${pair.right.rad}</span>
                      <div>
                        <div class="text-xs font-extrabold text-indigo-300">${pair.right.name}</div>
                        <div class="text-[11px] text-slate-300">${pair.right.meaning}</div>
                      </div>
                    </div>
                    <div class="text-xs text-amber-200 font-medium">🔍 Đặc điểm: ${pair.right.rule}</div>
                    <div class="flex flex-wrap gap-1 pt-1">
                      ${pair.right.examples.map(ex => `<span class="px-2 py-0.5 rounded bg-slate-950 text-[11px] text-slate-200 border border-slate-800">${ex}</span>`).join('')}
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-xs text-amber-300 font-semibold">
                🧠 <strong>Mẹo phân biệt 1 giây:</strong> ${pair.memoryHack}
              </div>
            </div>
          `
          ).join('')}
        </div>
      </div>
    `;

    const startQuizBtn = document.getElementById('btn-twins-start-quiz');
    if (startQuizBtn) {
      startQuizBtn.addEventListener('click', () => {
        activeSubTab = 'quiz';
        quizMode = 'twin_trap';
        generateNextQuizQuestion();
        render();
      });
    }
  }

  // ============================================================================
  // SUB-VIEW 4: INTERACTIVE RADICAL QUIZ & SPEED CHALLENGE
  // ============================================================================
  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function generateNextQuizQuestion() {
    quizLocked = false;
    const poolList = getEnrichedRadicals(quizPoolMode);
    const coreList = getEnrichedRadicals('core');
    const types = quizMode === 'mixed' ? ['meaning', 'char_to_rad', 'twin_trap'] : [quizMode];
    const pickedType = types[Math.floor(Math.random() * types.length)];

    const targetRad = poolList[Math.floor(Math.random() * poolList.length)];
    const distractors = shuffle(poolList.filter(r => r.radical !== targetRad.radical)).slice(0, 3);

    if (pickedType === 'meaning') {
      // Type 1: Given radical symbol -> Pick its meaning & name
      const options = shuffle([targetRad, ...distractors]).map(r => ({
        key: r.radical,
        label: `${r.name} [${r.hanViet.toUpperCase()}]${r.kangxiId ? ` (#${r.kangxiId})` : ''} — ${r.meaning}`,
        isCorrect: r.radical === targetRad.radical
      }));

      quizQuestion = {
        type: 'meaning',
        radKey: targetRad.radical,
        badge: 'Kiểu 1: Nhìn Bộ Thủ → Đoán Tên & Ý Nghĩa Biểu Ý',
        heroSymbol: targetRad.radical,
        prompt: `Bộ thủ "${targetRad.radical}" (${targetRad.kangxiId ? `Bộ Khang Hy #${targetRad.kangxiId} • ` : ''}${targetRad.strokes} nét) mang tên và ý nghĩa gì?`,
        subHint: `Chữ mẫu gợi ý: ${targetRad.allChars.slice(0, 4).join(', ')}`,
        options,
        explanation: `Bộ ${targetRad.radical} là ${targetRad.name} [${targetRad.hanViet}], chỉ: ${targetRad.meaning}. 💡 ${targetRad.mnemonic}`
      };
    } else if (pickedType === 'char_to_rad') {
      // Type 2: Given an HSK 3 word & character -> Identify which radical it uses
      const sampleWord = targetRad.hskWords.length > 0
        ? targetRad.hskWords[Math.floor(Math.random() * targetRad.hskWords.length)]
        : null;
      const sampleChar = targetRad.allChars[Math.floor(Math.random() * Math.min(5, targetRad.allChars.length))] || targetRad.standalone;

      const options = shuffle([targetRad, ...distractors]).map(r => ({
        key: r.radical,
        label: `${r.radical} — ${r.name} (${r.meaning.split(',')[0]})`,
        isCorrect: r.radical === targetRad.radical
      }));

      quizQuestion = {
        type: 'char_to_rad',
        radKey: targetRad.radical,
        badge: 'Kiểu 2: Giải Phẫu Chữ Hán → Tìm Bộ Thủ Cấu Tạo',
        heroSymbol: sampleWord ? sampleWord.hanzi : sampleChar,
        prompt: sampleWord
          ? `Từ "${sampleWord.hanzi}" (${sampleWord.meaning}) có chữ "${sampleChar}" chứa bộ thủ nào dưới đây?`
          : `Chữ Hán "${sampleChar}" được cấu tạo bởi bộ thủ nào?`,
        subHint: `Hãy quan sát kỹ thành phần biểu ý của chữ "${sampleChar}"!`,
        options,
        explanation: `Chữ "${sampleChar}" chứa ${targetRad.name} (${targetRad.radical}) vì liên quan đến: ${targetRad.meaning}.`
      };
    } else {
      // Type 3: Twin-Trap Semantic Discrimination
      const trapCandidates = coreList.filter(r => r.confusableWith);
      const mainRad = trapCandidates[Math.floor(Math.random() * trapCandidates.length)] || targetRad;
      const sampleWord = mainRad.hskWords[0];
      const trapDistractors = shuffle(coreList.filter(r => r.radical !== mainRad.radical)).slice(0, 3);
      const options = shuffle([mainRad, ...trapDistractors]).map(r => ({
        key: r.radical,
        label: `${r.radical} (${r.name} — ${r.meaning.split(',')[0]})`,
        isCorrect: r.radical === mainRad.radical
      }));

      quizQuestion = {
        type: 'twin_trap',
        radKey: mainRad.radical,
        badge: 'Kiểu 3: Chống Mù Bộ Thủ Sinh Đôi (Chọn Bộ Theo Ngữ Nghĩa)',
        heroSymbol: sampleWord ? sampleWord.hanzi : mainRad.allChars[0],
        prompt: `Để biểu đạt ý nghĩa "${mainRad.meaning.split(',')[0].toLowerCase()}" (như trong chữ ${mainRad.allChars.slice(0, 3).join(', ')}), ta bắt buộc phải dùng bộ thủ nào?`,
        subHint: mainRad.confusableWith
          ? `⚠️ Cẩn thận bẫy thị giác với ${mainRad.confusableWith.rad} (${mainRad.confusableWith.name})!`
          : `Hãy nhớ quy tắc biểu ý của bộ thủ!`,
        options,
        explanation: `Đáp án chuẩn là ${mainRad.radical} (${mainRad.name}): ${mainRad.mnemonic}`
      };
    }
  }

  function renderQuizSubView() {
    const containerEl = document.getElementById('rad-subview-quiz');
    if (!containerEl || !quizQuestion) return;

    containerEl.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-5">
        <!-- Quiz HUD & Mode Selector -->
        <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-1.5">
            <button type="button" data-rad-qmode="mixed" class="px-3 py-1.5 rounded-xl text-xs font-bold ${quizMode === 'mixed' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}">
              🔀 Trộn cả 3 kiểu
            </button>
            <button type="button" data-rad-qmode="meaning" class="px-3 py-1.5 rounded-xl text-xs font-bold ${quizMode === 'meaning' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}">
              1️⃣ Nhìn Bộ Đoán Nghĩa
            </button>
            <button type="button" data-rad-qmode="char_to_rad" class="px-3 py-1.5 rounded-xl text-xs font-bold ${quizMode === 'char_to_rad' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}">
              2️⃣ Nhìn Chữ Bắt Bộ
            </button>
            <button type="button" data-rad-qmode="twin_trap" class="px-3 py-1.5 rounded-xl text-xs font-bold ${quizMode === 'twin_trap' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}">
              3️⃣ Bẫy Bộ Sinh Đôi
            </button>
            <button
              type="button"
              id="btn-rad-quiz-pool"
              class="px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                quizPoolMode === 'kangxi214'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-indigo-300 border-slate-700'
              }"
            >
              ${quizPoolMode === 'kangxi214' ? '👑 Đề thi: Đủ 214 Bộ Khang Hy' : '📚 Đề thi: 50 Bộ Cốt Lõi'}
            </button>
          </div>

          <div class="flex items-center gap-4 bg-slate-950 px-4 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span>Điểm: <strong class="text-emerald-400 font-mono-code text-base">${quizScore}</strong></span>
            <span>Combo: <strong class="text-indigo-400 font-mono-code text-base">x${quizCombo}</strong></span>
            <button
              type="button"
              id="btn-rad-jump-sniper"
              class="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold transition"
            >
              🔫 Chơi Xạ Thủ Bộ Thủ
            </button>
          </div>
        </div>

        <!-- Question Card -->
        <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-800 text-center space-y-3">
          <span class="px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            ${quizQuestion.badge}
          </span>
          <div class="font-hanzi-serif text-6xl sm:text-7xl font-bold text-white py-2">
            ${quizQuestion.heroSymbol}
          </div>
          <h3 class="text-base sm:text-lg font-extrabold text-white max-w-xl mx-auto">
            ${quizQuestion.prompt}
          </h3>
          <p class="text-xs text-amber-300">${quizQuestion.subHint}</p>
        </div>

        <!-- 4 Options -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" id="rad-quiz-options">
          ${quizQuestion.options
            .map(
              (opt, idx) => `
              <button
                type="button"
                data-rad-qopt="${idx}"
                class="p-4 rounded-2xl bg-slate-800/85 hover:bg-indigo-600/25 border-2 border-slate-700 hover:border-indigo-400 text-left transition flex items-center gap-3"
              >
                <span class="kbd-pill text-indigo-300">${idx + 1}</span>
                <span class="text-xs sm:text-sm font-bold text-white leading-snug">${opt.label}</span>
              </button>
            `
            )
            .join('')}
        </div>

        <div id="rad-quiz-feedback" class="hidden p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-2"></div>
      </div>
    `;

    containerEl.querySelectorAll('[data-rad-qmode]').forEach(btn => {
      btn.addEventListener('click', () => {
        quizMode = btn.getAttribute('data-rad-qmode');
        generateNextQuizQuestion();
        renderQuizSubView();
      });
    });

    const poolBtn = document.getElementById('btn-rad-quiz-pool');
    if (poolBtn) {
      poolBtn.addEventListener('click', () => {
        quizPoolMode = quizPoolMode === 'core' ? 'kangxi214' : 'core';
        generateNextQuizQuestion();
        renderQuizSubView();
      });
    }

    const sniperBtn = document.getElementById('btn-rad-jump-sniper');
    if (sniperBtn) {
      sniperBtn.addEventListener('click', () => {
        if (window.HSKApp && window.HSKApp.switchTab) {
          window.HSKApp.switchTab('games');
          if (window.HSKGames) window.HSKGames.startGame('game7', false);
        }
      });
    }

    containerEl.querySelectorAll('[data-rad-qopt]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (quizLocked) return;
        quizLocked = true;
        const idx = parseInt(btn.getAttribute('data-rad-qopt'), 10);
        const picked = quizQuestion.options[idx];
        const fbEl = document.getElementById('rad-quiz-feedback');

        window.HSKStorage.recordRadicalQuiz(quizQuestion.radKey, picked.isCorrect);

        if (picked.isCorrect) {
          quizCombo++;
          quizScore += 50 + quizCombo * 10;
          if (window.HSKSound) window.HSKSound.playTing(quizCombo);
          btn.classList.add('border-emerald-400', 'bg-emerald-600/30', 'animate-success-pop');
        } else {
          quizCombo = 0;
          if (window.HSKSound) window.HSKSound.playBuzz();
          btn.classList.add('border-rose-500', 'bg-rose-600/30', 'animate-shake');
          containerEl.querySelectorAll('[data-rad-qopt]').forEach((b, i) => {
            if (quizQuestion.options[i].isCorrect) {
              b.classList.add('border-emerald-400', 'bg-emerald-600/30');
            }
          });
        }

        if (fbEl) {
          fbEl.classList.remove('hidden');
          fbEl.innerHTML = `
            <div class="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <span class="text-xs sm:text-sm font-extrabold ${picked.isCorrect ? 'text-emerald-400' : 'text-rose-400'}">
                ${picked.isCorrect ? '🎉 Chuẩn xác! Bạn đã nắm vững bộ thủ này!' : '❌ Nhầm bộ thủ rồi! Hãy đọc kỹ giải thích bên dưới:'}
              </span>
              <button
                type="button"
                id="btn-rad-quiz-next"
                class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition whitespace-nowrap"
              >
                Câu tiếp theo →
              </button>
            </div>
            <div class="text-xs text-slate-200 leading-relaxed">${quizQuestion.explanation}</div>
          `;
          document.getElementById('btn-rad-quiz-next').addEventListener('click', () => {
            generateNextQuizQuestion();
            render();
          });
        }
      });
    });
  }

  function bindEvents() {
    const rootEl = document.getElementById('view-radicals');
    if (!rootEl) return;

    rootEl.querySelectorAll('[data-rad-subtab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeSubTab = btn.getAttribute('data-rad-subtab');
        render();
      });
    });

    rootEl.querySelectorAll('[data-rad-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-rad-cat');
        const inspectorEl = document.getElementById('rad-inspector-panel');
        if (inspectorEl) inspectorEl.style.marginTop = '0px';
        renderExplorerSubView();
      });
    });

    const strokeSelectEl = document.getElementById('rad-stroke-filter');
    if (strokeSelectEl) {
      strokeSelectEl.addEventListener('change', () => {
        currentStrokeFilter = parseInt(strokeSelectEl.value, 10) || 0;
        if (currentStrokeFilter >= 9 && currentCategory !== 'kangxi214') {
          currentCategory = 'kangxi214';
        }
        const inspectorEl = document.getElementById('rad-inspector-panel');
        if (inspectorEl) inspectorEl.style.marginTop = '0px';
        renderExplorerSubView();
      });
    }

    const searchInput = document.getElementById('rad-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value || '';
        const inspectorEl = document.getElementById('rad-inspector-panel');
        if (inspectorEl) inspectorEl.style.marginTop = '0px';
        renderExplorerSubView();
      });
    }
  }

  function init() {
    bindEvents();
    render();
  }

  return {
    init,
    render,
    selectRadicalForInspector
  };
})();
