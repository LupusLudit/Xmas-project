const values = ["A", "B", "C", "D", "E", "F", "G", "H"];
const types = ["1", "2", "3", "4"];
/**
 * Universal classes for player and deck that can be reused in different games
 */

export class Player {
    constructor() {
        this.cards = [];
    }

    checkWin() {
        return this.cards.length === 0;
    }
}
export class Deck{
    constructor() {
        this.bundle = [];
    }
    createDeck() { 
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < types.length; j++) {
                this.bundle.push(values[i] + "_" + types[j]);
            }
        }
    }
    shuffleDeck() {
        for (let i = 0; i < this.bundle.length; i++) {
            let j = Math.floor(Math.random() * this.bundle.length);
            let temp = this.bundle[i];
            this.bundle[i] = this.bundle[j];
            this.bundle[j] = temp;
        }
    }    
}