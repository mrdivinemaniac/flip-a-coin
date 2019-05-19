class VertexShader {
  constructor (context, src) {
    this.__compile(context.gl, src)
  }

  __compile (gl, source) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, source)
    gl.compileShader(vertexShader)
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      throw new Error(`Error compiling vertex shader ${gl.getShaderInfoLog(vertexShader)}`)
    }
    this.location = vertexShader
  }
}

export default VertexShader
