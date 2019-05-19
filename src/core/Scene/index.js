class Scene {
  constructor (context) {
    const { gl } = context
    this.context = context
    this.__clearColor = [1.0, 1.0, 1.0, 1.0]
    this.__gameObjects = []
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.CULL_FACE)
    gl.frontFace(gl.CCW)
    gl.cullFace(gl.BACK)

    this.__drawGameObject = this.__drawGameObject.bind(this)
  }

  setClearColor (clearColor) {
    this.context.gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3])
    this.__clearColor = clearColor
  }

  addGameObject (gameObject) {
    const { __gameObjects } = this
    gameObject.setScene(this)
    gameObject.__sceneIndex = __gameObjects.length
    __gameObjects.push(gameObject)
  }

  removeGameObject (gameObject) {
    const index = gameObject.__sceneIndex
    if (index !== undefined) {
      this.__gameObjects.splice(index, 1)
    }
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

  __drawGameObject (gameObject) {
    gameObject.draw(this.__camera.viewMat, this.__camera.projMat)
  }

  draw () {
    const { context: { gl } } = this
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    this.__gameObjects.forEach(this.__drawGameObject)
  }
}

export default Scene
