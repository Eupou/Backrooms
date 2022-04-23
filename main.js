let view = document.querySelector('.view')
let player = document.querySelector('.player')
let playerPosY=100, playerPosX=200, groundPosY=0, groundPosX=0

let timerMovingDown, timerMovingUp, timerMovingLeft, timerMovingRight
let colisionLeft=false, colisionRight=false, colisionUp=false, colisionDown=false

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
        if (colisionUp == false) {
            playerPosY-= 5
            groundPosY+= 5
            view.style.marginTop = `${groundPosY}px`
        }
    }, 10)
}


function moveDown() {
    timerMovingDown = setInterval(() => { 
        checkColision() 
        if (colisionDown == false) {
            playerPosY+= 5
            groundPosY-= 5
            view.style.marginTop = `${groundPosY}px`
        }
    }, 10)
}


function moveLeft() {
    timerMovingLeft = setInterval(() => { 
        checkColision()
        if (colisionLeft == false) {
            playerPosX-= 5
            groundPosX+= 5
            view.style.marginLeft = `${groundPosX}px`
        }
    }, 10)
}


function moveRight() {
    timerMovingRight = setInterval(() => { 
        checkColision()
        if (colisionRight == false) {
            playerPosX+= 5
            groundPosX-= 5
            view.style.marginLeft = `${groundPosX}px`
        } 
    }, 10)
}


window.addEventListener("keydown", move)
window.addEventListener("keyup", stopMove)


function startPlayer () {
    player.style.top = `${playerPosY}px`
    player.style.left = `${playerPosX}px`
}


startPlayer()


let wall = [
    {
        xLeft: 0,
        xRight: 50,
        yTop:0,
        yBottom: 50
    },
    {

    },
    {

    }
]


function checkColision() {
    // getting the current player position
    let player = {
        xLeft: playerPosX,
        xRight: playerPosX + 50,
        yTop: playerPosY,
        yBottom: playerPosY + 50
    }
    
    
    for (let i = 0; i < wall.length; i++) {
        // Left colision
        if (player.xLeft - 5 < wall[i].xRight && colisionLeft != true && player.yTop < wall[i].yBottom && player.yBottom > wall[i].yTop && player.xLeft >= wall[i].xRight) {
             colisionLeft = true
        } else if (colisionLeft == true && player.xLeft - 5 > wall[i].xRight) {
            colisionLeft = false
        } else if (colisionLeft == true && (player.yTop > wall[i].yBottom || player.yBottom < wall[i].yTop)) {
            colisionLeft = false
        }
        
        // Right colision
        if (player.xRight + 5 > wall[i].xLeft && colisionRight != true  && player.yTop < wall[i].yBottom && player.yBottom > wall[i].yTop && player.xRight <= wall[i].xLeft) {
            colisionRight = true
        } else if (colisionRight == true && player.xRight + 5 <= wall[i].xLeft) {
            colisionRight = false
        } else if (colisionRight == true && (player.yTop > wall[i].yBottom || player.yBottom < wall[i].yTop)) {
            colisionRight = false
        }

        // Top colision
        if (player.yTop - 5 < wall[i].yBottom && colisionUp != true && player.xLeft < wall[i].xRight && player.xRight > wall[i].xLeft && player.yTop >= wall[i].yBottom) {
            colisionUp = true
        } else if (colisionUp == true && player.yTop - 5 > wall[i].yBottom) {
            colisionUp = false
        } else if (colisionUp == true && (player.xLeft > wall[i].xRight || player.xRight < wall[i].xLeft)) {
            colisionUp = false
        }

        // Bottom colision
        if (player.yBottom + 5 > wall[i].yTop && colisionDown != true && player.xLeft < wall[i].xRight && player.xRight > wall[i].xLeft && player.yBottom <= wall[i].yTop) {
            colisionDown = true
        } else if (colisionDown == true && player.yBottom + 5 < wall[i].yTop) {
            colisionDown = false
        } else if (colisionDown == true && (player.xLeft > wall[i].xRight || player.xRight < wall[i].xLeft)) {
            colisionDown = false
        }
    }
}
