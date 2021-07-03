import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingLaboratoireComponent } from './rating-laboratoire.component';

describe('RatingLaboratoireComponent', () => {
  let component: RatingLaboratoireComponent;
  let fixture: ComponentFixture<RatingLaboratoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingLaboratoireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingLaboratoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
