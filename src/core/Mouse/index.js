const BUTTONS = ['left', 'wheel', 'right', 'back', 'forward']

class Mouse {
  constructor () {
    this.__onMouseDown = this.__onMouseDown.bind(this)
    this.__onMouseUp = this.__onMouseUp.bind(this)
    this.__onMouseMove = this.__onMouseMove.bind(this)
    this.__onWheel = this.__onWheel.bind(this)
    this.__reset = this.__reset.bind(this)

    this.__reset()

    window.addEventListener('mousedown', this.__onMouseDown)
    window.addEventListener('mouseup', this.__onMouseUp)
    window.addEventListener('mousemove', this.__onMouseMove)
    window.addEventListener('wheel', this.__onWheel)
    window.addEventListener('blur', this.__reset)
  }

  isButtonPressed (button) {
    return this.__buttonsMap[button] || false
  }

  getPosition () {
    return { x: this.__x, y: this.__y }
  }

  getMovement () {
    return {
      x: this.__dx,
      y: this.__dy
    }
  }

  getScroll () {
    return {
      x: this.__dWheelX,
      y: this.__dWheelY,
      z: this.__dWheelZ,
      unit: this.__wheelUnit
    }
  }

  isDragging () {
    return this.__dragging
  }

  __onMouseDown (e) {
    this.__buttonsMap = { [BUTTONS[e.button]]: true }
    this.__onMouseMove(e)
  }

  __onMouseUp (e) {
    this.__buttonsMap = { [BUTTONS[e.button]]: false }
    this.__onMouseMove(e)
  }

  __onMouseMove (e) {
    this.__x = e.clientX
    this.__y = e.clientY
    this.__dx = e.movementX
    this.__dy = e.movementY
    this.__dragging = this.__buttonsMap['left'] || false
  }

  __onWheel (e) {
    this.__dWheelX = e.deltaX
    this.__dWheelY = e.deltaY
    this.__dWheelZ = e.deltaZ
    this.__wheelUnit = e.deltaMode
  }

  update () {
    this.__dx = 0
    this.__dy = 0
    this.__dWheelX = 0
    this.__dWheelY = 0
    this.__dWheelZ = 0
    this.__wheelUnit = 0
  }

  __reset () {
    this.__x = 0
    this.__y = 0
    this.__dx = 0
    this.__dy = 0
    this.__dWheelX = 0
    this.__dWheelY = 0
    this.__dWheelZ = 0
    this.__wheelUnit = 0
    this.__dragging = false
    this.__buttonsMap = {}
  }

  destroy () {
    window.removeEventListener('mousedown', this.__onMouseDown)
    window.removeEventListener('mouseup', this.__onMouseUp)
    window.removeEventListener('mousemove', this.__onMouseMove)
    window.removeEventListener('blur', this.__reset)
  }
}

export default Mouse
