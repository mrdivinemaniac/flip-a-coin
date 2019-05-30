import AppContext from './core/AppContext'
import Coin from './gameObjects/Coin'
import Scene from './core/Scene'
import Camera from './core/Camera'
import Texture from './core/Texture'
import ControlCoin from './scripts/ControlCoin'
import Table from './gameObjects/Table'
import UI from './UI'

function main () {
  const ui = new UI()
  const canvas = document.getElementById('screen')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const context = new AppContext(canvas)
  context.ui = ui
  const scene = setupScene(context)
  const coin = createCoin(context)
  const table = createTable(context)
  scene.addGameObject(table)
  scene.addGameObject(coin)

  const loop = function () {
    scene.update()
    scene.draw()
    window.requestAnimationFrame(loop)
  }

  loop()
}

function setupScene (context) {
  const scene = new Scene(context)
  scene.setClearColor([0.75, 0.85, 0.8, 1.0])
  const camera = new Camera()
  scene.setCamera(camera)
  camera.setPosition([0, 10, 10])
  camera.lookAt([0, 0.5, 0])
  return scene
}

function createTable (context) {
  const table = new Table(context)
  table.initialize(0.5, 10, 7, 3, 0.5, 0.5)
  const texture = new Texture(context)
  texture.loadImage('textures/wood.jpg', 3)
  table.setTexture(texture)
  table.position.y = -0.32
  return table
}

function createCoin (context) {
  const { ui } = context
  const texture = new Texture(context)
  texture.loadImage('textures/2rscoin.jpg', 3)
  const coin = new Coin(context)
  const flipScript = new ControlCoin()
  flipScript.onFlipStart(() => {
    ui.showClickPrompt(false)
  })
  flipScript.onFlipEnd(({ heads }) => {
    if (heads) {
      ui.displayResultMessage('heads')
    } else {
      ui.displayResultMessage('tails')
    }
  })
  coin.addControlScript('controlCoin', flipScript)
  coin.initialize(0.7, 0.1, 50)
  coin.setTexture(texture)
  return coin
}

window.onload = main
