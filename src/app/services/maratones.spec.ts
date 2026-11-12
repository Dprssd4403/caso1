import { TestBed } from '@angular/core/testing';
import { Maratones } from './maratones';

describe('Maratones', () => {
  let service: Maratones;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Maratones);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
