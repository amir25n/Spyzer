import {AlwatrElement as AppElement} from '@alwatr/element';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import type {TemplateResult} from 'lit';

@customElement('spy-app')
export class SpyApp extends AppElement {
  static override styles = [css``];

  override render(): TemplateResult {
    return html` <main class="page-container"></main> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spy-app': SpyApp;
  }
}
