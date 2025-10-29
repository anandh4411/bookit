import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/shows',
    pathMatch: 'full',
  },

  // ========== AUTH ROUTES (No Layout) ==========
  {
    path: '',
    loadComponent: () =>
      import('./frameworks/ui/templates/auth/auth.layout').then((m) => m.AuthLayout),
    children: [],
  },

  // ========== DASHBOARD ROUTES (With Header + Sidebar) ==========
  {
    path: '',
    loadComponent: () =>
      import('./frameworks/ui/templates/dashboard/dashboard.layout').then((m) => m.DashboardLayout),
    children: [
      {
        path: 'shows',
        loadComponent: () =>
          import('./frameworks/ui/pages/shows-list/shows-list.page').then((m) => m.ShowsListPage),
      },
      {
        path: 'layout-creator',
        loadComponent: () =>
          import('./frameworks/ui/pages/layout-creator/layout-creator.page').then(
            (m) => m.LayoutCreatorPage
          ),
      },
      {
        path: 'seat-selection/:showId',
        loadComponent: () =>
          import('./frameworks/ui/pages/seat-selection/seat-selection.page').then(
            (m) => m.SeatSelectionPage
          ),
      },
    ],
  },

  // ========== WILDCARD ==========
  { path: '**', redirectTo: '/shows' },
];
