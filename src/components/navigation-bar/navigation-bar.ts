import {AlwatrDummyElement, css, html, customElement} from '@alwatr/element';

import config from '../../config';

import type {LitRenderType} from '../../types/lit-render';

@customElement('navigation-bar')
export class NavigationBar extends AlwatrDummyElement {
  static override styles = [
    config.styles,
    css`
      :host {
        display: flex;
      }
    `,
  ];

  override render(): LitRenderType {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'navigation-bar': NavigationBar;
  }
}
