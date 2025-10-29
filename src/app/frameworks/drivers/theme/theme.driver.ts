import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { themeChange } from 'theme-change';

@Injectable({
  providedIn: 'root',
})
export class ThemeDriver {
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      themeChange(); // Initialize theme-change for DaisyUI
    }
  }

  applyTheme(theme: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        document.documentElement.setAttribute('data-theme', theme);
      } catch (error) {
        console.error('Failed to apply theme:', error);
        document.documentElement.setAttribute('data-theme', 'vision-light'); // Updated fallback
      }
    }
  }
}
