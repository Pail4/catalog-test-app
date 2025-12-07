import { TAG_MAP } from '../../consts/TAGS.js';

export function createCard(card) {
    const cardTemplate = document.querySelector("#card-template")
    const clone = cardTemplate.content.cloneNode(true)

    const { id, tag, name, price, author } = card
    const tagId = TAG_MAP[tag] || 'default'

    const cardTitleElement = clone.querySelector(".card__title")
    const cardTagElement = clone.querySelector(".card__tag")
    const cardPriceElement = clone.querySelector(".card__price")
    const cardAuthorElement = clone.querySelector(".card__author")
    const cardImageElement = clone.querySelector(".card__image")

    cardTitleElement.textContent = name
    cardTagElement.textContent = tag
    cardTagElement.style.backgroundColor = `var(--tag-color-${tagId})`
    cardPriceElement.textContent = `$${price}`
    cardAuthorElement.textContent = `by ${author}`

    cardImageElement.src = `src/images/image-${id}.png`

    return clone
}