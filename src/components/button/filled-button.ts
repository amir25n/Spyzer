import {customElement, css} from '@alwatr/element';

import '@alwatr/icon';

import {Button} from './button';

/**
 * @element filled-button
 *
 * @extends Button
 */
@customElement('filled-button')
export class FilledButton extends Button {
  static override styles = [
    Button.styles,
    css`
      :host {
        --surface-color-on: var(--sys-color-on-primary-hsl);
        --surface-color-bg: var(--sys-color-primary-hsl);
      }
    `,
  ];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('elevated', '');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'filled-button': FilledButton;
  }
}
