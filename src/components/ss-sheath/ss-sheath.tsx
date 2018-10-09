import { Component, Prop, State, Method, Element, Watch, Listen } from '@stencil/core';
import { Sidebar } from '../ss-sidebar/ss-sidebar';

@Component({
  tag: 'ss-sheath',
  styleUrl: 'ss-sheath.scss',
  shadow: false
})
export class Sheath {

  @Element() el: HTMLElement
  sheathEl: HTMLElement

  @State() sidebarOpened: boolean = false

  sidebarEl: Sidebar

  

  componentDidLoad() {
    
  }

  @Listen('isOpen')
  isOpenHandler(event: CustomEvent) {
    console.log('Received the custom isOpen event: ', event.detail);
  }

  render() {
    return ([
      <div 
      id="ss-sheath"
      class={"sheath" + (this.sidebarOpened ? " push" : "")}
      ref={(el: HTMLDivElement) => this.sheathEl = el}>
      <slot />
 `  </div>
    ])
  }
}