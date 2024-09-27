import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WordleService } from '../../services/wordle.service';

@Component({
  selector: 'app-slots-array',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slots-array.component.html',
  styleUrl: './slots-array.component.scss'
})
export class SlotsArrayComponent {
  public wordleService = inject(WordleService)
}
