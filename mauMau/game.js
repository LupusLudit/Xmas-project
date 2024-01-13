import {Player} from './universal.js';
import {Deck} from './universal.js';
import {Visual} from './visual.js';
/**
 * This class takes care about the logical part of the game
 */

export class Game{
    constructor(){
        this.deck = new Deck();
        this.playCard = "0_0";
        this.previousCard = "0_0";
        this.previous = [];
        this.current = [];
        this.extraDraw = 2;
        this.hasDrew = false;
        this.hasSkipped = false;
        this.correctTop = "0_0";
        this.chosen = "0_0";
        this.player1 = new Player();
        this.player2 = new Player();
        this.currentPlayer = new Player();
        this.visual = new Visual(this);
    }
    menu(){
        this.visual.showMenu();
        this.visual.showSunImage();
    }

    startGame() {
        this.visual.removeElement("menu");
        this.currentPlayer = this.player1;

        this.deck.createDeck();
        this.deck.shuffleDeck();
        this.visual.showMessage();
        
        this.playCard = this.deck.bundle[0];
        this.deck.bundle.splice(0, 1);
        this.previousCard = this.playCard;

        this.correctTop = this.playCard;
    
        for (let i = 0; i < 4; i++) {
            this.player1.cards.push(this.deck.bundle[i]);
            this.deck.bundle.splice(i, 1);
            this.visual.showPlayersCards(i);
        }
    
        for (let i = 0; i < 4; i++) {
            this.player2.cards.push(this.deck.bundle[i]);
            this.deck.bundle.splice(i, 1);
        }

        this.visual.showCurrentPlayCard();
        this.visual.showDrawPack();
        this.current = this.playCard.split("_")

        if( this.current[0] === "E"){
            this.visual.showExtraDraw();
        }
        if(this.current[0] === "H"){
            this.visual.showSkipButton();
        }
    
        if(this.current[0] === "G"){
            this.visual.showOptions();
        }

        
    }
    /**
     * simulates what happens when player plays a card
     * @param {number} index : index of a card
     */
    play(index) {
        if (this.correctCard(index) === true) {
            this.current = this.playCard.split("_");
            if(this.current[0]!== "G"){
                this.deck.bundle.push(this.playCard);
            }
            else{
                this.deck.bundle.push(this.correctTop);
            }
            this.playCard = this.currentPlayer.cards[index];
            this.currentPlayer.cards.splice(index, 1);
            this.previous = this.previousCard.split("_");
            this.current = this.playCard.split("_");

            this.visual.removeElement("currentCard");
            this.visual.removeElement("chosen");
            this.visual.removeElement("message");
            this.visual.removeElement("skipButton");
            this.visual.removeElement("extraDraw");

            this.visual.removeOptions();

            this.visual.showCurrentPlayCard();
    
            if(this.currentPlayer.checkWin()){
                this.visual.showWinMessage();
            }
            else if(this.current[0] === "G"){
                this.visual.removePlayersCards();
                for (let i = 0; i < this.currentPlayer.cards.length; i++) {
                    this.visual.showPlayersCards(i);
                }
                this.visual.showOptions();
                this.visual.showMessage();
            }
            else {
                this.changePlayer();
                this.visual.showMessage();

                if( this.current[0] === "E"){
                    this.visual.showExtraDraw();
                }

                if(this.previous[0] === "E" && this.current[0] === "E" && this.hasDrew === false){
                    this.extraDraw += 2;
                }else{
                    this.extraDraw = 2;
                }
                
                if((this.current[0] === "H" && this.hasSkipped === false) || (this.current[0] === "H" && this.previous[0] === "H")){
                    this.visual.showSkipButton();
                }

                this.hasDrew = false;
                this.hasSkipped = false;
                this.previousCard = this.playCard;
            }
        } else {
            alert("cannot play this card");
        }
    }
    /**
     * simulates drawing of a card from the drawing pack
     */
    draw() {
        this.current = this.playCard.split("_");
        if (this.currentPlayer.checkWin()) {
            alert("You have already won");
        }else if(this.current[0] === "H" && this.hasSkipped === false){
            alert("An ace must skipped or answered with another ace")
        }else if (this.deck.bundle.length > 0) {
            this.visual.removeElement("extraDraw");
            if(this.current[0] === "E" && this.hasDrew === false){
                let decide = this.extraDraw;
                if(this.deck.bundle.length < this.extraDraw){ //So we cannot draw more cards than there are in the bundle
                    decide = this.deck.bundle.length;
                }
                for(let i = 0; i < decide; i++){
                    this.currentPlayer.cards.push(this.deck.bundle[i]);
                }
                this.deck.bundle.splice(0, decide);
            }
            else{
                this.currentPlayer.cards.push(this.deck.bundle[0]);
                this.deck.bundle.splice(0, 1);
            }
            this.visual.removeElement("message");
            this.changePlayer();
            this.visual.showMessage();
            this.hasDrew = true;
        } else {
            alert("No more cards in the draw pack.");
        }
    }
    /**
     * checks if the chosen card is playable
     * @param {number} index : index of a card
     * @returns true if the card is playable, otherwise false
     */
    correctCard(index) {
        this.current = this.playCard.split("_");
        let chosen = this.currentPlayer.cards[index];
        chosen = chosen.split("_");
        if(this.current[0] === "E"){
            if(chosen[0] === this.current[0]){
                return true;
            }
            else return this.hasDrew === true && this.current[1] === chosen[1];
        }
        else if(this.current[0] === "H"){
            if(chosen[0] === this.current[0]){
                return true;
            }
            else return this.hasSkipped === true && this.current[1] === chosen[1];
        }else{
            return this.current[0] === chosen[0] || this.current[1] === chosen[1];
        }
    }

    changePlayer() {
        this.visual.removePlayersCards();
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }
        for (let i = 0; i < this.currentPlayer.cards.length; i++) {
            this.visual.showPlayersCards(i);
        }
    }

    /**
     * takes care about skipping an ace
     */
    skip(){
        this.hasSkipped = true;
        this.visual.removeElement("skipButton");
        this.visual.removeElement("message");
        this.changePlayer();
        this.previousCard = this.playCard;
        this.visual.showMessage();
    }
    /**
     * changes the type of the playCard
     * @param {number} index : index of a card
     */

    change(index){
        this.correctTop = this.playCard;
        this.playCard = "G_" + index;
        this.chosen = "0_" + index;
        this.visual.removeOptions();
        this.visual.removeElement("message");
        this.changePlayer();
        this.visual.showChosen();
        this.visual.showMessage();
    }
}
