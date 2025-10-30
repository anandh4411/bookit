import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [NgClass],
  template: `
    <div [ngClass]="cardClasses">
      <ng-content />
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  @Input() variant: 'default' | 'hover' | 'flat' = 'default';
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

  private static readonly VARIANT_MAP = {
    default: 'bg-base-200 shadow',
    hover: 'bg-base-200 shadow hover:shadow-lg transition-shadow',
    flat: 'bg-base-200',
  } as const;

  private static readonly PADDING_MAP = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  } as const;

  get cardClasses(): string {
    const base = 'card rounded-lg';
    const variant = Card.VARIANT_MAP[this.variant] ?? Card.VARIANT_MAP.default;
    const padding = Card.PADDING_MAP[this.padding] ?? '';
    return `${base} ${variant} ${padding}`;
  }
}
