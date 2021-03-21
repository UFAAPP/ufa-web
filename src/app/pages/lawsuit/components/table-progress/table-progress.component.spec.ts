import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProgressComponent } from './table-progress.component';

describe('TableProgressComponent', () => {
  let component: TableProgressComponent;
  let fixture: ComponentFixture<TableProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
