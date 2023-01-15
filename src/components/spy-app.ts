import {
AlwatrRootElement, css, html, customElement,
} from '@alwatr/element';

import '@alwatr/icon';

import './navigation-drawer/navigation-drawer';
import './navigation-drawer/navigation-drawer-item';

import config from '../config';

import type {LitRenderCallbackType} from '../type';

@customElement('spy-app')
export class SpyApp extends AlwatrRootElement {
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
    `,
  ];

  override render(): LitRenderCallbackType {
    return html`
      <navigation-drawer>
        <navigation-drawer-title label="Mail"></navigation-drawer-title>

        <navigation-drawer-item icon="albums" label="Inbox" badge-value="9"></navigation-drawer-item>
        <navigation-drawer-item icon="send" label="Outbox"></navigation-drawer-item>
        <navigation-drawer-item icon="heart" label="Favorites"></navigation-drawer-item>
        <navigation-drawer-item icon="trash" label="Trash"></navigation-drawer-item>

        <navigation-drawer-divider></navigation-drawer-divider>

        <navigation-drawer-title label="Ideology"></navigation-drawer-title>
        <navigation-drawer-item
          href="/"
          icon="heart"
          label="Thanks him"
          badge-value="313"
          active
        ></navigation-drawer-item>
        <navigation-drawer-item icon="skull" label="Fuck them"></navigation-drawer-item>

        <navigation-drawer-divider></navigation-drawer-divider>

        <navigation-drawer-title label="Labels"></navigation-drawer-title>

        <navigation-drawer-item icon="folder-open" label="Label"></navigation-drawer-item>
        <navigation-drawer-item icon="folder-open" label="Label"></navigation-drawer-item>
        <navigation-drawer-item icon="folder-open" label="Label"></navigation-drawer-item>
        <navigation-drawer-item icon="folder-open" label="Label"></navigation-drawer-item>
        <navigation-drawer-item icon="folder-open" label="Label"></navigation-drawer-item>
        <navigation-drawer-item icon="folder-open" label="Label"></navigation-drawer-item>

      </navigation-drawer>
      <main class="page-container"></main>
    `;
  }

  protected override firstUpdated(changedProperties: Map<PropertyKey, unknown>): void {
    super.firstUpdated(changedProperties);

    const items = this.renderRoot.querySelectorAll('navigation-drawer-item');

    for (const item of items) {
      item.addEventListener('click', () => {
        items.forEach((_item) => {
          // eslint-disable-next-line no-param-reassign
          _item.active = false;

          return _item;
        });

        item.active = true;
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spy-app': SpyApp;
  }
}
