import {customElement} from '@alwatr/element';


import {PageGame} from './page-game';

@customElement('page-who-am-i')
export class PageWhoAmI extends PageGame {
  static override styles = PageGame.styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'page-who-am-i': PageWhoAmI;
  }
}
