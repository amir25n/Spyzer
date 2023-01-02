import {AlwatrElement} from '@alwatr/element';
import {css, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';

import config from '../../config';
import elevationHostStyle from '../../styles/elevation-host.css';

import type {TemplateResult} from 'lit';

@customElement('bottom-app-bar')
export class BottomAppBar extends AlwatrElement {
  static override styles = [
    config.styles,
    unsafeCSS(elevationHostStyle),
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: var(--alwatr-sys-spacing-track-10);
        background-color: var(--alwatr-sys-color-surface);
        z-index: var(--alwatr-sys-zindex-above);

        padding-top: var(--alwatr-sys-spacing-halftrack-3);
        padding-bottom: var(--alwatr-sys-spacing-halftrack-3);
        padding-inline-start: var(--alwatr-sys-spacing-halftrack-1);
        padding-inline-end: var(--alwatr-sys-spacing-track-2);

        --alwatr-elevation-level: 1;
      }

      .bottom-app-bar__row {
        display: flex;
        width: 100%;
      }
      .bottom-app-bar__content {
        display: flex;
        flex-grow: 1;
        padding: var(--alwatr-sys-spacing-halftrack-1) 0;
      }

      ::slotted(standard-icon-button) {
        width: var(--alwatr-sys-spacing-track-6);
        height: var(--alwatr-sys-spacing-track-6);
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <div class="bottom-app-bar__row">
        <div class="bottom-app-bar__content">
          <slot></slot>
        </div>

        <slot name="end"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bottom-app-bar': BottomAppBar;
  }
}
