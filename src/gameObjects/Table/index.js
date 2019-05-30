import GameObject from '../../core/GameObject'
import VertexShader from '../../core/shaders/VertexShader'
import FragmentShader from '../../core/shaders/FragmentShader'
import vertexShaderSrc from './shader.vert'
import fragmentShaderSrc from './shader.frag'
import TableModel from '../../models/Table'

class Table extends GameObject {
  initialize (height, width, breadth, legHeight, legWidth, legBreadth) {
    const vertexShader = new VertexShader(this.context, vertexShaderSrc)
    const fragmentShader = new FragmentShader(this.context, fragmentShaderSrc)
    const model = new TableModel(this.context)
    model.initialize(vertexShader, fragmentShader)
    model.initializeProperties(height, width, breadth, legHeight, legWidth, legBreadth)
    this._setModel(model)
  }

  setTexture (textureImage) {
    this.__model.setTexture(textureImage)
  }
}

export default Table
