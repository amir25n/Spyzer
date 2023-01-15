import {
AlwatrDummyElement, css, html, unsafeCSS,
} from '@alwatr/element';

import elevationHostStyle from '../../styles/elevation-host.css';

import type {TemplateResult} from '@alwatr/element';

export const styles = {
  text: css`
    :host {
      color: var(--alwatr-sys-color-primary);
      background-color: var(--alwatr-sys-color-surface);
    }
  `,
  elevated: css`
    :host {
      color: var(--alwatr-sys-color-primary);
      background-color: var(--alwatr-sys-color-surface);

      --alwatr-elevation-level: 1;
      --alwatr-elevation-duration: var(--alwatr-sys-motion-duration-medium-in);
    }
  `,
  filled: css`
    :host {
      color: var(--alwatr-sys-color-on-primary);
      background-color: var(--alwatr-sys-color-primary);
    }
  `,
  tonal: css`
    :host {
      color: var(--alwatr-sys-color-on-secondary-container);
      background-color: var(--alwatr-sys-color-secondary-container);
    }
  `,
  outlined: css`
    :host {
      color: var(--alwatr-sys-color-primary);
      background-color: transparent;
      border-color: var(--alwatr-sys-color-outline);

      transition-property: background-color, color, border-color;
    }
  `,
};

export class CommonButton extends AlwatrDummyElement {
  static override styles = [
    unsafeCSS(elevationHostStyle),
    css`
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
        height: var(--alwatr-sys-spacing-track-5);
        padding: 0 var(--alwatr-sys-spacing-track-2);
        border-radius: var(--alwatr-sys-spacing-halftrack-5);
        outline: 0;
        z-index: var(--alwatr-sys-zindex-default);
        -webkit-tap-highlight-color: transparent;

        transition-duration: var(--alwatr-sys-motion-duration-medium-in);
        transition-timing-function: var(--alwatr-sys-motion-easing-in-out);
        transition-property: background-color, color;

        border-style: solid;
        border-color: transparent;
        border-width: calc(var(--alwatr-sys-spacing-track) / 8);

        --alwatr-elevation-level: 0;
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
        transition: opacity var(--alwatr-sys-motion-duration-none) var(--alwatr-sys-motion-easing-linear);
        background-color: var(--alwatr-sys-color-on-surface-variant);
      }

      :host(:hover)::before {
        opacity: var(--alwatr-sys-state-hover-state-layer-opacity);
        transition-duration: var(--alwatr-sys-motion-duration-small-in);
      }

      :host(:active)::before {
        opacity: var(--alwatr-sys-state-pressed-state-layer-opacity);
        transition-duration: var(--alwatr-sys-motion-duration-small-in);
      }

      .button-content {
        padding: 0 var(--alwatr-sys-spacing-track-1);
      }

      ::slotted(alwatr-icon) {
        width: var(--alwatr-sys-spacing-track-3);
        height: var(--alwatr-sys-spacing-track-3);
        color: inherit;
      }
      ::slotted(:not([slot])) {
        color: inherit;

        font-family: var(--alwatr-sys-typescale-label-large-font-family-name);
        font-weight: var(--alwatr-sys-typescale-label-large-font-weight);
        font-size: var(--alwatr-sys-typescale-label-large-font-size);
        letter-spacing: var(--alwatr-sys-typescale-label-large-letter-spacing);
        line-height: var(--alwatr-sys-typescale-label-large-line-height);
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <slot name="start"></slot>
      <div class="button-content">
        <slot></slot>
      </div>
      <slot name="end"></slot>
    `;
  }
}
