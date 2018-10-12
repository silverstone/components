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
  @State() rippleExpanded: boolean = false
  @State() rippleFadeOut: boolean 
  @State() rippleEnd: boolean = false

  @Element() el: HTMLElement
  buttonEl: HTMLElement
  rippleContainerEl: HTMLElement
  rippleEl: HTMLElement

  @Listen('isRippleExpanded')
  isRippleExpandedHandler(event: CustomEvent) {
    this.rippleExpanded = (event.detail)
  }

  @Listen('isRippleFadeOut')
  isRippleFadeOutHandler(event: CustomEvent) {
    console.log("this ripple is done fading out" + event.detail)
    this.rippleFadeOut = (event.detail)
    
  }

  offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  componentWillUpdate() {
    if (this.rippleEl && this.rippleFadeOut && this.rippleContainerEl.childNodes.length > 10) {
      while (this.rippleContainerEl.firstElementChild && this.rippleContainerEl.childNodes.length > 5) {
        this.rippleContainerEl.removeChild(this.rippleContainerEl.firstElementChild);
      }
    }
  }

  handleMouseDown = (event) => {
    var buttonOffset = this.offset(this.buttonEl)
    this.offset(this.buttonEl);
    const { offsetWidth, offsetHeight } = this.buttonEl
  
    var rippleSize
    if (offsetWidth > offsetHeight) {
      rippleSize = offsetWidth
    } else {
      rippleSize = offsetHeight
    }
  
    var rippleX = event.pageX - buttonOffset.left - rippleSize / 2
    var rippleY = event.pageY - buttonOffset.top - rippleSize / 2

    const rippleStyles = {
      width: rippleSize + 'px',
      height: rippleSize + 'px',
      top: rippleY + 'px',
      left: rippleX + 'px'
    }

    this.ripples = [...this.ripples, (<ss-ripple class="ripple" style={rippleStyles} ref={(el: HTMLDivElement) => this.rippleEl = el}/>)]
  }

  handleMouseUp = (event) => {
    if (this.rippleEl) {
      this.rippleEl.style.transition = "all 1000ms ease"
      this.rippleEl.style.opacity = "0"
    } else if (this.rippleEl && this.rippleFadeOut) {
      this.rippleContainerEl.removeChild(this.rippleContainerEl.firstElementChild)
    }
  }
   
  render() {
    return (
      <button 
      ref={(el: HTMLButtonElement) => this.buttonEl = el}
      class={`${this.type} ${this.color} ${this.ripple}`}
      onMouseDown={this.handleMouseDown}
      onMouseLeave={this.handleMouseUp}
      onMouseUp={this.handleMouseUp}>
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
