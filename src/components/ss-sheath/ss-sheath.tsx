import { Component, Prop, State, Method, Element, Watch, Listen } from '@stencil/core';

@Component({
  tag: 'ss-sheath',
  styleUrl: 'ss-sheath.scss',
  shadow: false
})
export class Sheath {

  @Element() el: HTMLElement
  sheathEl: HTMLElement

  @State() sidebarOpened: boolean
  @State() isPushingStart: boolean = false
  @State() isPushingEnd: boolean = false
  @State() pushWidth: number
  

  componentDidLoad() {
  }

  @Listen('isPushingStart')
  isPushingStartHandler(event: CustomEvent) {
        this.isPushingStart = event.detail
        console.log("pushing start is " + event.detail);
    }

  @Listen('isPushingEnd')
  isPushingEndHandler(event: CustomEvent) {
        this.isPushingEnd = event.detail
        console.log("pushing end is " + event.detail);
    }

    @Listen('sidebarWidth')
  sidebarWidthHandler(event: CustomEvent) {
      if (event.detail) {
        this.pushWidth = event.detail
      }
    }

  render() {
    // console.log(this.isPushingStart, this.isPushingEnd)
    return ([
      <div 
      class={"sheath" + (this.sidebarOpened ? " push" : "")}
      style={{"padding-left": (this.isPushingStart) ? `${this.pushWidth}px` : "", "padding-right": (this.isPushingEnd) ? `${this.pushWidth}px` : ""}}
      ref={(el: HTMLDivElement) => this.sheathEl = el}>
      <slot />
      </div>
    ])
  }
}