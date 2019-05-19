import GLContext from './core/gl-context'

function main () {
  const canvas = document.getElementById('screen')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const context = new GLContext(canvas)
}

window.onload = main
