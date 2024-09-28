import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { WordleService } from '../../services/wordle.service';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.scss'
})
export class AlertModalComponent {
  @Input() showModal!: boolean;
  @Input() icon!: string;
  @Input() message!: string;
  @Input() textButton!: string;

  public wordleService = inject(WordleService)
}
