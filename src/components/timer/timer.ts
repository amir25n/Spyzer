import {
  AlwatrDummyElement,
  css,
  customElement,
  html,
  property,
  PropertyDeclaration,
  PropertyValues,
  state,
  TemplateResult,
} from '@alwatr/element';
import config from '../../config';

function pad(pad: unknown, val: number) {
  return pad ? String(val).padStart(2, '0') : val;
}

@customElement('game-timer')
export class GameTimer extends AlwatrDummyElement {
  static override styles = [
    config.styles,
    css`
      :host {
        color: var(--sys-color-on-secondary-container);
        font-family: var(--sys-typescale-display-medium-font-family-name);
        font-weight: var(--sys-typescale-display-medium-font-weight);
        font-size: var(--sys-typescale-display-medium-font-size);
        letter-spacing: var(--sys-typescale-display-medium-letter-spacing);
        line-height: var(--sys-typescale-display-medium-line-height);
      }
    `,
  ];

  @property({type: Number}) duration = 60;
  @state() private end: number | null = null;
  @state() private remaining = 0;
  @state() private timer: TemplateResult<1> = html``;

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.pause();
  }

  override render(): TemplateResult<1> {
    return this.timer;
  }

  override requestUpdate(
      name?: PropertyKey | undefined,
      oldValue?: unknown,
      options?: PropertyDeclaration<unknown, unknown> | undefined,
  ): void {
    super.requestUpdate(name, oldValue, options);

    if (name === 'duration') {
      this.reset();
      this.start();
    }

    if (name === 'remaining') {
      const old = this.timer;
      const _new = this.renderTimer();

      if (old?.values?.join('-') !== _new?.values?.join('-')) {
        this.timer = _new;
      }
    }
  }

  override shouldUpdate(changedProperties: PropertyValues): boolean {
    return changedProperties.has('timer');
  }

  private renderTimer(): TemplateResult<1> {
    const {remaining} = this;
    const min = Math.floor(remaining / 60000);
    const sec = pad(min, Math.floor((remaining / 1000) % 60));
    const hun = pad(true, Math.floor((remaining % 1000) / 10));
    return html`${min ? `${min}:${sec}` : `${sec}.${hun}`}`;
  }

  private start(): void {
    this.end = Date.now() + this.remaining;
    this.tick();
  }

  private pause(): void {
    this.end = null;
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
}

declare global {
  interface HTMLElementTagNameMap {
    'game-timer': GameTimer;
  }
}
