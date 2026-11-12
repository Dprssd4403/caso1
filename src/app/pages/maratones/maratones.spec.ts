import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Maratones } from './maratones';

describe('Maratones', () => {
  let component: Maratones;
  let fixture: ComponentFixture<Maratones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Maratones],
    }).compileComponents();

    fixture = TestBed.createComponent(Maratones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
