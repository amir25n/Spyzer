import {
  AlwatrDummyElement,
  customElement,
  property,
  html,
  css,
} from '@alwatr/element';

import '@alwatr/icon';

import config from '../../config';

import type {LitRenderType} from '../../types/lit-render';

@customElement('navigation-tab')
export class NavigationTab extends AlwatrDummyElement {
  static override styles = [
    config.styles,
    css`
      :host {
        --comp-color-bg: var(--sys-color-on-surface);

        display: flex;
        flex-direction: column;
        transition-property: padding-bottom;
      }

      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: calc(10 * var(--sys-spacing-track));
      }

      alwatr-icon {
        transition-property: color;
        color: var(--comp-color-bg);
        font-size: calc(3.3 * var(--sys-spacing-track));
      }

      :host,
      :host alwatr-icon {
        transition-duration: var(--sys-motion-duration-large);
        transition-timing-function: var(--sys-motion-easing-in-out);
      }
    `,
    css`
      :host([active]) {
        --comp-color-bg: var(--sys-color-primary);

        padding-bottom: calc(1.5 * var(--sys-spacing-track));
      }
    `,
  ];

  @property({type: String})
    icon = '';

  @property({type: String})
    href = '';

  @property({type: Boolean, reflect: true})
    active = false;

  override render(): LitRenderType {
    return html`<a href=${this.href}>
      <alwatr-icon name=${this.icon} url-prefix="/iconsax/"></alwatr-icon>
    </a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'navigation-tab': NavigationTab;
  }
}
