import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitComponent } from './lawsuit.component';

describe('LawsuitComponent', () => {
  let component: LawsuitComponent;
  let fixture: ComponentFixture<LawsuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawsuitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawsuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
