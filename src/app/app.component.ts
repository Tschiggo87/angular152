import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from './table/table.component';
import { MemoryCardComponent } from "./memory-card/memory-card.component";
import { GameBoardComponent } from "./game-board/game-board.component";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
        CommonModule,
        RouterOutlet,
        TableComponent,
        GameBoardComponent, 
        ScoreboardComponent
    ]
})
export class AppComponent {
  title = 'angular152';
}
