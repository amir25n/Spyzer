import {
AlwatrDummyElement, customElement, property, html, css, nothing,
} from '@alwatr/element';

import config from '../../config';

import type {LitRenderCallbackType} from '../../type';

@customElement('navigation-drawer-title')
export class NavigationDrawerTitle extends AlwatrDummyElement {
  static override styles = [
    config.styles,
    css`
      :host {
        display: flex;
        width: 100%;
        padding: calc(2 * var(--alwatr-sys-spacing-track)) calc(2 * var(--alwatr-sys-spacing-track))
          calc(3 * var(--alwatr-sys-spacing-track));
      }
      h3 {
        margin: 0;
        font-family: var(--alwatr-sys-typescale-title-small-font-family-name);
        font-weight: var(--alwatr-sys-typescale-title-small-font-weight);
        font-size: var(--alwatr-sys-typescale-title-small-font-size);
        letter-spacing: var(--alwatr-sys-typescale-title-small-letter-spacing);
        line-height: var(--alwatr-sys-typescale-title-small-line-height);
      }
    `,
  ];

  @property() label?: string;

  override render(): LitRenderCallbackType {
    if (this.label != null && this.label.trim() != null) {
      return html`<h3>${this.label}</h3>`;
    }

    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'navigation-drawer-title': NavigationDrawerTitle;
  }
}
