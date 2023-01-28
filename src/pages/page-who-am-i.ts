import {
  AlwatrDummyElement,
  css,
  customElement,
  html,
  LocalizeMixin as localizeMixin,
} from '@alwatr/element';

import config from '../config';

import '../components/card-box/card-box';
import '../components/button/outlined-button';
import '../components/coming-soon/coming-soon';

import type {LitRenderType} from '../types/lit-render';

@customElement('page-who-am-i')
export class PageWhoAmI extends localizeMixin(AlwatrDummyElement) {
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
        margin: calc(30 * var(--sys-spacing-track)) 0;
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
        header-text="من کی ام ؟"
        header-icon="lamp-on"
        header-icon-url-prefix="/iconsax/"
        have-line
      >
        <coming-soon></coming-soon>
        <div class="buttons-row">
          <outlined-button
            label=${this.l10n.localize('message-to-me')}
            icon="sms-tracking"
            url-prefix="/iconsax/"
          ></outlined-button>
          <outlined-button
            label=${this.l10n.localize('add-word')}
            icon="add"
            url-prefix="/iconsax/"
          ></outlined-button>
        </div>
      </card-box>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-who-am-i': PageWhoAmI;
  }
}
