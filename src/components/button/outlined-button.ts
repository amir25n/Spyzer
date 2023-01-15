import {customElement} from 'lit/decorators.js';

import {CommonButton, styles} from './button';

@customElement('outlined-button')
export class OutlinedButton extends CommonButton {
  static override styles = [...CommonButton.styles, styles.outlined];
}

declare global {
  interface HTMLElementTagNameMap {
    'outlined-button': OutlinedButton;
  }
}
