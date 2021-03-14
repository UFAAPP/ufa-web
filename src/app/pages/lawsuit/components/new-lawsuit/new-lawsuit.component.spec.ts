import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLawsuitComponent } from './new-lawsuit.component';

describe('NewLawsuitComponent', () => {
  let component: NewLawsuitComponent;
  let fixture: ComponentFixture<NewLawsuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLawsuitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLawsuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
