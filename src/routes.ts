import {html} from 'lit';

import type {Route} from './types/route';

import './pages/page-home';
import './pages/page-game';
import './pages/page-game-settings';
import './pages/page-contributes';

const routes: Record<string, Route> = {
  game: {
    title: 'بازی',
    icon: 'game-controller',
    show_in_bar: true,
    render: (route) => {
      if (route.sectionList[1] === 'words') {
        return html`<page-game class="ion-page"></page-game>`;
      }
      return html`<page-game-settings class="ion-page"></page-game-settings>`;
    },
  },
  home: {
    title: 'خانه',
    icon: 'home',
    show_in_bar: true,
    render: () => {
      return html`<page-home class="ion-page"></page-home>`;
    },
  },
  contributes: {
    title: 'توسعه دهندگان',
    icon: 'code-working',
    show_in_bar: true,
    render: () => {
      return html`<page-contributes class="ion-page"></page-contributes>`;
    },
  },
};

export default routes;
