const dino = document.querySelector("#dino")
const ground = document.querySelector(".ground")
const start = document.querySelector(".start")
const game = document.querySelector(".game")
const scoreElement = document.querySelector("#score")
const highScoreElement = document.querySelector("#high-score")
let cactus

let isMoving
let isJumping = false
let isScored = false
let score
let highScore = 0
let gameSpeed
const groundSpeed = 10
const jumpSpeed = 1.5
const cactusSpeed = 4.8

document.addEventListener("keydown", handleKeyPress)

function handleKeyPress(e) {
  e.key === 'Escape' && isMoving && pause()
  e.code === "Space" && isMoving && jump()
  e.key !== 'Escape' && !isMoving && move()
}

function generateCactus() {
  cactus = document.createElement("div")
  // Comment out the next two lines to cancel the 2 cactus generation
  const randomCactus = Math.floor(Math.random() * 2)
  const randomHeight = Math.floor(Math.random() * 4) + 2
  cactus.innerHTML = randomCactus === 1 && randomHeight !== 5 ? "🌵🌵" : "🌵"
  // Open the line below if you commented out the two lines above
  //cactus.innerHTML = "🌵"
  cactus.id = "cactus"
  cactus.classList.add("cactus")
  cactus.setAttribute("style", `font-size: ${randomHeight}rem; animation-duration: ${cactusSpeed / gameSpeed}s`)
  console.log(cactus.getAttribute('style'))
  console.log(gameSpeed)
  game.appendChild(cactus)
}

function move() {
  start.innerHTML = ""
  dino.classList.add("walk")
  cactus.classList.add("move")
  ground.classList.add("ground-move")

  if ( dino.classList.contains('paused') ) {
    dino.classList.remove('paused')
    cactus.classList.remove('paused')
    ground.classList.remove('paused')
  }
  
  isMoving = true
}

function pause() {
  start.innerHTML = "Paused"
  dino.classList.add('paused')
  cactus.classList.add('paused')
  ground.classList.add('paused')
  isMoving = false
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

function setSpeed() {
  ground.setAttribute('style', `animation-duration: ${groundSpeed / gameSpeed}s`)
  dino.setAttribute('style', `animation-duration: ${jumpSpeed / gameSpeed}s`)
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
  !cactus && resetGame()

  if (
    cactus.getBoundingClientRect().right === ground.getBoundingClientRect().left
  ) {
    cactus.remove()
    gameSpeed = score === 0 ? 1 : (score * 0.1) + 1
    generateCactus()
    cactus.classList.add("move")
    setSpeed()
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
  score = 0
  gameSpeed = 1
  cactus && cactus.remove()
  dino.classList.contains('walk') && dino.classList.remove("walk")
  ground.classList.contains('ground-move') && ground.classList.remove("ground-move")
  scoreElement.textContent = "Score: 0"
  start.textContent = "Press any key to start. Press Escape to pause. Press Space to jump!"
  setSpeed()
  generateCactus()
}

gameLoop()
