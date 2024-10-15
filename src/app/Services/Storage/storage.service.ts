import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage;
  private sessionStorage: Storage;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.storage = this.isLocalStorageAvailable() ? window.localStorage : this.createMemoryStorage();
      this.sessionStorage = this.isSessionStorageAvailable() ? window.sessionStorage : this.createMemoryStorage();
    } else {
      this.storage = this.createMemoryStorage();
      this.sessionStorage = this.createMemoryStorage();
    }
  }

  private isLocalStorageAvailable(): boolean {
    const testKey = '__storage_test__';
    try {
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  private isSessionStorageAvailable(): boolean {
    const testKey = '__session_storage_test__';
    try {
      sessionStorage.setItem(testKey, testKey);
      sessionStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  private createMemoryStorage(): Storage {
    let storage: { [key: string]: string } = {};

    const memoryStorage: Storage = {
      clear: () => {
        storage = {};
      },
      getItem: (key: string) => storage[key] || null,
      key: (index: number) => Object.keys(storage)[index] || null,
      removeItem: (key: string) => {
        delete storage[key];
      },
      setItem: (key: string, value: string) => {
        storage[key] = value;
      },
      get length(): number {
        return Object.keys(storage).length;
      }
    } as Storage;

    return memoryStorage;
  }

  // Méthodes pour localStorage
  setLocalItem(key: string, value: any): void {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    try {
      this.storage.setItem(key, value);
    } catch (e) {
      console.error(`Failed to set item in localStorage: ${e}`);
    }
  }

  getLocalItem(key: string): any {
    const value = this.storage.getItem(key);
    if (value === null) {
      console.warn(`Key "${key}" does not exist in localStorage.`);
      return null;
    }
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  removeLocalItem(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (e) {
      console.error(`Failed to remove item from localStorage: ${e}`);
    }
  }

  clearLocal(): void {
    try {
      this.storage.clear();
    } catch (e) {
      console.error(`Failed to clear localStorage: ${e}`);
    }
  }

  // Méthodes pour sessionStorage
  setSessionItem(key: string, value: any): void {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    try {
      this.sessionStorage.setItem(key, value);
    } catch (e) {
      console.error(`Failed to set item in sessionStorage: ${e}`);
    }
  }

  getSessionItem(key: string): any {
    const value = this.sessionStorage.getItem(key);
    if (value === null) {
      console.warn(`Key "${key}" does not exist in sessionStorage.`);
      return null;
    }
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  removeSessionItem(key: string): void {
    try {
      this.sessionStorage.removeItem(key);
    } catch (e) {
      console.error(`Failed to remove item from sessionStorage: ${e}`);
    }
  }

  clearSession(): void {
    try {
      this.sessionStorage.clear();
    } catch (e) {
      console.error(`Failed to clear sessionStorage: ${e}`);
    }
  }
}