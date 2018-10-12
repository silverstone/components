import { Component, Prop, Element, State, Listen, Event, EventEmitter } from '@stencil/core'

@Component({
  tag: 'ss-ripple',
  styleUrl: 'ss-ripple.scss',
  shadow: true
})
export class RippleComponent {

  @State() rippleExpanded: Boolean
  @State() rippleFadeOut: Boolean = false

  @Element() el: HTMLElement

  @Event() isRippleExpanded: EventEmitter
  @Event() isRippleFadeOut: EventEmitter


  componentWillLoad() {
    this.rippleExpanded = false
    this.rippleFadeOut = false
    this.isRippleExpanded.emit(false)
    this.isRippleFadeOut.emit(false)
  }

  componentDidLoad() {
    this.el.style.transform = "scale(2)"
    this.el.addEventListener('transitionend', () => {
      this.rippleExpanded = true
      this.isRippleExpanded.emit(true)
    }, true)
  }

  componentWillUpdate() {
    this.el.addEventListener('transitionend', () => {
      this.rippleFadeOut = true
      this.isRippleFadeOut.emit(true)
    })
  }
}
