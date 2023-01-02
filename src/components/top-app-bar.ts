import {AlwatrElement} from '@alwatr/element';
import {css, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';

import config from '../config';
import elevationHostStyle from '../styles/elevation-host.css';

import type {TemplateResult} from 'lit';

/**
 * @attr {boolean} scrolling
 */
@customElement('top-app-bar')
export class TopAppBar extends AlwatrElement {
  static override styles = [
    config.styles,
    unsafeCSS(elevationHostStyle),
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: var(--alwatr-sys-spacing-track-1);
        min-height: var(--alwatr-sys-spacing-track-8);
        background-color: var(--alwatr-sys-color-surface);

        --alwatr-elevation-level: 0;
        --alwatr-elevation-duration: var(--alwatr-sys-motion-duration-medium-out);
      }
      :host([scrolling]) {
        --alwatr-elevation-level: 2;
        --alwatr-elevation-duration: var(--alwatr-sys-motion-duration-medium-in);
      }
      .top-app-bar__row {
        display: flex;
        width: 100%;
      }
      .top-app-bar__row.medium,
      .top-app-bar__row.large {
        margin-inline-start: var(--alwatr-sys-spacing-halftrack-3);
      }

      .top-app-bar__content {
        display: flex;
        align-items: center;
        margin-inline-start: var(--alwatr-sys-spacing-track-1);

        flex-grow: 1;
      }

      ::slotted([slot='small']),
      ::slotted([slot='center']),
      ::slotted([slot='medium']),
      ::slotted([slot='large']) {
        color: var(--alwatr-sys-color-on-surface);
        margin: 0;
      }

      ::slotted([slot='center']) {
        width: 100%;
        text-align: center;
      }
      ::slotted([slot='small']),
      ::slotted([slot='center']) {
        font-weight: var(--alwatr-sys-typescale-title-large-font-weight);
        font-size: var(--alwatr-sys-typescale-title-large-font-size);
        letter-spacing: var(--alwatr-sys-typescale-title-large-letter-spacing);
        line-height: var(--alwatr-sys-typescale-title-large-line-height);
      }
      ::slotted([slot='medium']) {
        font-weight: var(--alwatr-sys-typescale-headline-small-font-weight);
        font-size: var(--alwatr-sys-typescale-headline-small-font-size);
        letter-spacing: var(--alwatr-sys-typescale-headline-small-letter-spacing);
        line-height: var(--alwatr-sys-typescale-headline-small-line-height);
      }
      ::slotted([slot='large']) {
        font-weight: var(--alwatr-sys-typescale-headline-medium-font-weight);
        font-size: var(--alwatr-sys-typescale-headline-medium-font-size);
        letter-spacing: var(--alwatr-sys-typescale-headline-medium-letter-spacing);
        line-height: var(--alwatr-sys-typescale-headline-medium-line-height);
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <div class="top-app-bar__row">
        <slot name="start"></slot>

        <div class="top-app-bar__content">
          <slot name="center"></slot>
          <slot name="small"></slot>
        </div>

        <slot name="end"></slot>
      </div>
      <div class="top-app-bar__row medium">
        <slot name="medium"></slot>
      </div>
      <div class="top-app-bar__row large">
        <slot name="large"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'top-app-bar': TopAppBar;
  }
}
