import {LitElement, html} from 'lit';
import {property, state, customElement} from 'lit/decorators.js';
import {when} from 'lit/directives/when.js';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    't-imer': Timer;
  }
}

@customElement('t-imer')
export class Timer extends LitElement {
  @property({type: Number}) duration = 60;
  @state() private end: number | null = null;
  @state() private remaining = 0;

  override render(): TemplateResult {
    const {remaining} = this;
    const min = Math.floor(remaining / 60000);
    const sec = pad(min, Math.floor((remaining / 1000) % 60));
    const hun = pad(true, Math.floor((remaining % 1000) / 10));
    return html`
      ${when(
      min,
      () => html`${min.toLocaleString('fa-IR')}:${sec.toLocaleString('fa-IR')}`,
      () => html`${sec.toLocaleString('fa-IR')}.${hun.toLocaleString('fa-IR')}`,
  )}
    `;
  }
  /* playground-fold */

  private start(): void {
    this.end = Date.now() + this.remaining;
    this.tick();
  }

  private reset(): void {
    const running = this.running;
    this.remaining = this.duration * 1000;
    this.end = running ? Date.now() + this.remaining : null;
  }

  private tick(): void {
    if (this.running && this.end !== null) {
      this.remaining = Math.max(0, this.end - Date.now());
      requestAnimationFrame(() => this.tick());
    }
  }

  get running(): number | null {
    return this.end && this.remaining;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.reset();
    this.start();
  }
}

function pad(pad: unknown, val: number): string | number {
  return pad ? String(val.toLocaleString('fa-IR')).padStart(2, '0') : val.toLocaleString('fa-IR');
}
