export default class GameSettingsStorage {
  public get players(): number {
    return +(localStorage.getItem('sh_settings_players') ?? 3);
  }

  public set players(number: number) {
    if (number < this.spies) {
      this.spies = number;
    }
    localStorage.setItem('sh_settings_players', number.toString());
  }

  public get spies(): number {
    return +(localStorage.getItem('sh_settings_spies') ?? 1);
  }

  public set spies(number: number) {
    localStorage.setItem('sh_settings_spies', number.toString());
  }

  public get time(): number {
    return +(localStorage.getItem('sh_settings_time') ?? 1);
  }

  public set time(number: number) {
    localStorage.setItem('sh_settings_time', number.toString());
  }

  public get word(): string | null {
    return localStorage.getItem('sh_settings_word');
  }

  public set word(_word: string | null) {
    if (_word != null) {
      localStorage.setItem('sh_settings_word', _word);
    }
  }
}
