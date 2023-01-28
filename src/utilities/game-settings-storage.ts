export default class GameSettingsStorage {
  static get players(): number {
    return +(localStorage.getItem('settings.players') ?? 3);
  }

  static set players(number: number) {
    if (number < this.spies * 2) {
      this.spies = Math.floor(number / 2);
    }

    // limited to a minimum of 3 and a maximum of 30
    number = Math.max(number, 1);
    number = Math.min(number, 30);

    localStorage.setItem('settings.players', Math.max(number, 3).toString());
  }

  static get spies(): number {
    return +(localStorage.getItem('settings.spies') ?? 1);
  }

  static set spies(number: number) {
    if (Math.floor(this.players / 2) < number) {
      this.players = number * 2;
    }

    // limited to a minimum of 1 and a maximum of 15
    number = Math.max(number, 1);
    number = Math.min(number, 15);

    localStorage.setItem('settings.spies', number.toString());
  }

  static get time(): number {
    return +(localStorage.getItem('settings.time') ?? 1);
  }

  static set time(number: number) {
    // Round to the next multiple of 5
    number = Math.round(number / 5) * 5;

    // limited to a minimum of 1 and a maximum of 60
    number = Math.max(number, 1);
    number = Math.min(number, 60);

    localStorage.setItem('settings.time', number.toString());
  }

  static get word(): string | null {
    return localStorage.getItem('settings.word');
  }

  static set word(_word: string | null) {
    if (_word != null) {
      localStorage.setItem('settings.word', _word);
    }
  }

  static get plan(): string | null {
    return localStorage.getItem('settings.plan');
  }

  static set plan(_plan: string | null) {
    if (_plan != null) {
      localStorage.setItem('settings.plan', _plan);
    }
  }
}
