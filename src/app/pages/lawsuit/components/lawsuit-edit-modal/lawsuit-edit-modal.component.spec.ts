import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitEditModalComponent } from './lawsuit-edit-modal.component';

describe('LawsuitEditModalComponent', () => {
  let component: LawsuitEditModalComponent;
  let fixture: ComponentFixture<LawsuitEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawsuitEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawsuitEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
