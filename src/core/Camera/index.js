import { mat4, glMatrix, quat } from 'gl-matrix'
import GameObject from '../GameObject'

class Camera extends GameObject {
  constructor (context) {
    super(context)
    this.__viewMatrix = new Float32Array(16)
    this.__projection = new Float32Array(16)
    this.__fov = glMatrix.toRadian(45)
    this.__focus = [0.1, 4000]
    this.__lookAtPosition = null
    this.__ratio = 16 / 9
  }

  setPosition ([x, y, z]) {
    this.position = { x, y, z }
  }

  setAspectRatio (ratio) {
    this.__ratio = ratio
  }

  stopLookAt () {
    this.__lookAtPosition = null
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
    if (this.__lookAtPosition) {
      mat4.lookAt(
        this.__viewMatrix,
        from,
        this.__lookAtPosition,
        [0, 1, 0]
      )
    } else {
      const { position, rotation, scale } = this
      const rotationQuat = new Float32Array(9)
      quat.fromEuler(rotationQuat, rotation.x, rotation.y, rotation.z)

      const mRotate = new Float32Array(16)
      const mScale = new Float32Array(16)
      const mTranslate = new Float32Array(16)

      mat4.fromTranslation(mTranslate, [position.x, position.y, position.z])
      mat4.fromScaling(mScale, [scale.x, scale.y, scale.z])
      mat4.fromQuat(mRotate, rotationQuat)

      mat4.multiply(this.__viewMatrix, mTranslate, mRotate)
      mat4.multiply(this.__viewMatrix, this.__viewMatrix, mScale)
      mat4.invert(this.__viewMatrix, this.__viewMatrix)
    }
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
