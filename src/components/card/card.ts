import {AlwatrElement} from '@alwatr/element';
import {css, html, unsafeCSS} from 'lit';

import elevationHostStyle from '../../styles/elevation-host.css';

import type {TemplateResult} from 'lit';

export class Card extends AlwatrElement {
  static override styles = [
    unsafeCSS(elevationHostStyle),
    css`
      :host {
        display: flex;
        flex-direction: column;
        border-radius: var(--alwatr-sys-shape-corner-medium-default-size);
        color: var(--alwatr-sys-color-on-surface);
      }
    `,
  ];

  override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
