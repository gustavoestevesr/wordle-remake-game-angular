import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticsModalComponent } from './statics-modal.component';

describe('StaticsModalComponent', () => {
  let component: StaticsModalComponent;
  let fixture: ComponentFixture<StaticsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
