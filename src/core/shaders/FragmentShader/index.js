class FragmentShader {
  constructor (context, src) {
    this.__compile(context.gl, src)
  }

  __compile (gl, source) {
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, source)
    gl.compileShader(fragmentShader)
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      throw new Error(`Error compiling fragment shader ${gl.getShaderInfoLog(fragmentShader)}`)
    }
    this.location = fragmentShader
  }
}

export default FragmentShader
