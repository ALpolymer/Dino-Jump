//const cactus = document.querySelector("#cactus")
const dino = document.querySelector("#dino")
const ground = document.querySelector(".ground")
const start = document.querySelector(".start")
const game = document.querySelector(".game")
const scoreElement = document.querySelector("#score")
const highScoreElement = document.querySelector("#high-score")
let cactus

function generateCactus(notFirst) {
  cactus = document.createElement("div")
  cactus.innerHTML = "🌵"
  cactus.id = "cactus"
  cactus.classList.add("cactus")
  const randomHeight = Math.floor(Math.random() * 4) + 2
  cactus.setAttribute("style", `font-size: ${randomHeight}rem`)
  notFirst && cactus.classList.add("off-screen")
  game.appendChild(cactus)
}

let isMoving = false
let isJumping = false
let isScored = false
let score = 0
let highScore = 0

document.addEventListener("keydown", handleKeyPress)

function handleKeyPress(e) {
  start.innerHTML = ""
  e.code === "Space" && isMoving && jump()
  !isMoving && move()
}

function move() {
  dino.classList.add("walk")
  cactus.classList.add("move")
  ground.classList.add("ground-move")
  isMoving = true
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

  return dinoPosition.left + 20 < cactusPosition.right
}

function isCrashed() {
  const dinoPosition = dino.getBoundingClientRect()
  const cactusPosition = cactus.getBoundingClientRect()

  return (
    dinoPosition.right - 40 > cactusPosition.left &&
    dinoPosition.bottom >= cactusPosition.top &&
    dinoPosition.left + 40 < cactusPosition.right
  )
}

function gameLoop() {
  !cactus && generateCactus(false)

  if (
    cactus.getBoundingClientRect().right === ground.getBoundingClientRect().left
  ) {
    cactus.remove()
    generateCactus(true)
    cactus.classList.add("move")
  }

  if (isCrashed()) {
    alert(`Game Over! Your score is ${score}. Hit Enter to play again!`)
    resetGame()
  } else {
    if (isAboveCactus() && !isScored) {
      isScored = true
      if (cactus.classList.contains("move")) score += 1
      if (score > highScore) {
        highScore = score
      }

      scoreElement.textContent = `Score: ${score}`
      console.log("score", score)
      console.log("highScore", highScore)
      highScoreElement.textContent = `High Score: ${highScore}`
    } else if (!isAboveCactus()) {
      isScored = false
    }
  }

  requestAnimationFrame(gameLoop)
}

function resetGame() {
  isMoving = false
  cactus.remove()
  dino.classList.remove("walk")
  ground.classList.remove("ground-move")
  score = 0
  scoreElement.textContent = "Score: 0"
  start.textContent =
    "Press any key to start the Game and then Space to jump!!!"
  generateCactus(false)
}

gameLoop()
