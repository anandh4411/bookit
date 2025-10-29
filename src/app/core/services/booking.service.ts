import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  MovieShow,
  TheaterLayout,
  Booking,
  Seat,
  SeatStatus,
  generateSeatsFromRows,
} from '../models/theater.models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly STORAGE_KEY_SHOWS = 'bookit_shows';
  private readonly STORAGE_KEY_BOOKINGS = 'bookit_bookings';
  private readonly storageService = inject(StorageService);

  private showsSubject = new BehaviorSubject<MovieShow[]>(this.loadShows());
  public shows$ = this.showsSubject.asObservable();

  private bookingsSubject = new BehaviorSubject<Booking[]>(this.loadBookings());
  public bookings$ = this.bookingsSubject.asObservable();

  constructor() {}

  // ========== SHOWS MANAGEMENT ==========

  getShows(): MovieShow[] {
    return this.showsSubject.value;
  }

  getShowById(id: string): MovieShow | undefined {
    return this.showsSubject.value.find((show) => show.id === id);
  }

  addShow(show: MovieShow): void {
    const shows = [...this.showsSubject.value, show];
    this.saveShows(shows);
    this.showsSubject.next(shows);
  }

  updateShow(id: string, updates: Partial<MovieShow>): void {
    const shows = this.showsSubject.value.map((show) =>
      show.id === id ? { ...show, ...updates } : show
    );
    this.saveShows(shows);
    this.showsSubject.next(shows);
  }

  deleteShow(id: string): void {
    const shows = this.showsSubject.value.filter((show) => show.id !== id);
    this.saveShows(shows);
    this.showsSubject.next(shows);
  }

  // ========== SEAT BOOKING ==========

  bookSeats(showId: string, seatIds: string[]): Booking | null {
    const show = this.getShowById(showId);
    if (!show) return null;

    // Update seat statuses
    const updatedSeats = show.theaterLayout.seats.map((seat) =>
      seatIds.includes(seat.id) ? { ...seat, status: SeatStatus.BOOKED } : seat
    );

    // Update the show
    this.updateShow(showId, {
      theaterLayout: {
        ...show.theaterLayout,
        seats: updatedSeats,
      },
    });

    // Create booking
    const bookedSeats = updatedSeats.filter((seat) => seatIds.includes(seat.id));
    const totalPrice = bookedSeats.reduce((sum, seat) => sum + seat.price, 0);

    const booking: Booking = {
      id: this.generateId(),
      showId,
      movieName: show.movieName,
      seats: bookedSeats,
      totalPrice,
      showTime: show.showTime,
      showDate: show.showDate,
      bookingDate: new Date(),
      qrCode: this.generateQRCode(bookedSeats),
    };

    const bookings = [...this.bookingsSubject.value, booking];
    this.saveBookings(bookings);
    this.bookingsSubject.next(bookings);

    return booking;
  }

  getBookingsByShow(showId: string): Booking[] {
    return this.bookingsSubject.value.filter((booking) => booking.showId === showId);
  }

  // ========== LAYOUT CREATION ==========

  createTheaterLayout(layout: TheaterLayout): void {
    // Generate seats from rows
    layout.seats = generateSeatsFromRows(layout.rows);

    // For demo, create a show with this layout
    const show: MovieShow = {
      id: this.generateId(),
      movieName: 'Demo Movie',
      theaterLayout: layout,
      showTime: '7:00 PM',
      showDate: new Date(),
      language: 'English',
      genre: 'Action',
    };

    this.addShow(show);
  }

  // ========== HELPER METHODS ==========

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateQRCode(seats: Seat[]): string {
    // Generate a simple text-based "QR code" for demo
    const seatNumbers = seats.map((s) => s.id).join(',');
    return `BOOKIT-${Date.now()}-${seatNumbers}`;
  }

  // ========== LOCAL STORAGE ==========

  private loadShows(): MovieShow[] {
    try {
      const data = this.storageService.getItem(this.STORAGE_KEY_SHOWS);
      if (data) {
        const shows = JSON.parse(data);
        // Convert date strings back to Date objects
        return shows.map((show: any) => ({
          ...show,
          showDate: new Date(show.showDate),
          theaterLayout: {
            ...show.theaterLayout,
            createdAt: new Date(show.theaterLayout.createdAt),
          },
        }));
      }
    } catch (error) {
      console.error('Error loading shows:', error);
    }
    return this.getDefaultShows();
  }

  private saveShows(shows: MovieShow[]): void {
    try {
      this.storageService.setItem(this.STORAGE_KEY_SHOWS, JSON.stringify(shows));
    } catch (error) {
      console.error('Error saving shows:', error);
    }
  }

  private loadBookings(): Booking[] {
    try {
      const data = this.storageService.getItem(this.STORAGE_KEY_BOOKINGS);
      if (data) {
        const bookings = JSON.parse(data);
        return bookings.map((booking: any) => ({
          ...booking,
          showDate: new Date(booking.showDate),
          bookingDate: new Date(booking.bookingDate),
        }));
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
    return [];
  }

  private saveBookings(bookings: Booking[]): void {
    try {
      this.storageService.setItem(this.STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    } catch (error) {
      console.error('Error saving bookings:', error);
    }
  }

  // ========== DEFAULT DATA ==========

  private getDefaultShows(): MovieShow[] {
    const moviePosters = [
      'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/5082566/pexels-photo-5082566.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=400',
    ];

    return [
      {
        id: 'demo-1',
        movieName: 'Avengers: Endgame',
        showTime: '7:00 PM',
        showDate: new Date(),
        language: 'English',
        genre: 'Action',
        posterUrl: moviePosters[0],
        theaterLayout: {
          id: 'layout-1',
          name: 'Screen 1',
          screenSize: 'medium' as any,
          rows: [
            { label: 'A', seatCount: 10, type: 'vip' as any, price: 350, aisleAfter: [3, 7] },
            { label: 'B', seatCount: 10, type: 'vip' as any, price: 350, aisleAfter: [3, 7] },
            { label: 'C', seatCount: 10, type: 'premium' as any, price: 250, aisleAfter: [3, 7] },
            { label: 'D', seatCount: 10, type: 'premium' as any, price: 250, aisleAfter: [3, 7] },
            { label: 'E', seatCount: 10, type: 'premium' as any, price: 250, aisleAfter: [3, 7] },
            { label: 'F', seatCount: 10, type: 'standard' as any, price: 150, aisleAfter: [3, 7] },
            { label: 'G', seatCount: 10, type: 'standard' as any, price: 150, aisleAfter: [3, 7] },
            { label: 'H', seatCount: 10, type: 'standard' as any, price: 150, aisleAfter: [3, 7] },
          ],
          seats: [],
          createdAt: new Date(),
        },
      },
    ];
  }

  clearAllData(): void {
    this.storageService.removeItem(this.STORAGE_KEY_SHOWS);
    this.storageService.removeItem(this.STORAGE_KEY_BOOKINGS);
    this.showsSubject.next(this.getDefaultShows());
    this.bookingsSubject.next([]);
  }
}
