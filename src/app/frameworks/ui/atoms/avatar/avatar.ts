import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-avatar',
  imports: [NgClass],
  template: `
    <img
      role="img"
      [attr.aria-label]="name"
      [ngClass]="avatarClasses"
      [src]="avatar"
      [alt]="name"
      (error)="onImageError($event)"
    />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Avatar {
  @Input({ required: true }) name!: string;
  @Input() avatar?: string;
  @Input() size: 'sm' | 'md' | 'lg' = 'sm';

  private static readonly AVATAR_SIZE_MAP = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  } as const;

  get avatarClasses() {
    const base = 'rounded-full object-cover';
    return `${base} ${Avatar.AVATAR_SIZE_MAP[this.size] ?? Avatar.AVATAR_SIZE_MAP.sm}`;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = `https://dummyimage.com/56x56/e5e5e5/666666?text=${encodeURIComponent(this.name)}`;
  }
}
