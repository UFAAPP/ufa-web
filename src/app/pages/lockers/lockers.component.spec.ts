import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockersComponent } from './lockers.component';

describe('LockersComponent', () => {
  let component: LockersComponent;
  let fixture: ComponentFixture<LockersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LockersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
