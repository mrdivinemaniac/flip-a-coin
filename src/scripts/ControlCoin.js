import ControlScript from '../core/ControlScript'

class ControlCoin extends ControlScript {
  update (gameObject, context) {
    const { mouse, keyboard } = context.input
    const rotation = gameObject.rotation
    if (keyboard.isKeyPressed('ArrowLeft')) {
      rotation.y += 5
    }
    if (keyboard.isKeyPressed('ArrowRight')) {
      rotation.y -= 5
    }
    if (mouse.isDragging()) {
      const { x, y } = mouse.getMovement()
      if (x > 0) rotation.z += 8
      else if (x < 0) rotation.z -= 8
      if (y > 0) rotation.x -= 8
      else if (y < 0) rotation.x += 8
    }
  }
}

export default ControlCoin
