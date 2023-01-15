import {customElement} from 'lit/decorators.js';

import {CommonButton, styles} from './button';

@customElement('elevated-button')
export class ElevatedButton extends CommonButton {
  static override styles = [...CommonButton.styles, styles.elevated];
}

declare global {
  interface HTMLElementTagNameMap {
    'elevated-button': ElevatedButton;
  }
}
