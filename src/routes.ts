import {html} from 'lit';
import {Routes} from './types/route';

import './pages/page-home';
import './pages/page-game';
import './pages/page-who-am-i';

const routes: Routes = {
  'home': {
    icon: 'home',
    render: () => html`<page-home></page-home>`,
  },
  'game': {
    icon: 'game',
    render: () => html`<page-game></page-game>`,
  },
  'who-am-i': {
    icon: 'user-square',
    render: () => html`<page-who-am-i></page-who-am-i>`,
  },
};

export default routes;
