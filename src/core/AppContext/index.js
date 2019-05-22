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
    this.__setupInputs({ ...options.input, ...DEFAULT_INPUT_OPTIONS })
  }

  __setupInputs (inputOptions) {
    this.__input = {
      keyboard: inputOptions.keyboard ? new Keyboard() : undefined,
      mouse: inputOptions.mouse ? new Mouse() : undefined
    }
  }

  get input () {
    return { ...this.__input }
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
