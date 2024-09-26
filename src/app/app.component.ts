import { Component } from '@angular/core';
import { KeyboardComponent } from './components/keyboard/keyboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KeyboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
