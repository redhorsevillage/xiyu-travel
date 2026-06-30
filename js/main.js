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
    weir:       "linear-gradient(180deg,#1E6B7B 0%,#124E5B 100%)",
    sunset:     "linear-gradient(180deg,#7A2224 0%,#C59B27 40%,#E9DEC2 58%,#1E6B7B 58%,#124E5B 100%)",
    food_tea:    "linear-gradient(135deg,#C59B27,#7A4A18)",
    food_taro:   "linear-gradient(135deg,#6B4E7A,#3E3C3A)",
    food_cactus: "linear-gradient(135deg,#1E6B7B,#7A2224)",
    food_squid:  "linear-gradient(135deg,#1E6B7B,#124E5B)",
    food_seafood:"linear-gradient(135deg,#7A2224,#541517)",
    food_brittle:"linear-gradient(135deg,#C59B27,#7A2224)",
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
  };
  const bgLayer = (key) => `url('${WIKI[key]}') center/cover no-repeat, ${SCENES[key]}`;

  const SPOTS = [
    { id: 'erkan', no: '景點 01', eng: 'ERKAN VILLAGE', title: '二崁聚落保存區',
      tease: '完整的閩南聚落建築群，散發濃濃古意。',
      desc: '二崁聚落是澎湖第一個傳統聚落保存區，整片以咾咕石與紅瓦砌成的陳家古厝群，沿著緩坡錯落而立。漫步巷弄間，褒歌、傳香與杏仁茶香交織，馬背山牆與燕尾脊在藍天下格外鮮明，是認識澎湖閩南建築與人情味的最佳起點。',
      facts: ['傳統聚落保存區', '咾咕石・紅瓦古厝', '二崁傳香', '褒歌文化'] },
    { id: 'basalt', no: '景點 02', eng: 'COLUMNAR BASALT', title: '大菓葉柱狀玄武岩',
      tease: '萬年形成的壯麗黑褐色玄武岩石壁。',
      desc: '百萬年前的火山熔岩冷卻收縮，凝結成一根根規律排列的六角石柱，宛如大地的管風琴。大菓葉玄武岩因早年開路而意外顯露，每逢雨後或退潮，岩壁前積出一面天然水鏡，倒映出壯麗的黑褐色柱狀岩牆。',
      facts: ['柱狀玄武岩', '退潮水鏡倒影', '百萬年地質', '攝影名所'] },
    { id: 'lighthouse', no: '景點 03', eng: 'XIYU LIGHTHOUSE', title: '漁翁島燈塔',
      tease: '守護台灣海峽百年的白色燈塔。',
      desc: '漁翁島燈塔（西嶼燈塔）始建於清乾隆年間，是台灣最早設立的燈塔，現存白色洋式塔身建於 1875 年。它矗立在西嶼最南端的崖上，純白塔身與蔚藍海天相映，百餘年來指引著台灣海峽往來的船隻。',
      facts: ['台灣最古老燈塔', '1875 洋式塔身', '國定古蹟', '夕陽名所'] },
    { id: 'whale', no: '景點 04', eng: 'CHIXI ROCK', title: '池西岩石・池西岩瀑',
      tease: '柱狀玄武岩如瀑布傾瀉，退潮九孔池水鏡的魔幻海景。',
      desc: '池西岩石（俗稱「池西岩瀑」）是一整片向海傾瀉的柱狀玄武岩，狀如凝固的黑色瀑布。岩前退潮後顯露的廢棄九孔養殖池形成幾何狀的天然水鏡，與嶙峋黑岩交織出超現實的海景，是近年爆紅的攝影祕境。',
      facts: ['柱狀玄武岩岩瀑', '九孔池水鏡', '海蝕地貌', '攝影祕境'] },
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
  const FOODS = [
    { scene: 'food_tea', title: '二崁杏仁茶', desc: '二崁聚落手工現磨的杏仁茶，溫潤香醇，搭配脆餅是巷弄裡最暖心的古早味。', shop: '二崁聚落・杏仁茶舖' },
    { scene: 'food_taro', title: '澎湖芋頭餐', desc: '在地栽種的香芋鬆軟綿密，可做芋籤、芋粿與芋頭冰，是西嶼的招牌農產滋味。', shop: '西嶼在地餐館' },
    { scene: 'food_cactus', title: '仙人掌冰', desc: '以澎湖野生仙人掌果實製成，鮮紅酸甜、消暑解膩，是澎湖夏日限定的代表冰品。', shop: '西嶼仙人掌冰店' },
    { scene: 'food_squid', title: '小管麵線', desc: '清晨現撈的鮮甜小管，與細麵線同煮，湯頭清爽鮮美，吃得到大海的味道。', shop: '外垵漁港海鮮' },
    { scene: 'food_seafood', title: '海港海鮮料理', desc: '石斑、象魚、龍蝦與各式現流魚貨，清蒸快炒最能嚐出西嶼海鮮的鮮甜本味。', shop: '內垵・外垵海產店' },
    { scene: 'food_brittle', title: '鹹餅・花生酥', desc: '澎湖傳統鹹餅外酥內香，搭配在地花生酥，是最受歡迎的伴手禮零嘴。', shop: '西嶼傳統餅舖' },
  ];
  $('#foodGrid').innerHTML = FOODS.map((f) => `
    <div class="flip" tabindex="0" role="button" aria-label="${f.title}，點擊翻面看介紹">
      <div class="flip-inner">
        <div class="flip-face flip-front"><div class="scene" style="background:${SCENES[f.scene]}"></div>
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
    const comp = actx.createDynamicsCompressor();
    comp.threshold.value = -20; comp.ratio.value = 3; comp.attack.value = 0.05; comp.release.value = 0.6;
    master.connect(comp).connect(actx.destination);
    const reverb = actx.createConvolver(); reverb.buffer = impulse(2.8, 2.4);
    const reverbGain = actx.createGain(); reverbGain.gain.value = 0.22; reverb.connect(reverbGain).connect(master);
    const noiseBuf = brownNoise(9);
    const track = (n) => { sessionNodes.push(n); return n; };
    const noiseSrc = () => { const s = track(actx.createBufferSource()); s.buffer = noiseBuf; s.loop = true; s.start(0, Math.random() * 8.5); return s; };
    // 海床
    const bed = noiseSrc();
    const bedLP = actx.createBiquadFilter(); bedLP.type = 'lowpass'; bedLP.frequency.value = 460; bedLP.Q.value = 0.4;
    const bedG = actx.createGain(); bedG.gain.value = 0.10; bed.connect(bedLP).connect(bedG); bedG.connect(master); bedG.connect(reverb);
    // 低頻海湧
    const rum = noiseSrc();
    const rumLP = actx.createBiquadFilter(); rumLP.type = 'lowpass'; rumLP.frequency.value = 120; rumLP.Q.value = 0.6;
    const rumG = actx.createGain(); rumG.gain.value = 0.06; rum.connect(rumLP).connect(rumG).connect(master);
    // 緩慢湧浪
    function swell(rate, pan, cutoff, baseGain, swing) {
      const src = noiseSrc();
      const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = cutoff; lp.Q.value = 0.7;
      const g = actx.createGain(); g.gain.value = baseGain;
      const pn = actx.createStereoPanner(); pn.pan.value = pan;
      src.connect(lp).connect(g).connect(pn); pn.connect(master); g.connect(reverb);
      const lfo = track(actx.createOscillator()); lfo.type = 'sine'; lfo.frequency.value = rate;
      const lfoG = actx.createGain(); lfoG.gain.value = swing; lfo.connect(lfoG).connect(g.gain);
      const lfoC = actx.createGain(); lfoC.gain.value = cutoff * 0.6; lfo.connect(lfoC).connect(lp.frequency);
      lfo.start();
    }
    swell(0.067, -0.5, 700, 0.17, 0.15);
    swell(0.049,  0.5, 620, 0.15, 0.14);
    // 浪花泡沫
    (function foam(rate, pan) {
      const src = noiseSrc();
      const hp = actx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1800; hp.Q.value = 0.5;
      const g = actx.createGain(); g.gain.value = 0.045;
      const pn = actx.createStereoPanner(); pn.pan.value = pan;
      src.connect(hp).connect(g).connect(pn); pn.connect(master); g.connect(reverb);
      const lfo = track(actx.createOscillator()); lfo.type = 'sine'; lfo.frequency.value = rate;
      const lfoG = actx.createGain(); lfoG.gain.value = 0.045; lfo.connect(lfoG).connect(g.gain); lfo.start();
    })(0.084, 0.3);
    master.gain.setValueAtTime(0, actx.currentTime);
    master.gain.linearRampToValueAtTime(0.5, actx.currentTime + 2.2);
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
