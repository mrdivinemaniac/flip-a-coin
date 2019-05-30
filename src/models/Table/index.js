import Model from '../Model'

class Table extends Model {
  initialize (vertexShader, fragmentShader) {
    super.initialize(vertexShader, fragmentShader)
    const { gl } = this
    this.attribLocations = {
      vertPosition: gl.getAttribLocation(this.program, 'vertPosition'),
      texCoord: gl.getAttribLocation(this.program, 'texCoord')
    }
  }

  initializeProperties (height, width, breadth, legHeight, legWidth, legBreadth) {
    this.height = height
    this.width = width
    this.breadth = breadth
    this.legHeight = legHeight
    this.legWidth = legWidth
    this.legBreadh = legBreadth
  }

  setTexture (texture) {
    this.texture = texture
  }

  generateLegVertices (height, width, breadth, halfBaseHeight, halfBaseWidth, halfBaseBreadth, indexOffset = 0) {
    const halfHeight = height / 2
    const halfWidth = width / 2
    const halfBreadth = breadth / 2

    const leg1 = generateOneLegVertices(
      0, halfBaseWidth - halfWidth, -halfHeight - halfBaseHeight, halfBaseBreadth - halfBreadth
    )
    const leg2 = generateOneLegVertices(
      1, halfBaseWidth - halfWidth, -halfHeight - halfBaseHeight, -halfBaseBreadth + halfBreadth
    )
    const leg3 = generateOneLegVertices(
      2, -halfBaseWidth + halfWidth, -halfHeight - halfBaseHeight, halfBaseBreadth - halfBreadth
    )
    const leg4 = generateOneLegVertices(
      3, -halfBaseWidth + halfWidth, -halfHeight - halfBaseHeight, -halfBaseBreadth + halfBreadth
    )

    return {
      vertices: [...leg1.vertices, ...leg2.vertices, ...leg3.vertices, ...leg4.vertices],
      indices: [...leg1.indices, ...leg2.indices, ...leg3.indices, ...leg4.indices]
    }

    function generateOneLegVertices (legNumber, tx, ty, tz) {
      const vertices = [
        halfWidth + tx, -halfHeight + ty, -halfBreadth + tz, 0.0, 0.0,
        halfWidth + tx, halfHeight + ty, -halfBreadth + tz, 0.1, 0.1,
        -halfWidth + tx, -halfHeight + ty, -halfBreadth + tz, 0.0, 0.0,
        -halfWidth + tx, halfHeight + ty, -halfBreadth + tz, 0.1, 0.1,

        halfWidth + tx, -halfHeight + ty, halfBreadth + tz, 0.0, 0.0,
        halfWidth + tx, halfHeight + ty, halfBreadth + tz, 0.1, 0.1,
        -halfWidth + tx, -halfHeight + ty, halfBreadth + tz, 0.0, 0.0,
        -halfWidth + tx, halfHeight + ty, halfBreadth + tz, 0.1, 0.1,

        halfWidth + tx, halfHeight + ty, halfBreadth + tz, 0.1, 0.1,
        halfWidth + tx, halfHeight + ty, -halfBreadth + tz, 0.0, 0.0,
        -halfWidth + tx, halfHeight + ty, -halfBreadth + tz, 0.0, 0.0,
        -halfWidth + tx, halfHeight + ty, halfBreadth + tz, 0.1, 0.1,

        halfWidth + tx, -halfHeight + ty, halfBreadth + tz, 0.0, 0.0,
        halfWidth + tx, -halfHeight + ty, -halfBreadth + tz, 0.1, 0.1,
        -halfWidth + tx, -halfHeight + ty, -halfBreadth + tz, 0.0, 0.0,
        -halfWidth + tx, -halfHeight + ty, halfBreadth + tz, 0.1, 0.1,

        halfWidth + tx, halfHeight + ty, -halfBreadth + tz, 0.0, 0.0,
        halfWidth + tx, halfHeight + ty, halfBreadth + tz, 0.1, 0.1,
        halfWidth + tx, -halfHeight + ty, -halfBreadth + tz, 0.0, 0.0,
        halfWidth + tx, -halfHeight + ty, halfBreadth + tz, 0.1, 0.1,

        -halfWidth + tx, halfHeight + ty, -halfBreadth + tz, 0.0, 0.0,
        -halfWidth + tx, halfHeight + ty, halfBreadth + tz, 0.1, 0.1,
        -halfWidth + tx, -halfHeight + ty, -halfBreadth + tz, 0.0, 0.0,
        -halfWidth + tx, -halfHeight + ty, halfBreadth + tz, 0.1, 0.1
      ]

      const indices = [
        0, 1, 2, 3, 2, 1,
        4, 5, 6, 7, 6, 5,
        8, 9, 10, 10, 11, 8,
        12, 13, 14, 14, 15, 12,
        16, 17, 18, 19, 18, 17,
        20, 21, 22, 23, 22, 21
      ]
      const numVertices = (vertices.length / 5)
      const correctedIndices = indices.map(idx => idx + indexOffset + (legNumber * numVertices))
      return { vertices, indices: correctedIndices }
    }
  }

  generateVertices (legHeight, legWidth, legBreadth, baseHeight, baseWidth, baseBreadth) {
    const halfHeight = baseHeight / 2
    const halfWidth = baseWidth / 2
    const halfBreadth = baseBreadth / 2

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
      0, 1, 2, 3, 2, 1,
      4, 5, 6, 7, 6, 5,
      8, 9, 10, 10, 11, 8,
      12, 13, 14, 14, 15, 12,
      16, 17, 18, 19, 18, 17,
      20, 21, 22, 23, 22, 21
    ]

    const legData = this.generateLegVertices(
      legHeight, legWidth, legBreadth,
      halfHeight, halfWidth, halfBreadth,
      vertices.length / 5
    )

    return {
      vertices: [...vertices, ...legData.vertices],
      indices: [...indices, ...legData.indices]
    }
  }

  draw () {
    const { gl } = this
    const width = this.width || 1
    const breadth = this.breadth || 1
    const height = this.height || 1
    const legHeight = this.legHeight || 3
    const legBreadh = this.legBreadh || 0.5
    const legWidth = this.legWidth || 0.5
    const { vertices, indices } = this.generateVertices(legHeight, legWidth, legBreadh, height, width, breadth)
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

export default Table
