import {
  AlwatrDummyElement,
  html,
  css,
  LocalizeMixin as localizeMixin,
  customElement,
} from '@alwatr/element';

import '@alwatr/icon';

import config from '../../config';
import {Surface} from '../surface/surface';

import type {LitRenderType} from '../../types/lit-render';

@customElement('coming-soon')
export class ComingSoon extends localizeMixin(Surface) {
  static override styles = [
    config.styles,
    Surface.styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: calc(2 * var(--sys-spacing-track));
        padding: calc(2.5 * var(--sys-spacing-track));
        gap: var(--sys-spacing-track);
        opacity: 75%;

        border: calc(0.4 * var(--sys-spacing-track)) solid
          var(--sys-color-on-primary-container) !important;
        color: var(--sys-color-on-primary-container);
        background-color: var(--sys-color-primary-container);
      }

      alwatr-icon {
        font-size: calc(10 * var(--sys-spacing-track));
      }

      span {
        font-family: var(--sys-typescale-title-medium-font-family-name);
        font-weight: var(--sys-typescale-title-medium-font-weight);
        font-size: var(--sys-typescale-title-medium-font-size);
        letter-spacing: var(--sys-typescale-title-medium-letter-spacing);
        line-height: var(--sys-typescale-title-medium-line-height);
      }
    `,
  ];

  override connectedCallback(): void {
    super.connectedCallback();

    this.setAttribute('outlined', '');
  }

  override render(): LitRenderType {
    super.render();

    return html`
      <alwatr-icon name="warning-2" url-prefix="/iconsax/"></alwatr-icon>
      <span>${this.l10n.localize('coming-soon')}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'coming-soon': ComingSoon;
  }
}
