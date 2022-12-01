import {AlwatrElement as AppElement} from '@alwatr/element';
import {fetch} from '@alwatr/fetch';
import {random} from '@alwatr/math';
import {router} from '@alwatr/router';
import {SignalInterface} from '@alwatr/signal';
import {toastController} from '@ionic/core';
import {html, css, nothing} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {when} from 'lit/directives/when.js';

import ionicNormalize from '../styles/ionic.normalize';
import ionicTheming from '../styles/ionic.theming';
import normalize from '../styles/normalize';
import GameSettingsStorage from '../utilities/game-settings-storage';

import '../components/t-imer';

import type {TemplateResult} from 'lit';

@customElement('page-game')
export class PageGame extends AppElement {
  static override styles = [
    normalize,
    ionicNormalize,
    ionicTheming,
    css`
      ion-text.card__content {
        text-align: center;
      }
      ion-text.card__content * {
        margin-bottom: 1.9em !important;
      }
      ion-text.card__content.active-word * {
        margin-bottom: 1em !important;
      }
      t-imer {
        font-size: 24px;
      }
    `,
  ];

  @state() private __stages: (TemplateResult | null)[] = [];

  @state() private __stage = 0;

  @state() private __loading = true;

  static __showAppBarSignal = new SignalInterface('show-app-bar');

  private __storage = new GameSettingsStorage();

  private __words: string[] = [];

  private __spyWord = 'شما جاسوس هستید';

  override connectedCallback(): void {
    super.connectedCallback();

    fetch({
      url: '/data/words.json',
      retry: 5,
      retryDelay: 1_000,
      revalidateCallback: async (response) => {
        await this.__responseToWord(response);
        this.__loading = false;
      },
      cacheStorageName: 'spy_game_storage',
      cacheStrategy: 'stale_while_revalidate',
    }).then(async (response) => {
      await this.__responseToWord(response);

      this.__generateNewWord();
      this.__generateStages();
      PageGame.__showAppBarSignal.dispatch(false);
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    PageGame.__showAppBarSignal.dispatch(true);
  }

  override render(): TemplateResult {
    return html`
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click=${this.__back}>
              <alwatr-icon dir="rtl" slot="icon-only" name="arrow-back-outline" flip-rtl></alwatr-icon>
            </ion-button>
          </ion-buttons>
          ${when(this.__loading, () => {
            return html`
              <ion-buttons slot="end">
                <ion-button>
                  <ion-spinner></ion-spinner>
                </ion-button>
              </ion-buttons>
            `;
          })}

          <ion-title>شکارچیان جاسوس</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen> ${this.__renderActiveStage()} </ion-content>
    `;
  }

  private __renderActiveStage(): TemplateResult | typeof nothing {
    const stage = this.__stages[this.__stage];

    if (stage == null) return nothing;

    return html`
      <ion-card>
        <ion-card-content> ${stage} </ion-card-content>
      </ion-card>
    `;
  }

  private __renderTimeStage(duration: number): TemplateResult<1> {
    return html`
      <ion-text class="card__content">
        <h2>
          <t-imer .duration=${duration}></t-imer>
        </h2>
      </ion-text>

      <ion-button expand="block" color="tertiary" @click=${this.__back}> بازگشت </ion-button>
    `;
  }

  private __renderPrivateStage(word: string | null): TemplateResult | null {
    if (word == null) return null;

    const isSpy = word === this.__spyWord;

    return html`
      ${when(
        isSpy,
        () => {
          return html`
            <ion-text color="secondary" class="card__content word spy">
              <h2>${this.__spyWord}</h2>
            </ion-text>
          `;
        },
        () => {
          return html`
            <ion-text class="card__content word active-word">
              <h1>${word}</h1>
            </ion-text>
          `;
        },
      )}

      <ion-button expand="block" color="success" @click=${this.__nextStage}> پنهان کردن </ion-button>
    `;
  }

  private __renderPublicStage(): TemplateResult<1> {
    return html`
      <ion-text class="card__content">
        <h2>دستگاه را به نفر بعدی بدهید.</h2>
      </ion-text>

      <ion-button expand="block" color="danger" @click=${this.__nextStage}> نمایش دادن </ion-button>
    `;
  }

  private __renderStartStage(): TemplateResult<1> {
    return html`
      <ion-text class="card__content">
        <h2>برای شروع بازی ضربه بزنید.</h2>
      </ion-text>

      <ion-button expand="block" color="secondary" @click=${this.__nextStage}> نمایش دادن </ion-button>
    `;
  }

  private async __responseToWord(response: Response): Promise<void> {
    try {
      const words = (await response.json()) as string[];

      this._logger.logProperty('__words', words);
      this.__words = words;
    } catch {
      toastController
        .create({
          duration: 3_000,
          position: 'bottom',
          message: 'دریافت کلمات با خطا رو به رو شد',
        })
        .then((toast) => {
          return toast.present();
        });
    }
  }

  private __nextStage(event: PointerEvent): number {
    event.preventDefault();

    this.__vibrate(2);

    this.__stage += 1;

    return this.__stage;
  }

  private __back(event: PointerEvent): void {
    event.preventDefault();

    this.__vibrate(4);

    router.signal.request({
      pathname: router.makeUrl({sectionList: ['game']}),
    });
  }

  private __generateStages(): void {
    const playerStage = Array.from(Array(this.__storage.players - this.__storage.spies).keys()).map(() => {
      return this.__storage.word;
    });
    const spyStage = Array.from(Array(this.__storage.spies).keys()).map(() => {
      return this.__spyWord;
    });

    const privateStages = random.shuffle([...playerStage, ...spyStage]);
    const stagesTemplate = privateStages.map((word, __index, __privateStages) => {
      if (__index === 0) {
        return [this.__renderStartStage(), this.__renderPrivateStage(word)];
      }
      if (__index === __privateStages.length - 1) {
        return [
          this.__renderPublicStage(),
          this.__renderPrivateStage(word),
          this.__renderTimeStage(this.__storage.time * 60),
        ];
      }
      return [this.__renderPublicStage(), this.__renderPrivateStage(word)];
    });

    this.__stages = stagesTemplate.flat();
    this.__stage = 0;
  }

  private __generateNewWord(): string {
    const newWord = this.__words[random.integer(0, this.__words.length)];

    this._logger.logMethodArgs('__generateNewWord', {
      new_word: newWord,
      pervious_word: this.__storage.word,
    });

    if (newWord === this.__storage.word || !newWord) {
      return this.__generateNewWord();
    }

    this.__storage.word = newWord;

    return newWord;
  }

  private __vibrate(level = 1): void {
    navigator.vibrate(level * 50);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-game': PageGame;
  }
}
