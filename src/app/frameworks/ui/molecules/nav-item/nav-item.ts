import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink, RouterLinkActive],
  template: `
    <a
      [routerLink]="href"
      routerLinkActive="nav-active"
      [routerLinkActiveOptions]="{ exact: false }"
      class="nav-item flex items-center px-6 py-3 cursor-pointer transition-all"
      [class.justify-center]="collapsed"
      [class.px-3]="collapsed"
      [title]="collapsed ? label : ''"
    >
      <lucide-icon [img]="icon" class="w-5 h-5 mr-3" [class.!mr-0]="collapsed"></lucide-icon>

      @if (!collapsed) {
      <span>{{ label }}</span>
      }
    </a>
  `,
  styles: [
    `
      :host {
        display: contents;
      }

      .nav-item {
        color: var(--color-text-muted);
        transition: all var(--transition-fast);

        &:hover {
          background-color: var(--color-background-secondary);
          color: var(--color-text);
        }

        &.nav-active {
          color: var(--color-primary);
          background-color: var(--color-primary-light);
          border-right: 2px solid var(--color-primary);
        }
      }
    `,
  ],
})
export class NavItem {
  @Input({ required: true }) icon!: LucideIconData;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) href!: string;
  @Input() collapsed: boolean = false;
}
