import {html} from 'lit';

import type {Route} from './types/route';

import './pages/page-home';
import './pages/page-game';
import './pages/page-game-settings';
import './pages/page-about';

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
    render: () => html`<page-home class="ion-page"></page-home>`,
  },
  about: {
    title: 'درباره من',
    icon: 'information-circle',
    show_in_bar: true,
    render: () => html`<page-about class="ion-page"></page-about>`,
  },
};

export default routes;
