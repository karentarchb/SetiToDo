import { Injectable } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getBoolean, getValue } from '@angular/fire/remote-config';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {
  private readonly FEATURE_FLAG_KEY = 'featureflag';
  private initialized = false;

  constructor(private remoteConfig: RemoteConfig) {}

  private async ensureInitialized(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      this.remoteConfig.settings = {
        minimumFetchIntervalMillis: 3600000,
        fetchTimeoutMillis: 60000
      };

      this.remoteConfig.defaultConfig = {
        [this.FEATURE_FLAG_KEY]: false
      };

      this.initialized = true;
    } catch (error) {
      console.warn('Remote Config inicialización fallida, usando valores por defecto:', error);
      this.initialized = true;
    }
  }

  async getFeatureFlagValue(): Promise<boolean> {
    try {
      await this.ensureInitialized();

      await fetchAndActivate(this.remoteConfig);
      const value = getValue(this.remoteConfig, this.FEATURE_FLAG_KEY);
      return value.asBoolean();
    } catch (error) {
      console.warn('No se pudo obtener feature flag desde Remote Config, usando valor por defecto (false):', error);
      return false;
    }
  }
}
