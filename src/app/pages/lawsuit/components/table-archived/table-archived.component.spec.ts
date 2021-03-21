import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableArchivedComponent } from './table-archived.component';

describe('TableArchivedComponent', () => {
  let component: TableArchivedComponent;
  let fixture: ComponentFixture<TableArchivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableArchivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
