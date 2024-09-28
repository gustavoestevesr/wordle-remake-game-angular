import { Component, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { SlotsArrayComponent } from './components/slots-array/slots-array.component';
import { AlertModalComponent } from './modals/alert-modal/alert-modal.component';
import { WordleService } from './services/wordle.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SlotsArrayComponent, KeyboardComponent, AlertModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public wordleService = inject(WordleService)
}
