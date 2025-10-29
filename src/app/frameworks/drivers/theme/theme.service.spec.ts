import { TestBed } from '@angular/core/testing';
import { ThemeDriver } from './theme.driver';
import { ThemeService } from './theme.service';
import { StorageService } from '../../../core/services/storage.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let storageService: StorageService;
  let themeDriver: ThemeDriver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService, StorageService, ThemeDriver],
    });
    service = TestBed.inject(ThemeService);
    storageService = TestBed.inject(StorageService);
    themeDriver = TestBed.inject(ThemeDriver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load the current theme from local storage', () => {
    const mockSavedTheme = 'shadcn-dark';
    spyOn(storageService, 'getItem').and.returnValue(mockSavedTheme);

    service.loadCurrentTheme();

    expect(storageService.getItem).toHaveBeenCalledWith('theme');
    expect(service.currentTheme()).toBe(mockSavedTheme);
  });

  it('should apply the default theme if no saved theme is found', () => {
    spyOn(storageService, 'getItem').and.returnValue(null);
    const mockMediaQuery = { matches: true } as MediaQueryList;
    spyOn(window, 'matchMedia').and.returnValue(mockMediaQuery);

    service.loadCurrentTheme();

    expect(storageService.getItem).toHaveBeenCalledWith('theme');
    expect(service.currentTheme()).toBe('shadcn-dark');
  });

  it('should toggle the theme', () => {
    const mockNewTheme = 'shadcn-light';
    spyOn(storageService, 'setItem');

    service.toggleTheme();
    expect(storageService.setItem).toHaveBeenCalledWith('theme', mockNewTheme);
    expect(service.currentTheme()).toBe(mockNewTheme);

    service.toggleTheme();
    expect(storageService.setItem).toHaveBeenCalledWith('theme', 'shadcn-dark');
    expect(service.currentTheme()).toBe('shadcn-dark');
  });
});