import {AlwatrElement as AppElement} from '@alwatr/element';
import {preloadIcon} from '@alwatr/icon';
import {SignalInterface} from '@alwatr/signal';
import {css, html, nothing} from 'lit';
import {customElement, state, query} from 'lit/decorators.js';

import config from '../config';
import router from '../router';
import routes from '../router/routes';
import ionicNormalize from '../styles/ionic.normalize';
import ionicTheming from '../styles/ionic.theming';
import normalize from '../styles/normalize';

import './ionic';
import '../pages/page-home';
import '../pages/page-game';
import '../pages/page-game-settings';
import '../pages/page-contributes';

import type {TemplateResult, PropertyValues} from 'lit';

Promise.all(
  config.icons.map((icon) => {
    return preloadIcon(icon);
  }),
);

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
    css`
      ion-tab-button alwatr-icon {
        font-size: 23px;

        transform: scale(1.3);
        transition: transform 500ms ease;
        will-change: transform;
      }
      ion-tab-button ion-label {
        max-height: 0;
        font-weight: 600;
        font-size: 1.2em;
        transition: max-height 200ms 400ms ease;
        will-change: max-height;
      }
      ion-tab-button[selected] alwatr-icon {
        transform: scale(1);
      }
      ion-tab-button[selected] ion-label {
        max-height: 1.5em;
      }
    `,
    css`
      main#outlet > .leaving {
        animation: 500ms RouteLeavingAnimation ease;
      }
      main#outlet > .entering {
        animation: 500ms RouteEnteringAnimation ease;
      }

      @keyframes RouteLeavingAnimation {
        0% {
          opacity: 1;
          transform: translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateY(-1vh);
        }
      }
      @keyframes RouteEnteringAnimation {
        0% {
          opacity: 0;
          transform: translateY(1vh);
        }
        80% {
          transform: translateY(0);
        }
        100% {
          opacity: 1;
        }
      }
    `,
  ];

  @state() private __showAppBar = false;

  @query('main#outlet') private __main?: Node;

  static __showAppBarSignal = new SignalInterface('show-app-bar');

  override connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener('vaadin-router-location-changed', () => {
      this.requestUpdate();
    });
    AppIndex.__showAppBarSignal.addListener((show) => {
      this.__showAppBar = show;
    });

    AppIndex.__showAppBarSignal.dispatch(true);
  }

  override render(): TemplateResult {
    return html`
      <main id="outlet" class="page-container"></main>
      ${this._renderTabBarTemplate()}
    `;
  }

  override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    router.setOutlet(this.__main ?? null);

    document.querySelector('html')?.classList.add('hydrated');
  }

  protected _renderTabBarTemplate(): TemplateResult {
    const navItemsTemplate = routes.map((route) => {
      if (route.icon != null && route.show_in_bar !== true) return nothing;

      const selected = router.location.pathname === route.path;

      return html`
        <ion-tab-button href=${route.path} ?selected=${selected} ?hidden=${!route.show_in_bar}>
          <alwatr-icon flip-rtl dir="rtl" .name=${route.icon}></alwatr-icon>
          <ion-label>${route.title}</ion-label>
        </ion-tab-button>
      `;
    });

    return html`<ion-tab-bar ?hidden=${this.__showAppBar !== true}>${navItemsTemplate}</ion-tab-bar>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-index': AppIndex;
  }
}
