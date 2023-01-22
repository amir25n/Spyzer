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
export class NavigationBar extends AlwatrDummyElement {
  static override styles = [
    config.styles,
    css`
      :host {
        --_color-bg: var(--sys-color-on-surface);

        display: flex;
        flex-direction: column;
      }

      :host([active]) {
        --_color-bg: var(--sys-color-primary);
      }

      :host([active]) a::after {
        opacity: 1;
        width: calc(4 * var(--sys-spacing-track));
        margin-top: var(--sys-spacing-track);
        margin-bottom: 0;
      }

      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: calc(10 * var(--sys-spacing-track));
      }

      a::after {
        content: '';

        border-radius: calc(0.2 * var(--sys-spacing-track));
        background-color: var(--sys-color-primary);
        width: 0;
        height: calc(0.4 * var(--sys-spacing-track));
        margin-top: calc(20% - 0.4 * var(--sys-spacing-track));
        margin-bottom: -20%;
        opacity: 0.25;

        will-change: opacity, margin-top, margin-bottom, width;
        transition-property: opacity, margin-top, margin-bottom, width;
      }

      alwatr-icon {
        transition-property: color;
        color: var(--_color-bg);
        font-size: calc(3.3 * var(--sys-spacing-track));
      }

      :host a::after,
      :host alwatr-icon {
        transition-duration: var(--sys-motion-duration-small-out);
        transition-timing-function: var(--sys-motion-easing-exiting);
      }

      :host([active]) a::after,
      :host([active]) alwatr-icon {
        transition-delay: var(--sys-motion-duration-small);
        transition-duration: var(--sys-motion-duration-small);
        transition-timing-function: var(--sys-motion-easing-incoming);
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
    'navigation-tab': NavigationBar;
  }
}
