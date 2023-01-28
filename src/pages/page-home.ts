import {
  AlwatrDummyElement,
  css,
  html,
  customElement,
  LocalizeMixin as localizeMixin,
} from '@alwatr/element';

import config from '../config';
import {router} from '@alwatr/router';

import '../components/card-box/card-box';
import '../components/icon-button/icon-button';
import '../components/button/filled-link-button';
import '../components/coming-soon/coming-soon';

import type {LitRenderType} from '../types/lit-render';

@customElement('page-home')
export class PageHome extends localizeMixin(AlwatrDummyElement) {
  static override styles = [
    config.styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height: 100%;

        padding: calc(3 * var(--sys-spacing-track));
      }

      card-box {
        width: 100%;
      }

      card-box p {
        text-align: center;
        padding: 0 calc(2 * var(--sys-spacing-track));
      }

      card-box .buttons-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: calc(2 * var(--sys-spacing-track));
        margin: calc(2 * var(--sys-spacing-track));
      }
    `,
  ];

  override render(): LitRenderType {
    return html`
      <card-box
        header-text=${this.l10n.localize('$APP-NAME')}
        header-icon="icon"
        header-icon-url-prefix="/images/"
        have-line
      >
        <coming-soon></coming-soon>

        <div class="buttons-row">
          <filled-link-button
            href=${router.makeUrl({sectionList: ['game']})}
            label=${this.l10n.localize('start')}
            icon="arrow-right-3"
            url-prefix="/iconsax/"
          ></filled-link-button>
          <icon-button
            icon="message-question"
            url-prefix="/iconsax/"
          ></icon-button>
        </div>
      </card-box>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome;
  }
}
