import { Component, Element, State, Event, EventEmitter } from '@stencil/core'

@Component({
  tag: 'ss-ripple',
  styleUrl: 'ss-ripple.scss',
  shadow: true
})
export class RippleComponent {

  @State() rippleExpanded: Boolean = false
  @State() rippleFadeOut: Boolean = false

  @Element() el: HTMLElement

  @Event() rippleEnd: EventEmitter

  componentDidLoad() {
    this.el.style.transform = "scale(2)"
  }

  @Listen('transitionend')
  handleTransitionEnd() {
    if (!this.rippleExpanded) {
      this.rippleExpanded = true
    } else {
      this.el.parentNode.removeChild(this.el)
      this.rippleFadeOut = true
      this.rippleEnd.emit(true)
      // console.log(this.rippleFadeOut)
    }
  }
}
