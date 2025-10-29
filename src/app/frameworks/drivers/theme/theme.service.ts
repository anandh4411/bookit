import { Injectable, NgZone, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { signal, computed } from '@angular/core';
import { ThemeDriver } from './theme.driver';
import { StorageService } from '../../../core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);
  private readonly themeDriver = inject(ThemeDriver);
  private readonly storageService = inject(StorageService);

  public readonly currentTheme = signal('vision-light'); // Updated default theme
  readonly currentThemeSignal = computed(() => this.currentTheme());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.run(() => {
        this.loadCurrentTheme();
        this.setupSystemPreferenceListener();
      });
    }
  }

  public loadCurrentTheme(): void {
    try {
      const savedTheme = this.storageService.getItem('theme');
      if (savedTheme) {
        // Migrate old theme names to new ones
        const migratedTheme = this.migrateThemeName(savedTheme);
        this.currentTheme.set(migratedTheme);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = prefersDark ? 'vision-dark' : 'vision-light';
        this.currentTheme.set(theme);
        this.storageService.setItem('theme', theme);
      }
      this.themeDriver.applyTheme(this.currentTheme());
    } catch (error) {
      console.error('Failed to load or apply theme:', error);
      this.currentTheme.set('vision-light');
      this.themeDriver.applyTheme('vision-light');
    }
  }

  // Migrate old theme names to new ones
  private migrateThemeName(oldTheme: string): string {
    const themeMap: Record<string, string> = {
      'shadcn-light': 'vision-light',
      'shadcn-dark': 'vision-dark',
    };
    return themeMap[oldTheme] || oldTheme;
  }

  public mediaQuery?: MediaQueryList;
  public handleMediaQueryChange = (e: MediaQueryListEvent) => {
    this.zone.run(() => {
      if (!this.storageService.getItem('theme')) {
        const newTheme = e.matches ? 'vision-dark' : 'vision-light';
        this.currentTheme.set(newTheme);
        this.storageService.setItem('theme', newTheme);
        this.themeDriver.applyTheme(newTheme);
      }
    });
  };

  public setupSystemPreferenceListener(): void {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQuery.addEventListener('change', this.handleMediaQueryChange);
  }

  toggleTheme(): void {
    this.zone.run(() => {
      const newTheme = this.currentTheme() === 'vision-light' ? 'vision-dark' : 'vision-light';
      this.currentTheme.set(newTheme);
      this.storageService.setItem('theme', newTheme);
      this.themeDriver.applyTheme(newTheme);
    });
  }
}
