import { Component, Prop, Element, Event, EventEmitter, State } from '@stencil/core'

@Component({
  tag: 'ss-input',
  styleUrl: 'ss-input.scss',
  shadow: false
})
export class Input {
  
  @Element() inputEl: HTMLElement

  @Prop() type: string = 'text'
  @Prop() full: boolean = false
  @Prop() placeholder: string
  @Prop() prepend: string
  @Prop() append: string
  @Prop() optionsAsString: string
  @Prop() options: string[]

  @State() disabled: boolean

  @Event() onChange: EventEmitter
  @Event() onInput: EventEmitter
  @Event() onKeyDown: EventEmitter
  @Event() onKeyUp: EventEmitter

  componentWillLoad() {
    if (this.inputEl.hasAttribute('disabled')) {
      this.disabled = true
    }
    this.inputEl.classList.add('input-control')
  }

  renderInput() {
    let options
    if (this.optionsAsString) {
      options = JSON.parse(this.optionsAsString.replace(/'/g, '"'))
    } else {
      options = this.options
    }

    switch (this.type) {
      case 'textarea': 
        return (
          <textarea class="input-control">
            {this.placeholder}
          </textarea>
        )
      case 'select':
        return (
          <select class="input-control">
            {(options && options.map(option => 
              <option>{option}</option>
            ))}
          </select>
        )
      default:
        return (
          <input
            type={this.type}
            class="input-control"
            onChange={event => this.onChange.emit(event)}
            onInput={event => this.onInput.emit(event)}
            onKeyDown={event => this.onKeyDown.emit(event)}
            onKeyUp={event => this.onKeyUp.emit(event)}
            disabled={this.disabled}
            required
          />
        )
    }
  }
  
  render() {
    return (
      <div class="wrapper">
          {this.prepend && 
            <span class="prepend">
              {this.prepend}
            </span>
          }
          
          <div class={
            "input-wrapper" +
            (this.full ? " full" : "") +
            (this.append ? " has-append" : "") +
            (this.prepend ? " has-prepend" : "")
          }>
            {this.renderInput()}
            <span class="floating-label">{this.placeholder}</span>
          </div>

          {this.append && 
            <span class="append">
              {this.append}
            </span>
          }
      </div>
    )
  }
}