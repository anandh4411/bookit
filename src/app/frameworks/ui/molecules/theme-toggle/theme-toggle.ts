import { Component, inject, computed } from '@angular/core';
import { ThemeService } from '../../../drivers/theme/theme.service';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';

@Component({
  selector: 'app-theme-toggle',
  imports: [LucideAngularModule],
  template: `
    <button
      type="button"
      (click)="toggleTheme()"
      class="hs-dark-mode font-medium text-base-content rounded-full hover:bg-base-200 focus:outline-none focus:bg-base-200 transition-colors"
    >
      <span class="inline-flex shrink-0 justify-center items-center size-9 cursor-pointer">
        @if (isLightMode()) {
        <lucide-icon [img]="Moon"></lucide-icon>
        } @else {
        <lucide-icon [img]="Sun"></lucide-icon>
        }
      </span>
    </button>
  `,
  styles: ``,
})
export class ThemeToggle {
  protected readonly themeService = inject(ThemeService);

  // Lucide Icons
  readonly Moon = Moon;
  readonly Sun = Sun;

  // Computed signal for better reactivity
  isLightMode = computed(() => this.themeService.currentTheme() === 'vision-light');

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
