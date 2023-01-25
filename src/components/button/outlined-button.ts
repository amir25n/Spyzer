import {customElement, css} from '@alwatr/element';

import '@alwatr/icon';

import {Button} from './button';

/**
 * @element outlined-button
 *
 * @extends Button
 */
@customElement('outlined-button')
export class OutlinedButton extends Button {
  static override styles = [
    Button.styles,
    css`
      :host {
        --surface-color-on: var(--sys-color-primary-hsl);
        --surface-color-bg: var(--sys-color-primary-container-hsl);

        transition-property: box-shadow, border-color;
        transition-duration: var(--sys-motion-duration-small);
        transition-timing-function: var(--sys-motion-easing-linear);
      }
    `,
  ];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('outlined', '');
    this.setAttribute('active-outline', '');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'outlined-button': OutlinedButton;
  }
}
