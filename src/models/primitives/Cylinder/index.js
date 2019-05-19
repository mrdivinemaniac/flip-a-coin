import Model from '../../Model'

class Cylinder extends Model {
  initialize (vertexShader, fragmentShader) {
    super.initialize(vertexShader, fragmentShader)
    const { gl } = this
    this.attribLocations = {
      vertPosition: gl.getAttribLocation(this.program, 'vertPosition'),
      texCoord: gl.getAttribLocation(this.program, 'texCoord')
    }
  }

  initializeProperties (radius, height, slices) {
    this.radius = radius
    this.height = height
    this.slices = slices
  }

  setTexture (texture) {
    this.texture = texture
  }

  generateVertices (radius = 0.8, height = 1, slices = 10) {
    const halfLength = height / 2
    const step = Math.PI * 2.0 / slices
    const buffer = []
    const bodyStart = 0
    let i = 0
    for (i = 0; i < slices + 1; ++i) {
      const a = step * i
      const x = Math.cos(a) * radius
      const z = Math.sin(a) * radius

      buffer.push(x)
      buffer.push(halfLength)
      buffer.push(z)
      buffer.push(0.2)
      buffer.push(0.2)

      buffer.push(x)
      buffer.push(-halfLength)
      buffer.push(z)
      buffer.push(0.2)
      buffer.push(0.2)
    }
    const bodyLength = i * 2
    const topStart = bodyLength

    buffer.push(0)
    buffer.push(halfLength)
    buffer.push(0)
    buffer.push(0.25)
    buffer.push(0.5)

    for (i = 0; i < slices + 2; ++i) {
      const a = step * i
      const x = Math.cos(a) * radius
      const z = Math.sin(a) * radius

      const b = a - Math.PI
      const u = (Math.cos(b) + 1) / 4
      const v = (Math.sin(b) + 1) / 2

      buffer.push(x)
      buffer.push(halfLength)
      buffer.push(z)
      buffer.push(u)
      buffer.push(v)
    }

    const topLength = i

    buffer.push(0)
    buffer.push(-halfLength)
    buffer.push(0)
    buffer.push(0.75)
    buffer.push(0.5)

    const bottomStart = topStart + topLength + 1

    const bottomSlices = slices + 1
    for (let i = 0; i < bottomSlices; ++i) {
      const a = step * (bottomSlices - i)
      const x = Math.cos(a) * radius
      const z = Math.sin(a) * radius

      const b = a - Math.PI
      const u = (Math.cos(b) + 1) / 4 + 0.5
      const v = (Math.sin(b) + 1) / 2

      buffer.push(x)
      buffer.push(-halfLength)
      buffer.push(z)
      buffer.push(u)
      buffer.push(v)
    }

    const bottomLength = i

    return {
      buffer,
      bodyStart,
      bodyLength,
      topStart,
      topLength,
      bottomStart,
      bottomLength
    }
  }

  draw () {
    const { gl } = this
    const slices = this.slices || 10
    const radius = this.radius || 0.8
    const height = this.height || 1
    const {
      buffer,
      bodyStart,
      bodyLength,
      topStart,
      topLength,
      bottomStart,
      bottomLength
    } = this.generateVertices(radius, height, slices)
    this._createBuffer(buffer)

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
    gl.drawArrays(gl.TRIANGLE_STRIP, bodyStart, bodyLength)
    gl.drawArrays(gl.TRIANGLE_FAN, topStart, topLength)
    gl.drawArrays(gl.TRIANGLE_FAN, bottomStart, bottomLength)
  }
}

export default Cylinder
