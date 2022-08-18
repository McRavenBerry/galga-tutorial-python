#Player Creation and Control
spacePlane = sprites.create(img("""
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
"""), SpriteKind.player)
spacePlane.set_stay_in_screen(True)
info.set_life(3)
controller.move_sprite(spacePlane, 200, 200)

#Projectile Creation
def on_event_pressed():
    projectile = sprites.create_projectile_from_sprite(img("""
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
    """), spacePlane, 200, 0)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_event_pressed)

#Bogey Creation
def on_update_interval():
    bogey = sprites.create(img("""
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
    """), SpriteKind.enemy)
    bogey.set_velocity(-50, 0)
    bogey.set_position(scene.screen_width(), randint(0, scene.screen_height()))
    bogey.set_flag(SpriteFlag.AUTO_DESTROY, True)

#Damage from Enemy
def on_overlap2(sprite, otherSprite):
    otherSprite.destroy()
    info.change_life_by(-1)
#Function call to destroy bogey on overlap with player
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_overlap2)

#Damage to Enemy
def on_overlap3(sprite, otherSprite):
    sprite.destroy(effects.fire, 0.1)
    otherSprite.destroy()
    info.change_score_by(1)
    
#Function call to destroy bogey on overlap with projectile
sprites.on_overlap(SpriteKind.enemy, SpriteKind.projectile, on_overlap3)

#Game update    
game.on_update_interval(1000, on_update_interval)