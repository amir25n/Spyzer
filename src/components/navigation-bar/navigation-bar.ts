import {
  AlwatrDummyElement,
  css,
  html,
  customElement,
  property,
  map,
} from '@alwatr/element';

import config from '../../config';

import './navigation-tab';

import type {LitRenderType} from '../../types/lit-render';
import type {Routes} from '../../types/route';

@customElement('navigation-bar')
export class NavigationBar extends AlwatrDummyElement {
  static override styles = [
    config.styles,
    css`
      :host {
        display: flex;
        justify-content: center;
        align-items: stretch;
        width: 100%;
        height: calc(8 * var(--sys-spacing-track));
        background-color: var(--sys-color-surface);
        border-top-right-radius: var(--sys-radius-medium);
        border-top-left-radius: var(--sys-radius-medium);
        box-shadow: 0 4px 12px rgb(0 0 0 / 30%);
      }
    `,
  ];

  @property({type: Object, attribute: false})
    tabs: Routes = {};

  @property({type: String, reflect: true})
    activeSlug = '';

  override render(): LitRenderType {
    const tabsTemplate = map(Object.keys(this.tabs), (tabKey) => {
      const tab = this.tabs[tabKey];
      const selected = this.activeSlug === tabKey;

      return NavigationBar.renderNavigationTab(
          tab.icon ?? 'warning-2',
          tabKey,
          selected,
      );
    });

    return html`${tabsTemplate}`;
  }

  static renderNavigationTab(
      icon: string,
      href: string,
      active: boolean,
  ): LitRenderType {
    return html`<navigation-tab
      .icon=${icon}
      .href=${href}
      ?active=${active}
    ></navigation-tab>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'navigation-bar': NavigationBar;
  }
}
