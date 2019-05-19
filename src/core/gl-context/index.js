class GLContext {
  constructor (canvas) {
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

export default GLContext
