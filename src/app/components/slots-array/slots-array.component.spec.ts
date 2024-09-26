import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsArrayComponent } from './slots-array.component';

describe('SlotsArrayComponent', () => {
  let component: SlotsArrayComponent;
  let fixture: ComponentFixture<SlotsArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotsArrayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotsArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
