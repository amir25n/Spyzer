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

        padding: calc(2 * var(--sys-spacing-track));
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
        <p>
          پیر مردی هر روز تو محله می دید پسر کی با کفش های پاره و پای برهنه با
          توپ پلاستیکی فوتبال بازی می کند،
        </p>
        <p>
          روزی رفت ی کتانی نو خرید و اومد و به پسرک گفت بیا این کفشا رو بپوش…
        </p>
        <p>
          پسرک کفشا رو پوشید و خوشحال رو به پیر مرد کرد و گفت: شما خدایید؟! پیر
          مرد لبش را گزید و گفت نه!
        </p>
        <p>پسرک گفت پس دوست خدایی، چون من دیشب فقط به خدا گفتم كه کفش ندارم…</p>

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
