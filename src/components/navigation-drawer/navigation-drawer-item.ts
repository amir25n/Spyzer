import {
AlwatrDummyElement, customElement, property, nothing, html, css,
} from '@alwatr/element';

import '@alwatr/icon';

import config from '../../config';

import type {LitRenderCallbackType} from '../../type';

@customElement('navigation-drawer-item')
export class NavigationDrawerItem extends AlwatrDummyElement {
  static override styles = [
    config.styles,
    css`
      :host {
        display: flex;
        width: 100%;
      }
      .navigation-drawer-item {
        display: flex;
        align-items: center;
        position: relative;
        padding: calc(2 * var(--alwatr-sys-spacing-track));

        user-select: none;
        cursor: pointer;
        text-decoration: none;
        color: var(--alwatr-sys-color-on-surface-variant);
        background-color: var(--alwatr-sys-color-surface);
        border-radius: calc(3.5 * var(--alwatr-sys-spacing-track));

        transition-property: color, background-color;

        height: calc(7 * var(--alwatr-sys-spacing-track));
        width: 100%;
      }
      .navigation-drawer-item .icon {
        color: inherit;
        font-size: calc(3 * var(--alwatr-sys-spacing-track));
        padding: calc(2 * var(--alwatr-sys-spacing-track));
        padding-inline-start: 0;
        padding-inline-end: calc(1.5 * var(--alwatr-sys-spacing-track));

        transition-property: opacity;
      }
      .navigation-drawer-item .inactive-icon {
        position: absolute;
        top: 0;
        bottom: 0;
      }
      .navigation-drawer-item .label {
        color: inherit;
        flex-grow: 1;
      }
      .navigation-drawer-item .badge {
        padding-inline-start: calc(1.5 * var(--alwatr-sys-spacing-track));
        padding-inline-end: var(--alwatr-sys-spacing-track);
      }
      .navigation-drawer-item .label,
      .navigation-drawer-item .badge {
        font-family: var(--alwatr-sys-typescale-label-large-font-family-name);
        font-weight: var(--alwatr-sys-typescale-label-large-font-weight);
        font-size: var(--alwatr-sys-typescale-label-large-font-size);
        letter-spacing: var(--alwatr-sys-typescale-label-large-letter-spacing);
        line-height: var(--alwatr-sys-typescale-label-large-line-height);
      }
    `,
    css`
      :host([active]) .navigation-drawer-item {
        color: var(--alwatr-sys-color-on-secondary-container);
        background-color: var(--alwatr-sys-color-secondary-container);
      }
      :host([active]) .navigation-drawer-item .inactive-icon,
      :host(:not([active])) .navigation-drawer-item .active-icon {
        opacity: 0;
      }
    `,
    css`
      /* incoming transition */
      :host([active]) .navigation-drawer-item,
      .navigation-drawer-item .icon {
        transition-duration: var(--alwatr-sys-motion-duration-small-in);
        transition-timing-function: var(--alwatr-sys-motion-easing-incoming);
      }

      /* exiting transition */
      .navigation-drawer-item,
      :host([active]) .navigation-drawer-item .inactive-icon,
      :host(:not([active])) .navigation-drawer-item .active-icon {
        transition-duration: var(--alwatr-sys-motion-duration-small-out);
        transition-timing-function: var(--alwatr-sys-motion-easing-exiting);
      }
    `,
  ];

  @property() href?: string;

  @property() label?: string;

  @property() icon?: string;

  @property({attribute: 'badge-value'}) badgeValue?: string;

  @property({type: Boolean, reflect: true}) active = false;

  override render(): LitRenderCallbackType {
    return this.__renderLink(this.__renderIcon(), this.__renderLabel(), this.__renderBadge());
  }

  private __renderIcon(): LitRenderCallbackType {
    if (this.icon != null && this.icon.trim() != null) {
      return [
        html`<alwatr-icon class="icon active-icon" name=${this.icon}></alwatr-icon>`,
        html`<alwatr-icon class="icon inactive-icon" name="${this.icon}-outline"></alwatr-icon>`,
      ];
    }
    return nothing;
  }

  private __renderLabel(): LitRenderCallbackType {
    if (this.label != null && this.label.trim() != null) {
      return html`<span class="label">${this.label}</span>`;
    }
    return nothing;
  }

  private __renderBadge(): LitRenderCallbackType {
    if (this.badgeValue != null && this.badgeValue.trim() != null) {
      return html`<span class="badge">${this.badgeValue}</span>`;
    }
    return nothing;
  }

  private __renderLink(...slots: LitRenderCallbackType[]): LitRenderCallbackType {
    if (this.href != null && this.href.trim() != null) {
      return html`<a class="navigation-drawer-item navigation-drawer-item__link" href=${this.href}>${slots}</a>`;
    }
    return html`<div class="navigation-drawer-item">${slots}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'navigation-drawer-item': NavigationDrawerItem;
  }
}
