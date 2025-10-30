import { Component, Input } from '@angular/core';
import { LucideAngularModule, Clapperboard } from 'lucide-angular';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="flex items-center gap-3 cursor-pointer">
      <lucide-icon [img]="Clapperboard" class="w-6 h-6 text-primary"></lucide-icon>
      <span class="text-xl font-semibold text-base-content">{{ appName }}</span>
    </div>
  `,
})
export class Logo {
  @Input() appName = 'BookIt';
  readonly Clapperboard = Clapperboard;
}
