import { createCard } from "../card/card.js";

export function setCardList(cardList) {
    const cardListElement = document.querySelector(".card-list")

    const oldCards = cardListElement.querySelectorAll(".card")
    oldCards.forEach(card => card.remove())

    cardList.forEach(card => {
        const cardElement = createCard(card)
        cardListElement.appendChild(cardElement)
    });
}