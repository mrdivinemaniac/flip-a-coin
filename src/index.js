import AppContext from './core/AppContext'
import Coin from './gameObjects/Coin'
import Scene from './core/Scene'
import Camera from './core/Camera'
import Texture from './core/Texture'

function main () {
  const canvas = document.getElementById('screen')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const context = new AppContext(canvas)

  const scene = new Scene(context)
  scene.setClearColor([0.75, 0.85, 0.8, 1.0])
  const camera = new Camera()
  scene.setCamera(camera)
  camera.setPosition([0, 7, 0.01])

  const texture = new Texture(context)
  texture.loadImage('textures/2rscoin.jpg', 3)

  const coin = new Coin(context)
  coin.initialize(1, 0.1, 50)
  coin.setTexture(texture)

  scene.addGameObject(coin)

  camera.lookAt([0, 0, 0])

  const camPosition = { x: 0, y: 0, z: 0 }

  let keysMap = {}

  const loop = function () {
    if (keysMap.ArrowUp) camPosition.x += 3
    if (keysMap.ArrowDown) camPosition.x -= 3
    if (keysMap.ArrowLeft) camPosition.z -= 3
    if (keysMap.ArrowRight) camPosition.z += 3
    coin.rotation = camPosition
    scene.draw()
    window.requestAnimationFrame(loop)
  }

  loop()

  window.addEventListener('blur', e => {
    keysMap = {}
  })

  window.addEventListener('keydown', e => {
    keysMap[e.key] = true
  })

  window.addEventListener('keyup', e => {
    keysMap[e.key] = false

  })
}

window.onload = main
