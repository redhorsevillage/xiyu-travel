/* =========================================================================
   main.js (v4) — 古樸漁港版：導覽、捲動、漁翁故事、人文信仰、海天奇景、鹹鮮風味
   含真實 Wikimedia 影像、ASMR 海潮音景
   ========================================================================= */
(function () {
  'use strict';

  /* SCENES：CSS background「值」（不含 background: 前綴），作為實景照片載入失敗時的後備底色 */
  const SCENES = {
    erkan:      "linear-gradient(180deg,#9FBEC2 0 34%,#7A2224 34% 64%,#E9DEC2 64%)",
    basalt:     "linear-gradient(180deg,#D9CDB0 0 26%,#3E3C3A 26%)",
    lighthouse: "linear-gradient(180deg,#124E5B 0%,#1E6B7B 55%,#0E3D47 100%)",
    whale:      "linear-gradient(180deg,#1E6B7B 0 60%,#2C2A28 60%)",
    whalecave:  "linear-gradient(180deg,#1E6B7B 0 56%,#2C2A28 56%)",
    bridge:     "linear-gradient(180deg,#1E6B7B 0 62%,#3E3C3A 62%)",
    neian:      "linear-gradient(180deg,#1E6B7B 0 52%,#D9CDB0 52%)",
    greatbridge:"linear-gradient(180deg,#BFD3D6 0 40%,#1E6B7B 40% 70%,#3E3C3A 70%)",
    banyan:     "linear-gradient(180deg,#BFD3D6 0 38%,#445A2C 38%)",
    dream:      "linear-gradient(180deg,#1E6B7B 0 50%,#E9DEC2 50%)",
    chima:      "linear-gradient(180deg,#C59B27 0 30%,#1E6B7B 30% 55%,#D9CDB0 55%)",
    sanxianta:  "linear-gradient(180deg,#BFD3D6 0 58%,#7A2224 58%)",
    food_tea:    "linear-gradient(135deg,#C59B27,#7A4A18)",
    food_cactus: "linear-gradient(135deg,#1E6B7B,#7A2224)",
    food_squid:  "linear-gradient(135deg,#1E6B7B,#124E5B)",
    food_seafood:"linear-gradient(135deg,#7A2224,#541517)",
    food_brittle:"linear-gradient(135deg,#C59B27,#7A2224)",
    food_friedcake:"linear-gradient(135deg,#D9A441,#7A2224)",
    food_douhua: "linear-gradient(135deg,#E9DEC2,#C59B27)",
    food_guabao: "linear-gradient(135deg,#E9DEC2,#7A2224)",
  };
  window.XIYU = window.XIYU || {};
  window.XIYU.SCENES = SCENES;

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ---- 1. 導覽列 + 行動選單 ---- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const navLinks = $('#navLinks');
  $('#navToggle').addEventListener('click', () => navLinks.classList.toggle('open'));
  $$('#navLinks a').forEach((a) => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ---- 2. 捲動進場 ---- */
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
    { threshold: 0.1 }
  );
  $$('.reveal').forEach((el) => io.observe(el));

  /* ---- 3. 漁翁故事 時間軸 ---- */
  const HISTORY = [
    { era: '荷據・明鄭時期', text: '西嶼扼守台灣海峽要衝，是船隻進出澎湖內海的咽喉。荷蘭人與明鄭水師皆曾在此佈防，海戰烽火頻仍。' },
    { era: '清領・海防要塞', text: '清廷於西嶼修築「西嶼西臺」與「西嶼東臺」砲臺，引進西式火砲鎮守海疆，至今仍為國定古蹟。' },
    { era: '大航海貿易據點', text: '作為南來北往的中繼站，西嶼見證帆影如織的貿易盛景，咾咕石聚落與菜宅也在此時逐漸成形。' },
    { era: '清・燈塔之始', text: '乾隆年間於西嶼設置石塔燃油指引航路，是台灣最早的燈塔雛形。' },
    { era: '日治・洋式燈塔', text: '日治時期改建為白色洋式燈塔，並完善西嶼海防與交通建設，奠定今日漁翁島的樣貌。' },
  ];
  $('#htimeline').innerHTML = HISTORY.map((h) => `<div class="hevent"><span class="era">${h.era}</span><p>${h.text}</p></div>`).join('');

  /* ---- 4. 歲時節慶 人文與信仰 ---- */
  const G = '#E2BE5C';
  const ICON = {
    house: `<svg viewBox="0 0 48 48"><path d="M6 26 24 12l18 14" fill="none" stroke="${G}" stroke-width="2.5" stroke-linejoin="round"/><path d="M4 24q4-6 8 0t8 0 8 0 8 0 8 0" fill="none" stroke="${G}" stroke-width="2.5"/><rect x="12" y="26" width="24" height="16" fill="none" stroke="${G}" stroke-width="2.5"/></svg>`,
    wall: `<svg viewBox="0 0 48 48"><g fill="none" stroke="${G}" stroke-width="2.2"><path d="M24 6 36 14 24 22 12 14Z"/><path d="M24 24 36 32 24 40 12 32Z"/><path d="M11 15 4 20M37 15 44 20"/></g></svg>`,
    temple: `<svg viewBox="0 0 48 48"><path d="M6 18 24 8l18 10" fill="none" stroke="${G}" stroke-width="2.5"/><path d="M4 18q5 4 10 0M24 18q5 4 10 0" stroke="${G}" stroke-width="2.5" fill="none"/><rect x="10" y="20" width="28" height="20" fill="none" stroke="${G}" stroke-width="2.5"/><path d="M22 28h4v12h-4z" fill="${G}"/></svg>`,
    stone: `<svg viewBox="0 0 48 48"><rect x="15" y="8" width="18" height="32" rx="3" fill="none" stroke="${G}" stroke-width="2.5"/><text x="24" y="30" font-size="13" text-anchor="middle" fill="${G}" font-family="serif" font-weight="900">石</text></svg>`,
  };
  const CULTURE = [
    { icon: 'house', sub: 'COASTAL VILLAGE', title: '咾咕石古厝', text: '先民就地取材，以咾咕石與紅磚砌成三合院，馬背山牆與燕尾翹脊勾勒濃厚閩南風情，二崁聚落正是最完整的活見證。' },
    { icon: 'wall', sub: 'WINDBREAK FARM', title: '澎湖菜宅・遮風砌石', text: '為抵擋強勁的東北季風，西嶼人以咾咕石堆出方格狀的「菜宅」矮牆護住作物，是與風共生的農耕智慧。' },
    { icon: 'temple', sub: 'SEA GOD FAITH', title: '海神信仰・廟宇香火', text: '討海為生的西嶼人虔敬海神，外垵溫王宮、竹篙灣大義宮香火鼎盛，廟埕是聚落最熱鬧的人文中心。' },
    { icon: 'stone', sub: 'GUARDIAN STONE', title: '石敢當・避邪鎮風', text: '街角巷口處處可見的石敢當，承載著鎮風止煞、守護平安的民間信仰，是西嶼最樸實的守護者。' },
  ];
  $('#cultureGrid').innerHTML = CULTURE.map((c) => `
    <div class="culture-card"><div class="ic">${ICON[c.icon]}</div>
      <div><span class="sub">${c.sub}</span><h3>${c.title}</h3><p>${c.text}</p></div></div>`).join('');

  /* ---- 5. 海天奇景（真實照片 + 後備底色）+ 燈箱 ---- */
  const WIKI = {
    erkan: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Erkan_Chen_Residence_Brotherhood.JPG',
    basalt: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Daguoye_Columnar_Basalt_reflection_in_water.jpg',
    lighthouse: 'https://upload.wikimedia.org/wikipedia/commons/1/18/West_Islet_Lighthouse.JPG',
    whale: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Chixi_Columnar_Basalt_in_Taiwan_Penghu_%E6%BE%8E%E6%B9%96%E6%B1%A0%E8%A5%BF%E5%B2%A9%E7%80%91.jpg',
    whalecave: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Whale_Cave_in_Penghu_-_side.JPG',
    bridge: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/%E5%B0%8F%E6%B1%A0%E8%A7%92_%E9%9B%99%E6%9B%B2%E6%A9%8B_01.jpg',
    neian: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/%E5%85%A7%E5%9E%B5%E9%81%8A%E6%86%A9%E5%8D%80_-_panoramio.jpg',
    greatbridge: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Penghu_Great_Bridge_over_the_Houmen_Channel.jpg',
    banyan: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/%E9%80%9A%E6%A2%81%E6%BC%81%E6%B8%AF_%287%29%E9%80%9A%E6%A2%81%E6%A6%95%E6%A8%B9%E5%89%8D.jpg',
    dream: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Dream_Beach_in_penghu.jpg',
    chima: 'https://upload.wikimedia.org/wikipedia/commons/5/53/%E8%B5%A4%E9%A6%AC%E8%A5%BF%E6%B8%AF%E6%B2%99%E7%81%98_Beach_in_Chima_west_port.jpg',
    sanxianta: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/%E8%A5%BF%E5%B6%BC%E5%85%A7%E5%9E%B5%E5%A1%94%E5%85%AC%E5%A1%94%E5%A9%86_%28cropped%29.jpg',
  };
  const bgLayer = (key) => WIKI[key]
    ? `url('${WIKI[key]}') center/cover no-repeat, ${SCENES[key]}`
    : SCENES[key];

  const SPOTS = [
    { id: 'greatbridge', no: '景點 01', eng: 'GREAT BRIDGE', title: '澎湖跨海大橋',
      tease: '橫跨吼門水道的地標長橋，進入西嶼的門戶。',
      desc: '澎湖跨海大橋橫跨白沙與西嶼之間水流湍急的吼門水道，全長逾兩公里，曾是遠東最長的跨海大橋。橋頭的拱形碑與筆直橋身一路延伸入海，是澎湖最經典的地標，也是踏上漁翁島西嶼的門戶。',
      facts: ['吼門水道', '澎湖地標', '西嶼門戶', '經典拱門碑'] },
    { id: 'banyan', no: '景點 02', eng: 'TONGLIANG BANYAN', title: '通樑古榕',
      tease: '三百歲的榕樹王，氣根成林蔭蔽整座廟埕。',
      desc: '通樑保安宮前的古榕已逾三百歲，數十條氣根落地成柱、枝葉交織成一片天然綠廊，幾乎遮蔽整座廟埕。是跨越大橋前後最受歡迎的歇腳處，樹下涼風與廟埕香火相伴，別具古意。',
      facts: ['三百年古榕', '氣根成林', '通樑保安宮', '天然綠廊'] },
    { id: 'whalecave', no: '景點 03', eng: 'WHALE CAVE', title: '小門鯨魚洞',
      tease: '黑色玄武岩海蝕拱門，遠望宛如鯨魚伏臥。',
      desc: '小門嶼的鯨魚洞，是海浪長年侵蝕玄武岩海崖鑿出的天然海蝕拱門，遠望宛如一頭俯臥汲水的鯨魚。站在洞旁聽濤聲穿過岩拱，是小門嶼最受歡迎的地質奇景。',
      facts: ['海蝕拱門', '玄武岩海崖', '小門嶼地質', '聽濤奇景'] },
    { id: 'dream', no: '景點 04', eng: 'DREAM BEACH', title: '夢幻沙灘',
      tease: '退潮才現身的純白沙洲，宛如海上夢境。',
      desc: '夢幻沙灘是一片只在退潮時才浮現的純白沙洲，細白沙與澄澈海水交織出夢境般的色階。漲潮時隱沒於海面、退潮時才悄然現身，限定的美景使它成為澎湖近年最熱門的祕境沙灘。',
      facts: ['退潮限定', '純白沙洲', '澄澈海水', '祕境沙灘'] },
    { id: 'erkan', no: '景點 05', eng: 'ERKAN VILLAGE', title: '二崁聚落保存區',
      tease: '完整的閩南聚落建築群，散發濃濃古意。',
      desc: '二崁聚落是澎湖第一個傳統聚落保存區，整片以咾咕石與紅瓦砌成的陳家古厝群，沿著緩坡錯落而立。漫步巷弄間，褒歌、傳香與杏仁茶香交織，馬背山牆與燕尾脊在藍天下格外鮮明，是認識澎湖閩南建築與人情味的最佳起點。',
      facts: ['傳統聚落保存區', '咾咕石・紅瓦古厝', '二崁傳香', '褒歌文化'] },
    { id: 'basalt', no: '景點 06', eng: 'COLUMNAR BASALT', title: '大菓葉柱狀玄武岩',
      tease: '萬年形成的壯麗黑褐色玄武岩石壁。',
      desc: '百萬年前的火山熔岩冷卻收縮，凝結成一根根規律排列的六角石柱，宛如大地的管風琴。大菓葉玄武岩因早年開路而意外顯露，每逢雨後或退潮，岩壁前積出一面天然水鏡，倒映出壯麗的黑褐色柱狀岩牆。',
      facts: ['柱狀玄武岩', '退潮水鏡倒影', '百萬年地質', '攝影名所'] },
    { id: 'whale', no: '景點 07', eng: 'CHIXI ROCK', title: '池西岩石・池西岩瀑',
      tease: '柱狀玄武岩如瀑布傾瀉，退潮九孔池水鏡的魔幻海景。',
      desc: '池西岩石（俗稱「池西岩瀑」）是一整片向海傾瀉的柱狀玄武岩，狀如凝固的黑色瀑布。岩前退潮後顯露的廢棄九孔養殖池形成幾何狀的天然水鏡，與嶙峋黑岩交織出超現實的海景，是近年爆紅的攝影祕境。',
      facts: ['柱狀玄武岩岩瀑', '九孔池水鏡', '海蝕地貌', '攝影祕境'] },
    { id: 'bridge', no: '景點 08', eng: 'TWIN-CURVE BRIDGE', title: '小池角雙曲橋',
      tease: '伸入碧海的雪白雙弧曲橋，海上散步的浪漫。',
      desc: '小池角雙曲橋以兩道優雅的弧線延伸入海，盡頭設有觀海涼亭。雪白橋身襯著澎湖湛藍的海水，是近年爆紅的網美打卡與賞夕祕境，退潮時還能近距離觀察潮間帶生態。',
      facts: ['雙弧觀海曲橋', '潮間帶生態', '網美打卡點', '賞夕祕境'] },
    { id: 'chima', no: '景點 09', eng: 'CHIMA BEACH', title: '赤馬沙灘',
      tease: '赤馬漁港旁的靜謐沙灣，夕陽餘暉最美。',
      desc: '赤馬沙灘位於西嶼赤馬村的西港旁，是一處少有遊客的靜謐沙灣。細軟沙質與平緩海岸適合踏浪，傍晚時西向的海面映著金紅夕照，是當地人私藏的賞夕海岸。',
      facts: ['赤馬西港', '靜謐沙灣', '踏浪戲水', '賞夕海岸'] },
    { id: 'neian', no: '景點 10', eng: 'NEIAN BEACH', title: '內垵沙灘',
      tease: '金黃沙灣與三仙塔相望的靜謐海岸。',
      desc: '內垵遊憩區擁有西嶼少見的金黃沙灘與平緩海灣，沿著海堤木棧道散步，可遠望高地上的三仙塔。這裡人潮稀少、海水清澈，是西嶼戲水、賞夕與放空的祕境海岸。',
      facts: ['金黃沙灘', '海堤木棧道', '三仙塔相望', '戲水賞夕'] },
    { id: 'lighthouse', no: '景點 11', eng: 'XIYU LIGHTHOUSE', title: '漁翁島燈塔',
      tease: '守護台灣海峽百年的白色燈塔。',
      desc: '漁翁島燈塔（西嶼燈塔）始建於清乾隆年間，是台灣最早設立的燈塔，現存白色洋式塔身建於 1875 年。它矗立在西嶼最南端的崖上，純白塔身與蔚藍海天相映，百餘年來指引著台灣海峽往來的船隻。',
      facts: ['台灣最古老燈塔', '1875 洋式塔身', '國定古蹟', '夕陽名所'] },
    { id: 'sanxianta', no: '景點 12', eng: 'SANXIAN PAGODA', title: '三仙塔・塔公塔婆',
      tease: '內垵高地上的鎮風石塔，俯瞰漁港與海灣。',
      desc: '內垵村高地上矗立著昔日為鎮風止煞、護佑漁村而建的鎮風石塔——「塔公塔婆」（三仙塔）。一高一低的石塔遙望台灣海峽，登上塔旁高地可俯瞰內垵漁港與遼闊海灣，是眺望西嶼海岸線與夕陽的絕佳據點。',
      facts: ['鎮風石塔', '塔公塔婆', '內垵高地', '眺海觀夕'] },
  ];

  $('#scenicGrid').innerHTML = SPOTS.map((s) => `
    <article class="scenic-card" data-id="${s.id}" tabindex="0" role="button" aria-label="${s.title}，查看詳情">
      <div class="scene" style="background:${bgLayer(s.id)}"></div>
      <div class="grad"></div>
      <span class="more" aria-hidden="true">+</span>
      <div class="meta"><span class="no">${s.no}</span><h3>${s.title}</h3><p>${s.tease}</p></div>
    </article>`).join('');

  const modal = $('#modal');
  const openModal = (id) => {
    const s = SPOTS.find((x) => x.id === id); if (!s) return;
    $('#modalScene').style.background = bgLayer(s.id);
    $('#modalScene').style.backgroundSize = 'cover';
    $('#modalSeal').textContent = s.no.replace('景點 ', '');
    $('#modalEng').textContent = s.eng;
    $('#modalTitle').textContent = s.title;
    $('#modalText').textContent = s.desc;
    $('#modalFacts').innerHTML = s.facts.map((f) => `<span>${f}</span>`).join('');
    modal.classList.add('open'); document.body.style.overflow = 'hidden';
  };
  const closeModal = () => { modal.classList.remove('open'); document.body.style.overflow = ''; };
  $$('.scenic-card').forEach((card) => {
    card.addEventListener('click', () => openModal(card.dataset.id));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.dataset.id); } });
  });
  $('#modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  /* ---- 6. 鹹鮮風味 翻轉木牌 ---- */
  // 每排三種，依指定順序；未指定店家者以在地代表/Google 高評價店家為主
  const FOODS = [
    { scene: 'food_cactus', img: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Prickly_Pear_Fruit_%2850618126823%29.jpg', title: '仙人掌冰', desc: '澎湖野生仙人掌果實製成，鮮紅酸甜、沁涼消暑，是夏日限定的代表冰品。', shop: '易家仙人掌冰' },
    { scene: 'food_squid', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Oyster_Vermicelli.jpg', title: '小管麵線', desc: '清晨現撈的鮮甜小管與細麵線同煮，湯頭清爽，吃得到大海的鮮味。', shop: '小萍的店' },
    { scene: 'food_friedcake', title: '大池炸粿・鯊魚排', desc: '蚵嗲、菜粿與酥炸鯊魚排現點現炸，外酥內鮮，是西嶼海邊的銅板美味。', shop: '大池角・在地炸粿' },
    { scene: 'food_tea', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/ACupOfApricotKernelTea20220111.jpg', title: '二崁杏仁茶', desc: '二崁聚落手工現磨的杏仁茶，溫潤香醇，搭配脆餅是巷弄裡最暖心的古早味。', shop: '二崁聚落・杏仁茶舖' },
    { scene: 'food_douhua', img: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Peanut_Douhua.jpg', title: '小池角豆花', desc: '純手工豆花綿密滑順，淋上糖水與配料，是小池角海邊的沁涼甜點。', shop: '小池角豆花' },
    { scene: 'food_brittle', title: '枕頭餅', desc: '外型如小枕頭的澎湖傳統糕餅，外皮酥香、內餡微甜不膩，滿是古早味。', shop: '自造興古早味枕頭餅' },
    { scene: 'food_friedcake', title: '阿綢炸粿', desc: '合界在地人氣炸粿，金黃酥脆、用料實在，是西嶼必嚐的下午點心。', shop: '阿綢炸粿（合界）' },
    { scene: 'food_seafood', img: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Steam_Grouper_dish_at_Ristorante.jpg', title: '海港海鮮料理', desc: '石斑、象魚、龍蝦與各式現流魚貨，清蒸快炒最能嚐出西嶼海鮮的鮮甜本味。', shop: '外垵漁港・海鮮餐廳' },
    { scene: 'food_guabao', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Taiwanese_Gua_Bao_%40_Bao_%26_Bing%2C_London.jpg', title: '外垵刈包', desc: '鬆軟刈包夾入滷得入味的爌肉與酸菜花生粉，是外垵漁村的暖胃古早味。', shop: '外垵・刈包' },
  ];
  const foodBg = (f) => (f.img ? `url('${f.img}') center/cover no-repeat, ` : '') + SCENES[f.scene];
  $('#foodGrid').innerHTML = FOODS.map((f) => `
    <div class="flip" tabindex="0" role="button" aria-label="${f.title}，點擊翻面看介紹">
      <div class="flip-inner">
        <div class="flip-face flip-front"><div class="scene" style="background:${foodBg(f)}"></div>
          <div class="label"><h3>${f.title}</h3><span class="hint">↻ 點擊翻面看介紹</span></div></div>
        <div class="flip-face flip-back"><h3>${f.title}</h3><p>${f.desc}</p><span class="shop">${f.shop}</span></div>
      </div></div>`).join('');
  $$('.flip').forEach((card) => {
    const toggle = () => card.classList.toggle('flipped');
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });

  /* ---------------------------------------------------------------------
     7. 背景音樂：ASMR 海潮音景（WebAudio 程序生成，無外部音檔）
  --------------------------------------------------------------------- */
  const audioBtn = $('#audioBtn'), audioLabel = $('#audioLabel');
  let actx = null, master = null, playing = false;
  let sessionNodes = [];

  function brownNoise(seconds) {
    const len = Math.floor(actx.sampleRate * seconds);
    const buf = actx.createBuffer(1, len, actx.sampleRate);
    const d = buf.getChannelData(0); let last = 0;
    for (let i = 0; i < len; i++) { const white = Math.random() * 2 - 1; last = (last + 0.02 * white) / 1.02; d[i] = last * 3.2; }
    return buf;
  }
  function impulse(seconds, decay) {
    const len = Math.floor(actx.sampleRate * seconds);
    const buf = actx.createBuffer(2, len, actx.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = buf.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay); }
    return buf;
  }
  function startAudio() {
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    if (!actx) actx = new AC();
    if (actx.state === 'suspended') actx.resume();
    master = actx.createGain(); master.gain.value = 0;

    // 整體柔化：低通修圓高頻毛邊，聽感更放鬆
    const softLP = actx.createBiquadFilter(); softLP.type = 'lowpass'; softLP.frequency.value = 3600; softLP.Q.value = 0.3;
    // 動態壓縮：較溫和的比例，避免浪峰刺耳
    const comp = actx.createDynamicsCompressor();
    comp.threshold.value = -24; comp.ratio.value = 2.5; comp.attack.value = 0.08; comp.release.value = 0.8;
    master.connect(softLP).connect(comp).connect(actx.destination);

    // 空間殘響：加長加深，更空靈寬闊
    const reverb = actx.createConvolver(); reverb.buffer = impulse(3.6, 2.6);
    const reverbGain = actx.createGain(); reverbGain.gain.value = 0.28; reverb.connect(reverbGain).connect(master);

    const noiseBuf = brownNoise(12);
    const track = (n) => { sessionNodes.push(n); return n; };
    const noiseSrc = () => { const s = track(actx.createBufferSource()); s.buffer = noiseBuf; s.loop = true; s.start(0, Math.random() * 11); return s; };

    // 1. 深海底鳴（極低頻，安定襯底）
    const deep = noiseSrc();
    const deepLP = actx.createBiquadFilter(); deepLP.type = 'lowpass'; deepLP.frequency.value = 90; deepLP.Q.value = 0.5;
    const deepG = actx.createGain(); deepG.gain.value = 0.07; deep.connect(deepLP).connect(deepG).connect(master);

    // 2. 海床底噪（柔和中低頻，鋪底）
    const bed = noiseSrc();
    const bedLP = actx.createBiquadFilter(); bedLP.type = 'lowpass'; bedLP.frequency.value = 420; bedLP.Q.value = 0.4;
    const bedG = actx.createGain(); bedG.gain.value = 0.07; bed.connect(bedLP).connect(bedG); bedG.connect(master); bedG.connect(reverb);

    // 一道浪 = 浪體（低通漸強漸弱）＋ 相位延後的碎沫（高通沙沙＝浪拍碎後的泡沫）
    function wave(rate, pan, bodyCut, bodyGain, foamGain, foamFrac) {
      // 浪體：谷底低、浪峰高；同步調制低通截頻 → 浪近時更亮、浪退時轉悶
      const bodySrc = noiseSrc();
      const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = bodyCut; lp.Q.value = 0.6;
      const bg = actx.createGain(); bg.gain.value = bodyGain * 0.55;
      const bpan = actx.createStereoPanner(); bpan.pan.value = pan;
      bodySrc.connect(lp).connect(bg).connect(bpan); bpan.connect(master); bg.connect(reverb);
      const lfo = track(actx.createOscillator()); lfo.type = 'sine'; lfo.frequency.value = rate;
      const lfoBody = actx.createGain(); lfoBody.gain.value = bodyGain * 0.45; lfo.connect(lfoBody).connect(bg.gain);
      const lfoCut = actx.createGain(); lfoCut.gain.value = bodyCut * 0.5; lfo.connect(lfoCut).connect(lp.frequency);
      lfo.start();

      // 浪花泡沫：跟著浪峰、相位稍延後（先湧後碎）
      const foamSrc = noiseSrc();
      const hp = actx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1600; hp.Q.value = 0.4;
      const fg = actx.createGain(); fg.gain.value = foamGain * 0.5;
      const fpan = actx.createStereoPanner(); fpan.pan.value = pan * 0.8;
      foamSrc.connect(hp).connect(fg).connect(fpan); fpan.connect(master); fg.connect(reverb);
      const foamLfo = track(actx.createOscillator()); foamLfo.type = 'sine'; foamLfo.frequency.value = rate;
      const foamLfoG = actx.createGain(); foamLfoG.gain.value = foamGain * 0.45; foamLfo.connect(foamLfoG).connect(fg.gain);
      foamLfo.start(actx.currentTime + foamFrac / rate); // 延後相位 = 浪拍碎的時間差
    }

    // 多道不可通約頻率 → 浪起浪落自然不規則、層次分明
    wave(0.045, -0.45, 650, 0.16, 0.05,  0.08); // 近浪（左）
    wave(0.063,  0.45, 560, 0.13, 0.045, 0.09); // 中浪（右）
    wave(0.034,  0.00, 760, 0.15, 0.04,  0.07); // 遠來大湧（中）較慢
    wave(0.078,  0.25, 500, 0.10, 0.035, 0.10); // 細碎近岸浪（右偏）

    // 退潮回吸的細沙沫（持續、極輕，增厚層次）
    const wash = noiseSrc();
    const washBP = actx.createBiquadFilter(); washBP.type = 'bandpass'; washBP.frequency.value = 2200; washBP.Q.value = 0.7;
    const washG = actx.createGain(); washG.gain.value = 0.02;
    const washPan = actx.createStereoPanner(); washPan.pan.value = -0.2;
    wash.connect(washBP).connect(washG).connect(washPan); washPan.connect(master);
    const washLfo = track(actx.createOscillator()); washLfo.type = 'sine'; washLfo.frequency.value = 0.11;
    const washLfoG = actx.createGain(); washLfoG.gain.value = 0.014; washLfo.connect(washLfoG).connect(washG.gain); washLfo.start();

    // 緩起拉長、目標音量略降，更輕柔
    master.gain.setValueAtTime(0, actx.currentTime);
    master.gain.linearRampToValueAtTime(0.42, actx.currentTime + 3.5);
    playing = true; audioBtn.classList.add('playing'); audioBtn.setAttribute('aria-pressed', 'true'); audioLabel.textContent = '播放中';
  }
  function stopAudio() {
    if (actx && master) {
      const t = actx.currentTime;
      master.gain.cancelScheduledValues(t); master.gain.setValueAtTime(master.gain.value, t); master.gain.linearRampToValueAtTime(0, t + 1.0);
      const nodes = sessionNodes; sessionNodes = [];
      setTimeout(() => nodes.forEach((n) => { try { n.stop && n.stop(); } catch (e) {} try { n.disconnect(); } catch (e) {} }), 1150);
    }
    playing = false; audioBtn.classList.remove('playing'); audioBtn.setAttribute('aria-pressed', 'false'); audioLabel.textContent = '海潮聲';
  }
  audioBtn.addEventListener('click', () => { playing ? stopAudio() : startAudio(); });
  document.addEventListener('visibilitychange', () => { if (!actx || !playing) return; document.hidden ? actx.suspend() : actx.resume(); });
})();
