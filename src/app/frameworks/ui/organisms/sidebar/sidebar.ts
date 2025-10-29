import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  ChevronRight,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-angular';
import { NavItem } from '../../molecules/nav-item/nav-item';
import { StorageService } from '../../../../core/services/storage.service';

export interface UserProfile {
  name: string;
  location: string;
  avatar: string;
  posts: number;
  followers: string;
  following: number;
}

export interface NavItemData {
  icon: any;
  label: string;
  href: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, NavItem],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
  @Input({ required: true }) userProfile!: UserProfile;
  @Input() navItems: NavItemData[] = [];
  @Output() profileClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();

  readonly ChevronRight = ChevronRight;
  readonly LogOut = LogOut;
  readonly ChevronsLeft = ChevronsLeft;
  readonly ChevronsRight = ChevronsRight;

  isCollapsed = signal<boolean>(false);

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    const saved = this.storage.getItem('sidebar-collapsed');
    if (saved) this.isCollapsed.set(saved === 'true');
  }

  onProfileClick(): void {
    if (!this.isCollapsed()) this.profileClick.emit();
  }

  onLogout(event: Event): void {
    event.preventDefault();
    this.logoutClick.emit();
  }

  toggleCollapse(): void {
    const newState = !this.isCollapsed();
    this.isCollapsed.set(newState);
    this.storage.setItem('sidebar-collapsed', String(newState));
  }

  get navigationItems(): NavItemData[] {
    return this.navItems;
  }
}
