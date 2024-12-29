const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
const playRestartBtn = document.getElementById("play-restart-btn");
const easyBtn = document.getElementById("easy-btn");
const mediumBtn = document.getElementById("medium-btn");
const hardBtn = document.getElementById("hard-btn");

let snake = [{ x: 200, y: 200 }];
let food = { x: 100, y: 100 };
let direction = { x: 20, y: 0 };
let score = 0;
let gameInterval;
let gameSpeed = 200; // Default speed
let isPaused = true;

// Mobile Controls
const upBtn = document.getElementById("up-btn");
const downBtn = document.getElementById("down-btn");
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");

// Initialize Game
function startGame() {
  snake = [{ x: 200, y: 200 }];
  food = { x: randomPosition(), y: randomPosition() };
  direction = { x: 20, y: 0 };
  score = 0;
  updateScore();
  clearInterval(gameInterval);
  gameInterval = setInterval(updateGame, gameSpeed);
  isPaused = false;
  playRestartBtn.textContent = "Restart";
  playRestartBtn.classList.remove("btn-success");
  playRestartBtn.classList.add("btn-danger");
}

// Update Game Logic
function updateGame() {
  if (isPaused) return;

  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check collisions
  if (head.x < 0 || head.y < 0 || head.x >= 400 || head.y >= 400 || checkCollision(head)) {
    clearInterval(gameInterval);
    alert("Game Over! Your score: " + score);
    playRestartBtn.textContent = "Play";
    playRestartBtn.classList.remove("btn-danger");
    playRestartBtn.classList.add("btn-success");
    isPaused = true;
    return;
  }

  // Add new head
  snake.unshift(head);

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    food = { x: randomPosition(), y: randomPosition() };
  } else {
    snake.pop(); // Remove tail if no food eaten
  }

  renderGame();
}

// Render Game
function renderGame() {
  board.innerHTML = ''; // Clear the board

  // Draw snake
  snake.forEach(segment => {
    const snakeSegment = document.createElement('div');
    snakeSegment.classList.add('snake');
    snakeSegment.style.left = `${segment.x}px`;
    snakeSegment.style.top = `${segment.y}px`;
    board.appendChild(snakeSegment);
  });

  // Draw food
  const foodElement = document.createElement('div');
  foodElement.classList.add('food');
  foodElement.style.left = `${food.x}px`;
  foodElement.style.top = `${food.y}px`;
  board.appendChild(foodElement);
}

// Check for collision with snake itself
function checkCollision(head) {
  return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

// Random Position for Food
function randomPosition() {
  return Math.floor(Math.random() / 20) * 20;
}

// Update Score
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

// Change Direction based on arrow keys
function changeDirection(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -20 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 20 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -20, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 20, y: 0 };
      break;
  }
}

// Mobile Controls
upBtn.addEventListener("click", () => changeDirection({ key: "ArrowUp" }));
downBtn.addEventListener("click", () => changeDirection({ key: "ArrowDown" }));
leftBtn.addEventListener("click", () => changeDirection({ key: "ArrowLeft" }));
rightBtn.addEventListener("click", () => changeDirection({ key: "ArrowRight" }));

// Event Listeners for Keyboard Controls
document.addEventListener("keydown", changeDirection);

// Difficulty Button Event Listeners
easyBtn.addEventListener("click", () => {
  gameSpeed = 200;
  if (!isPaused) clearInterval(gameInterval);
  startGame();
});

mediumBtn.addEventListener("click", () => {
  gameSpeed = 150;
  if (!isPaused) clearInterval(gameInterval);
  startGame();
});

hardBtn.addEventListener("click", () => {
  gameSpeed = 100;
  if (!isPaused) clearInterval(gameInterval);
  startGame();
});

// Play/Restart Button Event Listener
playRestartBtn.addEventListener("click", () => {
  if (isPaused) {
    startGame();
  } else {
    clearInterval(gameInterval);
    isPaused = true;
    playRestartBtn.textContent = "Play";
    playRestartBtn.classList.remove("btn-danger");
    playRestartBtn.classList.add("btn-success");
  }
});
