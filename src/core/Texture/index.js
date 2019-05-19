class Texture {
  constructor (context) {
    this.gl = context.gl
  }

  setImage (image, channels = 3) {
    this.channels = channels
    this.__prepare(image)
  }

  loadImage (url, channels = 3) {
    this.channels = 3
    const image = document.createElement('img')
    image.onload = () => {
      this.__prepare(image)
    }
    image.src = url
  }

  __prepare (image) {
    const { gl } = this
    const channels = this.channels === 4 ? gl.RGBA : gl.RGB
    this.location = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, this.location)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    gl.texImage2D(gl.TEXTURE_2D, 0, channels, channels, gl.UNSIGNED_BYTE, image)

    gl.bindTexture(gl.TEXTURE_2D, null)
  }
}

export default Texture
