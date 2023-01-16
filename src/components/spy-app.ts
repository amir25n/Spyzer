import {AlwatrRootElement, css, customElement} from '@alwatr/element';

import '@alwatr/icon';

import config from '../config';
import routes from '../routes';

import type {RoutesConfig} from '@alwatr/router';

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
      }
    `,
  ];

  protected override _routes: RoutesConfig = {
    map: (route) => route.sectionList[0]?.toString() ?? 'home',
    list: routes,
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'spy-app': SpyApp;
  }
}
