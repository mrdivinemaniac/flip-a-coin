import './components/ResultMessage'
import './components/ClickPrompt'
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
    const message = document.createElement('result-message')
    const clickPrompt = document.createElement('click-prompt')
    overlay.appendChild(clickPrompt)
    overlay.appendChild(message)
    document.body.appendChild(overlay)
    this.__overlay = overlay
    this.__message = message
    this.__clickPrompt = clickPrompt
  }

  __sizeOverlay () {
    const overlay = this.__overlay
    overlay.style.width = window.innerWidth
    overlay.style.height = window.innerHeight
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

  destroy () {
    window.removeEventListener('resize', this.__sizeOverlay)
  }
}

export default UI
