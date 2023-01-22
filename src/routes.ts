import {l10n} from '@alwatr/i18n';
import {html} from 'lit';
import {Routes} from './types/route';

const routes: Routes = {
  'home': {
    icon: 'home',
    render: () => html`<h1>${l10n.localize('page_home')}</h1>`,
  },
  'game': {
    icon: 'game',
    render: () => html`<h1>${l10n.localize('page_game')}</h1>`,
  },
  'who-am-i': {
    icon: 'user-square',
    render: () => html`<h1>${l10n.localize('page_who_am_i')}</h1>`,
  },
};

export default routes;
