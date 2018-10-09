import { Component, Prop, State, Method, Element, Watch } from '@stencil/core';
import { Sidebar } from '../ss-sidebar/ss-sidebar';

@Component({
  tag: 'ss-sheath',
  styleUrl: 'ss-sheath.scss',
  shadow: true
})
export class Sheath {

  @Element() el: HTMLElement

  sidebarEl: Sidebar

  componentDidLoad() {
    this.el.classList.add("push")
  }

  render() {
    return ([
      <slot></slot>
    ])
  }
}