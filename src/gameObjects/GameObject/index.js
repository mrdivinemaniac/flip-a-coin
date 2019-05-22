class GameObject {
  constructor (context) {
    this.context = context
    this.position = { x: 0, y: 0, z: 0 }
    this.scale = { x: 1, y: 1, z: 1 }
    this.rotation = { x: 0, y: 0, z: 0 }
    this.__controlScripts = {}
  }

  addControlScript (name, script) {
    this.__controlScripts[name] = script
  }

  getControlScript (name) {
    return this.__controlScripts[name]
  }

  setScene (scene) {
    this.scene = scene
  }

  _setModel (model) {
    this.__model = model
  }

  draw (mView, mProj) {
    if (this.__model) {
      this.__model.prepareDraw(
        this.position,
        this.rotation,
        this.scale,
        mView,
        mProj
      )
      this.__model.draw()
    }
  }

  update () {
    const { __controlScripts } = this
    Object.keys(__controlScripts).forEach(name => {
      __controlScripts[name].update(this, this.context)
    })
  }

  destroy () {
    if (this.__model) this.__model.destroy()
  }
}

export default GameObject
