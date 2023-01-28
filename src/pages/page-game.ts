import {
  AlwatrDummyElement,
  css,
  html,
  customElement,
  LocalizeMixin as localizeMixin,
  state,
} from '@alwatr/element';
import {random} from '@alwatr/math';

import '@alwatr/icon';

import config from '../config';
import storage from '../utilities/game-settings-storage';
import {l10n} from '@alwatr/i18n';

import '../components/card-box/card-box';
import '../components/icon-button/icon-button';
import '../components/button/outlined-button';
import '../components/game-scene/game-scene';

import type {LitRenderType} from '../types/lit-render';
import type {
  Scene,
  SpyScene,
  StartScene,
  TimerScene,
  WordScene,
} from '../types/scenes';

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

        padding: calc(3 * var(--sys-spacing-track));
      }

      card-box {
        width: 100%;
      }

      card-box .buttons-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: calc(2 * var(--sys-spacing-track));
        margin: calc(2 * var(--sys-spacing-track)) 0 var(--sys-spacing-track);
      }

      card-box .box {
        display: flex;
        flex-direction: column;
        padding: var(--sys-spacing-track) calc(2 * var(--sys-spacing-track));
        gap: var(--sys-spacing-track);
      }

      card-box .box .row {
        display: flex;
        align-items: center;
        gap: var(--sys-spacing-track);
        width: 100%;
        color: var(--sys-color-on-primary-container);
      }

      card-box .box .row .title {
        flex-grow: 1;
      }

      card-box .box .row .title .value {
        font-weight: 900;
      }
    `,
  ];

  @state()
  private scenes: Scene[] = [];

  @state()
  private scenesInx = -1;

  override render(): LitRenderType {
    if (this.scenes.length > 0 && this.scenesInx >= 0) {
      const activeScene = this.scenes[this.scenesInx];

      if (activeScene != null) {
        return this.renderScene(activeScene);
      }
    }

    const settingsTemplate = [
      PageGame.renderSettingItem(
          'people',
          this.l10n.localize('number-of-players'),
          this.l10n.localize('$PLAYER-UNIT'),
          storage.players,
          this.settingsChangeEvent('players', 'add'),
          this.settingsChangeEvent('players', 'minus'),
      ),
      PageGame.renderSettingItem(
          'warning-2',
          this.l10n.localize('number-of-spies'),
          this.l10n.localize('$SPIES-UNIT'),
          storage.spies,
          this.settingsChangeEvent('spies', 'add'),
          this.settingsChangeEvent('spies', 'minus'),
      ),
      PageGame.renderSettingItem(
          'timer',
          this.l10n.localize('duration'),
          this.l10n.localize('$DURATION-UNIT'),
          storage.time,
          this.settingsChangeEvent('time', 'add', 5),
          this.settingsChangeEvent('time', 'minus', 5),
      ),
    ];

    return html`
      <card-box
        header-text="تنظیمات بازی"
        header-icon="setting-2"
        header-icon-url-prefix="/iconsax/"
        have-line
      >
        <div class="box">
          ${settingsTemplate.flat()}

          <div class="buttons-row">
            <outlined-button
              icon="arrow-right-3"
              label=${this.l10n.localize('start-game')}
              url-prefix="/iconsax/"
              @click=${this.start}
            ></outlined-button>
            <icon-button
              icon="message-question"
              url-prefix="/iconsax/"
            ></icon-button>
          </div>
        </div>
      </card-box>
    `;
  }

  static generateRandomWord(): string {
    const word = config.words[Math.floor(Math.random() * config.words.length)];

    if (word === storage.word) {
      return this.generateRandomWord();
    }

    storage.word = word;

    return word;
  }

  static generateScenes(
      word: string,
      players: number,
      spies: number,
      duration: number,
  ): Scene[] {
    const wordScene: WordScene[] = [...Array(players - spies).keys()].map(
        () => ({type: 'word', scene: word}),
    );
    const spyScene: SpyScene[] = [...Array(spies).keys()].map(() => ({
      type: 'spy',
      scene: 'you-are-a-spy',
    }));

    const scenes = random.shuffle([wordScene, spyScene].flat());

    const plan = scenes.map((scene) => scene.type).join('-');

    if (storage.plan === plan) {
      return this.generateScenes(word, players, spies, duration);
    }

    storage.plan = plan;

    const startScene: StartScene = {
      type: 'start',
      scene: 'click-to-start',
    };
    const timerScene: TimerScene = {
      type: 'timer',
      duration: duration,
    };

    return [startScene, scenes, timerScene].flat();
  }

  static renderSettingItem(
      icon: string,
      title: string,
      unit: string,
      value: number,
      addCallback: (event: PointerEvent) => void,
      minusCallback: (event: PointerEvent) => void,
  ): LitRenderType {
    return html`
      <div class="row">
        <alwatr-icon .name=${icon} url-prefix="/iconsax/"></alwatr-icon>
        <div class="title">
          <span>${title}</span>
          <span class="value">${l10n.formatNumber(value)}</span>
          <span>${unit}</span>
        </div>
        <icon-button
          icon="add"
          url-prefix="/iconsax/"
          @click=${addCallback}
        ></icon-button>
        <icon-button
          icon="minus"
          url-prefix="/iconsax/"
          @click=${minusCallback}
        ></icon-button>
      </div>
    `;
  }

  private renderScene(sceneObj: Scene): LitRenderType {
    const progressCapacity = this.scenes.length - 2;
    const progressValue = Math.min(this.scenesInx, progressCapacity);

    return html`<game-scene
      .type=${sceneObj.type}
      .scene=${sceneObj.scene ?? ''}
      .duration=${(sceneObj.duration ?? 0) * 60}
      .progressValue=${progressValue}
      .progressCapacity=${progressCapacity}
      @next=${this.nextScene}
    ></game-scene>`;
  }

  private start(): void {
    const word = PageGame.generateRandomWord();

    this.scenesInx = 0;
    this.scenes = PageGame.generateScenes(
        word,
        storage.players,
        storage.spies,
        storage.time,
    );
  }

  private nextScene(): void {
    if (this.scenesInx < this.scenes.length - 1) {
      this.scenesInx++;
    } else {
      this.scenesInx = -1;
      this.scenes = [];
    }
  }

  private settingsChangeEvent(
      name: keyof Omit<typeof storage, 'word' | 'plan'>,
      action: 'minus' | 'add',
      value = 1,
  ): (event: PointerEvent) => void {
    return (event: PointerEvent): void => {
      event.preventDefault();

      const oldValue = storage[name];

      if (action === 'add') {
        storage[name] += value;
      } else if (action === 'minus') {
        storage[name] -= value;
      }

      if (oldValue !== storage[name]) {
        this.requestUpdate();
      }
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-game': PageGame;
  }
}
