import { Component, Prop, Element, Event, EventEmitter, State } from '@stencil/core'

@Component({
  tag: 'ss-input',
  styleUrl: 'ss-input.scss',
  shadow: true
})
export class Input {
  
  @Element() inputEl: HTMLElement

  @Prop() type: string = 'text'
  @Prop() full: boolean = false
  @Prop() placeholder: string
  @Prop() prepend: string
  @Prop() append: string
  @Prop() errorRequired: string = "This field is required."
  @Prop() errorPattern: string = "Invalid entry."
  
  @State() options: string[]
  @State() required: boolean
  @State() disabled: boolean
  @State() pattern: string
  @State() error: string

  @Event() onChange: EventEmitter
  @Event() onInput: EventEmitter
  @Event() onKeyDown: EventEmitter
  @Event() onKeyUp: EventEmitter

  componentWillLoad() {
    this.required = this.inputEl.hasAttribute('required')
    this.disabled = this.inputEl.hasAttribute('disabled')

    // Since slotted <option> elements don't work by default, we use querySelectorAll
    // to find those elements and store all their innerHTML values in an array. 
    const optionList = this.inputEl.querySelectorAll('option')
    const options = []
    for (let i = 0; i < optionList.length; i++) {
      options.push(optionList.item(i).innerHTML)
    }
    this.options = options
  }

  handleInput(event) {
    const value = event.target.value

    if (value) {
      event.target.classList.add('has-value')
    } else {
      event.target.classList.remove('has-value')
    }

    if (this.required && !value) {
      this.error = this.errorRequired
    } else if (this.pattern && !(new RegExp(this.pattern)).test(value)) {
      this.error = this.errorPattern
    }
    
    this.onInput.emit(event)
  }

  renderInput() {
    switch (this.type) {
      case 'textarea': 
        return (
          <textarea 
            class="input-control"
            required={this.required}
            onInput={event => this.handleInput(event)}
            onChange={event => this.onChange.emit(event)}
            onKeyDown={event => this.onKeyDown.emit(event)}
            onKeyUp={event => this.onKeyUp.emit(event)}
          />
        )
      case 'select':
        return (
          <select class="input-control" onChange={e => this.onChange.emit(e)}>
            {this.options.map(option =>
              <option>{option}</option>
            )}
            <slot />
          </select>
        )
      default:
        return (
          <input
            type={this.type}
            class="input-control"
            disabled={this.disabled}
            required={this.required}
            pattern={this.pattern}
            onInput={event => this.handleInput(event)}
            onChange={event => this.onChange.emit(event)}
            onKeyDown={event => this.onKeyDown.emit(event)}
            onKeyUp={event => this.onKeyUp.emit(event)}
          />
        )
    }
  }
  
  render() {
    return (
      <div class="wrapper">
        <div class="inner-wrapper">
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
        {this.error &&
          <div class="error">
            {this.error}
          </div>
        }
      </div>
    )
  }
}