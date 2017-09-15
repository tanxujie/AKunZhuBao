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
    //this.load();
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

  /*
  _mergeDefaults(defaults: any) {
    for (let k in defaults) {
      if (!(k in this.settings)) {
        this.settings[k] = defaults[k];
      }
    }
    return this.setAll(this.settings);
  }

  merge(settings: any) {
    for (let k in settings) {
      this.settings[k] = settings[k];
    }
    return this.save();
  }*/

  public setValue(key: string, value: any) {
    this.settings[key] = value;
    this.storage.set(this.SETTINGS_KEY, this.settings);
    /*
    this.storage.get(this.SETTINGS_KEY).then(settings => {
      if (!settings) {
        settings = {};
      }
      settings[key] = value;
      this.storage.set(this.SETTINGS_KEY, settings);
    }, err=>console.log(err)).catch(ex => console.log(ex));
    */
  }

  public setAll(value: any) {
    this.settings = value;
    this.storage.set(this.SETTINGS_KEY, this.settings);
  }

  public getValue(key: string) {
    return this.settings[key];
    /*
    return this.storage.get(this.SETTINGS_KEY)
      .then(settings => {
        if (settings) {
          return settings[key];
        } else {
          return null;
        }
      });*/
  }

  clear() {
    this.settings = {};
    this.storage.remove(this.SETTINGS_KEY);
  }

  /*
  save() {
    return this.setAll(this.settings);
  }

  get allSettings() {
    return this.settings;
  }*/
}