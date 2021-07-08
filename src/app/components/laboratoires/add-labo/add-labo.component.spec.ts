import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLaboComponent } from './add-labo.component';

describe('AddLaboComponent', () => {
  let component: AddLaboComponent;
  let fixture: ComponentFixture<AddLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLaboComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
