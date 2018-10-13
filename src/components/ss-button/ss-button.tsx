import { Component, Prop, Element, State, Method, Event, Listen, EventEmitter } from '@stencil/core'

@Component({
  tag: 'ss-button',
  styleUrl: 'ss-button.scss',
  shadow: true
})
export class ButtonComponent {

  @Prop() type: 'basic' | 'raised' | 'outline' | 'flat' | 'icon' = 'basic'
  @Prop() color: 'plain' | 'primary' | 'secondary' | 'danger' = 'plain'
  @Prop() ripple: 'light' | 'dark' = 'light'

  @State() ripples: JSX.Element[] = []
  @State() rippleFadeOut: boolean = false
  @State() rippleEnd: boolean = false
  @State() isMouseDown: boolean = false

  @Element() el: HTMLElement
  buttonEl: HTMLElement
  rippleEl: HTMLElement
  rippleContainerEl: HTMLElement
  
  @Listen('rippleEnd')
  handleRippleEnd(event: CustomEvent) {
    this.rippleEnd = event.detail
    if (this.rippleEnd) {
      this.ripples = this.ripples.slice(1)
    }
  }
  
  handleMouseDown = (event) => {
    let leftMouseDown = false
    let rightMouseDown = false

    if (event.which == 0) {
      leftMouseDown = true
    } else if (event.which == 2) {
      rightMouseDown = true
    }

    if (!this.isMouseDown && leftMouseDown && rightMouseDown) {
      event.stopPropagation()
      event.preventDefault()
      return null
    }

    if (!this.isMouseDown) {

      this.isMouseDown = true

      const rect = this.buttonEl.getBoundingClientRect()
      const offsetLeft = rect.left + (window.pageXOffset || document.documentElement.scrollLeft)
      const offsetTop = rect.top + (window.pageYOffset || document.documentElement.scrollTop)
      const { offsetWidth, offsetHeight } = this.buttonEl
    
      const rippleSize = offsetWidth > offsetHeight ? offsetWidth : offsetHeight
    
      const rippleX = event.pageX - offsetLeft - rippleSize / 2
      const rippleY = event.pageY - offsetTop - rippleSize / 2

      const rippleStyles = {
        width: rippleSize + 'px',
        height: rippleSize + 'px',
        top: rippleY + 'px',
        left: rippleX + 'px'
      }

      this.ripples = [...this.ripples, (<ss-ripple class="ripple" style={rippleStyles}
      ref={(el: HTMLButtonElement) => this.rippleEl = el} />)]

      } else if (this.isMouseDown && rightMouseDown){
        this.fadeOutRipple(event)
      }
    }
  

  fadeOutRipple = (event) => {
    const ripple: any = this.ripples[this.ripples.length - 1]
    if (this.isMouseDown && ripple.elm) {
      this.isMouseDown = false
      ripple.elm.style.transition = "all 1000ms ease"
      ripple.elm.style.opacity = "0"
    } 
  }

  render() {
    return (
      <button 
      ref={(el: HTMLButtonElement) => this.buttonEl = el}
      class={`${this.type} ${this.color} ${this.ripple}`}
      onMouseDown={this.handleMouseDown}
      onMouseLeave={this.fadeOutRipple}
      onMouseUp={this.fadeOutRipple}>
        <div 
        ref={(el: HTMLElement) => this.rippleContainerEl = el}
        class="ripple__container">
          {...this.ripples}
        </div>
        
        <slot />
      </button>
    )
  }
}
