const cactus = document.querySelector("#cactus")
const dino = document.querySelector("#dino")
const ground = document.querySelector("#ground")
const start = document.querySelector(".start")
const game = document.querySelector(".game")
const scoreElement = document.querySelector("#score")

let score = 0

document.addEventListener("keydown", handleKeyPress)

function handleKeyPress(e) {
  start.innerHTML = " "
  move()
  jump(e)
}

function move() {
  const moveClass = "move"
  if (!cactus.classList.contains(moveClass)) {
    cactus.classList.add(moveClass)
  }
}

function jump(e) {
  const jumpClass = "jump"
  if (e.code === "Space" && !dino.classList.contains(jumpClass)) {
    dino.classList.add(jumpClass)
    setTimeout(() => {
      dino.classList.remove(jumpClass)
    }, 500)
  }

  score += 1
  scoreElement.textContent = `Score: ${score}`
}

function isCrashed() {
  let dinoPosition = dino.getBoundingClientRect()
  let cactusPosition = cactus.getBoundingClientRect()

  return (
    dinoPosition.right - 25 > cactusPosition.left &&
    dinoPosition.left < cactusPosition.right - 20 &&
    dinoPosition.bottom - 20 > cactusPosition.top
  )
}
function gameLoop() {
  if (isCrashed()) {
    showGameOver()
    resetGame()
  }

  requestAnimationFrame(gameLoop)
}

function showGameOver() {
  alert("Game Over! Click OK to play again!")
}

function resetGame() {
  cactus.classList.remove("move")
  start.innerHTML = "Press space to start the Game"
}

gameLoop()
