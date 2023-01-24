import {customElement, property, html, css} from '@alwatr/element';

import '@alwatr/icon';

import config from '../../config';
import {Surface} from '../surface/surface';

import type {LitRenderType} from '../../types/lit-render';

/**
 * @element filled-button
 *
 * @prop {String} icon
 * @prop {String} label
 * @prop {String} urlPrefix
 * @prop {Boolean} flipRtl
 *
 * @attr {String} icon
 * @attr {String} label
 * @attr {String} url-prefix
 * @attr {Boolean} flip-rtl
 */
@customElement('filled-button')
export class FilledButton extends Surface {
  static override styles = [
    Surface.styles,
    config.styles,
    css`
      :host {
        --surface-color-on: var(--sys-color-on-primary-hsl);
        --surface-color-bg: var(--sys-color-primary-hsl);

        display: inline-flex;
        user-select: none;
        align-items: center;
        vertical-align: middle;
        flex-grow: 0;
        flex-shrink: 0;
        cursor: pointer;
        min-width: calc(7.5 * var(--sys-spacing-track));
        height: calc(5 * var(--sys-spacing-track));
        border-radius: calc(2.5 * var(--sys-spacing-track));
        padding-inline-start: var(--sys-spacing-track);
        padding-inline-end: calc(2 * var(--sys-spacing-track));
        gap: var(--sys-spacing-track);
        outline: 0;
        overflow: hidden;
        overflow: clip;
        z-index: var(--sys-zindex-default);
        -webkit-tap-highlight-color: transparent;
      }

      alwatr-icon {
        flex-shrink: 0;
        width: calc(3 * var(--sys-spacing-track));
        height: calc(3 * var(--sys-spacing-track));
      }

      span {
        font-family: var(--sys-typescale-label-large-font-family-name);
        font-weight: var(--sys-typescale-label-large-font-weight);
        font-size: var(--sys-typescale-label-large-font-size);
        letter-spacing: var(--sys-typescale-label-large-letter-spacing);
        line-height: var(--sys-typescale-label-large-line-height);
      }
    `,
  ];

  @property({type: String})
    icon = '';

  @property({type: String})
    label = '';

  @property({attribute: 'url-prefix'})
    urlPrefix?: string;

  @property({type: Boolean, attribute: 'flip-rtl'})
    flipRtl = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('stated', '');
    this.setAttribute('elevated', '2');
  }

  override render(): LitRenderType {
    return html`
      <alwatr-icon
        part="icon"
        ?flip-rtl=${this.flipRtl}
        .name=${this.icon}
        .urlPrefix=${this.urlPrefix}
      ></alwatr-icon>
      <span>${this.label}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'filled-button': FilledButton;
  }
}
