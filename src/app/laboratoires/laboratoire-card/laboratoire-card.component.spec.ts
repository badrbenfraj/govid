import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoireCardComponent } from './laboratoire-card.component';

describe('LaboratoireCardComponent', () => {
  let component: LaboratoireCardComponent;
  let fixture: ComponentFixture<LaboratoireCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoireCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoireCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
