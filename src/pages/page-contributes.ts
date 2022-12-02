import {AlwatrElement as AppElement} from '@alwatr/element';
import {fetch} from '@alwatr/fetch';
import {toastController} from '@ionic/core';
import {html, css, nothing} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {when} from 'lit/directives/when.js';

import config from '../config';
import ionicNormalize from '../styles/ionic.normalize';
import ionicTheming from '../styles/ionic.theming';
import normalize from '../styles/normalize';

import type {Contribute} from '../types/contribute';
import type {TemplateResult} from 'lit';

@customElement('page-contributes')
export class PageContributes extends AppElement {
  static override styles = [
    normalize,
    ionicNormalize,
    ionicTheming,
    css`
      ion-card.contribute {
        overflow: visible;
        margin: 4em 1em;
      }
      ion-card.contribute > ion-card-content > p {
        font-weight: 400;
        font-size: 0.9em;
        margin-bottom: 0.2em;
      }
      ion-card.contribute > ion-avatar {
        margin: -3em auto 1em;
        width: 8em;
        height: 8em;
        box-shadow: 0 0.8em 1.1em -0.4em var(--ion-color-step-300);
      }
      ion-card.contribute > .contribute__name {
        text-align: center;
        font-size: 1.2em;
        color: var(--ion-color-step-500);
        margin: 0.4em 0;
        font-weight: 400;
      }
      ion-card.contribute > .contribute__job {
        text-align: center;
        font-size: 1em;
        color: var(--ion-color-step-450);
        margin: 0.2em 0;
        font-weight: 300;
      }
      ion-card.contribute > .contribute__donate-button {
        margin: 0.2em 1em 1em;
      }
    `,
  ];

  @state() private __contributes: Contribute[] = [];

  @state() private __loading = true;

  override connectedCallback(): void {
    super.connectedCallback();

    fetch({
      url: '/data/contributes.json',
      retry: 5,
      retryDelay: 1_000,
      revalidateCallback: async (response) => {
        await this.__responseToContribute(response);
        this.__loading = false;
      },
      cacheStorageName: 'spy_game_storage',
      cacheStrategy: 'stale_while_revalidate',
    }).then((response) => {
      return this.__responseToContribute(response);
    });
  }

  override render(): TemplateResult {
    return html`
      <ion-header>
        <ion-toolbar>
          ${when(this.__loading, () => {
            return html`
              <ion-buttons slot="end">
                <ion-button>
                  <ion-spinner></ion-spinner>
                </ion-button>
              </ion-buttons>
            `;
          })}

          <ion-title>${config.titleFormat('توسعه دهندگان')}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen> ${this.__renderContributes(this.__contributes)} </ion-content>
    `;
  }

  private __renderContributes(contributes: Contribute[]): TemplateResult | typeof nothing {
    if (contributes.length === 0) return nothing;
    if (contributes.length === 1) return this.__renderContribute(contributes[0]);

    const slidesOptions = {
      initialSlide: 0,
      autoplay: {
        delay: 2500,
      },
    };
    const contributesTemplate = contributes.map((contribute) => {
      return html` <ion-slide> ${this.__renderContribute(contribute)} </ion-slide> `;
    });

    return html` <ion-slides .options=${slidesOptions} style="width:100vw;"> ${contributesTemplate} </ion-slides> `;
  }

  private __renderContribute(contribute: Contribute): TemplateResult {
    const descriptionTemplate = contribute.description['fa-IR']
      .trim()
      .split('\n')
      .map((paragraph) => {
        return html`<p>${paragraph}</p>`;
      });

    return html`
      <ion-card class="contribute">
        <ion-avatar>
          <img src=${contribute.image} alt=${contribute.name['en-US']} />
        </ion-avatar>
        <h2 class="contribute__name">${contribute.name['fa-IR']}</h2>
        <h3 class="contribute__job">${contribute.job['fa-IR']}</h3>

        <ion-card-content> ${descriptionTemplate} </ion-card-content>

        ${when(contribute.donate, () => {
          return html`
            <ion-button
              .href=${contribute.donate}
              target="_blank"
              expand="block"
              color="tertiary"
              class="contribute__donate-button"
            >
              <alwatr-icon name="cafe-outline" slot="start"></alwatr-icon>
              <ion-label>دوست داری برام یه قهوه بخری !؟</ion-label>
            </ion-button>
          `;
        })}
      </ion-card>
    `;
  }

  private async __responseToContribute(response: Response): Promise<void> {
    try {
      const contribute = (await response.json()) as Contribute[];

      this._logger.logProperty('__contributes', contribute);
      this.__contributes = contribute;
    } catch {
      toastController
        .create({
          duration: 3_000,
          position: 'bottom',
          message: 'دریافت توسعه دهندگان با خطا رو به رو شد',
        })
        .then((toast) => {
          return toast.present();
        });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-contributes': PageContributes;
  }
}
