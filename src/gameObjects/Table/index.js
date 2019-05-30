import GameObject from '../GameObject'
import VertexShader from '../../core/shaders/VertexShader'
import FragmentShader from '../../core/shaders/FragmentShader'
import vertexShaderSrc from './shader.vert'
import fragmentShaderSrc from './shader.frag'
import Cuboid from '../../models/primitives/Cuboid'

class Table extends GameObject {
  initialize (height, width, breadth) {
    const vertexShader = new VertexShader(this.context, vertexShaderSrc)
    const fragmentShader = new FragmentShader(this.context, fragmentShaderSrc)
    const model = new Cuboid(this.context)
    model.initialize(vertexShader, fragmentShader)
    model.initializeProperties(height, width, breadth)
    this._setModel(model)
  }

  setTexture (textureImage) {
    this.__model.setTexture(textureImage)
  }
}

export default Table
