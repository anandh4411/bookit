# BookIt - Theater Seat Booking System

A modern theater seat booking application built with **Angular 20**, featuring real-time seat selection, layout creation, and booking management.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:4200
```

That's it! The app will open with a demo theater layout ready to use.

## 🎯 What This App Does

**BookIt** is a theater booking system where an admin can:

1. **Browse Shows** - View available movie shows with seat availability.
2. **Create Layouts** - Design custom theater seating arrangements.
3. **Book Seats** - Preview how an end user will select and books seats.

## 📁 Project Structure

```
src/app/
├── core/
│   ├── models/          # Data models (Seat, Theater, Booking)
│   └── services/        # Business logic (BookingService, StorageService)
├── frameworks/ui/
│   ├── atoms/           # Reusable components (Card, FormField, Avatar)
│   ├── molecules/       # Combined components (Modal, Legend)
│   ├── organisms/       # Complex components (Header, Sidebar)
│   ├── pages/           # Full pages (Shows, SeatSelection, LayoutCreator)
│   └── templates/       # Layouts (Dashboard, Auth)
└── assets/              # Styles and images
```

## 🏗️ How I Built This

### Architecture Decisions

I followed **Clean Architecture** and **Atomic Design** principles to keep the code modular and maintainable. I reused my vision engine project's angular 20 boiler plate.

- **Core Layer**: Pure TypeScript models and business logic (no Angular dependencies)
- **Services Layer**: Data management with local storage (mocked backend)
- **UI Layer**: Atomic components from small (atoms) to large (pages)

### Tech Stack

- **Angular 20** - Latest standalone components, and SSR
- **TypeScript** - Strict typing throughout
- **Tailwind CSS + DaisyUI** - Utility-first styling with component library
- **Local Storage** - Mocked backend for data persistence

## Using the App

### 1. Shows List (Home)

- View all available theater layouts
- See seat availability stats
- Quick actions: Edit, Preview, Duplicate, Delete

### 2. Create Layout

- Fill in basic info (movie, theater name, timing)
- Choose screen size
- Configure rows (seats per row, type, price)
- Add aisle spacing
- Preview and save

### 3. Seat Selection Preview

- Visual seat map with color-coded types
- Click to select/deselect seats
- See total price
- Confirm booking
- Get booking confirmation with details

## 🎨 Styling

Theme variables are in `src/assets/styles/variables.scss` and can be easily customized.

## 🔧 Customization

### Change Theme Colors

Edit `src/styles.scss` - update the DaisyUI theme colors:

```scss
--color-primary: oklch(64.1% 0.252 27.5); // Change this
````

### Add New Seat Types

1. Update `SeatType` enum in `theater.models.ts`
2. Add color in `layout-creator.page.ts` seatTypes array
3. Add styling in seat selection SCSS

### Mock Different Data

Edit `getDefaultShows()` in `booking.service.ts` to change demo data.
