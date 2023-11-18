import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ScoreboardComponent } from "../scoreboard/scoreboard.component";
import { CommonModule } from '@angular/common';
import { MemoryCardComponent } from '../memory-card/memory-card.component';
import { Card } from '../models/card.model';

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css'],
    standalone: true,
    imports: [CommonModule, MemoryCardComponent, ScoreboardComponent]
})
export class GameBoardComponent implements AfterViewInit {
    @ViewChild(ScoreboardComponent, { static: false }) scoreboardComponent?: ScoreboardComponent;

    cards: Card[] = [];
    flippedCards: Card[] = [];
    matchedPairs: number = 0;
    attempts: number = 0;
    isGameStarted: boolean = false;


    constructor() {
        this.initializeCards();
    }
    ngAfterViewInit(): void {
        if (this.isGameStarted) {
            this.scoreboardComponent?.startTimer();
        }
    }

    initializeCards(): void {
        const emojis = ['😀', '😂', '🎉', '💖', '🚀', '🌈', '🐻‍❄️', '🐸'];
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

    flipCard(card: Card): void {
        if (!card.isMatched) {
            card.isFlipped = !card.isFlipped;

            if (card.isFlipped) {
                this.flippedCards.push(card);
                this.checkMatch();
            }
            if (!this.isGameStarted) {
                this.isGameStarted = true;
                this.scoreboardComponent?.startTimer();
            }
            else {
                this.removeCardFromFlipped(card);
            }
        }
    }

    checkMatch(): void {
        if (this.flippedCards.length === 2) {
            const [firstCard, secondCard] = this.flippedCards;

            if (firstCard.emoji === secondCard.emoji) {
                firstCard.isMatched = true;
                secondCard.isMatched = true;
                this.matchedPairs++;
                this.attempts++;

                if (this.matchedPairs === this.cards.length / 2) {
                    // Alle Paare wurden gefunden, Timer stoppen
                    this.scoreboardComponent?.stopTimer();
                }
            } else {
                setTimeout(() => {
                    firstCard.isFlipped = false;
                    secondCard.isFlipped = false;
                    this.attempts++;
                }, 1000);
            }

            this.flippedCards = [];
        }
    }


    removeCardFromFlipped(card: Card): void {
        this.flippedCards = this.flippedCards.filter(c => c.id !== card.id);
    }


}
