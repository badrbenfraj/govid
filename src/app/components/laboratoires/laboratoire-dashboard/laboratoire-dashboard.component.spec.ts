import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoireDashboardComponent } from './laboratoire-dashboard.component';

describe('LaboratoireDashboardComponent', () => {
  let component: LaboratoireDashboardComponent;
  let fixture: ComponentFixture<LaboratoireDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoireDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoireDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
