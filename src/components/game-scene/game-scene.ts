import {
  AlwatrDummyElement,
  html,
  css,
  property,
  LocalizeMixin as localizeMixin,
  customElement,
  when,
} from '@alwatr/element';

import '@alwatr/icon';

import config from '../../config';
import '../card-box/card-box';
import '../button/filled-button';
import '../timer/timer';

import type {LitRenderType} from '../../types/lit-render';
import type {WordScenes} from '../../types/scenes';

@customElement('game-scene')
export class GameScene extends localizeMixin(AlwatrDummyElement) {
  static override styles = [
    config.styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      :host([type='spy']) .scene .text {
        color: var(--sys-color-error);
      }

      card-box {
        --comp-progress-transition-duration: calc(
          5 * var(--sys-motion-duration-large)
        );
      }

      .scene {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: var(--sys-spacing-track);
        padding: calc(2 * var(--sys-spacing-track));
        gap: calc(4 * var(--sys-spacing-track));
      }

      .scene .text {
        margin: 0;
        color: var(--sys-color-on-primary-container);
        font-family: var(--sys-typescale-title-large-font-family-name);
        font-weight: var(--sys-typescale-title-large-font-weight);
        font-size: var(--sys-typescale-title-large-font-size);
        letter-spacing: var(--sys-typescale-title-large-letter-spacing);
        line-height: var(--sys-typescale-title-large-line-height);
        /* transition-property: color;
        transition-duration: var(--sys-motion-duration-large);
        transition-timing-function: var(--sys-motion-easing-in-out); */
      }

      .progress-note {
        direction: ltr;
      }
    `,
  ];

  @property({type: String})
    scene = '';

  @property({type: Number})
    duration = 0;

  @property({reflect: true})
    type: WordScenes = 'word';

  @property({type: Number, attribute: 'progress-value'})
    progressValue = 0;

  @property({type: Number, attribute: 'progress-capacity'})
    progressCapacity = 1;

  override render(): LitRenderType {
    super.render();

    const progressValue = this.l10n.formatNumber(this.progressValue);
    const progressCapacity = this.l10n.formatNumber(this.progressCapacity);
    const progressPercentage =
      (this.progressValue * 100) / this.progressCapacity;

    return html`
      <card-box
        header-text=${this.l10n.localize('introduction-of-roles')}
        header-icon="user-octagon"
        header-icon-url-prefix="/iconsax/"
        .lineProgress=${progressPercentage}
      >
        <span class="progress-note" slot="header-end">
          ${progressValue} /${progressCapacity}
        </span>
        <div class="scene">
          ${when(
      this.type === 'timer',
      () => html`<game-timer .duration=${this.duration}></game-timer>`,
  )}
          ${when(
      this.type === 'spy' ||
              this.type === 'word' ||
              this.type === 'start',
      () => html`<h3 class="text">${this.l10n.localize(this.scene)}</h3>`,
  )}
          ${this.renderNextButton()}
        </div>
      </card-box>
    `;
  }

  protected renderNextButton(label?: string) {
    label ??= this.l10n.localize('next');

    return html`<filled-button
      class="next-button"
      icon="arrow-right"
      url-prefix="/iconsax/"
      label=${label}
      @click=${this.nextEvent}
    ></filled-button>`;
  }

  protected nextEvent(): void {
    const event = new CustomEvent('next');

    this.dispatchEvent(event);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'game-scene': GameScene;
  }
}
