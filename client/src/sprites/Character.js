import Phaser from 'phaser'
import Enum from '../lib/Enum'

class Character extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.game = game

    // Define all animations from spritesheet
    this.animations.add('walk-down',  [0, 1, 2],    10, true)
    this.animations.add('walk-left',  [12, 13, 14], 10, true)
    this.animations.add('walk-right', [24, 25, 26], 10, true)
    this.animations.add('walk-up',    [36, 37, 38], 10, true)

    this.anchor.x = this.anchor.y = 0.0

    // Initial state is just idle
    this.state = Character.State.Idle

    // Initially we're facing south
    this.facing = Character.Facing.South

    // The speed of acceleration
    this.speed = 256

    // The destination point to which we will move
    this.destination = new Phaser.Point(x, y)

    // Enable Arcade Physics
    this.game.physics.enable(this)
  }

  update() {
    switch (this.state) {
      // If we're idle, check for keyboard actions
      case Character.State.Idle:
        this.handleIdleActions()
      // If we're moving, calculate destination offsets
      case Character.State.Moving:
        this.handleMovement(this.facing)
    }
  }

  handleIdleActions() {
    // Shortcut to the keyboard manager
    const keyboard = this.game.input.keyboard

    // Move up on W
    if (keyboard.isDown(Phaser.Keyboard.W)) {
      this.destination.y -= this.height
      this.state = Character.State.Moving
      this.facing = Character.Facing.North
      this.animations.play('walk-up')
    }
    // Move east on D
    else if (keyboard.isDown(Phaser.Keyboard.D)) {
      this.destination.x += this.width
      this.state = Character.State.Moving
      this.facing = Character.Facing.East
      this.animations.play('walk-right')
    }
    // Move south on S
    else if (keyboard.isDown(Phaser.Keyboard.S)) {
      this.destination.y += this.height
      this.state = Character.State.Moving
      this.facing = Character.Facing.South
      this.animations.play('walk-down')
    }
    // Move west on A
    else if (keyboard.isDown(Phaser.Keyboard.A)) {
      this.destination.x -= this.width
      this.state = Character.State.Moving
      this.facing = Character.Facing.West
      this.animations.play('walk-left')
    }
    else {
      this.animations.stop(null, false)
    }
  }

  handleMovement(facing) {
    // Calculate velocity with the game's delta time
    const delta = this.game.time.physicsElapsed
    const velocity = this.speed * delta

    // Move based on velocity and current facing
    switch (this.facing) {
      // Move north towards destination
      case Character.Facing.North:
        if (this.y - velocity <= this.destination.y) {
          this.y = this.destination.y
          this.state = Character.State.Idle
        }
        else {
          this.y -= velocity
        }
        break
      // Move east towards destination
      case Character.Facing.East:
        if (this.x + velocity >= this.destination.x) {
          this.x = this.destination.x
          this.state = Character.State.Idle
        }
        else {
          this.x += velocity
        }
        break
      // Move south towards destination
      case Character.Facing.South:
        if (this.y + velocity >= this.destination.y) {
          this.y = this.destination.y
          this.state = Character.State.Idle
        }
        else {
          this.y += velocity
        }
        break
      // Move west towards destination
      case Character.Facing.West:
        if (this.x - velocity <= this.destination.x) {
          this.x = this.destination.x
          this.state = Character.State.Idle
        }
        else {
          this.x -= velocity
        }
        break
    }
  }
}

// The possible states of characters
Character.State = new Enum(
  'Idle',
  'Moving'
)

// The direction the characters can be facing
Character.Facing = new Enum(
  'North',
  'East',
  'South',
  'West'
)

export default Character