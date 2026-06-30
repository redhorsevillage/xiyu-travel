/* =========================================================================
   planner.js (v4) — 探活踩風・Google 地圖整合
   ・左側時間軸點站 → 右側 Google 地圖 Iframe 平滑重新定位
   ・依「半日遊 / 一日遊」動態生成 Google Maps 多點導航 URL（一鍵開啟）
   ========================================================================= */
(function () {
  'use strict';

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  // q：嵌入地圖搜尋字串；nav：導航 URL 用地標名（依規劃指定）
  const ROUTES = {
    half: {
      label: '半日遊',
      stops: [
        { t: '09:00', name: '澎湖跨海大橋',     q: '澎湖跨海大橋',         nav: '澎湖跨海大橋',     desc: '跨越吼門水道，從這裡正式啟程前往漁翁島西嶼。' },
        { t: '09:30', name: '通梁古榕',         q: '通梁古榕 澎湖',         nav: '通梁古榕',         desc: '橋邊三百年古榕與保安宮，綠蔭蔽天的第一站。' },
        { t: '10:20', name: '二崁聚落保存區',   q: '二崁聚落 澎湖',         nav: '二崁聚落保存區',   desc: '閩南古厝、杏仁茶與二崁傳香。' },
        { t: '11:40', name: '大菓葉柱狀玄武岩', q: '大菓葉柱狀玄武岩 澎湖', nav: '大菓葉柱狀玄武岩', desc: '退潮水鏡倒映萬年六角石柱。' },
        { t: '12:30', name: '三仙塔',           q: '三仙塔 西嶼 澎湖',     nav: '三仙塔',           desc: '內垵高地眺望漁港與海景，半日收尾。' },
      ],
    },
    full: {
      label: '一日遊',
      stops: [
        { t: '09:00', name: '澎湖跨海大橋',     q: '澎湖跨海大橋',         nav: '澎湖跨海大橋',     desc: '跨越吼門水道，環島深度遊從這裡啟程。' },
        { t: '09:25', name: '通梁古榕',         q: '通梁古榕 澎湖',         nav: '通梁古榕',         desc: '橋邊三百年古榕與保安宮，綠蔭蔽天。' },
        { t: '10:00', name: '小門鯨魚洞',       q: '小門鯨魚洞 澎湖',       nav: '小門鯨魚洞',       desc: '黑色玄武岩海蝕拱門奇景。' },
        { t: '10:50', name: '竹篙灣大義宮',     q: '大義宮 竹篙灣 澎湖',     nav: '竹篙大義宮',       desc: '地下珊瑚洞與海龜的信仰名剎。' },
        { t: '11:40', name: '二崁聚落保存區',   q: '二崁聚落 澎湖',         nav: '二崁聚落保存區',   desc: '午前漫步閩南古厝、品杏仁茶。' },
        { t: '13:30', name: '池西岩石',         q: '池西岩石 澎湖',         nav: '池西岩石',         desc: '柱狀玄武岩與九孔池水鏡祕境。' },
        { t: '14:30', name: '大菓葉柱狀玄武岩', q: '大菓葉柱狀玄武岩 澎湖', nav: '大菓葉柱狀玄武岩', desc: '經典玄武岩石壁與倒影。' },
        { t: '15:30', name: '內垵沙灘',         q: '內垵遊憩區 澎湖',       nav: '內垵沙灘',         desc: '咕咾石海岸與海堤木棧道散步。' },
        { t: '16:10', name: '西嶼西台',         q: '西嶼西臺 澎湖',         nav: '西嶼西台',         desc: '清代海防砲臺國定古蹟紅磚隧道。' },
        { t: '17:00', name: '漁翁島燈塔',       q: '漁翁島燈塔 澎湖',       nav: '漁翁島燈塔',       desc: '台灣最古老白色燈塔賞夕陽。' },
        { t: '18:00', name: '三仙塔',           q: '三仙塔 西嶼 澎湖',     nav: '三仙塔',           desc: '內垵高地海景，圓滿收尾。' },
      ],
    },
  };

  const timeline = $('#timeline');
  const mapFrame = $('#mapFrame');
  const mapCap = $('#mapCap');
  const navBtn = $('#navBtn');

  const embedSrc = (q) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=15&hl=zh-TW&output=embed`;
  const navUrl = (stops) => 'https://www.google.com/maps/dir/' + stops.map((s) => encodeURIComponent(s.nav)).join('/');

  function focusStop(stop, idx) {
    mapFrame.src = embedSrc(stop.q);
    mapCap.textContent = `目前定位：${stop.name}`;
    $$('#timeline .stop').forEach((el, i) => el.classList.toggle('active', i === idx));
  }

  function renderRoute(key) {
    const route = ROUTES[key];
    timeline.innerHTML = route.stops.map((s, i) => `
      <div class="stop${i === 0 ? ' active' : ''}">
        <span class="dot">${i + 1}</span>
        <button type="button" data-idx="${i}">
          <span class="time">${s.t}</span>
          <h4>${s.name}</h4>
          <p>${s.desc}</p>
        </button>
      </div>`).join('');

    $$('#timeline .stop button').forEach((btn) => {
      const i = +btn.dataset.idx;
      btn.addEventListener('click', () => focusStop(route.stops[i], i));
    });

    // 導航按鈕：整條路線多點導航
    navBtn.href = navUrl(route.stops);
    navBtn.textContent = `🧭 開啟 Google Maps ${route.label}完整路徑導航`;

    // 預設定位到第一站
    focusStop(route.stops[0], 0);
  }

  $$('#routeTabs .route-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('#routeTabs .route-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      renderRoute(tab.dataset.route);
    });
  });

  renderRoute('half');
})();
