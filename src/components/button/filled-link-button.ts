import {customElement, property, html, css} from '@alwatr/element';

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
  static override styles = [
    FilledButton.styles,
    css`
      a {
        display: flex;
        color: inherit;
        text-decoration: none;
        gap: var(--sys-spacing-track);
      }
    `,
  ];

  @property({type: String})
    href = '';

  override connectedCallback(): void {
    super.connectedCallback();
  }

  override render(): LitRenderType {
    return html`<a href=${this.href}>${super.render()}</a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'filled-link-button': FilledLinkButton;
  }
}
