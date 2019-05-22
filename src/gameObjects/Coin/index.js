import GameObject from '../GameObject'
import Cylinder from '../../models/primitives/Cylinder'
import VertexShader from '../../core/shaders/VertexShader'
import FragmentShader from '../../core/shaders/FragmentShader'
import vertexShaderSrc from './shader.vert'
import fragmentShaderSrc from './shader.frag'

class Coin extends GameObject {
  initialize (radius, thickness, detail = 20) {
    const vertexShader = new VertexShader(this.context, vertexShaderSrc)
    const fragmentShader = new FragmentShader(this.context, fragmentShaderSrc)
    const model = new Cylinder(this.context)
    model.initialize(vertexShader, fragmentShader)
    model.initializeProperties(radius, thickness, detail)
    this._setModel(model)
  }

  setTexture (textureImage) {
    this.__model.setTexture(textureImage)
  }
}

export default Coin
