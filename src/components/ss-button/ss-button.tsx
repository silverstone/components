import { Component, Prop, Element, State, Method } from '@stencil/core'

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
  @State() buttonOffset: any
  @State() rippleSize: number
  @State() rippleWidth: number
  @State() rippleHeight: number
  @State() rippleX: number
  @State() rippleY: number
  @State() rippleTop: number
  @State() rippleLeft: number
  @State() rippleEnd: boolean = false

  @Element() el: HTMLElement
  buttonEl: HTMLElement
  rippleContainerEl: HTMLElement
  rippleEl: HTMLElement

  offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  componentWillUpdate() {
  
    // console.log("will update", this.rippleContainerEl.hasChildNodes(), this.ripples.length)
    // if (this.rippleContainerEl.hasChildNodes()) {
    //   console.log("will update if is firing", this.rippleEl)
      
    //     this.rippleEl.style.opacity = "0"
    //   setTimeout(() => {
    //       this.rippleContainerEl.removeChild(this.rippleContainerEl.firstElementChild)
    //     }, 600);
    //   }
    
  }

  componentDidUpdate() {

    const lastRipple = this.ripples.length - 1
    this.rippleEl = (this.ripples[lastRipple] as any).elm
    console.log(this.rippleEl, "did update")

    this.rippleEl.style.width = this.rippleSize + 'px'
    this.rippleEl.style.height = this.rippleSize + 'px'
    this.rippleEl.style.top = this.rippleY + 'px'
    this.rippleEl.style.left = this.rippleX + 'px'
    
    setTimeout(() => {
      this.rippleEl.style.transform = "scale(2)"
      this.rippleEl.addEventListener('transitionend', () => {
        this.rippleEnd = true
        console.log(this.rippleEnd)
      }, true)
    }, 1);
    
  }

  handleMouseUp = (event) => {
    if (this.rippleEnd && this.rippleContainerEl.hasChildNodes()) {
      this.rippleEl.style.opacity = "0"
      this.rippleEl.addEventListener('transitionend', () => {
        console.log("opacity out")
        this.rippleContainerEl.removeChild(this.rippleContainerEl.firstElementChild)
      })
    }

    // console.log(this.rippleContainerEl.childNodes)
    // if (this.rippleEnd && this.rippleContainerEl.hasChildNodes()) {
    //   this.rippleEl.style.opacity = "0"
    //   setTimeout(() => {
    //   this.rippleContainerEl.removeChild(this.rippleContainerEl.firstElementChild)
    //   }, 600);
    // }


    // if(this.rippleEnd && this.rippleContainerEl.hasChildNodes() ) {
    //   this.rippleEl.style.opacity = "0"
    //   setTimeout(() => {
    //     this.rippleContainerEl.removeChild(this.rippleContainerEl.firstChild);
    //   }, 1000);
    // } else if (this.rippleEnd) {
    //   setTimeout(() => {
    //     this.rippleEl.style.opacity = "0"
    //   }, 600);
    // } else {
    //   setTimeout(() => {
    //     this.rippleEl.style.opacity = "0"
    //   }, 600);
    // }
   }

  handleMouseDown = (event) => {
    this.buttonOffset = this.offset(this.buttonEl)
    this.offset(this.buttonEl);
    const { offsetWidth, offsetHeight } = this.buttonEl
  
    this.rippleSize
    if (offsetWidth > offsetHeight) {
      this.rippleSize = offsetWidth
    } else {
      this.rippleSize = offsetHeight
    }

    const rippleStyles = {
      width: this.rippleSize + 'px',
      height: this.rippleSize + 'px',
      top: this.rippleY + 'px',
      left: this.rippleX + 'px'
    }
  
    this.rippleX = event.pageX - this.buttonOffset.left - this.rippleSize / 2
    this.rippleY = event.pageY - this.buttonOffset.top - this.rippleSize / 2

    

    this.ripples = [...this.ripples, (<div class="ripple" style={rippleStyles} />)]

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
        ref={(el: HTMLDivElement) => this.rippleContainerEl = el}
        class="ripple__container">
          {...this.ripples}
        </div>
        
        <slot />
      </button>
    )
  }
}
