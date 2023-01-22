import {
  AlwatrSmartElement,
  customElement,
  html,
  css,
  PropertyValues,
} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';

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
      const oldPage = this.activePage;
      this.activePage = route.sectionList[0]?.toString() ?? this.activePage;
      this.requestUpdate('activePage', oldPage);

      this._logger.logMethodArgs('routeChanged', {route});
    });
    router.initial();
  }

  static override styles = [
    config.styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: hsla(var(--sys-color-primary-container-hsl), 75%);
      }

      .page-container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
    `,
  ];

  private activePage = 'home';

  private routes: RoutesConfig = {
    map: (route) => route.sectionList[0]?.toString() ?? this.activePage,
    list: routes,
  };

  override render(): LitRenderType {
    return html`
      <div class="page-container">${router.outlet(this.routes)}</div>
      <navigation-bar
        .tabs=${this.routes.list}
        .activeSlug=${this.activePage}
      ></navigation-bar>
    `;
  }

  protected override firstUpdated(
      changedProperties: PropertyValues<this>,
  ): void {
    super.firstUpdated(changedProperties);

    document.body.removeAttribute('unresolved');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spy-app': SpyApp;
  }
}
