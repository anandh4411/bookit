import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService } from '../../../../core/services/booking.service';
import { MovieShow } from '../../../../core/models/theater.models';
import { Eye, Trash2, Clock, Edit, Copy, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-shows-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './shows-list.page.html',
  styleUrl: './shows-list.page.scss',
})
export class ShowsListPage implements OnInit {
  shows: MovieShow[] = [];

  // Icons
  Eye = Eye;
  Trash2 = Trash2;
  Clock = Clock;
  Edit = Edit;
  Copy = Copy;

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.loadShows();
  }

  loadShows(): void {
    this.bookingService.shows$.subscribe((shows) => {
      this.shows = shows;
    });
  }

  createNewLayout(): void {
    this.router.navigate(['/layout-creator']);
  }

  editLayout(showId: string): void {
    // Navigate to edit mode (you'll implement this)
    this.router.navigate(['/layout-creator', showId]);
  }

  viewShow(showId: string): void {
    this.router.navigate(['/seat-selection', showId]);
  }

  duplicateLayout(showId: string): void {
    const show = this.bookingService.getShowById(showId);
    if (show) {
      const duplicated = {
        ...show,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        movieName: `${show.movieName} (Copy)`,
        theaterLayout: {
          ...show.theaterLayout,
          id: `layout-${Date.now()}`,
          name: `${show.theaterLayout.name} (Copy)`,
        },
      };
      this.bookingService.addShow(duplicated);
    }
  }

  deleteShow(showId: string): void {
    if (confirm('Delete this layout? This action cannot be undone.')) {
      this.bookingService.deleteShow(showId);
    }
  }

  getTotalSeatsCount(show: MovieShow): number {
    return show.theaterLayout.seats.length;
  }

  getAvailableSeatsCount(show: MovieShow): number {
    return show.theaterLayout.seats.filter((seat) => seat.status === 'available').length;
  }

  getBookedSeatsCount(show: MovieShow): number {
    return show.theaterLayout.seats.filter((seat) => seat.status === 'booked').length;
  }
}
