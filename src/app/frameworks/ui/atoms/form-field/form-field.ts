import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-form-field',
  imports: [NgIf, NgFor, FormsModule],
  template: `
    <div class="form-control">
      <label *ngIf="label" class="label">
        <span [class]="labelClass">{{ label }}</span>
      </label>

      <input
        *ngIf="type !== 'select'"
        [type]="type"
        [(ngModel)]="value"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [min]="min"
        [max]="max"
        [class]="inputClass"
        (ngModelChange)="valueChange.emit($event)"
      />

      <select
        *ngIf="type === 'select'"
        [(ngModel)]="value"
        [disabled]="disabled"
        [class]="selectClass"
        (ngModelChange)="valueChange.emit($event)"
      >
        <ng-content />
      </select>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormField {
  @Input() label?: string;
  @Input() type: 'text' | 'number' | 'time' | 'select' = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() size: 'sm' | 'md' = 'md';
  @Input() min?: number;
  @Input() max?: number;
  @Input() value: any = '';
  @Output() valueChange = new EventEmitter<any>();

  get labelClass(): string {
    return this.size === 'sm' ? 'label-text text-xs' : 'label-text font-semibold';
  }

  get inputClass(): string {
    const base = 'input input-bordered';
    const sizeClass = this.size === 'sm' ? 'input-sm' : '';
    return `${base} ${sizeClass}`;
  }

  get selectClass(): string {
    const base = 'select select-bordered';
    const sizeClass = this.size === 'sm' ? 'select-sm' : '';
    return `${base} ${sizeClass}`;
  }
}
