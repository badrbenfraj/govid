import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartMachineComponent } from './pie-chart-machine.component';

describe('PieChartMachineComponent', () => {
  let component: PieChartMachineComponent;
  let fixture: ComponentFixture<PieChartMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartMachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
