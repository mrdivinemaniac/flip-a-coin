class Keyboard {
  constructor () {
    this.__keysMap = {}
    this.__reset = this.__reset.bind(this)
    this.__onKeyUp = this.__onKeyUp.bind(this)
    this.__onKeyDown = this.__onKeyDown.bind(this)
    window.addEventListener('blur', this.__reset)
    window.addEventListener('keydown', this.__onKeyDown)
    window.addEventListener('keyup', this.__onKeyUp)
  }

  __onKeyDown (e) {
    this.__keysMap[e.key] = true
  }

  __onKeyUp (e) {
    this.__keysMap[e.key] = false
  }

  __reset () {
    this.__keysMap = {}
  }

  isKeyPressed (key) {
    return this.__keysMap[key] || false
  }

  destroy () {
    window.removeEventListener('blur', this.__resetKeys)
    window.removeEventListener('keydown', this.__onKeyDown)
    window.removeEventListener('keyup', this.__onKeyUp)
  }
}

export default Keyboard
