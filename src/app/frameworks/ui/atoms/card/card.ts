import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [NgClass],
  template: `
    <div [ngClass]="computedClasses" (click)="onCardClick()">
      <ng-content></ng-content>
    </div>
  `,
  styles: ``,
})
export class Card {
  @Input() customClass = '';
  @Input() rounded: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'xl';
  @Input() shadow: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'sm';
  @Output() cardClick = new EventEmitter<void>();

  // merge default + custom classes dynamically
  get computedClasses(): string {
    return `
      bg-base-100
      rounded-${this.rounded}
      shadow-${this.shadow}
      border border-base-200
      hover:shadow-md
      transition-shadow
      overflow-hidden
      ${this.customClass}
    `
      .replace(/\s+/g, ' ')
      .trim();
  }

  onCardClick(): void {
    this.cardClick.emit();
  }
}
