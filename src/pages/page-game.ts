import {
  AlwatrDummyElement,
  css,
  html,
  customElement,
  LocalizeMixin as localizeMixin,
} from '@alwatr/element';

import config from '../config';

import '../components/card-box/card-box';

import type {LitRenderType} from '../types/lit-render';

@customElement('page-game')
export class PageGame extends localizeMixin(AlwatrDummyElement) {
  static override styles = [
    config.styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height: 100%;

        padding: calc(2 * var(--sys-spacing-track));
      }

      card-box {
        width: 100%;
      }

      card-box div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--sys-spacing-track);
        padding: calc(2 * var(--sys-spacing-track));
        color: var(--sys-color-primary);
      }

      card-box div alwatr-icon {
        font-size: calc(12 * var(--sys-spacing-track));
      }

      card-box div span {
        font-family: var(--sys-typescale-title-medium-font-family-name);
        font-weight: var(--sys-typescale-title-medium-font-weight);
        font-size: var(--sys-typescale-title-medium-font-size);
        letter-spacing: var(--sys-typescale-title-medium-letter-spacing);
        line-height: var(--sys-typescale-title-medium-line-height);
      }
    `,
  ];

  override render(): LitRenderType {
    return html`
      <card-box
        header-text="صفحه بازی"
        header-icon="game"
        header-icon-url-prefix="/iconsax/"
        have-line
      >
        <div>
          <alwatr-icon name="danger" url-prefix="/iconsax/"></alwatr-icon>
          <span>به زودی تکمیل خواهد شد</span>
        </div>
      </card-box>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-game': PageGame;
  }
}
