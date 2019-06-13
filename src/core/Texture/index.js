class Texture {
  constructor (context) {
    this.gl = context.gl
  }

  setImage (image, channels = 3, tile = false) {
    this.__tile = tile
    this.__channels = channels
    this.__prepare(image)
  }

  loadImage (url, channels = 3, tile = false) {
    return new Promise((resolve, reject) => {
      this.__tile = tile
      this.__channels = 3
      const image = document.createElement('img')
      image.onload = () => {
        this.__prepare(image)
        resolve(image)
      }
      image.src = url
    })
  }

  get location () {
    return this.__location
  }

  __prepare (image) {
    const { gl } = this
    const channels = this.__channels === 4 ? gl.RGBA : gl.RGB
    this.__location = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, this.__location)
    const wrap = this.__tile ? gl.REPEAT : gl.CLAMP_TO_EDGE
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    gl.texImage2D(gl.TEXTURE_2D, 0, channels, channels, gl.UNSIGNED_BYTE, image)

    gl.bindTexture(gl.TEXTURE_2D, null)
  }
}

export default Texture
