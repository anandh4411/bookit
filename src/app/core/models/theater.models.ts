// Theater Layout Models

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: SeatType;
  price: number;
  status: SeatStatus;
  isAisle?: boolean;
}

export enum SeatType {
  STANDARD = 'standard',
  PREMIUM = 'premium',
  VIP = 'vip',
  RECLINER = 'recliner',
}

export enum SeatStatus {
  AVAILABLE = 'available',
  BOOKED = 'booked',
  SELECTED = 'selected',
}

export interface Row {
  label: string;
  seatCount: number;
  type: SeatType;
  price: number;
  aisleAfter?: number[]; // Seat numbers after which to add aisle
}

export interface TheaterLayout {
  id: string;
  name: string;
  screenSize: ScreenSize;
  rows: Row[];
  seats: Seat[];
  createdAt: Date;
}

export enum ScreenSize {
  SMALL = 'small', // 10x8
  MEDIUM = 'medium', // 15x10
  LARGE = 'large', // 20x12
}

export interface MovieShow {
  id: string;
  movieName: string;
  theaterLayout: TheaterLayout;
  showTime: string;
  showDate: Date;
  language: string;
  genre: string;
  posterUrl?: string;
}

export interface Booking {
  id: string;
  showId: string;
  movieName: string;
  seats: Seat[];
  totalPrice: number;
  showTime: string;
  showDate: Date;
  bookingDate: Date;
  qrCode?: string;
}

// Helper function to generate seats from rows
export function generateSeatsFromRows(rows: Row[]): Seat[] {
  const seats: Seat[] = [];

  rows.forEach((row) => {
    for (let i = 1; i <= row.seatCount; i++) {
      const seatId = `${row.label}${i}`;
      const isAisle = row.aisleAfter?.includes(i) || false;

      seats.push({
        id: seatId,
        row: row.label,
        number: i,
        type: row.type,
        price: row.price,
        status: SeatStatus.AVAILABLE,
        isAisle,
      });
    }
  });

  return seats;
}

// Screen size configurations
export const SCREEN_CONFIGS = {
  [ScreenSize.SMALL]: { rows: 10, maxSeatsPerRow: 8 },
  [ScreenSize.MEDIUM]: { rows: 15, maxSeatsPerRow: 10 },
  [ScreenSize.LARGE]: { rows: 20, maxSeatsPerRow: 12 },
};
