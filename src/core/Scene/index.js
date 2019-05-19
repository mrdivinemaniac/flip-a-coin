class Scene {
  constructor (context) {
    const { gl } = context
    this.context = context
    this.__clearColor = [1.0, 1.0, 1.0, 1.0]
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.CULL_FACE)
    gl.frontFace(gl.CCW)
    gl.cullFace(gl.BACK)
  }

  setClearColor (clearColor) {
    this.__clearColor = clearColor
  }

  addGameObject (gameObject) {
    gameObject.setScene(this)
  }

  setCamera (camera) {
    this.__camera = camera
  }

  get camera () {
    return this.__camera
  }

  get height () {
    return this.context.canvas.height
  }

  get width () {
    return this.context.canvas.width
  }

  draw () {
    const { __clearColor, context: { gl } } = this
    gl.clearColor(__clearColor[0], __clearColor[1], __clearColor[2], __clearColor[3])
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }
}

export default Scene
