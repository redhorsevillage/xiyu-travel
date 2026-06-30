# 漁翁島・西嶼鄉旅遊網站 🏝️

澎湖縣**西嶼鄉（漁翁島）**旅遊推廣概念網站 —— 以**古樸斑駁的漁港復古美學**呈現西嶼的歷史、人文、海天奇景與在地滋味，並整合 **Google 地圖互動路線**與**手作明信片**功能。

[![Live Demo](https://img.shields.io/badge/🌊_線上展示-GitHub_Pages-1E6B7B?style=for-the-badge)](https://redhorsevillage.github.io/xiyu-travel/)
[![License: MIT](https://img.shields.io/badge/License-MIT-C59B27.svg?style=for-the-badge)](LICENSE)
![HTML/CSS/JS](https://img.shields.io/badge/Stack-HTML_·_CSS_·_JS-7A2224?style=for-the-badge)

> 🔗 **線上展示**：<https://redhorsevillage.github.io/xiyu-travel/>
> 本站為設計示範作品，景點與店家資訊請以澎湖縣政府觀光發展處公告為準。

---

## 🖼️ 預覽

![首頁 Hero](docs/screenshots/hero.png)

<details>
<summary>📜 點此展開「全站總覽」長截圖</summary>

![全站總覽](docs/screenshots/full.png)

</details>

---

## ✨ 主要特色

| 區塊 | 內容 |
|------|------|
| 🏮 漁翁故事 | 仿古宣紙捲軸 + 時間軸，述說西嶼從荷據、清海防到日治燈塔的百年歷史 |
| ⛩️ 歲時節慶 | 咾咕石古厝、澎湖菜宅、海神信仰與石敢當的人文與信仰（風化磚牆背景） |
| 🌊 海天奇景 | 二崁聚落、大菓葉柱狀玄武岩、漁翁島燈塔、池西岩石（**真實 Wikimedia 影像** + 燈箱） |
| 🦪 鹹鮮風味 | 杏仁茶、芋頭餐、仙人掌冰、小管麵線等翻轉木牌卡片 |
| 🗺️ 探活踩風 | **內嵌 Google Maps**：點站即時定位 + 一鍵多點導航（半日遊／一日遊） |
| ✉️ 寄情明信片 | HTML5 Canvas：可拖曳/縮放/刪除手繪貼紙（支援觸控）、宋體/毛筆字體、下載 PNG |

其他：**ASMR 海潮背景音景**（WebAudio 程序生成，無外部音檔）、響應式設計（RWD）、捲動進場動畫、`prefers-reduced-motion` 降載。

---

## 🎨 設計系統「古樸漁港」

| 色彩 | 色碼 |
|------|------|
| 歲月磚絳紅 Charcoal Terracotta | `#7A2224` / `#541517` |
| 鹽蝕船漆青 Oxidized Ship Teal | `#1E6B7B` / `#124E5B` |
| 煤油燈金 Kerosene Lamp Gold | `#C59B27` |
| 茶漬舊宣紙 Stained Parchment | `#F1EAD8` / `#D9CDB0` |
| 風化玄武岩褐 Weathered Basalt | `#3E3C3A` |

質感元素：舊宣紙顆粒覆蓋層、飛白墨跡邊框、木匾標題、麻繩飾帶、燕尾脊分隔。
字體：`Noto Serif TC`（標題）、`Noto Sans TC`（內文）、`Ma Shan Zheng`（毛筆）。

---

## 📁 專案結構

```
01.Xiyu/
├── index.html          # 主網頁（6 大區塊）
├── css/
│   └── style.css       # 古樸漁港設計系統、紙紋、墨框、木匾
├── js/
│   ├── main.js         # 導覽、捲動、景點/美食彈窗、ASMR 海潮音景
│   ├── planner.js      # Google 地圖嵌入定位 + 多點導航 URL
│   └── postcard.js     # Canvas 明信片（拖曳貼紙、下載 PNG）
├── assets/             # 視覺素材說明
└── README.md
```

---

## 🚀 本機預覽

本站為純靜態網頁，直接以瀏覽器開啟 `index.html` 即可。

若 Google 地圖嵌入或實景照片未顯示，多半是 `file://` 的 referrer 限制；建議以本機伺服器預覽：

```bash
# Python 3
python -m http.server 8000
# 然後開啟 http://localhost:8000
```

> Google 地圖與 Wikimedia 實景照片需要連網。

---

## 🙏 致謝 / 來源

- 實景照片：[Wikimedia Commons](https://commons.wikimedia.org/)
- 字體：[Google Fonts](https://fonts.google.com/)
- 地圖：[Google Maps](https://www.google.com/maps)

---

## 📜 版本演進

- **v4 古樸漁港**（現行）：weathered 復古美學 + Google 地圖整合 + 真實影像
- v3 閩南漁村：咾咕石、燕尾脊、花磚、紅磚牆
- v2 沖繩昭和：昭和旅行手帖風
- v1 初版：現代海島風

> 歷史版本備份保留於本機 `backup_*/`（未納入 Git）。
