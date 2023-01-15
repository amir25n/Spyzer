import {customElement} from 'lit/decorators.js';

import {CommonButton, styles} from './button';

@customElement('filled-button')
export class FilledButton extends CommonButton {
  static override styles = [...CommonButton.styles, styles.filled];
}

declare global {
  interface HTMLElementTagNameMap {
    'filled-button': FilledButton;
  }
}
