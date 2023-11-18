import { Component, Input } from '@angular/core';
import { Card } from '../models/card.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class MemoryCardComponent {
  @Input() card!: Card;

  
}
