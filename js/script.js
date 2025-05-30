document.addEventListener("DOMContentLoaded", () => {
  // 平滑滾動
  const links = document.querySelectorAll("nav ul li a");
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector("nav ul");

  menuToggle?.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
  for (const link of links) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // 遊戲變數與元素
  const canvas = document.getElementById("bugGame");
  const ctx = canvas?.getContext("2d");
  const startBtn = document.getElementById("startGameBtn");
  const scoreDisplay = document.getElementById("scoreDisplay");

  const engineerImages = [];
  const bugImages = [];
  const maxFrame = 4;

  let isRunning = false;
  let frameCount = 0;
  let engineerFrame = 0;
  let bugFrame = 0;
  let score = 0;
  let highScore = parseInt(localStorage.getItem("bugHighScore")) || 0;

  const engineer = { x: 50, y: 150, width: 40, height: 40, dy: 0, jumping: false };
  const bug = { x: 600, y: 150, width: 40, height: 40, dx: -4 };

  // 載入所有圖片
  for (let i = 0; i < maxFrame; i++) {
    const eImg = new Image();
    eImg.src = `images/sprite_engineer_${i}.png`;
    engineerImages.push(eImg);

    const bImg = new Image();
    bImg.src = `images/sprite_bug_${i}.png`;
    bugImages.push(bImg);
  }

  function drawEngineer() {
    const img = engineerImages[engineerFrame];
    ctx.drawImage(img, engineer.x, engineer.y, engineer.width, engineer.height);
  }

  function drawBug() {
    const img = bugImages[bugFrame];
    ctx.drawImage(img, bug.x, bug.y, bug.width, bug.height);
  }

  function updateScoreDisplay() {
    scoreDisplay.textContent = `分數：${score}`;
  }

  function updateGame() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEngineer();
    drawBug();

    // 動畫 frame 切換
    frameCount++;
    if (frameCount % 10 === 0) {
      engineerFrame = (engineerFrame + 1) % maxFrame;
      bugFrame = (bugFrame + 1) % maxFrame;
    }

    // 重力與跳躍
    if (engineer.jumping) {
      engineer.dy += 1;
      engineer.y += engineer.dy;
      if (engineer.y >= 150) {
        engineer.y = 150;
        engineer.jumping = false;
        engineer.dy = 0;
      }
    }

    // 移動 BUG 並加分
    bug.x += bug.dx;
    if (bug.x + bug.width < 0) {
      bug.x = 600 + Math.random() * 200;
      score++;
      updateScoreDisplay();
      // 分數越高，BUG 越快（最多 -12）
      const newSpeed = Math.max(-12, -4 - Math.floor(score / 5));
      bug.dx = newSpeed;
    }

    // 碰撞檢測
    if (
      engineer.x < bug.x + bug.width &&
      engineer.x + engineer.width > bug.x &&
      engineer.y < bug.y + bug.height &&
      engineer.y + engineer.height > bug.y
    ) {
      endGame();
      return;
    }

    requestAnimationFrame(updateGame);
  }

  function updateHighScoreDisplay() {
    document.getElementById("highScoreDisplay").textContent = `最高分數：${highScore}`;
  }

  function startGame() {
    updateHighScoreDisplay();
    engineer.y = 150;
    engineer.dy = 0;
    engineer.jumping = false;

    bug.x = 600;
    bug.dx = -4;

    engineerFrame = 0;
    bugFrame = 0;
    frameCount = 0;
    score = 0;

    isRunning = true;
    canvas.style.display = "block";
    startBtn.style.display = "none";
    scoreDisplay.style.display = "block";
    updateScoreDisplay();
    updateGame();
  }

  function endGame() {
    isRunning = false;
    canvas.style.display = "none";
    startBtn.style.display = "inline-block";
    scoreDisplay.style.display = "none";
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("bugHighScore", highScore.toString());
    }
  }

  // 空白鍵跳躍，並禁用滾動
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && isRunning) {
      e.preventDefault();
      if (!engineer.jumping) {
        engineer.dy = -16;
        engineer.jumping = true;
      }
    }
  });
  // 手機觸控支援（畫面點一下跳躍）
  canvas.addEventListener("touchstart", () => {
    if (isRunning && !engineer.jumping) {
      engineer.dy = -20;
      engineer.jumping = true;
    }
  });


  // 開始遊戲
  startBtn?.addEventListener("click", () => {
    startGame();
  });
});

// 測試函式
function ooloo() {
  console.log("123");
}

document.getElementById("phishingBtn").addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    const link = document.createElement("a");
    link.href = `images/sprite_bug_${i % 4}.png`;  // 輪流下載 bug_0~3
    link.download = `bug_warning_${i + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});
