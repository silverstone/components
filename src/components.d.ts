/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface SsBackdrop {
    'closeButton': boolean;
    'invisible': boolean;
    'show': boolean;
  }
  interface SsBackdropAttributes extends StencilHTMLAttributes {
    'closeButton'?: boolean;
    'invisible'?: boolean;
    'onClickCloseButton'?: (event: CustomEvent) => void;
    'show'?: boolean;
  }

  interface SsButton {
    'color': 'plain' | 'primary' | 'secondary' | 'danger';
    'type': 'basic' | 'raised' | 'outline' | 'flat';
  }
  interface SsButtonAttributes extends StencilHTMLAttributes {
    'color'?: 'plain' | 'primary' | 'secondary' | 'danger';
    'type'?: 'basic' | 'raised' | 'outline' | 'flat';
  }

  interface SsInput {
    'append': string;
    'errorPattern': string;
    'errorRequired': string;
    'full': boolean;
    'placeholder': string;
    'prepend': string;
    'type': string;
  }
  interface SsInputAttributes extends StencilHTMLAttributes {
    'append'?: string;
    'errorPattern'?: string;
    'errorRequired'?: string;
    'full'?: boolean;
    'onOnChange'?: (event: CustomEvent) => void;
    'onOnInput'?: (event: CustomEvent) => void;
    'onOnKeyDown'?: (event: CustomEvent) => void;
    'onOnKeyUp'?: (event: CustomEvent) => void;
    'placeholder'?: string;
    'prepend'?: string;
    'type'?: string;
  }

  interface SsModal {
    'backdrop': boolean;
    'backdropCloseButton': boolean;
    'close': () => void;
    'closeOutside': boolean;
    'open': () => void;
  }
  interface SsModalAttributes extends StencilHTMLAttributes {
    'backdrop'?: boolean;
    'backdropCloseButton'?: boolean;
    'closeOutside'?: boolean;
  }

  interface SsPopover {
    'align': string;
    'close': () => void;
    'dismissable': boolean;
    'margin': number;
    'offsetX': number;
    'offsetY': number;
    'open': () => void;
    'position': string;
    'trigger': string;
    'type': string;
  }
  interface SsPopoverAttributes extends StencilHTMLAttributes {
    'align'?: string;
    'dismissable'?: boolean;
    'margin'?: number;
    'offsetX'?: number;
    'offsetY'?: number;
    'position'?: string;
    'trigger'?: string;
    'type'?: string;
  }

  interface SsSheath {}
  interface SsSheathAttributes extends StencilHTMLAttributes {}

  interface SsSidebar {
    'close': () => void;
    'mode': string;
    'open': () => void;
    'position': string;
    'state': string;
  }
  interface SsSidebarAttributes extends StencilHTMLAttributes {
    'mode'?: string;
    'position'?: string;
    'state'?: string;
  }

  interface SsTopbar {
    'cols': number;
    'header': boolean;
    'nav': boolean;
    'navItems': number;
    'rows': number;
    'template': string;
    'tools': number;
  }
  interface SsTopbarAttributes extends StencilHTMLAttributes {
    'cols'?: number;
    'header'?: boolean;
    'nav'?: boolean;
    'navItems'?: number;
    'rows'?: number;
    'template'?: string;
    'tools'?: number;
  }
}

declare global {
  interface StencilElementInterfaces {
    'SsBackdrop': Components.SsBackdrop;
    'SsButton': Components.SsButton;
    'SsInput': Components.SsInput;
    'SsModal': Components.SsModal;
    'SsPopover': Components.SsPopover;
    'SsSheath': Components.SsSheath;
    'SsSidebar': Components.SsSidebar;
    'SsTopbar': Components.SsTopbar;
  }

  interface StencilIntrinsicElements {
    'ss-backdrop': Components.SsBackdropAttributes;
    'ss-button': Components.SsButtonAttributes;
    'ss-input': Components.SsInputAttributes;
    'ss-modal': Components.SsModalAttributes;
    'ss-popover': Components.SsPopoverAttributes;
    'ss-sheath': Components.SsSheathAttributes;
    'ss-sidebar': Components.SsSidebarAttributes;
    'ss-topbar': Components.SsTopbarAttributes;
  }


  interface HTMLSsBackdropElement extends Components.SsBackdrop, HTMLStencilElement {}
  var HTMLSsBackdropElement: {
    prototype: HTMLSsBackdropElement;
    new (): HTMLSsBackdropElement;
  };

  interface HTMLSsButtonElement extends Components.SsButton, HTMLStencilElement {}
  var HTMLSsButtonElement: {
    prototype: HTMLSsButtonElement;
    new (): HTMLSsButtonElement;
  };

  interface HTMLSsInputElement extends Components.SsInput, HTMLStencilElement {}
  var HTMLSsInputElement: {
    prototype: HTMLSsInputElement;
    new (): HTMLSsInputElement;
  };

  interface HTMLSsModalElement extends Components.SsModal, HTMLStencilElement {}
  var HTMLSsModalElement: {
    prototype: HTMLSsModalElement;
    new (): HTMLSsModalElement;
  };

  interface HTMLSsPopoverElement extends Components.SsPopover, HTMLStencilElement {}
  var HTMLSsPopoverElement: {
    prototype: HTMLSsPopoverElement;
    new (): HTMLSsPopoverElement;
  };

  interface HTMLSsSheathElement extends Components.SsSheath, HTMLStencilElement {}
  var HTMLSsSheathElement: {
    prototype: HTMLSsSheathElement;
    new (): HTMLSsSheathElement;
  };

  interface HTMLSsSidebarElement extends Components.SsSidebar, HTMLStencilElement {}
  var HTMLSsSidebarElement: {
    prototype: HTMLSsSidebarElement;
    new (): HTMLSsSidebarElement;
  };

  interface HTMLSsTopbarElement extends Components.SsTopbar, HTMLStencilElement {}
  var HTMLSsTopbarElement: {
    prototype: HTMLSsTopbarElement;
    new (): HTMLSsTopbarElement;
  };

  interface HTMLElementTagNameMap {
    'ss-backdrop': HTMLSsBackdropElement
    'ss-button': HTMLSsButtonElement
    'ss-input': HTMLSsInputElement
    'ss-modal': HTMLSsModalElement
    'ss-popover': HTMLSsPopoverElement
    'ss-sheath': HTMLSsSheathElement
    'ss-sidebar': HTMLSsSidebarElement
    'ss-topbar': HTMLSsTopbarElement
  }

  interface ElementTagNameMap {
    'ss-backdrop': HTMLSsBackdropElement;
    'ss-button': HTMLSsButtonElement;
    'ss-input': HTMLSsInputElement;
    'ss-modal': HTMLSsModalElement;
    'ss-popover': HTMLSsPopoverElement;
    'ss-sheath': HTMLSsSheathElement;
    'ss-sidebar': HTMLSsSidebarElement;
    'ss-topbar': HTMLSsTopbarElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
