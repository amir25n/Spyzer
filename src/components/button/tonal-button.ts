import {customElement} from 'lit/decorators.js';

import {CommonButton, styles} from './button';

@customElement('tonal-button')
export class TonalButton extends CommonButton {
  static override styles = [...CommonButton.styles, styles.tonal];
}

declare global {
  interface HTMLElementTagNameMap {
    'tonal-button': TonalButton;
  }
}
