import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService } from '../../../../core/services/booking.service';
import { MovieShow } from '../../../../core/models/theater.models';
import { Eye, Trash2, Calendar, Clock, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-shows-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './shows-list.page.html',
  styleUrl: './shows-list.page.scss',
})
export class ShowsListPage implements OnInit {
  shows: MovieShow[] = [];
  Eye = Eye;
  Trash2 = Trash2;
  Calendar = Calendar;
  Clock = Clock;

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.loadShows();
  }

  loadShows(): void {
    this.bookingService.shows$.subscribe((shows) => {
      this.shows = shows;
    });
  }

  viewShow(showId: string): void {
    this.router.navigate(['/seat-selection', showId]);
  }

  deleteShow(showId: string): void {
    if (confirm('Are you sure you want to delete this show?')) {
      this.bookingService.deleteShow(showId);
    }
  }

  createNewLayout(): void {
    this.router.navigate(['/layout-creator']);
  }

  getAvailableSeatsCount(show: MovieShow): number {
    return show.theaterLayout.seats.filter((seat) => seat.status === 'available').length;
  }

  getBookedSeatsCount(show: MovieShow): number {
    return show.theaterLayout.seats.filter((seat) => seat.status === 'booked').length;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
