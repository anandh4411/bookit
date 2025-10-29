import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  template: `
    <div class="relative">
      <input
        type="search"
        [(ngModel)]="searchQuery"
        (ngModelChange)="onSearchChange($event)"
        [placeholder]="placeholder"
        class="peer py-2.5 sm:py-3 px-4 ps-12 block w-full bg-base-200 border-transparent rounded-lg text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:pointer-events-none transition-all"
      />
      <div
        class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
      >
        <lucide-icon [img]="Search" class="w-4 h-4 text-base-content/40"></lucide-icon>
      </div>
    </div>
  `,
})
export class SearchBar {
  @Input() placeholder = 'Search';
  @Output() searchChange = new EventEmitter<string>();

  readonly Search = Search;
  searchQuery = '';

  onSearchChange(query: string): void {
    this.searchChange.emit(query);
  }
}
