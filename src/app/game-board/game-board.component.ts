import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryCardComponent } from "../memory-card/memory-card.component";
import { Card } from '../models/card.model';

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css'],
    imports: [CommonModule, MemoryCardComponent],
    standalone: true
})
export class GameBoardComponent {
    cards: Card[] = [];

    constructor() {
        this.initializeCards();
    }

    initializeCards(): void {
        const emojis = ['😀', '😂', '🎉', '💖', '🚀', '🌈'];
        let id = 0;

        emojis.forEach(emoji => {
            this.cards.push({ id: id++, emoji: emoji, isFlipped: false, isMatched: false });
            this.cards.push({ id: id++, emoji: emoji, isFlipped: false, isMatched: false });
        });

        this.shuffleCards(this.cards);
    }

    shuffleCards(cards: Card[]): void {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }
}
