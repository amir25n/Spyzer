import {AlwatrElement} from '@alwatr/element';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import '@alwatr/icon';

import config from '../config';

import './top-app-bar';
import './standard-icon-button';

import type {TemplateResult} from 'lit';

@customElement('spy-app')
export class SpyApp extends AlwatrElement {
  static override styles = [
    config.styles,
    css`
      :host,
      .page-container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      standard-icon-button {
        width: var(--alwatr-sys-spacing-track-6);
        height: var(--alwatr-sys-spacing-track-6);
      }
      top-app-bar {
        margin-bottom: var(--alwatr-sys-spacing-track-2);
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <main class="page-container">
        <top-app-bar scrolling>
          <standard-icon-button icon="menu-outline" slot="start"></standard-icon-button>

          <h1 slot="center">Center Aligned</h1>

          <standard-icon-button icon="search-outline" slot="end"></standard-icon-button>
          <standard-icon-button icon="settings-outline" slot="end"></standard-icon-button>
        </top-app-bar>

        <top-app-bar>
          <standard-icon-button icon="menu-outline" slot="start"></standard-icon-button>

          <h1 slot="small">Small Title</h1>

          <standard-icon-button icon="search-outline" slot="end"></standard-icon-button>
          <standard-icon-button icon="settings-outline" slot="end"></standard-icon-button>
        </top-app-bar>

        <top-app-bar>
          <standard-icon-button icon="menu-outline" slot="start"></standard-icon-button>

          <h1 slot="medium">HeadLine Small</h1>

          <standard-icon-button icon="search-outline" slot="end"></standard-icon-button>
          <standard-icon-button icon="settings-outline" slot="end"></standard-icon-button>
        </top-app-bar>

        <top-app-bar>
          <standard-icon-button icon="menu-outline" slot="start"></standard-icon-button>

          <h1 slot="large">HeadLine Medium</h1>

          <standard-icon-button icon="search-outline" slot="end"></standard-icon-button>
          <standard-icon-button icon="settings-outline" slot="end"></standard-icon-button>
        </top-app-bar>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spy-app': SpyApp;
  }
}
