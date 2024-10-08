import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardButtonComponent } from './keyboard-button.component';

describe('KeyboardButtonComponent', () => {
  let component: KeyboardButtonComponent;
  let fixture: ComponentFixture<KeyboardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyboardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
