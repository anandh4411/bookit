import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [],
  template: `
    <div class="stat p-4">
      <div class="stat-title text-xs">{{ title }}</div>
      <div [class]="valueClass">{{ value }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCard {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: string | number;
  @Input() variant: 'default' | 'primary' | 'success' | 'error' = 'default';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  private static readonly SIZE_MAP = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  } as const;

  private static readonly VARIANT_MAP = {
    default: '',
    primary: 'text-primary',
    success: 'text-success',
    error: 'text-error',
  } as const;

  get valueClass(): string {
    const base = 'stat-value font-bold';
    const size = StatCard.SIZE_MAP[this.size];
    const variant = StatCard.VARIANT_MAP[this.variant];
    return `${base} ${size} ${variant}`;
  }
}
