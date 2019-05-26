const template = document.createElement('template')

template.innerHTML = `
<style>
  :host {
    display: block;
    overflow: hidden;
  }

  h1 {
    color: #335599;
    text-align: center;
    user-select: none;
    width: auto;
    font-size: 2rem;
    animation: pulsate 0.6s infinite alternate;
    font-weight: normal;
    margin: 0;
  }

  h2 {
    color: #666666;
    text-align: center;
    user-select: none;
    width: auto;
    font-size: 1.3rem;
    font-weight: normal;
    margin: 0.5rem 0 0 0;
  }

  .question {
    position: absolute;
    animation: slide-down 1s 1;
    animation-fill-mode: both;
  }

  @keyframes slide-down {
    from {transform: scale(1.5) rotateY(360deg);}
    to {left: scale(1) rotateY(0)}
  }

  @keyframes pulsate {
    from {transform: scale(1)}
    to {transform: scale(1.05)}
  }
</style>
<h1>
  Heads or Tails<span class='question'>?</span>
</h1>
<h2>
  Click to find out
</h2>
`

class ClickPrompt extends window.HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('click-prompt', ClickPrompt)
export default ClickPrompt
