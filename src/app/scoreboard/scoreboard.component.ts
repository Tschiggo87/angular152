import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scoreboard',
  styleUrls: ['./scoreboard.component.css'],
  standalone: true,
  templateUrl: './scoreboard.component.html'
})
export class ScoreboardComponent {
  @Input() matchedPairs: number = 0;
  @Input() attempts: number = 0;
  timer: number = 0;
  intervalId: any;

  ngOnInit() {
    //this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.timer++;
    }, 1000);
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
