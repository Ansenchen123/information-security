document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav ul li a");
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector("nav ul");

  menuToggle?.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  for (const link of links) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const isMobile = window.innerWidth <= 768;
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: isMobile ? "start" : "center",
        });
        if (isMobile) {
          navMenu.classList.remove("active");
        }
      }
    });
  }

  const canvas = document.getElementById("bugGame");
  const ctx = canvas?.getContext("2d");
  const startBtn = document.getElementById("startGameBtn");
  const scoreDisplay = document.getElementById("scoreDisplay");
  const highScoreDisplay = document.getElementById("highScoreDisplay");

  const engineerImages = [];
  const bugImages = [];
  const maxFrame = 4;

  let isRunning = false;
  let frameCount = 0;
  let engineerFrame = 0;
  let bugFrame = 0;
  let score = 0;
  let highScore = parseInt(localStorage.getItem("bugHighScore"), 10) || 0;

  const engineer = { x: 50, y: 150, width: 40, height: 40, dy: 0, jumping: false };
  const bug = { x: 600, y: 150, width: 40, height: 40, dx: -4 };

  for (let i = 0; i < maxFrame; i += 1) {
    const engineerImage = new Image();
    engineerImage.src = `images/sprite_engineer_${i}.png`;
    engineerImages.push(engineerImage);

    const bugImage = new Image();
    bugImage.src = `images/sprite_bug_${i}.png`;
    bugImages.push(bugImage);
  }

  function drawEngineer() {
    ctx.drawImage(engineerImages[engineerFrame], engineer.x, engineer.y, engineer.width, engineer.height);
  }

  function drawBug() {
    ctx.drawImage(bugImages[bugFrame], bug.x, bug.y, bug.width, bug.height);
  }

  function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
  }

  function updateHighScoreDisplay() {
    highScoreDisplay.textContent = `High Score: ${highScore}`;
  }

  function endGame() {
    isRunning = false;
    canvas.style.display = "none";
    startBtn.style.display = "inline-flex";
    scoreDisplay.style.display = "none";

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("bugHighScore", highScore.toString());
      updateHighScoreDisplay();
    }
  }

  function updateGame() {
    if (!isRunning) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEngineer();
    drawBug();

    frameCount += 1;
    if (frameCount % 10 === 0) {
      engineerFrame = (engineerFrame + 1) % maxFrame;
      bugFrame = (bugFrame + 1) % maxFrame;
    }

    if (engineer.jumping) {
      engineer.dy += 1;
      engineer.y += engineer.dy;
      if (engineer.y >= 150) {
        engineer.y = 150;
        engineer.dy = 0;
        engineer.jumping = false;
      }
    }

    bug.x += bug.dx;
    if (bug.x + bug.width < 0) {
      bug.x = 600 + Math.random() * 200;
      score += 1;
      updateScoreDisplay();
      bug.dx = Math.max(-12, -4 - Math.floor(score / 5));
    }

    const collided =
      engineer.x < bug.x + bug.width &&
      engineer.x + engineer.width > bug.x &&
      engineer.y < bug.y + bug.height &&
      engineer.y + engineer.height > bug.y;

    if (collided) {
      endGame();
      return;
    }

    requestAnimationFrame(updateGame);
  }

  function startGame() {
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

    updateHighScoreDisplay();
    updateScoreDisplay();

    canvas.style.display = "block";
    scoreDisplay.style.display = "block";
    startBtn.style.display = "none";
    updateGame();
  }

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && isRunning) {
      event.preventDefault();
      if (!engineer.jumping) {
        engineer.dy = -16;
        engineer.jumping = true;
      }
    }
  });

  canvas?.addEventListener("touchstart", () => {
    if (isRunning && !engineer.jumping) {
      engineer.dy = -20;
      engineer.jumping = true;
    }
  });

  startBtn?.addEventListener("click", startGame);
  updateHighScoreDisplay();
});

document.getElementById("phishingBtn").addEventListener("click", () => {
  for (let index = 0; index < 10; index += 1) {
    const link = document.createElement("a");
    link.href = `images/sprite_bug_${index % 4}.png`;
    link.download = `bug_warning_${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});
