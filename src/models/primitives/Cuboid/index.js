import Model from '../../Model'

class Cuboid extends Model {
  initialize (vertexShader, fragmentShader) {
    super.initialize(vertexShader, fragmentShader)
    const { gl } = this
    this.attribLocations = {
      vertPosition: gl.getAttribLocation(this.program, 'vertPosition'),
      texCoord: gl.getAttribLocation(this.program, 'texCoord')
    }
  }

  initializeProperties (height, width, breadth) {
    this.height = height
    this.width = width
    this.breadth = breadth
  }

  setTexture (texture) {
    this.texture = texture
  }

  generateVertices (height, width, breadth) {
    const halfHeight = height / 2
    const halfWidth = width / 2
    const halfBreadth = breadth / 2

    const vertices = [
      halfWidth, -halfHeight, -halfBreadth, 0.0, 0.0,
      halfWidth, halfHeight, -halfBreadth, 1.0, 1.0,
      -halfWidth, -halfHeight, -halfBreadth, 0.0, 0.0,
      -halfWidth, halfHeight, -halfBreadth, 1.0, 1.0,

      halfWidth, -halfHeight, halfBreadth, 0.0, 0.0,
      halfWidth, halfHeight, halfBreadth, 1.0, 1.0,
      -halfWidth, -halfHeight, halfBreadth, 0.0, 0.0,
      -halfWidth, halfHeight, halfBreadth, 1.0, 1.0,

      halfWidth, halfHeight, halfBreadth, 1.0, 1.0,
      halfWidth, halfHeight, -halfBreadth, 0.0, 0.0,
      -halfWidth, halfHeight, -halfBreadth, 0.0, 0.0,
      -halfWidth, halfHeight, halfBreadth, 1.0, 1.0,

      halfWidth, -halfHeight, halfBreadth, 0.0, 0.0,
      halfWidth, -halfHeight, -halfBreadth, 1.0, 1.0,
      -halfWidth, -halfHeight, -halfBreadth, 0.0, 0.0,
      -halfWidth, -halfHeight, halfBreadth, 1.0, 1.0,

      halfWidth, halfHeight, -halfBreadth, 0.0, 0.0,
      halfWidth, halfHeight, halfBreadth, 1.0, 1.0,
      halfWidth, -halfHeight, -halfBreadth, 0.0, 0.0,
      halfWidth, -halfHeight, halfBreadth, 1.0, 1.0,

      -halfWidth, halfHeight, -halfBreadth, 0.0, 0.0,
      -halfWidth, halfHeight, halfBreadth, 1.0, 1.0,
      -halfWidth, -halfHeight, -halfBreadth, 0.0, 0.0,
      -halfWidth, -halfHeight, halfBreadth, 1.0, 1.0
    ]

    const indices = [
      1, 2, 3, 2, 1, 0, // BACKWARD
      4, 5, 6, 7, 6, 5, // FORWARD
      8, 9, 10, 10, 11, 8, // TOP
      12, 15, 14, 14, 13, 12, // BOTTOM
      16, 17, 18, 19, 18, 17, // LEFT
      21, 22, 23, 22, 21, 20 // RIGHT
    ]

    return { vertices, indices }
  }

  draw () {
    const { gl } = this
    const width = this.width || 1
    const breadth = this.breadth || 1
    const height = this.height || 1
    const { vertices, indices } = this.generateVertices(height, width, breadth)
    this._createBuffer(vertices)
    this._createElementBuffer(indices)

    gl.vertexAttribPointer(
      this.attribLocations.vertPosition,
      3,
      gl.FLOAT,
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT,
      0
    )
    gl.vertexAttribPointer(
      this.attribLocations.texCoord,
      2,
      gl.FLOAT,
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT,
      3 * Float32Array.BYTES_PER_ELEMENT
    )
    gl.enableVertexAttribArray(this.attribLocations.vertPosition)
    gl.enableVertexAttribArray(this.attribLocations.texCoord)
    gl.bindTexture(gl.TEXTURE_2D, this.texture.location)
    gl.activeTexture(gl.TEXTURE0)
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
  }
}

export default Cuboid
