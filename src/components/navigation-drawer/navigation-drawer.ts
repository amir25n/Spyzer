import {
AlwatrDummyElement, customElement, html, css,
} from '@alwatr/element';

import config from '../../config';

import './navigation-drawer-item';
import './navigation-drawer-title';
import './navigation-drawer-divider';

import type {LitRenderCallbackType} from '../../type';

@customElement('navigation-drawer')
export class NavigationDrawer extends AlwatrDummyElement {
  static override styles = [
    config.styles,
    css`
      :host {
        display: flex;

        position: fixed;
        inset: 0;
        z-index: var(--alwatr-sys-zindex-topness);

        width: 100%;
        height: 100%;
      }
      .navigation-drawer {
        display: flex;
        flex-direction: column;
        overflow-y: auto;

        border-radius: 0 calc(2 * var(--alwatr-sys-spacing-track)) calc(2 * var(--alwatr-sys-spacing-track)) 0;
        background-color: var(--alwatr-sys-color-surface);
        padding: calc(1.5 * var(--alwatr-sys-spacing-track));

        max-width: 80vw;
        width: calc(45 * var(--alwatr-sys-spacing-track));
        height: 100%;

        box-shadow: 0 0 0 100vw #0005;
      }
    `,
  ];

  override render(): LitRenderCallbackType {
    return html`<div class="navigation-drawer"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'navigation-drawer': NavigationDrawer;
  }
}
