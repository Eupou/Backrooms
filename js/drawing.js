function draw() {
    let wall = document.querySelector(".wall")

    wall.style.backgroundColor = 'transparent'
    wall.innerHTML = `<img class="wall-sprite"src="/assets/Civilized.png">`
    wall.style.overflow = "hidden"
    let wallSprite = document.querySelector(".wall-sprite")
    
    wallSprite.style.transform = "scale(6)"
    wallSprite.style.imageRendering = "pixelated"
    wallSprite.style.marginLeft = "201px"
    wallSprite.style.marginTop = "201px"
    


}

draw()