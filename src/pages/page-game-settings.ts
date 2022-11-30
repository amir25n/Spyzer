import {AlwatrElement as AppElement} from '@alwatr/element';
import {router} from '@alwatr/router';
import {RangeCustomEvent} from '@ionic/core';
import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

import ionicNormalize from '../styles/ionic.normalize';
import ionicTheming from '../styles/ionic.theming';
import normalize from '../styles/normalize';
import GameSettingsStorage from '../utilities/game-settings-storage';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-game-settings': PageGameSettings;
  }
}

interface RangeRendererParameters {
  title: string;
  name: 'players' | 'spies' | 'time';
  icon: string;
  min: () => number;
  max: () => number;
  value: () => number;
  callback: (event: RangeCustomEvent) => unknown;
  step: number;
}

@customElement('page-game-settings')
export class PageGameSettings extends AppElement {
  static override styles = [
    normalize,
    ionicNormalize,
    ionicTheming,
    css`
      ion-card.settings ion-item.settings__label {
        --min-height: 1em;
        margin-top: 0.4em;
      }
      ion-card.settings ion-list {
        padding: 0.4em 0 0 0;
      }
      ion-card.settings ion-button {
        margin: 1em;
        transition: opacity 300ms ease;
      }
      ion-card.settings ion-button::part(native) {
        transition: background-color 300ms ease;
      }
    `,
  ];

  private __storage = new GameSettingsStorage();
  private __settingsRadioList: RangeRendererParameters[] = [
    {
      title: 'تعداد بازیکنان',
      name: 'players',
      icon: 'people-outline',
      min: (): number => 3,
      max: (): number => 25,
      value: (): number => this.__storage.players,
      callback: this.__settingsChangeCallbackGenerator('players'),
      step: 1,
    },
    {
      title: 'تعداد جاسوس ها',
      name: 'spies',
      icon: 'skull-outline',
      min: (): number => 1,
      max: (): number => this.__storage.players,
      value: (): number => this.__storage.spies,
      callback: this.__settingsChangeCallbackGenerator('spies'),
      step: 1,
    },
    {
      title: 'مدت زمان',
      name: 'time',
      icon: 'time-outline',
      min: (): number => 5,
      max: (): number => 45,
      value: (): number => this.__storage.time,
      callback: this.__settingsChangeCallbackGenerator('time'),
      step: 5,
    },
  ];

  override render(): TemplateResult {
    return html`
      <ion-header>
        <ion-toolbar>
          <ion-title>تنظیمات بازی</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen> ${this.__renderSettingsCard()} </ion-content>
    `;
  }

  private __renderSettingsCard(): TemplateResult {
    const settingsTemplate = this.__settingsRadioList.map((rangeOptions) =>
      this.__renderSettingItemTemplate(rangeOptions),
    );

    return html`
      <ion-card class="settings">
        <ion-list> ${settingsTemplate} </ion-list>
        ${this.__renderSettingsButton()}
      </ion-card>
    `;
  }
  private __renderSettingItemTemplate(range: RangeRendererParameters): TemplateResult {
    return html`
      <ion-item class="settings__label" lines="none">
        <alwatr-icon .name=${range.icon} slot="start"></alwatr-icon>
        <ion-label>${range.title}: ${range.value().toLocaleString('fa-IR')}</ion-label>
      </ion-item>
      <ion-item>
        <ion-range
          .name=${range.name}
          .value=${range.value()}
          .min=${range.min()}
          .max="${range.max()}"
          .step=${range.step}
          color="primary"
          debounce="30"
          @ionChange=${range.callback}
        >
          <ion-label slot="start">${range.min().toLocaleString('fa-IR')}</ion-label>
          <ion-label slot="end">${range.max().toLocaleString('fa-IR')}</ion-label>
        </ion-range>
      </ion-item>
    `;
  }
  private __renderSettingsButton(): TemplateResult {
    const color = Math.ceil(this.__storage.players / 3) > this.__storage.spies ? 'primary' : 'danger';
    const disabled = this.__storage.players / 2 >= this.__storage.spies ? false : true;

    return html`
      <ion-button expand="block" .color=${color} ?disabled=${disabled} @click=${this.__startGame}>
        نمایش کلمات
      </ion-button>
    `;
  }

  private __startGame(event: PointerEvent): void {
    event.preventDefault();

    router.signal.request({
      pathname: router.makeUrl({
        sectionList: ['game', 'words'],
      }),
    });
  }
  private __settingsChange(name: 'players' | 'spies' | 'time', value: number): void {
    this.__storage[name] = value;
    this.requestUpdate();
  }
  private __settingsChangeCallbackGenerator(name: 'players' | 'spies' | 'time'): (event: RangeCustomEvent) => void {
    return (event: RangeCustomEvent) => {
      const value = event.detail.value;
      if (typeof value === 'number') {
        this.__settingsChange(name, value);
      }
    };
  }
}
