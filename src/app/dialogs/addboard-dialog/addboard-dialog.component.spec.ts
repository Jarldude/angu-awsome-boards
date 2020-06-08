import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddboardDialogComponent } from './addboard-dialog.component';

describe('AddboardDialogComponent', () => {
  let component: AddboardDialogComponent;
  let fixture: ComponentFixture<AddboardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddboardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
