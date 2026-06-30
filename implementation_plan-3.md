# 澎湖西嶼鄉旅遊推廣網站 — 重構「古樸沿海閩南老漁村」美學規劃

為了呈現**「古樸、斑駁、帶有海鹽侵蝕質感與手工溫度」的深沉閩南老漁村美學**，並結合實用的導航功能，本專案將在「旅遊規劃」區塊中**深度整合 Google Maps 互動服務**，提供真實、流暢的行程導航地圖。

---

## 🎨 「古樸漁村」全新視覺與設計系統 (Rustic Heritage Design)

我們將網頁風格重構，改用以下具有**歲月手感**的設計語彙：

### 1. 斑駁與風化色彩計畫 (Weathered Color Palette)
*   **歲月煙燻紅 (Charcoal Terracotta)**: `#7A2224` 與 `#541517`，仿自長年吹襲東北季風與鹹雨、呈現斑駁發黑的古厝老紅磚。
*   **鹽蝕船漆青 (Oxidized Ship Teal)**: `#1E6B7B` 與 `#124E5B`，象徵海島漁民木造「大目船」上被海水侵蝕、斑駁脫落的孔雀藍綠船漆。
*   **煤油燈暈黃 (Kerosene Lamp Gold)**: `#C59B27`，溫暖的暗金色，代表廟宇煙燻金箔與舊時漁家煤油燈的微光。
*   **茶漬老宣紙 (Stained Parchment)**: `#F1EAD8` 作為底色，搭配 `#D9CDB0`，呈現發黃、帶有纖維雜質的古籍紙張質感。
*   **柱狀玄武岩褐 (Weathered Basalt)**: `#3E3C3A`，帶有石材粗糙紋理的深灰褐，用於極粗、帶有手繪感的邊框線。

### 2. 深度質地與圖案紋理 (Tactile Textures & Shapes)
*   **紙質與木紋紋理 (Paper & Wood Overlay)**: 整個網站疊加一層極微弱的「古舊宣紙」與「風化船木」粗糙濾鏡效果，消除現代網頁的扁平色塊。
*   **粗黑手繪線條 (Ink-stroke Borders)**: 卡片與容器捨棄現代圓角與細邊框，改用**粗細不均、帶有毛筆乾枯飛白墨跡**的炭黑色雙框線（仿閩南古籍排版）。
*   **木匾與門聯 (Wooden Signboards & Couplets)**: 區塊標題改用「懸掛木匾」質感呈現；內文開頭引入「朱紅底黑字」的春聯/對聯排版，營造古樸儒風。

---

## 🗺️ Google 地圖雙向聯動行程規劃 (Google Maps Integration)

旅遊規劃區塊將不再使用靜態的自繪 SVG 地圖，改為**內嵌 Google Maps 互動地圖與動態路線開啟功能**：

### 1. 內嵌 Google 地圖互動視窗 (Embedded Interactive Map)
*   網站將在右側嵌入一個帶有「老舊船木外框」的 Google 地圖 Iframe。
*   **動態跟隨定位**：當使用者在左側時間軸點擊不同景點（如「二崁聚落」、「池西岩瀑」）時，地圖會即時、流暢地重新定位至該景點的 Google 地圖實景座標，方便使用者查看周邊商家與街景。

### 2. 一鍵導航外部連結 (External Route Navigation)
*   地圖下方設計一個「🧭 開啟 Google Maps 完整路徑導航」按鈕。
*   **動態生成多點導航路徑**：當使用者選擇「半日遊」或「一日遊」時，按鈕會動態生成對應的 Google 地圖多點導航 URL。點擊後可直接在手機 App 或瀏覽器中開啟 pre-load 好的自駕路線：
    *   **半日遊 Google 導航路徑**：
        `https://www.google.com/maps/dir/通梁古榕/澎湖跨海大橋/二崁聚落保存區/大菓葉柱狀玄武岩/三仙塔`
    *   **一日遊 Google 導航路徑**：
        `https://www.google.com/maps/dir/通梁古榕/澎湖跨海大橋/小門鯨魚洞/竹灣大義宮/二崁聚落保存區/池西岩瀑/大菓葉柱狀玄武岩/內垵沙灘/西嶼西臺/漁翁島燈塔/三仙塔`

---

