import {customElement, property, html, css} from '@alwatr/element';

import '@alwatr/icon';

import config from '../../config';
import {Surface} from '../surface/surface';

import type {LitRenderType} from '../../types/lit-render';

/**
 * @element icon-button
 *
 * @prop {String} icon
 * @prop {String} urlPrefix
 * @prop {Boolean} flipRtl
 *
 * @attr {String} icon
 * @attr {String} url-prefix
 * @attr {Boolean} flip-rtl
 */
@customElement('icon-button')
export class IconButton extends Surface {
  static override styles = [
    Surface.styles,
    config.styles,
    css`
      :host {
        --surface-color-on: var(--sys-color-primary-hsl);
        --surface-color-bg: var(--sys-color-primary-container-hsl);

        display: inline-flex;
        user-select: none;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        flex-grow: 0;
        flex-shrink: 0;
        cursor: pointer;
        width: calc(5 * var(--sys-spacing-track));
        height: calc(5 * var(--sys-spacing-track));
        border-radius: 50%;
        outline: 0;
        overflow: hidden;
        overflow: clip;
        z-index: var(--sys-zindex-default);
        -webkit-tap-highlight-color: transparent;
        box-shadow: none;
        border: 1px solid hsla(var(--sys-color-primary-hsl) / 30%);
      }

      alwatr-icon {
        flex-shrink: 0;
        width: calc(3 * var(--sys-spacing-track));
        height: calc(3 * var(--sys-spacing-track));
      }
    `,
  ];

  @property()
    icon?: string;

  @property({attribute: 'url-prefix'})
    urlPrefix?: string;

  @property({type: Boolean, attribute: 'flip-rtl'})
    flipRtl = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('stated', '');
  }

  override render(): LitRenderType {
    return html`<alwatr-icon
      part="icon"
      ?flip-rtl=${this.flipRtl}
      .name=${this.icon}
      .urlPrefix=${this.urlPrefix}
    ></alwatr-icon>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-button': IconButton;
  }
}
