import {AlwatrDummyElement, css, type CSSResultGroup} from '@alwatr/element';

/**
 * Alwatr Surface Element
 *
 * @extends AlwatrDummyElement
 *
 * @attr {Boolean} stated
 * @attr {Number|Boolean} elevated - tinted by default
 * @attr {Boolean} filled
 * @attr {Boolean} outlined
 * @attr {Boolean} active-outline - outline on active and focus
 * @attr {Boolean} disabled
 *
 * @cssprop {String} [--surface-color-on=var(--sys-color-on-surface-hsl)]
 * @cssprop {String} [--surface-color-bg=var(--sys-color-surface-hsl)]
 * @cssprop {String} [--surface-elevation=var(--sys-surface-elevation-0)]
 * @cssprop {String} [--surface-tint-color=var(--sys-color-surface-tint-hsl)]
 * @cssprop {String} [--surface-state-color=var(--surface-color-on)]
 * @cssprop {Number} [--surface-tint-opacity=0]
 * @cssprop {Number} [--surface-state-opacity=0]
 */
export class Surface extends AlwatrDummyElement {
  static override styles: CSSResultGroup = css`
    :host {
      --surface-color-on: var(--sys-color-on-surface-hsl);
      --surface-color-bg: var(--sys-color-surface-hsl);
      --surface-elevation: var(--sys-surface-elevation-0);
      --surface-tint-color: var(--sys-color-surface-tint-hsl);
      --surface-state-color: var(--surface-color-on);
      --surface-tint-opacity: 0;
      --surface-state-opacity: 0;

      display: block;
      color: hsl(var(--surface-color-on));
      background-color: hsl(var(--surface-color-bg));
      box-shadow: var(--surface-elevation);
      background-image: linear-gradient(
          hsla(var(--surface-tint-color) / var(--surface-tint-opacity)),
          hsla(var(--surface-tint-color) / var(--surface-tint-opacity))
        ),
        linear-gradient(
          hsla(var(--surface-state-color) / var(--surface-state-opacity)),
          hsla(var(--surface-state-color) / var(--surface-state-opacity))
        );
      background-repeat: no-repeat;
      outline: 0;
      border-radius: var(--sys-radius-medium);
      overflow: hidden;
      overflow: clip;
      transition: opacity var(--sys-motion-duration-small)
        var(--sys-motion-easing-normal);
    }

    :host([outlined]) {
      border: 1px solid hsla(var(--sys-color-outline-hsl) / 40%);
    }

    :host([filled]) {
      --surface-color-bg: var(--sys-color-surface-variant-hsl);
    }

    :host([elevated]) {
      --surface-elevation: var(--sys-surface-elevation-1);
      --surface-tint-opacity: var(--sys-surface-tint-opacity-1);
    }

    :host([elevated='2']) {
      --surface-elevation: var(--sys-surface-elevation-2);
      --surface-tint-opacity: var(--sys-surface-tint-opacity-2);
    }

    :host([elevated='3']) {
      --surface-elevation: var(--sys-surface-elevation-3);
      --surface-tint-opacity: var(--sys-surface-tint-opacity-3);
    }

    :host([elevated='4']) {
      --surface-elevation: var(--sys-surface-elevation-4);
      --surface-tint-opacity: var(--sys-surface-tint-opacity-4);
    }

    :host([stated]:hover) {
      --surface-state-opacity: var(--sys-surface-state-opacity-hover);
    }

    :host([stated]:active) {
      --surface-state-opacity: var(--sys-surface-state-opacity-pressed);
    }

    :host([stated]:focus),
    :host([stated]:focus-within) {
      --surface-state-opacity: var(--sys-surface-state-opacity-focus);
    }

    :host([active-outline]:active),
    :host([active-outline]:focus),
    :host([active-outline]:focus-within) {
      border-color: hsla(var(--sys-color-primary-hsl), 70%);
      box-shadow: 0 0 0.4px 0.8px hsla(var(--sys-color-primary-hsl), 70%);
    }

    :host([stated]:hover:not(:active)),
    :host([stated]:focus),
    :host([stated]:focus-within) {
      --surface-elevation: var(--sys-surface-elevation-1);
      --surface-tint-opacity: var(--sys-surface-tint-opacity-1);
    }

    :host([stated][elevated]:hover:not(:active)),
    :host([stated][elevated]:focus),
    :host([stated][elevated]:focus-within) {
      --surface-elevation: var(--sys-surface-elevation-2);
      --surface-tint-opacity: var(--sys-surface-tint-opacity-2);
    }

    :host([stated][elevated='2']:hover:not(:active)),
    :host([stated][elevated='2']:focus),
    :host([stated][elevated='2']:focus-within) {
      --surface-elevation: var(--sys-surface-elevation-3);
      --surface-tint-opacity: var(--sys-surface-tint-opacity-3);
    }

    :host([stated][elevated='3']:hover:not(:active)),
    :host([stated][elevated='3']:focus),
    :host([stated][elevated='3']:focus-within) {
      --surface-elevation: var(--sys-surface-elevation-4);
      --surface-tint-opacity: var(--sys-surface-tint-opacity-4);
    }

    :host([stated][elevated='4']:hover:not(:active)),
    :host([stated][elevated='4']:focus),
    :host([stated][elevated='4']:focus-within) {
      --surface-elevation: var(--sys-surface-elevation-5);
      --surface-tint-opacity: var(--sys-surface-tint-opacity-5);
    }

    :host([disabled]) {
      pointer-events: none;
      box-shadow: var(--sys-surface-elevation-0) !important;
      color: var(--sys-color-on-surface-variant) !important;
      opacity: var(--sys-surface-disabled-opacity);
    }

    :host([outlined][disabled]) {
      opacity: var(--sys-surface-disabled-outlined-opacity);
    }
  `;
}
