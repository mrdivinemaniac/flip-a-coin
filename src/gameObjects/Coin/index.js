import GameObject from '../GameObject'
import Cylinder from '../../models/primitives/Cylinder'
import { vertexShaderSrc, fragmentShaderSrc } from './shaders'
import VertexShader from '../../core/shaders/VertexShader'
import FragmentShader from '../../core/shaders/FragmentShader'

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

  update () {}
}

export default Coin
