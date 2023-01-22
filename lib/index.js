const diffButtons = document.querySelectorAll('.main__choose_button')
const startButton = document.querySelector('.main__play-button')

import { templateEngine } from '../src/template'
import { cards } from '../src/cards'
import '../lib/styles.css'

function renderCards(cards, i) {
    return {
        tag: 'div',
        cls: 'game__block-card',
        content: [
            {
                tag: 'div',
                cls: 'game__block-card-suit',
                attrs: {
                    id: cards[i].id,
                    style: `background-image: url(../cards_images/Mask%20group.svg)`,
                },
            },
            {
                tag: 'div',
                cls: 'game__block-card-face',
                attrs: {
                    id: cards[i].id,
                    style: `background-image:url(${cards[i].sourse})`,
                },
            },
        ],
    }
}

function startSrceenTemplate(cardsTemplate) {
    return {
        tag: 'div',
        cls: 'game__screen',
        content: [
            {
                tag: 'div',
                cls: 'info__block',
                content: [
                    {
                        tag: 'div',
                        cls: 'info__block_time',
                        content: [
                            {
                                tag: 'div',
                                cls: 'info__block-left',
                                content: [
                                    {
                                        tag: 'p',
                                        cls: 'time__text',
                                        content: 'min',
                                    },
                                    {
                                        tag: 'h1',
                                        cls: 'time__numbers',
                                        content: '00',
                                    },
                                ],
                            },
                            {
                                tag: 'p',
                                cls: 'time__numbers',
                                content: '.',
                            },
                            {
                                tag: 'div',
                                cls: 'info__block-right',
                                content: [
                                    {
                                        tag: 'p',
                                        cls: 'time__text',
                                        content: 'sec',
                                    },
                                    {
                                        tag: 'h1',
                                        cls: 'time__numbers',
                                        content: '00',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        tag: 'button',
                        cls: 'info__block_button',
                        content: 'Начать заново',
                    },
                ],
            },
            {
                tag: 'div',
                cls: 'game__block',
                content: [cardsTemplate],
            },
        ],
    }
}

diffButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        diffButtons.forEach((button) => {
            button.classList.remove('choosen')
        })
        const target = event.target
        window.application.diff = target.name
        window.application.cards = target.dataset.cards
        target.classList.add('choosen')
    })
})

startButton.addEventListener('click', () => {
    document.body.innerHTML = ''

    let playCards = []

    const prepareCards = cards.sort(function () {
        return Math.random() - 0.5
    })

    const screen = document.querySelector('body')

    for (let i = 0; i < window.application.cards; i++) {
        playCards.push(renderCards(prepareCards, i))
        playCards.push(renderCards(prepareCards, i))
    }

    playCards = playCards.sort(function () {
        return Math.random() - 0.5
    })

    screen.appendChild(templateEngine(startSrceenTemplate(playCards)))

    const cardsSuits = document.querySelectorAll('.game__block-card-suit')
    cardsSuits.forEach((card) => {
        card.classList.add('hide')
    })

    const cardsFace = document.querySelectorAll('.game__block-card-face')
    setTimeout(() => {
        cardsFace.forEach((element) => {
            cardsSuits.forEach((card) => {
                card.classList.remove('hide')
            })
            element.classList.add('hide')
        })
    }, 5000)

    let idCards = []

    cardsSuits.forEach((el) => {
        el.addEventListener('click', (event) => {
            const target = event.target
            target.classList.add('hide')
            target.nextElementSibling.classList.remove('hide')
            idCards.push(target.id)

            setTimeout(() => {
                if (idCards.length > 1) {
                    if (idCards[0] === idCards[1]) {
                        alert('Вы угадали, так держать')
                        idCards = []
                    } else {
                        alert('Вы не справились, попробуйте снова!')
                        idCards = []
                    }
                }
            }, 300)
        })
    })
})
