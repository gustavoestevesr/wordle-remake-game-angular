import { Component, inject } from '@angular/core';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { WordleService } from './services/wordle.service';
import { SlotsArrayComponent } from './components/slots-array/slots-array.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SlotsArrayComponent, KeyboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
