import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'ss-topbar',
  styleUrl: 'ss-topbar.scss',
  shadow: true
})
export class Topbar {

  @Prop() rows: number = 1
  @Prop() cols: number = 3
  @Prop() template: string = "custom"
  @Prop() sidebar: boolean = true
  @Prop() tools: number = 4
  @Prop() header: boolean = true
  @Prop() nav: boolean = false
  @Prop() navItems: number = 4

  render() {
    //Custom
    if (this.template=="custom") {
      return ([
        <div class="topbar__sheath">
          {Array(this.rows).fill(null).map((_, irow) => (
            <slot name={"row-" + (irow + 1)}>
              <div class="topbar__row">
                {Array(this.cols).fill(null).map((_, icol) => (
                  <slot name={"col-" + (icol + 1)}>
                    <div class="topbar__col">
                      <slot name={"row-" + (irow + 1) + " " + "col-" + (icol + 1)}></slot>
                    </div>
                  </slot>
                ))}
              </div>
            </slot>
          ))}
        </div>
      ])
    } 
    //Dashboard
    if (this.template=="dashboard") {
      return (
        <div class="topbar__sheath dashboard">
          <slot name="row-1">
            <div class="topbar__row">
              <slot name="col-1">
                <div class="topbar__col">
                  <slot name="row-1 col-1">
                    <div class="sidebar-button__sheath">
                      <slot name="sidebar-button">
                        
                      </slot>
                    </div>
                    <div class="logo__sheath">
                      <slot name="logo">
                        <div class="logo">
                          <span>Logo</span>
                        </div>
                      </slot>
                    </div>
                  </slot>
                </div>
              </slot>
              <slot name="col-2">
                <div class="topbar__col">
                  <slot name="row-1 col-2">
                    <div class="header__sheath">
                      {this.header
                        ? <slot name="header">
                            <div class="header">
                              <slot name="title">
                                <span>Page Title</span>
                              </slot>
                            </div>
                          </slot>
                        : null
                      }
                      {this.nav
                        ? <slot name="nav">
                            <div class="nav">
                              <ul>
                                {Array(this.navItems).fill(null).map((_, inavItems) => (
                                  <li>
                                    <slot name={"node-" + (inavItems + 1)}>
                                      <div class="node">
                                        <slot name="nav-node">
                                        <a href="#">
                                          Nav Node
                                        </a>
                                        </slot>
                                      </div>
                                    </slot>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </slot>
                        : null
                      }
                    </div>
                  </slot>
                </div>
              </slot>
              <slot name="col-3">
                <div class="topbar__col">
                  <slot name="row-1 col-3">
                    <div class="toolbar__sheath">
                      <slot name="toolbar">
                        <div class="toolbar">
                          <ul>
                            {Array(this.tools).fill(null).map((_, itools) => (
                              <li>
                                <slot name={"tool-" + (itools + 1)}>
                                  <div class="tool"></div>
                                </slot>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </slot>
                    </div>
                  </slot>
                </div>
              </slot>

            </div>
          </slot>
        </div>
      )
    }
  }
}