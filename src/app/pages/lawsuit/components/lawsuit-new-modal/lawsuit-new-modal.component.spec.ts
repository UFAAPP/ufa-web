import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitNewModalComponent } from './lawsuit-new-modal.component';

describe('LawsuitNewModalComponent', () => {
  let component: LawsuitNewModalComponent;
  let fixture: ComponentFixture<LawsuitNewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawsuitNewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawsuitNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