## 📷 真實影像資源庫規劃 (Verified Image Assets Map)

風景、人文與美食區塊將全數套用真實、高品質的實景相片連結（維基共享資源 Wikimedia Commons 與 Unsplash）：
*   **二崁古厝群**：[二崁聚落合院老街實景](https://upload.wikimedia.org/wikipedia/commons/1/1a/%E4%BA%8C%E5%B4%81%E5%8F%A4%E5%8E%9D.jpg)
*   **大菓葉玄武岩**：[大菓葉柱狀玄武岩壁](https://upload.wikimedia.org/wikipedia/commons/7/77/%E6%BE%8E%E6%B9%96%E5%A4%A7%E8%8F%93%E8%91%89%E7%8E%84%E6%AD%A6%E5%B2%A9.jpg)
*   **漁翁島燈塔**：[西嶼燈塔英式鐵塔外貌](https://upload.wikimedia.org/wikipedia/commons/2/29/Fisher_Island_Lighthouse_in_Taiwan_Penghu_%E6%BE%8E%E6%B9%96%E8%A5%BF%E5%B6%BC%E6%BC%81%E7%BF%81%E5%B3%B6%E7%87%88%E5%A1%94.jpg)
*   **池西岩瀑與九孔池**：[池西柱狀玄武岩與海岸九孔格地貌](https://upload.wikimedia.org/wikipedia/commons/e/e5/Chixi_Columnar_Basalt_in_Taiwan_Penghu_%E6%BE%8E%E6%B9%96%E6%B1%A0%E8%A5%BF%E5%B2%A9%E7%80%91.jpg)
*   **通梁古榕**：[古榕保安宮前氣根實景](https://upload.wikimedia.org/wikipedia/commons/a/ad/Taiwan-Penghu-Tongliang-Great-Banyan.JPG)
*   **澎湖跨海大橋**：[跨海大橋西嶼方向](https://upload.wikimedia.org/wikipedia/commons/c/c5/%E6%BE%8E%E6%B9%96%E8%B7%A8%E6%B5%B7%E5%A4%A7%E6%A9%8B--%E8%A5%BF%E5%B6%BC%E6%96%B9%E5%90%91.JPG)
*   **小門鯨魚洞**：[黑色玄武岩海蝕拱門](https://upload.wikimedia.org/wikipedia/commons/c/cd/%E9%AF%A8%E9%AD%9A%E6%B4%9E.jpg)
*   **西嶼西臺**：[西臺古堡紅磚隧道內部](https://upload.wikimedia.org/wikipedia/commons/5/52/%E6%BE%8E%E6%B9%96-%E8%A5%BF%E5%B6%BC%E8%A5%BF%E5%8F%B0%E9%9A%A7%E9%81%93%E5%85%A7.JPG)
*   **風土美食**：採用金門/澎湖古早豆花、傳統控肉黑糖刈包、柴燒烤餅（枕頭餅意象）、老陶碗杏仁茶、現炸海鮮（炸粿意象）與鮮甜海鮮麵線（小管麵線意象）等 Unsplash 與維基高品質相片。

---

## 預計修改檔案目錄

*   **[css/style.css](file:///c:/Users/ToniHuang/VibeCoding/Antigravity/css/style.css)**：完全替換色彩變數，移除 Overlay 載入樣式，加入老宣紙背景、直排格線、木紋卡片與花窗過渡。
*   **[index.html](file:///c:/Users/ToniHuang/VibeCoding/Antigravity/index.html)**：移除 `#scroll-overlay`；在旅遊規劃區更換為 Google Maps Iframe 與外部路徑按鈕結構；將风景卡片更換為木雕花窗結構。
*   **[js/main.js](file:///c:/Users/ToniHuang/VibeCoding/Antigravity/js/main.js)** & **[js/postcard.js](file:///c:/Users/ToniHuang/VibeCoding/Antigravity/js/postcard.js)**：移除畫卷開展邏輯，在 JavaScript 中更新實景相片連結；重構大灶音效與 Canvas 拓印質感。
*   **[js/planner.js](file:///c:/Users/ToniHuang/VibeCoding/Antigravity/js/planner.js)**：重寫邏輯，當切換半日/一日遊時，更新外部導航 Google 地圖網址；點擊時間軸節點時，動態切換 Iframe 之 src 以聚焦特定景點地標。
