import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoireHomeComponent } from './laboratoire-home.component';

describe('LaboratoireHomeComponent', () => {
  let component: LaboratoireHomeComponent;
  let fixture: ComponentFixture<LaboratoireHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoireHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoireHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
