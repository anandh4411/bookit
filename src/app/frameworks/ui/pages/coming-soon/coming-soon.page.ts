import { Component } from '@angular/core';
import { LucideAngularModule, RocketIcon } from 'lucide-angular';

@Component({
  selector: 'app-coming-soon-page',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './coming-soon.page.html',
  styleUrl: './coming-soon.page.scss',
})
export class ComingSoonPage {
  readonly RocketIcon = RocketIcon;
}
