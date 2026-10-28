/**
 * HSK 标准教程 3 (HSK Standard Course 3) - Complete Vocabulary Dataset (Lessons 1 - 20)
 * Engineered for Cognitive SLA & Orthographic Recognition (Anti-Pinyin Dependency)
 */

window.HSK3_LESSONS_META = [
  { lesson: 1, title: "周末你有什么打算", titleVi: "Cuối tuần bạn có dự định gì?" },
  { lesson: 2, title: "他什么时候回来", titleVi: "Khi nào anh ấy quay về?" },
  { lesson: 3, title: "桌子上放着很多饮料", titleVi: "Trên bàn đặt rất nhiều đồ uống" },
  { lesson: 4, title: "她总是笑着跟客人说话", titleVi: "Cô ấy luôn cười nói chuyện với khách" },
  { lesson: 5, title: "我最近越来越胖了", titleVi: "Dạo này tôi ngày càng béo lên rồi" },
  { lesson: 6, title: "怎么突然找不到了", titleVi: "Sao đột nhiên không tìm thấy nữa rồi?" },
  { lesson: 7, title: "我跟她都认识五年了", titleVi: "Tôi và cô ấy quen nhau đã 5 năm rồi" },
  { lesson: 8, title: "你去哪儿我就去哪儿", titleVi: "Bạn đi đâu thì tôi đi đó" },
  { lesson: 9, title: "她的汉语说得跟中国人一样好", titleVi: "Tiếng Hán của cô ấy nói tốt như người Trung Quốc" },
  { lesson: 10, title: "数学比历史难多了", titleVi: "Toán học khó hơn Lịch sử nhiều" },
  { lesson: 11, title: "别忘了把空调关了", titleVi: "Đừng quên tắt điều hòa nhé" },
  { lesson: 12, title: "把重要的东西放在我这儿吧", titleVi: "Hãy để đồ quan trọng ở chỗ tôi nhé" },
  { lesson: 13, title: "我是走回来的", titleVi: "Tôi đi bộ về đấy" },
  { lesson: 14, title: "你把水果拿过来", titleVi: "Bạn mang hoa quả qua đây" },
  { lesson: 15, title: "其他都没什么问题", titleVi: "Những cái khác đều không có vấn đề gì" },
  { lesson: 16, title: "我现在累得下了班就想睡觉", titleVi: "Bây giờ tôi mệt đến mức tan làm là muốn ngủ" },
  { lesson: 17, title: "谁都有办法看好你的“病”", titleVi: "Ai cũng có cách chữa khỏi “bệnh” của bạn" },
  { lesson: 18, title: "我相信他们会同意的", titleVi: "Tôi tin rằng họ sẽ đồng ý thôi" },
  { lesson: 19, title: "你没看出来吗", titleVi: "Bạn không nhận ra sao?" },
  { lesson: 20, title: "我被他影响了", titleVi: "Tôi bị anh ấy ảnh hưởng rồi" }
];

window.HSK3_DEFAULT_VOCAB = [
  // ==================== BÀI 1: 周末你有什么打算 ====================
  {
    id: "L01_01",
    lesson: 1,
    lessonTitle: "周末你有什么打算",
    hanzi: "周末",
    pinyin: "zhōumò",
    pinyinClean: "zhoumo",
    hanViet: "chu mạt",
    wordType: "n",
    meaning: "cuối tuần",
    decomposition: [
      { char: "周", pinyin: "zhōu", hanViet: "chu", radical: "冂 (Quynh - vùng biên)", mnemonic: "Trong khung (冂) có đất (土) và cái miệng (口) bàn việc cả tuần" },
      { char: "末", pinyin: "mò", hanViet: "mạt", radical: "木 (Mộc - cây)", mnemonic: "Cây (木) có nét ngang trên DÀI hơn nét dưới là ngọn/cuối (末), ngược với vị (未)" }
    ],
    visualDistractors: ["周未", "期末", "粉末", "周围"],
    homophones: ["州末", "粥末", "周末", "周莫", "舟末"],
    example: {
      hanzi: "周末你有什么打算？",
      pinyin: "Zhōumò nǐ yǒu shénme dǎsuàn?",
      meaning: "Cuối tuần bạn có dự định gì?"
    }
  },
  {
    id: "L01_02",
    lesson: 1,
    lessonTitle: "周末你有什么打算",
    hanzi: "打算",
    pinyin: "dǎsuàn",
    pinyinClean: "dasuan",
    hanViet: "đả toán",
    wordType: "v/n",
    meaning: "dự định, kế hoạch",
    decomposition: [
      { char: "打", pinyin: "dǎ", hanViet: "đả", radical: "扌 (Tài gảy - cái tay)", mnemonic: "Dùng tay (扌) đóng cái đinh (丁)" },
      { char: "算", pinyin: "suàn", hanViet: "toán", radical: "⺮ (Trúc - tre)", mnemonic: "Dưới mái trúc (⺮), dùng mắt (目) và hai tay (廾) gảy bàn tính" }
    ],
    visualDistractors: ["打扫", "大蒜", "计算", "就算"],
    homophones: ["大蒜", "打断", "打算", "打散", "大算"],
    example: {
      hanzi: "我打算跟朋友一起去爬山。",
      pinyin: "Wǒ dǎsuàn gēn péngyou yìqǐ qù páshān.",
      meaning: "Tôi dự định đi leo núi cùng với bạn bè."
    }
  },
  {
    id: "L01_03",
    lesson: 1,
    lessonTitle: "周末你有什么打算",
    hanzi: "跟",
    pinyin: "gēn",
    pinyinClean: "gen",
    hanViet: "cân",
    wordType: "prep",
    meaning: "cùng, với, theo",
    decomposition: [
      { char: "跟", pinyin: "gēn", hanViet: "cân", radical: "⻊ (Túc - cái chân)", mnemonic: "Dùng chân (⻊) bước theo sát gót người cứng cỏi (艮)" }
    ],
    visualDistractors: ["很", "恨", "根", "银"],
    homophones: ["根", "跟", "哏", "艮", "亘"],
    example: {
      hanzi: "你跟谁一起去看电影？",
      pinyin: "Nǐ gēn shuí yìqǐ qù kàn diànyǐng?",
      meaning: "Bạn đi xem phim cùng với ai?"
    }
  },
  {
    id: "L01_04",
    lesson: 1,
    lessonTitle: "周末你有什么打算",
    hanzi: "一直",
    pinyin: "yìzhí",
    pinyinClean: "yizhi",
    hanViet: "nhất trực",
    wordType: "adv",
    meaning: "luôn luôn, suốt, thẳng một mạch",
    decomposition: [
      { char: "一", pinyin: "yī", hanViet: "nhất", radical: "一 (Nhất)", mnemonic: "Một nét gạch ngang thẳng tắp" },
      { char: "直", pinyin: "zhí", hanViet: "trực", radical: "目 (Mục - mắt)", mnemonic: "Mười (十) con mắt (目) nhìn thẳng trên một đường (一)" }
    ],
    visualDistractors: ["一直", "一真", "一致", "价值"],
    homophones: ["一直", "一致", "移植", "一职", "遗址"],
    example: {
      hanzi: "他最近一直很忙。",
      pinyin: "Tā zuìjìn yìzhí hěn máng.",
      meaning: "Dạo này anh ấy luôn rất bận."
    }
  },
  {
    id: "L01_05",
    lesson: 1,
    lessonTitle: "周末你有什么打算",
    hanzi: "游戏",
    pinyin: "yóuxì",
    pinyinClean: "youxi",
    hanViet: "du hí",
    wordType: "n",
    meaning: "trò chơi (game)",
    decomposition: [
      { char: "游", pinyin: "yóu", hanViet: "du", radical: "氵 (Chấm thủy - nước)", mnemonic: "Đứa trẻ (子) cầm cờ (方) bơi trong nước (氵) đi du ngoạn" },
      { char: "戏", pinyin: "xì", hanViet: "hí", radical: "戈 (Qua - cây giáo)", mnemonic: "Tay lại (又) cầm giáo (戈) diễn trò múa võ trên sân khấu" }
    ],
    visualDistractors: ["游泳", "尤其", "戏剧", "邮局"],
    homophones: ["游戏", "游记", "邮寄", "油漆", "犹豫"],
    example: {
      hanzi: "弟弟每天都在家玩儿电子游戏。",
      pinyin: "Dìdi měitiān dōu zài jiā wánr diànzǐ yóuxì.",
      meaning: "Em trai ngày nào cũng ở nhà chơi trò chơi điện tử."
    }
  },
  {
    id: "L01_06",
    lesson: 1,
    lessonTitle: "周末你有什么打算",
    hanzi: "作业",
    pinyin: "zuòyè",
    pinyinClean: "zuoye",
    hanViet: "tác nghiệp",
    wordType: "n",
    meaning: "bài tập về nhà",
    decomposition: [
      { char: "作", pinyin: "zuò", hanViet: "tác", radical: "亻 (Nhân đứng)", mnemonic: "Người (亻) mới bắt đầu (乍) làm việc" },
      { char: "业", pinyin: "yè", hanViet: "nghiệp", radical: "一 (Nhất)", mnemonic: "Cây cối đâm chồi trên mặt đất tạo dựng sự nghiệp" }
    ],
    visualDistractors: ["工作", "昨天", "毕业", "作为"],
    homophones: ["作业", "昨夜", "作孽", "左页", "坐夜"],
    example: {
      hanzi: "今天的作业你写完了吗？",
      pinyin: "Jīntiān de zuòyè nǐ xiěwán le ma?",
      meaning: "Bài tập hôm nay bạn đã viết xong chưa?"
    }
  },
  {
    id: "L01_07",
    lesson: 1,
    lessonTitle: "周末你有什么打算",
    hanzi: "着急",
    pinyin: "zháojí",
    pinyinClean: "zhaoji",
    hanViet: "trước cấp",
    wordType: "adj",
    meaning: "lo lắng, sốt ruột, vội vàng",
    decomposition: [
      { char: "着", pinyin: "zháo", hanViet: "trước", radical: "目 (Mục - mắt)", mnemonic: "Con dê (羊) cụt đuôi mở to mắt (目) nhìn chăm chú" },
      { char: "急", pinyin: "jí", hanViet: "cấp", radical: "心 (Tâm - trái tim)", mnemonic: "Bị dồn ép (刍) khiến trái tim (心) bên dưới đập gấp gáp, sốt ruột" }
    ],
    visualDistractors: ["看着", "着火", "突然", "危机"],
    homophones: ["着急", "召集", "着迷", "兆级", "朝集"],
    example: {
      hanzi: "别着急，我们还有很多时间。",
      pinyin: "Bié zháojí, wǒmen hái yǒu hěn duō shíjiān.",
      meaning: "Đừng sốt ruột, chúng ta vẫn còn rất nhiều thời gian."
    }
  },
  {
    id: "L01_08",
    lesson: 1,
    lessonTitle: "周末你有什么打算",
    hanzi: "复习",
    pinyin: "fùxí",
    pinyinClean: "fuxi",
    hanViet: "phục tập",
    wordType: "v",
    meaning: "ôn tập",
    decomposition: [
      { char: "复", pinyin: "fù", hanViet: "phục", radical: "夂 (Trĩ - bước chân)", mnemonic: "Mặt trời (日) mọc rồi bước chân (夂) lại quay về lặp lại" },
      { char: "习", pinyin: "xí", hanViet: "tập", radical: "乙 (Ất)", mnemonic: "Cánh chim non vỗ cánh tập bay" }
    ],
    visualDistractors: ["复杂", "复印", "学习", "习惯"],
    homophones: ["复习", "呼吸", "福气", "服气", "除夕"],
    example: {
      hanzi: "考试以前一定要好好儿复习。",
      pinyin: "Kǎoshì yǐqián yídìng yào hǎohāor fùxí.",
      meaning: "Trước kỳ thi nhất định phải ôn tập thật kỹ."
    }
  },
  {
    id: "L01_09",
    lesson: 1,
    lessonTitle: "周末你有什么打算",
    hanzi: "南方",
    pinyin: "nánfāng",
    pinyinClean: "nanfang",
    hanViet: "nam phương",
    wordType: "n",
    meaning: "phương Nam, miền Nam",
    decomposition: [
      { char: "南", pinyin: "nán", hanViet: "nam", radical: "十 (Thập)", mnemonic: "Cây thánh giá (十) treo chuông đồng có hình chữ Dương cụt ở miền Nam" },
      { char: "方", pinyin: "fāng", hanViet: "phương", radical: "方 (Phương - vuông)", mnemonic: "Con thuyền định hướng bốn phương" }
    ],
    visualDistractors: ["北方", "地方", "难忘", "南瓜"],
    homophones: ["南方", "难防", "男方", "南房", "楠方"],
    example: {
      hanzi: "冬天的时候，南方比北方暖和。",
      pinyin: "Dōngtiān de shíhou, nánfāng bǐ běifāng nuǎnhuo.",
      meaning: "Vào mùa đông, miền Nam ấm áp hơn miền Bắc."
    }
  },
  {
    id: "L01_10",
    lesson: 1,
    lessonTitle: "周末你有什么打算",
    hanzi: "北方",
    pinyin: "běifāng",
    pinyinClean: "beifang",
    hanViet: "bắc phương",
    wordType: "n",
    meaning: "phương Bắc, miền Bắc",
    decomposition: [
      { char: "北", pinyin: "běi", hanViet: "bắc", radical: "匕 (Chủy - cái thìa)", mnemonic: "Hai người quay lưng vào nhau vì gió lạnh phương Bắc" },
      { char: "方", pinyin: "fāng", hanViet: "phương", radical: "方 (Phương)", mnemonic: "Phương hướng, vùng đất" }
    ],
    visualDistractors: ["南方", "北京", "地方", "比方"],
    homophones: ["北方", "被方", "倍方", "背方", "碑方"],
    example: {
      hanzi: "北方人喜欢吃面条儿。",
      pinyin: "Běifāngrén xǐhuan chī miàntiáor.",
      meaning: "Người miền Bắc thích ăn mì sợi."
    }
  },
  {
    id: "L01_11",
    lesson: 1,
    lessonTitle: "周末你有什么打算",
    hanzi: "面包",
    pinyin: "miànbāo",
    pinyinClean: "mianbao",
    hanViet: "diện bao",
    wordType: "n",
    meaning: "bánh mì",
    decomposition: [
      { char: "面", pinyin: "miàn", hanViet: "diện", radical: "面 (Diện - mặt/bột)", mnemonic: "Khuôn mặt vuông vức, cũng chỉ bột mì" },
      { char: "包", pinyin: "bāo", hanViet: "bao", radical: "勹 (Bao - bọc)", mnemonic: "Bọc (勹) đứa bé (巳) bên trong chiếc bánh" }
    ],
    visualDistractors: ["面条", "书包", "钱包", "包子"],
    homophones: ["面包", "棉包", "面胞", "免包", "缅包"],
    example: {
      hanzi: "早上我吃了一个面包，喝了一杯牛奶。",
      pinyin: "Zǎoshang wǒ chīle yí gè miànbāo, hēle yì bēi niúnǎi.",
      meaning: "Buổi sáng tôi ăn một chiếc bánh mì và uống một cốc sữa bò."
    }
  },
  {
    id: "L01_12",
    lesson: 1,
    lessonTitle: "周末你有什么打算",
    hanzi: "地图",
    pinyin: "dìtú",
    pinyinClean: "ditu",
    hanViet: "địa đồ",
    wordType: "n",
    meaning: "bản đồ",
    decomposition: [
      { char: "地", pinyin: "dì", hanViet: "địa", radical: "土 (Thổ - đất)", mnemonic: "Vùng đất (土) rộng lớn cũng (也) là mặt đất" },
      { char: "图", pinyin: "tú", hanViet: "đồ", radical: "囗 (Vi - vây quanh)", mnemonic: "Bốn bề đóng khung (囗) vẽ cảnh mùa đông (冬) thành bản đồ" }
    ],
    visualDistractors: ["地方", "地铁", "图书馆", "画图"],
    homophones: ["地图", "地途", "企图", "底图", "弟徒"],
    example: {
      hanzi: "去旅游以前，最好先带一张地图。",
      pinyin: "Qù lǚyóu yǐqián, zuìhǎo xiān dài yì zhāng dìtú.",
      meaning: "Trước khi đi du lịch, tốt nhất nên mang theo một tấm bản đồ."
    }
  },
  {
    id: "L01_13",
    lesson: 1,
    lessonTitle: "周末你有什么打算",
    hanzi: "搬",
    pinyin: "bān",
    pinyinClean: "ban",
    hanViet: "ban",
    wordType: "v",
    meaning: "chuyển, dời, bê, khuân",
    decomposition: [
      { char: "搬", pinyin: "bān", hanViet: "ban", radical: "扌 (Tài gảy - tay)", mnemonic: "Dùng tay (扌) chuyển đồ lên thuyền (舟) từng đợt (殳)" }
    ],
    visualDistractors: ["一般", "班", "板", "拿"],
    homophones: ["搬", "班", "般", "颁", "斑"],
    example: {
      hanzi: "下个月我们要搬家了。",
      pinyin: "Xià gè yuè wǒmen yào bānjiā le.",
      meaning: "Tháng sau chúng tôi sắp chuyển nhà rồi."
    }
  },

  // ==================== BÀI 2: 他什么时候回来 ====================
  {
    id: "L02_01",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "腿",
    pinyin: "tuǐ",
    pinyinClean: "tui",
    hanViet: "thoái",
    wordType: "n",
    meaning: "cái chân, đùi",
    decomposition: [
      { char: "腿", pinyin: "tuǐ", hanViet: "thoái", radical: "月 (Nhục - thịt)", mnemonic: "Phần cơ thịt (月) giúp ta bước lùi/tiến (退) chính là đôi chân" }
    ],
    visualDistractors: ["退", "脚", "胖", "随"],
    homophones: ["腿", "退", "推", "颓", "蜕"],
    example: {
      hanzi: "爬完山以后，我的腿疼极了。",
      pinyin: "Páwán shān yǐhòu, wǒ de tuǐ téng jí le.",
      meaning: "Sau khi leo núi xong, chân của tôi đau cực kỳ."
    }
  },
  {
    id: "L02_02",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "疼",
    pinyin: "téng",
    pinyinClean: "teng",
    hanViet: "đông",
    wordType: "adj/v",
    meaning: "đau, nhức; yêu thương",
    decomposition: [
      { char: "疼", pinyin: "téng", hanViet: "đông", radical: "疒 (Nạch - bệnh tật)", mnemonic: "Cơn bệnh (疒)發 phát tác vào mùa đông (冬) làm đau nhức" }
    ],
    visualDistractors: ["病", "瘦", "冷", "终"],
    homophones: ["疼", "腾", "藤", "誊", "滕"],
    example: {
      hanzi: "昨天走了太多路，今天脚很疼。",
      pinyin: "Zuótiān zǒule tài duō lù, jīntiān jiǎo hěn téng.",
      meaning: "Hôm qua đi bộ quá nhiều, hôm nay bàn chân rất đau."
    }
  },
  {
    id: "L02_03",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "脚",
    pinyin: "jiǎo",
    pinyinClean: "jiao",
    hanViet: "cước",
    wordType: "n",
    meaning: "bàn chân",
    decomposition: [
      { char: "脚", pinyin: "jiǎo", hanViet: "cước", radical: "月 (Nhục - thịt)", mnemonic: "Phần thịt (月) bước đi (去) nhịp nhàng theo tiết tấu (卩)" }
    ],
    visualDistractors: ["腿", "却", "角", "脸"],
    homophones: ["脚", "角", "饺", "搅", "狡"],
    example: {
      hanzi: "这双鞋太大了，穿着不舒服，脚疼。",
      pinyin: "Zhè shuāng xié tài dà le, chuānzhe bù shūfu, jiǎo téng.",
      meaning: "Đôi giày này to quá rồi, đi không thoải mái, đau chân."
    }
  },
  {
    id: "L02_04",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "树",
    pinyin: "shù",
    pinyinClean: "shu",
    hanViet: "thụ",
    wordType: "n",
    meaning: "cây cối",
    decomposition: [
      { char: "树", pinyin: "shù", hanViet: "thụ", radical: "木 (Mộc - cây)", mnemonic: "Cây gỗ (木) trồng lại (又) từng tấc đất (寸)" }
    ],
    visualDistractors: ["村", "林", "森", "对"],
    homophones: ["树", "数", "书", "竖", "束"],
    example: {
      hanzi: "路边的树都绿了，春天来了。",
      pinyin: "Lùbiān de shù dōu lǜ le, chūntiān lái le.",
      meaning: "Cây cối bên đường đều xanh cả rồi, mùa xuân đến rồi."
    }
  },
  {
    id: "L02_05",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "容易",
    pinyin: "róngyì",
    pinyinClean: "rongyi",
    hanViet: "dung dị",
    wordType: "adj",
    meaning: "dễ dàng",
    decomposition: [
      { char: "容", pinyin: "róng", hanViet: "dung", radical: "宀 (Miên - mái nhà)", mnemonic: "Mái nhà (宀) rộng như thung lũng (谷) bao dung tất cả" },
      { char: "易", pinyin: "yì", hanViet: "dị", radical: "日 (Nhật - mặt trời)", mnemonic: "Mặt trời (日) chiếu xuống làm mọi việc thay đổi (勿) dễ dàng" }
    ],
    visualDistractors: ["内容", "贸易", "客气", "空虚"],
    homophones: ["容易", "荣毅", "融意", "容意", "绒衣"],
    example: {
      hanzi: "看起来很容易，做起来却很难。",
      pinyin: "Kàn qǐlái hěn róngyì, zuò qǐlái què hěn nán.",
      meaning: "Nhìn thì rất dễ, nhưng bắt tay vào làm lại rất khó."
    }
  },
  {
    id: "L02_06",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "难",
    pinyin: "nán",
    pinyinClean: "nan",
    hanViet: "nan",
    wordType: "adj",
    meaning: "khó, khó khăn",
    decomposition: [
      { char: "难", pinyin: "nán", hanViet: "nan", radical: "隹 (Chuy - chim đuôi ngắn)", mnemonic: "Lại (又) bắt con chim sẻ (隹) bằng tay không thì thật khó" }
    ],
    visualDistractors: ["准", "谁", "滩", "推"],
    homophones: ["难", "男", "南", "喃", "楠"],
    example: {
      hanzi: "汉字虽然难写，但是很有意思。",
      pinyin: "Hànzì suīrán nán xiě, dànshì hěn yǒu yìsi.",
      meaning: "Chữ Hán tuy khó viết, nhưng lại rất thú vị."
    }
  },
  {
    id: "L02_07",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "太太",
    pinyin: "tàitai",
    pinyinClean: "taitai",
    hanViet: "thái thái",
    wordType: "n",
    meaning: "bà chủ, vợ, phu nhân",
    decomposition: [
      { char: "太", pinyin: "tài", hanViet: "thái", radical: "大 (Đại - to lớn)", mnemonic: "Người to lớn (大) có thêm một chấm (丶) quyền quý" }
    ],
    visualDistractors: ["大夫", "太阳", "态度", "犬"],
    homophones: ["太太", "淘汰", "体态", "泰泰", "态态"],
    example: {
      hanzi: "王太太今天去超市买东西了。",
      pinyin: "Wáng tàitai jīntiān qù chāoshì mǎi dōngxi le.",
      meaning: "Bà Vương hôm nay đi siêu thị mua đồ rồi."
    }
  },
  {
    id: "L02_08",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "秘书",
    pinyin: "mìshū",
    pinyinClean: "mishu",
    hanViet: "bí thư",
    wordType: "n",
    meaning: "thư ký",
    decomposition: [
      { char: "秘", pinyin: "mì", hanViet: "bí", radical: "禾 (Hòa - lúa)", mnemonic: "Cây lúa (禾) tất nhiên (必) ẩn chứa điều bí mật" },
      { char: "书", pinyin: "shū", hanViet: "thư", radical: "乙 (Ất)", mnemonic: "Sổ sách giấy tờ ghi chép" }
    ],
    visualDistractors: ["必须", "看书", "秘密", "读书"],
    homophones: ["秘书", "密书", "迷书", "米书", "觅书"],
    example: {
      hanzi: "经理让秘书把那份文件拿过来。",
      pinyin: "Jīnglǐ ràng mìshū bǎ nà fèn wénjiàn ná guòlái.",
      meaning: "Giám đốc bảo thư ký mang tập tài liệu đó qua đây."
    }
  },
  {
    id: "L02_09",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "经理",
    pinyin: "jīnglǐ",
    pinyinClean: "jingli",
    hanViet: "kinh lý",
    wordType: "n",
    meaning: "giám đốc, quản lý",
    decomposition: [
      { char: "经", pinyin: "jīng", hanViet: "kinh", radical: "纟 (Mịch - sợi tơ)", mnemonic: "Sợi tơ (纟) dệt dọc khung cửi để quản lý công việc" },
      { char: "理", pinyin: "lǐ", hanViet: "lý", radical: "王 (Ngọc - đá quý)", mnemonic: "Mài viên ngọc (王) trong làng (里) cho ra đường vân hợp lý" }
    ],
    visualDistractors: ["经过", "已经", "理解", "理想"],
    homophones: ["经理", "经历", "敬礼", "精力", "清理"],
    example: {
      hanzi: "张经理下午要去上海开会。",
      pinyin: "Zhāng jīnglǐ xiàwǔ yào qù Shànghǎi kāihuì.",
      meaning: "Giám đốc Trương chiều nay phải đi Thượng Hải họp."
    }
  },
  {
    id: "L02_10",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "办公室",
    pinyin: "bàngōngshì",
    pinyinClean: "bangongshi",
    hanViet: "biện công thất",
    wordType: "n",
    meaning: "văn phòng làm việc",
    decomposition: [
      { char: "办", pinyin: "bàn", hanViet: "biện", radical: "力 (Lực - sức lực)", mnemonic: "Bỏ sức lực (力) và hai giọt mồ hôi hai bên để giải quyết việc" },
      { char: "公", pinyin: "gōng", hanViet: "công", radical: "八 (Bát)", mnemonic: "Chia tám (八) phần riêng tư (厶) thành việc chung" },
      { char: "室", pinyin: "shì", hanViet: "thất", radical: "宀 (Miên - mái nhà)", mnemonic: "Dưới mái nhà (宀) đi đến nơi (至) là căn phòng" }
    ],
    visualDistractors: ["教室", "办法", "公司", "卧室"],
    homophones: ["办公室", "半公式", "办公事", "伴公室", "办攻势"],
    example: {
      hanzi: "李老师现在不在办公室。",
      pinyin: "Lǐ lǎoshī xiànzài bú zài bàngōngshì.",
      meaning: "Thầy Lý bây giờ không có ở văn phòng."
    }
  },
  {
    id: "L02_11",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "辆",
    pinyin: "liàng",
    pinyinClean: "liang",
    hanViet: "lượng",
    wordType: "mw",
    meaning: "chiếc (lượng từ cho xe cộ)",
    decomposition: [
      { char: "辆", pinyin: "liàng", hanViet: "lượng", radical: "车 (Xa - chiếc xe)", mnemonic: "Chiếc xe (车) có hai (两) bánh" }
    ],
    visualDistractors: ["两", "满", "俩", "软"],
    homophones: ["辆", "两", "亮", "量", "凉"],
    example: {
      hanzi: "门外停着一辆黑色的汽车。",
      pinyin: "Ménwài tíngzhe yí liàng hēisè de qìchē.",
      meaning: "Ngoài cửa đang đỗ một chiếc ô tô màu đen."
    }
  },
  {
    id: "L02_12",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "楼",
    pinyin: "lóu",
    pinyinClean: "lou",
    hanViet: "lầu",
    wordType: "n",
    meaning: "tòa nhà, tầng lầu",
    decomposition: [
      { char: "楼", pinyin: "lóu", hanViet: "lầu", radical: "木 (Mộc - gỗ)", mnemonic: "Nhà gỗ (木) nơi người phụ nữ (女) đội thúng gạo (米) lên tầng trên" }
    ],
    visualDistractors: ["数", "树", "搂", "校"],
    homophones: ["楼", "流", "留", "漏", "搂"],
    example: {
      hanzi: "我住在七楼，你上楼来吧。",
      pinyin: "Wǒ zhù zài qī lóu, nǐ shàng lóu lái ba.",
      meaning: "Tôi sống ở tầng 7, bạn lên lầu đi."
    }
  },
  {
    id: "L02_13",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "拿",
    pinyin: "ná",
    pinyinClean: "na",
    hanViet: "nã",
    wordType: "v",
    meaning: "cầm, nắm, lấy",
    decomposition: [
      { char: "拿", pinyin: "ná", hanViet: "nã", radical: "手 (Thủ - bàn tay)", mnemonic: "Hợp (合) bàn tay (手) lại để cầm nắm đồ vật" }
    ],
    visualDistractors: ["掌", "合", "拾", "给"],
    homophones: ["拿", "哪", "那", "呐", "纳"],
    example: {
      hanzi: "下雨了，出门别忘了拿伞。",
      pinyin: "Xiàyǔ le, chūmén bié wàngle ná sǎn.",
      meaning: "Trời mưa rồi, ra cửa đừng quên cầm theo ô."
    }
  },
  {
    id: "L02_14",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "把",
    pinyin: "bǎ",
    pinyinClean: "ba",
    hanViet: "bả",
    wordType: "mw/prep",
    meaning: "chiếc (lượng từ cho ô, ghế); giới từ đem/lấy",
    decomposition: [
      { char: "把", pinyin: "bǎ", hanViet: "bả", radical: "扌 (Tài gảy - tay)", mnemonic: "Dùng tay (扌) nắm chặt phần cán cong (巴)" }
    ],
    visualDistractors: ["吧", "爸", "打", "爬"],
    homophones: ["把", "吧", "爸", "靶", "坝"],
    example: {
      hanzi: "房间里有四把椅子和一张桌子。",
      pinyin: "Fángjiān lǐ yǒu sì bǎ yǐzi hé yì zhāng zhuōzi.",
      meaning: "Trong phòng có bốn chiếc ghế và một cái bàn."
    }
  },
  {
    id: "L02_15",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "伞",
    pinyin: "sǎn",
    pinyinClean: "san",
    hanViet: "tản",
    wordType: "n",
    meaning: "cái ô, cái dù",
    decomposition: [
      { char: "伞", pinyin: "sǎn", hanViet: "tản", radical: "人 (Nhân - mái che)", mnemonic: "Hình dáng tán ô xòe ra (人) có nan ô và cán cầm thẳng (十) ở dưới" }
    ],
    visualDistractors: ["平", "全", "会", "命"],
    homophones: ["伞", "散", "三", "叁", "馓"],
    example: {
      hanzi: "这把红伞是谁的？",
      pinyin: "Zhè bǎ hóng sǎn shì shuí de?",
      meaning: "Chiếc ô màu đỏ này là của ai?"
    }
  },
  {
    id: "L02_16",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "胖",
    pinyin: "pàng",
    pinyinClean: "pang",
    hanViet: "bàn",
    wordType: "adj",
    meaning: "béo, mập",
    decomposition: [
      { char: "胖", pinyin: "pàng", hanViet: "bàn", radical: "月 (Nhục - thịt)", mnemonic: "Cơ thể thêm một nửa (半) lượng thịt (月) nên béo tròn" }
    ],
    visualDistractors: ["伴", "半", "腿", "瘦"],
    homophones: ["胖", "旁", "判", "盼", "叛"],
    example: {
      hanzi: "我最近吃得太多，胖了五斤。",
      pinyin: "Wǒ zuìjìn chī de tài duō, pàngle wǔ jīn.",
      meaning: "Dạo này tôi ăn nhiều quá, béo lên 2.5 kg rồi."
    }
  },
  {
    id: "L02_17",
    lesson: 2,
    lessonTitle: "他什么时候回来",
    hanzi: "瘦",
    pinyin: "shòu",
    pinyinClean: "shou",
    hanViet: "sấu",
    wordType: "adj",
    meaning: "gầy, ốm",
    decomposition: [
      { char: "瘦", pinyin: "shòu", hanViet: "sấu", radical: "疒 (Nạch - bệnh)", mnemonic: "Ốm bệnh (疒) làm người già (叟) trở nên gầy gò" }
    ],
    visualDistractors: ["疼", "病", "搜", "嫂"],
    homophones: ["瘦", "受", "收", "手", "售"],
    example: {
      hanzi: "她每天都跑步，所以很瘦。",
      pinyin: "Tā měitiān dōu pǎobù, suǒyǐ hěn shòu.",
      meaning: "Cô ấy ngày nào cũng chạy bộ nên rất gầy."
    }
  },

  // ==================== BÀI 3: 桌子上放着很多饮料 ====================
  {
    id: "L03_01",
    lesson: 3,
    lessonTitle: "桌子上放着很多饮料",
    hanzi: "还是",
    pinyin: "háishì",
    pinyinClean: "haishi",
    hanViet: "hoàn thị",
    wordType: "conj/adv",
    meaning: "hay là (câu hỏi lựa chọn); vẫn cứ",
    decomposition: [
      { char: "还", pinyin: "hái", hanViet: "hoàn", radical: "辶 (Sước - bước đi)", mnemonic: "Không (不) dừng bước (辶) mà vẫn tiếp tục" },
      { char: "是", pinyin: "shì", hanViet: "thị", radical: "日 (Nhật - mặt trời)", mnemonic: "Dưới mặt trời (日) bước chân ngay chính (正)" }
    ],
    visualDistractors: ["还有", "不是", "合适", "总是"],
    homophones: ["还是", "海市", "害事", "孩事", "还事"],
    example: {
      hanzi: "今天我们去爬山还是去看电影？",
      pinyin: "Jīntiān wǒmen qù páshān háishì qù kàn diànyǐng?",
      meaning: "Hôm nay chúng ta đi leo núi hay là đi xem phim?"
    }
  },
  {
    id: "L03_02",
    lesson: 3,
    lessonTitle: "桌子上放着很多饮料",
    hanzi: "爬山",
    pinyin: "páshān",
    pinyinClean: "pashan",
    hanViet: "bà sơn",
    wordType: "v",
    meaning: "leo núi",
    decomposition: [
      { char: "爬", pinyin: "pá", hanViet: "bà", radical: "爪 (Trảo - móng vuốt)", mnemonic: "Dùng móng vuốt (爪) bám chặt (巴) để trèo lên" },
      { char: "山", pinyin: "shān", hanViet: "sơn", radical: "山 (Sơn - núi)", mnemonic: "Ba đỉnh núi nhấp nhô" }
    ],
    visualDistractors: ["把山", "下山", "出山", "巴山"],
    homophones: ["爬山", "怕山", "趴山", "扒山", "啪山"],
    example: {
      hanzi: "明天天气很好，我们去爬山吧。",
      pinyin: "Míngtiān tiānqì hěn hǎo, wǒmen qù páshān ba.",
      meaning: "Ngày mai thời tiết rất đẹp, chúng ta đi leo núi nhé."
    }
  },
  {
    id: "L03_03",
    lesson: 3,
    lessonTitle: "桌子上放着很多饮料",
    hanzi: "小心",
    pinyin: "xiǎoxīn",
    pinyinClean: "xiaoxin",
    hanViet: "tiểu tâm",
    wordType: "adj/v",
    meaning: "cẩn thận, coi chừng",
    decomposition: [
      { char: "小", pinyin: "xiǎo", hanViet: "tiểu", radical: "小 (Tiểu - nhỏ)", mnemonic: "Nhỏ bé, tỉ mỉ" },
      { char: "心", pinyin: "xīn", hanViet: "tâm", radical: "心 (Tâm - tim)", mnemonic: "Trái tim để ý từng việc nhỏ là cẩn thận" }
    ],
    visualDistractors: ["放心", "关心", "开心", "担心"],
    homophones: ["小心", "孝心", "小新", "消心", "笑心"],
    example: {
      hanzi: "路上有很多水，你走的时候小心点儿。",
      pinyin: "Lùshang yǒu hěn duō shuǐ, nǐ zǒu de shíhou xiǎoxīn diǎnr.",
      meaning: "Trên đường có rất nhiều nước, lúc đi bạn cẩn thận một chút."
    }
  },
  {
    id: "L03_04",
    lesson: 3,
    lessonTitle: "桌子上放着很多饮料",
    hanzi: "条",
    pinyin: "tiáo",
    pinyinClean: "tiao",
    hanViet: "điều",
    wordType: "mw",
    meaning: "chiếc, cái, con (lượng từ cho vật dài: quần, đường, cá)",
    decomposition: [
      { char: "条", pinyin: "tiáo", hanViet: "điều", radical: "木 (Mộc - cây)", mnemonic: "Cành cây (木) vươn dài phía dưới bước chân (夂)" }
    ],
    visualDistractors: ["茶", "杀", "杂", "桌"],
    homophones: ["条", "跳", "挑", "调", "迢"],
    example: {
      hanzi: "妈妈给我买了一条新裤子。",
      pinyin: "Māma gěi wǒ mǎile yì tiáo xīn kùzi.",
      meaning: "Mẹ mua cho tôi một chiếc quần mới."
    }
  },
  {
    id: "L03_05",
    lesson: 3,
    lessonTitle: "桌子上放着很多饮料",
    hanzi: "裤子",
    pinyin: "kùzi",
    pinyinClean: "kuzi",
    hanViet: "khố tử",
    wordType: "n",
    meaning: "cái quần",
    decomposition: [
      { char: "裤", pinyin: "kù", hanViet: "khố", radical: "衤 (Y - quần áo)", mnemonic: "Quần áo (衤) cất trong kho (库) là chiếc quần" },
      { char: "子", pinyin: "zi", hanViet: "tử", radical: "子 (Tử)", mnemonic: "Hậu tố danh từ" }
    ],
    visualDistractors: ["裙子", "衬衫", "袜子", "车库"],
    homophones: ["裤子", "苦子", "库子", "枯子", "哭子"],
    example: {
      hanzi: "这条黑色的裤子多少钱？",
      pinyin: "Zhè tiáo hēisè de kùzi duōshao qián?",
      meaning: "Chiếc quần màu đen này bao nhiêu tiền?"
    }
  },
  {
    id: "L03_06",
    lesson: 3,
    lessonTitle: "桌子上放着很多饮料",
    hanzi: "记得",
    pinyin: "jìde",
    pinyinClean: "jide",
    hanViet: "ký đắc",
    wordType: "v",
    meaning: "nhớ, còn nhớ",
    decomposition: [
      { char: "记", pinyin: "jì", hanViet: "ký", radical: "讠 (Ngôn - lời nói)", mnemonic: "Dùng lời nói (讠) nhắc bản thân (己) ghi nhớ" },
      { char: "得", pinyin: "de", hanViet: "đắc", radical: "彳 (Xích - bước chân)", mnemonic: "Bước đi (彳) dưới mặt trời (旦) từng tấc (寸) để đạt được" }
    ],
    visualDistractors: ["忘记", "觉得", "日记", "懂得"],
    homophones: ["记得", "既得", "急得", "计得", "基德"],
    example: {
      hanzi: "你还记得我们第一次见面的地方吗？",
      pinyin: "Nǐ hái jìde wǒmen dì-yī cì jiànmiàn de dìfang ma?",
      meaning: "Bạn còn nhớ nơi chúng ta gặp nhau lần đầu tiên không?"
    }
  },
  {
    id: "L03_07",
    lesson: 3,
    lessonTitle: "桌子上放着很多饮料",
    hanzi: "衬衫",
    pinyin: "chènshān",
    pinyinClean: "chenshan",
    hanViet: "sấn sam",
    wordType: "n",
    meaning: "áo sơ mi",
    decomposition: [
      { char: "衬", pinyin: "chèn", hanViet: "sấn", radical: "衤 (Y - áo)", mnemonic: "Áo (衤) may đo chuẩn từng tấc (寸) sát người" },
      { char: "衫", pinyin: "shān", hanViet: "sam", radical: "衤 (Y - áo)", mnemonic: "Chiếc áo (衤) có ba đường nếp gấp thanh lịch (彡)" }
    ],
    visualDistractors: ["裤子", "裙子", "被子", "村子"],
    homophones: ["衬衫", "称善", "尘衫", "辰山", "沉山"],
    example: {
      hanzi: "他今天穿着一件白色的衬衫。",
      pinyin: "Tā jīntiān chuānzhe yí jiàn báisè de chènshān.",
      meaning: "Hôm nay anh ấy đang mặc một chiếc áo sơ mi màu trắng."
    }
  },
  {
    id: "L03_08",
    lesson: 3,
    lessonTitle: "桌子上放着很多饮料",
    hanzi: "新鲜",
    pinyin: "xīnxiān",
    pinyinClean: "xinxian",
    hanViet: "tân tiên",
    wordType: "adj",
    meaning: "tươi mới, trong lành",
    decomposition: [
      { char: "新", pinyin: "xīn", hanViet: "tân", radical: "斤 (Cân - cái rìu)", mnemonic: "Dùng rìu (斤) đốn cây gỗ (亲) mới" },
      { char: "鲜", pinyin: "xiān", hanViet: "tiên", radical: "鱼 (Ngư - cá)", mnemonic: "Thịt cá (鱼) nấu cùng thịt dê (羊) tạo nên vị tươi ngon tuyệt đỉnh" }
    ],
    visualDistractors: ["新闻", "新年", "海鲜", "朝鲜"],
    homophones: ["新鲜", "心弦", "辛酸", "新县", "欣羡"],
    example: {
      hanzi: "这家超市的水果非常新鲜。",
      pinyin: "Zhè jiā chāoshì de shuǐguǒ fēicháng xīnxiān.",
      meaning: "Hoa quả của siêu thị này vô cùng tươi ngon."
    }
  },
  {
    id: "L03_09",
    lesson: 3,
    lessonTitle: "桌子上放着很多饮料",
    hanzi: "甜",
    pinyin: "tián",
    pinyinClean: "tian",
    hanViet: "điềm",
    wordType: "adj",
    meaning: "ngọt",
    decomposition: [
      { char: "甜", pinyin: "tián", hanViet: "điềm", radical: "舌 (Thiệt - cái lưỡi)", mnemonic: "Đầu lưỡi (舌) nếm vị mía ngọt (甘)" }
    ],
    visualDistractors: ["乱", "刮", "话", "活"],
    homophones: ["甜", "田", "填", "天", "添"],
    example: {
      hanzi: "这些西瓜又大又甜。",
      pinyin: "Zhèxiē xīguā yòu dà yòu tián.",
      meaning: "Mấy quả dưa hấu này vừa to vừa ngọt."
    }
  },
  {
    id: "L03_10",
    lesson: 3,
    lessonTitle: "桌子上放着很多饮料",
    hanzi: "放",
    pinyin: "fàng",
    pinyinClean: "fang",
    hanViet: "phóng",
    wordType: "v",
    meaning: "đặt, để, thả, cho vào",
    decomposition: [
      { char: "放", pinyin: "fàng", hanViet: "phóng", radical: "攵 (Phộc - đánh nhẹ)", mnemonic: "Theo phương hướng (方) buông tay (攵) đặt xuống" }
    ],
    visualDistractors: ["房", "防", "改", "故"],
    homophones: ["放", "房", "防", "方", "访"],
    example: {
      hanzi: "桌子上放着很多饮料。",
      pinyin: "Zhuōzi shàng fàngzhe hěn duō yǐnliào.",
      meaning: "Trên bàn đang đặt rất nhiều đồ uống."
    }
  },
  {
    id: "L03_11",
    lesson: 3,
    lessonTitle: "桌子上放着很多饮料",
    hanzi: "饮料",
    pinyin: "yǐnliào",
    pinyinClean: "yinliao",
    hanViet: "ẩm liệu",
    wordType: "n",
    meaning: "đồ uống, thức uống",
    decomposition: [
      { char: "饮", pinyin: "yǐn", hanViet: "ẩm", radical: "饣 (Thực - ăn uống)", mnemonic: "Thức ăn đồ uống (饣) khi khát thiếu nước (欠)" },
      { char: "料", pinyin: "liào", hanViet: "liệu", radical: "斗 (Đấu - cái đấu đong)", mnemonic: "Dùng cái đấu (斗) đong hạt gạo (米) làm nguyên liệu" }
    ],
    visualDistractors: ["饭馆", "资料", "饺子", "饥饿"],
    homophones: ["饮料", "印料", "银料", "引料", "音料"],
    example: {
      hanzi: "你想喝什么饮料？茶还是咖啡？",
      pinyin: "Nǐ xiǎng hē shénme yǐnliào? Chá háishì kāfēi?",
      meaning: "Bạn muốn uống đồ uống gì? Trà hay là cà phê?"
    }
  },
  {
    id: "L03_12",
    lesson: 3,
    lessonTitle: "桌子上放着很多饮料",
    hanzi: "舒服",
    pinyin: "shūfu",
    pinyinClean: "shufu",
    hanViet: "thư phục",
    wordType: "adj",
    meaning: "thoải mái, dễ chịu",
    decomposition: [
      { char: "舒", pinyin: "shū", hanViet: "thư", radical: "舌 (Thiệt)", mnemonic: "Xả bỏ (舍) mệt nhọc trao cho (予) mình sự thư thái" },
      { char: "服", pinyin: "fú", hanViet: "phục", radical: "月 (Nhục - cơ thể)", mnemonic: "Cơ thể (月) mặc quần áo vừa vặn dễ chịu" }
    ],
    visualDistractors: ["衣服", "服务", "舍得", "叔叔"],
    homophones: ["舒服", "叔父", "束缚", "书房", "疏忽"],
    example: {
      hanzi: "今天我身体有点儿不舒服。",
      pinyin: "Jīntiān wǒ shēntǐ yǒudiǎnr bù shūfu.",
      meaning: "Hôm nay cơ thể tôi hơi không khỏe (khó chịu)."
    }
  },

  // ==================== BÀI 4: 她总是笑着跟客人说话 ====================
  {
    id: "L04_01",
    lesson: 4,
    lessonTitle: "她总是笑着跟客人说话",
    hanzi: "比赛",
    pinyin: "bǐsài",
    pinyinClean: "bisai",
    hanViet: "tỷ tái",
    wordType: "n/v",
    meaning: "thi đấu, trận đấu",
    decomposition: [
      { char: "比", pinyin: "bǐ", hanViet: "tỷ", radical: "比 (Tỷ - so sánh)", mnemonic: "Hai người đứng cạnh nhau so tài cao thấp" },
      { char: "赛", pinyin: "sài", hanViet: "tái", radical: "贝 (Bối - tiền/báu vật)", mnemonic: "Dưới mái nhà (宀) tranh tài giành phần thưởng quý giá (贝)" }
    ],
    visualDistractors: ["比较", "比如", "寒假", "宝贝"],
    homophones: ["比赛", "闭塞", "必赛", "比塞", "笔赛"],
    example: {
      hanzi: "今天晚上的足球比赛非常精彩。",
      pinyin: "Jīntiān wǎnshang de zúqiú bǐsài fēicháng jīngcǎi.",
      meaning: "Trận đấu bóng đá tối nay vô cùng đặc sắc."
    }
  },
  {
    id: "L04_02",
    lesson: 4,
    lessonTitle: "她总是笑着跟客人说话",
    hanzi: "照片",
    pinyin: "zhàopiàn",
    pinyinClean: "zhaopian",
    hanViet: "chiếu phiến",
    wordType: "n",
    meaning: "bức ảnh, tấm hình",
    decomposition: [
      { char: "照", pinyin: "zhào", hanViet: "chiếu", radical: "灬 (Hỏa - bốn chấm lửa)", mnemonic: "Ánh sáng mặt trời (昭) và ánh lửa (灬) chiếu sáng để chụp hình" },
      { char: "片", pinyin: "piàn", hanViet: "phiến", radical: "片 (Phiến - mảnh mỏng)", mnemonic: "Mảnh giấy mỏng in hình" }
    ],
    visualDistractors: ["照顾", "名片", "卡片", "护照"],
    homophones: ["照片", "诈骗", "照骗", "招片", "兆片"],
    example: {
      hanzi: "这是我们全班同学的毕业照片。",
      pinyin: "Zhè shì wǒmen quán bān tóngxué de bìyè zhàopiàn.",
      meaning: "Đây là bức ảnh tốt nghiệp của cả lớp chúng tôi."
    }
  },
  {
    id: "L04_03",
    lesson: 4,
    lessonTitle: "她总是笑着跟客人说话",
    hanzi: "年级",
    pinyin: "niánjí",
    pinyinClean: "nianji",
    hanViet: "niên cấp",
    wordType: "n",
    meaning: "khối lớp, năm học",
    decomposition: [
      { char: "年", pinyin: "nián", hanViet: "niên", radical: "干 (Can)", mnemonic: "Mùa màng thu hoạch mỗi năm một lần" },
      { char: "级", pinyin: "jí", hanViet: "cấp", radical: "纟 (Mịch - sợi tơ)", mnemonic: "Sợi tơ (纟) phân chia thứ bậc vươn tới (及) từng cấp" }
    ],
    visualDistractors: ["年纪", "年轻", "班级", "高级"],
    homophones: ["年级", "年纪", "年集", "年季", "念及"],
    example: {
      hanzi: "我儿子今年上小学三年级。",
      pinyin: "Wǒ érzi jīnnián shàng xiǎoxué sān niánjí.",
      meaning: "Con trai tôi năm nay học lớp 3 tiểu học."
    }
  },
  {
    id: "L04_04",
    lesson: 4,
    lessonTitle: "她总是笑着跟客人说话",
    hanzi: "又",
    pinyin: "yòu",
    pinyinClean: "you",
    hanViet: "hựu",
    wordType: "adv",
    meaning: "lại, vừa... vừa...",
    decomposition: [
      { char: "又", pinyin: "yòu", hanViet: "hựu", radical: "又 (Hựu - bàn tay phải)", mnemonic: "Bàn tay lặp lại hành động" }
    ],
    visualDistractors: ["叉", "双", "友", "文"],
    homophones: ["又", "右", "幼", "诱", "佑"],
    example: {
      hanzi: "她的房间又干净又漂亮。",
      pinyin: "Tā de fángjiān yòu gānjìng yòu piàoliang.",
      meaning: "Căn phòng của cô ấy vừa sạch sẽ vừa đẹp."
    }
  },
  {
    id: "L04_05",
    lesson: 4,
    lessonTitle: "她总是笑着跟客人说话",
    hanzi: "聪明",
    pinyin: "cōngming",
    pinyinClean: "congming",
    hanViet: "thông minh",
    wordType: "adj",
    meaning: "thông minh, lanh lợi",
    decomposition: [
      { char: "聪", pinyin: "cōng", hanViet: "thông", radical: "耳 (Nhĩ - cái tai)", mnemonic: "Biết dùng tai (耳), hai mắt, miệng và trái tim (心) để lắng nghe thấu hiểu" },
      { char: "明", pinyin: "míng", hanViet: "minh", radical: "日 (Nhật - mặt trời)", mnemonic: "Mặt trời (日) và mặt trăng (月) cùng tỏa sáng" }
    ],
    visualDistractors: ["听见", "明白", "明天", "总是"],
    homophones: ["聪明", "从命", "匆忙", "聪颖", "丛明"],
    example: {
      hanzi: "这个孩子既聪明又努力。",
      pinyin: "Zhège háizi jì cōngming yòu nǔlì.",
      meaning: "Đứa trẻ này vừa thông minh lại vừa chăm chỉ."
    }
  },
  {
    id: "L04_06",
    lesson: 4,
    lessonTitle: "她总是笑着跟客人说话",
    hanzi: "热情",
    pinyin: "rèqíng",
    pinyinClean: "reqing",
    hanViet: "nhiệt tình",
    wordType: "adj",
    meaning: "nhiệt tình, nồng nhiệt",
    decomposition: [
      { char: "热", pinyin: "rè", hanViet: "nhiệt", radical: "灬 (Hỏa - lửa)", mnemonic: "Tay cầm nắm (执) hơ trên ngọn lửa (灬) nóng ấm" },
      { char: "情", pinyin: "qíng", hanViet: "tình", radical: "忄 (Tâm đứng)", mnemonic: "Trái tim (忄) luôn tươi trẻ xanh tốt (青) đầy tình cảm" }
    ],
    visualDistractors: ["事情", "晴天", "请客", "眼睛"],
    homophones: ["热情", "人情", "热擎", "惹情", "热晴"],
    example: {
      hanzi: "她总是很热情地回答客人的问题。",
      pinyin: "Tā zǒngshì hěn rèqíng de huídá kèrén de wèntí.",
      meaning: "Cô ấy luôn nhiệt tình trả lời câu hỏi của khách hàng."
    }
  },
  {
    id: "L04_07",
    lesson: 4,
    lessonTitle: "她总是笑着跟客人说话",
    hanzi: "努力",
    pinyin: "nǔlì",
    pinyinClean: "nuli",
    hanViet: "nỗ lực",
    wordType: "adj",
    meaning: "chăm chỉ, cố gắng, nỗ lực",
    decomposition: [
      { char: "努", pinyin: "nǔ", hanViet: "nỗ", radical: "力 (Lực - sức mạnh)", mnemonic: "Người phụ nữ (女) vất vả như nô bộc (奴) dồn hết sức lực (力)" },
      { char: "力", pinyin: "lì", hanViet: "lực", radical: "力 (Lực)", mnemonic: "Cánh tay cuồn cuộn cơ bắp" }
    ],
    visualDistractors: ["怒气", "能力", "奴隶", "办法"],
    homophones: ["努力", "奴隶", "怒力", "努利", "弩力"],
    example: {
      hanzi: "只要你努力学习，就一定能考好。",
      pinyin: "Zhǐyào nǐ nǔlì xuéxí, jiù yídìng néng kǎohǎo.",
      meaning: "Chỉ cần bạn chăm chỉ học tập thì nhất định sẽ thi tốt."
    }
  },
  {
    id: "L04_08",
    lesson: 4,
    lessonTitle: "她总是笑着跟客人说话",
    hanzi: "总是",
    pinyin: "zǒngshì",
    pinyinClean: "zongshi",
    hanViet: "tổng thị",
    wordType: "adv",
    meaning: "luôn luôn, lúc nào cũng",
    decomposition: [
      { char: "总", pinyin: "zǒng", hanViet: "tổng", radical: "心 (Tâm - tim)", mnemonic: "Miệng (口) và trái tim (心) luôn hướng về một mối" },
      { char: "是", pinyin: "shì", hanViet: "thị", radical: "日 (Nhật)", mnemonic: "Đúng đắn, luôn như vậy" }
    ],
    visualDistractors: ["还是", "总结", "急忙", "思想"],
    homophones: ["总是", "纵使", "总事", "宗室", "综述"],
    example: {
      hanzi: "她总是笑着跟客人说话。",
      pinyin: "Tā zǒngshì xiàozhe gēn kèrén shuōhuà.",
      meaning: "Cô ấy luôn mỉm cười nói chuyện với khách."
    }
  },
  {
    id: "L04_09",
    lesson: 4,
    lessonTitle: "她总是笑着跟客人说话",
    hanzi: "回答",
    pinyin: "huídá",
    pinyinClean: "huida",
    hanViet: "hồi đáp",
    wordType: "v/n",
    meaning: "trả lời, giải đáp",
    decomposition: [
      { char: "回", pinyin: "huí", hanViet: "hồi", radical: "囗 (Vi - vòng quanh)", mnemonic: "Vòng trong vòng ngoài quay trở lại" },
      { char: "答", pinyin: "dá", hanViet: "đáp", radical: "⺮ (Trúc - tre)", mnemonic: "Thẻ tre (⺮) ghép hợp (合) lại để ghi câu trả lời" }
    ],
    visualDistractors: ["回家", "回来", "答应", "问题"],
    homophones: ["回答", "回达", "会达", "毁达", "汇达"],
    example: {
      hanzi: "这个问题太难了，我不知道怎么回答。",
      pinyin: "Zhège wèntí tài nán le, wǒ bù zhīdào zěnme huídá.",
      meaning: "Câu hỏi này khó quá, tôi không biết trả lời thế nào."
    }
  },
  {
    id: "L04_10",
    lesson: 4,
    lessonTitle: "她总是笑着跟客人说话",
    hanzi: "饿",
    pinyin: "è",
    pinyinClean: "e",
    hanViet: "ngạ",
    wordType: "adj",
    meaning: "đói bụng",
    decomposition: [
      { char: "饿", pinyin: "è", hanViet: "ngạ", radical: "饣 (Thực - thức ăn)", mnemonic: "Bản thân tôi (我) đang thiếu thức ăn (饣)" }
    ],
    visualDistractors: ["饭", "饱", "鹅", "俄"],
    homophones: ["饿", "恶", "鳄", "鹅", "额"],
    example: {
      hanzi: "忙了一下午，我现在觉得很饿。",
      pinyin: "Mángle yí xiàwǔ, wǒ xiànzài juéde hěn è.",
      meaning: "Bận cả một buổi chiều, bây giờ tôi cảm thấy rất đói."
    }
  },
  {
    id: "L04_11",
    lesson: 4,
    lessonTitle: "她总是笑着跟客人说话",
    hanzi: "超市",
    pinyin: "chāoshì",
    pinyinClean: "chaoshi",
    hanViet: "siêu thị",
    wordType: "n",
    meaning: "siêu thị",
    decomposition: [
      { char: "超", pinyin: "chāo", hanViet: "siêu", radical: "走 (Tẩu - chạy)", mnemonic: "Chạy (走) vượt qua lời gọi (召) là siêu việt" },
      { char: "市", pinyin: "shì", hanViet: "thị", radical: "巾 (Cân - khăn)", mnemonic: "Khu chợ buôn bán sầm uất" }
    ],
    visualDistractors: ["城市", "起初", "越来", "市场"],
    homophones: ["超市", "潮湿", "超时", "朝市", "炒事"],
    example: {
      hanzi: "我家楼下新开了一家大超市。",
      pinyin: "Wǒ jiā lóuxià xīn kāile yì jiā dà chāoshì.",
      meaning: "Dưới lầu nhà tôi mới mở một siêu thị lớn."
    }
  },
  {
    id: "L04_12",
    lesson: 4,
    lessonTitle: "她总是笑着跟客人说话",
    hanzi: "蛋糕",
    pinyin: "dàngāo",
    pinyinClean: "dangao",
    hanViet: "đản cao",
    wordType: "n",
    meaning: "bánh kem, bánh ngọt (gato)",
    decomposition: [
      { char: "蛋", pinyin: "dàn", hanViet: "đản", radical: "虫 (Trùng)", mnemonic: "Quả trứng tròn trịa" },
      { char: "糕", pinyin: "gāo", hanViet: "cao", radical: "米 (Mễ - gạo/bột)", mnemonic: "Bột gạo (米) nướng cùng mỡ cừu non (羔) trên lửa (灬) thành bánh" }
    ],
    visualDistractors: ["糟糕", "鸡蛋", "雪糕", "高大"],
    homophones: ["蛋糕", "但高", "单高", "担高", "淡糕"],
    example: {
      hanzi: "今天是妈妈的生日，我买了一个大蛋糕。",
      pinyin: "Jīntiān shì māma de shēngrì, wǒ mǎile yí gè dà dàngāo.",
      meaning: "Hôm nay là sinh nhật mẹ, tôi đã mua một chiếc bánh kem lớn."
    }
  },
  {
    id: "L04_13",
    lesson: 4,
    lessonTitle: "她总是笑着跟客人说话",
    hanzi: "年轻",
    pinyin: "niánqīng",
    pinyinClean: "nianqing",
    hanViet: "niên khinh",
    wordType: "adj",
    meaning: "trẻ tuổi, trẻ trung",
    decomposition: [
      { char: "年", pinyin: "nián", hanViet: "niên", radical: "干 (Can)", mnemonic: "Số năm tuổi đời" },
      { char: "轻", pinyin: "qīng", hanViet: "khinh", radical: "车 (Xa - xe)", mnemonic: "Chiếc xe (车) chạy nhẹ nhàng thanh thoát" }
    ],
    visualDistractors: ["年级", "年纪", "轻松", "经常"],
    homophones: ["年轻", "年青", "念情", "年庆", "拈轻"],
    example: {
      hanzi: "那位年轻的老师教我们汉语。",
      pinyin: "Nà wèi niánqīng de lǎoshī jiāo wǒmen Hànyǔ.",
      meaning: "Vị giáo viên trẻ tuổi kia dạy chúng tôi tiếng Hán."
    }
  },
  {
    id: "L04_14",
    lesson: 4,
    lessonTitle: "她总是笑着跟客人说话",
    hanzi: "认真",
    pinyin: "rènzhēn",
    pinyinClean: "renzhen",
    hanViet: "nhận chân",
    wordType: "adj",
    meaning: "nghiêm túc, chăm chú",
    decomposition: [
      { char: "认", pinyin: "rèn", hanViet: "nhận", radical: "讠 (Ngôn - lời nói)", mnemonic: "Lời nói (讠) của con người (人) phải có trách nhiệm" },
      { char: "真", pinyin: "zhēn", hanViet: "chân", radical: "目 (Mục - mắt)", mnemonic: "Mười (十) mắt (目) nhìn kỹ để thấy sự thật chân chính" }
    ],
    visualDistractors: ["认识", "认为", "真正", "一直"],
    homophones: ["认真", "认针", "任真", "人真", "仁真"],
    example: {
      hanzi: "他学习汉语非常认真。",
      pinyin: "Tā xuéxí Hànyǔ fēicháng rènzhēn.",
      meaning: "Anh ấy học tiếng Hán vô cùng nghiêm túc."
    }
  },
  {
    id: "L04_15",
    lesson: 4,
    lessonTitle: "她总是笑着跟客人说话",
    hanzi: "客人",
    pinyin: "kèrén",
    pinyinClean: "keren",
    hanViet: "khách nhân",
    wordType: "n",
    meaning: "khách, khách hàng",
    decomposition: [
      { char: "客", pinyin: "kè", hanViet: "khách", radical: "宀 (Miên - mái nhà)", mnemonic: "Mỗi người (各) bước vào dưới mái nhà (宀) đều là khách quý" },
      { char: "人", pinyin: "rén", hanViet: "nhân", radical: "人 (Nhân)", mnemonic: "Con người" }
    ],
    visualDistractors: ["客气", "容易", "家人", "别人"],
    homophones: ["客人", "可人", "课人", "克人", "刻人"],
    example: {
      hanzi: "今天家里来了几位客人。",
      pinyin: "Jīntiān jiālǐ láile jǐ wèi kèrén.",
      meaning: "Hôm nay ở nhà có mấy vị khách tới chơi."
    }
  },

  // ==================== BÀI 5: 我最近越来越胖了 ====================
  {
    id: "L05_01",
    lesson: 5,
    lessonTitle: "我最近越来越胖了",
    hanzi: "发烧",
    pinyin: "fāshāo",
    pinyinClean: "fashao",
    hanViet: "phát thiêu",
    wordType: "v",
    meaning: "bị sốt",
    decomposition: [
      { char: "发", pinyin: "fā", hanViet: "phát", radical: "又 (Hựu)", mnemonic: "Phát tán ra ngoài" },
      { char: "烧", pinyin: "shāo", hanViet: "thiêu", radical: "火 (Hỏa - lửa)", mnemonic: "Ngọn lửa (火) bốc cao (尧) làm cơ thể nóng sốt" }
    ],
    visualDistractors: ["发现", "头发", "浇水", "围绕"],
    homophones: ["发烧", "发梢", "发韶", "法烧", "罚烧"],
    example: {
      hanzi: "儿子昨晚发烧了，我带他去医院看了看。",
      pinyin: "Érzi zuówǎn fāshāo le, wǒ dài tā qù yīyuàn kànle kàn.",
      meaning: "Tối qua con trai bị sốt, tôi đã đưa cháu đến bệnh viện khám."
    }
  },
  {
    id: "L05_02",
    lesson: 5,
    lessonTitle: "我最近越来越胖了",
    hanzi: "为",
    pinyin: "wèi",
    pinyinClean: "wei",
    hanViet: "vị",
    wordType: "prep",
    meaning: "vì, để, cho",
    decomposition: [
      { char: "为", pinyin: "wèi", hanViet: "vị", radical: "丶 (Chủ)", mnemonic: "Hành động vì mục đích hoặc vì ai đó" }
    ],
    visualDistractors: ["办", "力", "方", "发"],
    homophones: ["为", "位", "喂", "未", "味"],
    example: {
      hanzi: "为了身体健康，我每天都去锻炼。",
      pinyin: "Wèile shēntǐ jiànkāng, wǒ měitiān dōu qù duànliàn.",
      meaning: "Vì sức khỏe, ngày nào tôi cũng đi rèn luyện."
    }
  },
  {
    id: "L05_03",
    lesson: 5,
    lessonTitle: "我最近越来越胖了",
    hanzi: "照顾",
    pinyin: "zhàogù",
    pinyinClean: "zhaogu",
    hanViet: "chiếu cố",
    wordType: "v",
    meaning: "chăm sóc, trông nom",
    decomposition: [
      { char: "照", pinyin: "zhào", hanViet: "chiếu", radical: "灬 (Hỏa)", mnemonic: "Chiếu sáng quan tâm" },
      { char: "顾", pinyin: "gù", hanViet: "cố", radical: "页 (Hiệt - cái đầu)", mnemonic: "Ngoảnh đầu (页) quay lại lo lắng (厄) chăm nom" }
    ],
    visualDistractors: ["照片", "顾客", "顾问", "护照"],
    homophones: ["照顾", "照故", "招雇", "朝顾", "兆固"],
    example: {
      hanzi: "妈妈生病了，我要在家照顾她。",
      pinyin: "Māma shēngbìng le, wǒ yào zài jiā zhàogù tā.",
      meaning: "Mẹ bị ốm rồi, tôi phải ở nhà chăm sóc bà."
    }
  },
  {
    id: "L05_04",
    lesson: 5,
    lessonTitle: "我最近越来越胖了",
    hanzi: "用",
    pinyin: "yòng",
    pinyinClean: "yong",
    hanViet: "dụng",
    wordType: "v",
    meaning: "dùng, cần (thường dùng dạng 不用 = không cần)",
    decomposition: [
      { char: "用", pinyin: "yòng", hanViet: "dụng", radical: "用 (Dụng)", mnemonic: "Chiếc thùng gỗ có vách ngăn dùng để chứa đồ" }
    ],
    visualDistractors: ["同", "周", "月", "角"],
    homophones: ["用", "拥", "勇", "泳", "永"],
    example: {
      hanzi: "这件小事不用麻烦他了。",
      pinyin: "Zhè jiàn xiǎoshì búyòng máfan tā le.",
      meaning: "Chuyện nhỏ này không cần làm phiền anh ấy đâu."
    }
  },
  {
    id: "L05_05",
    lesson: 5,
    lessonTitle: "我最近越来越胖了",
    hanzi: "感冒",
    pinyin: "gǎnmào",
    pinyinClean: "ganmao",
    hanViet: "cảm mạo",
    wordType: "v/n",
    meaning: "cảm cúm, bị cảm",
    decomposition: [
      { char: "感", pinyin: "gǎn", hanViet: "cảm", radical: "心 (Tâm - tim)", mnemonic: "Tất cả (咸) đều chạm tới trái tim (心) gây xúc cảm" },
      { char: "冒", pinyin: "mào", hanViet: "mạo", radical: "目 (Mục - mắt)", mnemonic: "Đội mũ (冃) che kín cả mắt (目) khi bị cảm lạnh" }
    ],
    visualDistractors: ["感谢", "感兴趣", "帽子", "勇敢"],
    homophones: ["感冒", "感貌", "干冒", "敢冒", "甘冒"],
    example: {
      hanzi: "天冷了，多穿点儿衣服，别感冒了。",
      pinyin: "Tiān lěng le, duō chuān diǎnr yīfu, bié gǎnmào le.",
      meaning: "Trời lạnh rồi, mặc thêm chút quần áo đi, kẻo bị cảm đấy."
    }
  },
  {
    id: "L05_06",
    lesson: 5,
    lessonTitle: "我最近越来越胖了",
    hanzi: "季节",
    pinyin: "jìjié",
    pinyinClean: "jijie",
    hanViet: "quý tiết",
    wordType: "n",
    meaning: "mùa (trong năm)",
    decomposition: [
      { char: "季", pinyin: "jì", hanViet: "quý", radical: "子 (Tử - con)", mnemonic: "Cây lúa non (禾) như đứa trẻ (子) lớn lên theo từng mùa" },
      { char: "节", pinyin: "jié", hanViet: "tiết", radical: "艹 (Thảo - cỏ)", mnemonic: "Đốt cỏ cây chia thành từng tiết khí trong năm" }
    ],
    visualDistractors: ["节日", "春节", "李子", "节目"],
    homophones: ["季节", "集结", "佳节", "气节", "细节"],
    example: {
      hanzi: "你最喜欢哪个季节？",
      pinyin: "Nǐ zuì xǐhuan nǎge jìjié?",
      meaning: "Bạn thích nhất mùa nào?"
    }
  },
  {
    id: "L05_07",
    lesson: 5,
    lessonTitle: "我最近越来越胖了",
    hanzi: "当然",
    pinyin: "dāngrán",
    pinyinClean: "dangran",
    hanViet: "đương nhiên",
    wordType: "adv",
    meaning: "đương nhiên, dĩ nhiên",
    decomposition: [
      { char: "当", pinyin: "dāng", hanViet: "đương", radical: "彐 (Kệ)", mnemonic: "Đảm đương công việc trước mắt" },
      { char: "然", pinyin: "rán", hanViet: "nhiên", radical: "灬 (Hỏa - bốn chấm lửa)", mnemonic: "Nướng thịt chó (犬) trên ngọn lửa (灬) là điều tự nhiên" }
    ],
    visualDistractors: ["突然", "虽然", "刚才", "自然"],
    homophones: ["当然", "挡然", "党然", "荡然", "当燃"],
    example: {
      hanzi: "你生病了，我当然要来看你。",
      pinyin: "Nǐ shēngbìng le, wǒ dāngrán yào lái kàn nǐ.",
      meaning: "Bạn bị ốm rồi, đương nhiên tôi phải đến thăm bạn."
    }
  },
  {
    id: "L05_08",
    lesson: 5,
    lessonTitle: "我最近越来越胖了",
    hanzi: "春天",
    pinyin: "chūntiān",
    pinyinClean: "chuntian",
    hanViet: "xuân thiên",
    wordType: "n",
    meaning: "mùa xuân",
    decomposition: [
      { char: "春", pinyin: "chūn", hanViet: "xuân", radical: "日 (Nhật - mặt trời)", mnemonic: "Ba người (三人) cùng đón ánh mặt trời (日) ấm áp mùa xuân" },
      { char: "天", pinyin: "tiān", hanViet: "thiên", radical: "大 (Đại)", mnemonic: "Bầu trời" }
    ],
    visualDistractors: ["春节", "秋天", "昨天", "看病"],
    homophones: ["春天", "纯天", "椿天", "唇天", "醇天"],
    example: {
      hanzi: "春天来了，公园里的花都开了。",
      pinyin: "Chūntiān lái le, gōngyuán lǐ de huā dōu kāi le.",
      meaning: "Mùa xuân đến rồi, hoa trong công viên đều nở cả rồi."
    }
  },
  {
    id: "L05_09",
    lesson: 5,
    lessonTitle: "我最近越来越胖了",
    hanzi: "草",
    pinyin: "cǎo",
    pinyinClean: "cao",
    hanViet: "thảo",
    wordType: "n",
    meaning: "cỏ, bãi cỏ",
    decomposition: [
      { char: "草", pinyin: "cǎo", hanViet: "thảo", radical: "艹 (Thảo đầu - cỏ)", mnemonic: "Cỏ (艹) đón sương sớm (早) mọc xanh tươi" }
    ],
    visualDistractors: ["早", "花", "茶", "菜"],
    homophones: ["草", "吵", "炒", "操", "曹"],
    example: {
      hanzi: "春天到了，树绿了，草也绿了。",
      pinyin: "Chūntiān dào le, shù lǜ le, cǎo yě lǜ le.",
      meaning: "Mùa xuân đến rồi, cây xanh rồi, cỏ cũng xanh rồi."
    }
  },
  {
    id: "L05_10",
    lesson: 5,
    lessonTitle: "我最近越来越胖了",
    hanzi: "夏天",
    pinyin: "xiàtiān",
    pinyinClean: "xiatian",
    hanViet: "hạ thiên",
    wordType: "n",
    meaning: "mùa hè",
    decomposition: [
      { char: "夏", pinyin: "xià", hanViet: "hạ", radical: "夂 (Trĩ - bước chân)", mnemonic: "Cái đầu (页) đội nắng, chân (夂) bước đi trong mùa hè" },
      { char: "天", pinyin: "tiān", hanViet: "thiên", radical: "大 (Đại)", mnemonic: "Bầu trời" }
    ],
    visualDistractors: ["春天", "下午", "复习", "冬天"],
    homophones: ["夏天", "下天", "暇天", "霞天", "峡天"],
    example: {
      hanzi: "夏天太热了，我最喜欢去游泳。",
      pinyin: "Xiàtiān tài rè le, wǒ zuì xǐhuan qù yóuyǒng.",
      meaning: "Mùa hè nóng quá, tôi thích nhất là đi bơi."
    }
  },
  {
    id: "L05_11",
    lesson: 5,
    lessonTitle: "我最近越来越胖了",
    hanzi: "裙子",
    pinyin: "qúnzi",
    pinyinClean: "qunzi",
    hanViet: "quần tử",
    wordType: "n",
    meaning: "chân váy, chiếc váy",
    decomposition: [
      { char: "裙", pinyin: "qún", hanViet: "quần", radical: "衤 (Y - quần áo)", mnemonic: "Trang phục (衤) của bậc quân vương/tiểu thư (君) là chiếc váy" },
      { char: "子", pinyin: "zi", hanViet: "tử", radical: "子 (Tử)", mnemonic: "Hậu tố danh từ" }
    ],
    visualDistractors: ["裤子", "衬衫", "被子", "君子"],
    homophones: ["裙子", "群子", "君子", "麇子", "困子"],
    example: {
      hanzi: "姐姐穿那条红色的裙子真漂亮。",
      pinyin: "Jiějie chuān nà tiáo hóngsè de qúnzi zhēn piàoliang.",
      meaning: "Chị gái mặc chiếc váy màu đỏ kia thật đẹp."
    }
  },
  {
    id: "L05_12",
    lesson: 5,
    lessonTitle: "我最近越来越胖了",
    hanzi: "最近",
    pinyin: "zuìjìn",
    pinyinClean: "zuijin",
    hanViet: "tối cận",
    wordType: "n/adv",
    meaning: "dạo này, gần đây",
    decomposition: [
      { char: "最", pinyin: "zuì", hanViet: "tối", radical: "日 (Nhật)", mnemonic: "Dưới mặt trời (日) lấy được (取) vị trí cao nhất" },
      { char: "近", pinyin: "jìn", hanViet: "cận", radical: "辶 (Sước - bước đi)", mnemonic: "Bước chân (辶) cầm rìu (斤) đến thật gần" }
    ],
    visualDistractors: ["最后", "最好", "远近", "迟到"],
    homophones: ["最近", "最紧", "嘴紧", "罪金", "醉劲"],
    example: {
      hanzi: "我最近越来越胖了。",
      pinyin: "Wǒ zuìjìn yuèláiyuè pàng le.",
      meaning: "Dạo này tôi ngày càng béo lên rồi."
    }
  },
  {
    id: "L05_13",
    lesson: 5,
    lessonTitle: "我最近越来越胖了",
    hanzi: "越",
    pinyin: "yuè",
    pinyinClean: "yue",
    hanViet: "việt",
    wordType: "adv/v",
    meaning: "càng (越来越: ngày càng...)",
    decomposition: [
      { char: "越", pinyin: "yuè", hanViet: "việt", radical: "走 (Tẩu - chạy)", mnemonic: "Chạy bộ (走) cầm kích (戉) vượt qua giới hạn" }
    ],
    visualDistractors: ["起", "超", "赶", "趣"],
    homophones: ["越", "月", "乐", "阅", "约"],
    example: {
      hanzi: "雨越下越大，我们等一会儿再走吧。",
      pinyin: "Yǔ yuè xià yuè dà, wǒmen děng yíhuìr zài zǒu ba.",
      meaning: "Mưa càng lúc càng to, chúng ta đợi một lát rồi hãy đi."
    }
  },

  // ==================== BÀI 6: 怎么突然找不到了 ====================
  {
    id: "L06_01",
    lesson: 6,
    lessonTitle: "怎么突然找不到了",
    hanzi: "眼镜",
    pinyin: "yǎnjìng",
    pinyinClean: "yanjing",
    hanViet: "nhãn kính",
    wordType: "n",
    meaning: "kính mắt, mắt kính",
    decomposition: [
      { char: "眼", pinyin: "yǎn", hanViet: "nhãn", radical: "目 (Mục - mắt)", mnemonic: "Con mắt (目) có giới hạn tầm nhìn (艮)" },
      { char: "镜", pinyin: "jìng", hanViet: "kính", radical: "钅 (Kim - kim loại)", mnemonic: "Khung kim loại (钅) soi rõ đến tận cùng (竟) như gương kính" }
    ],
    visualDistractors: ["眼睛", "环境", "镜头", "银色"],
    homophones: ["眼镜", "眼睛", "演进", "严禁", "安静"],
    example: {
      hanzi: "我的眼镜怎么突然找不到了？",
      pinyin: "Wǒ de yǎnjìng zěnme tūrán zhǎo bú dào le?",
      meaning: "Mắt kính của tôi sao đột nhiên không tìm thấy nữa rồi?"
    }
  },
  {
    id: "L06_02",
    lesson: 6,
    lessonTitle: "怎么突然找不到了",
    hanzi: "突然",
    pinyin: "tūrán",
    pinyinClean: "turan",
    hanViet: "đột nhiên",
    wordType: "adj/adv",
    meaning: "đột nhiên, bỗng nhiên, đột ngột",
    decomposition: [
      { char: "突", pinyin: "tū", hanViet: "đột", radical: "穴 (Huyệt - cái hang)", mnemonic: "Con chó (犬) bất ngờ lao vọt ra khỏi hang (穴)" },
      { char: "然", pinyin: "rán", hanViet: "nhiên", radical: "灬 (Hỏa)", mnemonic: "Trạng thái xảy ra như vậy" }
    ],
    visualDistractors: ["当然", "虽然", "自然", "哭泣"],
    homophones: ["突然", "徒然", "涂然", "图然", "凸然"],
    example: {
      hanzi: "刚才还是晴天，怎么突然下雨了？",
      pinyin: "Gāngcái háishì qíngtiān, zěnme tūrán xiàyǔ le?",
      meaning: "Vừa nãy còn là trời nắng, sao đột nhiên lại mưa rồi?"
    }
  },
  {
    id: "L06_03",
    lesson: 6,
    lessonTitle: "怎么突然找不到了",
    hanzi: "离开",
    pinyin: "líkāi",
    pinyinClean: "likai",
    hanViet: "ly khai",
    wordType: "v",
    meaning: "rời khỏi, xa rời",
    decomposition: [
      { char: "离", pinyin: "lí", hanViet: "ly", radical: "禸 (Nhựu)", mnemonic: "Con chim rời khỏi chiếc lưới bay đi xa" },
      { char: "开", pinyin: "kāi", hanViet: "khai", radical: "廾 (Củng)", mnemonic: "Hai tay mở chốt cửa bước ra ngoài" }
    ],
    visualDistractors: ["花开", "开始", "离婚", "距离"],
    homophones: ["离开", "礼开", "力开", "理开", "梨开"],
    example: {
      hanzi: "离开教室的时候，请把灯关了。",
      pinyin: "Líkāi jiàoshì de shíhou, qǐng bǎ dēng guān le.",
      meaning: "Lúc rời khỏi phòng học, xin hãy tắt đèn đi."
    }
  },
  {
    id: "L06_04",
    lesson: 6,
    lessonTitle: "怎么突然找不到了",
    hanzi: "清楚",
    pinyin: "qīngchu",
    pinyinClean: "qingchu",
    hanViet: "thanh sở",
    wordType: "adj",
    meaning: "rõ ràng",
    decomposition: [
      { char: "清", pinyin: "qīng", hanViet: "thanh", radical: "氵 (Chấm thủy - nước)", mnemonic: "Dòng nước (氵) trong xanh (青) nhìn thấu đáy" },
      { char: "楚", pinyin: "chǔ", hanViet: "sở", radical: "木 (Mộc - cây)", mnemonic: "Bước chân (疋) đi dưới rừng cây (林) thấy rõ lối mòn" }
    ],
    visualDistractors: ["晴天", "请客", "情况", "干净"],
    homophones: ["清楚", "清除", "庆楚", "青楚", "轻处"],
    example: {
      hanzi: "黑板上的字太小了，我看不清楚。",
      pinyin: "Hēibǎn shàng de zì tài xiǎo le, wǒ kàn bù qīngchu.",
      meaning: "Chữ trên bảng đen nhỏ quá, tôi nhìn không rõ."
    }
  },
  {
    id: "L06_05",
    lesson: 6,
    lessonTitle: "怎么突然找不到了",
    hanzi: "刚才",
    pinyin: "gāngcái",
    pinyinClean: "gangcai",
    hanViet: "cương tài",
    wordType: "n",
    meaning: "vừa nãy, lúc nãy",
    decomposition: [
      { char: "刚", pinyin: "gāng", hanViet: "cương", radical: "刂 (Đao đứng - dao)", mnemonic: "Lưỡi dao (刂) sắc bén trên sườn núi (冈) vừa mới rèn xong" },
      { char: "才", pinyin: "cái", hanViet: "tài", radical: "扌 (Thủ)", mnemonic: "Mầm cây vừa mới nhú lên khỏi mặt đất" }
    ],
    visualDistractors: ["刚才", "刚刚", "刚才", "刚才"],
    homophones: ["刚才", "钢材", "刚才是", "岗才", "纲才"],
    example: {
      hanzi: "你刚才去哪儿了？我找了你半天。",
      pinyin: "Nǐ gāngcái qù nǎr le? Wǒ zhǎole nǐ bàntiān.",
      meaning: "Vừa nãy bạn đi đâu thế? Tôi tìm bạn cả buổi."
    }
  },
  {
    id: "L06_06",
    lesson: 6,
    lessonTitle: "怎么突然找不到了",
    hanzi: "帮忙",
    pinyin: "bāngmáng",
    pinyinClean: "bangmang",
    hanViet: "bang mang",
    wordType: "v",
    meaning: "giúp đỡ",
    decomposition: [
      { char: "帮", pinyin: "bāng", hanViet: "bang", radical: "巾 (Cân - khăn/vải)", mnemonic: "Cùng nhau phụ giúp công việc" },
      { char: "忙", pinyin: "máng", hanViet: "mang", radical: "忄 (Tâm đứng)", mnemonic: "Trái tim (忄) bận rộn đến quên mất (亡)" }
    ],
    visualDistractors: ["帮助", "急忙", "忘记", "希望"],
    homophones: ["帮忙", "邦忙", "榜忙", "绑忙", "棒忙"],
    example: {
      hanzi: "谢谢你今天来帮忙搬家。",
      pinyin: "Xièxie nǐ jīntiān lái bāngmáng bānjiā.",
      meaning: "Cảm ơn bạn hôm nay đã đến giúp chuyển nhà."
    }
  },
  {
    id: "L06_07",
    lesson: 6,
    lessonTitle: "怎么突然找不到了",
    hanzi: "特别",
    pinyin: "tèbié",
    pinyinClean: "tebie",
    hanViet: "đặc biệt",
    wordType: "adv/adj",
    meaning: "đặc biệt, vô cùng",
    decomposition: [
      { char: "特", pinyin: "tè", hanViet: "đặc", radical: "牜 (Ngưu - con trâu)", mnemonic: "Con trâu (牜) quý được dắt tới ngôi chùa (寺) rất đặc biệt" },
      { char: "别", pinyin: "bié", hanViet: "biệt", radical: "刂 (Đao đứng)", mnemonic: "Dùng dao (刂) tách riêng ra cho khác biệt" }
    ],
    visualDistractors: ["别人", "特点", "持别", "等待"],
    homophones: ["特别", "特bie", "特鳖", "忑别", "铽别"],
    example: {
      hanzi: "她做的中国菜特别好吃。",
      pinyin: "Tā zuò de Zhōngguócài tèbié hǎochī.",
      meaning: "Món ăn Trung Quốc cô ấy nấu đặc biệt ngon."
    }
  },
  {
    id: "L06_08",
    lesson: 6,
    lessonTitle: "怎么突然找不到了",
    hanzi: "讲",
    pinyin: "jiǎng",
    pinyinClean: "jiang",
    hanViet: "giảng",
    wordType: "v",
    meaning: "giảng giải, nói, kể",
    decomposition: [
      { char: "讲", pinyin: "jiǎng", hanViet: "giảng", radical: "讠 (Ngôn - lời nói)", mnemonic: "Dùng lời nói (讠) phân tích rành mạch như giếng nước (井)" }
    ],
    visualDistractors: ["进", "说", "请", "井"],
    homophones: ["讲", "奖", "桨", "蒋", "降"],
    example: {
      hanzi: "王老师讲得又清楚又明白。",
      pinyin: "Wáng lǎoshī jiǎng de yòu qīngchu yòu míngbai.",
      meaning: "Thầy Vương giảng bài vừa rõ ràng vừa dễ hiểu."
    }
  },
  {
    id: "L06_09",
    lesson: 6,
    lessonTitle: "怎么突然找不到了",
    hanzi: "明白",
    pinyin: "míngbai",
    pinyinClean: "mingbai",
    hanViet: "minh bạch",
    wordType: "v/adj",
    meaning: "hiểu rõ, minh bạch",
    decomposition: [
      { char: "明", pinyin: "míng", hanViet: "minh", radical: "日 (Nhật)", mnemonic: "Sáng tỏ như nhật nguyệt" },
      { char: "白", pinyin: "bái", hanViet: "bạch", radical: "白 (Bạch - trắng)", mnemonic: "Trắng trong, rõ ràng" }
    ],
    visualDistractors: ["明天", "聪明", "白天", "自白"],
    homophones: ["明白", "名白", "命白", "鸣白", "铭白"],
    example: {
      hanzi: "你明白这句话的意思了吗？",
      pinyin: "Nǐ míngbai zhè jù huà de yìsi le ma?",
      meaning: "Bạn đã hiểu ý nghĩa của câu nói này chưa?"
    }
  },
  {
    id: "L06_10",
    lesson: 6,
    lessonTitle: "怎么突然找不到了",
    hanzi: "锻炼",
    pinyin: "duànliàn",
    pinyinClean: "duanlian",
    hanViet: "đoán luyện",
    wordType: "v",
    meaning: "rèn luyện, tập thể dục",
    decomposition: [
      { char: "锻", pinyin: "duàn", hanViet: "đoán", radical: "钅 (Kim - kim loại)", mnemonic: "Dùng búa đập từng đoạn (段) kim loại (钅) để rèn sắt" },
      { char: "炼", pinyin: "liàn", hanViet: "luyện", radical: "火 (Hỏa - lửa)", mnemonic: "Nung trong lửa đỏ (火) để chọn lọc (柬) tinh chất" }
    ],
    visualDistractors: ["练习", "一段", "熟练", "银行"],
    homophones: ["锻炼", "断链", "锻练", "段练", "端练"],
    example: {
      hanzi: "爷爷每天早上都去公园锻炼身体。",
      pinyin: "Yéye měitiān zǎoshang dōu qù gōngyuán duànliàn shēntǐ.",
      meaning: "Ông nội sáng nào cũng ra công viên tập thể dục."
    }
  },
  {
    id: "L06_11",
    lesson: 6,
    lessonTitle: "怎么突然找不到了",
    hanzi: "音乐",
    pinyin: "yīnyuè",
    pinyinClean: "yinyue",
    hanViet: "âm nhạc",
    wordType: "n",
    meaning: "âm nhạc",
    decomposition: [
      { char: "音", pinyin: "yīn", hanViet: "âm", radical: "音 (Âm - âm thanh)", mnemonic: "Đứng (立) phát ra tiếng nói (日) tạo thành âm thanh" },
      { char: "乐", pinyin: "yuè", hanViet: "nhạc", radical: "丿 (Phiệt)", mnemonic: "Dây đàn căng trên giá gỗ phát ra tiếng nhạc" }
    ],
    visualDistractors: ["快乐", "声音", "可乐", "意思"],
    homophones: ["音乐", "音悦", "阴月", "银月", "隐约"],
    example: {
      hanzi: "做完作业以后，我喜欢听一会儿音乐。",
      pinyin: "Zuòwán zuòyè yǐhòu, wǒ xǐhuan tīng yíhuìr yīnyuè.",
      meaning: "Sau khi làm xong bài tập, tôi thích nghe nhạc một lát."
    }
  },
  {
    id: "L06_12",
    lesson: 6,
    lessonTitle: "怎么突然找不到了",
    hanzi: "公园",
    pinyin: "gōngyuán",
    pinyinClean: "gongyuan",
    hanViet: "công viên",
    wordType: "n",
    meaning: "công viên",
    decomposition: [
      { char: "公", pinyin: "gōng", hanViet: "công", radical: "八 (Bát)", mnemonic: "Của chung, công cộng" },
      { char: "园", pinyin: "yuán", hanViet: "viên", radical: "囗 (Vi - tường bao)", mnemonic: "Khu vườn có tường bao quanh (囗) trị giá nhiều đồng nguyên (元)" }
    ],
    visualDistractors: ["公司", "花园", "校园", "圆满"],
    homophones: ["公园", "公元", "官员", "公苑", "工员"],
    example: {
      hanzi: "周末公园里有很多人在散步。",
      pinyin: "Zhōumò gōngyuán lǐ yǒu hěn duō rén zài sànbù.",
      meaning: "Cuối tuần trong công viên có rất nhiều người đang đi dạo."
    }
  },
  {
    id: "L06_13",
    lesson: 6,
    lessonTitle: "怎么突然找不到了",
    hanzi: "聊天",
    pinyin: "liáotiān",
    pinyinClean: "liaotian",
    hanViet: "liêu thiên",
    wordType: "v",
    meaning: "nói chuyện phiếm, tán gẫu",
    decomposition: [
      { char: "聊", pinyin: "liáo", hanViet: "liêu", radical: "耳 (Nhĩ - cái tai)", mnemonic: "Nghiêng tai (耳) lắng nghe bạn bè (卯) tâm sự" },
      { char: "天", pinyin: "tiān", hanViet: "thiên", radical: "大 (Đại)", mnemonic: "Nói chuyện trên trời dưới biển" }
    ],
    visualDistractors: ["聪明", "昨天", "柳树", "无聊"],
    homophones: ["聊天", "辽天", "燎天", "寥天", "撩天"],
    example: {
      hanzi: "我们去咖啡店喝杯咖啡，聊聊天儿吧。",
      pinyin: "Wǒmen qù kāfēidiàn hē bēi kāfēi, liáoliao tiānr ba.",
      meaning: "Chúng mình tới quán cà phê uống cốc cà phê, tán gẫu chút nhé."
    }
  },
  {
    id: "L06_14",
    lesson: 6,
    lessonTitle: "怎么突然找不到了",
    hanzi: "睡着",
    pinyin: "shuìzháo",
    pinyinClean: "shuizhao",
    hanViet: "thụy trước",
    wordType: "v",
    meaning: "ngủ thiếp đi, ngủ được",
    decomposition: [
      { char: "睡", pinyin: "shuì", hanViet: "thụy", radical: "目 (Mục - mắt)", mnemonic: "Mi mắt (目) rủ xuống (垂) chìm vào giấc ngủ" },
      { char: "着", pinyin: "zháo", hanViet: "trước", radical: "目 (Mục)", mnemonic: "Bổ ngữ kết quả chỉ đã đạt trạng thái ngủ" }
    ],
    visualDistractors: ["睡觉", "着急", "看着", "眼睛"],
    homophones: ["睡着", "水着", "税着", "谁着", "说谎"],
    example: {
      hanzi: "昨天晚上太累了，我躺下就睡着了。",
      pinyin: "Zuótiān wǎnshang tài lèi le, wǒ tǎngxià jiù shuìzháo le.",
      meaning: "Tối hôm qua mệt quá, tôi vừa nằm xuống là ngủ thiếp đi ngay."
    }
  },
  {
    id: "L06_15",
    lesson: 6,
    lessonTitle: "怎么突然找不到了",
    hanzi: "更",
    pinyin: "gèng",
    pinyinClean: "geng",
    hanViet: "cánh",
    wordType: "adv",
    meaning: "hơn, càng hơn",
    decomposition: [
      { char: "更", pinyin: "gèng", hanViet: "cánh", radical: "日 (Nhật)", mnemonic: "Mặt trời thay đổi qua mỗi canh giờ lại càng sáng hơn" }
    ],
    visualDistractors: ["便", "史", "吏", "丈"],
    homophones: ["更", "耕", "庚", "羹", "梗"],
    example: {
      hanzi: "喝杯热牛奶，你会睡得更好。",
      pinyin: "Hē bēi rè niúnǎi, nǐ huì shuì de gèng hǎo.",
      meaning: "Uống một cốc sữa nóng, bạn sẽ ngủ ngon hơn đấy."
    }
  },

  // ==================== BÀI 7: 我跟她都认识五年了 ====================
  {
    id: "L07_01",
    lesson: 7,
    lessonTitle: "我跟她都认识五年了",
    hanzi: "同事",
    pinyin: "tóngshì",
    pinyinClean: "tongshi",
    hanViet: "đồng sự",
    wordType: "n",
    meaning: "đồng nghiệp",
    decomposition: [
      { char: "同", pinyin: "tóng", hanViet: "đồng", radical: "口 (Khẩu)", mnemonic: "Cùng chung một mái vòm (冂) và một tiếng nói (口)" },
      { char: "事", pinyin: "shì", hanViet: "sự", radical: "亅 (Quyết)", mnemonic: "Tay cầm bút giải quyết công việc" }
    ],
    visualDistractors: ["同学", "事情", "同意", "故事"],
    homophones: ["同事", "同时", "通事", "统事", "童事"],
    example: {
      hanzi: "这位是我的新同事，他叫李明。",
      pinyin: "Zhè wèi shì wǒ de xīn tóngshì, tā jiào Lǐ Míng.",
      meaning: "Vị này là đồng nghiệp mới của tôi, anh ấy tên là Lý Minh."
    }
  },
  {
    id: "L07_02",
    lesson: 7,
    lessonTitle: "我跟她都认识五年了",
    hanzi: "以前",
    pinyin: "yǐqián",
    pinyinClean: "yiqian",
    hanViet: "dĩ tiền",
    wordType: "n",
    meaning: "trước đây, trước kia",
    decomposition: [
      { char: "以", pinyin: "yǐ", hanViet: "dĩ", radical: "人 (Nhân)", mnemonic: "Người cầm nông cụ lấy mốc thời gian" },
      { char: "前", pinyin: "qián", hanViet: "tiền", radical: "刂 (Đao đứng)", mnemonic: "Dùng dao (刂) cắt dây cho thuyền tiến về phía trước" }
    ],
    visualDistractors: ["以后", "以为", "可以", "前天"],
    homophones: ["以前", "一钱", "已前", "移前", "仪前"],
    example: {
      hanzi: "来中国以前，我学过两年汉语。",
      pinyin: "Lái Zhōngguó yǐqián, wǒ xuéguò liǎng nián Hànyǔ.",
      meaning: "Trước khi đến Trung Quốc, tôi đã từng học hai năm tiếng Hán."
    }
  },
  {
    id: "L07_03",
    lesson: 7,
    lessonTitle: "我跟她都认识五年了",
    hanzi: "银行",
    pinyin: "yínháng",
    pinyinClean: "yinhang",
    hanViet: "ngân hàng",
    wordType: "n",
    meaning: "ngân hàng",
    decomposition: [
      { char: "银", pinyin: "yín", hanViet: "ngân", radical: "钅 (Kim - kim loại)", mnemonic: "Kim loại (钅) quý cứng cỏi (艮) là bạc trắng" },
      { char: "行", pinyin: "háng", hanViet: "hàng", radical: "行 (Hành - đi/ngành)", mnemonic: "Ngã tư đường nơi đặt các cửa hiệu, ngân hàng" }
    ],
    visualDistractors: ["很", "跟", "眼镜", "行业"],
    homophones: ["银行", "引航", "音行", "隐行", "印行"],
    example: {
      hanzi: "她大学毕业以后在银行工作。",
      pinyin: "Tā dàxué bìyè yǐhòu zài yínháng gōngzuò.",
      meaning: "Sau khi tốt nghiệp đại học, cô ấy làm việc ở ngân hàng."
    }
  },
  {
    id: "L07_04",
    lesson: 7,
    lessonTitle: "我跟她都认识五年了",
    hanzi: "久",
    pinyin: "jiǔ",
    pinyinClean: "jiu",
    hanViet: "cửu",
    wordType: "adj",
    meaning: "lâu, dài lâu (về thời gian)",
    decomposition: [
      { char: "久", pinyin: "jiǔ", hanViet: "cửu", radical: "丿 (Phiệt)", mnemonic: "Người đứng tựa lưng chờ đợi rất lâu" }
    ],
    visualDistractors: ["九", "欠", "夕", "么"],
    homophones: ["久", "九", "酒", "旧", "救"],
    example: {
      hanzi: "好久不见，你最近怎么样？",
      pinyin: "Hǎojiǔ bú jiàn, nǐ zuìjìn zěnmeyàng?",
      meaning: "Lâu lắm không gặp, dạo này bạn thế nào?"
    }
  },
  {
    id: "L07_05",
    lesson: 7,
    lessonTitle: "我跟她都认识五年了",
    hanzi: "感兴趣",
    pinyin: "gǎn xìngqù",
    pinyinClean: "ganxingqu",
    hanViet: "cảm hứng thú",
    wordType: "v",
    meaning: "có hứng thú, quan tâm đến",
    decomposition: [
      { char: "感", pinyin: "gǎn", hanViet: "cảm", radical: "心 (Tâm)", mnemonic: "Cảm nhận trong tim (心)" },
      { char: "兴", pinyin: "xìng", hanViet: "hứng", radical: "八 (Bát)", mnemonic: "Nhiều tay cùng nâng lên đầy hào hứng" },
      { char: "趣", pinyin: "qù", hanViet: "thú", radical: "走 (Tẩu - chạy)", mnemonic: "Chạy tới (走) để nắm lấy (取) điều thú vị" }
    ],
    visualDistractors: ["感冒", "高兴", "越来越", "感谢"],
    homophones: ["感兴趣", "敢兴趣", "干兴趣", "感性趣", "甘兴趣"],
    example: {
      hanzi: "我对中国历史非常感兴趣。",
      pinyin: "Wǒ duì Zhōngguó lìshǐ fēicháng gǎn xìngqù.",
      meaning: "Tôi vô cùng có hứng thú với lịch sử Trung Quốc."
    }
  },
  {
    id: "L07_06",
    lesson: 7,
    lessonTitle: "我跟她都认识五年了",
    hanzi: "结婚",
    pinyin: "jiéhūn",
    pinyinClean: "jiehun",
    hanViet: "kết hôn",
    wordType: "v",
    meaning: "kết hôn, cưới",
    decomposition: [
      { char: "结", pinyin: "jié", hanViet: "kết", radical: "纟 (Mịch - sợi tơ)", mnemonic: "Sợi tơ hồng (纟) buộc chặt điều cát tường (吉)" },
      { char: "婚", pinyin: "hūn", hanViet: "hôn", radical: "女 (Nữ - phụ nữ)", mnemonic: "Đón người con gái (女) về nhà vào lúc hoàng hôn (昏)" }
    ],
    visualDistractors: ["结束", "结果", "离婚", "节日"],
    homophones: ["结婚", "结魂", "借婚", "姐婚", "界婚"],
    example: {
      hanzi: "他们认识五年以后终于结婚了。",
      pinyin: "Tāmen rènshi wǔ nián yǐhòu zhōngyú jiéhūn le.",
      meaning: "Sau 5 năm quen nhau, họ cuối cùng đã kết hôn."
    }
  },
  {
    id: "L07_07",
    lesson: 7,
    lessonTitle: "我跟她都认识五年了",
    hanzi: "欢迎",
    pinyin: "huānyíng",
    pinyinClean: "huanying",
    hanViet: "hoan nghênh",
    wordType: "v",
    meaning: "hoan nghênh, chào đón",
    decomposition: [
      { char: "欢", pinyin: "huān", hanViet: "hoan", radical: "欠 (Khiếm)", mnemonic: "Vẫy tay (又) reo hò (欠) vui mừng" },
      { char: "迎", pinyin: "yíng", hanViet: "nghênh", radical: "辶 (Sước - bước đi)", mnemonic: "Bước chân (辶) ra tận cửa ngẩng đầu (卬) đón khách" }
    ],
    visualDistractors: ["喜欢", "运动", "近来", "吹风"],
    homophones: ["欢迎", "换影", "欢赢", "环营", "幻影"],
    example: {
      hanzi: "欢迎你们来我们公司参观！",
      pinyin: "Huānyíng nǐmen lái wǒmen gōngsī cānguān!",
      meaning: "Chào mừng các bạn đến tham quan công ty chúng tôi!"
    }
  },
  {
    id: "L07_08",
    lesson: 7,
    lessonTitle: "我跟她都认识五年了",
    hanzi: "迟到",
    pinyin: "chídào",
    pinyinClean: "chidao",
    hanViet: "trì đáo",
    wordType: "v",
    meaning: "đến muộn, đi trễ",
    decomposition: [
      { char: "迟", pinyin: "chí", hanViet: "trì", radical: "辶 (Sước - bước đi)", mnemonic: "Bước đi (辶) chậm chạp từng thước (尺)" },
      { char: "到", pinyin: "dào", hanViet: "đáo", radical: "刂 (Đao đứng)", mnemonic: "Đi tới đích (至)" }
    ],
    visualDistractors: ["知道", "最近", "遇到", "远近"],
    homophones: ["迟到", "吃到", "持刀", "赤道", "尺到"],
    example: {
      hanzi: "今天早上堵车，所以我上班迟到了。",
      pinyin: "Jīntiān zǎoshang dǔchē, suǒyǐ wǒ shàngbān chídào le.",
      meaning: "Sáng nay tắc đường, cho nên tôi đi làm bị muộn."
    }
  },
  {
    id: "L07_09",
    lesson: 7,
    lessonTitle: "我跟她都认识五年了",
    hanzi: "半",
    pinyin: "bàn",
    pinyinClean: "ban",
    hanViet: "bán",
    wordType: "num",
    meaning: "một nửa, rưỡi",
    decomposition: [
      { char: "半", pinyin: "bàn", hanViet: "bán", radical: "十 (Thập)", mnemonic: "Một nét thẳng bổ đôi hai phần bằng nhau" }
    ],
    visualDistractors: ["胖", "伴", "羊", "平"],
    homophones: ["半", "办", "伴", "扮", "拌"],
    example: {
      hanzi: "现在是差一刻八点半。",
      pinyin: "Xiànzài shì chà yí kè bā diǎn bàn.",
      meaning: "Bây giờ là 8 giờ rưỡi kém 15 phút."
    }
  },
  {
    id: "L07_10",
    lesson: 7,
    lessonTitle: "我跟她都认识五年了",
    hanzi: "接",
    pinyin: "jiē",
    pinyinClean: "jie",
    hanViet: "tiếp",
    wordType: "v",
    meaning: "đón (người); nhận, nghe (điện thoại)",
    decomposition: [
      { char: "接", pinyin: "jiē", hanViet: "tiếp", radical: "扌 (Tài gảy - tay)", mnemonic: "Đưa tay (扌) ra đón người phụ nữ (女) đang đứng (立) đợi" }
    ],
    visualDistractors: ["拉", "挂", "找", "楼"],
    homophones: ["接", "街", "节", "姐", "借"],
    example: {
      hanzi: "下午我去机场接一个老朋友。",
      pinyin: "Xiàwǔ wǒ qù jīchǎng jiē yí gè lǎo péngyou.",
      meaning: "Chiều nay tôi ra sân bay đón một người bạn cũ."
    }
  },
  {
    id: "L07_11",
    lesson: 7,
    lessonTitle: "我跟她都认识五年了",
    hanzi: "刻",
    pinyin: "kè",
    pinyinClean: "ke",
    hanViet: "khắc",
    wordType: "mw/v",
    meaning: "khắc (15 phút); chạm khắc",
    decomposition: [
      { char: "刻", pinyin: "kè", hanViet: "khắc", radical: "刂 (Đao đứng - dao)", mnemonic: "Dùng dao (刂) khắc vạch giờ (亥) lên đồng hồ" }
    ],
    visualDistractors: ["孩", "该", "别", "到"],
    homophones: ["刻", "课", "客", "克", "渴"],
    example: {
      hanzi: "我们八点一刻在学校门口见面。",
      pinyin: "Wǒmen bā diǎn yí kè zài xuéxiào ménkǒu jiànmiàn.",
      meaning: "Chúng ta gặp nhau ở cổng trường lúc 8 giờ 15 phút."
    }
  },
  {
    id: "L07_12",
    lesson: 7,
    lessonTitle: "我跟她都认识五年了",
    hanzi: "差",
    pinyin: "chà",
    pinyinClean: "cha",
    hanViet: "sai",
    wordType: "v/adj",
    meaning: "kém (giờ); thiếu; kém cỏi",
    decomposition: [
      { char: "差", pinyin: "chà", hanViet: "sai", radical: "工 (Công)", mnemonic: "Con dê (羊) làm việc (工) lệch sang một bên nên còn kém" }
    ],
    visualDistractors: ["着", "羊", "美", "羞"],
    homophones: ["差", "茶", "查", "插", "叉"],
    example: {
      hanzi: "差五分九点，火车就要开了。",
      pinyin: "Chà wǔ fēn jiǔ diǎn, huǒchē jiù yào kāi le.",
      meaning: "9 giờ kém 5 phút, tàu hỏa sắp chạy rồi."
    }
  },

  // ==================== BÀI 8: 你去哪儿我就去哪儿 ====================
  {
    id: "L08_01",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "又",
    pinyin: "yòu",
    pinyinClean: "you",
    hanViet: "hựu",
    wordType: "adv",
    meaning: "lại (lặp lại hành động đã xảy ra)",
    decomposition: [
      { char: "又", pinyin: "yòu", hanViet: "hựu", radical: "又 (Hựu)", mnemonic: "Bàn tay lặp lại một lần nữa" }
    ],
    visualDistractors: ["叉", "双", "及", "丈"],
    homophones: ["又", "右", "有", "友", "诱"],
    example: {
      hanzi: "你昨天买了一条裙子，怎么今天又买了一条？",
      pinyin: "Nǐ zuótiān mǎile yì tiáo qúnzi, zěnme jīntiān yòu mǎile yì tiáo?",
      meaning: "Hôm qua bạn đã mua một chiếc váy, sao hôm nay lại mua thêm một chiếc nữa?"
    }
  },
  {
    id: "L08_02",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "满意",
    pinyin: "mǎnyì",
    pinyinClean: "manyi",
    hanViet: "mãn ý",
    wordType: "v/adj",
    meaning: "hài lòng, vừa ý",
    decomposition: [
      { char: "满", pinyin: "mǎn", hanViet: "mãn", radical: "氵 (Chấm thủy - nước)", mnemonic: "Nước (氵) dâng đầy ắp cả hai bên (两)" },
      { char: "意", pinyin: "yì", hanViet: "ý", radical: "心 (Tâm - tim)", mnemonic: "Âm thanh (音) vang lên từ trong trái tim (心) là tâm ý" }
    ],
    visualDistractors: ["意思", "愿意", "注意", "同意"],
    homophones: ["满意", "满溢", "慢意", "蔓意", "蛮意"],
    example: {
      hanzi: "经理对他的工作非常满意。",
      pinyin: "Jīnglǐ duì tā de gōngzuò fēicháng mǎnyì.",
      meaning: "Giám đốc vô cùng hài lòng với công việc của anh ấy."
    }
  },
  {
    id: "L08_03",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "电梯",
    pinyin: "diàntī",
    pinyinClean: "dianti",
    hanViet: "điện thê",
    wordType: "n",
    meaning: "thang máy",
    decomposition: [
      { char: "电", pinyin: "diàn", hanViet: "điện", radical: "田 (Điền)", mnemonic: "Tia chớp điện xẹt qua cánh đồng" },
      { char: "梯", pinyin: "tī", hanViet: "thê", radical: "木 (Mộc - gỗ)", mnemonic: "Cầu thang gỗ (木) có từng bậc theo thứ tự (弟)" }
    ],
    visualDistractors: ["电影", "电脑", "弟弟", "楼梯"],
    homophones: ["电梯", "点题", "垫底", "电体", "店体"],
    example: {
      hanzi: "我们坐电梯上十楼吧。",
      pinyin: "Wǒmen zuò diàntī shàng shí lóu ba.",
      meaning: "Chúng ta đi thang máy lên tầng 10 nhé."
    }
  },
  {
    id: "L08_04",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "层",
    pinyin: "céng",
    pinyinClean: "ceng",
    hanViet: "tầng",
    wordType: "mw",
    meaning: "tầng, lớp",
    decomposition: [
      { char: "层", pinyin: "céng", hanViet: "tầng", radical: "尸 (Thi - mái nhà)", mnemonic: "Dưới mái nhà (尸) có các đám mây (云) xếp chồng thành từng tầng" }
    ],
    visualDistractors: ["屋", "居", "房", "会"],
    homophones: ["层", "曾", "蹭", "嶒", "鄫"],
    example: {
      hanzi: "这栋大楼一共有二十八层。",
      pinyin: "Zhè dòng dàlóu yígòng yǒu èrshíbā céng.",
      meaning: "Tòa nhà lớn này tổng cộng có 28 tầng."
    }
  },
  {
    id: "L08_05",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "害怕",
    pinyin: "hàipà",
    pinyinClean: "haipa",
    hanViet: "hại phạ",
    wordType: "v/adj",
    meaning: "sợ, sợ hãi",
    decomposition: [
      { char: "害", pinyin: "hài", hanViet: "hại", radical: "宀 (Miên)", mnemonic: "Trong nhà (宀) có lời nói (口) sắc nhọn gây tổn hại" },
      { char: "怕", pinyin: "pà", hanViet: "phạ", radical: "忄 (Tâm đứng)", mnemonic: "Trái tim (忄) sợ đến mức mặt trắng bệch (白)" }
    ],
    visualDistractors: ["厉害", "恐怕", "明白", "拍手"],
    homophones: ["害怕", "海帕", "害帕", "孩怕", "亥怕"],
    example: {
      hanzi: "别害怕，我一直在这儿陪着你。",
      pinyin: "Bié hàipà, wǒ yìzhí zài zhèr péizhe nǐ.",
      meaning: "Đừng sợ, tôi luôn ở đây bên cạnh bạn."
    }
  },
  {
    id: "L08_06",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "熊猫",
    pinyin: "xióngmāo",
    pinyinClean: "xiongmao",
    hanViet: "hùng miêu",
    wordType: "n",
    meaning: "gấu trúc",
    decomposition: [
      { char: "熊", pinyin: "xióng", hanViet: "hùng", radical: "灬 (Hỏa - bốn chân/lửa)", mnemonic: "Con gấu có năng lực (能) và bốn bàn chân lớn (灬)" },
      { char: "猫", pinyin: "māo", hanViet: "miêu", radical: "犭 (Khuyển - thú)", mnemonic: "Con thú nhỏ (犭) chạy trên cánh đồng mạ non (苗)" }
    ],
    visualDistractors: ["小猫", "能力", "小狗", "照相"],
    homophones: ["熊猫", "胸毛", "雄猫", "凶猫", "熊貌"],
    example: {
      hanzi: "大熊猫最喜欢吃新鲜的竹子。",
      pinyin: "Dàxióngmāo zuì xǐhuan chī xīnxiān de zhúzi.",
      meaning: "Gấu trúc lớn thích nhất là ăn trúc tươi."
    }
  },
  {
    id: "L08_07",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "见面",
    pinyin: "jiànmiàn",
    pinyinClean: "jianmian",
    hanViet: "kiến diện",
    wordType: "v",
    meaning: "gặp mặt",
    decomposition: [
      { char: "见", pinyin: "jiàn", hanViet: "kiến", radical: "见 (Kiến - nhìn)", mnemonic: "Con mắt đặt trên đôi chân đi tới để nhìn thấy" },
      { char: "面", pinyin: "miàn", hanViet: "diện", radical: "面 (Diện - khuôn mặt)", mnemonic: "Gương mặt đối diện nhau" }
    ],
    visualDistractors: ["看见", "面包", "面条", "再见"],
    homophones: ["见面", "片面", "减免", "店面", "界面"],
    example: {
      hanzi: "我们约好了下午三点在咖啡馆见面。",
      pinyin: "Wǒmen yuēhǎole xiàwǔ sān diǎn zài kāfēiguǎn jiànmiàn.",
      meaning: "Chúng tôi đã hẹn gặp mặt ở quán cà phê lúc 3 giờ chiều."
    }
  },
  {
    id: "L08_08",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "安静",
    pinyin: "ānjìng",
    pinyinClean: "anjing",
    hanViet: "an tĩnh",
    wordType: "adj",
    meaning: "yên tĩnh, yên lặng",
    decomposition: [
      { char: "安", pinyin: "ān", hanViet: "an", radical: "宀 (Miên - mái nhà)", mnemonic: "Người phụ nữ (女) ở dưới mái nhà (宀) thì bình an" },
      { char: "静", pinyin: "jìng", hanViet: "tĩnh", radical: "青 (Thanh)", mnemonic: "Tranh giành (争) lắng xuống trả lại sắc xanh (青) tĩnh lặng" }
    ],
    visualDistractors: ["干净", "安全", "眼镜", "晴天"],
    homophones: ["安静", "眼镜", "按劲", "暗境", "岸境"],
    example: {
      hanzi: "图书馆里非常安静，大家都在认真看书。",
      pinyin: "Túshūguǎn lǐ fēicháng ānjìng, dàjiā dōu zài rènzhēn kànshū.",
      meaning: "Trong thư viện vô cùng yên tĩnh, mọi người đều đang chăm chú đọc sách."
    }
  },
  {
    id: "L08_09",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "可乐",
    pinyin: "kělè",
    pinyinClean: "kele",
    hanViet: "khả lạc",
    wordType: "n",
    meaning: "nước ngọt có ga (Coca/Pepsi)",
    decomposition: [
      { char: "可", pinyin: "kě", hanViet: "khả", radical: "口 (Khẩu)", mnemonic: "Miệng (口) hát ca được" },
      { char: "乐", pinyin: "lè", hanViet: "lạc", radical: "丿 (Phiệt)", mnemonic: "Niềm vui sướng" }
    ],
    visualDistractors: ["快乐", "音乐", "可以", "可爱"],
    homophones: ["可乐", "渴了", "客乐", "克乐", "科乐"],
    example: {
      hanzi: "少喝点儿可乐，多喝点儿白水。",
      pinyin: "Shǎo hē diǎnr kělè, duō hē diǎnr báishuǐ.",
      meaning: "Uống ít nước ngọt có ga thôi, uống nhiều nước lọc vào."
    }
  },
  {
    id: "L08_10",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "一会儿",
    pinyin: "yíhuìr",
    pinyinClean: "yihuir",
    hanViet: "nhất hội nhi",
    wordType: "n",
    meaning: "một lát, chốc lát",
    decomposition: [
      { char: "一", pinyin: "yī", hanViet: "nhất", radical: "一 (Nhất)", mnemonic: "Số một" },
      { char: "会", pinyin: "huì", hanViet: "hội", radical: "人 (Nhân)", mnemonic: "Khoảng thời gian ngắn hội tụ" },
      { char: "儿", pinyin: "ér", hanViet: "nhi", radical: "儿 (Nhi)", mnemonic: "Âm uốn lưỡi" }
    ],
    visualDistractors: ["一点儿", "一块儿", "开会", "会儿"],
    homophones: ["一会儿", "一会而", "一毁儿", "一汇儿", "一回儿"],
    example: {
      hanzi: "请等我一会儿，我马上就来。",
      pinyin: "Qǐng děng wǒ yíhuìr, wǒ mǎshàng jiù lái.",
      meaning: "Xin đợi tôi một lát, tôi tới ngay đây."
    }
  },
  {
    id: "L08_11",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "马上",
    pinyin: "mǎshàng",
    pinyinClean: "mashang",
    hanViet: "mã thượng",
    wordType: "adv",
    meaning: "ngay lập tức, liền",
    decomposition: [
      { char: "马", pinyin: "mǎ", hanViet: "mã", radical: "马 (Mã - con ngựa)", mnemonic: "Con ngựa phi nước đại" },
      { char: "上", pinyin: "shàng", hanViet: "thượng", radical: "一 (Nhất)", mnemonic: "Leo lên lưng ngựa là phóng đi ngay lập tức" }
    ],
    visualDistractors: ["早上", "晚上", "妈妈", "骑马"],
    homophones: ["马上", "码上", "骂上", "麻上", "妈上"],
    example: {
      hanzi: "电影马上就要开始了，我们快进去吧。",
      pinyin: "Diànyǐng mǎshàng jiù yào kāishǐ le, wǒmen kuài jìnqù ba.",
      meaning: "Bộ phim sắp bắt đầu ngay bây giờ rồi, chúng ta mau vào trong thôi."
    }
  },
  {
    id: "L08_12",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "洗手间",
    pinyin: "xǐshǒujiān",
    pinyinClean: "xishoujian",
    hanViet: "tẩy thủ gian",
    wordType: "n",
    meaning: "nhà vệ sinh, phòng rửa tay",
    decomposition: [
      { char: "洗", pinyin: "xǐ", hanViet: "tẩy", radical: "氵 (Chấm thủy - nước)", mnemonic: "Dùng nước (氵) rửa trước tiên (先)" },
      { char: "手", pinyin: "shǒu", hanViet: "thủ", radical: "手 (Thủ - bàn tay)", mnemonic: "Bàn tay năm ngón" },
      { char: "间", pinyin: "jiān", hanViet: "gian", radical: "门 (Môn - cửa)", mnemonic: "Căn phòng có khung cửa (门) ánh nắng (日) chiếu vào" }
    ],
    visualDistractors: ["房间", "时间", "洗澡", "手机"],
    homophones: ["洗手间", "西手间", "细手间", "吸手间", "喜手间"],
    example: {
      hanzi: "请问，洗手间在什么地方？",
      pinyin: "Qǐngwèn, xǐshǒujiān zài shénme dìfang?",
      meaning: "Xin hỏi, nhà vệ sinh ở chỗ nào vậy?"
    }
  },
  {
    id: "L08_13",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "老",
    pinyin: "lǎo",
    pinyinClean: "lao",
    hanViet: "lão",
    wordType: "adj/adv",
    meaning: "già, cũ; luôn, cứ mãi",
    decomposition: [
      { char: "老", pinyin: "lǎo", hanViet: "lão", radical: "耂 (Lão - người già)", mnemonic: "Người già tóc dài chống gậy (匕)" }
    ],
    visualDistractors: ["考", "者", "孝", "差"],
    homophones: ["老", "劳", "牢", "涝", "姥"],
    example: {
      hanzi: "那家饭馆的菜很好吃，我们老去那儿吃。",
      pinyin: "Nà jiā fànguǎn de cài hěn hǎochī, wǒmen lǎo qù nàr chī.",
      meaning: "Món ăn ở quán đó rất ngon, chúng tôi cứ hay đến đó ăn suốt."
    }
  },
  {
    id: "L08_14",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "几乎",
    pinyin: "jīhū",
    pinyinClean: "jihu",
    hanViet: "cơ hồ",
    wordType: "adv",
    meaning: "hầu như, gần như",
    decomposition: [
      { char: "几", pinyin: "jī", hanViet: "cơ", radical: "几 (Kỷ - cái bàn nhỏ)", mnemonic: "Cái bàn nhỏ chỉ cách một chút" },
      { char: "乎", pinyin: "hū", hanViet: "hồ", radical: "丿 (Phiệt)", mnemonic: "Trợ từ biểu thị xấp xỉ" }
    ],
    visualDistractors: ["几个", "在乎", "手", "平"],
    homophones: ["几乎", "疾呼", "似乎", "记户", "机乎"],
    example: {
      hanzi: "他每天都运动，几乎没生过病。",
      pinyin: "Tā měitiān dōu yùndòng, jīhū méi shēngguò bìng.",
      meaning: "Anh ấy ngày nào cũng vận động, hầu như chưa từng bị ốm."
    }
  },
  {
    id: "L08_15",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "变化",
    pinyin: "biànhuà",
    pinyinClean: "bianhua",
    hanViet: "biến hóa",
    wordType: "v/n",
    meaning: "thay đổi, sự biến đổi",
    decomposition: [
      { char: "变", pinyin: "biàn", hanViet: "biến", radical: "又 (Hựu - bàn tay)", mnemonic: "Bàn tay (又) phía dưới xoay chuyển tình thế" },
      { char: "化", pinyin: "huà", hanViet: "hóa", radical: "亻 (Nhân đứng)", mnemonic: "Người đứng (亻) biến đổi tư thế(匕)" }
    ],
    visualDistractors: ["文化", "恋爱", "变成", "北"],
    homophones: ["变化", "便话", "边画", "编话", "辩话"],
    example: {
      hanzi: "十年没见，这个城市的变化真大。",
      pinyin: "Shí nián méi jiàn, zhège chéngshì de biànhuà zhēn dà.",
      meaning: "Mười năm không gặp, sự thay đổi của thành phố này thật lớn."
    }
  },
  {
    id: "L08_16",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "健康",
    pinyin: "jiànkāng",
    pinyinClean: "jiankang",
    hanViet: "kiện khang",
    wordType: "adj/n",
    meaning: "khỏe mạnh, sức khỏe",
    decomposition: [
      { char: "健", pinyin: "jiàn", hanViet: "kiện", radical: "亻 (Nhân đứng)", mnemonic: "Con người (亻) được xây dựng (建) cơ thể cường tráng" },
      { char: "康", pinyin: "kāng", hanViet: "khang", radical: "广 (Nghiễm - mái nhà)", mnemonic: "Dưới mái nhà (广) nắm giữ (隶) sự bình an khỏe mạnh" }
    ],
    visualDistractors: ["建筑", "安静", "康复", "关键"],
    homophones: ["健康", "建康", "见康", "剑康", "渐康"],
    example: {
      hanzi: "身体是革命的本钱，健康最重要。",
      pinyin: "Shēntǐ shì gémìng de běnqián, jiànkāng zuì zhòngyào.",
      meaning: "Cơ thể là vốn quý nhất, sức khỏe là quan trọng nhất."
    }
  },
  {
    id: "L08_17",
    lesson: 8,
    lessonTitle: "你去哪儿我就去哪儿",
    hanzi: "重要",
    pinyin: "zhòngyào",
    pinyinClean: "zhongyao",
    hanViet: "trọng yếu",
    wordType: "adj",
    meaning: "quan trọng",
    decomposition: [
      { char: "重", pinyin: "zhòng", hanViet: "trọng", radical: "里 (Lý)", mnemonic: "Ngàn (千) dặm (里) đường xa mang sức nặng quan trọng" },
      { char: "要", pinyin: "yào", hanViet: "yếu", radical: "西 (Tây)", mnemonic: "Người phụ nữ (女) chống nạnh đòi điều thiết yếu" }
    ],
    visualDistractors: ["主要", "需要", "重新", "懂事"],
    homophones: ["重要", "中药", "重药", "种药", "中要"],
    example: {
      hanzi: "我今天有一个非常重要的会议。",
      pinyin: "Wǒ jīntiān yǒu yí gè fēicháng zhòngyào de huìyì.",
      meaning: "Hôm nay tôi có một cuộc họp vô cùng quan trọng."
    }
  },

  // ==================== BÀI 9: 她的汉语说得跟中国人一样好 ====================
  {
    id: "L09_01",
    lesson: 9,
    lessonTitle: "她的汉语说得跟中国人一样好",
    hanzi: "中文",
    pinyin: "Zhōngwén",
    pinyinClean: "zhongwen",
    hanViet: "Trung văn",
    wordType: "n",
    meaning: "tiếng Trung, văn tự Trung Quốc",
    decomposition: [
      { char: "中", pinyin: "zhōng", hanViet: "trung", radical: "丨 (Cổn)", mnemonic: "Nét sổ xuyên chính giữa hình vuông" },
      { char: "文", pinyin: "wén", hanViet: "văn", radical: "文 (Văn - văn chương)", mnemonic: "Các nét giao nhau tạo thành chữ viết văn chương" }
    ],
    visualDistractors: ["中国", "文化", "中间", "英文"],
    homophones: ["中文", "忠文", "重文", "钟文", "终文"],
    example: {
      hanzi: "她的中文说得跟中国人一样好。",
      pinyin: "Tā de Zhōngwén shuō de gēn Zhōngguórén yíyàng hǎo.",
      meaning: "Tiếng Trung của cô ấy nói tốt giống hệt người Trung Quốc."
    }
  },
  {
    id: "L09_02",
    lesson: 9,
    lessonTitle: "她的汉语说得跟中国人一样好",
    hanzi: "班",
    pinyin: "bān",
    pinyinClean: "ban",
    hanViet: "ban",
    wordType: "n",
    meaning: "lớp học; ca làm việc",
    decomposition: [
      { char: "班", pinyin: "bān", hanViet: "ban", radical: "王 (Ngọc)", mnemonic: "Dùng dao phân chia hai viên ngọc (王) cho các thành viên trong lớp" }
    ],
    visualDistractors: ["搬", "般", "斑", "玩"],
    homophones: ["班", "搬", "般", "颁", "斑"],
    example: {
      hanzi: "我们班一共有二十个留学生。",
      pinyin: "Wǒmen bān yígòng yǒu èrshí gè liúxuéshēng.",
      meaning: "Lớp chúng tôi tổng cộng có 20 lưu học sinh."
    }
  },
  {
    id: "L09_03",
    lesson: 9,
    lessonTitle: "她的汉语说得跟中国人一样好",
    hanzi: "一样",
    pinyin: "yíyàng",
    pinyinClean: "yiyang",
    hanViet: "nhất dạng",
    wordType: "adj",
    meaning: "giống nhau, như nhau",
    decomposition: [
      { char: "一", pinyin: "yī", hanViet: "nhất", radical: "一 (Nhất)", mnemonic: "Cùng một" },
      { char: "样", pinyin: "yàng", hanViet: "dạng", radical: "木 (Mộc - cây)", mnemonic: "Cây gỗ (木) và con dê (羊) làm khuôn mẫu hình dạng" }
    ],
    visualDistractors: ["一直", "一定", "这样", "怎么样"],
    homophones: ["一样", "一阳", "异样", "颐养", "一洋"],
    example: {
      hanzi: "这两件衬衫的颜色和大小都一样。",
      pinyin: "Zhè liǎng jiàn chènshān de yánsè hé dàxiǎo dōu yíyàng.",
      meaning: "Màu sắc và kích cỡ của hai chiếc áo sơ mi này đều giống nhau."
    }
  },
  {
    id: "L09_04",
    lesson: 9,
    lessonTitle: "她的汉语说得跟中国人一样好",
    hanzi: "最后",
    pinyin: "zuìhòu",
    pinyinClean: "zuihou",
    hanViet: "tối hậu",
    wordType: "n",
    meaning: "cuối cùng, sau cùng",
    decomposition: [
      { char: "最", pinyin: "zuì", hanViet: "tối", radical: "日 (Nhật)", mnemonic: "Bậc nhất" },
      { char: "后", pinyin: "hòu", hanViet: "hậu", radical: "口 (Khẩu)", mnemonic: "Phía sau, sau cùng" }
    ],
    visualDistractors: ["最近", "最好", "以后", "后面"],
    homophones: ["最后", "醉后", "罪后", "最厚", "嘴后"],
    example: {
      hanzi: "这是今天的最后一个问题。",
      pinyin: "Zhè shì jīntiān de zuìhòu yí gè wèntí.",
      meaning: "Đây là câu hỏi cuối cùng của ngày hôm nay."
    }
  },
  {
    id: "L09_05",
    lesson: 9,
    lessonTitle: "她的汉语说得跟中国人一样好",
    hanzi: "放心",
    pinyin: "fàngxīn",
    pinyinClean: "fangxin",
    hanViet: "phóng tâm",
    wordType: "v",
    meaning: "yên tâm, an tâm",
    decomposition: [
      { char: "放", pinyin: "fàng", hanViet: "phóng", radical: "攵 (Phộc)", mnemonic: "Đặt xuống, buông lỏng" },
      { char: "心", pinyin: "xīn", hanViet: "tâm", radical: "心 (Tâm - tim)", mnemonic: "Đặt trái tim xuống không còn lo âu" }
    ],
    visualDistractors: ["小心", "关心", "担心", "开心"],
    homophones: ["放心", "芳心", "方心", "房心", "防心"],
    example: {
      hanzi: "请您放心，我一定会把这件事做好。",
      pinyin: "Qǐng nín fàngxīn, wǒ yídìng huì bǎ zhè jiàn shì zuòhǎo.",
      meaning: "Xin ngài cứ yên tâm, tôi nhất định sẽ làm tốt việc này."
    }
  },
  {
    id: "L09_06",
    lesson: 9,
    lessonTitle: "她的汉语说得跟中国人一样好",
    hanzi: "一定",
    pinyin: "yídìng",
    pinyinClean: "yiding",
    hanViet: "nhất định",
    wordType: "adv/adj",
    meaning: "nhất định, chắc chắn",
    decomposition: [
      { char: "一", pinyin: "yī", hanViet: "nhất", radical: "一 (Nhất)", mnemonic: "Một lòng" },
      { char: "定", pinyin: "dìng", hanViet: "định", radical: "宀 (Miên - mái nhà)", mnemonic: "Dưới mái nhà (宀) bước chân dừng lại (正) cố định" }
    ],
    visualDistractors: ["一直", "一样", "决定", "走开"],
    homophones: ["一定", "一锭", "已定", "议定", "移定"],
    example: {
      hanzi: "明天下午的会议你一定要参加。",
      pinyin: "Míngtiān xiàwǔ de huìyì nǐ yídìng yào cānjiā.",
      meaning: "Cuộc họp chiều mai bạn nhất định phải tham gia."
    }
  },
  {
    id: "L09_07",
    lesson: 9,
    lessonTitle: "她的汉语说得跟中国人一样好",
    hanzi: "担心",
    pinyin: "dānxīn",
    pinyinClean: "danxin",
    hanViet: "đam tâm",
    wordType: "v",
    meaning: "lo lắng",
    decomposition: [
      { char: "担", pinyin: "dān", hanViet: "đam", radical: "扌 (Tài gảy - tay)", mnemonic: "Dùng tay (扌) gánh vác từ lúc bình minh (旦)" },
      { char: "心", pinyin: "xīn", hanViet: "tâm", radical: "心 (Tâm - tim)", mnemonic: "Gánh nặng đè lên trái tim gây lo lắng" }
    ],
    visualDistractors: ["放心", "小心", "关心", "但是"],
    homophones: ["担心", "丹心", "单心", "淡心", "胆心"],
    example: {
      hanzi: "这么晚了还没回家，妈妈很担心你。",
      pinyin: "Zhème wǎn le hái méi huíjiā, māma hěn dānxīn nǐ.",
      meaning: "Muộn thế này rồi mà vẫn chưa về nhà, mẹ rất lo lắng cho bạn."
    }
  },
  {
    id: "L09_08",
    lesson: 9,
    lessonTitle: "她的汉语说得跟中国人一样好",
    hanzi: "比较",
    pinyin: "bǐjiào",
    pinyinClean: "bijiao",
    hanViet: "tỷ giảo",
    wordType: "adv/v",
    meaning: "khá, tương đối; so sánh",
    decomposition: [
      { char: "比", pinyin: "bǐ", hanViet: "tỷ", radical: "比 (Tỷ)", mnemonic: "Đặt cạnh nhau để so" },
      { char: "较", pinyin: "jiào", hanViet: "giảo", radical: "车 (Xa - xe)", mnemonic: "Hai cỗ xe (车) giao (交) đấu để đọ sức" }
    ],
    visualDistractors: ["比赛", "学校", "郊区", "比如"],
    homophones: ["比较", "计较", "必交", "比教", "笔校"],
    example: {
      hanzi: "这个问题比较容易，大家都听懂了。",
      pinyin: "Zhège wèntí bǐjiào róngyì, dàjiā dōu tīngdǒng le.",
      meaning: "Câu hỏi này tương đối dễ, mọi người đều nghe hiểu cả rồi."
    }
  },
  {
    id: "L09_09",
    lesson: 9,
    lessonTitle: "她的汉语说得跟中国人一样好",
    hanzi: "了解",
    pinyin: "liǎojiě",
    pinyinClean: "liaojie",
    hanViet: "liễu giải",
    wordType: "v",
    meaning: "hiểu rõ, tìm hiểu",
    decomposition: [
      { char: "了", pinyin: "liǎo", hanViet: "liễu", radical: "亅 (Quyết)", mnemonic: "Xong xuôi, tỏ tường" },
      { char: "解", pinyin: "jiě", hanViet: "giải", radical: "角 (Giác - sừng)", mnemonic: "Dùng dao (刀) tách sừng (角) trâu (牛) để phân giải tường tận" }
    ],
    visualDistractors: ["解决", "理解", "姐姐", "为了"],
    homophones: ["了解", "了结", "谅解", "料姐", "聊解"],
    example: {
      hanzi: "我对他的情况不太了解。",
      pinyin: "Wǒ duì tā de qíngkuàng bú tài liǎojiě.",
      meaning: "Tôi không hiểu rõ lắm về tình hình của anh ấy."
    }
  },
  {
    id: "L09_10",
    lesson: 9,
    lessonTitle: "她的汉语说得跟中国人一样好",
    hanzi: "先",
    pinyin: "xiān",
    pinyinClean: "xian",
    hanViet: "tiên",
    wordType: "adv",
    meaning: "trước, trước tiên",
    decomposition: [
      { char: "先", pinyin: "xiān", hanViet: "tiên", radical: "儿 (Nhi - đôi chân)", mnemonic: "Đôi chân (儿) bước lên phía trên đất (土) đi trước" }
    ],
    visualDistractors: ["洗", "选", "先生", "元"],
    homophones: ["先", "鲜", "仙", "掀", "纤"],
    example: {
      hanzi: "你先走吧，我还有点儿事要办。",
      pinyin: "Nǐ xiān zǒu ba, wǒ hái yǒudiǎnr shì yào bàn.",
      meaning: "Bạn cứ đi trước đi, tôi vẫn còn chút việc phải giải quyết."
    }
  },
  {
    id: "L09_11",
    lesson: 9,
    lessonTitle: "她的汉语说得跟中国人一样好",
    hanzi: "中间",
    pinyin: "zhōngjiān",
    pinyinClean: "zhongjian",
    hanViet: "trung gian",
    wordType: "n",
    meaning: "ở giữa, trung gian",
    decomposition: [
      { char: "中", pinyin: "zhōng", hanViet: "trung", radical: "丨 (Cổn)", mnemonic: "Chính giữa" },
      { char: "间", pinyin: "jiān", hanViet: "gian", radical: "门 (Môn - cửa)", mnemonic: "Khoảng không ở giữa cánh cửa (门)" }
    ],
    visualDistractors: ["中文", "时间", "房间", "洗手间"],
    homophones: ["中间", "中坚", "忠谏", "终间", "钟间"],
    example: {
      hanzi: "照片里站在中间的那个人是我哥哥。",
      pinyin: "Zhàopiàn lǐ zhàn zài zhōngjiān de nàge rén shì wǒ gēge.",
      meaning: "Người đứng ở giữa trong bức ảnh là anh trai tôi."
    }
  },
  {
    id: "L09_12",
    lesson: 9,
    lessonTitle: "她的汉语说得跟中国人一样好",
    hanzi: "参加",
    pinyin: "cānjiā",
    pinyinClean: "canjia",
    hanViet: "tham gia",
    wordType: "v",
    meaning: "tham gia, tham dự",
    decomposition: [
      { char: "参", pinyin: "cān", hanViet: "tham", radical: "厶 (Khư)", mnemonic: "Cùng góp mặt vào hàng ngũ (彡)" },
      { char: "加", pinyin: "jiā", hanViet: "gia", radical: "力 (Lực - sức)", mnemonic: "Góp thêm sức lực (力) và lời nói (口)" }
    ],
    visualDistractors: ["参观", "加班", "加油", "咖啡"],
    homophones: ["参加", "掺加", "餐家", "残家", "参家"],
    example: {
      hanzi: "今年有很多人参加汉语水平考试。",
      pinyin: "Jīnnián yǒu hěn duō rén cānjiā Hànyǔ Shuǐpíng Kǎoshì.",
      meaning: "Năm nay có rất nhiều người tham gia kỳ thi năng lực Hán ngữ (HSK)."
    }
  },
  {
    id: "L09_13",
    lesson: 9,
    lessonTitle: "她的汉语说得跟中国人一样好",
    hanzi: "影响",
    pinyin: "yǐngxiǎng",
    pinyinClean: "yingxiang",
    hanViet: "ảnh hưởng",
    wordType: "v/n",
    meaning: "ảnh hưởng, tác động",
    decomposition: [
      { char: "影", pinyin: "yǐng", hanViet: "ảnh", radical: "彡 (Sam - bóng/nét)", mnemonic: "Ánh nắng kinh đô (景) tạo ra cái bóng (彡)" },
      { char: "响", pinyin: "xiǎng", hanViet: "hưởng", radical: "口 (Khẩu - miệng)", mnemonic: "Âm thanh từ miệng (口) vang vọng khắp quê hương (向)" }
    ],
    visualDistractors: ["电影", "音响", "方向", "风景"],
    homophones: ["影响", "音响", "映像", "迎向", "赢响"],
    example: {
      hanzi: "请小声一点儿，别影响别人休息。",
      pinyin: "Qǐng xiǎoshēng yìdiǎnr, bié yǐngxiǎng biérén xiūxi.",
      meaning: "Xin nói nhỏ một chút, đừng làm ảnh hưởng người khác nghỉ ngơi."
    }
  },

  // ==================== BÀI 10: 数学比历史难多了 ====================
  {
    id: "L10_01",
    lesson: 10,
    lessonTitle: "数学比历史难多了",
    hanzi: "个子",
    pinyin: "gèzi",
    pinyinClean: "gezi",
    hanViet: "cá tử",
    wordType: "n",
    meaning: "vóc dáng, chiều cao",
    decomposition: [
      { char: "个", pinyin: "gè", hanViet: "cá", radical: "人 (Nhân)", mnemonic: "Dáng người đứng thẳng" },
      { char: "子", pinyin: "zi", hanViet: "tử", radical: "子 (Tử)", mnemonic: "Hậu tố danh từ" }
    ],
    visualDistractors: ["儿子", "桌子", "椅子", "房子"],
    homophones: ["个子", "鸽子", "格子", "各自", "歌子"],
    example: {
      hanzi: "弟弟今年十二岁，个子比我高了。",
      pinyin: "Dìdi jīnnián shí'èr suì, gèzi bǐ wǒ gāo le.",
      meaning: "Em trai năm nay 12 tuổi, vóc người đã cao hơn tôi rồi."
    }
  },
  {
    id: "L10_02",
    lesson: 10,
    lessonTitle: "数学比历史难多了",
    hanzi: "矮",
    pinyin: "ǎi",
    pinyinClean: "ai",
    hanViet: "nụy",
    wordType: "adj",
    meaning: "thấp, lùn",
    decomposition: [
      { char: "矮", pinyin: "ǎi", hanViet: "nụy", radical: "矢 (Thỉ - mũi tên)", mnemonic: "Thấp ngắn như mũi tên (矢) và người phụ nữ khom lưng (委)" }
    ],
    visualDistractors: ["短", "知", "楼", "高"],
    homophones: ["矮", "爱", "挨", "唉", "癌"],
    example: {
      hanzi: "哥哥高，弟弟比哥哥矮一点儿。",
      pinyin: "Gēge gāo, dìdi bǐ gēge ǎi yìdiǎnr.",
      meaning: "Anh trai cao, em trai thấp hơn anh trai một chút."
    }
  },
  {
    id: "L10_03",
    lesson: 10,
    lessonTitle: "数学比历史难多了",
    hanzi: "历史",
    pinyin: "lìshǐ",
    pinyinClean: "lishi",
    hanViet: "lịch sử",
    wordType: "n",
    meaning: "lịch sử, môn Lịch sử",
    decomposition: [
      { char: "历", pinyin: "lì", hanViet: "lịch", radical: "厂 (Hán - sườn núi)", mnemonic: "Trải qua năm tháng với bao sức lực (力) dưới mái đá (厂)" },
      { char: "史", pinyin: "shǐ", hanViet: "sử", radical: "口 (Khẩu)", mnemonic: "Tay cầm bút ghi chép sự thật trung thực ở giữa (中)" }
    ],
    visualDistractors: ["日历", "厉害", "使用", "经历"],
    homophones: ["历史", "力士", "历时", "立誓", "利市"],
    example: {
      hanzi: "我觉得数学比历史难多了。",
      pinyin: "Wǒ juéde shùxué bǐ lìshǐ nán duō le.",
      meaning: "Tôi cảm thấy môn Toán khó hơn môn Lịch sử nhiều."
    }
  },
  {
    id: "L10_04",
    lesson: 10,
    lessonTitle: "数学比历史难多了",
    hanzi: "体育",
    pinyin: "tǐyù",
    pinyinClean: "tiyu",
    hanViet: "thể dục",
    wordType: "n",
    meaning: "thể dục, thể thao",
    decomposition: [
      { char: "体", pinyin: "tǐ", hanViet: "thể", radical: "亻 (Nhân đứng)", mnemonic: "Cơ thể con người (亻) là gốc rễ (本)" },
      { char: "育", pinyin: "yù", hanViet: "dục", radical: "月 (Nhục - thịt)", mnemonic: "Nuôi dưỡng cơ thể (月) lớn lên khỏe mạnh" }
    ],
    visualDistractors: ["身体", "休息", "教育", "本子"],
    homophones: ["体育", "体语", "替育", "提育", "题域"],
    example: {
      hanzi: "我们每个星期有两节体育课。",
      pinyin: "Wǒmen měi gè xīngqī yǒu liǎng jié tǐyù kè.",
      meaning: "Mỗi tuần chúng tôi có hai tiết thể dục."
    }
  },
  {
    id: "L10_05",
    lesson: 10,
    lessonTitle: "数学比历史难多了",
    hanzi: "数学",
    pinyin: "shùxué",
    pinyinClean: "shuxue",
    hanViet: "số học",
    wordType: "n",
    meaning: "toán học, môn Toán",
    decomposition: [
      { char: "数", pinyin: "shù", hanViet: "số", radical: "攵 (Phộc)", mnemonic: "Đếm từng hạt gạo (米) để tính toán con số" },
      { char: "学", pinyin: "xué", hanViet: "học", radical: "子 (Tử - đứa trẻ)", mnemonic: "Đứa trẻ (子) dưới mái trường học tập" }
    ],
    visualDistractors: ["楼房", "留学", "大学", "字词"],
    homophones: ["数学", "树学", "书学", "术学", "输血"],
    example: {
      hanzi: "他的数学成绩一直是班里最好的。",
      pinyin: "Tā de shùxué chéngjì yìzhí shì bān lǐ zuì hǎo de.",
      meaning: "Thành tích môn Toán của cậu ấy luôn là tốt nhất trong lớp."
    }
  },
  {
    id: "L10_06",
    lesson: 10,
    lessonTitle: "数学比历史难多了",
    hanzi: "方便",
    pinyin: "fāngbiàn",
    pinyinClean: "fangbian",
    hanViet: "phương tiện",
    wordType: "adj",
    meaning: "thuận tiện, tiện lợi",
    decomposition: [
      { char: "方", pinyin: "fāng", hanViet: "phương", radical: "方 (Phương)", mnemonic: "Phương hướng, cách thức" },
      { char: "便", pinyin: "biàn", hanViet: "tiện", radical: "亻 (Nhân đứng)", mnemonic: "Người (亻) thay đổi (更) cho thuận tiện hơn" }
    ],
    visualDistractors: ["地方", "便宜", "随便", "更加"],
    homophones: ["方便", "方遍", "防变", "放便", "房便"],
    example: {
      hanzi: "我家离地铁站很近，坐地铁特别方便。",
      pinyin: "Wǒ jiā lí dìtiězhàn hěn jìn, zuò dìtiě tèbié fāngbiàn.",
      meaning: "Nhà tôi cách ga tàu điện ngầm rất gần, đi tàu điện ngầm đặc biệt tiện lợi."
    }
  },
  {
    id: "L10_07",
    lesson: 10,
    lessonTitle: "数学比历史难多了",
    hanzi: "自行车",
    pinyin: "zìxíngchē",
    pinyinClean: "zixingche",
    hanViet: "tự hành xa",
    wordType: "n",
    meaning: "xe đạp",
    decomposition: [
      { char: "自", pinyin: "zì", hanViet: "tự", radical: "自 (Tự - bản thân)", mnemonic: "Tự mình" },
      { char: "行", pinyin: "xíng", hanViet: "hành", radical: "行 (Hành - đi)", mnemonic: "Di chuyển" },
      { char: "车", pinyin: "chē", hanViet: "xa", radical: "车 (Xa - xe)", mnemonic: "Chiếc xe tự đạp bằng sức mình" }
    ],
    visualDistractors: ["出租车", "公共汽车", "自己", "火车"],
    homophones: ["自行车", "自型车", "字行车", "紫行车", "资行车"],
    example: {
      hanzi: "我每天骑自行车去学校上课。",
      pinyin: "Wǒ měitiān qí zìxíngchē qù xuéxiào shàngkè.",
      meaning: "Tôi đạp xe đạp đến trường đi học mỗi ngày."
    }
  },
  {
    id: "L10_08",
    lesson: 10,
    lessonTitle: "数学比历史难多了",
    hanzi: "骑",
    pinyin: "qí",
    pinyinClean: "qi",
    hanViet: "kỵ",
    wordType: "v",
    meaning: "cưỡi (ngựa), đi/đạp (xe đạp, xe máy)",
    decomposition: [
      { char: "骑", pinyin: "qí", hanViet: "kỵ", radical: "马 (Mã - con ngựa)", mnemonic: "Người đứng dạng chân (奇) cưỡi trên lưng ngựa (马)" }
    ],
    visualDistractors: ["奇怪", "椅子", "寄信", "马车"],
    homophones: ["骑", "奇", "齐", "旗", "棋"],
    example: {
      hanzi: "骑自行车既能锻炼身体，又不会堵车。",
      pinyin: "Qí zìxíngchē jì néng duànliàn shēntǐ, yòu bú huì dǔchē.",
      meaning: "Đi xe đạp vừa có thể rèn luyện sức khỏe, lại không bị tắc đường."
    }
  },
  {
    id: "L10_09",
    lesson: 10,
    lessonTitle: "数学比历史难多了",
    hanzi: "旧",
    pinyin: "jiù",
    pinyinClean: "jiu",
    hanViet: "cựu",
    wordType: "adj",
    meaning: "cũ (đồ vật)",
    decomposition: [
      { char: "旧", pinyin: "jiù", hanViet: "cựu", radical: "日 (Nhật - mặt trời)", mnemonic: "Một (丨) ngày (日) đã trôi qua trở thành quá khứ cũ kỹ" }
    ],
    visualDistractors: ["日", "旦", "白", "归"],
    homophones: ["旧", "就", "久", "九", "救"],
    example: {
      hanzi: "这辆自行车太旧了，我想换一辆新的。",
      pinyin: "Zhè liàng zìxíngchē tài jiù le, wǒ xiǎng huàn yí liàng xīn de.",
      meaning: "Chiếc xe đạp này cũ quá rồi, tôi muốn đổi một chiếc mới."
    }
  },
  {
    id: "L10_10",
    lesson: 10,
    lessonTitle: "数学比历史难多了",
    hanzi: "换",
    pinyin: "huàn",
    pinyinClean: "huan",
    hanViet: "hoán",
    wordType: "v",
    meaning: "đổi, thay đổi",
    decomposition: [
      { char: "换", pinyin: "huàn", hanViet: "hoán", radical: "扌 (Tài gảy - tay)", mnemonic: "Dùng tay (扌) trao đổi qua lại (奂)" }
    ],
    visualDistractors: ["找", "拉", "接", "搬"],
    homophones: ["换", "还", "环", "欢", "患"],
    example: {
      hanzi: "我想去银行换一点儿人民币。",
      pinyin: "Wǒ xiǎng qù yínháng huàn yìdiǎnr Rénmínbì.",
      meaning: "Tôi muốn đến ngân hàng đổi một ít Nhân dân tệ."
    }
  },
  {
    id: "L10_11",
    lesson: 10,
    lessonTitle: "数学比历史难多了",
    hanzi: "地方",
    pinyin: "dìfang",
    pinyinClean: "difang",
    hanViet: "địa phương",
    wordType: "n",
    meaning: "nơi, chỗ, địa phương",
    decomposition: [
      { char: "地", pinyin: "dì", hanViet: "địa", radical: "土 (Thổ - đất)", mnemonic: "Mặt đất" },
      { char: "方", pinyin: "fāng", hanViet: "phương", radical: "方 (Phương)", mnemonic: "Vùng, miền, phương hướng" }
    ],
    visualDistractors: ["地图", "方便", "北方", "南方"],
    homophones: ["地方", "堤防", "敌方", "地房", "第方"],
    example: {
      hanzi: "这个地方的风景真漂亮。",
      pinyin: "Zhège dìfang de fēngjǐng zhēn piàoliang.",
      meaning: "Phong cảnh ở nơi này thật đẹp."
    }
  },
  {
    id: "L10_12",
    lesson: 10,
    lessonTitle: "数学比历史难多了",
    hanzi: "中介",
    pinyin: "zhōngjiè",
    pinyinClean: "zhongjie",
    hanViet: "trung giới",
    wordType: "n",
    meaning: "môi giới",
    decomposition: [
      { char: "中", pinyin: "zhōng", hanViet: "trung", radical: "丨 (Cổn)", mnemonic: "Đứng ở giữa" },
      { char: "介", pinyin: "jiè", hanViet: "giới", radical: "人 (Nhân)", mnemonic: "Người (人) đứng làm cầu nối giới thiệu hai bên" }
    ],
    visualDistractors: ["介绍", "中间", "中文", "世界"],
    homophones: ["中介", "终结", "中界", "忠介", "重介"],
    example: {
      hanzi: "通过房屋中介，我很快就租到了房子。",
      pinyin: "Tōngguò fángwū zhōngjiè, wǒ hěn kuài jiù zūdàole fángzi.",
      meaning: "Thông qua môi giới nhà đất, tôi rất nhanh đã thuê được nhà."
    }
  },
  {
    id: "L10_13",
    lesson: 10,
    lessonTitle: "数学比历史难多了",
    hanzi: "主要",
    pinyin: "zhǔyào",
    pinyinClean: "zhuyao",
    hanViet: "chủ yếu",
    wordType: "adj",
    meaning: "chủ yếu, chính",
    decomposition: [
      { char: "主", pinyin: "zhǔ", hanViet: "chủ", radical: "丶 (Chủ)", mnemonic: "Ngọn bấc đèn (丶) tỏa sáng trên giá đèn (王) là chính yếu" },
      { char: "要", pinyin: "yào", hanViet: "yếu", radical: "西 (Tây)", mnemonic: "Trọng điểm cần thiết" }
    ],
    visualDistractors: ["重要", "注意", "需要", "住处"],
    homophones: ["主要", "住要", "助药", "煮药", "主药"],
    example: {
      hanzi: "这次会议主要讨论下个月的工作计划。",
      pinyin: "Zhè cì huìyì zhǔyào tǎolùn xià gè yuè de gōngzuò jìhuà.",
      meaning: "Cuộc họp lần này chủ yếu thảo luận kế hoạch công việc tháng sau."
    }
  },
  {
    id: "L10_14",
    lesson: 10,
    lessonTitle: "数学比历史难多了",
    hanzi: "环境",
    pinyin: "huánjìng",
    pinyinClean: "huanjing",
    hanViet: "hoàn cảnh",
    wordType: "n",
    meaning: "môi trường, hoàn cảnh",
    decomposition: [
      { char: "环", pinyin: "huán", hanViet: "hoàn", radical: "王 (Ngọc)", mnemonic: "Vòng ngọc (王) bao quanh" },
      { char: "境", pinyin: "jìng", hanViet: "cảnh", radical: "土 (Thổ - đất)", mnemonic: "Vùng đất (土) đến tận biên giới (竟)" }
    ],
    visualDistractors: ["眼镜", "坏人", "杯子", "安静"],
    homophones: ["环境", "幻境", "换境", "缓进", "环镜"],
    example: {
      hanzi: "这个小区的环境又安静又干净。",
      pinyin: "Zhège xiǎoqū de huánjìng yòu ānjìng yòu gānjìng.",
      meaning: "Môi trường của khu dân cư này vừa yên tĩnh vừa sạch sẽ."
    }
  },
  {
    id: "L10_15",
    lesson: 10,
    lessonTitle: "数学比历史难多了",
    hanzi: "附近",
    pinyin: "fùjìn",
    pinyinClean: "fujin",
    hanViet: "phụ cận",
    wordType: "n",
    meaning: "gần đây, lân cận",
    decomposition: [
      { char: "附", pinyin: "fù", hanViet: "phụ", radical: "阝 (Phụ - gò đất)", mnemonic: "Người (亻) đứng sát gò đất (阝) trao từng tấc (寸)" },
      { char: "近", pinyin: "jìn", hanViet: "cận", radical: "辶 (Sước - bước đi)", mnemonic: "Khoảng cách gần" }
    ],
    visualDistractors: ["最近", "远近", "迟到", "刚才"],
    homophones: ["附近", "付金", "复进", "父近", "负进"],
    example: {
      hanzi: "学校附近有一家很大的书店。",
      pinyin: "Xuéxiào fùjìn yǒu yì jiā hěn dà de shūdiàn.",
      meaning: "Gần trường học có một hiệu sách rất lớn."
    }
  },
 
  // ==================== BÀI 11 - 20 ====================
  // ==================== BÀI 11: 别忘了把空调关了 ====================
  {
    id: "L11_01",
    lesson: 11,
    lessonTitle: "别忘了把空调关了",
    hanzi: "图书馆",
    pinyin: "túshūguǎn",
    pinyinClean: "tushuguan",
    hanViet: "đồ thư quán",
    wordType: "n",
    meaning: "thư viện",
    decomposition: [
      { char: "图", pinyin: "tú", hanViet: "đồ", radical: "囗 (Vi)", mnemonic: "Bản đồ, tranh vẽ" },
      { char: "书", pinyin: "shū", hanViet: "thư", radical: "乙 (Ất)", mnemonic: "Sách vở" },
      { char: "馆", pinyin: "guǎn", hanViet: "quán", radical: "饣 (Thực)", mnemonic: "Tòa nhà (官) phục vụ công cộng" }
    ],
    visualDistractors: ["饭馆", "地图", "宾馆", "体育馆"],
    homophones: ["图书馆", "涂书馆", "徒书馆", "图树馆", "途书馆"],
    example: {
      hanzi: "我今天下午去图书馆借了两本书。",
      pinyin: "Wǒ jīntiān xiàwǔ qù túshūguǎn jièle liǎng běn shū.",
      meaning: "Chiều nay tôi đến thư viện mượn hai cuốn sách."
    }
  },
  {
    id: "L11_02",
    lesson: 11,
    lessonTitle: "别忘了把空调关了",
    hanzi: "借",
    pinyin: "jiè",
    pinyinClean: "jie",
    hanViet: "tá",
    wordType: "v",
    meaning: "mượn, cho mượn",
    decomposition: [
      { char: "借", pinyin: "jiè", hanViet: "tá", radical: "亻 (Nhân đứng)", mnemonic: "Người (亻) ngày xưa (昔) giúp nhau mượn đồ" }
    ],
    visualDistractors: ["错", "惜", "接", "信"],
    homophones: ["借", "姐", "节", "界", "介"],
    example: {
      hanzi: "我从图书馆借的书今天要还了。",
      pinyin: "Wǒ cóng túshūguǎn jiè de shū jīntiān yào huán le.",
      meaning: "Cuốn sách tôi mượn từ thư viện hôm nay phải trả rồi."
    }
  },
  {
    id: "L11_03",
    lesson: 11,
    lessonTitle: "别忘了把空调关了",
    hanzi: "词典",
    pinyin: "cídiǎn",
    pinyinClean: "cidian",
    hanViet: "từ điển",
    wordType: "n",
    meaning: "từ điển",
    decomposition: [
      { char: "词", pinyin: "cí", hanViet: "từ", radical: "讠 (Ngôn - lời nói)", mnemonic: "Ngôn từ (讠) do cơ quan ngôn ngữ (司) phát ra" },
      { char: "典", pinyin: "diǎn", hanViet: "điển", radical: "八 (Bát)", mnemonic: "Sách quý (册) đặt trang trọng trên bàn (八)" }
    ],
    visualDistractors: ["词语", "字典", "经典", "公司"],
    homophones: ["词典", "辞典", "磁点", "次点", "瓷典"],
    example: {
      hanzi: "遇到不认识的汉字，你可以查词典。",
      pinyin: "Yùdào bú rènshi de Hànzì, nǐ kěyǐ chá cídiǎn.",
      meaning: "Gặp chữ Hán không biết, bạn có thể tra từ điển."
    }
  },
  {
    id: "L11_04",
    lesson: 11,
    lessonTitle: "别忘了把空调关了",
    hanzi: "还",
    pinyin: "huán",
    pinyinClean: "huan",
    hanViet: "hoàn",
    wordType: "v",
    meaning: "trả lại, hoàn trả",
    decomposition: [
      { char: "还", pinyin: "huán", hanViet: "hoàn", radical: "辶 (Sước - bước đi)", mnemonic: "Bước đi (辶) đem đồ trả về chỗ cũ" }
    ],
    visualDistractors: ["远", "近", "运", "连"],
    homophones: ["还", "环", "换", "欢", "缓"],
    example: {
      hanzi: "看完这本词典以后，别忘了还给我。",
      pinyin: "Kànwán zhè běn cídiǎn yǐhòu, bié wàngle huán gěi wǒ.",
      meaning: "Sau khi xem xong cuốn từ điển này, đừng quên trả lại cho tôi."
    }
  },
  {
    id: "L11_05",
    lesson: 11,
    lessonTitle: "别忘了把空调关了",
    hanzi: "灯",
    pinyin: "dēng",
    pinyinClean: "deng",
    hanViet: "đăng",
    wordType: "n",
    meaning: "cái đèn",
    decomposition: [
      { char: "灯", pinyin: "dēng", hanViet: "đăng", radical: "火 (Hỏa - lửa)", mnemonic: "Ngọn lửa (火) gắn trên giá sắt hình chữ đinh (丁) làm đèn chiếu sáng" }
    ],
    visualDistractors: ["打", "烧", "盯", "烤"],
    homophones: ["灯", "等", "登", "瞪", "凳"],
    example: {
      hanzi: "房间里太暗了，请把灯打开。",
      pinyin: "Fángjiān lǐ tài àn le, qǐng bǎ dēng dǎkāi.",
      meaning: "Trong phòng tối quá, xin hãy bật đèn lên."
    }
  },
  {
    id: "L11_06",
    lesson: 11,
    lessonTitle: "别忘了把空调关了",
    hanzi: "会议",
    pinyin: "huìyì",
    pinyinClean: "huiyi",
    hanViet: "hội nghị",
    wordType: "n",
    meaning: "cuộc họp, hội nghị",
    decomposition: [
      { char: "会", pinyin: "huì", hanViet: "hội", radical: "人 (Nhân)", mnemonic: "Mọi người tụ họp dưới mái nhà" },
      { char: "议", pinyin: "yì", hanViet: "nghị", radical: "讠 (Ngôn - lời nói)", mnemonic: "Dùng lời nói (讠) bàn bạc việc nghĩa (义)" }
    ],
    visualDistractors: ["开会", "建议", "认识", "商量"],
    homophones: ["会议", "回忆", "会意", "汇集", "悔意"],
    example: {
      hanzi: "下午三点的会议改到明天上午了。",
      pinyin: "Xiàwǔ sān diǎn de huìyì gǎidào míngtiān shàngwǔ le.",
      meaning: "Cuộc họp 3 giờ chiều đã đổi sang sáng ngày mai rồi."
    }
  },
  {
    id: "L11_07",
    lesson: 11,
    lessonTitle: "别忘了把空调关了",
    hanzi: "结束",
    pinyin: "jiéshù",
    pinyinClean: "jieshu",
    hanViet: "kết thúc",
    wordType: "v",
    meaning: "kết thúc, chấm dứt",
    decomposition: [
      { char: "结", pinyin: "jié", hanViet: "kết", radical: "纟 (Mịch - tơ)", mnemonic: "Thắt nút sợi tơ (纟) hoàn tất" },
      { char: "束", pinyin: "shù", hanViet: "thúc", radical: "木 (Mộc - cây)", mnemonic: "Bó củi gỗ (木) buộc gọn lại khi xong việc" }
    ],
    visualDistractors: ["结婚", "结果", "树", "来"],
    homophones: ["结束", "借书", "接叔", "解束", "节数"],
    example: {
      hanzi: "会议结束以后，请大家留一下。",
      pinyin: "Huìyì jiéshù yǐhòu, qǐng dàjiā liú yíxià.",
      meaning: "Sau khi cuộc họp kết thúc, xin mọi người nán lại một chút."
    }
  },
  {
    id: "L11_08",
    lesson: 11,
    lessonTitle: "别忘了把空调关了",
    hanzi: "忘记",
    pinyin: "wàngjì",
    pinyinClean: "wangji",
    hanViet: "vọng ký",
    wordType: "v",
    meaning: "quên",
    decomposition: [
      { char: "忘", pinyin: "wàng", hanViet: "vọng", radical: "心 (Tâm - tim)", mnemonic: "Trái tim (心) mất đi (亡) ký ức là quên" },
      { char: "记", pinyin: "jì", hanViet: "ký", radical: "讠 (Ngôn)", mnemonic: "Ghi nhớ" }
    ],
    visualDistractors: ["记得", "帮忙", "日记", "年纪"],
    homophones: ["忘记", "旺季", "网记", "望记", "妄记"],
    example: {
      hanzi: "出门的时候别忘记带钥匙。",
      pinyin: "Chūmén de shíhou bié wàngjì dài yàoshi.",
      meaning: "Lúc ra khỏi nhà đừng quên mang theo chìa khóa."
    }
  },
  {
    id: "L11_09",
    lesson: 11,
    lessonTitle: "别忘了把空调关了",
    hanzi: "空调",
    pinyin: "kōngtiáo",
    pinyinClean: "kongtiao",
    hanViet: "không điều",
    wordType: "n",
    meaning: "máy điều hòa nhiệt độ",
    decomposition: [
      { char: "空", pinyin: "kōng", hanViet: "không", radical: "穴 (Huyệt - khoảng không)", mnemonic: "Không khí trong hang/phòng (穴)" },
      { char: "调", pinyin: "tiáo", hanViet: "điều", radical: "讠 (Ngôn)", mnemonic: "Điều chỉnh chu toàn (周) nhiệt độ" }
    ],
    visualDistractors: ["空气", "有空", "调查", "周末"],
    homophones: ["空调", "空条", "控调", "孔调", "恐调"],
    example: {
      hanzi: "离开房间以前，别忘了把空调关了。",
      pinyin: "Líkāi fángjiān yǐqián, bié wàngle bǎ kōngtiáo guān le.",
      meaning: "Trước khi rời phòng, đừng quên tắt điều hòa nhé."
    }
  },
  {
    id: "L11_10",
    lesson: 11,
    lessonTitle: "别忘了把空调关了",
    hanzi: "关",
    pinyin: "guān",
    pinyinClean: "guan",
    hanViet: "quan",
    wordType: "v",
    meaning: "đóng, tắt, khép",
    decomposition: [
      { char: "关", pinyin: "guān", hanViet: "quan", radical: "八 (Bát)", mnemonic: "Cài then ngang đóng sập cánh cổng lớn (天)" }
    ],
    visualDistractors: ["天", "开", "送", "美"],
    homophones: ["关", "观", "官", "馆", "管"],
    example: {
      hanzi: "外面风很大，请把窗户关上。",
      pinyin: "Wàimiàn fēng hěn dà, qǐng bǎ chuānghu guānshàng.",
      meaning: "Bên ngoài gió rất to, xin hãy đóng cửa sổ lại."
    }
  },
  {
    id: "L11_11",
    lesson: 11,
    lessonTitle: "别忘了把空调关了",
    hanzi: "地铁",
    pinyin: "dìtiě",
    pinyinClean: "ditie",
    hanViet: "địa thiết",
    wordType: "n",
    meaning: "tàu điện ngầm",
    decomposition: [
      { char: "地", pinyin: "dì", hanViet: "địa", radical: "土 (Thổ - đất)", mnemonic: "Dưới lòng đất (土)" },
      { char: "铁", pinyin: "tiě", hanViet: "thiết", radical: "钅 (Kim - kim loại)", mnemonic: "Đường sắt bằng kim loại (钅)" }
    ],
    visualDistractors: ["地图", "地方", "铁路", "银行"],
    homophones: ["地铁", "地贴", "弟铁", "底铁", "帝铁"],
    example: {
      hanzi: "上班时间坐地铁比坐出租车快多了。",
      pinyin: "Shàngbān shíjiān zuò dìtiě bǐ zuò chūzūchē kuài duō le.",
      meaning: "Giờ đi làm đi tàu điện ngầm nhanh hơn đi taxi nhiều."
    }
  },
  {
    id: "L11_12",
    lesson: 11,
    lessonTitle: "别忘了把空调关了",
    hanzi: "筷子",
    pinyin: "kuàizi",
    pinyinClean: "kuaizi",
    hanViet: "khoái tử",
    wordType: "n",
    meaning: "đôi đũa",
    decomposition: [
      { char: "筷", pinyin: "kuài", hanViet: "khoái", radical: "⺮ (Trúc - tre)", mnemonic: "Thanh tre (⺮) gắp thức ăn nhanh nhẹn (快)" },
      { char: "子", pinyin: "zi", hanViet: "tử", radical: "子 (Tử)", mnemonic: "Hậu tố danh từ" }
    ],
    visualDistractors: ["快乐", "裤子", "盘子", "勺子"],
    homophones: ["筷子", "快子", "块子", "会子", "拐子"],
    example: {
      hanzi: "我来中国一个月了，已经会用筷子了。",
      pinyin: "Wǒ lái Zhōngguó yí gè yuè le, yǐjīng huì yòng kuàizi le.",
      meaning: "Tôi đến Trung Quốc được một tháng rồi, đã biết dùng đũa rồi."
    }
  },
  {
    id: "L11_13",
    lesson: 11,
    lessonTitle: "别忘了把空调关了",
    hanzi: "啤酒",
    pinyin: "píjiǔ",
    pinyinClean: "pijiu",
    hanViet: "ti tửu",
    wordType: "n",
    meaning: "bia",
    decomposition: [
      { char: "啤", pinyin: "pí", hanViet: "ti", radical: "口 (Khẩu - miệng)", mnemonic: "Dùng miệng (口) uống cốc bia mát" },
      { char: "酒", pinyin: "jiǔ", hanViet: "tửu", radical: "氵 (Chấm thủy - nước)", mnemonic: "Chất lỏng (氵) ủ trong vò rượu (酉)" }
    ],
    visualDistractors: ["喝酒", "咖啡", "脾气", "洒水"],
    homophones: ["啤酒", "皮酒", "疲久", "脾酒", "匹酒"],
    example: {
      hanzi: "夏天喝一杯冰啤酒觉得特别凉快。",
      pinyin: "Xiàtiān hē yì bēi bīng píjiǔ juéde tèbié liángkuai.",
      meaning: "Mùa hè uống một cốc bia lạnh cảm thấy đặc biệt mát mẻ."
    }
  },
  {
    id: "L11_14",
    lesson: 11,
    lessonTitle: "别忘了把空调关了",
    hanzi: "瓶子",
    pinyin: "píngzi",
    pinyinClean: "pingzi",
    hanViet: "bình tử",
    wordType: "n",
    meaning: "cái chai, cái lọ, cái bình",
    decomposition: [
      { char: "瓶", pinyin: "píng", hanViet: "bình", radical: "瓦 (Ngõa - gốm sứ)", mnemonic: "Đồ gốm thủy tinh (瓦) đặt song song (并) thành hàng chai lọ" },
      { char: "子", pinyin: "zi", hanViet: "tử", radical: "子 (Tử)", mnemonic: "Hậu tố danh từ" }
    ],
    visualDistractors: ["盘子", "杯子", "桌子", "苹果"],
    homophones: ["瓶子", "平子", "评子", "萍子", "屏子"],
    example: {
      hanzi: "请把桌子上的空瓶子拿走。",
      pinyin: "Qǐng bǎ zhuōzi shàng de kōng píngzi názǒu.",
      meaning: "Xin hãy mang những cái chai rỗng trên bàn đi."
    }
  },
  {
    id: "L11_15",
    lesson: 11,
    lessonTitle: "别忘了把空调关了",
    hanzi: "电子邮件",
    pinyin: "diànzǐ yóujiàn",
    pinyinClean: "dianziyoujian",
    hanViet: "điện tử bưu kiện",
    wordType: "n",
    meaning: "thư điện tử (Email)",
    decomposition: [
      { char: "电", pinyin: "diàn", hanViet: "điện", radical: "田 (Điền)", mnemonic: "Điện năng" },
      { char: "子", pinyin: "zǐ", hanViet: "tử", radical: "子 (Tử)", mnemonic: "Hạt điện tử" },
      { char: "邮", pinyin: "yóu", hanViet: "bưu", radical: "阝 (Ấp)", mnemonic: "Trạm bưu chính (由 + 阝)" },
      { char: "件", pinyin: "jiàn", hanViet: "kiện", radical: "亻 (Nhân đứng)", mnemonic: "Người (亻) dắt trâu (牛) gửi từng kiện thư" }
    ],
    visualDistractors: ["电脑", "电梯", "条件", "邮局"],
    homophones: ["电子邮件", "电子有件", "垫子邮件", "点子邮件", "店子邮件"],
    example: {
      hanzi: "我晚上给你发一封电子邮件。",
      pinyin: "Wǒ wǎnshang gěi nǐ fā yì fēng diànzǐ yóujiàn.",
      meaning: "Buổi tối tôi sẽ gửi cho bạn một bức thư điện tử."
    }
  },
  {
    id: "L11_16",
    lesson: 11,
    lessonTitle: "别忘了把空调关了",
    hanzi: "习惯",
    pinyin: "xíguàn",
    pinyinClean: "xiguan",
    hanViet: "tập quán",
    wordType: "v/n",
    meaning: "quen với; thói quen",
    decomposition: [
      { char: "习", pinyin: "xí", hanViet: "tập", radical: "乙 (Ất)", mnemonic: "Lặp đi lặp lại" },
      { char: "惯", pinyin: "guàn", hanViet: "quán", radical: "忄 (Tâm đứng)", mnemonic: "Trái tim (忄) đã xuyên suốt (贯) thành thói quen" }
    ],
    visualDistractors: ["学习", "复习", "练习", "贵重"],
    homophones: ["习惯", "吸管", "西馆", "戏馆", "喜惯"],
    example: {
      hanzi: "我已经习惯了北方的天气。",
      pinyin: "Wǒ yǐjīng xíguànle běifāng de tiānqì.",
      meaning: "Tôi đã quen với thời tiết miền Bắc rồi."
    }
  },

  // ==================== BÀI 12: 把重要的东西放在我这儿吧 ====================
  {
    id: "L12_01",
    lesson: 12,
    lessonTitle: "把重要的东西放在我这儿吧",
    hanzi: "太阳",
    pinyin: "tàiyáng",
    pinyinClean: "taiyang",
    hanViet: "thái dương",
    wordType: "n",
    meaning: "mặt trời",
    decomposition: [
      { char: "太", pinyin: "tài", hanViet: "thái", radical: "大 (Đại)", mnemonic: "Lớn lao bậc nhất" },
      { char: "阳", pinyin: "yáng", hanViet: "dương", radical: "阝 (Phụ - gò đất)", mnemonic: "Ánh mặt trời (日) chiếu rọi bên sườn núi (阝)" }
    ],
    visualDistractors: ["太太", "阴天", "阳台", "月亮"],
    homophones: ["太阳", "太洋", "态阳", "泰阳", "台阳"],
    example: {
      hanzi: "太阳从东边出来，从西边落下。",
      pinyin: "Tàiyáng cóng dōngbian chūlái, cóng xībian luòxià.",
      meaning: "Mặt trời mọc từ hướng Đông, lặn ở hướng Tây."
    }
  },
  {
    id: "L12_02",
    lesson: 12,
    lessonTitle: "把重要的东西放在我这儿吧",
    hanzi: "西",
    pinyin: "xī",
    pinyinClean: "xi",
    hanViet: "tây",
    wordType: "n",
    meaning: "phía Tây, hướng Tây",
    decomposition: [
      { char: "西", pinyin: "xī", hanViet: "tây", radical: "西 (Tây)", mnemonic: "Con chim bay về tổ lúc mặt trời lặn ở hướng Tây" }
    ],
    visualDistractors: ["四", "要", "酒", "晒"],
    homophones: ["西", "息", "希", "惜", "吸"],
    example: {
      hanzi: "银行在超市的西边。",
      pinyin: "Yínháng zài chāoshì de xībian.",
      meaning: "Ngân hàng nằm ở phía Tây của siêu thị."
    }
  },
  {
    id: "L12_03",
    lesson: 12,
    lessonTitle: "把重要的东西放在我这儿吧",
    hanzi: "生气",
    pinyin: "shēngqì",
    pinyinClean: "shengqi",
    hanViet: "sinh khí",
    wordType: "v/adj",
    meaning: "tức giận, giận dữ",
    decomposition: [
      { char: "生", pinyin: "shēng", hanViet: "sinh", radical: "生 (Sinh)", mnemonic: "Nảy sinh, bốc lên" },
      { char: "气", pinyin: "qì", hanViet: "khí", radical: "气 (Khí)", mnemonic: "Luồng hơi nóng giận bốc lên" }
    ],
    visualDistractors: ["天气", "客气", "生病", "生活"],
    homophones: ["生气", "声气", "升起", "盛气", "胜气"],
    example: {
      hanzi: "别生气了，他不是故意的。",
      pinyin: "Bié shēngqì le, tā bú shì gùyì de.",
      meaning: "Đừng giận nữa, anh ấy không phải cố ý đâu."
    }
  },
  {
    id: "L12_04",
    lesson: 12,
    lessonTitle: "把重要的东西放在我这儿吧",
    hanzi: "行李箱",
    pinyin: "xínglixiāng",
    pinyinClean: "xinglixiang",
    hanViet: "hành lý tương",
    wordType: "n",
    meaning: "vali hành lý",
    decomposition: [
      { char: "行", pinyin: "xíng", hanViet: "hành", radical: "行 (Hành)", mnemonic: "Đi xa" },
      { char: "李", pinyin: "li", hanViet: "lý", radical: "木 (Mộc)", mnemonic: "Cây mận (木 + 子), đồ đạc mang theo khi đi đường" },
      { char: "箱", pinyin: "xiāng", hanViet: "tương", radical: "⺮ (Trúc - tre)", mnemonic: "Chiếc rương đan bằng tre (⺮) và gỗ (木) để mắt (目) trông coi" }
    ],
    visualDistractors: ["冰箱", "信箱", "季节", "想法"],
    homophones: ["行李箱", "心里想", "杏李箱", "型里箱", "姓李箱"],
    example: {
      hanzi: "这个行李箱太重了，我提不动。",
      pinyin: "Zhège xínglixiāng tài zhòng le, wǒ tí bú dòng.",
      meaning: "Chiếc vali hành lý này nặng quá, tôi xách không nổi."
    }
  },
  {
    id: "L12_05",
    lesson: 12,
    lessonTitle: "把重要的东西放在我这儿吧",
    hanzi: "自己",
    pinyin: "zìjǐ",
    pinyinClean: "ziji",
    hanViet: "tự kỷ",
    wordType: "pron",
    meaning: "tự mình, bản thân",
    decomposition: [
      { char: "自", pinyin: "zì", hanViet: "tự", radical: "自 (Tự - cái mũi)", mnemonic: "Người xưa chỉ vào mũi mình để nói về bản thân" },
      { char: "己", pinyin: "jǐ", hanViet: "kỷ", radical: "己 (Kỷ - bản thân)", mnemonic: "Miệng chữ mở hoàn toàn (phân biệt với 已 đóng nửa và 巳 đóng kín)" }
    ],
    visualDistractors: ["已经", "自行车", "自习", "记住"],
    homophones: ["自己", "自给", "字迹", "知己", "自记"],
    example: {
      hanzi: "自己的事情应该自己做。",
      pinyin: "Zìjǐ de shìqing yīnggāi zìjǐ zuò.",
      meaning: "Việc của bản thân mình nên tự mình làm."
    }
  },
  {
    id: "L12_06",
    lesson: 12,
    lessonTitle: "把重要的东西放在我这儿吧",
    hanzi: "包",
    pinyin: "bāo",
    pinyinClean: "bao",
    hanViet: "bao",
    wordType: "n/v",
    meaning: "cái túi, cặp sách; gói, bọc",
    decomposition: [
      { char: "包", pinyin: "bāo", hanViet: "bao", radical: "勹 (Bao - bao bọc)", mnemonic: "Vòng tay (勹) ôm bọc đồ vật bên trong" }
    ],
    visualDistractors: ["句", "饱", "跑", "抱"],
    homophones: ["包", "饱", "抱", "报", "保"],
    example: {
      hanzi: "请把护照和机票放在包里。",
      pinyin: "Qǐng bǎ hùzhào hé jīpiào fàng zài bāo lǐ.",
      meaning: "Xin hãy để hộ chiếu và vé máy bay vào trong túi."
    }
  },
  {
    id: "L12_07",
    lesson: 12,
    lessonTitle: "把重要的东西放在我这儿吧",
    hanzi: "发现",
    pinyin: "fāxiàn",
    pinyinClean: "faxian",
    hanViet: "phát hiện",
    wordType: "v",
    meaning: "phát hiện, nhận ra",
    decomposition: [
      { char: "发", pinyin: "fā", hanViet: "phát", radical: "又 (Hựu)", mnemonic: "Mở ra, bộc lộ" },
      { char: "现", pinyin: "xiàn", hanViet: "hiện", radical: "王 (Ngọc)", mnemonic: "Viên ngọc quý (王) lộ ra cho mắt nhìn thấy (见)" }
    ],
    visualDistractors: ["现在", "发烧", "出现", "表现"],
    homophones: ["发现", "法线", "发泄", "罚现", "发宪"],
    example: {
      hanzi: "到机场以后，我才发现忘记带护照了。",
      pinyin: "Dào jīchǎng yǐhòu, wǒ cái fāxiàn wàngjì dài hùzhào le.",
      meaning: "Sau khi đến sân bay, tôi mới phát hiện quên mang hộ chiếu."
    }
  },
  {
    id: "L12_08",
    lesson: 12,
    lessonTitle: "把重要的东西放在我这儿吧",
    hanzi: "护照",
    pinyin: "hùzhào",
    pinyinClean: "huzhao",
    hanViet: "hộ chiếu",
    wordType: "n",
    meaning: "hộ chiếu (Passport)",
    decomposition: [
      { char: "护", pinyin: "hù", hanViet: "hộ", radical: "扌 (Tài gảy - tay)", mnemonic: "Đưa tay (扌) che chở bảo vệ cửa nhà (户)" },
      { char: "照", pinyin: "zhào", hanViet: "chiếu", radical: "灬 (Hỏa)", mnemonic: "Giấy tờ có ảnh đối chiếu" }
    ],
    visualDistractors: ["照片", "照顾", "护士", "窗户"],
    homophones: ["护照", "互照", "护罩", "虎照", "户照"],
    example: {
      hanzi: "出国旅游以前要先办好护照。",
      pinyin: "Chūguó lǚyóu yǐqián yào xiān bànhǎo hùzhào.",
      meaning: "Trước khi đi du lịch nước ngoài phải làm xong hộ chiếu trước."
    }
  },
  {
    id: "L12_09",
    lesson: 12,
    lessonTitle: "把重要的东西放在我这儿吧",
    hanzi: "起飞",
    pinyin: "qǐfēi",
    pinyinClean: "qifei",
    hanViet: "khởi phi",
    wordType: "v",
    meaning: "cất cánh (máy bay)",
    decomposition: [
      { char: "起", pinyin: "qǐ", hanViet: "khởi", radical: "走 (Tẩu - chạy)", mnemonic: "Bắt đầu chuyển động (走) vươn mình (己) lên" },
      { char: "飞", pinyin: "fēi", hanViet: "phi", radical: "飞 (Phi - bay)", mnemonic: "Đôi cánh chim vỗ bay lên bầu trời" }
    ],
    visualDistractors: ["飞机", "起床", "一起", "越来"],
    homophones: ["起飞", "齐飞", "气飞", "岂非", "弃妃"],
    example: {
      hanzi: "飞机十点半起飞，我们快走吧。",
      pinyin: "Fēijī shí diǎn bàn qǐfēi, wǒmen kuài zǒu ba.",
      meaning: "Máy bay 10 giờ rưỡi cất cánh, chúng ta mau đi thôi."
    }
  },
  {
    id: "L12_10",
    lesson: 12,
    lessonTitle: "把重要的东西放在我这儿吧",
    hanzi: "司机",
    pinyin: "sījī",
    pinyinClean: "siji",
    hanViet: "tư cơ",
    wordType: "n",
    meaning: "tài xế, lái xe",
    decomposition: [
      { char: "司", pinyin: "sī", hanViet: "tư", radical: "口 (Khẩu)", mnemonic: "Người cai quản, điều khiển" },
      { char: "机", pinyin: "jī", hanViet: "cơ", radical: "木 (Mộc)", mnemonic: "Máy móc, động cơ xe" }
    ],
    visualDistractors: ["公司", "飞机", "手机", "机会"],
    homophones: ["司机", "时机", "死机", "四季", "私己"],
    example: {
      hanzi: "那位出租车司机开了二十年车了。",
      pinyin: "Nà wèi chūzūchē sījī kāile èrshí nián chē le.",
      meaning: "Vị tài xế taxi đó đã lái xe được 20 năm rồi."
    }
  },
  {
    id: "L12_11",
    lesson: 12,
    lessonTitle: "把重要的东西放在我这儿吧",
    hanzi: "教",
    pinyin: "jiāo",
    pinyinClean: "jiao",
    hanViet: "giáo",
    wordType: "v",
    meaning: "dạy, hướng dẫn",
    decomposition: [
      { char: "教", pinyin: "jiāo", hanViet: "giáo", radical: "攵 (Phộc)", mnemonic: "Người thầy cầm thước (攵) dạy trẻ con (子) lòng hiếu thảo (孝)" }
    ],
    visualDistractors: ["教室", "敢", "放", "数"],
    homophones: ["教", "交", "焦", "骄", "椒"],
    example: {
      hanzi: "你能教我怎么画中国画儿吗？",
      pinyin: "Nǐ néng jiāo wǒ zěnme huà Zhōngguóhuàr ma?",
      meaning: "Bạn có thể dạy tôi cách vẽ tranh Trung Quốc không?"
    }
  },
  {
    id: "L12_12",
    lesson: 12,
    lessonTitle: "把重要的东西放在我这儿吧",
    hanzi: "画",
    pinyin: "huà",
    pinyinClean: "hua",
    hanViet: "họa",
    wordType: "v/n",
    meaning: "vẽ; bức tranh",
    decomposition: [
      { char: "画", pinyin: "huà", hanViet: "họa", radical: "田 (Điền)", mnemonic: "Đóng khung (凵) vẽ cánh đồng (田) thành bức tranh" }
    ],
    visualDistractors: ["田", "由", "思", "鱼"],
    homophones: ["画", "话", "花", "化", "划"],
    example: {
      hanzi: "墙上挂着一幅漂亮的山水画。",
      pinyin: "Qiáng shàng guàzhe yì fú piàoliang de shānshuǐhuà.",
      meaning: "Trên tường treo một bức tranh sơn thủy tuyệt đẹp."
    }
  },
  {
    id: "L12_13",
    lesson: 12,
    lessonTitle: "把重要的东西放在我这儿吧",
    hanzi: "需要",
    pinyin: "xūyào",
    pinyinClean: "xuyao",
    hanViet: "nhu yếu",
    wordType: "v/n",
    meaning: "cần, nhu cầu",
    decomposition: [
      { char: "需", pinyin: "xū", hanViet: "nhu", radical: "雨 (Vũ - mưa)", mnemonic: "Cây cối đứng đợi (而) cơn mưa (雨) rất cần thiết" },
      { char: "要", pinyin: "yào", hanViet: "yếu", radical: "西 (Tây)", mnemonic: "Cần phải có" }
    ],
    visualDistractors: ["重要", "主要", "感冒", "雪花"],
    homophones: ["需要", "须要", "虚要", "蓄药", "序要"],
    example: {
      hanzi: "如果你需要帮忙，就给我打电话。",
      pinyin: "Rúguǒ nǐ xūyào bāngmáng, jiù gěi wǒ dǎ diànhuà.",
      meaning: "Nếu bạn cần giúp đỡ thì hãy gọi điện cho tôi."
    }
  },
  {
    id: "L12_14",
    lesson: 12,
    lessonTitle: "把重要的东西放在我这儿吧",
    hanzi: "黑板",
    pinyin: "hēibǎn",
    pinyinClean: "heiban",
    hanViet: "hắc bản",
    wordType: "n",
    meaning: "bảng đen",
    decomposition: [
      { char: "黑", pinyin: "hēi", hanViet: "hắc", radical: "黑 (Hắc - đen)", mnemonic: "Lửa (灬) đốt dưới ống khói (里) tạo bồ hóng màu đen" },
      { char: "板", pinyin: "bǎn", hanViet: "bản", radical: "木 (Mộc - gỗ)", mnemonic: "Tấm ván gỗ (木) phẳng" }
    ],
    visualDistractors: ["老板", "黑色", "搬家", "饭馆"],
    homophones: ["黑板", "黑斑", "黑班", "嘿板", "黑版"],
    example: {
      hanzi: "请大家看黑板，把这个句子写下来。",
      pinyin: "Qǐng dàjiā kàn hēibǎn, bǎ zhège jùzi xiě xiàlái.",
      meaning: "Xin mọi người nhìn lên bảng đen, chép câu này xuống."
    }
  },

  // ==================== BÀI 13: 我是走回来的 ====================
  {
    id: "L13_01",
    lesson: 13,
    lessonTitle: "我是走回来的",
    hanzi: "终于",
    pinyin: "zhōngyú",
    pinyinClean: "zhongyu",
    hanViet: "chung ư",
    wordType: "adv",
    meaning: "cuối cùng thì, rốt cuộc",
    decomposition: [
      { char: "终", pinyin: "zhōng", hanViet: "chung", radical: "纟 (Mịch - sợi tơ)", mnemonic: "Cuộn tơ (纟) kéo đến hết mùa đông (冬) là điểm kết" },
      { char: "于", pinyin: "yú", hanViet: "ư", radical: "二 (Nhị)", mnemonic: "Tại, ở điểm đó" }
    ],
    visualDistractors: ["冬天", "疼", "关于", "干"],
    homophones: ["终于", "忠于", "钟于", "终语", "种鱼"],
    example: {
      hanzi: "找了半天，我终于找到我的眼镜了。",
      pinyin: "Zhǎole bàntiān, wǒ zhōngyú zhǎodào wǒ de yǎnjìng le.",
      meaning: "Tìm cả buổi trời, cuối cùng tôi đã tìm thấy mắt kính của mình."
    }
  },
  {
    id: "L13_02",
    lesson: 13,
    lessonTitle: "我是走回来的",
    hanzi: "爷爷",
    pinyin: "yéye",
    pinyinClean: "yeye",
    hanViet: "gia gia",
    wordType: "n",
    meaning: "ông nội",
    decomposition: [
      { char: "爷", pinyin: "yé", hanViet: "gia", radical: "父 (Phụ - người cha)", mnemonic: "Bậc cha chú (父) đáng kính (耶)" }
    ],
    visualDistractors: ["爸爸", "奶奶", "哥哥", "耳朵"],
    homophones: ["爷爷", "夜夜", "叶叶", "页页", "业业"],
    example: {
      hanzi: "爷爷每天早上都喜欢去公园散步。",
      pinyin: "Yéye měitiān zǎoshang dōu xǐhuan qù gōngyuán sànbù.",
      meaning: "Ông nội sáng nào cũng thích đi công viên tản bộ."
    }
  },
  {
    id: "L13_03",
    lesson: 13,
    lessonTitle: "我是走回来的",
    hanzi: "礼物",
    pinyin: "lǐwù",
    pinyinClean: "liwu",
    hanViet: "lễ vật",
    wordType: "n",
    meaning: "món quà, quà tặng",
    decomposition: [
      { char: "礼", pinyin: "lǐ", hanViet: "lễ", radical: "礻 (Thị - lễ nghi)", mnemonic: "Bàn thờ lễ nghi (礻) bày tỏ lòng kính trọng" },
      { char: "物", pinyin: "wù", hanViet: "vật", radical: "牜 (Ngưu - trâu)", mnemonic: "Đồ vật quý giá" }
    ],
    visualDistractors: ["动物", "婚礼", "衬衫", "容易"],
    homophones: ["礼物", "里屋", "理物", "利物", "梨物"],
    example: {
      hanzi: "这是我给妈妈买的生日礼物。",
      pinyin: "Zhè shì wǒ gěi māma mǎi de shēngrì lǐwù.",
      meaning: "Đây là món quà sinh nhật tôi mua tặng mẹ."
    }
  },
  {
    id: "L13_04",
    lesson: 13,
    lessonTitle: "我是走回来的",
    hanzi: "奶奶",
    pinyin: "nǎinai",
    pinyinClean: "nainai",
    hanViet: "nãi nãi",
    wordType: "n",
    meaning: "bà nội",
    decomposition: [
      { char: "奶", pinyin: "nǎi", hanViet: "nãi", radical: "女 (Nữ - người phụ nữ)", mnemonic: "Người phụ nữ (女) hiền từ nuôi nấng con cháu (乃)" }
    ],
    visualDistractors: ["牛奶", "姐姐", "妈妈", "及"],
    homophones: ["奶奶", "耐耐", "奈奈", "乃乃", "氖氖"],
    example: {
      hanzi: "奶奶今年八十岁了，身体还很健康。",
      pinyin: "Nǎinai jīnnián bāshí suì le, shēntǐ hái hěn jiànkāng.",
      meaning: "Bà nội năm nay 80 tuổi rồi, cơ thể vẫn rất khỏe mạnh."
    }
  },
  {
    id: "L13_05",
    lesson: 13,
    lessonTitle: "我是走回来的",
    hanzi: "遇到",
    pinyin: "yùdào",
    pinyinClean: "yudao",
    hanViet: "ngộ đáo",
    wordType: "v",
    meaning: "gặp phải, bắt gặp",
    decomposition: [
      { char: "遇", pinyin: "yù", hanViet: "ngộ", radical: "辶 (Sước - bước đi)", mnemonic: "Trên đường đi (辶) tình cờ bắt gặp" },
      { char: "到", pinyin: "dào", hanViet: "đáo", radical: "刂 (Đao đứng)", mnemonic: "Đến, tới" }
    ],
    visualDistractors: ["迟到", "知道", "看到", "找到"],
    homophones: ["遇到", "鱼道", "雨道", "预到", "玉刀"],
    example: {
      hanzi: "我刚才在电梯里遇到了张经理。",
      pinyin: "Wǒ gāngcái zài diàntī lǐ yùdàole Zhāng jīnglǐ.",
      meaning: "Vừa nãy trong thang máy tôi tình cờ gặp giám đốc Trương."
    }
  },
  {
    id: "L13_06",
    lesson: 13,
    lessonTitle: "我是走回来的",
    hanzi: "一边",
    pinyin: "yìbiān",
    pinyinClean: "yibian",
    hanViet: "nhất biên",
    wordType: "adv/n",
    meaning: "vừa... vừa... (一边...一边...); một bên",
    decomposition: [
      { char: "一", pinyin: "yī", hanViet: "nhất", radical: "一 (Nhất)", mnemonic: "Một phía" },
      { char: "边", pinyin: "biān", hanViet: "biên", radical: "辶 (Sước - bước đi)", mnemonic: "Dùng sức lực (力) bước đi (辶) dọc bên lề" }
    ],
    visualDistractors: ["一直", "一定", "旁边", "远近"],
    homophones: ["一边", "一遍", "一编", "一变", "医边"],
    example: {
      hanzi: "他喜欢一边走路一边听音乐。",
      pinyin: "Tā xǐhuan yìbiān zǒulù yìbiān tīng yīnyuè.",
      meaning: "Anh ấy thích vừa đi bộ vừa nghe nhạc."
    }
  },
  {
    id: "L13_07",
    lesson: 13,
    lessonTitle: "我是走回来的",
    hanzi: "过去",
    pinyin: "guòqù",
    pinyinClean: "guoqu",
    hanViet: "quá khứ",
    wordType: "n/v",
    meaning: "quá khứ, trước đây; đi qua đó",
    decomposition: [
      { char: "过", pinyin: "guò", hanViet: "quá", radical: "辶 (Sước - bước đi)", mnemonic: "Bước chân (辶) vượt qua từng tấc (寸) thời gian" },
      { char: "去", pinyin: "qù", hanViet: "khứ", radical: "厶 (Khư)", mnemonic: "Rời đi, đã qua" }
    ],
    visualDistractors: ["过来", "经过", "出去", "去年"],
    homophones: ["过去", "国曲", "果区", "过曲", "锅去"],
    example: {
      hanzi: "过去这儿没有地铁，现在交通方便多了。",
      pinyin: "Guòqù zhèr méiyǒu dìtiě, xiànzài jiāotōng fāngbiàn duō le.",
      meaning: "Trước đây ở đây không có tàu điện ngầm, nay giao thông tiện hơn nhiều."
    }
  },
  {
    id: "L13_08",
    lesson: 13,
    lessonTitle: "我是走回来的",
    hanzi: "一般",
    pinyin: "yìbān",
    pinyinClean: "yiban",
    hanViet: "nhất ban",
    wordType: "adj/adv",
    meaning: "thông thường, bình thường",
    decomposition: [
      { char: "一", pinyin: "yī", hanViet: "nhất", radical: "一 (Nhất)", mnemonic: "Cùng một hạng" },
      { char: "般", pinyin: "bān", hanViet: "ban", radical: "舟 (Chu - thuyền)", mnemonic: "Con thuyền (舟) chở hàng theo lối thông thường" }
    ],
    visualDistractors: ["搬家", "上班", "一边", "船只"],
    homophones: ["一般", "一班", "一半", "一斑", "一板"],
    example: {
      hanzi: "我周末一般在家看书或者看电影。",
      pinyin: "Wǒ zhōumò yìbān zài jiā kànshū huòzhě kàn diànyǐng.",
      meaning: "Cuối tuần thông thường tôi ở nhà đọc sách hoặc xem phim."
    }
  },
  {
    id: "L13_09",
    lesson: 13,
    lessonTitle: "我是走回来的",
    hanzi: "愿意",
    pinyin: "yuànyì",
    pinyinClean: "yuanyi",
    hanViet: "nguyện ý",
    wordType: "v",
    meaning: "bằng lòng, sẵn lòng, tình nguyện",
    decomposition: [
      { char: "愿", pinyin: "yuàn", hanViet: "nguyện", radical: "心 (Tâm - tim)", mnemonic: "Tấm lòng nguyên vẹn (原) xuất phát từ trái tim (心)" },
      { char: "意", pinyin: "yì", hanViet: "ý", radical: "心 (Tâm)", mnemonic: "Ý nguyện trong lòng" }
    ],
    visualDistractors: ["满意", "同意", "原来", "意思"],
    homophones: ["愿意", "原意", "远意", "院医", "怨意"],
    example: {
      hanzi: "只要你愿意，我们可以一起去旅游。",
      pinyin: "Zhǐyào nǐ yuànyì, wǒmen kěyǐ yìqǐ qù lǚyóu.",
      meaning: "Chỉ cần bạn bằng lòng, chúng ta có thể cùng nhau đi du lịch."
    }
  },
  {
    id: "L13_10",
    lesson: 13,
    lessonTitle: "我是走回来的",
    hanzi: "起来",
    pinyin: "qǐlái",
    pinyinClean: "qilai",
    hanViet: "khởi lai",
    wordType: "v",
    meaning: "đứng dậy, thức dậy; bắt đầu (bổ ngữ xu hướng)",
    decomposition: [
      { char: "起", pinyin: "qǐ", hanViet: "khởi", radical: "走 (Tẩu)", mnemonic: "Vươn dậy" },
      { char: "来", pinyin: "lái", hanViet: "lai", radical: "木 (Mộc)", mnemonic: "Hướng về phía này" }
    ],
    visualDistractors: ["起床", "起飞", "出来", "回来"],
    homophones: ["起来", "齐来", "期来", "骑来", "气来"],
    example: {
      hanzi: "听到这个好消息，大家都高兴地跳了起来。",
      pinyin: "Tīngdào zhège hǎo xiāoxi, dàjiā dōu gāoxìng de tiàole qǐlái.",
      meaning: "Nghe được tin vui này, mọi người đều vui sướng nhảy cẫng lên."
    }
  },
  {
    id: "L13_11",
    lesson: 13,
    lessonTitle: "我是走回来的",
    hanzi: "应该",
    pinyin: "yīnggāi",
    pinyinClean: "yinggai",
    hanViet: "ưng cai",
    wordType: "v",
    meaning: "nên, cần phải",
    decomposition: [
      { char: "应", pinyin: "yīng", hanViet: "ưng", radical: "广 (Nghiễm - mái nhà)", mnemonic: "Dưới mái nhà (广) cần ứng xử đúng mực" },
      { char: "该", pinyin: "gāi", hanViet: "cai", radical: "讠 (Ngôn - lời nói)", mnemonic: "Lời nói (讠) khuyên bảo điều đáng làm (亥)" }
    ],
    visualDistractors: ["孩子", "刻苦", "答应", "座"],
    homophones: ["应该", "英该", "迎该", "赢该", "影该"],
    example: {
      hanzi: "你感冒了，应该多喝水，早点儿休息。",
      pinyin: "Nǐ gǎnmào le, yīnggāi duō hē shuǐ, zǎodiǎnr xiūxi.",
      meaning: "Bạn bị cảm rồi, nên uống nhiều nước và nghỉ ngơi sớm chút."
    }
  },
  {
    id: "L13_12",
    lesson: 13,
    lessonTitle: "我是走回来的",
    hanzi: "生活",
    pinyin: "shēnghuó",
    pinyinClean: "shenghuo",
    hanViet: "sinh hoạt",
    wordType: "n/v",
    meaning: "cuộc sống, sinh sống",
    decomposition: [
      { char: "生", pinyin: "shēng", hanViet: "sinh", radical: "生 (Sinh)", mnemonic: "Sự sống" },
      { char: "活", pinyin: "huó", hanViet: "hoạt", radical: "氵 (Chấm thủy - nước)", mnemonic: "Có nước (氵) trên đầu lưỡi (舌) mới duy trì sự sống" }
    ],
    visualDistractors: ["生气", "生日", "说话", "甜"],
    homophones: ["生活", "生火", "声活", "升活", "省活"],
    example: {
      hanzi: "他在北京生活了十年，很喜欢那儿。",
      pinyin: "Tā zài Běijīng shēnghuóle shí nián, hěn xǐhuan nàr.",
      meaning: "Anh ấy đã sống ở Bắc Kinh 10 năm, rất thích nơi đó."
    }
  },
  {
    id: "L13_13",
    lesson: 13,
    lessonTitle: "我是走回来的",
    hanzi: "校长",
    pinyin: "xiàozhǎng",
    pinyinClean: "xiaozhang",
    hanViet: "hiệu trưởng",
    wordType: "n",
    meaning: "hiệu trưởng",
    decomposition: [
      { char: "校", pinyin: "xiào", hanViet: "hiệu", radical: "木 (Mộc - cây)", mnemonic: "Ngôi trường có hàng cây (木) giao nhau (交)" },
      { char: "长", pinyin: "zhǎng", hanViet: "trưởng", radical: "长 (Trường/Trưởng)", mnemonic: "Người đứng đầu" }
    ],
    visualDistractors: ["学校", "比较", "成长", "老师"],
    homophones: ["校长", "笑掌", "效长", "校章", "消长"],
    example: {
      hanzi: "站在中间说话的那个人是我们校长。",
      pinyin: "Zhàn zài zhōngjiān shuōhuà de nàge rén shì wǒmen xiàozhǎng.",
      meaning: "Người đang đứng ở giữa nói chuyện là hiệu trưởng của chúng tôi."
    }
  },
  {
    id: "L13_14",
    lesson: 13,
    lessonTitle: "我是走回来的",
    hanzi: "坏",
    pinyin: "huài",
    pinyinClean: "huai",
    hanViet: "hoại",
    wordType: "adj",
    meaning: "hỏng, xấu, tồi",
    decomposition: [
      { char: "坏", pinyin: "huài", hanViet: "hoại", radical: "土 (Thổ - đất)", mnemonic: "Nền đất (土) không (不) chắc chắn nên bị sụp hỏng" }
    ],
    visualDistractors: ["环", "杯", "怀", "还"],
    homophones: ["坏", "怀", "徊", "淮", "槐"],
    example: {
      hanzi: "我的电脑坏了，下午要拿去修一下。",
      pinyin: "Wǒ de diànnǎo huài le, xiàwǔ yào ná qù xiū yíxià.",
      meaning: "Máy tính của tôi bị hỏng rồi, chiều phải mang đi sửa một chút."
    }
  },
  {
    id: "L13_15",
    lesson: 13,
    lessonTitle: "我是走回来的",
    hanzi: "经常",
    pinyin: "jīngcháng",
    pinyinClean: "jingchang",
    hanViet: "kinh thường",
    wordType: "adv",
    meaning: "thường xuyên",
    decomposition: [
      { char: "经", pinyin: "jīng", hanViet: "kinh", radical: "纟 (Mịch)", mnemonic: "Trải qua liên tục" },
      { char: "常", pinyin: "cháng", hanViet: "thường", radical: "巾 (Cân - khăn)", mnemonic: "Thường nhật, hằng ngày" }
    ],
    visualDistractors: ["经理", "已经", "非常", "平常"],
    homophones: ["经常", "精常", "京城", "警长", "惊常"],
    example: {
      hanzi: "我周末经常跟朋友一起打篮球。",
      pinyin: "Wǒ zhōumò jīngcháng gēn péngyou yìqǐ dǎ lánqiú.",
      meaning: "Cuối tuần tôi thường xuyên đánh bóng rổ cùng bạn bè."
    }
  },

  // ==================== BÀI 14: 你把水果拿过来 ====================
  {
    id: "L14_01",
    lesson: 14,
    lessonTitle: "你把水果拿过来",
    hanzi: "打扫",
    pinyin: "dǎsǎo",
    pinyinClean: "dasao",
    hanViet: "đả tảo",
    wordType: "v",
    meaning: "quét dọn, dọn dẹp",
    decomposition: [
      { char: "打", pinyin: "dǎ", hanViet: "đả", radical: "扌 (Tài gảy - tay)", mnemonic: "Dùng tay thực hiện động tác" },
      { char: "扫", pinyin: "sǎo", hanViet: "tảo", radical: "扌 (Tài gảy - tay)", mnemonic: "Tay (扌) cầm chổi (彐) quét nhà" }
    ],
    visualDistractors: ["打算", "打开", "归还", "雪花"],
    homophones: ["打扫", "大嫂", "打骚", "大扫", "达扫"],
    example: {
      hanzi: "客人快来了，我们先把房间打扫一下吧。",
      pinyin: "Kèrén kuài lái le, wǒmen xiān bǎ fángjiān dǎsǎo yíxià ba.",
      meaning: "Khách sắp đến rồi, chúng ta dọn dẹp phòng trước một chút nhé."
    }
  },
  {
    id: "L14_02",
    lesson: 14,
    lessonTitle: "你把水果拿过来",
    hanzi: "干净",
    pinyin: "gānjìng",
    pinyinClean: "ganjing",
    hanViet: "can tịnh",
    wordType: "adj",
    meaning: "sạch sẽ",
    decomposition: [
      { char: "干", pinyin: "gān", hanViet: "can", radical: "干 (Can)", mnemonic: "Khô ráo" },
      { char: "净", pinyin: "jìng", hanViet: "tịnh", radical: "冫 (Băng - hai chấm nước)", mnemonic: "Dùng nước mát (冫) rửa tranh (争) cho thật sạch" }
    ],
    visualDistractors: ["安静", "感冒", "眼镜", "晴天"],
    homophones: ["干净", "干劲", "敢进", "赶尽", "甘净"],
    example: {
      hanzi: "妈妈把衣服洗得干干净净。",
      pinyin: "Māma bǎ yīfu xǐ de gāngānjìngjìng.",
      meaning: "Mẹ đã giặt quần áo sạch tinh tươm."
    }
  },
  {
    id: "L14_03",
    lesson: 14,
    lessonTitle: "你把水果拿过来",
    hanzi: "然后",
    pinyin: "ránhòu",
    pinyinClean: "ranhou",
    hanViet: "nhiên hậu",
    wordType: "conj",
    meaning: "sau đó, tiếp theo",
    decomposition: [
      { char: "然", pinyin: "rán", hanViet: "nhiên", radical: "灬 (Hỏa)", mnemonic: "Như thế" },
      { char: "后", pinyin: "hòu", hanViet: "hậu", radical: "口 (Khẩu)", mnemonic: "Phía sau, tiếp sau" }
    ],
    visualDistractors: ["突然", "当然", "最后", "以后"],
    homophones: ["然后", "燃后", "染后", "冉后", "然厚"],
    example: {
      hanzi: "我先写作业，然后再看电视。",
      pinyin: "Wǒ xiān xiě zuòyè, ránhòu zài kàn diànshì.",
      meaning: "Tôi làm bài tập trước, sau đó mới xem tivi."
    }
  },
  {
    id: "L14_04",
    lesson: 14,
    lessonTitle: "你把水果拿过来",
    hanzi: "冰箱",
    pinyin: "bīngxiāng",
    pinyinClean: "bingxiang",
    hanViet: "băng tương",
    wordType: "n",
    meaning: "tủ lạnh",
    decomposition: [
      { char: "冰", pinyin: "bīng", hanViet: "băng", radical: "冫 (Băng - đá lạnh)", mnemonic: "Nước (水) đông lạnh thành băng đá (冫)" },
      { char: "箱", pinyin: "xiāng", hanViet: "tương", radical: "⺮ (Trúc)", mnemonic: "Chiếc tủ/hộp lớn" }
    ],
    visualDistractors: ["行李箱", "信箱", "游泳", "干净"],
    homophones: ["冰箱", "并想", "病箱", "兵箱", "冰香"],
    example: {
      hanzi: "请把刚买的西瓜放进冰箱里。",
      pinyin: "Qǐng bǎ gāng mǎi de xīguā fàngjìn bīngxiāng lǐ.",
      meaning: "Xin hãy cho quả dưa hấu vừa mua vào trong tủ lạnh."
    }
  },
  {
    id: "L14_05",
    lesson: 14,
    lessonTitle: "你把水果拿过来",
    hanzi: "洗澡",
    pinyin: "xǐzǎo",
    pinyinClean: "xizao",
    hanViet: "tẩy tảo",
    wordType: "v",
    meaning: "tắm, tắm rửa",
    decomposition: [
      { char: "洗", pinyin: "xǐ", hanViet: "tẩy", radical: "氵 (Chấm thủy - nước)", mnemonic: "Dùng nước (氵) rửa sạch" },
      { char: "澡", pinyin: "zǎo", hanViet: "tảo", radical: "氵 (Chấm thủy - nước)", mnemonic: "Dòng nước (氵) chảy rào rạt như chim hót trên cây (喿)" }
    ],
    visualDistractors: ["洗手间", "体操", "干燥", "清楚"],
    homophones: ["洗澡", "喜早", "洗早", "细澡", "西澡"],
    example: {
      hanzi: "运动完出了一身汗，我想先去洗个澡。",
      pinyin: "Yùndòng wán chūle yì shēn hàn, wǒ xiǎng xiān qù xǐ gè zǎo.",
      meaning: "Tập thể thao xong ra đầy mồ hôi, tôi muốn đi tắm trước cái đã."
    }
  },
  {
    id: "L14_06",
    lesson: 14,
    lessonTitle: "你把水果拿过来",
    hanzi: "节目",
    pinyin: "jiémù",
    pinyinClean: "jiemu",
    hanViet: "tiết mục",
    wordType: "n",
    meaning: "chương trình (truyền hình), tiết mục",
    decomposition: [
      { char: "节", pinyin: "jié", hanViet: "tiết", radical: "艹 (Thảo)", mnemonic: "Từng phần, từng mục" },
      { char: "目", pinyin: "mù", hanViet: "mục", radical: "目 (Mục - mắt)", mnemonic: "Mắt (目) theo dõi chương trình" }
    ],
    visualDistractors: ["季节", "节日", "眼睛", "自己"],
    homophones: ["节目", "结目", "揭幕", "姐目", "借目"],
    example: {
      hanzi: "你最喜欢看什么电视节目？",
      pinyin: "Nǐ zuì xǐhuan kàn shénme diànshì jiémù?",
      meaning: "Bạn thích xem chương trình truyền hình nào nhất?"
    }
  },
  {
    id: "L14_07",
    lesson: 14,
    lessonTitle: "你把水果拿过来",
    hanzi: "月亮",
    pinyin: "yuèliang",
    pinyinClean: "yueliang",
    hanViet: "nguyệt lượng",
    wordType: "n",
    meaning: "mặt trăng",
    decomposition: [
      { char: "月", pinyin: "yuè", hanViet: "nguyệt", radical: "月 (Nguyệt - trăng)", mnemonic: "Vầng trăng khuyết" },
      { char: "亮", pinyin: "liàng", hanViet: "lượng", radical: "亠 (Đầu)", mnemonic: "Tỏa sáng trên lầu cao" }
    ],
    visualDistractors: ["太阳", "漂亮", "高大", "晚上"],
    homophones: ["月亮", "原谅", "越亮", "阅亮", "约亮"],
    example: {
      hanzi: "今天晚上的月亮又圆又亮。",
      pinyin: "Jīntiān wǎnshang de yuèliang yòu yuán yòu liàng.",
      meaning: "Mặt trăng tối nay vừa tròn vừa sáng."
    }
  },
  {
    id: "L14_08",
    lesson: 14,
    lessonTitle: "你把水果拿过来",
    hanzi: "像",
    pinyin: "xiàng",
    pinyinClean: "xiang",
    hanViet: "tượng",
    wordType: "v",
    meaning: "giống, giống như",
    decomposition: [
      { char: "像", pinyin: "xiàng", hanViet: "tượng", radical: "亻 (Nhân đứng)", mnemonic: "Hình dáng con người (亻) khắc họa giống như con voi (象)" }
    ],
    visualDistractors: ["大象", "好像", "照相", "方向"],
    homophones: ["像", "向", "想", "相", "箱"],
    example: {
      hanzi: "他的女儿长得非常像他。",
      pinyin: "Tā de nǚ'ér zhǎng de fēicháng xiàng tā.",
      meaning: "Con gái của anh ấy lớn lên trông rất giống anh ấy."
    }
  },
  {
    id: "L14_09",
    lesson: 14,
    lessonTitle: "你把水果拿过来",
    hanzi: "盘子",
    pinyin: "pánzi",
    pinyinClean: "panzi",
    hanViet: "bàn tử",
    wordType: "n",
    meaning: "cái đĩa, cái mâm",
    decomposition: [
      { char: "盘", pinyin: "pán", hanViet: "bàn", radical: "皿 (Mãnh - đồ đựng)", mnemonic: "Đồ đựng thức ăn (皿) dẹt và rộng như mạn thuyền (舟)" },
      { char: "子", pinyin: "zi", hanViet: "tử", radical: "子 (Tử)", mnemonic: "Hậu tố danh từ" }
    ],
    visualDistractors: ["瓶子", "筷子", "一般", "杯子"],
    homophones: ["盘子", "胖子", "盼子", "判子", "畔子"],
    example: {
      hanzi: "盘子里放着很多新鲜的水果。",
      pinyin: "Pánzi lǐ fàngzhe hěn duō xīnxiān de shuǐguǒ.",
      meaning: "Trong đĩa bày rất nhiều hoa quả tươi."
    }
  },
  {
    id: "L14_10",
    lesson: 14,
    lessonTitle: "你把水果拿过来",
    hanzi: "刮风",
    pinyin: "guāfēng",
    pinyinClean: "guafeng",
    hanViet: "quát phong",
    wordType: "v",
    meaning: "gió thổi, nổi gió",
    decomposition: [
      { char: "刮", pinyin: "guā", hanViet: "quát", radical: "刂 (Đao đứng)", mnemonic: "Gió thổi rát như lưỡi dao (刂) lướt qua đầu lưỡi (舌)" },
      { char: "风", pinyin: "fēng", hanViet: "phong", radical: "风 (Phong - gió)", mnemonic: "Cánh buồm căng phồng trong gió" }
    ],
    visualDistractors: ["甜", "乱", "风景", "感冒"],
    homophones: ["刮风", "瓜分", "挂风", "寡风", "褂风"],
    example: {
      hanzi: "外面刮风了，快把衣服收进来吧。",
      pinyin: "Wàimiàn guāfēng le, kuài bǎ yīfu shōu jìnlái ba.",
      meaning: "Bên ngoài nổi gió rồi, mau thu quần áo vào trong đi."
    }
  },
  {
    id: "L14_11",
    lesson: 14,
    lessonTitle: "你把水果拿过来",
    hanzi: "叔叔",
    pinyin: "shūshu",
    pinyinClean: "shushu",
    hanViet: "thúc thúc",
    wordType: "n",
    meaning: "chú (em trai bố hoặc người đàn ông trạc tuổi bố)",
    decomposition: [
      { char: "叔", pinyin: "shū", hanViet: "thúc", radical: "又 (Hựu - tay)", mnemonic: "Người chú trong gia đình" }
    ],
    visualDistractors: ["舒服", "爷爷", "阿姨", "督促"],
    homophones: ["叔叔", "舒舒", "书书", "数数", "树木"],
    example: {
      hanzi: "王叔叔今天送给我一本汉越词典。",
      pinyin: "Wáng shūshu jīntiān sòng gěi wǒ yì běn Hàn-Yuè cídiǎn.",
      meaning: "Chú Vương hôm nay tặng tôi một cuốn từ điển Hán - Việt."
    }
  },
  {
    id: "L14_12",
    lesson: 14,
    lessonTitle: "你把水果拿过来",
    hanzi: "阿姨",
    pinyin: "āyí",
    pinyinClean: "ayi",
    hanViet: "a di",
    wordType: "n",
    meaning: "cô, dì",
    decomposition: [
      { char: "阿", pinyin: "ā", hanViet: "a", radical: "阝 (Phụ)", mnemonic: "Tiền tố xưng hô thân mật" },
      { char: "姨", pinyin: "yí", hanViet: "di", radical: "女 (Nữ - phụ nữ)", mnemonic: "Người phụ nữ (女) vai dì cô (夷)" }
    ],
    visualDistractors: ["奶奶", "姐姐", "可以", "附近"],
    homophones: ["阿姨", "阿依", "阿仪", "啊姨", "阿夷"],
    example: {
      hanzi: "李阿姨做的红烧肉特别好吃。",
      pinyin: "Lǐ āyí zuò de hóngshāoròu tèbié hǎochī.",
      meaning: "Món thịt kho tàu cô Lý nấu đặc biệt ngon."
    }
  },
  {
    id: "L14_13",
    lesson: 14,
    lessonTitle: "你把水果拿过来",
    hanzi: "故事",
    pinyin: "gùshi",
    pinyinClean: "gushi",
    hanViet: "cố sự",
    wordType: "n",
    meaning: "câu chuyện, chuyện kể",
    decomposition: [
      { char: "故", pinyin: "gù", hanViet: "cố", radical: "攵 (Phộc)", mnemonic: "Chuyện xưa cũ (古)" },
      { char: "事", pinyin: "shì", hanViet: "sự", radical: "亅 (Quyết)", mnemonic: "Sự việc" }
    ],
    visualDistractors: ["同事", "事情", "历史", "故意"],
    homophones: ["故事", "股市", "古诗", "固事", "雇事"],
    example: {
      hanzi: "睡觉以前，妈妈常给我讲故事。",
      pinyin: "Shuìjiào yǐqián, māma cháng gěi wǒ jiǎng gùshi.",
      meaning: "Trước khi đi ngủ, mẹ thường kể chuyện cho tôi nghe."
    }
  },
  {
    id: "L14_14",
    lesson: 14,
    lessonTitle: "你把水果拿过来",
    hanzi: "声音",
    pinyin: "shēngyīn",
    pinyinClean: "shengyin",
    hanViet: "thanh âm",
    wordType: "n",
    meaning: "âm thanh, giọng nói",
    decomposition: [
      { char: "声", pinyin: "shēng", hanViet: "thanh", radical: "士 (Sĩ)", mnemonic: "Tiếng vang phát ra" },
      { char: "音", pinyin: "yīn", hanViet: "âm", radical: "音 (Âm)", mnemonic: "Âm điệu" }
    ],
    visualDistractors: ["音乐", "生气", "意思", "听说"],
    homophones: ["声音", "生音", "胜因", "圣音", "盛音"],
    example: {
      hanzi: "外面的声音太大了，我听不清楚。",
      pinyin: "Wàimiàn de shēngyīn tài dà le, wǒ tīng bù qīngchu.",
      meaning: "Âm thanh bên ngoài to quá, tôi nghe không rõ."
    }
  },

  // ==================== BÀI 15: 其他都没什么问题 ====================
  {
    id: "L15_01",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "留学",
    pinyin: "liúxué",
    pinyinClean: "liuxue",
    hanViet: "lưu học",
    wordType: "v",
    meaning: "du học",
    decomposition: [
      { char: "留", pinyin: "liú", hanViet: "lưu", radical: "田 (Điền - ruộng)", mnemonic: "Ở lại vùng đất (田) nước ngoài" },
      { char: "学", pinyin: "xué", hanViet: "học", radical: "子 (Tử)", mnemonic: "Học tập" }
    ],
    visualDistractors: ["数学", "大学", "同学", "画画"],
    homophones: ["留学", "流血", "流学", "柳学", "六学"],
    example: {
      hanzi: "姐姐打算明年去中国留学。",
      pinyin: "Jiějie dǎsuàn míngnián qù Zhōngguó liúxué.",
      meaning: "Chị gái dự định sang năm đi Trung Quốc du học."
    }
  },
  {
    id: "L15_02",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "水平",
    pinyin: "shuǐpíng",
    pinyinClean: "shuiping",
    hanViet: "thủy bình",
    wordType: "n",
    meaning: "trình độ, mức độ",
    decomposition: [
      { char: "水", pinyin: "shuǐ", hanViet: "thủy", radical: "水 (Thủy - nước)", mnemonic: "Mặt nước" },
      { char: "平", pinyin: "píng", hanViet: "bình", radical: "干 (Can)", mnemonic: "Phẳng lặng cân bằng như mặt nước" }
    ],
    visualDistractors: ["水果", "瓶子", "苹果", "平时"],
    homophones: ["水平", "水瓶", "水萍", "睡平", "税平"],
    example: {
      hanzi: "他的汉语水平提高得非常快。",
      pinyin: "Tā de Hànyǔ shuǐpíng tígāo de fēicháng kuài.",
      meaning: "Trình độ tiếng Hán của anh ấy nâng cao cực kỳ nhanh."
    }
  },
  {
    id: "L15_03",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "提高",
    pinyin: "tígāo",
    pinyinClean: "tigao",
    hanViet: "đề cao",
    wordType: "v",
    meaning: "nâng cao, cải thiện",
    decomposition: [
      { char: "提", pinyin: "tí", hanViet: "đề", radical: "扌 (Tài gảy - tay)", mnemonic: "Dùng tay (扌) nhấc bổng lên đúng lúc (是)" },
      { char: "高", pinyin: "gāo", hanViet: "cao", radical: "高 (Cao)", mnemonic: "Tòa tháp cao vút" }
    ],
    visualDistractors: ["高兴", "蛋糕", "问题", "总是"],
    homophones: ["提高", "题稿", "体高", "提糕", "替高"],
    example: {
      hanzi: "多跟中国人聊天儿能提高口语水平。",
      pinyin: "Duō gēn Zhōngguórén liáotiānr néng tígāo kǒuyǔ shuǐpíng.",
      meaning: "Nói chuyện nhiều với người Trung Quốc có thể nâng cao trình độ khẩu ngữ."
    }
  },
  {
    id: "L15_04",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "练习",
    pinyin: "liànxí",
    pinyinClean: "lianxi",
    hanViet: "luyện tập",
    wordType: "v/n",
    meaning: "luyện tập, bài tập",
    decomposition: [
      { char: "练", pinyin: "liàn", hanViet: "luyện", radical: "纟 (Mịch - sợi tơ)", mnemonic: "Chuốt sợi tơ (纟) trắng tinh qua rèn giũa" },
      { char: "习", pinyin: "xí", hanViet: "tập", radical: "乙 (Ất)", mnemonic: "Ôn luyện" }
    ],
    visualDistractors: ["锻炼", "复习", "学习", "习惯"],
    homophones: ["练习", "联系", "怜惜", "连习", "炼习"],
    example: {
      hanzi: "请大家把课后的练习做完。",
      pinyin: "Qǐng dàjiā bǎ kèhòu de liànxí zuòwán.",
      meaning: "Xin mọi người làm xong bài luyện tập sau bài học."
    }
  },
  {
    id: "L15_05",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "完成",
    pinyin: "wánchéng",
    pinyinClean: "wancheng",
    hanViet: "hoàn thành",
    wordType: "v",
    meaning: "hoàn thành",
    decomposition: [
      { char: "完", pinyin: "wán", hanViet: "hoàn", radical: "宀 (Miên - mái nhà)", mnemonic: "Xây xong mái nhà (宀) trọn vẹn (元)" },
      { char: "成", pinyin: "chéng", hanViet: "thành", radical: "戈 (Qua - giáo)", mnemonic: "Cầm giáo (戈) bảo vệ thành trì thành công" }
    ],
    visualDistractors: ["完全", "变成", "成功", "院子"],
    homophones: ["完成", "晚成", "万城", "玩成", "碗成"],
    example: {
      hanzi: "这项工作必须在星期五以前完成。",
      pinyin: "Zhè xiàng gōngzuò bìxū zài xīngqīwǔ yǐqián wánchéng.",
      meaning: "Công việc này bắt buộc phải hoàn thành trước thứ Sáu."
    }
  },
  {
    id: "L15_06",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "句子",
    pinyin: "jùzi",
    pinyinClean: "juzi",
    hanViet: "cú tử",
    wordType: "n",
    meaning: "câu (văn)",
    decomposition: [
      { char: "句", pinyin: "jù", hanViet: "cú", radical: "口 (Khẩu - miệng)", mnemonic: "Lời nói từ miệng (口) gói gọn (勹) thành một câu" },
      { char: "子", pinyin: "zi", hanViet: "tử", radical: "子 (Tử)", mnemonic: "Hậu tố danh từ" }
    ],
    visualDistractors: ["包子", "勺子", "词语", "名字"],
    homophones: ["句子", "橘子", "锯子", "巨子", "局子"],
    example: {
      hanzi: "请用这三个新词语写一个句子。",
      pinyin: "Qǐng yòng zhè sān gè xīn cíyǔ xiě yí gè jùzi.",
      meaning: "Xin hãy dùng ba từ mới này viết một câu."
    }
  },
  {
    id: "L15_07",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "其他",
    pinyin: "qítā",
    pinyinClean: "qita",
    hanViet: "kỳ tha",
    wordType: "pron",
    meaning: "khác, những cái khác",
    decomposition: [
      { char: "其", pinyin: "qí", hanViet: "kỳ", radical: "八 (Bát)", mnemonic: "Cái sọt tre đựng đồ" },
      { char: "他", pinyin: "tā", hanViet: "tha", radical: "亻 (Nhân đứng)", mnemonic: "Người hay vật khác" }
    ],
    visualDistractors: ["其实", "他们", "地", "期"],
    homophones: ["其他", "其它", "奇塔", "骑他", "期他"],
    example: {
      hanzi: "除了这道题，其他都没什么问题。",
      pinyin: "Chúle zhè dào tí, qítā dōu méi shénme wèntí.",
      meaning: "Ngoài câu này ra, những cái khác đều không có vấn đề gì."
    }
  },
  {
    id: "L15_08",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "发",
    pinyin: "fā",
    pinyinClean: "fa",
    hanViet: "phát",
    wordType: "v",
    meaning: "gửi đi, phát ra",
    decomposition: [
      { char: "发", pinyin: "fā", hanViet: "phát", radical: "又 (Hựu)", mnemonic: "Bắn mũi tên phát đi xa" }
    ],
    visualDistractors: ["友", "拔", "泼", "废"],
    homophones: ["发", "法", "罚", "乏", "伐"],
    example: {
      hanzi: "你发给我的电子邮件我已经收到了。",
      pinyin: "Nǐ fā gěi wǒ de diànzǐ yóujiàn wǒ yǐjīng shōudào le.",
      meaning: "Email bạn gửi cho tôi, tôi đã nhận được rồi."
    }
  },
  {
    id: "L15_09",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "要求",
    pinyin: "yāoqiú",
    pinyinClean: "yaoqiu",
    hanViet: "yêu cầu",
    wordType: "v/n",
    meaning: "yêu cầu, đòi hỏi",
    decomposition: [
      { char: "要", pinyin: "yāo", hanViet: "yêu", radical: "西 (Tây)", mnemonic: "Đòi hỏi" },
      { char: "求", pinyin: "qiú", hanViet: "cầu", radical: "水 (Thủy)", mnemonic: "Thỉnh cầu, mong mỏi" }
    ],
    visualDistractors: ["重要", "需要", "足球", "主要"],
    homophones: ["要求", "邀求", "腰球", "药球", "摇球"],
    example: {
      hanzi: "老师对我们的发音要求非常严格。",
      pinyin: "Lǎoshī duì wǒmen de fāyīn yāoqiú fēicháng yángé.",
      meaning: "Giáo viên yêu cầu vô cùng nghiêm khắc đối với phát âm của chúng tôi."
    }
  },
  {
    id: "L15_10",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "注意",
    pinyin: "zhùyì",
    pinyinClean: "zhuyi",
    hanViet: "chú ý",
    wordType: "v",
    meaning: "chú ý, lưu tâm",
    decomposition: [
      { char: "注", pinyin: "zhù", hanViet: "chú", radical: "氵 (Chấm thủy - nước)", mnemonic: "Rót dòng nước (氵) tập trung vào một điểm chính (主)" },
      { char: "意", pinyin: "yì", hanViet: "ý", radical: "心 (Tâm - tim)", mnemonic: "Tâm trí (心) để ý" }
    ],
    visualDistractors: ["主要", "住处", "满意", "愿意"],
    homophones: ["注意", "主意", "助益", "住意", "祝意"],
    example: {
      hanzi: "过马路的时候一定要注意安全。",
      pinyin: "Guò mǎlù de shíhou yídìng yào zhùyì ānquán.",
      meaning: "Lúc băng qua đường nhất định phải chú ý an toàn."
    }
  },
  {
    id: "L15_11",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "上网",
    pinyin: "shàngwǎng",
    pinyinClean: "shangwang",
    hanViet: "thượng võng",
    wordType: "v",
    meaning: "lên mạng Internet",
    decomposition: [
      { char: "上", pinyin: "shàng", hanViet: "thượng", radical: "一 (Nhất)", mnemonic: "Truy cập lên" },
      { char: "网", pinyin: "wǎng", hanViet: "võng", radical: "冂 (Quynh)", mnemonic: "Các mắt lưới đan chéo (ㄨ) trong khung (冂) tượng trưng mạng lưới" }
    ],
    visualDistractors: ["上班", "上学", "同", "冈"],
    homophones: ["上网", "上往", "尚网", "伤亡", "赏网"],
    example: {
      hanzi: "我经常上网看新闻、查资料。",
      pinyin: "Wǒ jīngcháng shàngwǎng kàn xīnwén, chá zīliào.",
      meaning: "Tôi thường xuyên lên mạng đọc tin tức và tra tài liệu."
    }
  },
  {
    id: "L15_12",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "除了",
    pinyin: "chúle",
    pinyinClean: "chule",
    hanViet: "trừ liễu",
    wordType: "prep",
    meaning: "ngoài... ra (除了...以外)",
    decomposition: [
      { char: "除", pinyin: "chú", hanViet: "trừ", radical: "阝 (Phụ - gò đất)", mnemonic: "Bậc thềm (阝) loại trừ phần dư thừa (余)" },
      { char: "了", pinyin: "le", hanViet: "liễu", radical: "亅 (Quyết)", mnemonic: "Trợ từ" }
    ],
    visualDistractors: ["茶水", "为了", "了解", "院子"],
    homophones: ["除了", "出了", "锄了", "厨了", "储了"],
    example: {
      hanzi: "除了汉语以外，他还会说英语和法语。",
      pinyin: "Chúle Hànyǔ yǐwài, tā hái huì shuō Yīngyǔ hé Fǎyǔ.",
      meaning: "Ngoài tiếng Hán ra, anh ấy còn biết nói tiếng Anh và tiếng Pháp."
    }
  },
  {
    id: "L15_13",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "新闻",
    pinyin: "xīnwén",
    pinyinClean: "xinwen",
    hanViet: "tân văn",
    wordType: "n",
    meaning: "tin tức, thời sự",
    decomposition: [
      { char: "新", pinyin: "xīn", hanViet: "tân", radical: "斤 (Cân)", mnemonic: "Mới mẻ" },
      { char: "闻", pinyin: "wén", hanViet: "văn", radical: "门 (Môn - cửa)", mnemonic: "Ghé cái tai (耳) vào khe cửa (门) để nghe ngóng tin tức" }
    ],
    visualDistractors: ["新鲜", "房间", "问好", "聪明"],
    homophones: ["新闻", "新文", "心闻", "欣闻", "薪文"],
    example: {
      hanzi: "爸爸每天晚上七点都看电视新闻。",
      pinyin: "Bàba měitiān wǎnshang qī diǎn dōu kàn diànshì xīnwén.",
      meaning: "Bố tối nào lúc 7 giờ cũng xem thời sự trên tivi."
    }
  },
  {
    id: "L15_14",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "极了",
    pinyin: "jíle",
    pinyinClean: "jile",
    hanViet: "cực liễu",
    wordType: "adv",
    meaning: "cực kỳ, vô cùng (đứng sau tính từ)",
    decomposition: [
      { char: "极", pinyin: "jí", hanViet: "cực", radical: "木 (Mộc - cây)", mnemonic: "Đỉnh nóc gỗ (木) vươn tới (及) mức tột đỉnh" },
      { char: "了", pinyin: "le", hanViet: "liễu", radical: "亅 (Quyết)", mnemonic: "Trợ từ ngữ khí" }
    ],
    visualDistractors: ["年级", "楼房", "为了", "着急"],
    homophones: ["极了", "急了", "集了", "吉了", "几了"],
    example: {
      hanzi: "小狗看到主人回来，高兴极了。",
      pinyin: "Xiǎogǒu kàndào zhǔrén huílái, gāoxìng jíle.",
      meaning: "Chú chó nhỏ nhìn thấy chủ về thì mừng rỡ cực kỳ."
    }
  },
  {
    id: "L15_15",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "节日",
    pinyin: "jiérì",
    pinyinClean: "jieri",
    hanViet: "tiết nhật",
    wordType: "n",
    meaning: "ngày lễ, dịp lễ",
    decomposition: [
      { char: "节", pinyin: "jié", hanViet: "tiết", radical: "艹 (Thảo)", mnemonic: "Tiết lễ" },
      { char: "日", pinyin: "rì", hanViet: "nhật", radical: "日 (Nhật - ngày)", mnemonic: "Ngày kỷ niệm" }
    ],
    visualDistractors: ["季节", "节目", "生日", "春节"],
    homophones: ["节日", "借日", "结日", "杰日", "洁日"],
    example: {
      hanzi: "春节是中国最重要的传统节日。",
      pinyin: "Chūnjié shì Zhōngguó zuì zhòngyào de chuántǒng jiérì.",
      meaning: "Tết Nguyên Đán là ngày lễ truyền thống quan trọng nhất của Trung Quốc."
    }
  },
  {
    id: "L15_16",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "举行",
    pinyin: "jǔxíng",
    pinyinClean: "juxing",
    hanViet: "cử hành",
    wordType: "v",
    meaning: "tổ chức, cử hành",
    decomposition: [
      { char: "举", pinyin: "jǔ", hanViet: "cử", radical: "丶 (Chủ)", mnemonic: "Đưa tay nâng cao lên" },
      { char: "行", pinyin: "xíng", hanViet: "hành", radical: "行 (Hành)", mnemonic: "Tiến hành thực hiện" }
    ],
    visualDistractors: ["银行", "自行车", "半", "拿"],
    homophones: ["举行", "巨型", "句型", "聚星", "居行"],
    example: {
      hanzi: "这次比赛将在我们学校体育馆举行。",
      pinyin: "Zhè cì bǐsài jiāng zài wǒmen xuéxiào tǐyùguǎn jǔxíng.",
      meaning: "Trận đấu lần này sẽ được tổ chức tại nhà thi đấu trường chúng tôi."
    }
  },
  {
    id: "L15_17",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "世界",
    pinyin: "shìjiè",
    pinyinClean: "shijie",
    hanViet: "thế giới",
    wordType: "n",
    meaning: "thế giới",
    decomposition: [
      { char: "世", pinyin: "shì", hanViet: "thế", radical: "一 (Nhất)", mnemonic: "Ba mươi năm là một thế hệ nối tiếp nhau" },
      { char: "界", pinyin: "jiè", hanViet: "giới", radical: "田 (Điền - ruộng đất)", mnemonic: "Ranh giới (介) giữa các vùng đất (田) rộng lớn" }
    ],
    visualDistractors: ["中介", "介绍", "草地", "城市"],
    homophones: ["世界", "视界", "事件", "试界", "世姐"],
    example: {
      hanzi: "她希望以后能去世界各地旅游。",
      pinyin: "Tā xīwàng yǐhòu néng qù shìjiè gèdì lǚyóu.",
      meaning: "Cô ấy hy vọng sau này có thể đi du lịch khắp nơi trên thế giới."
    }
  },
  {
    id: "L15_18",
    lesson: 15,
    lessonTitle: "其他都没什么问题",
    hanzi: "街道",
    pinyin: "jiēdào",
    pinyinClean: "jiedao",
    hanViet: "nhai đạo",
    wordType: "n",
    meaning: "đường phố, khu phố",
    decomposition: [
      { char: "街", pinyin: "jiē", hanViet: "nhai", radical: "行 (Hành - đường đi)", mnemonic: "Con đường lớn (行) lát đất bằng phẳng (圭) ở giữa" },
      { char: "道", pinyin: "dào", hanViet: "đạo", radical: "辶 (Sước - bước đi)", mnemonic: "Cái đầu (首) định hướng bước đi (辶) trên con đường" }
    ],
    visualDistractors: ["知道", "迟到", "银行", "迎接"],
    homophones: ["街道", "借到", "接到", "皆道", "姐道"],
    example: {
      hanzi: "节日的街道上到处都是鲜花。",
      pinyin: "Jiérì de jiēdào shàng dàochù dōu shì xiānhuā.",
      meaning: "Trên đường phố ngày lễ đâu đâu cũng là hoa tươi."
    }
  },

  // ==================== BÀI 16: 我现在累得下了班就想睡觉 ====================
  {
    id: "L16_01",
    lesson: 16,
    lessonTitle: "我现在累得下了班就想睡觉",
    hanzi: "城市",
    pinyin: "chéngshì",
    pinyinClean: "chengshi",
    hanViet: "thành thị",
    wordType: "n",
    meaning: "thành phố, đô thị",
    decomposition: [
      { char: "城", pinyin: "chéng", hanViet: "thành", radical: "土 (Thổ - đất)", mnemonic: "Tường đất (土) xây dựng hoàn thành (成) bảo vệ đô thị" },
      { char: "市", pinyin: "shì", hanViet: "thị", radical: "巾 (Cân)", mnemonic: "Chợ búa đô hội" }
    ],
    visualDistractors: ["超市", "完成", "诚实", "地方"],
    homophones: ["城市", "诚实", "程式", "成事", "呈示"],
    example: {
      hanzi: "我喜欢住在这个美丽安静的城市。",
      pinyin: "Wǒ xǐhuan zhù zài zhège měilì ānjìng de chéngshì.",
      meaning: "Tôi thích sống ở thành phố xinh đẹp và yên tĩnh này."
    }
  },
  {
    id: "L16_02",
    lesson: 16,
    lessonTitle: "我现在累得下了班就想睡觉",
    hanzi: "如果",
    pinyin: "rúguǒ",
    pinyinClean: "ruguo",
    hanViet: "như quả",
    wordType: "conj",
    meaning: "nếu, nếu như",
    decomposition: [
      { char: "如", pinyin: "rú", hanViet: "như", radical: "女 (Nữ)", mnemonic: "Lời nói (口) của người phụ nữ (女) nhẹ nhàng giả định" },
      { char: "果", pinyin: "guǒ", hanViet: "quả", radical: "木 (Mộc - cây)", mnemonic: "Trái cây (田) mọc trên cành gỗ (木) biểu thị kết quả" }
    ],
    visualDistractors: ["水果", "苹果", "结果", "姑妈"],
    homophones: ["如果", "茹果", "入国", "如国", "乳果"],
    example: {
      hanzi: "如果明天下雨，我们就不去爬山了。",
      pinyin: "Rúguǒ míngtiān xiàyǔ, wǒmen jiù bú qù páshān le.",
      meaning: "Nếu ngày mai trời mưa thì chúng ta không đi leo núi nữa."
    }
  },
  {
    id: "L16_03",
    lesson: 16,
    lessonTitle: "我现在累得下了班就想睡觉",
    hanzi: "认为",
    pinyin: "rènwéi",
    pinyinClean: "renwei",
    hanViet: "nhận vi",
    wordType: "v",
    meaning: "cho rằng, nghĩ rằng",
    decomposition: [
      { char: "认", pinyin: "rèn", hanViet: "nhận", radical: "讠 (Ngôn)", mnemonic: "Nhận định bằng lời nói (讠)" },
      { char: "为", pinyin: "wéi", hanViet: "vi", radical: "丶 (Chủ)", mnemonic: "Là, coi là" }
    ],
    visualDistractors: ["认真", "认识", "因为", "以为"],
    homophones: ["认为", "人为", "任为", "仁为", "刃为"],
    example: {
      hanzi: "我认为健康比金钱更重要。",
      pinyin: "Wǒ rènwéi jiànkāng bǐ jīnqián gèng zhòngyào.",
      meaning: "Tôi cho rằng sức khỏe quan trọng hơn tiền bạc."
    }
  },
  {
    id: "L16_04",
    lesson: 16,
    lessonTitle: "我现在累得下了班就想睡觉",
    hanzi: "皮鞋",
    pinyin: "píxié",
    pinyinClean: "pixie",
    hanViet: "bì hài",
    wordType: "n",
    meaning: "giày da",
    decomposition: [
      { char: "皮", pinyin: "pí", hanViet: "bì", radical: "皮 (Bì - da)", mnemonic: "Dùng tay (又) lột lớp da thuộc" },
      { char: "鞋", pinyin: "xié", hanViet: "hài", radical: "革 (Cách - da thuộc)", mnemonic: "Đôi giày làm bằng da thuộc (革) đi trên mặt đất (圭)" }
    ],
    visualDistractors: ["啤酒", "街道", "娃娃", "运动鞋"],
    homophones: ["皮鞋", "疲惫", "脾邪", "批写", "匹鞋"],
    example: {
      hanzi: "他今天穿了一双黑色的皮鞋。",
      pinyin: "Tā jīntiān chuānle yì shuāng hēisè de píxié.",
      meaning: "Hôm nay anh ấy đi một đôi giày da màu đen."
    }
  },
  {
    id: "L16_05",
    lesson: 16,
    lessonTitle: "我现在累得下了班就想睡觉",
    hanzi: "帽子",
    pinyin: "màozi",
    pinyinClean: "maozi",
    hanViet: "mạo tử",
    wordType: "n",
    meaning: "cái mũ, cái nón",
    decomposition: [
      { char: "帽", pinyin: "mào", hanViet: "mạo", radical: "巾 (Cân - vải)", mnemonic: "Mảnh vải (巾) che nắng trên đầu và mắt (冒)" },
      { char: "子", pinyin: "zi", hanViet: "tử", radical: "子 (Tử)", mnemonic: "Hậu tố danh từ" }
    ],
    visualDistractors: ["感冒", "裤子", "裙子", "猴子"],
    homophones: ["帽子", "毛子", "猫子", "貌子", "矛子"],
    example: {
      hanzi: "外面风大，戴上帽子再出去吧。",
      pinyin: "Wàimiàn fēng dà, dàishàng màozi zài chūqù ba.",
      meaning: "Bên ngoài gió to, đội mũ vào rồi hẵng ra ngoài."
    }
  },
  {
    id: "L16_06",
    lesson: 16,
    lessonTitle: "我现在累得下了班就想睡觉",
    hanzi: "长",
    pinyin: "zhǎng",
    pinyinClean: "zhang",
    hanViet: "trưởng",
    wordType: "v",
    meaning: "lớn lên, mọc, trông (ngoại hình)",
    decomposition: [
      { char: "长", pinyin: "zhǎng", hanViet: "trưởng", radical: "长 (Trưởng)", mnemonic: "Mái tóc dài ra, cơ thể lớn lên" }
    ],
    visualDistractors: ["卡", "片", "乐", "衣"],
    homophones: ["长", "涨", "掌", "丈", "帐"],
    example: {
      hanzi: "妹妹长得又高又漂亮。",
      pinyin: "Mèimei zhǎng de yòu gāo yòu piàoliang.",
      meaning: "Em gái lớn lên trông vừa cao vừa xinh đẹp."
    }
  },
  {
    id: "L16_07",
    lesson: 16,
    lessonTitle: "我现在累得下了班就想睡觉",
    hanzi: "可爱",
    pinyin: "kě'ài",
    pinyinClean: "keai",
    hanViet: "khả ái",
    wordType: "adj",
    meaning: "đáng yêu, dễ thương",
    decomposition: [
      { char: "可", pinyin: "kě", hanViet: "khả", radical: "口 (Khẩu)", mnemonic: "Đáng, có thể" },
      { char: "爱", pinyin: "ài", hanViet: "ái", radical: "爫 (Trảo - tay)", mnemonic: "Trao tình bạn (友) ấm áp dưới mái nhà" }
    ],
    visualDistractors: ["可乐", "可以", "爱好", "爱情"],
    homophones: ["可爱", "可哀", "渴爱", "客爱", "克爱"],
    example: {
      hanzi: "那只小熊猫真可爱！",
      pinyin: "Nà zhī xiǎo xióngmāo zhēn kě'ài!",
      meaning: "Chú gấu trúc nhỏ kia thật đáng yêu!"
    }
  },
  {
    id: "L16_08",
    lesson: 16,
    lessonTitle: "我现在累得下了班就想睡觉",
    hanzi: "鼻子",
    pinyin: "bízi",
    pinyinClean: "bizi",
    hanViet: "tỵ tử",
    wordType: "n",
    meaning: "cái mũi",
    decomposition: [
      { char: "鼻", pinyin: "bí", hanViet: "tỵ", radical: "鼻 (Tỵ - mũi)", mnemonic: "Phía trên là chữ Tự (自 - cái mũi) đặt trên cánh đồng (田) và đôi chân (廾)" },
      { char: "子", pinyin: "zi", hanViet: "tử", radical: "子 (Tử)", mnemonic: "Hậu tố danh từ" }
    ],
    visualDistractors: ["自己", "算盘", "桌子", "帽子"],
    homophones: ["鼻子", "笔子", "比子", "壁子", "篦子"],
    example: {
      hanzi: "大象的鼻子又长又有用。",
      pinyin: "Dàxiàng de bízi yòu cháng yòu yǒuyòng.",
      meaning: "Cái vòi (mũi) của con voi vừa dài vừa hữu ích."
    }
  },
  {
    id: "L16_09",
    lesson: 16,
    lessonTitle: "我现在累得下了班就想睡觉",
    hanzi: "别人",
    pinyin: "biérén",
    pinyinClean: "bieren",
    hanViet: "biệt nhân",
    wordType: "pron",
    meaning: "người khác",
    decomposition: [
      { char: "别", pinyin: "bié", hanViet: "biệt", radical: "刂 (Đao đứng)", mnemonic: "Khác biệt" },
      { char: "人", pinyin: "rén", hanViet: "nhân", radical: "人 (Nhân)", mnemonic: "Con người" }
    ],
    visualDistractors: ["特别", "客人", "家人", "男人"],
    homophones: ["别人", "别仁", "憋人", "鳖人", "蹩人"],
    example: {
      hanzi: "不要总是拿自己跟别人比较。",
      pinyin: "Búyào zǒngshì ná zìjǐ gēn biérén bǐjiào.",
      meaning: "Đừng lúc nào cũng đem bản thân mình ra so sánh với người khác."
    }
  },
  {
    id: "L16_10",
    lesson: 16,
    lessonTitle: "我现在累得下了班就想睡觉",
    hanzi: "检查",
    pinyin: "jiǎnchá",
    pinyinClean: "jiancha",
    hanViet: "kiểm tra",
    wordType: "v",
    meaning: "kiểm tra, khám (bệnh)",
    decomposition: [
      { char: "检", pinyin: "jiǎn", hanViet: "kiểm", radical: "木 (Mộc - cây)", mnemonic: "Soát xét từng thanh gỗ (木) tất cả mọi người (佥)" },
      { char: "查", pinyin: "chá", hanViet: "tra", radical: "木 (Mộc - cây)", mnemonic: "Dưới gốc cây (木) lúc bình minh (旦) soi xét kỹ lưỡng" }
    ],
    visualDistractors: ["警察", "茶水", "树林", "脸蛋"],
    homophones: ["检查", "检察", "监察", "减差", "简查"],
    example: {
      hanzi: "写完作业以后要认真检查一遍。",
      pinyin: "Xiěwán zuòyè yǐhòu yào rènzhēn jiǎnchá yí biàn.",
      meaning: "Sau khi làm xong bài tập phải nghiêm túc kiểm tra lại một lượt."
    }
  },
  {
    id: "L16_11",
    lesson: 16,
    lessonTitle: "我现在累得下了班就想睡觉",
    hanzi: "刷牙",
    pinyin: "shuāyá",
    pinyinClean: "shuaya",
    hanViet: "soát nha",
    wordType: "v",
    meaning: "đánh răng",
    decomposition: [
      { char: "刷", pinyin: "shuā", hanViet: "soát", radical: "刂 (Đao đứng)", mnemonic: "Dùng bàn chải/vải (巾) dưới mái nhà (尸) chà sạch" },
      { char: "牙", pinyin: "yá", hanViet: "nha", radical: "牙 (Nha - cái răng)", mnemonic: "Hình dáng chiếc răng hàm đan vào nhau" }
    ],
    visualDistractors: ["洗脸", "穿衣", "芽", "穿"],
    homophones: ["刷牙", "耍牙", "刷涯", "耍呀", "刷芽"],
    example: {
      hanzi: "每天早上和晚上都要刷牙。",
      pinyin: "Měitiān zǎoshang hé wǎnshang dōu yào shuāyá.",
      meaning: "Mỗi buổi sáng và buổi tối đều phải đánh răng."
    }
  },
  {
    id: "L16_12",
    lesson: 16,
    lessonTitle: "我现在累得下了班就想睡觉",
    hanzi: "关系",
    pinyin: "guānxi",
    pinyinClean: "guanxi",
    hanViet: "quan hệ",
    wordType: "n",
    meaning: "mối quan hệ, sự liên quan",
    decomposition: [
      { char: "关", pinyin: "guān", hanViet: "quan", radical: "八 (Bát)", mnemonic: "Cửa ải liên kết" },
      { char: "系", pinyin: "xi", hanViet: "hệ", radical: "糸 (Mịch - sợi tơ)", mnemonic: "Sợi dây tơ (糸) kết nối các mối quan hệ" }
    ],
    visualDistractors: ["关心", "没关系", "联系", "累"],
    homophones: ["关系", "关西", "冠希", "观戏", "官系"],
    example: {
      hanzi: "他们两个人是同班同学，关系非常好。",
      pinyin: "Tāmen liǎng gè rén shì tóngbān tóngxué, guānxi fēicháng hǎo.",
      meaning: "Hai người họ là bạn cùng lớp, mối quan hệ vô cùng tốt."
    }
  },
  {
    id: "L16_13",
    lesson: 16,
    lessonTitle: "我现在累得下了班就想睡觉",
    hanzi: "词语",
    pinyin: "cíyǔ",
    pinyinClean: "ciyu",
    hanViet: "từ ngữ",
    wordType: "n",
    meaning: "từ ngữ, từ vựng",
    decomposition: [
      { char: "词", pinyin: "cí", hanViet: "từ", radical: "讠 (Ngôn)", mnemonic: "Từ vựng" },
      { char: "语", pinyin: "yǔ", hanViet: "ngữ", radical: "讠 (Ngôn - lời nói)", mnemonic: "Ngôn ngữ (讠) của năm (五) cái miệng (口) giao tiếp" }
    ],
    visualDistractors: ["词典", "汉语", "句子", "告诉"],
    homophones: ["词语", "赐予", "次语", "辞语", "慈雨"],
    example: {
      hanzi: "今天我们学习了十五个新词语。",
      pinyin: "Jīntiān wǒmen xuéxíle shíwǔ gè xīn cíyǔ.",
      meaning: "Hôm nay chúng tôi đã học 15 từ vựng mới."
    }
  },

  // ==================== BÀI 17: 谁都有办法看好你的“病” ====================
  {
    id: "L17_01",
    lesson: 17,
    lessonTitle: "谁都有办法看好你的“病”",
    hanzi: "请假",
    pinyin: "qǐngjià",
    pinyinClean: "qingjia",
    hanViet: "thỉnh giả",
    wordType: "v",
    meaning: "xin nghỉ phép",
    decomposition: [
      { char: "请", pinyin: "qǐng", hanViet: "thỉnh", radical: "讠 (Ngôn - lời nói)", mnemonic: "Dùng lời nói (讠) lễ phép thỉnh cầu" },
      { char: "假", pinyin: "jià", hanViet: "giả", radical: "亻 (Nhân đứng)", mnemonic: "Con người (亻) tạm nghỉ ngơi" }
    ],
    visualDistractors: ["请客", "放假", "清楚", "晴天"],
    homophones: ["请假", "亲家", "清家", "倾家", "轻驾"],
    example: {
      hanzi: "我今天身体不舒服，想跟经理请一天假。",
      pinyin: "Wǒ jīntiān shēntǐ bù shūfu, xiǎng gēn jīnglǐ qǐng yì tiān jià.",
      meaning: "Hôm nay tôi không khỏe, muốn xin giám đốc nghỉ phép một ngày."
    }
  },
  {
    id: "L17_02",
    lesson: 17,
    lessonTitle: "谁都有办法看好你的“病”",
    hanzi: "一共",
    pinyin: "yígòng",
    pinyinClean: "yigong",
    hanViet: "nhất cộng",
    wordType: "adv",
    meaning: "tổng cộng",
    decomposition: [
      { char: "一", pinyin: "yī", hanViet: "nhất", radical: "一 (Nhất)", mnemonic: "Gộp về một mối" },
      { char: "共", pinyin: "gòng", hanViet: "cộng", radical: "八 (Bát)", mnemonic: "Hai bàn tay cùng góp chung lại" }
    ],
    visualDistractors: ["一定", "一样", "公共", "一直"],
    homophones: ["一共", "一功", "一宫", "移宫", "义工"],
    example: {
      hanzi: "这些水果一共多少钱？",
      pinyin: "Zhèxiē shuǐguǒ yígòng duōshao qián?",
      meaning: "Chỗ hoa quả này tổng cộng bao nhiêu tiền?"
    }
  },
  {
    id: "L17_03",
    lesson: 17,
    lessonTitle: "谁都有办法看好你的“病”",
    hanzi: "邻居",
    pinyin: "línjū",
    pinyinClean: "linju",
    hanViet: "lân cư",
    wordType: "n",
    meaning: "hàng xóm, láng giềng",
    decomposition: [
      { char: "邻", pinyin: "lín", hanViet: "lân", radical: "阝 (Ấp - vùng đất)", mnemonic: "Người (令) sống cùng khu đất (阝) kế bên" },
      { char: "居", pinyin: "jū", hanViet: "cư", radical: "尸 (Thi - mái nhà)", mnemonic: "Ngôi nhà (尸) cư trú từ xưa (古)" }
    ],
    visualDistractors: ["故居", "客厅", "楼房", "附近"],
    homophones: ["邻居", "林居", "临居", "麟居", "霖居"],
    example: {
      hanzi: "我的邻居是一位非常热情的老太太。",
      pinyin: "Wǒ de línjū shì yí wèi fēicháng rèqíng de lǎo tàitai.",
      meaning: "Hàng xóm của tôi là một cụ bà vô cùng nhiệt tình."
    }
  },
  {
    id: "L17_04",
    lesson: 17,
    lessonTitle: "谁都有办法看好你的“病”",
    hanzi: "后来",
    pinyin: "hòulái",
    pinyinClean: "houlai",
    hanViet: "hậu lai",
    wordType: "n",
    meaning: "sau này, về sau (chỉ quá khứ)",
    decomposition: [
      { char: "后", pinyin: "hòu", hanViet: "hậu", radical: "口 (Khẩu)", mnemonic: "Về sau" },
      { char: "来", pinyin: "lái", hanViet: "lai", radical: "木 (Mộc)", mnemonic: "Tới" }
    ],
    visualDistractors: ["最后", "然后", "回来", "起来"],
    homophones: ["后来", "厚来", "候来", "吼来", "后莱"],
    example: {
      hanzi: "他以前在银行工作，后来去了一家旅游公司。",
      pinyin: "Tā yǐqián zài yínháng gōngzuò, hòulái qùle yì jiā lǚyóu gōngsī.",
      meaning: "Trước đây anh ấy làm ở ngân hàng, về sau chuyển sang một công ty du lịch."
    }
  },
  {
    id: "L17_05",
    lesson: 17,
    lessonTitle: "谁都有办法看好你的“病”",
    hanzi: "爱好",
    pinyin: "àihào",
    pinyinClean: "aihao",
    hanViet: "ái hiếu",
    wordType: "n/v",
    meaning: "sở thích",
    decomposition: [
      { char: "爱", pinyin: "ài", hanViet: "ái", radical: "爫 (Trảo)", mnemonic: "Yêu thích" },
      { char: "好", pinyin: "hào", hanViet: "hiếu", radical: "女 (Nữ)", mnemonic: "Ham thích (đọc thanh 4 hào)" }
    ],
    visualDistractors: ["可爱", "最好", "只好", "爱情"],
    homophones: ["爱好", "哀号", "暗号", "爱号", "挨号"],
    example: {
      hanzi: "我最大的爱好就是看书和听音乐。",
      pinyin: "Wǒ zuì dà de àihào jiùshì kànshū hé tīng yīnyuè.",
      meaning: "Sở thích lớn nhất của tôi chính là đọc sách và nghe nhạc."
    }
  },
  {
    id: "L17_06",
    lesson: 17,
    lessonTitle: "谁都有办法看好你的“病”",
    hanzi: "办法",
    pinyin: "bànfǎ",
    pinyinClean: "banfa",
    hanViet: "biện pháp",
    wordType: "n",
    meaning: "cách, biện pháp",
    decomposition: [
      { char: "办", pinyin: "bàn", hanViet: "biện", radical: "力 (Lực - sức)", mnemonic: "Giải quyết công việc" },
      { char: "法", pinyin: "fǎ", hanViet: "pháp", radical: "氵 (Chấm thủy - nước)", mnemonic: "Phương pháp trôi chảy như dòng nước (氵) đi (去)" }
    ],
    visualDistractors: ["办公室", "为了", "过去", "法律"],
    homophones: ["办法", "颁发", "半法", "伴法", "办发"],
    example: {
      hanzi: "别着急，我们一定能找到解决问题的办法。",
      pinyin: "Bié zháojí, wǒmen yídìng néng zhǎodào jiějué wèntí de bànfǎ.",
      meaning: "Đừng sốt ruột, chúng ta nhất định sẽ tìm ra cách giải quyết vấn đề."
    }
  },
  {
    id: "L17_07",
    lesson: 17,
    lessonTitle: "谁都有办法看好你的“病”",
    hanzi: "饱",
    pinyin: "bǎo",
    pinyinClean: "bao",
    hanViet: "bão",
    wordType: "adj",
    meaning: "no (ăn no)",
    decomposition: [
      { char: "饱", pinyin: "bǎo", hanViet: "bão", radical: "饣 (Thực - thức ăn)", mnemonic: "Ăn thức ăn (饣) căng tròn cả bụng (包)" }
    ],
    visualDistractors: ["饿", "包", "饮", "饭"],
    homophones: ["饱", "包", "保", "宝", "抱"],
    example: {
      hanzi: "我已经吃饱了，不用再盛米饭了。",
      pinyin: "Wǒ yǐjīng chībǎo le, búyòng zài chéng mǐfàn le.",
      meaning: "Tôi ăn no rồi, không cần xới thêm cơm nữa đâu."
    }
  },
  {
    id: "L17_08",
    lesson: 17,
    lessonTitle: "谁都有办法看好你的“病”",
    hanzi: "为了",
    pinyin: "wèile",
    pinyinClean: "weile",
    hanViet: "vị liễu",
    wordType: "prep",
    meaning: "để, vì (chỉ mục đích)",
    decomposition: [
      { char: "为", pinyin: "wèi", hanViet: "vị", radical: "丶 (Chủ)", mnemonic: "Vì mục tiêu" },
      { char: "了", pinyin: "le", hanViet: "liễu", radical: "亅 (Quyết)", mnemonic: "Trợ từ" }
    ],
    visualDistractors: ["除了", "极了", "认为", "因为"],
    homophones: ["为了", "围了", "喂了", "位了", "味了"],
    example: {
      hanzi: "为了学好汉语，他每天练习写汉字。",
      pinyin: "Wèile xuéhǎo Hànyǔ, tā měitiān liànxí xiě Hànzì.",
      meaning: "Để học tốt tiếng Hán, ngày nào anh ấy cũng luyện viết chữ Hán."
    }
  },
  {
    id: "L17_09",
    lesson: 17,
    lessonTitle: "谁都有办法看好你的“病”",
    hanzi: "决定",
    pinyin: "juédìng",
    pinyinClean: "jueding",
    hanViet: "quyết định",
    wordType: "v/n",
    meaning: "quyết định",
    decomposition: [
      { char: "决", pinyin: "jué", hanViet: "quyết", radical: "冫 (Băng)", mnemonic: "Dứt khoát khơi thông dòng nước" },
      { char: "定", pinyin: "dìng", hanViet: "định", radical: "宀 (Miên)", mnemonic: "Ấn định chắc chắn" }
    ],
    visualDistractors: ["一定", "干净", "准备", "觉得"],
    homophones: ["决定", "绝顶", "觉定", "掘定", "爵定"],
    example: {
      hanzi: "我已经决定下个月去上海工作了。",
      pinyin: "Wǒ yǐjīng juédìng xià gè yuè qù Shànghǎi gōngzuò le.",
      meaning: "Tôi đã quyết định tháng sau đi Thượng Hải làm việc rồi."
    }
  },
  {
    id: "L17_10",
    lesson: 17,
    lessonTitle: "谁都有办法看好你的“病”",
    hanzi: "选择",
    pinyin: "xuǎnzé",
    pinyinClean: "xuanze",
    hanViet: "tuyển trạch",
    wordType: "v/n",
    meaning: "lựa chọn, sự lựa chọn",
    decomposition: [
      { char: "选", pinyin: "xuǎn", hanViet: "tuyển", radical: "辶 (Sước - bước đi)", mnemonic: "Bước đi (辶) chọn người đi trước (先)" },
      { char: "择", pinyin: "zé", hanViet: "trạch", radical: "扌 (Tài gảy - tay)", mnemonic: "Dùng tay (扌)挑選 lọc ra" }
    ],
    visualDistractors: ["洗手", "先生", "翻译", "打扫"],
    homophones: ["选择", "选泽", "宣责", "悬泽", "炫泽"],
    example: {
      hanzi: "这几件衣服都很漂亮，我不知道怎么选择。",
      pinyin: "Zhè jǐ jiàn yīfu dōu hěn piàoliang, wǒ bù zhīdào zěnme xuǎnzé.",
      meaning: "Mấy bộ quần áo này đều rất đẹp, tôi không biết lựa chọn thế nào."
    }
  },
  {
    id: "L17_11",
    lesson: 17,
    lessonTitle: "谁都有办法看好你的“病”",
    hanzi: "冬天",
    pinyin: "dōngtiān",
    pinyinClean: "dongtian",
    hanViet: "đông thiên",
    wordType: "n",
    meaning: "mùa đông",
    decomposition: [
      { char: "冬", pinyin: "dōng", hanViet: "đông", radical: "冫 (Băng - hai chấm băng)", mnemonic: "Bước chân (夂) đi trên hai tảng băng lạnh (冫) mùa đông" },
      { char: "天", pinyin: "tiān", hanViet: "thiên", radical: "大 (Đại)", mnemonic: "Trời, mùa" }
    ],
    visualDistractors: ["夏天", "春天", "终于", "疼"],
    homophones: ["冬天", "东天", "洞天", "动天", "懂天"],
    example: {
      hanzi: "北京的冬天非常冷，常常下雪。",
      pinyin: "Běijīng de dōngtiān fēicháng lěng, chángcháng xiàxuě.",
      meaning: "Mùa đông ở Bắc Kinh vô cùng lạnh, thường xuyên có tuyết rơi."
    }
  },
  {
    id: "L17_12",
    lesson: 17,
    lessonTitle: "谁都有办法看好你的“病”",
    hanzi: "必须",
    pinyin: "bìxū",
    pinyinClean: "bixu",
    hanViet: "tất tu",
    wordType: "adv",
    meaning: "bắt buộc phải, nhất thiết phải",
    decomposition: [
      { char: "必", pinyin: "bì", hanViet: "tất", radical: "心 (Tâm - tim)", mnemonic: "Một nét phiệt đóng đinh xuyên qua trái tim (心) là tất yếu" },
      { char: "须", pinyin: "xū", hanViet: "tu", radical: "页 (Hiệt - cái đầu)", mnemonic: "Bộ râu (彡) trên khuôn mặt/đầu (页) là điều phải có" }
    ],
    visualDistractors: ["秘书", "需要", "心理", "照顾"],
    homophones: ["必须", "必需", "碧须", "币须", "毕须"],
    example: {
      hanzi: "骑摩托车的时候必须戴安全帽。",
      pinyin: "Qí mótuōchē de shíhou bìxū dài ānquánmào.",
      meaning: "Khi đi xe máy bắt buộc phải đội mũ bảo hiểm."
    }
  },
  {
    id: "L17_13",
    lesson: 17,
    lessonTitle: "谁都有办法看好你的“病”",
    hanzi: "根据",
    pinyin: "gēnjù",
    pinyinClean: "genju",
    hanViet: "căn cứ",
    wordType: "prep/n",
    meaning: "căn cứ vào, dựa theo",
    decomposition: [
      { char: "根", pinyin: "gēn", hanViet: "căn", radical: "木 (Mộc - cây)", mnemonic: "Rễ cây (木) bám chắc (艮) vào lòng đất" },
      { char: "据", pinyin: "jù", hanViet: "cứ", radical: "扌 (Tài gảy - tay)", mnemonic: "Tay (扌) nắm giữ chỗ dựa vững chắc (居)" }
    ],
    visualDistractors: ["跟", "邻居", "很", "眼睛"],
    homophones: ["根据", "根剧", "跟据", "耕具", "亘古"],
    example: {
      hanzi: "这部电影是根据一个真实的故事拍的。",
      pinyin: "Zhè bù diànyǐng shì gēnjù yí gè zhēnshí de gùshi pāi de.",
      meaning: "Bộ phim này được quay dựa theo một câu chuyện có thật."
    }
  },
  {
    id: "L17_14",
    lesson: 17,
    lessonTitle: "谁都有办法看好你的“病”",
    hanzi: "情况",
    pinyin: "qíngkuàng",
    pinyinClean: "qingkuang",
    hanViet: "tình huống",
    wordType: "n",
    meaning: "tình hình, tình huống",
    decomposition: [
      { char: "情", pinyin: "qíng", hanViet: "tình", radical: "忄 (Tâm đứng)", mnemonic: "Tình trạng" },
      { char: "况", pinyin: "kuàng", hanViet: "huống", radical: "冫 (Băng)", mnemonic: "Người anh (兄) xem xét cảnh huống" }
    ],
    visualDistractors: ["热情", "事情", "清楚", "祝贺"],
    homophones: ["情况", "情狂", "晴况", "清况", "庆况"],
    example: {
      hanzi: "如果遇到特殊情况，请马上告诉我。",
      pinyin: "Rúguǒ yùdào tèshū qíngkuàng, qǐng mǎshàng gàosu wǒ.",
      meaning: "Nếu gặp phải tình huống đặc biệt, xin hãy báo ngay cho tôi."
    }
  },
  {
    id: "L17_15",
    lesson: 17,
    lessonTitle: "谁都有办法看好你的“病”",
    hanzi: "渴",
    pinyin: "kě",
    pinyinClean: "ke",
    hanViet: "khát",
    wordType: "adj",
    meaning: "khát nước",
    decomposition: [
      { char: "渴", pinyin: "kě", hanViet: "khát", radical: "氵 (Chấm thủy - nước)", mnemonic: "Trời nắng (日) cơ thể cần nước (氵) nên khát (nhớ: Khát 渴 có nước 氵, Uống 喝 có miệng 口)" }
    ],
    visualDistractors: ["喝", "酒", "河", "湖"],
    homophones: ["渴", "可", "课", "客", "克"],
    example: {
      hanzi: "我走得又累又渴，想买瓶水喝。",
      pinyin: "Wǒ zǒu de yòu lèi yòu kě, xiǎng mǎi píng shuǐ hē.",
      meaning: "Tôi đi bộ vừa mệt vừa khát, muốn mua một chai nước uống."
    }
  },

  // ==================== BÀI 18: 我相信他们会同意的 ====================
  {
    id: "L18_01",
    lesson: 18,
    lessonTitle: "我相信他们会同意的",
    hanzi: "动物",
    pinyin: "dòngwù",
    pinyinClean: "dongwu",
    hanViet: "động vật",
    wordType: "n",
    meaning: "động vật, con vật",
    decomposition: [
      { char: "动", pinyin: "dòng", hanViet: "động", radical: "力 (Lực - sức)", mnemonic: "Dùng sức (力) làm đám mây (云) chuyển động" },
      { char: "物", pinyin: "wù", hanViet: "vật", radical: "牜 (Ngưu - con trâu)", mnemonic: "Loài vật có sừng như trâu bò (牜)" }
    ],
    visualDistractors: ["礼物", "运动", "特别", "熊猫"],
    homophones: ["动物", "动武", "东屋", "洞物", "懂物"],
    example: {
      hanzi: "周末爸爸带我去动物园看大熊猫。",
      pinyin: "Zhōumò bàba dài wǒ qù dòngwùyuán kàn dàxióngmāo.",
      meaning: "Cuối tuần bố đưa tôi đi sở thú xem gấu trúc lớn."
    }
  },
  {
    id: "L18_02",
    lesson: 18,
    lessonTitle: "我相信他们会同意的",
    hanzi: "老",
    pinyin: "lǎo",
    pinyinClean: "lao",
    hanViet: "lão",
    wordType: "n/adj",
    meaning: "hổ (老虎); già, cũ",
    decomposition: [
      { char: "老", pinyin: "lǎo", hanViet: "lão", radical: "耂 (Lão)", mnemonic: "Lão luyện, đứng đầu" }
    ],
    visualDistractors: ["考", "孝", "者", "差"],
    homophones: ["老", "劳", "牢", "姥", "涝"],
    example: {
      hanzi: "动物园里有一只大老虎。",
      pinyin: "Dòngwùyuán lǐ yǒu yì zhī dà lǎohǔ.",
      meaning: "Trong sở thú có một con hổ lớn."
    }
  },
  {
    id: "L18_03",
    lesson: 18,
    lessonTitle: "我相信他们会同意的",
    hanzi: "只",
    pinyin: "zhǐ",
    pinyinClean: "zhi",
    hanViet: "chỉ",
    wordType: "adv",
    meaning: "chỉ, chỉ có (đọc zhī khi làm lượng từ: con, chiếc)",
    decomposition: [
      { char: "只", pinyin: "zhǐ", hanViet: "chỉ", radical: "口 (Khẩu - miệng)", mnemonic: "Một cái miệng (口) và hai chân (八) đứng độc lập" }
    ],
    visualDistractors: ["兄", "识", "共", "员"],
    homophones: ["只", "指", "纸", "止", "址"],
    example: {
      hanzi: "我只去过一次北京。",
      pinyin: "Wǒ zhǐ qùguò yí cì Běijīng.",
      meaning: "Tôi mới chỉ đi Bắc Kinh một lần."
    }
  },
  {
    id: "L18_04",
    lesson: 18,
    lessonTitle: "我相信他们会同意的",
    hanzi: "嘴",
    pinyin: "zuǐ",
    pinyinClean: "zui",
    hanViet: "chủy",
    wordType: "n",
    meaning: "cái miệng, mỏ (chim)",
    decomposition: [
      { char: "嘴", pinyin: "zuǐ", hanViet: "chủy", radical: "口 (Khẩu - miệng)", mnemonic: "Cái miệng (口) nhô ra như chiếc sừng (角) phía dưới bước chân (此)" }
    ],
    visualDistractors: ["喝", "唱", "角", "腿"],
    homophones: ["嘴", "最", "罪", "醉", "咀"],
    example: {
      hanzi: "妹妹的嘴小小的，笑起来真好看。",
      pinyin: "Mèimei de zuǐ xiǎoxiǎo de, xiào qǐlái zhēn hǎokàn.",
      meaning: "Miệng của em gái nhỏ nhắn, cười lên trông thật xinh."
    }
  },
  {
    id: "L18_05",
    lesson: 18,
    lessonTitle: "我相信他们会同意的",
    hanzi: "段",
    pinyin: "duàn",
    pinyinClean: "duan",
    hanViet: "đoạn",
    wordType: "mw",
    meaning: "đoạn, quãng (thời gian, đường, văn bản)",
    decomposition: [
      { char: "段", pinyin: "duàn", hanViet: "đoạn", radical: "殳 (Thù)", mnemonic: "Bậc thang chia thành từng đoạn, tay cầm búa (殳) gõ" }
    ],
    visualDistractors: ["锻炼", "假", "搬", "般"],
    homophones: ["段", "断", "短", "锻", "端"],
    example: {
      hanzi: "最近这段时间我工作特别忙。",
      pinyin: "Zuìjìn zhè duàn shíjiān wǒ gōngzuò tèbié máng.",
      meaning: "Quãng thời gian gần đây công việc của tôi đặc biệt bận."
    }
  },
  {
    id: "L18_06",
    lesson: 18,
    lessonTitle: "我相信他们会同意的",
    hanzi: "不但",
    pinyin: "búdàn",
    pinyinClean: "budan",
    hanViet: "bất đãn",
    wordType: "conj",
    meaning: "không những... (不但...而且...: không những... mà còn...)",
    decomposition: [
      { char: "不", pinyin: "bù", hanViet: "bất", radical: "一 (Nhất)", mnemonic: "Không" },
      { char: "但", pinyin: "dàn", hanViet: "đãn", radical: "亻 (Nhân đứng)", mnemonic: "Người (亻) đón mặt trời mọc (旦) — chỉ, những" }
    ],
    visualDistractors: ["但是", "担心", "不仅", "早上"],
    homophones: ["不但", "不丹", "不担", "不淡", "布袋"],
    example: {
      hanzi: "她不但会说汉语，而且还会写毛笔字。",
      pinyin: "Tā búdàn huì shuō Hànyǔ, érqiě hái huì xiě máobǐzì.",
      meaning: "Cô ấy không những biết nói tiếng Hán mà còn biết viết chữ thư pháp."
    }
  },
  {
    id: "L18_07",
    lesson: 18,
    lessonTitle: "我相信他们会同意的",
    hanzi: "有名",
    pinyin: "yǒumíng",
    pinyinClean: "youming",
    hanViet: "hữu danh",
    wordType: "adj",
    meaning: "nổi tiếng, có tiếng",
    decomposition: [
      { char: "有", pinyin: "yǒu", hanViet: "hữu", radical: "月 (Nhục)", mnemonic: "Có" },
      { char: "名", pinyin: "míng", hanViet: "danh", radical: "口 (Khẩu)", mnemonic: "Buổi tối (夕) dùng miệng (口) xưng tên tuổi" }
    ],
    visualDistractors: ["名字", "明白", "朋友", "名片"],
    homophones: ["有名", "幽冥", "油明", "友名", "游名"],
    example: {
      hanzi: "北京烤鸭在世界上非常有名。",
      pinyin: "Běijīng kǎoyā zài shìjiè shàng fēicháng yǒumíng.",
      meaning: "Vịt quay Bắc Kinh vô cùng nổi tiếng trên thế giới."
    }
  },
  {
    id: "L18_08",
    lesson: 18,
    lessonTitle: "我相信他们会同意的",
    hanzi: "同意",
    pinyin: "tóngyì",
    pinyinClean: "tongyi",
    hanViet: "đồng ý",
    wordType: "v",
    meaning: "đồng ý, tán thành",
    decomposition: [
      { char: "同", pinyin: "tóng", hanViet: "đồng", radical: "口 (Khẩu)", mnemonic: "Cùng chung" },
      { char: "意", pinyin: "yì", hanViet: "ý", radical: "心 (Tâm - tim)", mnemonic: "Ý kiến, suy nghĩ" }
    ],
    visualDistractors: ["同事", "满意", "愿意", "注意"],
    homophones: ["同意", "同一", "统一", "通义", "童意"],
    example: {
      hanzi: "我相信父母一定会同意我的计划。",
      pinyin: "Wǒ xiāngxìn fùmǔ yídìng huì tóngyì wǒ de jìhuà.",
      meaning: "Tôi tin rằng bố mẹ nhất định sẽ đồng ý với kế hoạch của tôi."
    }
  },
  {
    id: "L18_09",
    lesson: 18,
    lessonTitle: "我相信他们会同意的",
    hanzi: "相信",
    pinyin: "xiāngxìn",
    pinyinClean: "xiangxin",
    hanViet: "tương tín",
    wordType: "v",
    meaning: "tin tưởng, tin rằng",
    decomposition: [
      { char: "相", pinyin: "xiāng", hanViet: "tương", radical: "目 (Mục - mắt)", mnemonic: "Dùng mắt (目) nhìn cây (木) quan sát lẫn nhau" },
      { char: "信", pinyin: "xìn", hanViet: "tín", radical: "亻 (Nhân đứng)", mnemonic: "Lời nói (言) của con người (亻) phải giữ chữ tín" }
    ],
    visualDistractors: ["写信", "照相", "想念", "借书"],
    homophones: ["相信", "乡信", "香信", "相心", "向心力"],
    example: {
      hanzi: "你要相信自己，一定能考过HSK三级。",
      pinyin: "Nǐ yào xiāngxìn zìjǐ, yídìng néng kǎoguò HSK sānjí.",
      meaning: "Bạn phải tin tưởng vào bản thân, nhất định sẽ thi đỗ HSK 3."
    }
  },
  {
    id: "L18_10",
    lesson: 18,
    lessonTitle: "我相信他们会同意的",
    hanzi: "关于",
    pinyin: "guānyú",
    pinyinClean: "guanyu",
    hanViet: "quan ư",
    wordType: "prep",
    meaning: "về (vấn đề, lĩnh vực...)",
    decomposition: [
      { char: "关", pinyin: "guān", hanViet: "quan", radical: "八 (Bát)", mnemonic: "Liên quan" },
      { char: "于", pinyin: "yú", hanViet: "ư", radical: "二 (Nhị)", mnemonic: "Đối với, tại" }
    ],
    visualDistractors: ["关系", "关心", "终于", "干"],
    homophones: ["关于", "关羽", "冠于", "官语", "观鱼"],
    example: {
      hanzi: "我买了一本关于中国历史的书。",
      pinyin: "Wǒ mǎile yì běn guānyú Zhōngguó lìshǐ de shū.",
      meaning: "Tôi đã mua một cuốn sách viết về lịch sử Trung Quốc."
    }
  },
  {
    id: "L18_11",
    lesson: 18,
    lessonTitle: "我相信他们会同意的",
    hanzi: "机会",
    pinyin: "jīhuì",
    pinyinClean: "jihui",
    hanViet: "cơ hội",
    wordType: "n",
    meaning: "cơ hội, dịp",
    decomposition: [
      { char: "机", pinyin: "jī", hanViet: "cơ", radical: "木 (Mộc)", mnemonic: "Thời cơ then chốt" },
      { char: "会", pinyin: "huì", hanViet: "hội", radical: "人 (Nhân)", mnemonic: "Hội tụ" }
    ],
    visualDistractors: ["飞机", "司机", "会议", "手机"],
    homophones: ["机会", "聚会", "忌讳", "积会", "机汇"],
    example: {
      hanzi: "以后有机会，我一定再去一次云南。",
      pinyin: "Yǐhòu yǒu jīhuì, wǒ yídìng zài qù yí cì Yúnnán.",
      meaning: "Sau này có cơ hội, tôi nhất định sẽ đi Vân Nam thêm lần nữa."
    }
  },
  {
    id: "L18_12",
    lesson: 18,
    lessonTitle: "我相信他们会同意的",
    hanzi: "国家",
    pinyin: "guójiā",
    pinyinClean: "guojia",
    hanViet: "quốc gia",
    wordType: "n",
    meaning: "đất nước, quốc gia",
    decomposition: [
      { char: "国", pinyin: "guó", hanViet: "quốc", radical: "囗 (Vi - biên giới)", mnemonic: "Viên ngọc tỷ (玉) nằm trong đường biên giới (囗) quốc gia" },
      { char: "家", pinyin: "jiā", hanViet: "gia", radical: "宀 (Miên - mái nhà)", mnemonic: "Mái nhà (宀) nuôi đàn lợn (豕) là gia đình" }
    ],
    visualDistractors: ["中国", "大家", "花园", "搬家"],
    homophones: ["国家", "果家", "过家", "郭家", "国佳"],
    example: {
      hanzi: "每个国家都有自己独特的文化。",
      pinyin: "Měi gè guójiā dōu yǒu zìjǐ dútè de wénhuà.",
      meaning: "Mỗi một quốc gia đều có nền văn hóa độc đáo của riêng mình."
    }
  },
  {
    id: "L18_13",
    lesson: 18,
    lessonTitle: "我相信他们会同意的",
    hanzi: "种",
    pinyin: "zhǒng",
    pinyinClean: "zhong",
    hanViet: "chủng",
    wordType: "mw",
    meaning: "loại, thứ, giống (đọc zhòng khi là động từ trồng cây)",
    decomposition: [
      { char: "种", pinyin: "zhǒng", hanViet: "chủng", radical: "禾 (Hòa - cây lúa)", mnemonic: "Giống lúa (禾) gieo trồng đúng tâm điểm (中)" }
    ],
    visualDistractors: ["钟", "重", "和", "秋"],
    homophones: ["种", "钟", "中", "肿", "忠"],
    example: {
      hanzi: "超市里有各种各样的水果。",
      pinyin: "Chāoshì lǐ yǒu gèzhǒng gèyàng de shuǐguǒ.",
      meaning: "Trong siêu thị có đủ các loại hoa quả."
    }
  },
  {
    id: "L18_14",
    lesson: 18,
    lessonTitle: "我相信他们会同意的",
    hanzi: "特点",
    pinyin: "tèdiǎn",
    pinyinClean: "tedian",
    hanViet: "đặc điểm",
    wordType: "n",
    meaning: "đặc điểm, nét đặc trưng",
    decomposition: [
      { char: "特", pinyin: "tè", hanViet: "đặc", radical: "牜 (Ngưu)", mnemonic: "Đặc biệt" },
      { char: "点", pinyin: "diǎn", hanViet: "điểm", radical: "灬 (Hỏa - bốn chấm)", mnemonic: "Chiếm (占) những điểm nổi bật (灬)" }
    ],
    visualDistractors: ["特别", "一点儿", "词典", "占领"],
    homophones: ["特点", "特电", "特店", "忑点", "铽点"],
    example: {
      hanzi: "每个人都有自己的性格特点。",
      pinyin: "Měi gè rén dōu yǒu zìjǐ de xìnggé tèdiǎn.",
      meaning: "Mỗi người đều có đặc điểm tính cách của riêng mình."
    }
  },
  {
    id: "L18_15",
    lesson: 18,
    lessonTitle: "我相信他们会同意的",
    hanzi: "奇怪",
    pinyin: "qíguài",
    pinyinClean: "qiguai",
    hanViet: "kỳ quái",
    wordType: "adj",
    meaning: "kỳ lạ, lạ lùng",
    decomposition: [
      { char: "奇", pinyin: "qí", hanViet: "kỳ", radical: "大 (Đại)", mnemonic: "Lớn (大) đến mức khả (可) kinh ngạc" },
      { char: "怪", pinyin: "guài", hanViet: "quái", radical: "忄 (Tâm đứng)", mnemonic: "Trong tâm (忄) cảm thấy khác thường (圣)" }
    ],
    visualDistractors: ["骑车", "椅子", "难过", "着急"],
    homophones: ["奇怪", "齐怪", "气怪", "奇拐", "期怪"],
    example: {
      hanzi: "真奇怪，我的钥匙刚才还在桌子上呢。",
      pinyin: "Zhēn qíguài, wǒ de yàoshi gāngcái hái zài zhuōzi shàng ne.",
      meaning: "Lạ thật, chìa khóa của tôi vừa nãy còn ở trên bàn cơ mà."
    }
  },

  // ==================== BÀI 19: 你没看出来吗 ====================
  {
    id: "L19_01",
    lesson: 19,
    lessonTitle: "你没看出来吗",
    hanzi: "耳朵",
    pinyin: "ěrduo",
    pinyinClean: "erduo",
    hanViet: "nhĩ đóa",
    wordType: "n",
    meaning: "đôi tai, cái tai",
    decomposition: [
      { char: "耳", pinyin: "ěr", hanViet: "nhĩ", radical: "耳 (Nhĩ - cái tai)", mnemonic: "Hình dáng vành tai người" },
      { char: "朵", pinyin: "duo", hanViet: "đóa", radical: "木 (Mộc - cây)", mnemonic: "Đóa hoa trên cành cây (木), chỉ vành tai mềm mại (乃)" }
    ],
    visualDistractors: ["鼻子", "眼睛", "聊天", "新闻"],
    homophones: ["耳朵", "二朵", "尔朵", "饵朵", "迩朵"],
    example: {
      hanzi: "兔子的耳朵长，尾巴短。",
      pinyin: "Tùzi de ěrduo cháng, wěiba duǎn.",
      meaning: "Tai của con thỏ thì dài, đuôi thì ngắn."
    }
  },
  {
    id: "L19_02",
    lesson: 19,
    lessonTitle: "你没看出来吗",
    hanzi: "脸",
    pinyin: "liǎn",
    pinyinClean: "lian",
    hanViet: "liễm",
    wordType: "n",
    meaning: "khuôn mặt, gương mặt",
    decomposition: [
      { char: "脸", pinyin: "liǎn", hanViet: "liễm", radical: "月 (Nhục - thịt)", mnemonic: "Phần da thịt (月) nơi mọi nét biểu cảm hội tụ (佥)" }
    ],
    visualDistractors: ["检查", "腿", "脚", "险"],
    homophones: ["脸", "练", "炼", "恋", "连"],
    example: {
      hanzi: "她听到大家的表扬，脸一下子红了。",
      pinyin: "Tā tīngdào dàjiā de biǎoyáng, liǎn yíxiàzi hóng le.",
      meaning: "Cô ấy nghe thấy lời khen của mọi người, mặt thoáng chốc đỏ ửng lên."
    }
  },
  {
    id: "L19_03",
    lesson: 19,
    lessonTitle: "你没看出来吗",
    hanzi: "短",
    pinyin: "duǎn",
    pinyinClean: "duan",
    hanViet: "đoản",
    wordType: "adj",
    meaning: "ngắn",
    decomposition: [
      { char: "短", pinyin: "duǎn", hanViet: "đoản", radical: "矢 (Thỉ - mũi tên)", mnemonic: "Mũi tên (矢) và hạt đậu (豆) đều nhỏ ngắn" }
    ],
    visualDistractors: ["矮", "知", "段", "长"],
    homophones: ["短", "段", "断", "端", "锻"],
    example: {
      hanzi: "冬天到了，白天越来越短，夜晚越来越长。",
      pinyin: "Dōngtiān dào le, báitiān yuèláiyuè duǎn, yèwǎn yuèláiyuè cháng.",
      meaning: "Mùa đông đến rồi, ban ngày ngày càng ngắn, ban đêm ngày càng dài."
    }
  },
  {
    id: "L19_04",
    lesson: 19,
    lessonTitle: "你没看出来吗",
    hanzi: "马",
    pinyin: "mǎ",
    pinyinClean: "ma",
    hanViet: "mã",
    wordType: "n",
    meaning: "con ngựa",
    decomposition: [
      { char: "马", pinyin: "mǎ", hanViet: "mã", radical: "马 (Mã - ngựa)", mnemonic: "Hình dáng đầu, bờm, bốn chân và đuôi con ngựa đang phi" }
    ],
    visualDistractors: ["鸟", "乌", "妈", "骑"],
    homophones: ["马", "妈", "吗", "骂", "码"],
    example: {
      hanzi: "徐悲鸿画的马非常有名。",
      pinyin: "Xú Bēihóng huà de mǎ fēicháng yǒumíng.",
      meaning: "Tranh ngựa do Từ Bi Hồng vẽ vô cùng nổi tiếng."
    }
  },
  {
    id: "L19_05",
    lesson: 19,
    lessonTitle: "你没看出来吗",
    hanzi: "张",
    pinyin: "zhāng",
    pinyinClean: "zhang",
    hanViet: "trương",
    wordType: "mw",
    meaning: "tờ, tấm, bức, cái (lượng từ cho giấy, ảnh, bàn, miệng, mặt)",
    decomposition: [
      { char: "张", pinyin: "zhāng", hanViet: "trương", radical: "弓 (Cung - cây cung)", mnemonic: "Kéo căng dây cung (弓) dài (长) mở rộng ra" }
    ],
    visualDistractors: ["长", "帐", "引", "强"],
    homophones: ["张", "章", "涨", "掌", "丈"],
    example: {
      hanzi: "请给我一张纸，我要写个电话号码。",
      pinyin: "Qǐng gěi wǒ yì zhāng zhǐ, wǒ yào xiě gè diànhuà hàomǎ.",
      meaning: "Xin đưa cho tôi một tờ giấy, tôi cần ghi một số điện thoại."
    }
  },
  {
    id: "L19_06",
    lesson: 19,
    lessonTitle: "你没看出来吗",
    hanzi: "位",
    pinyin: "wèi",
    pinyinClean: "wei",
    hanViet: "vị",
    wordType: "mw",
    meaning: "vị (lượng từ lịch sự chỉ người)",
    decomposition: [
      { char: "位", pinyin: "wèi", hanViet: "vị", radical: "亻 (Nhân đứng)", mnemonic: "Người (亻) đứng (立) ở vị trí trang trọng" }
    ],
    visualDistractors: ["拉", "住", "但", "信"],
    homophones: ["位", "为", "未", "味", "喂"],
    example: {
      hanzi: "请问，哪一位是新来的王老师？",
      pinyin: "Qǐngwèn, nǎ yí wèi shì xīn lái de Wáng lǎoshī?",
      meaning: "Xin hỏi, vị nào là thầy Vương mới chuyển đến?"
    }
  },
  {
    id: "L19_07",
    lesson: 19,
    lessonTitle: "你没看出来吗",
    hanzi: "蓝",
    pinyin: "lán",
    pinyinClean: "lan",
    hanViet: "lam",
    wordType: "adj",
    meaning: "màu xanh lam, xanh da trời",
    decomposition: [
      { char: "蓝", pinyin: "lán", hanViet: "lam", radical: "艹 (Thảo đầu - cỏ)", mnemonic: "Cây chàm (艹) dùng để nhuộm màu xanh lam (监)" }
    ],
    visualDistractors: ["篮", "草", "茶", "菜"],
    homophones: ["蓝", "篮", "兰", "拦", "懒"],
    example: {
      hanzi: "今天的天气真好，天空蓝蓝的。",
      pinyin: "Jīntiān de tiānqì zhēn hǎo, tiānkōng lánlán de.",
      meaning: "Thời tiết hôm nay đẹp thật, bầu trời xanh ngắt."
    }
  },
  {
    id: "L19_08",
    lesson: 19,
    lessonTitle: "你没看出来吗",
    hanzi: "秋天",
    pinyin: "qiūtiān",
    pinyinClean: "qiutian",
    hanViet: "thu thiên",
    wordType: "n",
    meaning: "mùa thu",
    decomposition: [
      { char: "秋", pinyin: "qiū", hanViet: "thu", radical: "禾 (Hòa - lúa)", mnemonic: "Cây lúa (禾) chín vàng rực như lửa (火) vào mùa thu" },
      { char: "天", pinyin: "tiān", hanViet: "thiên", radical: "大 (Đại)", mnemonic: "Mùa, bầu trời" }
    ],
    visualDistractors: ["春天", "夏天", "冬天", "种地"],
    homophones: ["秋天", "求天", "球天", "丘天", "囚天"],
    example: {
      hanzi: "北京的秋天不冷也不热，最舒服。",
      pinyin: "Běijīng de qiūtiān bù lěng yě bú rè, zuì shūfu.",
      meaning: "Mùa thu ở Bắc Kinh không lạnh cũng không nóng, dễ chịu nhất."
    }
  },
  {
    id: "L19_09",
    lesson: 19,
    lessonTitle: "你没看出来吗",
    hanzi: "过",
    pinyin: "guò",
    pinyinClean: "guo",
    hanViet: "quá",
    wordType: "v",
    meaning: "đón (sinh nhật, lễ tết); trải qua, đi qua",
    decomposition: [
      { char: "过", pinyin: "guò", hanViet: "quá", radical: "辶 (Sước - bước đi)", mnemonic: "Bước chân (辶) đi qua từng tấc (寸) thời gian" }
    ],
    visualDistractors: ["还", "近", "远", "寸"],
    homophones: ["过", "国", "果", "锅", "裹"],
    example: {
      hanzi: "祝你过一个快乐的生日！",
      pinyin: "Zhù nǐ guò yí gè kuàilè de shēngrì!",
      meaning: "Chúc bạn đón một sinh nhật thật vui vẻ!"
    }
  },
  {
    id: "L19_10",
    lesson: 19,
    lessonTitle: "你没看出来吗",
    hanzi: "鸟",
    pinyin: "niǎo",
    pinyinClean: "niao",
    hanViet: "điểu",
    wordType: "n",
    meaning: "con chim",
    decomposition: [
      { char: "鸟", pinyin: "niǎo", hanViet: "điểu", radical: "鸟 (Điểu - chim)", mnemonic: "Hình con chim có chấm mắt (丶) trên đầu (quạ 乌 đen nên không thấy mắt)" }
    ],
    visualDistractors: ["乌", "马", "鸡", "鸭"],
    homophones: ["鸟", "袅", "茑", "尿", "嬲"],
    example: {
      hanzi: "树上有很多小鸟在唱歌。",
      pinyin: "Shù shàng yǒu hěn duō xiǎoniǎo zài chànggē.",
      meaning: "Trên cây có rất nhiều chú chim nhỏ đang hót."
    }
  },
  {
    id: "L19_11",
    lesson: 19,
    lessonTitle: "你没看出来吗",
    hanzi: "哭",
    pinyin: "kū",
    pinyinClean: "ku",
    hanViet: "khốc",
    wordType: "v",
    meaning: "khóc",
    decomposition: [
      { char: "哭", pinyin: "kū", hanViet: "khốc", radical: "口 (Khẩu - miệng)", mnemonic: "Hai cái miệng (口口) như hai mắt rơi lệ (犬) khóc lớn" }
    ],
    visualDistractors: ["笑", "器", "犬", "太"],
    homophones: ["哭", "苦", "库", "裤", "酷"],
    example: {
      hanzi: "孩子找不到妈妈，急得哭了起来。",
      pinyin: "Háizi zhǎo bú dào māma, jí de kūle qǐlái.",
      meaning: "Đứa bé không tìm thấy mẹ, cuống quá bật khóc lên."
    }
  },
  {
    id: "L19_12",
    lesson: 19,
    lessonTitle: "你没看出来吗",
    hanzi: "黄河",
    pinyin: "Huánghé",
    pinyinClean: "huanghe",
    hanViet: "Hoàng Hà",
    wordType: "n",
    meaning: "sông Hoàng Hà",
    decomposition: [
      { char: "黄", pinyin: "huáng", hanViet: "hoàng", radical: "黄 (Hoàng - màu vàng)", mnemonic: "Màu vàng của đất phù sa cánh đồng (由)" },
      { char: "河", pinyin: "hé", hanViet: "hà", radical: "氵 (Chấm thủy - nước)", mnemonic: "Dòng nước (氵) chảy lớn (可) thành sông" }
    ],
    visualDistractors: ["河水", "黄色", "可乐", "江河"],
    homophones: ["黄河", "黄鹤", "黄盒", "皇河", "煌河"],
    example: {
      hanzi: "黄河是中国的第二长河。",
      pinyin: "Huánghé shì Zhōngguó de dì-èr cháng hé.",
      meaning: "Hoàng Hà là con sông dài thứ hai của Trung Quốc."
    }
  },
  {
    id: "L19_13",
    lesson: 19,
    lessonTitle: "你没看出来吗",
    hanzi: "船",
    pinyin: "chuán",
    pinyinClean: "chuan",
    hanViet: "thuyền",
    wordType: "n",
    meaning: "tàu thủy, cái thuyền",
    decomposition: [
      { char: "船", pinyin: "chuán", hanViet: "thuyền", radical: "舟 (Chu - thuyền)", mnemonic: "Chiếc thuyền (舟) chở tám (八) miệng ăn (口) vượt sông" }
    ],
    visualDistractors: ["一般", "搬家", "盘子", "沿"],
    homophones: ["船", "穿", "传", "串", "喘"],
    example: {
      hanzi: "我们可以坐船游览黄河。",
      pinyin: "Wǒmen kěyǐ zuò chuán yóulǎn Huánghé.",
      meaning: "Chúng ta có thể đi thuyền du ngoạn sông Hoàng Hà."
    }
  },
  {
    id: "L19_14",
    lesson: 19,
    lessonTitle: "你没看出来吗",
    hanzi: "经过",
    pinyin: "jīngguò",
    pinyinClean: "jingguo",
    hanViet: "kinh qua",
    wordType: "v/prep",
    meaning: "đi ngang qua, trải qua",
    decomposition: [
      { char: "经", pinyin: "jīng", hanViet: "kinh", radical: "纟 (Mịch)", mnemonic: "Xuyên qua" },
      { char: "过", pinyin: "guò", hanViet: "quá", radical: "辶 (Sước)", mnemonic: "Đi qua" }
    ],
    visualDistractors: ["经理", "经常", "过去", "已经"],
    homophones: ["经过", "敬过", "惊过", "京过", "精过"],
    example: {
      hanzi: "每天上班我都要经过这家书店。",
      pinyin: "Měitiān shàngbān wǒ dōu yào jīngguò zhè jiā shūdiàn.",
      meaning: "Mỗi ngày đi làm tôi đều phải đi ngang qua hiệu sách này."
    }
  },

  // ==================== BÀI 20: 我被他影响了 ====================
  {
    id: "L20_01",
    lesson: 20,
    lessonTitle: "我被他影响了",
    hanzi: "照相机",
    pinyin: "zhàoxiàngjī",
    pinyinClean: "zhaoxiangji",
    hanViet: "chiếu tướng cơ",
    wordType: "n",
    meaning: "máy ảnh",
    decomposition: [
      { char: "照", pinyin: "zhào", hanViet: "chiếu", radical: "灬 (Hỏa)", mnemonic: "Chụp chiếu ánh sáng" },
      { char: "相", pinyin: "xiàng", hanViet: "tướng", radical: "目 (Mục - mắt)", mnemonic: "Dung mạo, hình tướng" },
      { char: "机", pinyin: "jī", hanViet: "cơ", radical: "木 (Mộc)", mnemonic: "Cỗ máy" }
    ],
    visualDistractors: ["照片", "相信", "手机", "飞机"],
    homophones: ["照相机", "照相集", "找相机", "朝相机", "兆相机"],
    example: {
      hanzi: "我新买了一个照相机，周末去公园拍照吧。",
      pinyin: "Wǒ xīn mǎile yí gè zhàoxiàngjī, zhōumò qù gōngyuán pāizhào ba.",
      meaning: "Tôi mới mua một chiếc máy ảnh, cuối tuần ra công viên chụp ảnh nhé."
    }
  },
  {
    id: "L20_02",
    lesson: 20,
    lessonTitle: "我被他影响了",
    hanzi: "被",
    pinyin: "bèi",
    pinyinClean: "bei",
    hanViet: "bị",
    wordType: "prep",
    meaning: "bị, được (giới từ câu bị động)",
    decomposition: [
      { char: "被", pinyin: "bèi", hanViet: "bị", radical: "衤 (Y - chăn áo)", mnemonic: "Tấm chăn vải (衤) phủ lên lớp da (皮) — chịu sự tác động" }
    ],
    visualDistractors: ["裤子", "衬衫", "裙子", "皮鞋"],
    homophones: ["被", "倍", "背", "杯", "备"],
    example: {
      hanzi: "桌上的蛋糕被弟弟吃完了。",
      pinyin: "Zhuō shàng de dàngāo bèi dìdi chīwán le.",
      meaning: "Chiếc bánh kem trên bàn đã bị em trai ăn hết rồi."
    }
  },
  {
    id: "L20_03",
    lesson: 20,
    lessonTitle: "我被他影响了",
    hanzi: "难过",
    pinyin: "nánguò",
    pinyinClean: "nanguo",
    hanViet: "nan quá",
    wordType: "adj",
    meaning: "buồn bã, đau lòng",
    decomposition: [
      { char: "难", pinyin: "nán", hanViet: "nan", radical: "隹 (Chuy)", mnemonic: "Khó khăn" },
      { char: "过", pinyin: "guò", hanViet: "quá", radical: "辶 (Sước)", mnemonic: "Vượt qua (trong lòng khó vượt qua nên buồn)" }
    ],
    visualDistractors: ["容易", "过去", "经过", "难看"],
    homophones: ["难过", "南国", "难果", "男过", "喃过"],
    example: {
      hanzi: "听到他要离开的消息，大家都很难过。",
      pinyin: "Tīngdào tā yào líkāi de xiāoxi, dàjiā dōu hěn nánguò.",
      meaning: "Nghe tin anh ấy sắp rời đi, mọi người đều rất buồn."
    }
  },
  {
    id: "L20_04",
    lesson: 20,
    lessonTitle: "我被他影响了",
    hanzi: "东",
    pinyin: "dōng",
    pinyinClean: "dong",
    hanViet: "đông",
    wordType: "n",
    meaning: "phía Đông, hướng Đông",
    decomposition: [
      { char: "东", pinyin: "dōng", hanViet: "đông", radical: "一 (Nhất)", mnemonic: "Mặt trời mọc xuyên qua tán cây ở hướng Đông" }
    ],
    visualDistractors: ["车", "练", "冻", "栋"],
    homophones: ["东", "冬", "懂", "动", "洞"],
    example: {
      hanzi: "从这儿一直往东走，就能看到地铁站。",
      pinyin: "Cóng zhèr yìzhí wǎng dōng zǒu, jiù néng kàndào dìtiězhàn.",
      meaning: "Từ đây đi thẳng về hướng Đông là sẽ nhìn thấy ga tàu điện ngầm."
    }
  },
  {
    id: "L20_05",
    lesson: 20,
    lessonTitle: "我被他影响了",
    hanzi: "信用卡",
    pinyin: "xìnyòngkǎ",
    pinyinClean: "xinyongka",
    hanViet: "tín dụng tạp",
    wordType: "n",
    meaning: "thẻ tín dụng",
    decomposition: [
      { char: "信", pinyin: "xìn", hanViet: "tín", radical: "亻 (Nhân đứng)", mnemonic: "Chữ tín" },
      { char: "用", pinyin: "yòng", hanViet: "dụng", radical: "用 (Dụng)", mnemonic: "Sử dụng" },
      { char: "卡", pinyin: "kǎ", hanViet: "tạp", radical: "卜 (Bốc)", mnemonic: "Trên (上) dưới (下) ghép lại thành chiếc thẻ" }
    ],
    visualDistractors: ["相信", "银行", "名片", "上下"],
    homophones: ["信用卡", "心用卡", "新用卡", "信拥卡", "欣用卡"],
    example: {
      hanzi: "去大超市买东西可以用信用卡付钱。",
      pinyin: "Qù dà chāoshì mǎi dōngxi kěyǐ yòng xìnyòngkǎ fùqián.",
      meaning: "Đi siêu thị lớn mua đồ có thể dùng thẻ tín dụng để thanh toán."
    }
  },
  {
    id: "L20_06",
    lesson: 20,
    lessonTitle: "我被他影响了",
    hanzi: "关心",
    pinyin: "guānxīn",
    pinyinClean: "guanxin",
    hanViet: "quan tâm",
    wordType: "v",
    meaning: "quan tâm",
    decomposition: [
      { char: "关", pinyin: "guān", hanViet: "quan", radical: "八 (Bát)", mnemonic: "Liên hệ mật thiết" },
      { char: "心", pinyin: "xīn", hanViet: "tâm", radical: "心 (Tâm - tim)", mnemonic: "Đặt vào trái tim" }
    ],
    visualDistractors: ["关系", "关于", "放心", "担心"],
    homophones: ["关心", "观心", "官心", "冠心", "管心"],
    example: {
      hanzi: "谢谢你一直这么关心我的学习和生活。",
      pinyin: "Xièxie nǐ yìzhí zhème guānxīn wǒ de xuéxí hé shēnghuó.",
      meaning: "Cảm ơn bạn đã luôn quan tâm đến việc học và cuộc sống của tôi như vậy."
    }
  },
  {
    id: "L20_07",
    lesson: 20,
    lessonTitle: "我被他影响了",
    hanzi: "只有",
    pinyin: "zhǐyǒu",
    pinyinClean: "zhiyou",
    hanViet: "chỉ hữu",
    wordType: "conj",
    meaning: "chỉ có (只有...才...: chỉ có... mới...)",
    decomposition: [
      { char: "只", pinyin: "zhǐ", hanViet: "chỉ", radical: "口 (Khẩu)", mnemonic: "Duy nhất" },
      { char: "有", pinyin: "yǒu", hanViet: "hữu", radical: "月 (Nhục)", mnemonic: "Có được" }
    ],
    visualDistractors: ["只要", "只是", "有名", "朋友"],
    homophones: ["只有", "挚友", "知友", "指有", "纸有"],
    example: {
      hanzi: "只有多读多写，才能真正记住汉字。",
      pinyin: "Zhǐyǒu duō dú duō xiě, cáinéng zhēnzhèng jìzhù Hànzì.",
      meaning: "Chỉ có đọc nhiều viết nhiều mới có thể thực sự nhớ được chữ Hán."
    }
  },
  {
    id: "L20_08",
    lesson: 20,
    lessonTitle: "我被他影响了",
    hanzi: "成绩",
    pinyin: "chéngjì",
    pinyinClean: "chengji",
    hanViet: "thành tích",
    wordType: "n",
    meaning: "thành tích, điểm số",
    decomposition: [
      { char: "成", pinyin: "chéng", hanViet: "thành", radical: "戈 (Qua)", mnemonic: "Đạt được" },
      { char: "绩", pinyin: "jì", hanViet: "tích", radical: "纟 (Mịch - sợi tơ)", mnemonic: "Công sức se tơ (纟) gánh vác trách nhiệm (责) tạo nên thành quả" }
    ],
    visualDistractors: ["完成", "城市", "继续", "年级"],
    homophones: ["成绩", "成迹", "承继", "城际", "乘机"],
    example: {
      hanzi: "经过一个学期的努力，他的成绩提高了不少。",
      pinyin: "Jīngguò yí gè xuéqī de nǔlì, tā de chéngjì tígāole bùshǎo.",
      meaning: "Trải qua một học kỳ nỗ lực, điểm số của cậu ấy đã nâng cao không ít."
    }
  },
  {
    id: "L20_09",
    lesson: 20,
    lessonTitle: "我被他影响了",
    hanzi: "碗",
    pinyin: "wǎn",
    pinyinClean: "wan",
    hanViet: "oản",
    wordType: "n/mw",
    meaning: "cái bát, cái chén",
    decomposition: [
      { char: "碗", pinyin: "wǎn", hanViet: "oản", radical: "石 (Thạch - đá/sành sứ)", mnemonic: "Đồ sành sứ (石) khum tròn (宛) dùng làm bát ăn cơm" }
    ],
    visualDistractors: ["盘子", "杯子", "瓶子", "筷子"],
    homophones: ["碗", "晚", "完", "玩", "万"],
    example: {
      hanzi: "吃完饭以后，妹妹主动去洗碗。",
      pinyin: "Chīwán fàn yǐhòu, mèimei zhǔdòng qù xǐ wǎn.",
      meaning: "Sau khi ăn cơm xong, em gái chủ động đi rửa bát."
    }
  },
  {
    id: "L20_10",
    lesson: 20,
    lessonTitle: "我被他影响了",
    hanzi: "分",
    pinyin: "fēn",
    pinyinClean: "fen",
    hanViet: "phân",
    wordType: "v",
    meaning: "phân biệt, tách ra, chia ra",
    decomposition: [
      { char: "分", pinyin: "fēn", hanViet: "phân", radical: "刀 (Đao - con dao)", mnemonic: "Dùng dao (刀) cắt tách ra làm hai bên (八)" }
    ],
    visualDistractors: ["份", "公", "办", "切"],
    homophones: ["分", "风", "封", "疯", "峰"],
    example: {
      hanzi: "这两个汉字长得太像了，我总是分不清楚。",
      pinyin: "Zhè liǎng gè Hànzì zhǎng de tài xiàng le, wǒ zǒngshì fēn bù qīngchu.",
      meaning: "Hai chữ Hán này trông giống nhau quá, tôi cứ không phân biệt rõ được."
    }
  },
  {
    id: "L20_11",
    lesson: 20,
    lessonTitle: "我被他影响了",
    hanzi: "解决",
    pinyin: "jiějué",
    pinyinClean: "jiejue",
    hanViet: "giải quyết",
    wordType: "v",
    meaning: "giải quyết, tháo gỡ",
    decomposition: [
      { char: "解", pinyin: "jiě", hanViet: "giải", radical: "角 (Giác - sừng)", mnemonic: "Tháo gỡ nút thắt" },
      { char: "决", pinyin: "jué", hanViet: "quyết", radical: "冫 (Băng)", mnemonic: "Quyết đoán xử lý" }
    ],
    visualDistractors: ["了解", "决定", "办法", "结束"],
    homophones: ["解决", "姐夫", "戒绝", "借据", "洁净"],
    example: {
      hanzi: "遇到困难不要害怕，大家一起想办法解决。",
      pinyin: "Yùdào kùnnan búyào hàipà, dàjiā yìqǐ xiǎng bànfǎ jiějué.",
      meaning: "Gặp khó khăn đừng sợ hãi, mọi người cùng nhau nghĩ cách giải quyết."
    }
  },
  {
    id: "L20_12",
    lesson: 20,
    lessonTitle: "我被他影响了",
    hanzi: "试",
    pinyin: "shì",
    pinyinClean: "shi",
    hanViet: "thí",
    wordType: "v",
    meaning: "thử, thi",
    decomposition: [
      { char: "试", pinyin: "shì", hanViet: "thí", radical: "讠 (Ngôn - lời nói)", mnemonic: "Dùng lời hỏi (讠) và quy tắc (式) để kiểm nghiệm, thử nghiệm" }
    ],
    visualDistractors: ["考试", "式样", "认识", "说"],
    homophones: ["试", "是", "事", "市", "室"],
    example: {
      hanzi: "这件衬衫颜色不错，你可以试试。",
      pinyin: "Zhè jiàn chènshān yánsè búcuò, nǐ kěyǐ shìshi.",
      meaning: "Chiếc áo sơ mi này màu sắc khá đẹp, bạn có thể mặc thử xem."
    }
  },
  {
    id: "L20_13",
    lesson: 20,
    lessonTitle: "我被他影响了",
    hanzi: "真正",
    pinyin: "zhēnzhèng",
    pinyinClean: "zhenzheng",
    hanViet: "chân chính",
    wordType: "adj/adv",
    meaning: "thực sự, chân chính",
    decomposition: [
      { char: "真", pinyin: "zhēn", hanViet: "chân", radical: "目 (Mục)", mnemonic: "Chân thật" },
      { char: "正", pinyin: "zhèng", hanViet: "chính", radical: "止 (Chỉ)", mnemonic: "Đúng đắn, ngay thẳng" }
    ],
    visualDistractors: ["认真", "正在", "一直", "一定"],
    homophones: ["真正", "端正", "阵阵", "震正", "珍正"],
    example: {
      hanzi: "真正的朋友会在你困难的时候帮助你。",
      pinyin: "Zhēnzhèng de péngyou huì zài nǐ kùnnan de shíhou bāngzhù nǐ.",
      meaning: "Người bạn thực sự sẽ giúp đỡ bạn vào lúc bạn gặp khó khăn."
    }
  },
  {
    id: "L20_14",
    lesson: 20,
    lessonTitle: "我被他影响了",
    hanzi: "多么",
    pinyin: "duōme",
    pinyinClean: "duome",
    hanViet: "đa ma",
    wordType: "adv",
    meaning: "biết bao, xiết bao (câu cảm thán)",
    decomposition: [
      { char: "多", pinyin: "duō", hanViet: "đa", radical: "夕 (Tịch)", mnemonic: "Hai buổi chiều (夕) chồng lên nhau là nhiều" },
      { char: "么", pinyin: "me", hanViet: "ma", radical: "丿 (Phiệt)", mnemonic: "Hậu tố từ nghi vấn/cảm thán" }
    ],
    visualDistractors: ["多少", "什么", "怎么", "那么"],
    homophones: ["多么", "夺么", "朵么", "舵么", "惰么"],
    example: {
      hanzi: "你看，春天的公园多么漂亮啊！",
      pinyin: "Nǐ kàn, chūntiān de gōngyuán duōme piàoliang a!",
      meaning: "Bạn nhìn kìa, công viên mùa xuân đẹp biết bao!"
    }
  }
];

/**
 * Character-level Gloss Dictionary for Context Cloze Rescue & Radical Explorer
 */
window.HSK3_CHAR_GLOSS = {
  "我": "tôi (ngã)", "你": "bạn (nhĩ)", "他": "anh ấy (tha)", "她": "cô ấy (tha)", "们": "các/chúng (môn)",
  "的": "của (đích)", "了": "rồi (liễu)", "吗": "không? (ma)", "呢": "thế/đấy (ni)", "吧": "nhé/đi (ba)",
  "在": "ở/đang (tại)", "是": "là (thị)", "有": "có (hữu)", "没": "không/chưa (một)", "不": "không (bất)",
  "很": "rất (ngận)", "都": "đều (đô)", "也": "cũng (dã)", "还": "vẫn/còn/trả (hoàn)", "就": "thì/ngay (tựu)",
  "要": "muốn/cần/sắp (yếu)", "会": "sẽ/biết/họp (hội)", "能": "có thể (năng)", "可": "có thể (khả)", "以": "để/lấy (dĩ)",
  "去": "đi (khứ)", "来": "đến (lai)", "回": "về (hồi)", "到": "đến/tới (đáo)", "走": "đi bộ (tẩu)",
  "看": "nhìn/xem/khám (khán)", "听": "nghe (thính)", "说": "nói (thuyết)", "读": "đọc (độc)", "写": "viết (tả)",
  "吃": "ăn (ngật)", "喝": "uống (hát)", "买": "mua (mãi)", "卖": "bán (mại)", "穿": "mặc (xuyên)",
  "住": "ở/sống (trú)", "坐": "ngồi/đi xe (tọa)", "开": "mở/lái (khai)", "关": "đóng/tắt (quan)", "找": "tìm (trảo)",
  "今": "nay (kim)", "明": "mai/rõ (minh)", "昨": "hôm qua (tạc)", "天": "trời/ngày (thiên)", "年": "năm (niên)",
  "月": "tháng/trăng (nguyệt)", "日": "ngày/mặt trời (nhật)", "星": "sao (tinh)", "期": "kỳ/tuần (kỳ)", "点": "giờ/chút (điểm)",
  "分": "phút/chia (phân)", "早": "sớm (tảo)", "上": "trên/lên (thượng)", "下": "dưới/xuống (hạ)", "午": "trưa (ngọ)",
  "晚": "tối/muộn (vãn)", "前": "trước (tiền)", "后": "sau (hậu)", "里": "trong (lý)", "外": "ngoài (ngoại)",
  "左": "trái (tả)", "右": "phải (hữu)", "东": "Đông (đông)", "西": "Tây (tây)", "南": "Nam (nam)", "北": "Bắc (bắc)",
  "大": "to/lớn (đại)", "小": "nhỏ (tiểu)", "多": "nhiều (đa)", "少": "ít (thiểu)", "好": "tốt/đẹp (hảo)",
  "坏": "hỏng/xấu (hoại)", "冷": "lạnh (lãnh)", "热": "nóng (nhiệt)", "高": "cao (cao)", "兴": "hứng/vui (hưng)",
  "漂": "đẹp (phiêu)", "亮": "sáng (lượng)", "快": "nhanh/vui (khoái)", "慢": "chậm (mạn)", "忙": "bận (mang)",
  "累": "mệt (lũy)", "贵": "đắt (quý)", "便宜": "rẻ", "新": "mới (tân)", "旧": "cũ (cựu)",
  "人": "người (nhân)", "家": "nhà/gia đình (gia)", "学": "học (học)", "校": "trường (hiệu)", "生": "sinh/học sinh",
  "老": "già/thầy (lão)", "师": "thầy (sư)", "朋": "bạn (bằng)", "友": "bạn (hữu)", "医": "y/bác sĩ",
  "院": "viện (viện)", "公": "công cộng (công)", "司": "công ty (tư)", "商": "thương mại", "店": "cửa hàng (điếm)",
  "饭": "cơm (phạn)", "馆": "quán/nhà (quán)", "水": "nước (thủy)", "果": "quả (quả)", "茶": "trà (trà)",
  "咖": "cà (gia)", "啡": "phê (phi)", "牛": "bò (ngưu)", "奶": "sữa/bà (nãi)", "菜": "rau/món ăn (thái)",
  "米": "gạo (mễ)", "面": "mì/mặt (diện)", "肉": "thịt (nhục)", "鱼": "cá (ngư)", "鸡": "gà (kê)",
  "衣": "áo (y)", "服": "trang phục (phục)", "车": "xe (xa)", "飞": "bay (phi)", "机": "máy (cơ)",
  "火": "lửa (hỏa)", "电": "điện (điện)", "视": "nhìn/tivi (thị)", "脑": "não/máy tính", "影": "bóng/phim (ảnh)",
  "话": "lời nói (thoại)", "书": "sách (thư)", "字": "chữ (tự)", "汉": "Hán (Hán)", "语": "ngôn ngữ (ngữ)",
  "题": "đề/câu hỏi (đề)", "问": "hỏi (vấn)", "课": "bài học (khóa)", "考": "thi (khảo)", "试": "thử/thi (thí)",
  "工": "công việc (công)", "作": "làm (tác)", "休": "nghỉ (hưu)", "息": "hơi thở/nghỉ (tức)", "睡": "ngủ (thụy)",
  "觉": "giấc/cảm thấy (giác)", "床": "giường (sàng)", "房": "phòng (phòng)", "间": "gian/khoảng (gian)", "门": "cửa (môn)",
  "桌": "bàn (trác)", "椅": "ghế (ỷ)", "钱": "tiền (tiền)", "块": "đồng/miếng (khoái)", "元": "đồng (nguyên)",
  "件": "chiếc/việc (kiện)", "张": "tờ/cái (trương)", "本": "quyển (bản)", "个": "cái/người (cá)", "位": "vị (vị)",
  "双": "đôi (song)", "杯": "cốc (bôi)", "瓶": "chai (bình)", "碗": "bát (oản)", "盘": "đĩa (bàn)",
  "爸": "bố (ba)", "妈": "mẹ (ma)", "哥": "anh trai (ca)", "姐": "chị gái (tỷ)", "弟": "em trai (đệ)", "妹": "em gái (muội)",
  "儿": "con (nhi)", "女": "nữ/con gái (nữ)", "子": "con/hậu tố (tử)", "先": "trước (tiên)", "生": "sinh",
  "王": "họ Vương/vua", "李": "họ Lý", "张": "họ Trương", "中": "Trung/giữa", "国": "nước (quốc)", "北": "Bắc", "京": "Kinh đô",
  "上": "trên/Thượng", "海": "biển/Hải", "雨": "mưa (vũ)", "雪": "tuyết (tuyết)", "风": "gió (phong)", "晴": "nắng (tình)",
  "阴": "âm u (âm)", "气": "khí/thời tiết", "候": "thời điểm (hậu)", "时": "thời gian (thì)", "什": "gì (thập)", "么": "gì (ma)",
  "怎": "sao/thế nào (chẩm)", "样": "dạng/kiểu (dạng)", "哪": "nào/đâu (ná)", "这": "này (giá)", "那": "kia (na)",
  "谁": "ai (thùy)", "几": "mấy (kỷ)", "一": "một", "二": "hai", "两": "hai", "三": "ba", "四": "bốn", "五": "năm",
  "六": "sáu", "七": "bảy", "八": "tám", "九": "chín", "十": "mười", "百": "trăm", "千": "nghìn", "万": "vạn",
  "红": "đỏ (hồng)", "白": "trắng (bạch)", "黑": "đen (hắc)", "黄": "vàng (hoàng)", "蓝": "xanh lam (lam)", "绿": "xanh lá (lục)",
  "色": "màu sắc (sắc)", "真": "thật (chân)", "太": "quá/lắm (thái)", "最": "nhất (tối)", "更": "hơn (cánh)", "非": "vô/phi", "常": "thường",
  "别": "đừng/khác (biệt)", "让": "bảo/nhường (nhượng)", "给": "cho (cấp)", "把": "đem/chiếc (bả)", "被": "bị/được (bị)",
  "对": "đúng/đối với (đối)", "从": "từ (tùng)", "往": "hướng về (vãng)", "离": "cách/rời (ly)", "比": "so với (tỷ)",
  "跟": "cùng/với (cân)", "和": "và (hòa)", "因": "vì (nhân)", "为": "vì/là (vị)", "所": "cho nên (sở)", "虽": "tuy (tuy)", "然": "nhiên",
  "但": "nhưng (đãn)", "如": "nếu (như)", "果": "quả", "只": "chỉ (chỉ)", "才": "mới (tài)", "正": "đang/chính", "着": "đang/được",
  "过": "qua/từng (quá)", "起": "dậy/lên (khởi)", "出": "ra (xuất)", "进": "vào (tiến)", "送": "tặng/tiễn (tống)"
};


/**
 * HSK 3 Sentence Jumble (連詞成句 - HSK 3 Writing Part 1 & Grammar Patterns)
 * Pure Hanzi chunks with grammar notes for Game 8
 */
window.HSK3_SENTENCE_JUMBLE = [
  {
    id: "SJ_01",
    lesson: 1,
    chunks: ["我", "打算", "周末", "跟朋友", "去爬山"],
    answer: "我打算周末跟朋友去爬山",
    altAnswers: ["周末我打算跟朋友去爬山"],
    pinyin: "Wǒ dǎsuàn zhōumò gēn péngyou qù páshān.",
    meaning: "Tôi dự định cuối tuần đi leo núi cùng với bạn bè.",
    grammar: "Cấu trúc: Chủ ngữ + 打算 + Thời gian + 跟 + Ai + Động từ (Dự định làm gì cùng ai)."
  },
  {
    id: "SJ_02",
    lesson: 2,
    chunks: ["外面", "下着大雨", "你", "带一把伞", "吧"],
    answer: "外面下着大雨你带一把伞吧",
    altAnswers: ["外面下着大雨，你带一把伞吧"],
    pinyin: "Wàimiàn xiàzhe dàyǔ, nǐ dài yì bǎ sǎn ba.",
    meaning: "Bên ngoài đang mưa to, bạn mang theo một chiếc ô nhé.",
    grammar: "Lượng từ 把 dùng cho vật có tay cầm (一把伞 - một chiếc ô) + Động từ thêm 着 chỉ trạng thái đang tiếp diễn."
  },
  {
    id: "SJ_03",
    lesson: 3,
    chunks: ["桌子上", "放着", "很多", "好喝的", "饮料"],
    answer: "桌子上放着很多好喝的饮料",
    altAnswers: [],
    pinyin: "Zhuōzi shàng fàngzhe hěnduō hǎohē de yǐnliào.",
    meaning: "Trên bàn đang đặt rất nhiều đồ uống ngon.",
    grammar: "Câu tồn hiện: Từ chỉ nơi chốn (桌子上) + Động từ + 着 (放着) + Cụm danh từ."
  },
  {
    id: "SJ_04",
    lesson: 4,
    chunks: ["她", "总是", "笑着", "跟客人", "说话"],
    answer: "她总是笑着跟客人说话",
    altAnswers: [],
    pinyin: "Tā zǒngshì xiàozhe gēn kèrén shuōhuà.",
    meaning: "Cô ấy luôn mỉm cười nói chuyện với khách hàng.",
    grammar: "Cấu trúc V1 + 着 + V2 (笑着说话): Vừa làm V2 vừa mang trạng thái V1."
  },
  {
    id: "SJ_05",
    lesson: 5,
    chunks: ["天气", "越来越冷", "你", "多穿点儿", "衣服"],
    answer: "天气越来越冷你多穿点儿衣服",
    altAnswers: [],
    pinyin: "Tiānqì yuèláiyuè lěng, nǐ duō chuān diǎnr yīfu.",
    meaning: "Thời tiết ngày càng lạnh, bạn mặc thêm chút quần áo đi.",
    grammar: "Cấu trúc 越来越 + Tính từ/Động từ tâm lý: Càng ngày càng..."
  },
  {
    id: "SJ_06",
    lesson: 6,
    chunks: ["我的眼镜", "怎么", "突然", "找不到了"],
    answer: "我的眼镜怎么突然找不到了",
    altAnswers: ["怎么我的眼镜突然找不到了"],
    pinyin: "Wǒ de yǎnjìng zěnme tūrán zhǎo bú dào le?",
    meaning: "Kính mắt của tôi sao đột nhiên không tìm thấy nữa rồi?",
    grammar: "Bổ ngữ khả năng phủ định: 找不到 (tìm không thấy) + 怎么 hỏi nguyên nhân đầy ngạc nhiên."
  },
  {
    id: "SJ_07",
    lesson: 7,
    chunks: ["我", "跟她", "已经", "认识", "五年了"],
    answer: "我跟她已经认识五年了",
    altAnswers: ["我已经跟她认识五年了"],
    pinyin: "Wǒ gēn tā yǐjīng rènshi wǔ nián le.",
    meaning: "Tôi và cô ấy đã quen biết nhau được 5 năm rồi.",
    grammar: "Bổ ngữ thời lượng: Động từ + Thời gian + 了 (biểu thị hành động/trạng thái đã kéo dài bao lâu)."
  },
  {
    id: "SJ_08",
    lesson: 8,
    chunks: ["你", "去哪儿", "我", "就", "去哪儿"],
    answer: "你去哪儿我就去哪儿",
    altAnswers: [],
    pinyin: "Nǐ qù nǎr wǒ jiù qù nǎr.",
    meaning: "Bạn đi đâu thì tôi đi đó.",
    grammar: "Đại từ nghi vấn lặp lại (哪儿... 哪儿... / 什么... 什么...) kết hợp với 就."
  },
  {
    id: "SJ_09",
    lesson: 9,
    chunks: ["她的汉语", "说得", "跟中国人", "一样好"],
    answer: "她的汉语说得跟中国人一样好",
    altAnswers: [],
    pinyin: "Tā de Hànyǔ shuō de gēn Zhōngguórén yíyàng hǎo.",
    meaning: "Tiếng Hán của cô ấy nói tốt giống như người Trung Quốc.",
    grammar: "So sánh ngang bằng: A + 跟 + B + 一样 (+ Tính từ)."
  },
  {
    id: "SJ_10",
    lesson: 10,
    chunks: ["数学", "比", "历史", "难多了"],
    answer: "数学比历史难多了",
    altAnswers: [],
    pinyin: "Shùxué bǐ lìshǐ nán duō le.",
    meaning: "Môn Toán khó hơn môn Lịch sử nhiều.",
    grammar: "Câu chữ 比: A + 比 + B + Tính từ + 多了 / 一点儿 / 得多."
  },
  {
    id: "SJ_11",
    lesson: 11,
    chunks: ["出门以前", "别忘了", "把空调", "关了"],
    answer: "出门以前别忘了把空调关了",
    altAnswers: ["别忘了出门以前把空调关了"],
    pinyin: "Chūmén yǐqián bié wàng le bǎ kōngtiáo guān le.",
    meaning: "Trước khi ra khỏi nhà đừng quên tắt điều hòa nhé.",
    grammar: "Câu chữ 把: Chủ ngữ + (别忘了) + 把 + Tân ngữ (空调) + Động từ (关) + Thành phần khác (了)."
  },
  {
    id: "SJ_12",
    lesson: 12,
    chunks: ["请", "把", "重要的东西", "放在", "我这儿"],
    answer: "请把重要的东西放在我这儿",
    altAnswers: [],
    pinyin: "Qǐng bǎ zhòngyào de dōngxi fàng zài wǒ zhèr.",
    meaning: "Xin hãy để những đồ vật quan trọng ở chỗ tôi.",
    grammar: "Câu chữ 把 với 在: 把 + Tân ngữ + Động từ + 在 + Vị trí."
  },
  {
    id: "SJ_13",
    lesson: 13,
    chunks: ["爸爸", "从北京", "买回来了", "很多礼物"],
    answer: "爸爸从北京买回来了很多礼物",
    altAnswers: [],
    pinyin: "Bàba cóng Běijīng mǎi huílai le hěnduō lǐwù.",
    meaning: "Bố đã mua mang về từ Bắc Kinh rất nhiều quà.",
    grammar: "Bổ ngữ xu hướng kép: Động từ (买) + 回来 (về hướng người nói)."
  },
  {
    id: "SJ_14",
    lesson: 14,
    chunks: ["请", "把", "桌子上的水果", "洗干净"],
    answer: "请把桌子上的水果洗干净",
    altAnswers: [],
    pinyin: "Qǐng bǎ zhuōzi shàng de shuǐguǒ xǐ gānjìng.",
    meaning: "Hãy rửa sạch hoa quả ở trên bàn đi.",
    grammar: "Câu chữ 把 kết hợp bổ ngữ kết quả: 把 + Tân ngữ + 洗 (rửa) + 干净 (sạch)."
  },
  {
    id: "SJ_15",
    lesson: 15,
    chunks: ["除了", "这道题以外", "其他", "都很容易"],
    answer: "除了这道题以外其他都很容易",
    altAnswers: [],
    pinyin: "Chúle zhè dào tí yǐwài, qítā dōu hěn róngyì.",
    meaning: "Trừ câu hỏi này ra, những câu khác đều rất dễ.",
    grammar: "Cấu trúc loại trừ: 除了... 以外，其他 / 都... (Trừ... ra, còn lại đều...)."
  },
  {
    id: "SJ_16",
    lesson: 16,
    chunks: ["我现在", "累得", "下了班", "就想睡觉"],
    answer: "我现在累得下了班就想睡觉",
    altAnswers: [],
    pinyin: "Wǒ xiànzài lèi de xiàle bān jiù xiǎng shuìjiào.",
    meaning: "Bây giờ tôi mệt đến mức vừa tan làm là muốn đi ngủ ngay.",
    grammar: "Bổ ngữ mức độ với 得: Tính từ/Động từ + 得 + Mệnh đề miêu tả mức độ."
  },
  {
    id: "SJ_17",
    lesson: 17,
    chunks: ["只要", "你努力学习", "汉语水平", "就会提高"],
    answer: "只要你努力学习汉语水平就会提高",
    altAnswers: [],
    pinyin: "Zhǐyào nǐ nǔlì xuéxí, Hànyǔ shuǐpíng jiù huì tígāo.",
    meaning: "Chỉ cần bạn chăm chỉ học tập, trình độ tiếng Hán sẽ nâng cao.",
    grammar: "Cấu trúc điều kiện đủ: 只要... 就... (Chỉ cần... thì...)."
  },
  {
    id: "SJ_18",
    lesson: 18,
    chunks: ["关于", "这个问题", "我相信", "他们会同意的"],
    answer: "关于这个问题我相信他们会同意的",
    altAnswers: ["我相信关于这个问题他们会同意的"],
    pinyin: "Guānyú zhège wèntí, wǒ xiāngxìn tāmen huì tóngyì de.",
    meaning: "Về vấn đề này, tôi tin rằng họ sẽ đồng ý thôi.",
    grammar: "Giới từ 关于 + Cụm danh từ (Về vấn đề gì đó) đứng đầu câu."
  },
  {
    id: "SJ_19",
    lesson: 19,
    chunks: ["我", "一眼", "就", "看出来", "他是谁了"],
    answer: "我一眼就看出来他是谁了",
    altAnswers: [],
    pinyin: "Wǒ yìyǎn jiù kàn chūlai tā shì shuí le.",
    meaning: "Tôi nhìn thoáng qua một cái là nhận ra ngay anh ấy là ai.",
    grammar: "Bổ ngữ xu hướng mở rộng nghĩa: 看出来 (nhìn ra / nhận ra), 听出来 (nghe ra)."
  },
  {
    id: "SJ_20",
    lesson: 20,
    chunks: ["桌子上的蛋糕", "被", "弟弟", "吃完了"],
    answer: "桌子上的蛋糕被弟弟吃完了",
    altAnswers: [],
    pinyin: "Zhuōzi shàng de dàngāo bèi dìdi chī wán le.",
    meaning: "Chiếc bánh kem trên bàn đã bị em trai ăn hết rồi.",
    grammar: "Câu bị động chữ 被: Chủ ngữ chịu tác động + 被 + Tác nhân (弟弟) + Động từ + Kết quả (吃完了)."
  }
];

/**
 * HSK 3 Pure-Hanzi Mini-Dialogues (Lessons 1 - 20) for Zero-Pinyin Reading Comprehension
 */
window.HSK3_MINI_DIALOGUES = [
  {
    lesson: 1,
    title: "周末你有什么打算",
    grammarNote: "Động từ 打算 (dự định) & trợ từ ngữ khí 吧",
    lines: [
      { speaker: "小丽", hanzi: "周末你有什么打算？我们一起去看电影吧。", pinyin: "Zhōumò nǐ yǒu shénme dǎsuàn? Wǒmen yìqǐ qù kàn diànyǐng ba.", meaning: "Cuối tuần bạn có dự định gì? Chúng mình cùng đi xem phim nhé." },
      { speaker: "小刚", hanzi: "我还没决定呢，最近工作一直很忙，我想在家休息。", pinyin: "Wǒ hái méi juédìng ne, zuìjìn gōngzuò yìzhí hěn máng, wǒ xiǎng zài jiā xiūxi.", meaning: "Mình vẫn chưa quyết định nữa, dạo này công việc suốt ngày bận rộn, mình muốn ở nhà nghỉ ngơi." },
      { speaker: "小丽", hanzi: "那我们星期六先在家复习汉语，星期天再去爬山怎么样？", pinyin: "Nà wǒmen xīngqīliù xiān zài jiā fùxí Hànyǔ, xīngqītiān zài qù páshān zěnmeyàng?", meaning: "Vậy thứ Bảy chúng mình ôn tập tiếng Hán ở nhà trước, Chủ nhật rồi đi leo núi thế nào?" }
    ],
    question: {
      prompt: "小刚为什么周末想在家休息？",
      options: ["因为他感冒了", "因为最近工作一直很忙", "因为外面下大雨", "因为电影不好看"],
      answer: "因为最近工作一直很忙",
      explanation: "Trong câu 2, Tiểu Cương nói: “最近工作一直很忙，我想在家休息” (Dạo này công việc luôn rất bận)."
    }
  },
  {
    lesson: 2,
    title: "他什么时候回来",
    grammarNote: "Bổ ngữ xu hướng đơn (回来, 进去, 上楼) & lượng từ 把, 辆",
    lines: [
      { speaker: "经理", hanzi: "小王去哪儿了？他什么时候回来？", pinyin: "Xiǎo Wáng qù nǎr le? Tā shénme shíhou huílai?", meaning: "Tiểu Vương đi đâu rồi? Khi nào cậu ấy quay về?" },
      { speaker: "秘书", hanzi: "他刚下楼去拿一把伞，外面正在下大雨呢。", pinyin: "Tā gāng xià lóu qù ná yì bǎ sǎn, wàimiàn zhèngzài xià dàyǔ ne.", meaning: "Cậu ấy vừa xuống lầu đi lấy một chiếc ô, bên ngoài đang mưa to lắm." },
      { speaker: "经理", hanzi: "好，他回来以后，让他马上来我办公室。", pinyin: "Hǎo, tā huílai yǐhòu, ràng tā mǎshàng lái wǒ bàngōngshì.", meaning: "Được, sau khi cậu ấy về, bảo cậu ấy đến văn phòng tôi ngay nhé." }
    ],
    question: {
      prompt: "小王下楼去做什么了？",
      options: ["去买咖啡", "去拿一把伞", "去见客户", "去修电脑"],
      answer: "去拿一把伞",
      explanation: "Thư ký trả lời: “他刚下楼去拿一把伞” (Cậu ấy vừa xuống lầu lấy một chiếc ô)."
    }
  },
  {
    lesson: 3,
    title: "桌子上放着很多饮料",
    grammarNote: "Câu tồn hiện với 着 (放着, 写着) & 还是 vs 或者",
    lines: [
      { speaker: "周太太", hanzi: "今天天气真热，桌子上放着很多饮料，你想喝点儿什么？", pinyin: "Jīntiān tiānqì zhēn rè, zhuōzi shàng fàngzhe hěnduō yǐnliào, nǐ xiǎng hē diǎnr shénme?", meaning: "Hôm nay thời tiết nóng thật, trên bàn đặt rất nhiều đồ uống, anh muốn uống chút gì?" },
      { speaker: "周先生", hanzi: "给我一杯绿茶或者咖啡都可以，别放糖。", pinyin: "Gěi wǒ yì bēi lǜchá huòzhě kāfēi dōu kěyǐ, bié fàng táng.", meaning: "Cho anh một cốc trà xanh hoặc cà phê đều được, đừng bỏ đường." }
    ],
    question: {
      prompt: "周先生想喝什么？",
      options: ["热牛奶", "绿茶或者咖啡", "西瓜汁", "冰可乐"],
      answer: "绿茶或者咖啡",
      explanation: "Chu tiên sinh dùng 或者 trong câu trần thuật: “给我一杯绿茶或者咖啡都可以”."
    }
  },
  {
    lesson: 4,
    title: "她总是笑着跟客人说话",
    grammarNote: "Cấu trúc V1 + 着 + V2 (笑着说话, 站着等)",
    lines: [
      { speaker: "顾客", hanzi: "那位穿红衬衫的服务员是谁？她非常热情。", pinyin: "Nà wèi chuān hóng chènshān de fúwùyuán shì shuí? Tā fēicháng rèqíng.", meaning: "Vị nhân viên phục vụ mặc áo sơ mi đỏ kia là ai? Cô ấy vô cùng nhiệt tình." },
      { speaker: "店长", hanzi: "她叫小夏，年轻又努力，总是笑着跟客人说话。", pinyin: "Tā jiào Xiǎo Xià, niánqīng yòu nǔlì, zǒngshì xiàozhe gēn kèrén shuōhuà.", meaning: "Cô ấy tên Tiểu Hạ, trẻ trung lại chăm chỉ, luôn mỉm cười nói chuyện với khách." }
    ],
    question: {
      prompt: "小夏穿什么颜色的衬衫？",
      options: ["白色", "黄色", "红色", "蓝色"],
      answer: "红色",
      explanation: "Trong câu đầu có cụm “那位穿红衬衫的服务员” (nhân viên mặc áo sơ mi đỏ)."
    }
  },
  {
    lesson: 5,
    title: "我最近越来越胖了",
    grammarNote: "Cấu trúc 越来越 + Adj/V (ngày càng...) & trợ từ 了 chỉ sự thay đổi",
    lines: [
      { speaker: "小丽", hanzi: "我最近越来越胖了，去年的裤子现在都不能穿了。", pinyin: "Wǒ zuìjìn yuèláiyuè pàng le, qùnián de kùzi xiànzài dōu bù néng chuān le.", meaning: "Dạo này mình ngày càng béo lên rồi, quần năm ngoái giờ đều không mặc được nữa." },
      { speaker: "妈妈", hanzi: "因为你每天吃完晚饭就躺在沙发上看电视，不爱运动。", pinyin: "Yīnwèi nǐ měitiān chī wán wǎnfàn jiù tǎng zài shāfā shàng kàn diànshì, bú ài yùndòng.", meaning: "Bởi vì con mỗi ngày ăn tối xong là nằm trên ghế sofa xem tivi, không chịu vận động." }
    ],
    question: {
      prompt: "小丽为什么越来越胖了？",
      options: ["吃太多蛋糕", "吃完晚饭不运动", "每天睡太久", "工作太累"],
      answer: "吃完晚饭不运动",
      explanation: "Mẹ giải thích: “因为你每天吃完晚饭就躺在沙发上看电视，不爱运动”."
    }
  },
  {
    lesson: 6,
    title: "怎么突然找不到了",
    grammarNote: "Bổ ngữ khả năng (找不到, 看不清楚, 听不懂)",
    lines: [
      { speaker: "爸爸", hanzi: "我的眼镜呢？刚才还在桌子上，怎么突然找不到了？", pinyin: "Wǒ de yǎnjìng ne? Gāngcái hái zài zhuōzi shàng, zěnme tūrán zhǎo bú dào le?", meaning: "Kính của bố đâu rồi? Vừa nãy vẫn còn trên bàn, sao đột nhiên không tìm thấy nữa?" },
      { speaker: "儿子", hanzi: "没眼镜您就看不清楚报纸了吧？我帮您找找。", pinyin: "Méi yǎnjìng nín jiù kàn bù qīngchu bàozhǐ le ba? Wǒ bāng nín zhǎozhao.", meaning: "Không có kính là bố không nhìn rõ báo được đúng không? Để con tìm giúp bố." }
    ],
    question: {
      prompt: "爸爸在找什么东西？",
      options: ["手机", "眼镜", "手表", "钥匙"],
      answer: "眼镜",
      explanation: "Câu mở đầu của bố: “我的眼镜呢？...怎么突然找不到了？” (Kính mắt của bố đâu rồi?)."
    }
  },
  {
    lesson: 7,
    title: "我跟她都认识五年了",
    grammarNote: "Bổ ngữ thời lượng & phân biệt 刚 vs 刚才",
    lines: [
      { speaker: "同事", hanzi: "听说你下个月要结婚了？你跟女朋友认识多久了？", pinyin: "Tīngshuō nǐ xià ge yuè yào jiéhūn le? Nǐ gēn nǚpéngyou rènshi duōjiǔ le?", meaning: "Nghe nói tháng sau bạn kết hôn à? Bạn và bạn gái quen nhau bao lâu rồi?" },
      { speaker: "小刚", hanzi: "我跟她都认识五年了，我们是大学同学。", pinyin: "Wǒ gēn tā dōu rènshi wǔ nián le, wǒmen shì dàxué tóngxué.", meaning: "Mình với cô ấy quen nhau đã 5 năm rồi, bọn mình là bạn học đại học." }
    ],
    question: {
      prompt: "小刚和女朋友认识多少年了？",
      options: ["两年", "三年", "五年", "八年"],
      answer: "五年",
      explanation: "Tiểu Cương nói: “我跟她都认识五年了” (Quen nhau đã 5 năm rồi)."
    }
  },
  {
    lesson: 8,
    title: "你去哪儿我就去哪儿",
    grammarNote: "Phó từ 又 vs 再 & Đại từ nghi vấn phiếm chỉ",
    lines: [
      { speaker: "小丽", hanzi: "这个周末你想去哪儿旅游？", pinyin: "Zhège zhōumò nǐ xiǎng qù nǎr lǚyóu?", meaning: "Cuối tuần này anh muốn đi đâu du lịch?" },
      { speaker: "小刚", hanzi: "你去哪儿我就去哪儿，只要跟你在一起就很开心。", pinyin: "Nǐ qù nǎr wǒ jiù qù nǎr, zhǐyào gēn nǐ zài yìqǐ jiù hěn kāixīn.", meaning: "Em đi đâu thì anh đi đó, chỉ cần ở bên em là vui rồi." }
    ],
    question: {
      prompt: "小刚想去哪儿旅游？",
      options: ["只去北京", "小丽去哪儿他就去哪儿", "不想去旅游", "去爬山"],
      answer: "小丽去哪儿他就去哪儿",
      explanation: "Tiểu Cương nói: “你去哪儿我就去哪儿” (Em đi đâu thì anh đi đó)."
    }
  },
  {
    lesson: 9,
    title: "她的汉语说得跟中国人一样好",
    grammarNote: "So sánh ngang bằng A 跟 B 一样 & cấu trúc 越 A 越 B",
    lines: [
      { speaker: "王老师", hanzi: "班里新来的那位留学生是谁？她的汉语说得跟中国人一样好！", pinyin: "Bān lǐ xīn lái de nà wèi liúxuéshēng shì shuí? Tā de Hànyǔ shuō de gēn Zhōngguórén yíyàng hǎo!", meaning: "Bạn du học sinh mới đến trong lớp là ai thế? Tiếng Hán của cô ấy nói tốt như người Trung Quốc vậy!" },
      { speaker: "班长", hanzi: "她叫玛丽，因为她从小就对汉语感兴趣。", pinyin: "Tā jiào Mǎlì, yīnwèi tā cóngxiǎo jiù duì Hànyǔ gǎn xìngqù.", meaning: "Bạn ấy tên là Mary, vì bạn ấy có hứng thú với tiếng Hán từ nhỏ." }
    ],
    question: {
      prompt: "玛丽的汉语说得怎么样？",
      options: ["听不懂", "说得很慢", "跟中国人一样好", "只会写不会说"],
      answer: "跟中国人一样好",
      explanation: "Thầy Vương khen: “她的汉语说得跟中国人一样好！”."
    }
  },
  {
    lesson: 10,
    title: "数学比历史难多了",
    grammarNote: "Câu so sánh hơn với 比 (A 比 B + Adj + 多了 / 一点儿)",
    lines: [
      { speaker: "弟弟", hanzi: "姐姐，你觉得数学难还是历史难？", pinyin: "Jiějie, nǐ juéde shùxué nán háishì lìshǐ nán?", meaning: "Chị ơi, chị thấy môn Toán khó hay môn Lịch sử khó?" },
      { speaker: "姐姐", hanzi: "对我来说，数学比历史难多了，不过我数学考得比上次好一点儿。", pinyin: "Duì wǒ lái shuō, shùxué bǐ lìshǐ nán duō le, búguò wǒ shùxué kǎo de bǐ shàng cì hǎo yìdiǎnr.", meaning: "Đối với chị mà nói, Toán khó hơn Lịch sử nhiều, nhưng chị thi Toán tốt hơn lần trước một chút." }
    ],
    question: {
      prompt: "姐姐觉得哪门课更难？",
      options: ["历史", "数学", "体育", "音乐"],
      answer: "数学",
      explanation: "Chị gái nói: “数学比历史难多了” (Toán khó hơn Lịch sử nhiều)."
    }
  },
  {
    lesson: 11,
    title: "别忘了把空调关了",
    grammarNote: "Câu chữ 把 cơ bản (把 + O + V + 了)",
    lines: [
      { speaker: "妈妈", hanzi: "我们要去图书馆了，出门以前别忘了把空调和灯关了。", pinyin: "Wǒmen yào qù túshūguǎn le, chūmén yǐqián bié wàng le bǎ kōngtiáo hé dēng guān le.", meaning: "Chúng ta sắp đi thư viện rồi, trước khi ra ngoài đừng quên tắt điều hòa và đèn nhé." },
      { speaker: "女儿", hanzi: "放心吧，我已经把窗户和空调都关好了。", pinyin: "Fàngxīn ba, wǒ yǐjīng bǎ chuānghu hé kōngtiáo dōu guān hǎo le.", meaning: "Mẹ yên tâm đi, con đã đóng cửa sổ và tắt điều hòa xong xuôi cả rồi." }
    ],
    question: {
      prompt: "她们现在准备去哪儿？",
      options: ["去超市", "去图书馆", "去饭馆", "去机场"],
      answer: "去图书馆",
      explanation: "Câu đầu tiên của mẹ: “我们要去图书馆了” (Chúng ta sắp đi thư viện rồi)."
    }
  },
  {
    lesson: 12,
    title: "把重要的东西放在我这儿吧",
    grammarNote: "Câu chữ 把 với 在 / 到 / 给 & phân biệt 才 vs 就",
    lines: [
      { speaker: "小丽", hanzi: "我的行李箱太重了，你可以帮我把护照放在你包里吗？", pinyin: "Wǒ de xínglixiāng tài zhòng le, nǐ kěyǐ bāng wǒ bǎ hùzhào fàng zài nǐ bāo lǐ ma?", meaning: "Vali hành lý của mình nặng quá, bạn có thể giúp mình để hộ chiếu vào trong túi bạn được không?" },
      { speaker: "小刚", hanzi: "没问题，把重要的东西都放在我这儿吧，八点飞机才起飞呢。", pinyin: "Méi wèntí, bǎ zhòngyào de dōngxi dōu fàng zài wǒ zhèr ba, bā diǎn fēijī cái qǐfēi ne.", meaning: "Không vấn đề gì, cứ để đồ quan trọng ở chỗ mình nhé, 8 giờ máy bay mới cất cánh cơ." }
    ],
    question: {
      prompt: "小丽想把什么放在小刚包里？",
      options: ["笔记本电脑", "护照", "雨伞", "词典"],
      answer: "护照",
      explanation: "Tiểu Lệ hỏi: “你可以帮我把护照放在你包里吗？” (Hộ chiếu = 护照)."
    }
  },
  {
    lesson: 13,
    title: "我是走回来的",
    grammarNote: "Bổ ngữ xu hướng kép (走回来, 拿出来, 跑过去) & 一边...一边...",
    lines: [
      { speaker: "妻子", hanzi: "你怎么满头大汗？外面那么远，你是怎么回来的？", pinyin: "Nǐ zěnme mǎntóu dàhàn? Wàimiàn nàme yuǎn, nǐ shì zěnme huílai de?", meaning: "Sao anh đầy đầu mồ hôi thế? Ngoài kia xa vậy, anh về bằng cách nào đấy?" },
      { speaker: "丈夫", hanzi: "地铁站人太多，我是走回来的，一边走一边听音乐，一点儿也不累。", pinyin: "Dìtiězhàn rén tài duō, wǒ shì zǒu huílai de, yìbiān zǒu yìbiān tīng yīnyuè, yìdiǎnr yě bú lèi.", meaning: "Ga tàu điện ngầm đông người quá, anh đi bộ về đấy, vừa đi vừa nghe nhạc, chẳng mệt chút nào." }
    ],
    question: {
      prompt: "丈夫是怎么回家的？",
      options: ["坐地铁", "骑自行车", "走回来的", "坐出租车"],
      answer: "走回来的",
      explanation: "Người chồng trả lời: “我是走回来的” (Anh đi bộ về đấy)."
    }
  },
  {
    lesson: 14,
    title: "你把水果拿过来",
    grammarNote: "Câu chữ 把 + Bổ ngữ kết quả/xu hướng & trình tự 先...再...然后...",
    lines: [
      { speaker: "爸爸", hanzi: "快要过年了，我们先打扫房间，再把冰箱里的水果拿出来洗干净。", pinyin: "Kuàiyào guònián le, wǒmen xiān dǎsǎo fángjiān, zài bǎ bīngxiāng lǐ de shuǐguǒ ná chūlai xǐ gānjìng.", meaning: "Sắp đón Tết rồi, chúng ta quét dọn phòng trước, rồi lấy hoa quả trong tủ lạnh ra rửa sạch." },
      { speaker: "儿子", hanzi: "好的，我已经把盘子和碗都洗干净了！", pinyin: "Hǎo de, wǒ yǐjīng bǎ pánzi hé wǎn dōu xǐ gānjìng le!", meaning: "Vâng ạ, con đã rửa sạch hết cả đĩa và bát rồi!" }
    ],
    question: {
      prompt: "儿子已经把什么洗干净了？",
      options: ["衣服和裤子", "盘子和碗", "苹果和香蕉", "桌子和椅子"],
      answer: "盘子和碗",
      explanation: "Người con nói: “我已经把盘子和碗都洗干净了” (Đĩa và bát = 盘子和碗)."
    }
  },
  {
    lesson: 15,
    title: "其他都没什么问题",
    grammarNote: "Cấu trúc 除了...以外，都/也/还... & bổ ngữ mức độ 极了",
    lines: [
      { speaker: "老师", hanzi: "这次汉语考试，你觉得难不难？", pinyin: "Zhè cì Hànyǔ kǎoshì, nǐ juéde nán bù nán?", meaning: "Kỳ thi tiếng Hán lần này, em thấy có khó không?" },
      { speaker: "学生", hanzi: "除了最后一个阅读题以外，其他都没什么问题，汉字我都认识！", pinyin: "Chúle zuìhòu yí ge yuèdú tí yǐwài, qítā dōu méi shénme wèntí, Hànzì wǒ dōu rènshi!", meaning: "Trừ câu đọc hiểu cuối cùng ra, những câu khác đều không có vấn đề gì, chữ Hán em đều nhận ra hết!" }
    ],
    question: {
      prompt: "学生觉得这次考试怎么样？",
      options: ["所有题都太难", "除了最后一题，其他都没问题", "汉字都不认识", "没时间写完"],
      answer: "除了最后一题，其他都没问题",
      explanation: "Học sinh nói: “除了最后一个阅读题以外，其他都没什么问题”."
    }
  },
  {
    lesson: 16,
    title: "我现在累得下了班就想睡觉",
    grammarNote: "Cấu trúc Nếu...thì... (如果...就...) & Bổ ngữ trạng thái V/Adj + 得 + Cụm vị ngữ",
    lines: [
      { speaker: "同事", hanzi: "如果你觉得工作太累，周末就去森林公园换换空气吧。", pinyin: "Rúguǒ nǐ juéde gōngzuò tài lèi, zhōumò jiù qù sēnlín gōngyuán huànhuan kōngqì ba.", meaning: "Nếu bạn thấy công việc mệt quá, cuối tuần hãy đi công viên rừng cây đổi gió nhé." },
      { speaker: "小王", hanzi: "好主意！我现在累得下了班就想睡觉。", pinyin: "Hǎo zhǔyi! Wǒ xiànzài lèi de xiàle bān jiù xiǎng shuìjiào.", meaning: "Ý kiến hay đấy! Bây giờ mình mệt đến mức tan làm là chỉ muốn ngủ." }
    ],
    question: {
      prompt: "同事建议小王周末去哪儿？",
      options: ["去医院看病", "去森林公园", "去公司加班", "去体育馆跑步"],
      answer: "去森林公园",
      explanation: "Đồng nghiệp khuyên: “周末就去森林公园换换空气吧”."
    }
  },
  {
    lesson: 17,
    title: "谁都有办法看好你的“病”",
    grammarNote: "Lặp lại động từ hai âm tiết (ABAB: 休息休息, 了解了解) & 谁都...",
    lines: [
      { speaker: "病人", hanzi: "医生，我最近总是头疼，睡眠也不好，这是什么病？", pinyin: "Yīshēng, wǒ zuìjìn zǒngshì tóuténg, shuìmián yě bù hǎo, zhè shì shénme bìng?", meaning: "Bác sĩ ơi, dạo này tôi cứ bị đau đầu, giấc ngủ cũng không tốt, đây là bệnh gì ạ?" },
      { speaker: "医生", hanzi: "你只是压力太大了，不需要吃药，请假去旅游、放松放松就好了。", pinyin: "Nǐ zhǐshì yālì tài dà le, bù xūyào chī yào, qǐngjià qù lǚyóu, fàngsōng fàngsōng jiù hǎo le.", meaning: "Anh chỉ là áp lực quá lớn thôi, không cần uống thuốc, xin nghỉ phép đi du lịch, thư giãn một chút là khỏi." }
    ],
    question: {
      prompt: "医生让病人怎么做？",
      options: ["马上住院", "每天吃三次药", "请假旅游放松放松", "不要喝咖啡"],
      answer: "请假旅游放松放松",
      explanation: "Bác sĩ khuyên: “不需要吃药，请假去旅游、放松放松就好了”."
    }
  },
  {
    lesson: 18,
    title: "我相信他们会同意的",
    grammarNote: "Cấu trúc 只要...就... (Chỉ cần... thì...) & giới từ 关于",
    lines: [
      { speaker: "小丽", hanzi: "关于去北京留学的计划，你跟父母商量了吗？", pinyin: "Guānyú qù Běijīng liúxué de jìhuà, nǐ gēn fùmǔ shāngliang le ma?", meaning: "Về kế hoạch đi Bắc Kinh du học, bạn đã bàn bạc với bố mẹ chưa?" },
      { speaker: "小刚", hanzi: "只要我能考过HSK三级，我相信他们一定会同意的。", pinyin: "Zhǐyào wǒ néng kǎo guò HSK sān jí, wǒ xiāngxìn tāmen yídìng huì tóngyì de.", meaning: "Chỉ cần mình thi đỗ HSK 3, mình tin chắc chắn bố mẹ sẽ đồng ý." }
    ],
    question: {
      prompt: "小刚打算去哪儿留学？",
      options: ["上海", "北京", "西安", "广州"],
      answer: "北京",
      explanation: "Tiểu Lệ hỏi: “关于去北京留学的计划...” (Về kế hoạch đi Bắc Kinh du học)."
    }
  },
  {
    lesson: 19,
    title: "你没看出来吗",
    grammarNote: "Nghĩa mở rộng của bổ ngữ xu hướng (看出来, 听出来, 想起来)",
    lines: [
      { speaker: "小丽", hanzi: "你看，这张照片里左边的小女孩是谁？你没看出来吗？", pinyin: "Nǐ kàn, zhè zhāng zhàopiàn lǐ zuǒbiān de xiǎo nǚhái shì shuí? Nǐ méi kàn chūlai ma?", meaning: "Bạn nhìn xem, cô bé bên trái trong bức ảnh này là ai? Bạn không nhận ra sao?" },
      { speaker: "小刚", hanzi: "我想起来了！这是你六岁时候的照片，短头发真可爱。", pinyin: "Wǒ xiǎng qǐlai le! Zhè shì nǐ liù suì shíhou de zhàopiàn, duǎn tóufa zhēn kě'ài.", meaning: "Mình nhớ ra rồi! Đây là ảnh lúc bạn 6 tuổi, tóc ngắn đáng yêu thật." }
    ],
    question: {
      prompt: "照片里的小女孩是谁？",
      options: ["小丽的妹妹", "六岁时的小丽", "小刚的姐姐", "邻居家孩子"],
      answer: "六岁时的小丽",
      explanation: "Tiểu Cương nhận ra: “这是你六岁时候的照片” (Đây là ảnh lúc bạn 6 tuổi)."
    }
  },
  {
    lesson: 20,
    title: "我被他影响了",
    grammarNote: "Câu bị động chữ 被 & cấu trúc 只有...才... (Chỉ có... mới...)",
    lines: [
      { speaker: "朋友", hanzi: "你以前从来不看足球比赛，现在怎么这么喜欢踢足球？", pinyin: "Nǐ yǐqián cónglái bú kàn zúqiú bǐsài, xiànzài zěnme zhème xǐhuan tī zúqiú?", meaning: "Trước đây bạn chưa bao giờ xem bóng đá, sao bây giờ lại thích đá bóng thế?" },
      { speaker: "小刚", hanzi: "我被同桌影响了，他天天带我去运动场，只有多锻炼身体才会健康。", pinyin: "Wǒ bèi tóngzhuō yǐngxiǎng le, tā tiāntiān dài wǒ qù yùndòngchǎng, zhǐyǒu duō duànliàn shēntǐ cái huì jiànkāng.", meaning: "Mình bị bạn cùng bàn ảnh hưởng đấy, cậu ấy ngày nào cũng dẫn mình ra sân vận động, chỉ có rèn luyện nhiều thì cơ thể mới khỏe mạnh." }
    ],
    question: {
      prompt: "小刚是被谁影响的？",
      options: ["体育老师", "同桌", "爸爸", "哥哥"],
      answer: "同桌",
      explanation: "Tiểu Cương nói: “我被同桌影响了” (Mình bị bạn cùng bàn ảnh hưởng)."
    }
  }
];
