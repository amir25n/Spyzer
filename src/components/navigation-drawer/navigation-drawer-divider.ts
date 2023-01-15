import {
AlwatrDummyElement, customElement, css, nothing,
} from '@alwatr/element';

import config from '../../config';

import type {LitRenderCallbackType} from '../../type';

@customElement('navigation-drawer-divider')
export class NavigationDrawerDivider extends AlwatrDummyElement {
  static override styles = [
    config.styles,
    css`
      :host {
        display: flex;
        height: 1px;
        margin: 0 calc(2 * var(--alwatr-sys-spacing-track)) 0;
        background-color: var(--alwatr-sys-color-outline-variant);
      }
    `,
  ];

  override render(): LitRenderCallbackType {
    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'navigation-drawer-divider': NavigationDrawerDivider;
  }
}
