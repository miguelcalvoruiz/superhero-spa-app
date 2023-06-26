import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuperheroDialogComponent } from './add-superhero-dialog.component';

describe('AddSuperheroDialogComponent', () => {
  let component: AddSuperheroDialogComponent;
  let fixture: ComponentFixture<AddSuperheroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSuperheroDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSuperheroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
