import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Header } from '../../organisms/header/header';
import { Sidebar, UserProfile, NavItemData } from '../../organisms/sidebar/sidebar';
import { LayoutGrid, PlusCircle, Eye } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Sidebar],
  templateUrl: './dashboard.layout.html',
  styleUrl: './dashboard.layout.scss',
})
export class DashboardLayout implements OnInit {
  // User profile - Admin user for BookMyShow
  userProfile: UserProfile = {
    name: 'Admin User',
    location: 'Theater Manager',
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    posts: 0,
    followers: '0',
    following: 0,
  };

  // Navigation items for BookMyShow Admin
  navItems: NavItemData[] = [
    { icon: LayoutGrid, label: 'Shows List', href: '/shows' },
    { icon: PlusCircle, label: 'Create Layout', href: '/layout-creator' },
    { icon: Eye, label: 'Preview', href: '/seat-selection/demo' },
  ];

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // RouterLinkActive handles active state
  }

  // ========== EVENT HANDLERS ==========

  onSearchChange(query: string): void {
    if (query.trim()) {
      // Could search through movies/shows
      console.log('Search query:', query);
    }
  }

  onCreatePost(): void {
    // Navigate to create new show layout
    this.router.navigate(['/layout-creator']);
  }

  onMessagesClick(): void {
    console.log('Messages clicked');
  }

  onProfileClick(): void {
    console.log('Profile clicked');
  }

  onLogout(): void {
    console.log('Logout clicked');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      sessionStorage.clear();
    }
    this.router.navigate(['/shows']);
  }
}
