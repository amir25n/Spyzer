import {AlwatrElement as AppElement} from '@alwatr/element';
import {preloadIcon} from '@alwatr/icon';
import {router} from '@alwatr/router';
import {SignalInterface} from '@alwatr/signal';
import {css, html, nothing} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {cache} from 'lit/directives/cache.js';

import routes from '../routes';
import ionicNormalize from '../styles/ionic.normalize';
import ionicTheming from '../styles/ionic.theming';
import normalize from '../styles/normalize';

import './ionic';

import type {RoutesConfig} from '@alwatr/router';
import type {TemplateResult, PropertyValues} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'app-index': AppIndex;
  }
}

@customElement('app-index')
export class AppIndex extends AppElement {
  static override styles = [
    normalize,
    ionicNormalize,
    ionicTheming,
    css`
      :host {
        inset: 0;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        position: absolute;
        flex-direction: column;
        justify-content: space-between;
        contain: layout size style;
        overflow: hidden;
        z-index: 0;
      }
      .page-container {
        position: relative;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0%;
        contain: size layout style;
      }
      .download-fab alwatr-icon {
        font-size: 26px;
      }
    `,
  ];

  constructor() {
    super();
    router.initial();
  }

  @state() private __activePage = 'home';
  @state() private __showAppBar = false;

  static __showAppBarSignal = new SignalInterface('show-app-bar');

  protected _routes: RoutesConfig = {
    map: (route) => (this.__activePage = route.sectionList[0]?.toString().trim() || 'home'),
    list: routes,
  };

  override connectedCallback(): void {
    super.connectedCallback();

    router.signal.addListener(
        (route) => {
          this._logger.logMethodArgs('routeChanged', {route});
          this.__activePage = route.sectionList[0]?.toString().trim() || 'home';
          this.requestUpdate();
        },
        {
          receivePrevious: true,
        },
    );
    AppIndex.__showAppBarSignal.addListener((show) => {
      this.__showAppBar = show;
    });

    Object.keys(routes).map((slug) => {
      const icon = routes[slug].icon;

      if (icon != null) {
        preloadIcon(icon);
        preloadIcon(icon + '-outline');
      }
    });

    AppIndex.__showAppBarSignal.dispatch(true);
  }
  override render(): TemplateResult {
    return html`
      <main class="page-container">
        ${cache(router.outlet(this._routes))}
      </main>
      ${this._renderTabBarTemplate()}
    `;
  }
  override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    document.querySelector('html')?.classList.add('hydrated');
  }

  protected _renderTabBarTemplate(): TemplateResult {
    const navItemsTemplate = Object.keys(routes).map((slug) => {
      const route = routes[slug];

      if (route.icon != null && route.show_in_bar !== true) return nothing;

      const selected = this.__activePage === slug;
      const iconName = selected ? route.icon : route.icon + '-outline';

      return html`
        <ion-tab-button
          href=${router.makeUrl({sectionList: [slug]})}
          ?selected=${selected}
          ?hidden=${!route.show_in_bar}
        >
          <alwatr-icon flip-rtl dir="rtl" .name=${iconName}></alwatr-icon>
          <ion-label>${route.title}</ion-label>
        </ion-tab-button>
      `;
    });

    return html`<ion-tab-bar ?hidden=${this.__showAppBar !== true}>${navItemsTemplate}</ion-tab-bar>`;
  }
}
