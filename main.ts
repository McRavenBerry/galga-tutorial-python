// Player Creation and Control
let spacePlane = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . 2 2 2 2 2 . . . . . . . . . .
    . . 2 2 2 2 2 . . . . . . . . .
    . . . 2 2 2 2 2 . . . . . . . .
    . . . . 2 2 2 2 2 . . . . . . .
    . . . . . 2 2 2 2 2 . . . . . .
    . . . . . . 2 2 2 2 2 2 2 2 2 .
    . . . . . . 2 2 2 2 2 2 2 2 2 .
    . . . . . 2 2 2 2 2 . . . . . .
    . . . . 2 2 2 2 2 . . . . . . .
    . . . 2 2 2 2 2 . . . . . . . .
    . . 2 2 2 2 2 . . . . . . . . .
    . 2 2 2 2 2 . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
spacePlane.setStayInScreen(true)
info.setLife(3)
controller.moveSprite(spacePlane, 200, 200)
// Projectile Creation
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_event_pressed() {
    let projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . 3 3 . . . . . . .
        . . . . . . . 3 3 . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, spacePlane, 200, 0)
})
// Bogey Creation
// Damage from Enemy
// Function call to destroy bogey on overlap with player
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_overlap2(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
// Damage to Enemy
// Function call to destroy bogey on overlap with projectile
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function on_overlap3(sprite: Sprite, otherSprite: Sprite) {
    sprite.destroy(effects.fire, 0.1)
    otherSprite.destroy()
    info.changeScoreBy(1)
})
// Game update    
game.onUpdateInterval(1000, function on_update_interval() {
    let bogey = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . 2 2 2 2 . .
        . . . . . . . . . 2 2 2 2 . . .
        . . . . . 2 7 7 7 7 7 7 . . . .
        . . . . 2 2 7 7 7 7 7 7 . . . .
        . . . 2 2 2 7 7 2 2 7 7 2 . . .
        . . . . 2 2 7 7 7 7 7 7 . . . .
        . . . . . 2 7 7 7 7 7 7 . . . .
        . . . . . . . . . 2 2 2 2 . . .
        . . . . . . . . . . 2 2 2 2 . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Enemy)
    bogey.setVelocity(-50, 0)
    bogey.setPosition(scene.screenWidth(), randint(0, scene.screenHeight()))
    bogey.setFlag(SpriteFlag.AutoDestroy, true)
})
