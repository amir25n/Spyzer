import {
  AlwatrSmartElement,
  customElement,
  html,
  css,
  PropertyValues,
  cache,
  state,
  property,
} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';
import {registerSW} from 'virtual:pwa-register';

import '@alwatr/icon';

import config from '../config';
import routes from '../routes';

import './navigation-bar/navigation-bar';

import {router} from '@alwatr/router';
import type {RoutesConfig} from '@alwatr/router';
import type {LitRenderType} from '../types/lit-render';

@customElement('spy-app')
export class SpyApp extends AlwatrSmartElement {
  constructor() {
    super();

    l10n.config.defaultLocale = {
      code: 'fa-IR',
      direction: 'rtl',
      language: 'fa',
    };
    l10n.setLocal();
    l10n.resourceChangeSignal.addListener(() => this.requestUpdate());

    router.signal.addListener((route) => {
      this._logger.logMethodArgs('routeChanged', {route});
      this.activePage = route.sectionList[0]?.toString() ?? this.activePage;
    });
    router.initial();
  }

  static override styles = [
    config.styles,
    css`
      :host {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        max-width: calc(70 * var(--sys-spacing-track));
        margin: auto;
      }

      .page-container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
    `,
  ];

  @property({type: Boolean, attribute: false})
    showNavigationBar = true;

  @state()
  private activePage = 'home';

  private routes: RoutesConfig = {
    map: (route) => route.sectionList[0]?.toString() ?? this.activePage,
    list: routes,
  };

  override render(): LitRenderType {
    return html`
      <div class="page-container">${cache(router.outlet(this.routes))}</div>
      <navigation-bar
        .tabs=${this.routes.list}
        .activeSlug=${this.activePage}
        ?hidden=${!this.showNavigationBar}
      ></navigation-bar>
    `;
  }

  override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    registerSW({
      immediate: true,
    });

    requestAnimationFrame(() => {
      document.documentElement.removeAttribute('unresolved');
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spy-app': SpyApp;
  }
}
