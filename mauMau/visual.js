const imageContainer = document.getElementById("gallery");
const optionContainer = document.getElementById("optionImage");

/**
 * This class takes care about the visual part of the game
 */
export class Visual {
    constructor(parent) {
        this.parent = parent;
        this.count = 0;
    }

    showCurrentPlayCard() {
        let currentCardImage = document.createElement("img");
        currentCardImage.src = "images/" + this.parent.playCard + ".png";
        currentCardImage.alt = "current play card";
        currentCardImage.id = "currentCard";
        document.body.appendChild(currentCardImage);
    }

    showDrawPack() {
        const back = document.createElement("img");
        back.src = "images/back.png";
        back.id = "backImage";
        back.onclick = () => {
            this.showTransition(() => {
                this.parent.draw();
            });
        };
        document.body.appendChild(back);
    }

    showPlayersCards(index) {
        let image = document.createElement("img");
        let tester = this.parent.currentPlayer.cards[index].split("_");
        image.src = "images/" + this.parent.currentPlayer.cards[index] + ".png";
        image.onclick = () => {
            if(tester[0] === "G"){
                this.parent.play(index);
            }
            else{
                this.showTransition(() => {
                    this.parent.play(index);
                });
            }
        };
        imageContainer.appendChild(image);
    }

    showSkipButton() {
        const button = document.createElement("button");
        button.textContent = "Skip";
        button.id = "skipButton";
        button.onclick = () => {
            this.showTransition(() => {
                this.parent.skip();
            });
        };
        document.body.appendChild(button);
    }
    /**
     * shows to the current player the types he can choose to change
     */

    showOptions() {
        for (let i = 1; i <= 4; i++) {
            let image = document.createElement("img");
            image.src = "images/0_" + i + ".png";
            image.onclick = () => {
                this.showTransition(() => {
                    this.parent.change(i);
                });
            };
            optionContainer.appendChild(image);
        }
    }

    showMenu() {
        const button = document.createElement("button");
        const button2 = document.createElement("button");
        button.textContent = "Start Game";
        button.id = "menu";
        button.onclick = () => {
            this.showTransition(() => {
                this.parent.startGame();
            });
        };
    
        button2.textContent = "Rules";
        button2.id = "menu";
        button2.addEventListener('click', () => {
            window.location.href = "https://en.wikipedia.org/wiki/Mau-Mau_(card_game)";
        });
    
        document.body.appendChild(button);
        document.body.appendChild(button2);
        document.querySelector('body').style.background = "#F7F7F7"; //default color
    }

    /**
     * changes the color of the background
     */

    showSunImage(){
        let image = document.createElement("img");
        image.src = "images/sun_image.png";
        image.id = "sunImage";
        image.onclick = () => {
            switch (this.count) {
                case 0:
                    this.showTransition(() => {
                        document.querySelector('body').style.background = "#323232";
                    });
                    break;
                case 1:
                    this.showTransition(() => {
                        document.querySelector('body').style.background = "#ADD8E6";
                    });
                    break;
                case 2:
                    this.showTransition(() => {
                        document.querySelector('body').style.background = "#F7F7F7";
                    });
                    break;
            }
            this.count++;
            if(this.count > 2){
                this.count = 0;
            }
        };
        document.body.appendChild(image);
    }

    showMessage() {
        let text = document.createElement("h1");
        text.id = "message";
        if(this.parent.currentPlayer === this.parent.player1){
            text.style.color = "#0096ff";
            text.textContent = "Player ONE";
        }
        else if(this.parent.currentPlayer === this.parent.player2){
            text.style.color = "#ff3232";
            text.textContent = "Player TWO";
        }
        document.body.appendChild(text);
    }
    showWinMessage(){
        this.removePlayersCards();
        let text = document.createElement("h1");
        text.style.color = "#32ff73";
        if(this.parent.currentPlayer === this.parent.player1){
            text.textContent = "Player ONE WON!!!";
        }
        else if(this.parent.currentPlayer === this.parent.player2){
            text.textContent = "Player TWO WON!!!";
        }
        let button = document.createElement("button");
        button.textContent = "Click to claim reward";
        button.addEventListener('click', () => {
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        });
        document.body.appendChild(text);
        document.body.appendChild(button);
    }
    /**
     * shows to the player how many additional cards will they have to draw if he doesn't respond to the 7 with another 7
     */
    showExtraDraw(){
        let text = document.createElement("h1");
        text.textContent = "+" + this.parent.extraDraw;
        text.id = "extraDraw";
        text.style.position = "absolute";
        text.style.top = "calc(50% - 30rem)";
        text.style.right = "calc(50% - 30rem)";
        text.style.fontSize = "3rem"
        document.body.appendChild(text);
    }
    /**
     * shows the chosen type of the card after the Top was played
     */
    showChosen() {
        let image = document.createElement("img");
        image.src = "images/" + this.parent.chosen + ".png";
        image.id = "chosen";
        document.body.appendChild(image);
    }
    /**
     * removes the option images that are showed to the player when the ace is played from the optionContainer
     */
    removeOptions() {
        while (optionContainer.firstChild) {
            optionContainer.removeChild(optionContainer.firstChild);
        }
    }
    /**
     * removes current players cards from the imageContainer, so the next player can see his cards
     */
    removePlayersCards() {
        while (imageContainer.firstChild) {
            imageContainer.removeChild(imageContainer.firstChild);
        }
    }
    /**
     * universal remove method
     * @param {string} element : element to be removed
     */
    removeElement(element){
        while (document.getElementById(element)) {
            document.getElementById(element).remove();
        }
    }

    showTransition(func) {
        document.body.classList.add("hidden");
        setTimeout(() => {
            document.body.classList.remove("hidden");
            func();
        }, 500);
    }
}
