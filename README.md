# Information Security Awareness Website

**Live Demo:** https://ansenchen123.github.io/information-security/

This is a static, interactive education site that explains everyday information-security risks through plain-language sections, an embedded video, a simulated phishing interaction, and a small browser game.

## Features

- Security-awareness content in `index.html` covering password hygiene, phishing, malicious links, short-link risks, and practical protection tips.
- Responsive sticky navigation implemented with `css/style.css` and `js/script.js`, including a mobile menu toggle and smooth scrolling for section links.
- Image-backed topic sections using assets such as `images/password.png`, `images/phishing.png`, `images/protection.png`, and `images/shortlink.png`.
- Embedded YouTube explainer video in the Video section.
- Phishing trap demo wired in `js/script.js`; after a user clicks the demo button, the script downloads local warning sprites from `images/sprite_bug_0.png` through `images/sprite_bug_3.png`.
- Mini game on a canvas element using engineer and bug sprites, keyboard space-bar input, mobile touch input, score tracking, and browser local storage for the high score.

## Technology

- HTML5 content and page structure in `index.html`.
- CSS layout, responsive behavior, and visual styling in `css/style.css`.
- Vanilla JavaScript interactions and game logic in `js/script.js`.
- PNG illustration and sprite assets in `images/`.
- YouTube iframe embedding for the explainer video.

## Run Locally

Open `index.html` directly in a browser, or serve this folder with any static file server.

```powershell
python -m http.server 8000
```

Then open the local server URL shown by the command.

## Project Structure

```text
information-security/
  index.html
  css/style.css
  js/script.js
  images/
```

## Notes

The phishing trap is a controlled local demonstration. It does not collect credentials or contact an external endpoint, but it intentionally triggers multiple local image downloads to illustrate why suspicious clicks can have unexpected effects.

## 繁體中文摘要

- 本專案是一個靜態資安教育網站，主題包含密碼安全、釣魚攻擊、惡意連結與短網址風險。
- 開頭提供線上展示連結，方便直接檢視網站成品。
- 網站內容包含圖片式主題區塊、嵌入式 YouTube 說明影片、釣魚互動示範與小型瀏覽器遊戲。
- JavaScript 負責導覽捲動、手機選單、示範下載、遊戲控制、分數與最高分紀錄。
- 整體目標是用中性、易理解的方式呈現日常資安觀念，適合課堂展示或基礎宣導使用。
