import { Component, inject } from '@angular/core';
import { WordleService } from '../../services/wordle.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  wordleService = inject(WordleService)

  constructor() {
    this.wordleService.startTimer()
  }
}
