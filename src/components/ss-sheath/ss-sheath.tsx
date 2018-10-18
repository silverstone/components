import { Component, State, Element, Listen, Method, Prop } from '@stencil/core';

@Component({
  tag: 'ss-sheath',
  styleUrl: 'ss-sheath.scss',
  shadow: true
})
export class Sheath {

  @Element() el: HTMLElement
  sheathEl: HTMLElement
  sheathContentEl: HTMLElement

  @Prop() type: string = "col"


  @State() sidebarOpened: boolean
  @State() isPushingStart: boolean = false
  @State() isPushingEnd: boolean = false
  @State() hasClicked: boolean = false
  @State() pushWidth: number

  @Method()
  sheathClick() {
    const sidebar = this.el.querySelector('ss-sidebar')
      if (sidebar.opened && sidebar.dismissable) {
        sidebar.close()
      }
  }

  @Listen('isPushingStart')
  isPushingStartHandler(event: CustomEvent) {
    this.isPushingStart = event.detail
  }

  @Listen('isPushingEnd')
  isPushingEndHandler(event: CustomEvent) {
    this.isPushingEnd = event.detail
  }

  @Listen('sidebarWidth')
  sidebarWidthHandler(event: CustomEvent) {
    if (event.detail) {
      this.pushWidth = event.detail
    }
  }
  

  render() {
    return (
      <div 
        class={"sheath"}
        style={{
          "padding-left": (this.isPushingStart) ? `${this.pushWidth}px` : "",
          "padding-right": (this.isPushingEnd) ? `${this.pushWidth}px` : ""
        }}
        ref={(el: HTMLDivElement) => this.sheathEl = el}
      >
        <slot name="sidebar"></slot>
        <div class="sheath-content"
        onClick={(() => this.sheathClick())}
        ref={(el: HTMLDivElement) => this.sheathContentEl = el}>
        <slot />
        </div>
      </div>
    )
  }
}