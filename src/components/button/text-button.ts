import {customElement} from 'lit/decorators.js';

import {CommonButton, styles} from './button';

@customElement('text-button')
export class TextButton extends CommonButton {
  static override styles = [...CommonButton.styles, styles.text];
}

declare global {
  interface HTMLElementTagNameMap {
    'text-button': TextButton;
  }
}
