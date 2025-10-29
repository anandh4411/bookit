import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../../../core/services/booking.service';
import {
  TheaterLayout,
  Row,
  SeatType,
  ScreenSize,
  SCREEN_CONFIGS,
  generateSeatsFromRows,
} from '../../../../core/models/theater.models';
import { Save, Plus, Trash2, Eye, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-layout-creator',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './layout-creator.page.html',
  styleUrl: './layout-creator.page.scss',
})
export class LayoutCreatorPage implements OnInit {
  // Icons
  Save = Save;
  Plus = Plus;
  Trash2 = Trash2;
  Eye = Eye;

  // Form data
  layoutName: string = '';
  movieName: string = '';
  showTime: string = '19:00';
  language: string = 'English';
  genre: string = 'Action';
  screenSize: ScreenSize = ScreenSize.MEDIUM;
  rows: Row[] = [];

  // Enums for template
  SeatType = SeatType;
  ScreenSize = ScreenSize;
  SCREEN_CONFIGS = SCREEN_CONFIGS;

  // Seat type options
  seatTypes = [
    { value: SeatType.STANDARD, label: 'Standard', color: 'bg-blue-500' },
    { value: SeatType.PREMIUM, label: 'Premium', color: 'bg-purple-500' },
    { value: SeatType.VIP, label: 'VIP', color: 'bg-amber-500' },
    { value: SeatType.RECLINER, label: 'Recliner', color: 'bg-rose-500' },
  ];

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.initializeDefaultRows();
  }

  initializeDefaultRows(): void {
    const config = SCREEN_CONFIGS[this.screenSize];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    this.rows = [];
    for (let i = 0; i < Math.min(config.rows, 8); i++) {
      this.rows.push({
        label: alphabet[i],
        seatCount: config.maxSeatsPerRow,
        type: i < 2 ? SeatType.VIP : i < 5 ? SeatType.PREMIUM : SeatType.STANDARD,
        price: i < 2 ? 350 : i < 5 ? 250 : 150,
        aisleAfter: [
          Math.floor(config.maxSeatsPerRow / 3),
          Math.floor((config.maxSeatsPerRow * 2) / 3),
        ],
      });
    }
  }

  onScreenSizeChange(): void {
    this.initializeDefaultRows();
  }

  addRow(): void {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const config = SCREEN_CONFIGS[this.screenSize];
    const nextLabel = alphabet[this.rows.length];

    if (this.rows.length < config.rows && nextLabel) {
      this.rows.push({
        label: nextLabel,
        seatCount: config.maxSeatsPerRow,
        type: SeatType.STANDARD,
        price: 150,
        aisleAfter: [
          Math.floor(config.maxSeatsPerRow / 3),
          Math.floor((config.maxSeatsPerRow * 2) / 3),
        ],
      });
    }
  }

  removeRow(index: number): void {
    this.rows.splice(index, 1);
    // Relabel rows
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.rows.forEach((row, i) => {
      row.label = alphabet[i];
    });
  }

  getSeatTypeColor(type: SeatType): string {
    return this.seatTypes.find((t) => t.value === type)?.color || 'bg-gray-500';
  }

  previewLayout(): void {
    // Generate preview seats
    const seats = generateSeatsFromRows(this.rows);
    console.log('Preview seats:', seats);
  }

  saveLayout(): void {
    if (!this.layoutName.trim()) {
      alert('Please enter a layout name');
      return;
    }

    if (!this.movieName.trim()) {
      alert('Please enter a movie name');
      return;
    }

    if (this.rows.length === 0) {
      alert('Please add at least one row');
      return;
    }

    const layout: TheaterLayout = {
      id: `layout-${Date.now()}`,
      name: this.layoutName,
      screenSize: this.screenSize,
      rows: this.rows,
      seats: generateSeatsFromRows(this.rows),
      createdAt: new Date(),
    };

    // Create show with this layout
    const show = {
      id: `show-${Date.now()}`,
      movieName: this.movieName,
      theaterLayout: layout,
      showTime: this.showTime,
      showDate: new Date(),
      language: this.language,
      genre: this.genre,
    };

    this.bookingService.addShow(show);
    alert('Layout saved successfully!');
    this.router.navigate(['/shows']);
  }

  getTotalSeats(): number {
    return this.rows.reduce((total, row) => total + row.seatCount, 0);
  }

  updateAisleAfter(row: Row, value: string): void {
    const numbers = value
      .split(',')
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n));
    row.aisleAfter = numbers;
  }

  getAisleAfterString(row: Row): string {
    return row.aisleAfter?.join(', ') || '';
  }
}
