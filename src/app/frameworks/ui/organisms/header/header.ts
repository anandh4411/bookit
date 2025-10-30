import { Component, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule, Plus, Send } from 'lucide-angular';
import { Logo } from '../../atoms/logo/logo';
import { SearchBar } from '../../molecules/search-bar/search-bar';
import { ThemeToggle } from '../../molecules/theme-toggle/theme-toggle';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule, Logo, SearchBar, ThemeToggle],
  template: `
    <header class="header bg-base-100 border-b border-base-300 fixed top-0 left-0 right-0 z-50">
      <div class="max-w-[95vw] mx-auto px-4 py-2 flex items-center justify-between">
        <!-- Logo -->
        <app-logo />

        <!-- Search Bar -->
        <div class="flex-1 max-w-xs mx-8">
          <app-search-bar (searchChange)="onSearchChange($event)" />
        </div>

        <!-- Right Actions -->
        <div class="flex items-center space-x-4">
          <button
            (click)="onCreateLayout()"
            class="bg-gradient-vision hover:bg-gradient-vision-hover text-white px-4 py-2 rounded-full text-sm font-medium flex items-center cursor-pointer hover:shadow-lg transition-all"
          >
            <lucide-icon [img]="Plus" class="w-4 h-4 mr-2"></lucide-icon>
            Create new Layout
          </button>

          <app-theme-toggle />
        </div>
      </div>
    </header>
  `,
})
export class Header {
  @Output() searchChange = new EventEmitter<string>();
  @Output() createLayout = new EventEmitter<void>();
  @Output() messagesClick = new EventEmitter<void>();

  readonly Plus = Plus;
  readonly Send = Send;

  onSearchChange(query: string): void {
    this.searchChange.emit(query);
  }

  onCreateLayout(): void {
    this.createLayout.emit();
  }

  onMessagesClick(): void {
    this.messagesClick.emit();
  }
}
