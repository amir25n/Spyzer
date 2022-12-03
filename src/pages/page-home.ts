import {AlwatrElement as AppElement} from '@alwatr/element';
import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

import config from '../config';
import router from '../router';
import ionicNormalize from '../styles/ionic.normalize';
import ionicTheming from '../styles/ionic.theming';
import normalize from '../styles/normalize';

import type {TemplateResult} from 'lit';

@customElement('page-home')
export class PageHome extends AppElement {
  static override styles = [
    normalize,
    ionicNormalize,
    ionicTheming,
    css`
      ion-card.readme ion-card-content h1,
      ion-card.readme ion-card-content p {
        margin-bottom: 0.8em;
      }
      ion-card.readme ion-card-content .readme__made-with {
        text-align: center;
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <ion-header>
        <ion-toolbar>
          <ion-title>${config.titleFormat('خانه')}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen>
        <ion-card class="readme">
          <ion-card-content>
            <h1>سلام رفیق 👋</h1>

            <p>
              وقتی ثروت‌ های بزرگ به دست برخی مردم می‌افتد در پرتو آن نیرومند می‌شوند و در سایهٔ نیرومندی و ثروت خیال
              می‌ کنند که می‌توانند در خارج از وطن خود زندگی نمایند و خوشبخت و سرافراز باشند ولی به زودی می‌ فهمند که
              اشتباه کرده‌ اند و عظمت هر ملتی بر روی خرابه‌ های وطن خودش می‌باشد و بس!
            </p>
            <p>
              هر نفسی که فرو می‌ بریم، مرگی را که مدام به ما دست‌ اندازی می‌کند پس می‌زند... در نهایت این مرگ است که
              باید پیروز شود، زیرا از هنگام تولد بخشی از سرنوشت ما شده و فقط مدت کوتاهی پیش از بلعیدن طعمه اش، با آن
              بازی می کند. با این همه، ما تا آنجا که ممکن است، با علاقه فراوان و دلواپسی زیاد به زندگی ادامه می دهیم،
              همان‌ طور که تا آنجا که ممکن است طولانی‌ تر در یک حباب صابون می‌ دمیم تا بزرگتر شود، گر چه با قطعیتی تمام
              می‌ دانیم که خواهد ترکید.
            </p>
            <p class="readme__made-with">ساخته شده با ❤️</p>

            <ion-button
              href=${router.urlForName('game-settings')}
              color="secondary"
              class="readme__start-button"
              expand="block"
            >
              <ion-label>شروع بازی</ion-label>
            </ion-button>
          </ion-card-content>
        </ion-card>
      </ion-content>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome;
  }
}
