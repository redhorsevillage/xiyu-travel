/* =========================================================================
   postcard.js (v3) — 寄情漁翁島・DIY 明信片（HTML5 Canvas）
   功能：選背景、拖曳/縮放/刪除手繪貼紙（滑鼠 + 觸控）、寄語字體、下載 PNG
   漁翁島・西嶼鄉旅遊網站「澎湖沿海漁村文化」
   ========================================================================= */
(function () {
  'use strict';

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  const canvas = $('#pcCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width;   // 800
  const H = canvas.height;  // 520

  /* 調色 */
  /* 古樸漁港 weathered 調色 */
  const C = {
    brick: '#7A2224', brickWarm: '#A8351F', stone: '#F1EAD8', stoneSh: '#D9CDB0',
    basalt: '#5A5550', basaltD: '#3E3C3A', teal: '#1E6B7B', tealL: '#2E8FA3',
    gold: '#C59B27', green: '#5E7A3E', greenD: '#445A2C', skin: '#E4C39A', gull: '#F1EAD8',
  };

  /* =====================================================================
     背景風景（canvas 版，對應網站景緻）
  ===================================================================== */
  const BACKGROUNDS = [
    { id: 'erkan', label: '二崁古厝' },
    { id: 'basalt', label: '玄武岩' },
    { id: 'lighthouse', label: '漁翁燈塔' },
    { id: 'whale', label: '鯨魚洞' },
    { id: 'weir', label: '雙心石滬' },
    { id: 'sunset', label: '夕陽海岸' },
  ];

  function paintBackground(id) {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    switch (id) {
      case 'erkan':
        g.addColorStop(0, '#9FBEC2'); g.addColorStop(0.34, '#B9D0D2');
        g.addColorStop(0.3401, '#E9DEC2'); g.addColorStop(1, '#D9CDB0');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        for (let i = 0; i < 4; i++) {
          const bx = 70 + i * 185, by = H * 0.44 + (i % 2) * 40;
          ctx.fillStyle = '#E9DEC2'; ctx.fillRect(bx, by, 150, H - by);
          ctx.fillStyle = i % 2 ? '#7A2224' : '#541517';
          ctx.beginPath();
          ctx.moveTo(bx - 14, by); ctx.quadraticCurveTo(bx + 75, by - 52, bx + 164, by); // 馬背曲線
          ctx.closePath(); ctx.fill();
        }
        break;
      case 'basalt':
        g.addColorStop(0, '#D9CDB0'); g.addColorStop(0.26, '#B7A57E');
        g.addColorStop(0.2601, '#3E3C3A'); g.addColorStop(1, '#242220');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        for (let x = 0; x < W; x += 30) {
          ctx.fillStyle = (x / 30) % 2 ? 'rgba(36,34,32,.6)' : 'rgba(90,85,80,.4)';
          ctx.fillRect(x, H * 0.26, 14, H * 0.74);
        }
        break;
      case 'lighthouse':
        g.addColorStop(0, '#0E3D47'); g.addColorStop(0.42, '#124E5B'); g.addColorStop(0.6, '#1E6B7B');
        g.addColorStop(0.6001, '#15565F'); g.addColorStop(1, '#0E3D47');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = 'rgba(246,224,160,.95)'; ctx.beginPath(); ctx.arc(W * 0.74, H * 0.26, 52, 0, 7); ctx.fill();
        ctx.fillStyle = '#F1EAD8'; ctx.beginPath();
        ctx.moveTo(W * 0.24 - 18, H * 0.6); ctx.lineTo(W * 0.24 - 11, H * 0.26);
        ctx.lineTo(W * 0.24 + 11, H * 0.26); ctx.lineTo(W * 0.24 + 18, H * 0.6); ctx.closePath(); ctx.fill();
        ctx.fillStyle = C.brick; ctx.fillRect(W * 0.24 - 12, H * 0.26, 24, 12);
        break;
      case 'whale':
        g.addColorStop(0, '#1E6B7B'); g.addColorStop(0.64, '#124E5B'); g.addColorStop(0.6401, '#3E3C3A'); g.addColorStop(1, '#242220');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#242220'; ctx.beginPath(); ctx.ellipse(W * 0.5, H * 0.78, 150, 90, 0, Math.PI, 0); ctx.fill();
        ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(W * 0.5, H * 0.82, 55, 45, 0, Math.PI, 0); ctx.fill();
        break;
      case 'weir':
        g.addColorStop(0, '#1E6B7B'); g.addColorStop(0.7, '#124E5B'); g.addColorStop(1, '#0E3D47');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = '#F1EAD8'; ctx.lineWidth = 14; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.ellipse(W * 0.5, H * 0.74, 150, 88, 0, Math.PI * 0.04, Math.PI * 0.96); ctx.stroke();
        break;
      case 'sunset':
        g.addColorStop(0, '#7A2224'); g.addColorStop(0.36, '#C59B27'); g.addColorStop(0.58, '#E9DEC2');
        g.addColorStop(0.5801, '#1E6B7B'); g.addColorStop(1, '#124E5B');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = 'rgba(246,224,160,.95)'; ctx.beginPath(); ctx.arc(W * 0.68, H * 0.36, 66, 0, 7); ctx.fill();
        break;
      default:
        g.addColorStop(0, '#1E6B7B'); g.addColorStop(1, '#0E3D47'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }
  }

  /* =====================================================================
     貼紙：手繪向量（座標系 -50..50，中心原點）
  ===================================================================== */
  const STICKERS = {
    stone: {
      label: '石敢當',
      draw(c) {
        c.fillStyle = C.stone; c.strokeStyle = C.basaltD; c.lineWidth = 4;
        c.beginPath();
        c.moveTo(-22, 46); c.lineTo(-22, -28); c.quadraticCurveTo(0, -50, 22, -28); c.lineTo(22, 46); c.closePath();
        c.fill(); c.stroke();
        c.fillStyle = C.brick; c.font = '900 17px "Noto Serif TC", serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillText('石', 0, -16); c.fillText('敢', 0, 4); c.fillText('當', 0, 24);
      },
    },
    diver: {
      label: '討海女',
      draw(c) {
        // 臉
        c.fillStyle = C.skin; c.beginPath(); c.arc(0, 6, 22, 0, 7); c.fill();
        // 頭巾（花布）
        c.fillStyle = C.brick;
        c.beginPath(); c.moveTo(-28, 6); c.quadraticCurveTo(-30, -34, 0, -36); c.quadraticCurveTo(30, -34, 28, 6);
        c.quadraticCurveTo(20, -6, 0, -8); c.quadraticCurveTo(-20, -6, -28, 6); c.fill();
        // 兩側垂巾
        c.beginPath(); c.moveTo(-28, 4); c.lineTo(-34, 30); c.lineTo(-20, 24); c.closePath(); c.fill();
        c.beginPath(); c.moveTo(28, 4); c.lineTo(34, 30); c.lineTo(20, 24); c.closePath(); c.fill();
        // 花布白點
        c.fillStyle = C.stone;
        [[-14, -20], [4, -26], [18, -16], [-6, -14]].forEach((p) => { c.beginPath(); c.arc(p[0], p[1], 2.4, 0, 7); c.fill(); });
        // 五官
        c.fillStyle = C.basaltD;
        c.beginPath(); c.arc(-8, 4, 2.2, 0, 7); c.fill(); c.beginPath(); c.arc(8, 4, 2.2, 0, 7); c.fill();
        c.strokeStyle = C.brickWarm; c.lineWidth = 2; c.beginPath(); c.arc(0, 10, 7, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke();
      },
    },
    coral: {
      label: '咾咕石',
      draw(c) {
        c.fillStyle = C.stone; c.strokeStyle = C.stoneSh; c.lineWidth = 3;
        const rh = (x, y, s) => { c.beginPath(); c.moveTo(x, y - s); c.lineTo(x + s, y); c.lineTo(x, y + s); c.lineTo(x - s, y); c.closePath(); c.fill(); c.stroke(); };
        rh(-16, 6, 18); rh(18, 0, 20); rh(2, -22, 15); rh(6, 30, 16);
        // 珊瑚孔
        c.fillStyle = C.stoneSh;
        [[-16, 6], [18, 0], [2, -22], [6, 30], [22, 4], [-12, 2]].forEach((p) => { c.beginPath(); c.arc(p[0], p[1], 2.2, 0, 7); c.fill(); });
      },
    },
    cactus: {
      label: '仙人掌',
      draw(c) {
        c.strokeStyle = C.greenD; c.lineWidth = 3; c.fillStyle = C.green;
        const limb = (x, y, w, h) => { c.beginPath(); c.moveTo(x - w, y + h); c.lineTo(x - w, y - h + w); c.quadraticCurveTo(x - w, y - h, x, y - h); c.quadraticCurveTo(x + w, y - h, x + w, y - h + w); c.lineTo(x + w, y + h); c.closePath(); c.fill(); c.stroke(); };
        limb(0, 8, 11, 40);        // 主幹
        limb(-20, 6, 7, 20);       // 左臂
        limb(20, 0, 7, 24);        // 右臂
        // 紅果實
        c.fillStyle = C.brick; c.beginPath(); c.arc(0, -34, 6, 0, 7); c.fill();
        c.beginPath(); c.arc(20, -26, 5, 0, 7); c.fill();
        // 刺點
        c.strokeStyle = C.stone; c.lineWidth = 1.4;
        for (let y = -28; y < 44; y += 12) { c.beginPath(); c.moveTo(-4, y); c.lineTo(4, y); c.stroke(); }
      },
    },
    weir: {
      label: '雙心石滬',
      draw(c) {
        c.strokeStyle = C.stone; c.lineWidth = 6; c.lineCap = 'round'; c.lineJoin = 'round';
        const heart = (cx, sc) => {
          c.beginPath();
          c.moveTo(cx, 24 * sc + 6);
          c.bezierCurveTo(cx - 34 * sc, -2 * sc, cx - 18 * sc, -30 * sc, cx, -14 * sc);
          c.bezierCurveTo(cx + 18 * sc, -30 * sc, cx + 34 * sc, -2 * sc, cx, 24 * sc + 6);
          c.stroke();
        };
        heart(-12, 0.8); heart(14, 1);
      },
    },
    boat: {
      label: '大目船',
      draw(c) {
        // 船身
        c.fillStyle = C.brickWarm; c.strokeStyle = C.basaltD; c.lineWidth = 3;
        c.beginPath(); c.moveTo(-42, 6); c.quadraticCurveTo(0, 34, 42, 6); c.lineTo(34, 18); c.quadraticCurveTo(0, 30, -34, 18); c.closePath(); c.fill(); c.stroke();
        // 船舷紅白
        c.fillStyle = C.stone; c.beginPath(); c.moveTo(-40, 4); c.quadraticCurveTo(0, 26, 40, 4); c.lineTo(38, -2); c.quadraticCurveTo(0, 18, -38, -2); c.closePath(); c.fill();
        // 大目（船眼）
        c.fillStyle = C.stone; c.beginPath(); c.ellipse(-22, 0, 11, 9, 0, 0, 7); c.fill();
        c.fillStyle = C.basaltD; c.beginPath(); c.arc(-24, 0, 4.5, 0, 7); c.fill();
        c.strokeStyle = C.basaltD; c.lineWidth = 2; c.beginPath(); c.ellipse(-22, 0, 11, 9, 0, 0, 7); c.stroke();
        // 桅杆
        c.strokeStyle = C.basalt; c.lineWidth = 3; c.beginPath(); c.moveTo(14, 4); c.lineTo(14, -34); c.stroke();
        c.fillStyle = C.teal; c.beginPath(); c.moveTo(14, -32); c.lineTo(36, -16); c.lineTo(14, -8); c.closePath(); c.fill();
      },
    },
  };

  /* =====================================================================
     狀態
  ===================================================================== */
  let state = {
    bg: 'sunset',
    msg: '',
    font: 'serif',
    items: [],          // {type, x, y, size}
    selected: -1,
  };
  let exporting = false;
  const BASE = 100;       // 貼紙設計座標尺寸
  const MIN_SIZE = 56, MAX_SIZE = 340;

  /* =====================================================================
     繪製
  ===================================================================== */
  function drawSticker(it) {
    const def = STICKERS[it.type]; if (!def) return;
    ctx.save();
    ctx.translate(it.x, it.y);
    ctx.scale(it.size / BASE, it.size / BASE);
    ctx.shadowColor = 'rgba(0,0,0,.28)'; ctx.shadowBlur = 8; ctx.shadowOffsetX = 2; ctx.shadowOffsetY = 3;
    def.draw(ctx);
    ctx.restore();
  }

  function wrapText(text, x, y, maxWidth, lineHeight) {
    const chars = text.split(''); let line = '', cy = y;
    for (let i = 0; i < chars.length; i++) {
      const test = line + chars[i];
      if (ctx.measureText(test).width > maxWidth && line) { ctx.fillText(line, x, cy); line = chars[i]; cy += lineHeight; }
      else line = test;
    }
    ctx.fillText(line, x, cy);
  }

  function redraw() {
    ctx.clearRect(0, 0, W, H);
    paintBackground(state.bg);

    // 貼紙
    state.items.forEach(drawSticker);

    // 砂白外框
    ctx.strokeStyle = 'rgba(241,234,216,.95)'; ctx.lineWidth = 18; ctx.strokeRect(9, 9, W - 18, H - 18);

    // 寄語標籤
    const msg = state.msg || '願你也來聽聽，西嶼的海風。';
    const boxH = 92;
    ctx.fillStyle = 'rgba(241,234,216,.92)'; ctx.fillRect(40, H - boxH - 38, W - 80, boxH);
    ctx.strokeStyle = C.brickWarm; ctx.lineWidth = 3; ctx.strokeRect(47, H - boxH - 31, W - 94, boxH - 14);
    ctx.fillStyle = C.basaltD; ctx.textBaseline = 'top'; ctx.textAlign = 'left';
    const font = state.font === 'brush' ? '"Ma Shan Zheng", "Noto Serif TC", cursive' : '"Noto Serif TC", serif';
    const fsize = state.font === 'brush' ? 34 : 28;
    ctx.font = `${state.font === 'brush' ? '400' : '700'} ${fsize}px ${font}`;
    wrapText(msg, 70, H - boxH - 18, W - 150, fsize + 12);

    // 左上標題
    ctx.fillStyle = 'rgba(241,234,216,.96)'; ctx.font = '900 26px "Noto Serif TC", serif'; ctx.textAlign = 'left';
    ctx.fillText('漁翁島・西嶼', 44, 42);
    ctx.font = '700 13px "Noto Sans TC", sans-serif'; ctx.fillStyle = 'rgba(241,234,216,.82)';
    ctx.fillText('PENGHU XIYU TOWNSHIP', 46, 76);

    // 右上印章
    ctx.save(); ctx.translate(W - 96, 64); ctx.rotate(-0.1);
    ctx.strokeStyle = 'rgba(241,234,216,.9)'; ctx.lineWidth = 3; ctx.strokeRect(-30, -30, 60, 60);
    ctx.fillStyle = 'rgba(241,234,216,.94)'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = '900 22px "Noto Serif TC", serif'; ctx.fillText('漁', 0, -2);
    ctx.font = '700 9px "Noto Sans TC", sans-serif'; ctx.fillText('XIYU', 0, 18);
    ctx.restore();

    // 選取框 + 縮放控點（不輸出到 PNG）
    if (!exporting && state.selected >= 0) {
      const it = state.items[state.selected]; const h = it.size / 2;
      ctx.save();
      ctx.strokeStyle = C.teal; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
      ctx.strokeRect(it.x - h, it.y - h, it.size, it.size); ctx.setLineDash([]);
      // 控點
      ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(it.x + h, it.y + h, 11, 0, 7); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = '700 13px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('⤢', it.x + h, it.y + h);
      ctx.restore();
    }
  }

  /* =====================================================================
     座標轉換 + 命中測試
  ===================================================================== */
  function toCanvas(ev) {
    const r = canvas.getBoundingClientRect();
    return { x: (ev.clientX - r.left) * (W / r.width), y: (ev.clientY - r.top) * (H / r.height) };
  }
  function hitSticker(p) {
    for (let i = state.items.length - 1; i >= 0; i--) {
      const it = state.items[i]; const h = it.size / 2;
      if (p.x >= it.x - h && p.x <= it.x + h && p.y >= it.y - h && p.y <= it.y + h) return i;
    }
    return -1;
  }
  function onHandle(p) {
    if (state.selected < 0) return false;
    const it = state.items[state.selected]; const h = it.size / 2;
    return Math.hypot(p.x - (it.x + h), p.y - (it.y + h)) <= 16;
  }

  /* =====================================================================
     互動（Pointer Events：滑鼠 + 觸控統一）
  ===================================================================== */
  let mode = null, dragOff = { x: 0, y: 0 }, moved = false;
  let lastTap = 0, lastTapPos = { x: 0, y: 0 };

  canvas.addEventListener('pointerdown', (ev) => {
    ev.preventDefault();
    canvas.setPointerCapture(ev.pointerId);
    const p = toCanvas(ev); moved = false;

    if (onHandle(p)) { mode = 'resize'; return; }
    const hit = hitSticker(p);
    if (hit >= 0) {
      state.selected = hit; mode = 'drag';
      // 置頂
      const it = state.items.splice(hit, 1)[0]; state.items.push(it); state.selected = state.items.length - 1;
      const cur = state.items[state.selected];
      dragOff = { x: p.x - cur.x, y: p.y - cur.y };
    } else {
      state.selected = -1; mode = null;
    }
    redraw();
  });

  canvas.addEventListener('pointermove', (ev) => {
    if (!mode) return;
    const p = toCanvas(ev); moved = true;
    const it = state.items[state.selected]; if (!it) return;
    if (mode === 'drag') {
      it.x = Math.max(0, Math.min(W, p.x - dragOff.x));
      it.y = Math.max(0, Math.min(H, p.y - dragOff.y));
    } else if (mode === 'resize') {
      const d = Math.max(Math.abs(p.x - it.x), Math.abs(p.y - it.y)) * 2;
      it.size = Math.max(MIN_SIZE, Math.min(MAX_SIZE, d));
    }
    redraw();
  });

  function endPointer(ev) {
    const wasDragging = moved;
    mode = null;
    if (wasDragging) { lastTap = 0; return; } // 拖曳結束不算點擊

    // 靜止點擊 → 偵測雙擊/雙點刪除（含貼紙上）
    const p = toCanvas(ev);
    const now = Date.now();
    if (now - lastTap < 320 && Math.hypot(p.x - lastTapPos.x, p.y - lastTapPos.y) < 28) {
      const hit = hitSticker(p);
      if (hit >= 0) { state.items.splice(hit, 1); state.selected = -1; redraw(); }
      lastTap = 0;
    } else {
      lastTap = now; lastTapPos = p;
    }
  }
  canvas.addEventListener('pointerup', endPointer);
  canvas.addEventListener('pointercancel', () => { mode = null; });

  /* =====================================================================
     控制面板
  ===================================================================== */
  // 背景
  $('#bgPick').innerHTML = BACKGROUNDS.map((b, i) => `
    <button class="pc-chip ${i === 0 && state.bg === b.id ? 'active' : ''}" data-bg="${b.id}">
      <span class="bg" style="background:${(window.XIYU && window.XIYU.SCENES[b.id]) || '#1E6B7B'}"></span>${b.label}
    </button>`).join('');
  // 標記目前選中背景
  $$('#bgPick .pc-chip').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.bg === state.bg);
    btn.addEventListener('click', () => {
      $$('#bgPick .pc-chip').forEach((x) => x.classList.remove('active'));
      btn.classList.add('active'); state.bg = btn.dataset.bg; redraw();
    });
  });

  // 貼紙列
  $('#stickerTray').innerHTML = Object.keys(STICKERS).map((key) => {
    // 以離屏方式產生小縮圖：用 SVG foreignless，改以行內 canvas 繪圖較複雜，這裡用簡單標籤 + 圖示
    return `<button class="sticker-btn" data-sticker="${key}" title="${STICKERS[key].label}" aria-label="加入${STICKERS[key].label}">
      <canvas width="64" height="64" class="thumb"></canvas>
    </button>`;
  }).join('');
  // 繪製貼紙縮圖
  $$('#stickerTray .sticker-btn').forEach((btn) => {
    const key = btn.dataset.sticker;
    const tc = btn.querySelector('canvas').getContext('2d');
    tc.save(); tc.translate(32, 32); tc.scale(0.5, 0.5); STICKERS[key].draw(tc); tc.restore();
    btn.addEventListener('click', () => addSticker(key));
  });

  function addSticker(type) {
    const n = state.items.length;
    state.items.push({ type, x: W / 2 + (n % 3 - 1) * 70, y: H / 2 - 40 + (n % 2) * 50, size: 120 });
    state.selected = state.items.length - 1;
    redraw();
  }

  // 寄語
  const pcMsg = $('#pcMsg');
  pcMsg.addEventListener('input', () => { state.msg = pcMsg.value; redraw(); });

  // 字體
  $$('#fontPick button').forEach((b) => {
    b.addEventListener('click', () => {
      $$('#fontPick button').forEach((x) => x.classList.remove('active'));
      b.classList.add('active'); state.font = b.dataset.font; redraw();
    });
  });

  // 清除貼紙
  $('#pcClear').addEventListener('click', () => { state.items = []; state.selected = -1; redraw(); });

  // 下載
  $('#pcDownload').addEventListener('click', () => {
    exporting = true; const sel = state.selected; state.selected = -1; redraw();
    const url = canvas.toDataURL('image/png');
    exporting = false; state.selected = sel; redraw();
    const a = document.createElement('a'); a.download = '漁翁島明信片.png'; a.href = url; a.click();
  });

  // 字型載入後重繪
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(redraw);
  redraw();
})();
