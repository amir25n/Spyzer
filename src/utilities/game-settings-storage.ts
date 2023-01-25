export default class GameSettingsStorage {
  public get players(): number {
    return +(localStorage.getItem('settings.players') ?? 3);
  }

  public set players(number: number) {
    if (number < this.spies * 2) {
      this.spies = Math.floor(number / 2);
    }

    // limited to a minimum of 3 and a maximum of 30
    number = Math.max(number, 1);
    number = Math.min(number, 30);

    localStorage.setItem('settings.players', Math.max(number, 3).toString());
  }

  public get spies(): number {
    return +(localStorage.getItem('settings.spies') ?? 1);
  }

  public set spies(number: number) {
    if (Math.ceil(this.players / 2) < number) {
      this.players = number * 2;
    }

    // limited to a minimum of 1 and a maximum of 15
    number = Math.max(number, 1);
    number = Math.min(number, 15);

    localStorage.setItem('settings.spies', number.toString());
  }

  public get time(): number {
    return +(localStorage.getItem('settings.time') ?? 1);
  }

  public set time(number: number) {
    // Round to the next multiple of 5
    number = Math.round(number / 5) * 5;

    // limited to a minimum of 1 and a maximum of 60
    number = Math.max(number, 1);
    number = Math.min(number, 60);

    localStorage.setItem('settings.time', number.toString());
  }

  public get word(): string | null {
    return localStorage.getItem('settings.word');
  }

  public set word(_word: string | null) {
    if (_word != null) {
      localStorage.setItem('settings.word', _word);
    }
  }
}
