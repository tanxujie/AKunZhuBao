import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class Settings {
  private SETTINGS_KEY: string = '_settings';
  settings: any;

  constructor(public storage: Storage) {
  }

  load() {
    return this.storage.get(this.SETTINGS_KEY).then((val) => {
      if (val) {
        this.settings = val;
      } else {
        this.settings = {};
      }
    }, err => console.log(err)).catch(err => console.log(err));
  }

  public setValue(key: string, value: any) {
    this.settings[key] = value;
    this.storage.set(this.SETTINGS_KEY, this.settings);
  }

  public setAll(value: any) {
    this.settings = value;
    this.storage.set(this.SETTINGS_KEY, this.settings);
  }

  public getValue(key: string) {
    return this.settings[key];
  }

  clear() {
    this.settings = {};
    this.storage.remove(this.SETTINGS_KEY);
  }
}