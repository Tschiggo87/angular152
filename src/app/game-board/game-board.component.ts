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

    }

    ngAfterViewInit(): void {
        // Hier nicht benötigt
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
        if (!card.isMatched && this.flippedCards.length < 2) {
            card.isFlipped = !card.isFlipped;

            if (card.isFlipped) {
                this.flippedCards.push(card);
                if (!this.isGameStarted) {
                    this.isGameStarted = true;
                    this.scoreboardComponent?.startTimer();
                }

                if (this.flippedCards.length === 2) {
                    this.checkMatch();
                }
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

    // Methode zum Starten/Beenden des Spiels
    toggleGameStart(): void {
        this.isGameStarted = !this.isGameStarted;

        if (this.isGameStarted) {
            this.initializeCards();
           this.scoreboardComponent?.startTimer();
        } else {
            // Logik zum Beenden des Spiels
            this.scoreboardComponent?.stopTimer();
          
        }
    }
}
