import ControlScript from '../../core/ControlScript'
import { flipAnimation } from './animations'

class ControlCoin extends ControlScript {
  constructor () {
    super()
    this.__flipping = false
    this.__flipAnimation = null
    this.__flipResult = null
    this.__onFlipEnd = null
  }

  onFlipEnd (callback) {
    this.__onFlipEnd = callback
  }

  startFlipping (gameObject, context) {
    const mouse = context.input.mouse
    if (mouse.isButtonPressed('left')) {
      this.__flipping = true
      const heads = Math.random() < 0.5
      this.__flipAnimation = flipAnimation(gameObject, heads ? 180 : 0)
      this.__flipResult = { heads, tails: !heads }
    }
  }

  update (gameObject, context) {
    if (!this.__flipping) this.startFlipping(gameObject, context)
    else {
      const [pos, rot] = this.__flipAnimation.update(context.deltaTime)
      gameObject.position.y = pos[0]
      gameObject.rotation.x = rot[0]
      if (this.__flipAnimation.done) {
        this.__flipping = false
        if (this.__onFlipEnd) return this.__onFlipEnd(this.__flipResult)
      }
    }
  }
}

export default ControlCoin
