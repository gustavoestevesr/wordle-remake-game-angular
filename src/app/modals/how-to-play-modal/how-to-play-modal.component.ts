import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WordleService } from '../../services/wordle.service';

@Component({
  selector: 'app-how-to-play-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-to-play-modal.component.html',
  styleUrl: './how-to-play-modal.component.scss'
})
export class HowToPlayModalComponent {
  wordleService = inject(WordleService)
}
