import { Component, Prop, Element, State } from '@stencil/core'

@Component({
  tag: 'ss-ripple',
  styleUrl: 'ss-ripple.scss',
  shadow: true
})
export class ButtonComponent {

  @State() focusRipple: JSX.Element[] = []
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

  handleMouseUp = (event) => {
    // console.log("mouse up")
    // let buttonOffset = this.offset(this.buttonEl)
    // this.offset(this.buttonEl);
    // let { offsetWidth, offsetHeight } = this.buttonEl

    // let rippleSize
    // if (offsetWidth > offsetHeight) {
    //   rippleSize = offsetWidth
    // } else {
    //   rippleSize = offsetHeight
    // }

    // const rippleX = event.pageX - buttonOffset.left - rippleSize / 2
    // const rippleY = event.pageY - buttonOffset.top - rippleSize / 2

    // const rippleStyles = {
    //   width: rippleSize + 'px',
    //   height: rippleSize + 'px',
    //   top: rippleY + 'px',
    //   left: rippleX + 'px'
    // }

    // this.ripples = [...this.ripples, (<span class="ripple" style={rippleStyles} />)]
    // this.buttonEl.querySelector(".focus-ripple").classList.add('rippleOut')
    // this.buttonEl.querySelector(".focus-ripple")
    // setTimeout(() => {
    //   this.focusRipple.shift()
      
    // }, 400);
    
    const rippleIndex = this.focusRipple.length - 1
    const ripple = (this.focusRipple[rippleIndex] as any).elm
    ripple.addEventListener('transitionend', () => {
      this.focusRipple.pop()
    })
    // setTimeout(() => {
    //   this.focusRipple.shift()
    // }, 500);
  console.log(ripple)
  }

  handleMouseDown = (event) => {
    
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

    // this.focusRipple = [...this.focusRipple, (<span class="focus-ripple" style={rippleStyles} />)]
    // setTimeout(() => {
    //   this.buttonEl.querySelector(".focus-ripple").classList.add("rippleIn")
    // }, 50);
    this.focusRipple = [...this.focusRipple, (<span class="focus-ripple" style={rippleStyles} />)]
    const rippleIndex = this.focusRipple.length - 1

    setTimeout(() => {
      const ripple = (this.focusRipple[rippleIndex] as any).elm
      ripple.classList.add('rippleIn')
      ripple.classList.remove('rippleOut');
          
    }, 100);

    // console.log(ripple)
  }

  render() {
    return (
      <div class="ripple"></div>
    )
  }
}
