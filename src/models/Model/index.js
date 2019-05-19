import { mat4, quat } from 'gl-matrix'

class Model {
  constructor (context) {
    this.context = context
    this.gl = context.gl
  }

  initialize (vertexShader, fragmentShader) {
    const { gl } = this
    this.program = gl.createProgram()
    gl.attachShader(this.program, vertexShader.location)
    gl.attachShader(this.program, fragmentShader.location)
    this.__linkAndValidate()
    this.__attribLocations = {
      mWorld: gl.getUniformLocation(this.program, 'mWorld'),
      mView: gl.getUniformLocation(this.program, 'mView'),
      mProj: gl.getUniformLocation(this.program, 'mProj')
    }
  }

  _createBuffer (data) {
    const { gl } = this
    const bufferObject = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
  }

  prepareDraw (position, rotation, scale, mView, mProj) {
    const { gl } = this
    gl.useProgram(this.program)
    const mWorld = new Float32Array(16)
    const rotationQuat = new Float32Array(9)
    quat.fromEuler(rotationQuat, rotation.x, rotation.y, rotation.z)

    const mRotate = new Float32Array(16)
    const mScale = new Float32Array(16)
    const mTranslate = new Float32Array(16)

    mat4.fromTranslation(mTranslate, [position.x, position.y, position.z])
    mat4.fromScaling(mScale, [scale.x, scale.y, scale.z])
    mat4.fromQuat(mRotate, rotationQuat)

    mat4.multiply(mWorld, mTranslate, mRotate)
    mat4.multiply(mWorld, mWorld, mScale)

    gl.uniformMatrix4fv(this.__attribLocations.mWorld, gl.FALSE, mWorld)
    gl.uniformMatrix4fv(this.__attribLocations.mView, gl.FALSE, mView)
    gl.uniformMatrix4fv(this.__attribLocations.mProj, gl.FALSE, mProj)
  }

  destroy () {
    this.gl.deleteProgram(this.program)
  }

  __linkAndValidate () {
    const { program, gl } = this
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`Error linking program ${gl.getProgramInfoLog(program)}`)
    }
    gl.validateProgram(program)
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
      throw new Error(`Error validating program ${gl.getProgramInfoLog(program)}`)
    }
  }
}

export default Model
