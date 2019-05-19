import { mat4, glMatrix } from 'gl-matrix'

class Camera {
  constructor () {
    this.position = { x: 0, y: 0, z: 0 }
    this.__viewMatrix = new Float32Array(16)
    this.__projection = new Float32Array(16)
    this.__fov = glMatrix.toRadian(45)
    this.__focus = [0.1, 2000]
    this.__lookAtPosition = [0, 0, 0]
    this.__ratio = 16 / 9
  }

  setPosition ([x, y, z]) {
    this.position = { x, y, z }
  }

  setAspectRatio (ratio) {
    this.__ratio = ratio
  }

  lookAt (position) {
    this.__lookAtPosition = position
  }

  setFieldOfView (fov) {
    this.__fov = glMatrix.toRadian(fov)
  }

  setFocus (near, far) {
    this.__focus = [near, far]
  }

  get viewMat () {
    const from = [this.position.x, this.position.y, this.position.z]
    mat4.lookAt(
      this.__viewMatrix,
      from,
      this.__lookAtPosition,
      [0, 1, 0]
    )
    return this.__viewMatrix
  }

  get projMat () {
    mat4.perspective(
      this.__projection,
      this.__fov,
      this.__ratio,
      this.__focus[0],
      this.__focus[1]
    )
    return this.__projection
  }
}

export default Camera
