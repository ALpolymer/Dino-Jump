const cactus = document.querySelector("#cactus")
const dino = document.querySelector("#dino")
const ground = document.querySelector(".ground")
const start = document.querySelector(".start")
const game = document.querySelector(".game")
const scoreElement = document.querySelector("#score")

let isJumping = false
let isScored = false
let score = 0

document.addEventListener("keydown", handleKeyPress)

function handleKeyPress(e) {
  start.innerHTML = " "
  move()
  if (e.code === "Space" && !isJumping) {
    jump()
  }
}

function move() {
  const moveClass = "move"

  if (!cactus.classList.contains(moveClass)) {
    cactus.classList.add(moveClass)
  }
  if (!ground.classList.contains('ground-move')) {
    ground.classList.add('ground-move')
  }
}

function jump() {
  const jumpClass = "jump"
  if (!isJumping) {
    isJumping = true

    dino.classList.add(jumpClass)
    dino.addEventListener("animationend", () => {
      dino.classList.remove(jumpClass)
      isJumping = false
    })
  }
}

function isAboveCactus() {
  const dinoPosition = dino.getBoundingClientRect()
  const cactusPosition = cactus.getBoundingClientRect()

  return dinoPosition.right > cactusPosition.left
}

function isCrashed() {
  let dinoPosition = dino.getBoundingClientRect()
  let cactusPosition = cactus.getBoundingClientRect()

  return (
    dinoPosition.right - 25 > cactusPosition.left
    && dinoPosition.bottom >= cactusPosition.top
    && dinoPosition.left +20 < cactusPosition.right
  )
}
function gameLoop() {
  if (isCrashed()) {
    score = 0
    showGameOver()
    resetGame()
  } else {
    if (isAboveCactus() && !isScored) {
      isScored = true
      console.log("isScored", isScored)

      score += 1
      scoreElement.textContent = `Score: ${score}`
    } else if (!isAboveCactus()) {
      isScored = false
      console.log("isScored", isScored)
    }
  }

  requestAnimationFrame(gameLoop)
}

function showGameOver() {
  scoreElement.textContent = `Score: 0`
  alert("Game Over! Click OK to play again!")
}

function resetGame() {
  cactus.classList.remove("move")
  ground.classList.remove('ground-move')
  start.innerHTML = "Press space to start the Game"
  score = 0
}

gameLoop()
