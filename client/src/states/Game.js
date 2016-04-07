import Phaser from 'phaser'
import Character from '../sprites/Character'
import { randomIntInclusive } from '../lib/Random.js'

export default class extends Phaser.State {
  create () {
    this.grassTileSprite = this.game.add.tileSprite(0, 0, 2048, 2048, 'grass')

    this.player = new Character({
      game: this.game,
      x: 32 * randomIntInclusive(0, 12),
      y: 32 * randomIntInclusive(0, 12),
      asset: 'character'
    })

    this.game.add.existing(this.player)
    this.game.camera.follow(this.player)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
      this.game.debug.cameraInfo(this.game.camera, 32, 128)
      this.game.debug.text(this.game.time.fps || '--', 32, 232, "#fff")
    }
  }

}
