let view = document.querySelector('.view')
let player = document.querySelector('.player')
let playerPosY=100, playerPosX=200, groundPosY=0, groundPosX=0

let timerMovingDown, timerMovingUp, timerMovingLeft, timerMovingRight
let colisionLeft=[false, "id"], colisionRight=[false, "id"], colisionUp=[false, "id"], colisionDown=[false, "id"]

let playerIsMovingDown = false
let playerIsMovingUp = false
let playerIsMovingLeft = false
let playerIsMovingRight = false


function move(e) {
    if (e.key == 'w' && playerIsMovingUp == false) {
        playerIsMovingUp = true
        moveUp()
    } else if (e.key == 'a' && playerIsMovingLeft == false) {
        playerIsMovingLeft = true
        moveLeft()
    } else if (e.key == 's' && playerIsMovingDown == false) {
        playerIsMovingDown = true
        moveDown()
    } else if (e.key == 'd' && playerIsMovingRight == false) {
        playerIsMovingRight = true
        moveRight()
    }
}


function stopMove(e) {
    if (e.key == 'w') {
        clearInterval(timerMovingUp)
        playerIsMovingUp = false
    } else if (e.key == 'a') {
        clearInterval(timerMovingLeft)
        playerIsMovingLeft = false
    } else if (e.key == 's') { 
        clearInterval(timerMovingDown)
        playerIsMovingDown = false
    } else if (e.key == 'd') {
        clearInterval(timerMovingRight)
        playerIsMovingRight = false 
    }
}


function moveUp() {
    timerMovingUp = setInterval(() => { 
        checkColision()
        // If the player is not collidin with a walk, he can move up
        if (colisionUp[0] == false) {
            playerPosY-= 5
            groundPosY+= 5
            view.style.marginTop = `${groundPosY}px`
        }
    }, 10)
}


function moveDown() {
    timerMovingDown = setInterval(() => { 
        checkColision() 
        // If the player is not collidin with a walk, he can move down
        if (colisionDown[0] == false) {
            playerPosY+= 5
            groundPosY-= 5
            view.style.marginTop = `${groundPosY}px`
        }
    }, 10)
}


function moveLeft() {
    timerMovingLeft = setInterval(() => { 
        checkColision()
        // If the player is not collidin with a walk, he can move left
        if (colisionLeft[0] == false) {
            playerPosX-= 5
            groundPosX+= 5
            view.style.marginLeft = `${groundPosX}px`
        }
    }, 10)
}


function moveRight() {
    timerMovingRight = setInterval(() => { 
        checkColision()
        // If the player is not collidin with a walk, he can move right
        if (colisionRight[0] == false) {
            playerPosX+= 5
            groundPosX-= 5
            view.style.marginLeft = `${groundPosX}px`
        } 
    }, 10)
}


window.addEventListener("keydown", move)
window.addEventListener("keyup", stopMove)


// Starts the player in the center of the screen
function startPlayer () {
    player.style.top = `${playerPosY}px`
    player.style.left = `${playerPosX}px`
}

startPlayer()


const wall = [
    {
        xLeft: 0,
        xRight: 50,
        yTop:0,
        yBottom: 50
    },
    {
        xLeft: 0,
        xRight: 50,
        yTop: 50,
        yBottom: 100
    },
    {
        
    }
]


function checkColision() {
    // getting the current player position
    const player = {
        xLeft: playerPosX,
        xRight: playerPosX + 50,
        yTop: playerPosY,
        yBottom: playerPosY + 50
    }
    
    
    for (let i = 0; i < wall.length; i++) {
        // Left colision
        if (player.xLeft - 5 < wall[i].xRight && colisionLeft[0] != true && player.yTop < wall[i].yBottom && player.yBottom > wall[i].yTop && player.xLeft >= wall[i].xRight) {
            console.log(i)
            colisionLeft = [true, i]
            break
        } else if (colisionLeft[0] == true && colisionLeft[1] == i && player.xLeft - 5 > wall[i].xRight) {
            console.log(i)
            colisionLeft[0] = false
            break
        } else if (colisionLeft[0] == true && colisionLeft[1] == i && (player.yTop > wall[i].yBottom || player.yBottom < wall[i].yTop)) {
            console.log(i)
            colisionLeft[0] = false
            break
        }
            
        // Right colision
        if (player.xRight + 5 > wall[i].xLeft && colisionRight[0] != true  && player.yTop < wall[i].yBottom && player.yBottom > wall[i].yTop && player.xRight <= wall[i].xLeft) {
            colisionRight = [true, i]
            break
        } else if (colisionRight[0] == true && colisionRight[1] == i && player.xRight + 5 <= wall[i].xLeft) {
            colisionRight[0] = false
            break
        } else if (colisionRight[0] == true && colisionRight[1] == i && (player.yTop > wall[i].yBottom || player.yBottom < wall[i].yTop)) {
            colisionRight[0] = false
            break
        }

        // Top colision
        if (player.yTop - 5 < wall[i].yBottom && colisionUp[0] != true && player.xLeft < wall[i].xRight && player.xRight > wall[i].xLeft && player.yTop >= wall[i].yBottom) {
            colisionUp = [true, i]
        } else if (colisionUp[0] == true && colisionUp[1] == i && player.yTop - 5 > wall[i].yBottom) {
            colisionUp[0] = false
        } else if (colisionUp[0] == true && colisionUp[1] == i &&(player.xLeft > wall[i].xRight || player.xRight < wall[i].xLeft)) {
            colisionUp[0] = false
        }

        // Bottom colision
        if (player.yBottom + 5 > wall[i].yTop && colisionDown[0] != true && player.xLeft < wall[i].xRight && player.xRight > wall[i].xLeft && player.yBottom <= wall[i].yTop) {
            colisionDown = [true, i]
        } else if (colisionDown[0] == true && colisionDown[1] == i && player.yBottom + 5 < wall[i].yTop) {
            colisionDown[0] = false
        } else if (colisionDown[0] == true && colisionDown[1] == i && (player.xLeft > wall[i].xRight || player.xRight < wall[i].xLeft)) {
            colisionDown[0] = false
        }
    }
}