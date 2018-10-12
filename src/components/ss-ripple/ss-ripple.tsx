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
    // console.log("component will load. ripple expanded is " +  this.rippleExpanded)
  }

  componentDidLoad() {
    this.el.style.transform = "scale(2)"
    this.el.addEventListener('transitionend', () => {
      // this.rippleExpanded = true
      // console.log("component did load. ripple expanded is " + this.rippleExpanded)
      this.isRippleExpanded.emit(true)
    }, true)
  }

  componentWillUpdate() {
    // console.log("ripple will update")
    // this.el.style.transition = "all 450ms ease-out"
    // this.el.style.opacity = "0"
    this.el.addEventListener('transitionend', () => {
      // this.rippleFadeOut = true
      // console.log("ripple fadeout is " + this.rippleFadeOut)
      this.isRippleFadeOut.emit(true)
    })
  }

  componentDidUpdate() {
    // console.log("ripple updated")
    // console.log("safe to delete node")
    
  }



  // render() {
  //   return (
  //     // <div class="ripple"></div>
  //   )
  // }
}
