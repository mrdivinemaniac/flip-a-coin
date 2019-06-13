import './components/ResultMessage'
import './components/ClickPrompt'
import './components/ControlInfo'
import './components/GameLoader'
import './style.css'

class UI {
  constructor () {
    this.__initialize()
    this.__sizeOverlay = this.__sizeOverlay.bind(this)
    this.resetResultMessage = this.resetResultMessage.bind(this)
    window.addEventListener('resize', this.__sizeOverlay)
    this.__sizeOverlay()
  }

  __initialize () {
    const overlay = document.createElement('div')
    overlay.id = 'overlay'
    document.body.appendChild(overlay)
    this.__overlay = overlay
  }

  __sizeOverlay () {
    const overlay = this.__overlay
    overlay.style.width = window.innerWidth
    overlay.style.height = window.innerHeight
  }

  showHUD () {
    const overlay = this.__overlay
    overlay.innerHTML = ''
    const message = document.createElement('result-message')
    const clickPrompt = document.createElement('click-prompt')
    overlay.appendChild(clickPrompt)
    overlay.appendChild(message)
    this.__message = message
    this.__clickPrompt = clickPrompt
    this.showControlInfo()
  }

  showClickPrompt (show = true) {
    if (show) {
      this.__clickPrompt.classList.remove('hidden')
    } else {
      this.__clickPrompt.classList.add('hidden')
    }
  }

  resetResultMessage () {
    this.__message.result = ''
    this.showClickPrompt(true)
  }

  displayResultMessage (result) {
    this.__message.result = result
    this.showClickPrompt(false)
    if (this.__messageTimeout) window.clearTimeout(this.__messageTimeout)
    this.__messageTimeout = window.setTimeout(this.resetResultMessage, 2000)
  }

  showControlInfo () {
    const controlInfo = document.createElement('control-info')
    this.__overlay.appendChild(controlInfo)
  }

  showLoader () {
    this.__overlay.innerHTML = ''
    const loader = document.createElement('game-loader')
    this.__overlay.appendChild(loader)
  }

  destroy () {
    window.removeEventListener('resize', this.__sizeOverlay)
  }
}

export default UI
