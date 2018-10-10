import { Component, Prop, Element, State } from '@stencil/core'

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
  @State() top: number

  @Element() el: HTMLElement
  buttonEl: HTMLElement

  offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  handleClick = (event) => {
    let buttonOffset = this.offset(this.buttonEl)
    this.offset(this.buttonEl);
    let { offsetWidth, offsetHeight } = this.buttonEl

    let rippleSize
    if (offsetWidth > offsetHeight) {
      rippleSize = offsetWidth
    } else {
      rippleSize = offsetHeight
    }

    const rippleX = event.pageX - buttonOffset.left - rippleSize / 2
    const rippleY = event.pageY - buttonOffset.top - rippleSize / 2

    const rippleStyles = {
      width: rippleSize + 'px',
      height: rippleSize + 'px',
      top: rippleY + 'px',
      left: rippleX + 'px'
    }

    this.ripples = [...this.ripples, (<span class="ripple" style={rippleStyles} />)]
  }

  render() {
    return (
      <button 
      ref={(el: HTMLButtonElement) => this.buttonEl = el}
      class={`${this.type} ${this.color} ${this.ripple}`} onMouseDown={this.handleClick}>
        {...this.ripples}
        <slot />
      </button>
    )
  }
}
