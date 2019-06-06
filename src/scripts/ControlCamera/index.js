import ControlScript from '../../core/ControlScript'

class ControlCamera extends ControlScript {
  constructor (center, startRadius = 3, startAngleHorz = Math.PI / 2) {
    super()
    this.__center = center
    this.__radius = startRadius
    this.__angleHorz = startAngleHorz
  }

  update (gameObject, context) {
    const mouse = context.input.mouse
    const keyboard = context.input.keyboard
    const scroll = mouse.getScroll()
    const delta = context.deltaTime / 1000
    this.__radius = Math.max(1, this.__radius - (scroll.y * 0.05))
    if (keyboard.isKeyPressed('ArrowLeft')) {
      this.__angleHorz += 1 * delta
    }

    if (keyboard.isKeyPressed('ArrowRight')) {
      this.__angleHorz -= 1 * delta
    }

    if (keyboard.isKeyPressed('ArrowUp')) {
      gameObject.position.y += 3 * delta
    }

    if (keyboard.isKeyPressed('ArrowDown')) {
      gameObject.position.y -= 3 * delta
    }

    gameObject.position.x = this.__center.x + this.__radius * Math.cos(this.__angleHorz)
    gameObject.position.z = this.__center.z + this.__radius * Math.sin(this.__angleHorz)

    gameObject.lookAt([this.__center.x, this.__center.y, this.__center.z])
  }
}

export default ControlCamera
