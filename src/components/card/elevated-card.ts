import {css} from 'lit';
import {customElement} from 'lit/decorators.js';

import {Card} from './card.js';

/**
 * elevated card element.
 */
@customElement('elevated-card')
export class ElevatedCard extends Card {
  static override styles = [
    ...Card.styles,
    css`
      :host {
        background-color: var(--alwatr-sys-color-surface);

        --alwatr-elevation-level: 1;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'elevated-card': ElevatedCard;
  }
}
