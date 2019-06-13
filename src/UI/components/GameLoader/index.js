const template = document.createElement('template')

template.innerHTML = `
<style>
  #loader-root {
    right: 5%;
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
    user-select: none;
  }

  #loading-text {
    font-size: 2rem;
    color: #33AA11;
    display: inline-block;
    position: relative;
    padding-left: 1rem;
    transform: translateY(-50%);
  }

  #coin {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: #99CC33;
    animation: spin 1.5s linear infinite;
    display: inline-block;
  }

  @keyframes spin {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(360deg); }
  }
</style>
<div id='loader-root'>
  <div id='coin'></div>
  <div id='loading-text'> LOADING </div>
</div>
`

class GameLoader extends window.HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('game-loader', GameLoader)
export default GameLoader
