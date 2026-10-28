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
  let currentCategory = 'all';   // 'all' | 'human' | 'action' | 'mind_speech' | 'nature' | 'objects_places' | 'confusable' | 'full137'
  let searchQuery = '';
  let selectedRadicalKey = '氵';
  let activeWriterInstance = null;
  let activeWriterChar = '水';

  // Flashcard state
  let fcIndex = 0;
  let fcFlipped = false;
  let fcOnlyUnmastered = false;

  // Quiz state
  let quizMode = 'mixed'; // 'mixed' | 'meaning' | 'char_to_rad' | 'twin_trap'
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

  /**
   * Build enriched list of radicals by linking with HSK3_DEFAULT_VOCAB
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

    const coreMap = new Map();
    const enrichedCore = CORE_RADICALS.map(rad => {
      const matched = vocabByRad.get(rad.radical) || vocabByRad.get(rad.standalone) || {
        chars: new Set(),
        words: []
      };
      // Also match words containing any of sampleChars if decomposition used standalone or variant
      const matchedWords = [...matched.words];
      allVocab.forEach(w => {
        if (matchedWords.length < 18 && !matchedWords.some(mw => mw.id === w.id)) {
          if (rad.sampleChars.some(sc => w.hanzi.includes(sc))) {
            matchedWords.push(w);
          }
        }
      });

      const mergedChars = Array.from(new Set([...rad.sampleChars, ...Array.from(matched.chars)]));
      const item = {
        ...rad,
        isCore: true,
        hskWords: matchedWords,
        allChars: mergedChars
      };
      coreMap.set(rad.radical, item);
      return item;
    });

    if (mode !== 'full137') {
      return enrichedCore;
    }

    // Merge remaining radicals from the 137 vocabulary decomposition radicals
    const extraRadicals = [];
    vocabByRad.forEach((val, radKey) => {
      if (coreMap.has(radKey)) return;
      const bracketMatch = val.fullLabel.match(/\(([^)]+)\)/);
      const desc = bracketMatch ? bracketMatch[1] : val.fullLabel;
      const parts = desc.split(/\s*-\s*/);
      const hanViet = parts[0] || 'Bộ HSK';
      const meaning = parts[1] || `Bộ thủ cấu tạo chữ (${ desc })`;
      const sampleChars = Array.from(val.chars);

      extraRadicals.push({
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

    return [...enrichedCore, ...extraRadicals];
  }

  function getFilteredRadicals() {
    const mode = currentCategory === 'full137' ? 'full137' : 'core';
    const list = getEnrichedRadicals(mode);
    const q = searchQuery.trim().toLowerCase();

    return list.filter(item => {
      if (currentCategory === 'confusable' && !item.confusableWith) return false;
      if (
        currentCategory !== 'all' &&
        currentCategory !== 'confusable' &&
        currentCategory !== 'full137' &&
        item.category !== currentCategory
      ) {
        return false;
      }
      if (!q) return true;
      return (
        item.radical.includes(q) ||
        item.standalone.includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.hanViet.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.mnemonic.toLowerCase().includes(q) ||
        item.allChars.some(c => c.includes(q))
      );
    });
  }

  function render() {
    const rootEl = document.getElementById('view-radicals');
    if (!rootEl) return;

    const coreList = getEnrichedRadicals('core');
    const masteredCount = coreList.filter(r => window.HSKStorage.getRadicalRecord(r.radical).mastered).length;
    const pct = Math.round((masteredCount / coreList.length) * 100);

    const headerStatsEl = document.getElementById('radicals-mastery-summary');
    if (headerStatsEl) {
      headerStatsEl.innerHTML = `Đã thuộc: <strong class="text-emerald-400 font-mono-code">${masteredCount}/${coreList.length}</strong> bộ cốt lõi (${pct}%)`;
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
      countEl.textContent = `${filtered.length} bộ thủ`;
    }

    // Highlight active category pill
    document.querySelectorAll('[data-rad-cat]').forEach(btn => {
      const cat = btn.getAttribute('data-rad-cat');
      if (cat === currentCategory) {
        btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white border border-indigo-400 transition';
      } else {
        btn.className = 'px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700 transition';
      }
    });

    const gridEl = document.getElementById('rad-explorer-grid');
    if (!gridEl) return;

    if (!filtered.some(r => r.radical === selectedRadicalKey) && filtered.length > 0) {
      selectedRadicalKey = filtered[0].radical;
      activeWriterChar = filtered[0].standalone || filtered[0].allChars[0] || '水';
    }

    gridEl.innerHTML = filtered
      .map(rad => {
        const isSelected = rad.radical === selectedRadicalKey;
        const rec = window.HSKStorage.getRadicalRecord(rad.radical);
        const charPills = rad.allChars
          .slice(0, 7)
          .map(ch => `<span class="px-1.5 py-0.5 rounded bg-slate-950 text-slate-200 font-hanzi-serif text-sm border border-slate-800">${ch}</span>`)
          .join('');

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
                  <div class="w-14 h-14 rounded-2xl bg-slate-950 border border-indigo-500/30 flex items-center justify-center font-hanzi-serif text-4xl font-bold text-white shadow-inner">
                    ${rad.radical}
                  </div>
                  <div>
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <h4 class="text-sm font-extrabold text-white">${rad.name}</h4>
                      <span class="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-[10px] font-bold uppercase border border-amber-500/30">
                        [${rad.hanViet}]
                      </span>
                    </div>
                    <div class="text-[11px] text-slate-400 mt-0.5">
                      ${rad.strokes} nét • ${rad.position}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  data-rad-toggle-master="${rad.radical}"
                  class="px-2 py-1 rounded-lg text-[11px] font-bold border transition ${
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
              <span class="text-[11px] font-semibold text-indigo-400 whitespace-nowrap">
                ${rad.hskWords.length} từ HSK 3 →
              </span>
            </div>
          </div>
        `;
      })
      .join('');

    gridEl.querySelectorAll('[data-rad-card]').forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('[data-rad-toggle-master]')) return;
        const key = card.getAttribute('data-rad-card');
        selectRadicalForInspector(key);
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

  function selectRadicalForInspector(radKey) {
    selectedRadicalKey = radKey;
    const all = getEnrichedRadicals('full137');
    const found = all.find(r => r.radical === radKey) || all[0];
    if (found) {
      activeWriterChar = found.standalone || found.allChars[0] || '水';
    }
    renderExplorerSubView();
  }

  function renderRadicalInspector() {
    const inspectorEl = document.getElementById('rad-inspector-panel');
    if (!inspectorEl) return;

    const all = getEnrichedRadicals('full137');
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
          .slice(0, 12)
          .map(
            w => `
            <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-hanzi-serif text-xl font-bold text-white">${w.hanzi}</span>
                  <span class="text-[11px] font-bold text-amber-300 uppercase">[${w.hanViet}]</span>
                  <span class="text-[10px] text-slate-500">Bài ${w.lesson}</span>
                </div>
                <div class="text-xs text-slate-300">${w.meaning}</div>
              </div>
              <div class="flex items-center gap-1">
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
      : `<div class="text-xs text-slate-400">Chữ mẫu thông dụng: ${rad.allChars.join(', ')}</div>`;

    inspectorEl.innerHTML = `
      <div class="space-y-4">
        <!-- Header Info -->
        <div class="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
          <div class="flex items-center gap-3.5">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600/30 to-slate-950 border-2 border-indigo-400 flex items-center justify-center font-hanzi-serif text-5xl font-bold text-white shadow-lg">
              ${rad.radical}
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="text-lg font-extrabold text-white">${rad.name}</h3>
                <span class="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase border border-amber-500/30">
                  Hán Việt: ${rad.hanViet}
                </span>
              </div>
              <div class="text-xs text-indigo-300 font-medium mt-0.5">${rad.variants}</div>
              <div class="text-xs text-slate-400 mt-0.5">Số nét: <strong>${rad.strokes} nét</strong> • Vị trí: <strong>${rad.position}</strong></div>
            </div>
          </div>

          <div class="flex flex-col items-end gap-1.5">
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

        <!-- HSK 3 Vocabulary Containing This Radical -->
        <div class="space-y-2">
          <div class="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            📚 Từ Vựng HSK 3 Chứa ${rad.name} (${rad.hskWords.length} từ):
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
            ${hskWordsHTML}
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

    let deck = getEnrichedRadicals('core');
    if (fcOnlyUnmastered) {
      const unmastered = deck.filter(r => !window.HSKStorage.getRadicalRecord(r.radical).mastered);
      if (unmastered.length > 0) deck = unmastered;
    }

    if (fcIndex >= deck.length) fcIndex = 0;
    const rad = deck[fcIndex];
    const rec = window.HSKStorage.getRadicalRecord(rad.radical);

    const sampleWordsHTML = rad.hskWords
      .slice(0, 6)
      .map(
        w => `<span class="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"><strong class="font-hanzi-serif text-base text-white mr-1">${w.hanzi}</strong> [${w.hanViet}] ${w.meaning}</span>`
      )
      .join(' ');

    containerEl.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-5">
        <div class="flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
          <div class="flex items-center gap-2.5">
            <span class="px-3 py-1 rounded-lg bg-slate-800 text-indigo-300 font-mono-code text-xs font-bold">
              Bộ ${fcIndex + 1} / ${deck.length}
            </span>
            <span class="text-xs font-semibold text-slate-300">${rad.name}</span>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              id="btn-rad-fc-filter"
              class="px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                fcOnlyUnmastered
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }"
            >
              ${fcOnlyUnmastered ? '🎯 Đang lọc: Bộ Chưa Thuộc' : '📚 Đang hiện: Tất Cả 50 Bộ'}
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
                Số nét: <strong>${rad.strokes} nét</strong> • Vị trí: <strong>${rad.position}</strong>
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
                    <h3 class="text-xl font-extrabold text-white">${rad.name}</h3>
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
                <div class="text-[11px] font-bold uppercase text-slate-400">Các từ HSK 3 tiêu biểu chứa bộ này:</div>
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
    const coreList = getEnrichedRadicals('core');
    const types = quizMode === 'mixed' ? ['meaning', 'char_to_rad', 'twin_trap'] : [quizMode];
    const pickedType = types[Math.floor(Math.random() * types.length)];

    const targetRad = coreList[Math.floor(Math.random() * coreList.length)];
    const distractors = shuffle(coreList.filter(r => r.radical !== targetRad.radical)).slice(0, 3);

    if (pickedType === 'meaning') {
      // Type 1: Given radical symbol -> Pick its meaning & name
      const options = shuffle([targetRad, ...distractors]).map(r => ({
        key: r.radical,
        label: `${r.name} [${r.hanViet.toUpperCase()}] — ${r.meaning}`,
        isCorrect: r.radical === targetRad.radical
      }));

      quizQuestion = {
        type: 'meaning',
        radKey: targetRad.radical,
        badge: 'Kiểu 1: Nhìn Bộ Thủ → Đoán Tên & Ý Nghĩa Biểu Ý',
        heroSymbol: targetRad.radical,
        prompt: `Bộ thủ "${targetRad.radical}" (${targetRad.strokes} nét • ${targetRad.position}) mang tên và ý nghĩa gì?`,
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
          : `Chữ Hán "${sampleChar}" được cấu tạo bởi bộ thủ cốt lõi nào?`,
        subHint: `Hãy quan sát kỹ thành phần biểu ý của chữ "${sampleChar}"!`,
        options,
        explanation: `Chữ "${sampleChar}" chứa ${targetRad.name} (${targetRad.radical}) vì liên quan đến: ${targetRad.meaning}.`
      };
    } else {
      // Type 3: Twin-Trap Semantic Discrimination
      const trapCandidates = coreList.filter(r => r.confusableWith);
      const mainRad = trapCandidates[Math.floor(Math.random() * trapCandidates.length)] || targetRad;
      const sampleWord = mainRad.hskWords[0];
      const options = shuffle([mainRad, ...distractors]).map(r => ({
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
        renderExplorerSubView();
      });
    });

    const searchInput = document.getElementById('rad-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value || '';
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
