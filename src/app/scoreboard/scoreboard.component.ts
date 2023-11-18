import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']  // Korrektur: styleUrls statt styleUrl
})
export class ScoreboardComponent {
  @Input() matchedPairs: number = 0;
  @Input() attempts: number = 0;


}
