const template = document.createElement('template')

template.innerHTML = `
<style>
  :host {
    display: block;
    overflow: hidden;
  }

  h1 {
    color: #3388FF;
    text-align: center;
    margin: 0;
    user-select: none;
    transition: 1s all;
    opacity: 0;
    font-size: 2rem;
    transform: scale(1);
    font-weight: normal;
    background: #FFFFFF;
    padding: 1rem 0;
  }

  h1.active {
    opacity: 100;
    transform: scale(1.5);
  }

</style>
<h1>
  It's <span id='result'> </span>!!
</h1>
`

class ResultMessage extends window.HTMLElement {
  static get observedAttributes () {
    return ['result']
  }

  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$root = this._shadowRoot.querySelector('h1')
    this.$result = this._shadowRoot.querySelector('#result')
  }

  connectedCallback () {
    this._render()
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'result':
        this._result = newValue
    }
    this._render()
  }

  get result () {
    return this.getAttribute('result')
  }

  set result (value) {
    this.setAttribute('result', value)
  }

  get resultText () {
    switch (this._result) {
      case 'heads': return 'Heads'
      case 'tails': return 'Tails'
      default: return 'Unknown'
    }
  }

  _render () {
    if (this._result) {
      this.$result.innerText = this.resultText
      this.$root.classList.add('active')
    } else {
      this.$root.classList.remove('active')
    }
  }
}

window.customElements.define('result-message', ResultMessage)
export default ResultMessage
