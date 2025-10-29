import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get an item from local storage', () => {
    const key = 'testKey';
    const value = 'testValue';

    service.setItem(key, value);
    expect(localStorage.getItem(key)).toBe(value);

    const retrievedValue = service.getItem(key);
    expect(retrievedValue).toBe(value);
  });

  it('should remove an item from local storage', () => {
    const key = 'testKey';
    const value = 'testValue';

    service.setItem(key, value);
    expect(localStorage.getItem(key)).toBe(value);

    service.removeItem(key);
    expect(localStorage.getItem(key)).toBeNull();
  });
});
