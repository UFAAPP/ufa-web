import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLockerComponent } from './new-locker.component';

describe('NewLockerComponent', () => {
  let component: NewLockerComponent;
  let fixture: ComponentFixture<NewLockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
