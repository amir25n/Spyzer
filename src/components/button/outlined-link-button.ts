import {customElement, property, html, css} from '@alwatr/element';

import {OutlinedButton} from './outlined-button';

import '@alwatr/icon';

import type {LitRenderType} from '../../types/lit-render';

/**
 * @element outlined-link-button
 *
 * @extends FilledButton
 */
@customElement('outlined-link-button')
export class FilledLinkButton extends OutlinedButton {
  @property({type: String})
    href = '';

  override render(): LitRenderType {
    return html`<a href=${this.href}>${super.render()}</a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'outlined-link-button': FilledLinkButton;
  }
}
