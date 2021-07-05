import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseActionComponent } from './choose-action.component';

describe('ChooseActionComponent', () => {
  let component: ChooseActionComponent;
  let fixture: ComponentFixture<ChooseActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
