import {
  AlwatrDummyElement,
  css,
  html,
  customElement,
  property,
  map,
  PropertyValues,
} from '@alwatr/element';

import config from '../../config';

import './navigation-tab';

import type {LitRenderType} from '../../types/lit-render';
import type {Routes} from '../../types/route';
import type {NavigationTab} from './navigation-tab';

@customElement('navigation-bar')
export class NavigationBar extends AlwatrDummyElement {
  static override styles = [
    config.styles,
    css`
      :host {
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: calc(8 * var(--sys-spacing-track));
        background-color: var(--sys-color-surface);
        border-top-right-radius: var(--sys-radius-medium);
        border-top-left-radius: var(--sys-radius-medium);
        box-shadow: 0 4px 12px rgb(0 0 0 / 30%);
        transform: scale(1);
        transform-origin: center bottom;
        transition-property: opacity, transform;
        transition-delay: var(--sys-motion-duration-small);
        transition-duration: var(--sys-motion-duration-large);
        transition-timing-function: var(--sys-motion-easing-in-out);
        opacity: 1;
      }

      :host([hidden]) {
        opacity: 0;
        transform: scale(0);
        will-change: opacity, transform;
      }

      .active-indicator {
        position: absolute;
        bottom: calc(1.5 * var(--sys-spacing-track));
        width: calc(1.5 * var(--sys-spacing-track));
        height: calc(0.3 * var(--sys-spacing-track));
        border-radius: calc(0.15 * var(--sys-spacing-track));
        box-shadow: 0 0 calc(0.4 * var(--sys-spacing-track)) 1px
          var(--sys-color-primary);

        transition-property: left;
        transition-duration: var(--sys-motion-duration-large);
        transition-timing-function: var(--sys-motion-easing-in-out);

        background-color: var(--sys-color-primary);
      }
    `,
  ];

  @property({type: Object, attribute: false})
    tabs: Routes = {};

  @property({type: String})
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

    return html`${tabsTemplate}
      <div class="active-indicator"></div>`;
  }

  override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    this.calibrateActiveIndicator();
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

  private calibrateActiveIndicator(): void {
    requestAnimationFrame(() => {
      const navigationBar = this.getBoundingClientRect();
      const activeTab = this.activeTab?.getBoundingClientRect();
      const activeIndicator = this.activeIndicator?.getBoundingClientRect();

      if (
        navigationBar != null &&
        activeTab != null &&
        activeIndicator != null &&
        this.activeIndicator != null
      ) {
        this.activeIndicator.style.left =
          Math.floor(
              activeTab.x +
              activeTab.width / 2 -
              (activeIndicator.width / 2 + navigationBar.x),
          ) + 'px';
      }
    });
  }

  private get activeIndicator(): HTMLDivElement | null {
    return this.renderRoot.querySelector('.active-indicator');
  }

  private get activeTab(): NavigationTab | null {
    return this.renderRoot.querySelector('navigation-tab[active]');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'navigation-bar': NavigationBar;
  }
}
