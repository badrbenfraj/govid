import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoireMapComponent } from './laboratoire-map.component';

describe('LaboratoireMapComponent', () => {
  let component: LaboratoireMapComponent;
  let fixture: ComponentFixture<LaboratoireMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoireMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoireMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
