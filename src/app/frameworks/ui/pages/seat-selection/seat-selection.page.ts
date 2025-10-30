import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../../core/services/booking.service';
import {
  MovieShow,
  Seat,
  SeatStatus,
  SeatType,
  Booking,
} from '../../../../core/models/theater.models';
import { X, Check, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './seat-selection.page.html',
  styleUrl: './seat-selection.page.scss',
})
export class SeatSelectionPage implements OnInit {
  X = X;
  Check = Check;

  show: MovieShow | null = null;
  selectedSeats: Seat[] = [];
  showModal: boolean = false;
  booking: Booking | null = null;

  // Enums for template
  SeatStatus = SeatStatus;
  SeatType = SeatType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const showId = this.route.snapshot.paramMap.get('showId');
    if (showId) {
      this.loadShow(showId);
    }
  }

  loadShow(showId: string): void {
    this.show = this.bookingService.getShowById(showId) || null;
    if (!this.show) {
      this.router.navigate(['/shows']);
    }
  }

  getSeatsByRow(): Map<string, Seat[]> {
    const seatsByRow = new Map<string, Seat[]>();

    if (this.show) {
      this.show.theaterLayout.seats.forEach((seat) => {
        if (!seatsByRow.has(seat.row)) {
          seatsByRow.set(seat.row, []);
        }
        seatsByRow.get(seat.row)!.push(seat);
      });
    }

    return seatsByRow;
  }

  getRows(): string[] {
    return Array.from(this.getSeatsByRow().keys());
  }

  toggleSeat(seat: Seat): void {
    if (seat.status === SeatStatus.BOOKED) {
      return;
    }

    const index = this.selectedSeats.findIndex((s) => s.id === seat.id);

    if (index > -1) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push(seat);
    }
  }

  isSeatSelected(seat: Seat): boolean {
    return this.selectedSeats.some((s) => s.id === seat.id);
  }

  getSeatClass(seat: Seat): string {
    const baseClass = 'seat';
    const typeClass = this.getSeatTypeClass(seat.type);

    if (seat.status === SeatStatus.BOOKED) {
      return `${baseClass} seat-booked`;
    }

    if (this.isSeatSelected(seat)) {
      return `${baseClass} ${typeClass} seat-selected`;
    }

    return `${baseClass} ${typeClass}`;
  }

  getSeatTypeClass(type: SeatType): string {
    switch (type) {
      case SeatType.VIP:
        return 'seat-vip';
      case SeatType.PREMIUM:
        return 'seat-premium';
      case SeatType.RECLINER:
        return 'seat-recliner';
      default:
        return 'seat-standard';
    }
  }

  getTotalPrice(): number {
    return this.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  }

  // FIX: Add getter for selected seat IDs string
  getSelectedSeatIds(): string {
    return this.selectedSeats.map((s) => s.id).join(', ');
  }

  proceedToBooking(): void {
    if (this.selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    if (!this.show) return;

    const seatIds = this.selectedSeats.map((s) => s.id);
    this.booking = this.bookingService.bookSeats(this.show.id, seatIds);

    if (this.booking) {
      this.showModal = true;
      this.selectedSeats = [];
      this.loadShow(this.show.id);
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.booking = null;
  }

  goBackToShows(): void {
    this.router.navigate(['/shows']);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getSeatTypeLabel(type: SeatType): string {
    switch (type) {
      case SeatType.VIP:
        return 'VIP';
      case SeatType.PREMIUM:
        return 'Premium';
      case SeatType.RECLINER:
        return 'Recliner';
      default:
        return 'Standard';
    }
  }

  getSeatTypesInShow(): { type: SeatType; label: string; price: number }[] {
    if (!this.show) return [];

    const types = new Map<SeatType, number>();
    this.show.theaterLayout.seats.forEach((seat) => {
      if (!types.has(seat.type)) {
        types.set(seat.type, seat.price);
      }
    });

    return Array.from(types.entries()).map(([type, price]) => ({
      type,
      label: this.getSeatTypeLabel(type),
      price,
    }));
  }

  // FIX: Add getter for theater name with safe null check
  getTheaterName(): string {
    return this.show?.theaterLayout?.name || 'Unknown Theater';
  }
}
