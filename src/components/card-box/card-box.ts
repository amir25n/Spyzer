import {
  customElement,
  property,
  html,
  css,
  AlwatrDummyElement,
} from '@alwatr/element';

import '@alwatr/icon';

import config from '../../config';

import type {LitRenderType} from '../../types/lit-render';

/**
 * @element card-box
 *
 * @attr {String} header-text
 * @attr {String} header-icon
 * @attr {String} header-icon-url-prefix
 * @attr {String} header-note
 * @attr {Boolean} have-line
 *
 * @prop {String} headerText
 * @prop {String} headerIcon
 * @prop {String} headerIconUrlPrefix
 * @prop {String} headerNote
 * @prop {Boolean} haveLine
 *
 * @slot
 * @slot header-end
 */
@customElement('card-box')
export class CardBox extends AlwatrDummyElement {
  static override styles = [
    config.styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 12px hsla(var(--sys-color-on-surface-hsl) / 25%);
        background-color: var(--sys-color-surface);
        color: var(--sys-color-on-surface);
        outline: 0;
        border-radius: var(--sys-radius-medium);
        overflow: hidden;
        overflow: clip;
      }

      .header {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        padding: calc(1.75 * var(--sys-spacing-track));
        gap: calc(1.5 * var(--sys-spacing-track));
      }

      .header .header-icon {
        flex: 0 0 calc(3.5 * var(--sys-spacing-track));
        font-size: calc(3.5 * var(--sys-spacing-track));
      }

      .header .header-text {
        margin: 0;
        flex-grow: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-family: var(--sys-typescale-title-medium-font-family-name);
        font-weight: var(--sys-typescale-title-medium-font-weight);
        font-size: var(--sys-typescale-title-medium-font-size);
        letter-spacing: var(--sys-typescale-title-medium-letter-spacing);
        line-height: var(--sys-typescale-title-medium-line-height);
      }

      .header .header-note {
        font-family: var(--sys-typescale-label-small-font-family-name);
        font-weight: var(--sys-typescale-label-small-font-weight);
        font-size: var(--sys-typescale-label-small-font-size);
        letter-spacing: var(--sys-typescale-label-small-letter-spacing);
        line-height: var(--sys-typescale-label-small-line-height);
      }

      .header .header-note:empty {
        display: none;
      }

      .line {
        display: flex;
        align-items: center;
        direction: ltr;
        margin: 0 calc(1.75 * var(--sys-spacing-track));
        border-radius: calc(0.4 * var(--sys-spacing-track));
        height: calc(0.4 * var(--sys-spacing-track));
        border: none;
        background: var(--sys-color-surface-variant);
        overflow: hidden;
        overflow: clip;
      }

      .line .progress {
        height: 100%;
        border-radius: calc(0.4 * var(--sys-spacing-track));
        background: var(--sys-color-primary);
        transition-property: width, opacity;
        transition-duration: var(
          --comp-progress-transition-duration,
          var(--sys-motion-duration-large)
        );
        transition-timing-function: var(--sys-motion-easing-in-out);
      }
    `,
  ];

  @property({type: String, attribute: 'header-text'})
    headerText = '';

  @property({type: String, attribute: 'header-icon'})
    headerIcon = '';

  @property({type: String, attribute: 'header-icon-url-prefix'})
    headerIconUrlPrefix?: string;

  @property({type: String, attribute: 'header-note'})
    headerNote = '';

  @property({type: Number, attribute: 'line-progress'})
    lineProgress = 0;

  @property({type: Boolean, attribute: 'have-line'})
    haveLine = true;

  override render(): LitRenderType {
    this.lineProgress = Math.max(this.lineProgress, 0);
    this.lineProgress = Math.min(this.lineProgress, 100);
    const lineProgressOpacity = Math.max(this.lineProgress, 30);

    return html`
      <div class="header">
        <alwatr-icon
          class="header-icon"
          .name=${this.headerIcon}
          .urlPrefix=${this.headerIconUrlPrefix}
        ></alwatr-icon>
        <h3 class="header-text">${this.headerText}</h3>
        <slot name="header-end"></slot>
        <span class="header-note">${this.headerNote}</span>
      </div>
      <div class="line" ?hidden=${!this.haveLine}>
        <div
          class="progress"
          style="width:${this.lineProgress}%;opacity:${lineProgressOpacity}%;"
        ></div>
      </div>
      <div class="content"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'card-box': CardBox;
  }
}
