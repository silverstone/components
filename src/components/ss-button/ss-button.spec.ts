import { ButtonComponent } from './ss-button'

describe('ss-button', () => {
  it('should build', () => {
    expect(new ButtonComponent()).toBeTruthy()
  })

  it('should ripple', () => {
    const button = new ButtonComponent()
    
    button.render()
    
    expect(button.ripples.length).toBe(0)
    
    button.handleMouseDown({ which: 0 })
    
    expect(button.ripples.length).toBe(1)

  })
})