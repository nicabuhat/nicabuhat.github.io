let bets = [];
let winnings = 0;
class Bubble {
    constructor(bubble){
        this.id = bubble.id;
        this.bet = bubble.bet;
        this.secret = bubble.secret;
        this.size = bubble.size;
    }
    createBubbleDiv() {
        const sectionBubbles = document.getElementById("section-bubbles");
        const betForm = document.getElementById("form-bet");
        const newBubble = Object.assign(document.createElement("div"), {
            className: "bubble",
            id: this.id
        });
        newBubble.innerText = this.bet;
        sectionBubbles.append(newBubble);
        betForm.reset();
    }
    getSize() {
        return this.size;
    }
    getBet() {
        return this.bet;
    }
    getSecret() {
        return this.secret;
    }
    setSize(size) {
        this.size = size;
    }
    pushToBets() {
        bets.push(this);
    }
}
const toggleBetSection = ()=>{
    const betSection = document.getElementById("section-form");
    betSection.style.display = getComputedStyle(betSection, null).display === "flex" ? "none" : "flex";
};
const toggleChallengeSection = ()=>{
    const challengeSection = document.getElementById("section-challenge");
    challengeSection.style.display = getComputedStyle(challengeSection, null).display === "flex" ? "none" : "flex";
};
const updateBubbleSize = ()=>{
    const summation = (total, bet)=>{
        return total + Number(bet.bet);
    };
    const total1 = bets.reduce(summation, 0);
    bets = bets.map((bet)=>{
        const size = `${Math.floor(bet.bet / total1 * 100 + 80)}px`;
        const bubble = document.getElementById(bet.id);
        bubble.style.height = size;
        bubble.style.width = size;
        const newBubble = new Bubble(bet);
        newBubble.size = size;
        return newBubble;
    });
};
const updateBetsList = (bubble)=>{
    const newBets = bets.filter((b)=>b.id !== bubble.id);
    bets = newBets;
};
const onBetFormSubmit = ()=>{
    const form = document.getElementById("form-bet");
    form.onsubmit = (e)=>{
        e.preventDefault();
        const id = "_id" + Math.random().toString(16).slice(2);
        const bet = e.target.bet.value;
        const secret = e.target.secret.value;
        const currentBubble = {
            id,
            bet,
            secret,
            size: "50px"
        };
        const newBubble = new Bubble(currentBubble);
        newBubble.createBubbleDiv();
        newBubble.pushToBets();
        updateBubbleSize();
        toggleBetSection();
    };
};
const onSelectBetBtn = ()=>{
    const toggleBetBtn = document.getElementById("btn-bet");
    toggleBetBtn.addEventListener("click", ()=>{
        toggleBetSection();
    });
};
const onPlaceBetBtn = ()=>{
    onBetFormSubmit();
};
const updateWinnings = (e, clickedBubble)=>{
    const bubble = bets.find((b)=>b.id === clickedBubble.id);
    const bet = Number(bubble.getBet());
    const secret = bubble.getSecret();
    const winningsText = document.getElementById("winnings");
    challengeValue = e.target.innerText;
    winnings += challengeValue === secret ? bet : bet * -1;
    winningsText.innerText = winnings;
    clickedBubble.remove();
    updateBetsList(bubble);
    toggleChallengeSection();
};
const onChallenge = (bubble)=>{
    const secretZero = document.getElementById("btn-challenge-0");
    const secretOne = document.getElementById("btn-challenge-1");
    secretZero.addEventListener("click", (e)=>{
        updateWinnings(e, bubble);
    });
    secretOne.addEventListener("click", (e)=>{
        updateWinnings(e, bubble);
    });
};
const onClickBubble = ()=>{
    const callback = (mutationList, observer)=>{
        mutationList.forEach((mutation)=>{
            let currentBubble = "";
            const added = mutation.addedNodes;
            const removed = mutation.removedNodes;
            if (added.length > 0 && added[0].className === "bubble") document.addEventListener("click", (e)=>{
                let bubble = e.target;
                if (bubble.className === "bubble") {
                    currentBubble = bets.filter((b)=>b.id === bubble.id);
                    e.stopImmediatePropagation();
                    toggleChallengeSection();
                    onChallenge(bubble);
                    e.preventDefault();
                }
            });
        });
        observer.disconnect();
    };
    class customObserver {
        constructor(mutations1, observer2){
            this.target = document.getElementById("section-bubbles");
            this.config = {
                attributes: false,
                childList: true,
                subtree: true
            };
            this.observer = new MutationObserver((mutations, observer)=>{
                callback.call(this, mutations, observer);
            });
        }
        connect() {
            this.observer.observe(this.target, this.config);
        }
        disconnect() {
            this.observer.disconnect();
        }
    }
    const observer1 = new customObserver((mutations, observer)=>{
        callback(mutations, observer);
        observer.connect();
    });
    observer1.connect();
};
const app = ()=>{
    onSelectBetBtn();
    onPlaceBetBtn();
    onClickBubble();
};
app();

//# sourceMappingURL=index.b4ce7916.js.map
