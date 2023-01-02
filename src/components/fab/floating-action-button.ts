import {AlwatrElement} from '@alwatr/element';
import {css, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import '@alwatr/icon';

/**
 * @attr {string} icon
 * @attr {boolean} flip-rtl
 */
@customElement('floating-action-button')
export class FloatingActionButton extends AlwatrElement {
  static override styles = css`
    :host {
      position: relative;
      display: inline-flex;
      user-select: none;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      flex-grow: 0;
      flex-shrink: 0;

      cursor: pointer;
      color: var(--alwatr-sys-color-on-primary-container);
      background-color: var(--alwatr-sys-color-primary-container);
      width: var(--alwatr-sys-spacing-track-7);
      height: var(--alwatr-sys-spacing-track-7);
      border-radius: var(--alwatr-sys-spacing-track-2);
      outline: 0;
      overflow: hidden;
      overflow: clip;
      z-index: var(--alwatr-sys-zindex-default);
      -webkit-tap-highlight-color: transparent;
    }

    :host::before {
      content: '';
      position: absolute;
      z-index: var(--alwatr-sys-zindex-below);
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      inset: 0;
      opacity: 0;
      transition: opacity var(--alwatr-sys-motion-duration-small-out) var(--alwatr-sys-motion-easing-linear);
      background-color: var(--alwatr-sys-color-on-surface-variant);
    }

    :host(:hover)::before {
      opacity: var(--alwatr-sys-state-hover-state-layer-opacity);
      transition-duration: var(--alwatr-sys-motion-duration-small-in);
    }

    :host(:active)::before {
      opacity: var(--alwatr-sys-state-pressed-state-layer-opacity);
      transition-duration: 0ms;
    }

    :host(:focus)::before {
      opacity: var(--alwatr-sys-state-focus-state-layer-opacity);
      transition-duration: var(--alwatr-sys-motion-duration-small-in);
    }

    alwatr-icon {
      width: var(--alwatr-sys-spacing-track-3);
      height: var(--alwatr-sys-spacing-track-3);
      color: var(--alwatr-sys-color-on-surface);
    }
  `;

  @property()
  icon?: string;

  @property({attribute: 'url-prefix'})
  urlPrefix?: string;

  @property({type: Boolean, attribute: 'flip-rtl', reflect: true})
  flipRtl = false;

  override render(): TemplateResult {
    return html`<alwatr-icon
      part="icon"
      ?flip-rtl=${this.flipRtl}
      .name=${this.icon}
      .urlPrefix=${this.urlPrefix}
    ></alwatr-icon>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'floating-action-button': FloatingActionButton;
  }
}
