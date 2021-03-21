import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitDetailsModalComponent } from './lawsuit-details-modal.component';

describe('LawsuitDetailsModalComponent', () => {
  let component: LawsuitDetailsModalComponent;
  let fixture: ComponentFixture<LawsuitDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawsuitDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawsuitDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
