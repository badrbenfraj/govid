import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsLaboComponent } from './comments-labo.component';

describe('CommentsLaboComponent', () => {
  let component: CommentsLaboComponent;
  let fixture: ComponentFixture<CommentsLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsLaboComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
