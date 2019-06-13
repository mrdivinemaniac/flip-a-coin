import AppContext from './core/AppContext'
import Coin from './gameObjects/Coin'
import Scene from './core/Scene'
import Camera from './core/Camera'
import Texture from './core/Texture'
import ControlCoin from './scripts/ControlCoin'
import Table from './gameObjects/Table'
import UI from './UI'
import ControlCamera from './scripts/ControlCamera'

function main () {
  const context = setupContext()
  return loadResources(context)
    .then(resources => prepareGame(context, resources))
    .then(gameLoop)
}

function setupContext () {
  const ui = new UI()
  const canvas = document.getElementById('screen')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const context = new AppContext(canvas)
  context.ui = ui
  return context
}

function loadResources (context) {
  return loadTextures(context)
    .then(textures => ({ textures }))

  function loadTextures (context) {
    const tableTexture = new Texture(context)
    const coinTexture = new Texture(context)
    return Promise.all([
      tableTexture.loadImage('textures/wood.jpg', 3),
      coinTexture.loadImage('textures/2rscoin.jpg', 3)
    ]).then(() => {
      return {
        table: tableTexture,
        coin: coinTexture
      }
    })
  }
}

function prepareGame (context, resources) {
  const { textures } = resources
  const scene = setupScene(context)
  const coin = createCoin(context, textures.coin)
  const table = createTable(context, textures.table)
  scene.camera.addControlScript('controlCamera', new ControlCamera(coin.position))
  scene.addGameObject(table)
  scene.addGameObject(coin)
  return scene
}

function gameLoop (scene) {
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
  const camera = new Camera(context)
  scene.setCamera(camera)
  camera.setPosition([0, 5, 0])
  return scene
}

function createTable (context, texture) {
  const table = new Table(context)
  table.initialize(0.5, 10, 7, 3, 0.5, 0.5)
  table.setTexture(texture)
  table.position.y = -0.32
  return table
}

function createCoin (context, texture) {
  const { ui } = context
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
