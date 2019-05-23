import ControlScript from '../../core/ControlScript'
import { flipAnimation } from './animations'

class ControlCoin extends ControlScript {
  constructor () {
    super()
    this.flipping = false
    this.flipAnimation = null
  }

  startFlipping (gameObject, context) {
    const mouse = context.input.mouse
    if (mouse.isButtonPressed('left')) {
      this.flipping = true
      if (!this.flipAnimation) {
        this.flipAnimation = flipAnimation(gameObject)
      } else {
        this.flipAnimation.reset()
      }
    }
  }

  update (gameObject, context) {
    if (!this.flipping) this.startFlipping(gameObject, context)
    else {
      const [pos, rot] = this.flipAnimation.update(context.deltaTime)
      gameObject.position.y = pos[0]
      gameObject.rotation.x = rot[0]
      if (this.flipAnimation.done) {
        this.flipping = false
      }
    }
  }
}

export default ControlCoin
