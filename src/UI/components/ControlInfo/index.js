const template = document.createElement('template')

// Source: https://iconmonstr.com/arrow-19-svg/
const arrowSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M12.068.016l-3.717 3.698 5.263 5.286h-13.614v6h13.614l-5.295 5.317 3.718 3.699 11.963-12.016z"/>
  </svg>
`
// Source: https://iconmonstr.com/mouse-4-svg/
const mouseSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M16 2c1.103 0 2 .897 2 2v12c0 3.309-2.691 6-6 6s-6-2.691-6-6v-12c0-1.103.897-2 2-2h8zm4 2c0-2.209-1.791-4-4-4h-8c-2.209 0-4 1.791-4 4v12c0 4.418 3.582 8 8 8s8-3.582 8-8v-12zm-7 1c0-.552-.447-1-1-1s-1 .448-1 1v4c0 .552.447 1 1 1s1-.448 1-1v-4z"/>
  </svg>
`

template.innerHTML = `
  <style>
    .camera-text { color: #335599; font-weight: bold; padding: 0 0.5rem; }
    .controls-container { opacity: 0.7; padding: 0.5rem; display: flex; }
    .control-row { text-align: center; padding: 0.1rem 0; }
    .arrow { display: inline-block; padding: 0.3rem; background: #335599; border-radius: 0.2rem; }
    .arrow > svg { fill: #FFFFFF; width: 0.8rem; height: 0.8rem;}
    .right { transform: rotate(0deg); }
    .left { transform: rotate(180deg); }
    .up { transform: rotate(270deg); }
    .down { transform: rotate(90deg); }
    .mouse { padding: 0 0.5rem; transform: rotate(-10deg); }
    .mouse > svg { width: 3rem; height: 3.3rem; fill: #335599; }
  </style>
  <div class="control-info-container">
    <div class="controls-container">
        <div>
        <div class="control-row">
            <div class="arrow up">
            ${arrowSvg}
            </div>
        </div>
        <div class="control-row">
            <div class="arrow left">
                ${arrowSvg}
            </div>
            <div class="arrow down">
                ${arrowSvg}
            </div>
            <div class="arrow right">
                ${arrowSvg}
            </div>
        </div>
        </div>
        <div>
        <div class="mouse">
            ${mouseSvg}
        </div>
        </div>
    </div>
    <div class="camera-text" > Camera Controls </div>
  </div>
`

class ControlInfo extends window.HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('control-info', ControlInfo)
export default ControlInfo
