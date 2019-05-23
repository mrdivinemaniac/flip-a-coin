import Keyboard from '../Keyboard'
import Mouse from '../Mouse'

const DEFAULT_INPUT_OPTIONS = { keyboard: true, mouse: true }

class AppContext {
  constructor (canvas, options = {}) {
    this.canvas = canvas
    let gl = canvas.getContext('webgl')
    if (!gl) {
      console.warn('WebGL not supported. Trying to use experimental webgl')
      gl = canvas.getContext('experimental-webgl')
    }
    if (!gl) {
      window.alert('Your browser does not support WebGL and 3D magic')
      throw new Error('Your browser does not support WebGL and 3D magic')
    }
    this.gl = gl
    this.__state = 'initializing'
    this.__drawDoneTime = 0
    this.__deltaTime = 0
    this.__setupInputs({ ...options.input, ...DEFAULT_INPUT_OPTIONS })
  }

  __setupInputs (inputOptions) {
    this.__input = {
      keyboard: inputOptions.keyboard ? new Keyboard() : undefined,
      mouse: inputOptions.mouse ? new Mouse() : undefined
    }
  }

  notifyUpdating () {
    this.__deltaTime = window.performance.now() - this.__drawDoneTime
    this.__state = 'updating'
  }

  notifyUpdateDone () {
    this.__state = 'updated'
    if (this.__input.mouse) {
      this.__input.mouse.update()
    }
  }

  notifyDrawing () {
    this.__state = 'drawing'
  }

  notifyDrawDone () {
    this.__state = 'drawn'
    this.__drawDoneTime = window.performance.now()
  }

  get input () {
    return { ...this.__input }
  }

  get state () {
    return this.__state
  }

  get deltaTime () {
    return this.__deltaTime
  }

  createVertexShader (source) {
    const { gl } = this
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, source)
    gl.compileShader(vertexShader)
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      throw new Error(`Error compiling vertex shader ${gl.getShaderInfoLog(vertexShader)}`)
    }
    return vertexShader
  }

  createFragmentShader (source) {
    const { gl } = this
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, source)
    gl.compileShader(fragmentShader)
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      throw new Error(`Error compiling fragment shader ${gl.getShaderInfoLog(fragmentShader)}`)
    }
    return fragmentShader
  }
}

export default AppContext
