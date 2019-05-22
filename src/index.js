import AppContext from './core/AppContext'
import Coin from './gameObjects/Coin'
import Scene from './core/Scene'
import Camera from './core/Camera'
import Texture from './core/Texture'
import ControlCoin from './scripts/ControlCoin'

function main () {
  const canvas = document.getElementById('screen')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const context = new AppContext(canvas)
  const scene = setupScene(context)
  const coin = createCoin(context)

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
  camera.setPosition([0, 12, 0.01])
  camera.lookAt([0, 0, 0])
  return scene
}

function createCoin (context) {
  const texture = new Texture(context)
  texture.loadImage('textures/2rscoin.jpg', 3)
  const coin = new Coin(context)
  coin.addControlScript('controlCoin', new ControlCoin())
  coin.initialize(1, 0.1, 50)
  coin.setTexture(texture)
  return coin
}

window.onload = main
