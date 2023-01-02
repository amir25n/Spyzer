import {AlwatrElement} from '@alwatr/element';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import '@alwatr/icon';

import config from '../config';

import './top-app-bar/top-app-bar';
import './bottom-app-bar/bottom-app-bar';
import './icon-button/standard-icon-button';
import './fab/floating-action-button';
import './card/elevated-card';

import type {TemplateResult, PropertyValues} from 'lit';

@customElement('spy-app')
export class SpyApp extends AlwatrElement {
  static override styles = [
    config.styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .page-container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: var(--alwatr-sys-spacing-track-1) var(--alwatr-sys-spacing-halftrack-5);
        overflow-y: auto;
      }
      elevated-card {
        padding: var(--alwatr-sys-spacing-track-1);
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <top-app-bar>
        <standard-icon-button icon="icon" url-prefix="/images/" slot="start"></standard-icon-button>

        <h1 slot="center">Spyzer</h1>

        <standard-icon-button icon="help-outline" slot="end"></standard-icon-button>
      </top-app-bar>
      <main class="page-container">
        <elevated-card>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex aliquid neque molestiae nam, voluptate mollitia
            eaque eius. Iusto, amet? Magnam labore temporibus quaerat itaque vitae.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex aliquid neque molestiae nam, voluptate mollitia
            eaque eius. Iusto, amet? Magnam labore temporibus quaerat itaque vitae.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex aliquid neque molestiae nam, voluptate mollitia
            eaque eius. Iusto, amet? Magnam labore temporibus quaerat itaque vitae.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex aliquid neque molestiae nam, voluptate mollitia
            eaque eius. Iusto, amet? Magnam labore temporibus quaerat itaque vitae.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex aliquid neque molestiae nam, voluptate mollitia
            eaque eius. Iusto, amet? Magnam labore temporibus quaerat itaque vitae.
          </p>
        </elevated-card>
      </main>
      <bottom-app-bar>
        <standard-icon-button icon="home-outline"></standard-icon-button>
        <standard-icon-button icon="help-outline"></standard-icon-button>

        <floating-action-button icon="game-controller-outline" slot="end"></floating-action-button>
      </bottom-app-bar>
    `;
  }

  override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    const main = this.renderRoot.querySelector('main');
    const topAppBar = this.renderRoot.querySelector('top-app-bar');

    if (main != null && topAppBar != null) {
      main.addEventListener('scroll', () => {
        topAppBar.scrolling = !(main.scrollTop < 5);
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spy-app': SpyApp;
  }
}
