import {customElement, property, html} from '@alwatr/element';

import {FilledButton} from './filled-button';

import '@alwatr/icon';

import type {LitRenderType} from '../../types/lit-render';

/**
 * @element filled-link-button
 *
 * @extends FilledButton
 */
@customElement('filled-link-button')
export class FilledLinkButton extends FilledButton {
  @property({type: String})
    href = '';

  override render(): LitRenderType {
    return html`<a href=${this.href}>${super.render()}</a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'filled-link-button': FilledLinkButton;
  }
}
