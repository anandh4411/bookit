import { Component, signal, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  X,
  Check,
  Heart,
  MessageCircle,
  UserPlus,
  Bell,
} from 'lucide-angular';

interface Notification {
  id: number;
  type: 'like' | 'comment' | 'follow' | 'system';
  user: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  message: string;
  timeAgo: string;
  isRead: boolean;
  postThumbnail?: string;
}

@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="relative">
      <!-- Bell Button -->
      <button
        (click)="toggleDropdown()"
        class="relative text-gray-700 hover:text-gray-900 dark:text-neutral-200 dark:hover:text-neutral-100 transition-colors cursor-pointer flex items-center justify-center"
        [class.text-primary]="isOpen()"
      >
        <lucide-icon [img]="Bell" class="w-6 h-6"></lucide-icon>
        @if (unreadCount() > 0) {
        <span
          class="absolute -top-2 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
        >
          {{ unreadCount() > 9 ? '9+' : unreadCount() }}
        </span>
        }
      </button>

      <!-- Dropdown Panel -->
      @if (isOpen()) {
      <div
        class="absolute right-0 mt-3 w-96 bg-base-100 rounded-2xl shadow-2xl border border-base-300 z-50 overflow-hidden"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-base-300">
          <h3 class="font-semibold text-base text-base-content">Notifications</h3>
          <div class="flex items-center gap-2">
            @if (unreadCount() > 0) {
            <button
              (click)="markAllAsRead()"
              class="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
            >
              <lucide-icon [img]="Check" class="w-3.5 h-3.5"></lucide-icon>
              Mark all read
            </button>
            }
            <button
              (click)="closeDropdown()"
              class="text-base-content/40 hover:text-base-content/60 transition-colors"
            >
              <lucide-icon [img]="X" class="w-4 h-4"></lucide-icon>
            </button>
          </div>
        </div>

        <!-- Notifications List -->
        <div class="max-h-[500px] overflow-y-auto custom-scrollbar">
          @if (notifications().length === 0) {
          <div class="flex flex-col items-center justify-center py-12 px-4">
            <div class="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mb-4">
              <lucide-icon [img]="Bell" class="w-8 h-8 text-base-content/30"></lucide-icon>
            </div>
            <p class="text-base-content/60 text-sm text-center">No notifications yet</p>
            <p class="text-base-content/40 text-xs text-center mt-1">
              We'll notify you when something arrives
            </p>
          </div>
          } @else { @for (notification of notifications(); track notification.id) {
          <div
            class="flex items-start gap-3 p-4 hover:bg-base-200/50 transition-colors cursor-pointer border-b border-base-300 last:border-b-0"
            [class.bg-base-200/30]="!notification.isRead"
            (click)="markAsRead(notification.id)"
          >
            <!-- Avatar/Icon -->
            <div class="flex-shrink-0 relative">
              @if (notification.user.avatar) {
              <img
                [src]="notification.user.avatar"
                [alt]="notification.user.name"
                class="w-10 h-10 rounded-full object-cover"
              />
              } @else {
              <div
                class="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center"
              >
                <span class="text-white text-sm font-semibold">{{
                  notification.user.initials
                }}</span>
              </div>
              }

              <!-- Type Icon Badge -->
              <div
                class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-md"
                [class.bg-red-500]="notification.type === 'like'"
                [class.bg-blue-500]="notification.type === 'comment'"
                [class.bg-green-500]="notification.type === 'follow'"
                [class.bg-gray-500]="notification.type === 'system'"
              >
                @if (notification.type === 'like') {
                <lucide-icon [img]="Heart" class="w-3 h-3 text-white" [strokeWidth]="2"></lucide-icon>
                } @else if (notification.type === 'comment') {
                <lucide-icon [img]="MessageCircle" class="w-3 h-3 text-white" [strokeWidth]="2"></lucide-icon>
                } @else if (notification.type === 'follow') {
                <lucide-icon [img]="UserPlus" class="w-3 h-3 text-white" [strokeWidth]="2"></lucide-icon>
                } @else {
                <lucide-icon [img]="Bell" class="w-3 h-3 text-white" [strokeWidth]="2"></lucide-icon>
                }
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <p class="text-sm text-base-content leading-relaxed">
                <span class="font-semibold">{{ notification.user.name }}</span>
                {{ notification.message }}
              </p>
              <p class="text-xs text-base-content/50 mt-1">{{ notification.timeAgo }}</p>
            </div>

            <!-- Post Thumbnail (if exists) -->
            @if (notification.postThumbnail) {
            <div class="flex-shrink-0">
              <img
                [src]="notification.postThumbnail"
                alt="Post"
                class="w-12 h-12 rounded-lg object-cover"
              />
            </div>
            }

            <!-- Unread Indicator -->
            @if (!notification.isRead) {
            <div class="flex-shrink-0 mt-2">
              <div class="w-2 h-2 bg-primary rounded-full"></div>
            </div>
            }
          </div>
          } }
        </div>

        <!-- Footer -->
        @if (notifications().length > 0) {
        <div class="p-3 border-t border-base-300 bg-base-200/30">
          <button
            class="w-full text-center text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View all notifications
          </button>
        </div>
        }
      </div>
      }
    </div>
  `,
  styles: `
    /* Custom Scrollbar */
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: oklch(var(--bc) / 0.2);
      border-radius: 3px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: oklch(var(--bc) / 0.3);
    }

    /* Smooth Animations */
    :host {
      display: block;
    }
  `,
})
export class NotificationDropdown {
  private elementRef = inject(ElementRef);

  // Lucide Icons
  readonly Bell = Bell;
  readonly X = X;
  readonly Check = Check;
  readonly Heart = Heart;
  readonly MessageCircle = MessageCircle;
  readonly UserPlus = UserPlus;

  // State
  isOpen = signal(false);

  // Mock notifications - replace with real data from service
  notifications = signal<Notification[]>([
    {
      id: 1,
      type: 'like',
      user: {
        name: 'Sarah Johnson',
        avatar:
          'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      message: 'liked your post',
      timeAgo: '2 minutes ago',
      isRead: false,
      postThumbnail:
        'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      id: 2,
      type: 'comment',
      user: {
        name: 'Mike Chen',
        avatar:
          'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      message: 'commented on your post: "This is amazing! 🔥"',
      timeAgo: '15 minutes ago',
      isRead: false,
      postThumbnail:
        'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      id: 3,
      type: 'follow',
      user: {
        name: 'Emma Wilson',
        initials: 'EW',
      },
      message: 'started following you',
      timeAgo: '1 hour ago',
      isRead: false,
    },
    {
      id: 4,
      type: 'like',
      user: {
        name: 'David Park',
        avatar:
          'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      message: 'and 12 others liked your post',
      timeAgo: '3 hours ago',
      isRead: true,
      postThumbnail:
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      id: 5,
      type: 'system',
      user: {
        name: 'BookIt',
        initials: 'VE',
      },
      message: 'Your post reached 1,000 views! 🎉',
      timeAgo: '1 day ago',
      isRead: true,
    },
  ]);

  // Computed unread count
  unreadCount = signal(this.notifications().filter((n) => !n.isRead).length);

  toggleDropdown(): void {
    this.isOpen.update((value) => !value);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  markAsRead(id: number): void {
    this.notifications.update((notifications) =>
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    this.updateUnreadCount();
  }

  markAllAsRead(): void {
    this.notifications.update((notifications) =>
      notifications.map((n) => ({ ...n, isRead: true }))
    );
    this.updateUnreadCount();
  }

  private updateUnreadCount(): void {
    this.unreadCount.set(this.notifications().filter((n) => !n.isRead).length);
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  // Close dropdown on Escape key
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeDropdown();
  }
}
