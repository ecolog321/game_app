declare global {
    interface Window {
        application?: ReturnType<typeof Object>
    }
}

declare global {
    interface EventTarget {
        name?: string
        classList?: ReturnType<typeof Object>
        id?: any
        data?: string
    }
}

let sec = 0,
    min = 0,
    t: number | ReturnType<typeof setTimeout>

const diffButtons = document.querySelectorAll('.main__choose_button')
const startButton = document.querySelector('.main__play-button')

import { templateEngine } from '../src/template'
import { cards } from '../src/cards'
import '../lib/styles.css'
import { HtmlTagObject } from 'html-webpack-plugin'
import { node } from 'webpack'

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
                                        cls: 'time__numbers-min',
                                        content: '00',
                                    },
                                ],
                            },
                            {
                                tag: 'p',
                                cls: 'time__numbers',
                                content: ':',
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
                                        cls: 'time__numbers-sec',
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

function winScreenTemplate(min, sec) {
    return {
        tag: 'div',
        cls: 'end__block',
        content: [
            {
                tag: 'img',
                cls: 'end__block_image',
                attrs: {
                    src: '../cards_images/win.svg',
                },
            },
            {
                tag: 'h1',
                cls: 'end__block_text',
                content: 'Вы выиграли!',
            },
            {
                tag: 'div',
                cls: 'end__block_time',
                content: [
                    {
                        tag: 'h2',
                        cls: 'end__block_time-text',
                        content: 'Затраченное время',
                    },
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
                                        cls: 'time__numbers-min',
                                        content: min > 9 ? min : '0' + min,
                                    },
                                ],
                            },
                            {
                                tag: 'p',
                                cls: 'time__numbers',
                                content: ':',
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
                                        cls: 'time__numbers-sec',
                                        content: sec > 9 ? sec : '0' + sec,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                tag: 'button',
                cls: 'end__block_button',
                content: 'Играть снова!',
            },
        ],
    }
}

function loseScreenTemplate(min, sec) {
    return {
        tag: 'div',
        cls: 'end__block',
        content: [
            {
                tag: 'img',
                cls: 'end__block_image',
                attrs: {
                    src: '../cards_images/lose.svg',
                },
            },
            {
                tag: 'h1',
                cls: 'end__block_text',
                content: 'Вы проиграли!',
            },
            {
                tag: 'div',
                cls: 'end__block_time',
                content: [
                    {
                        tag: 'h2',
                        cls: 'end__block_time-text',
                        content: 'Затраченное время',
                    },
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
                                        cls: 'time__numbers-min',
                                        content: min > 9 ? min : '0' + min,
                                    },
                                ],
                            },
                            {
                                tag: 'p',
                                cls: 'time__numbers',
                                content: ':',
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
                                        cls: 'time__numbers-sec',
                                        content: sec > 9 ? sec : '0' + sec,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                tag: 'button',
                cls: 'end__block_button',
                content: 'Играть снова!',
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
        window.application.cards = target.id
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

    const gameArea = document.querySelector('.game__screen')
    const timeMin: Element | ReturnType<typeof Object> =
        document.querySelector('.time__numbers-min')
    const timeSec: Element | ReturnType<typeof Object> =
        document.querySelector('.time__numbers-sec')
    const resetButton = document.querySelector('.info__block_button')

    function tick() {
        sec++
        if (sec >= 60) {
            sec = 0
            min++
        }
    }

    function add() {
        tick()
        timeMin.textContent = min > 9 ? min : '0' + min
        timeSec.textContent = sec > 9 ? sec : '0' + sec

        timer()
    }
    function timer() {
        t = setTimeout(add, 1000)
    }

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
        timer()
    }, 5000)

    let idCards = []
    let result = 0
    cardsSuits.forEach((el) => {
        el.addEventListener('click', (event: ReturnType<typeof Object>) => {
            const target = event.target
            target.classList.add('hide')
            target.nextElementSibling.classList.remove('hide')
            idCards.push(target.id)

            if (idCards.length > 1) {
                if (idCards[0] === idCards[1]) {
                    result++
                    idCards = []
                    if (result === cardsSuits.length / 2) {
                        screen.appendChild(
                            templateEngine(winScreenTemplate(min, sec))
                        )

                        idCards = []
                        clearTimeout(t)
                        gameArea.classList.add('oppacity')
                    }
                } else {
                    screen.appendChild(
                        templateEngine(loseScreenTemplate(min, sec))
                    )
                    idCards = []
                    clearTimeout(t)
                    gameArea.classList.add('oppacity')
                }
                const newGameButton =
                    document.querySelector('.end__block_button')
                const endBlock = document.querySelector('.end__block')

                newGameButton.addEventListener('click', () => {
                    location.reload()
                })
            }
        })
    })

    resetButton.addEventListener('click', () => {
        clearTimeout(t)
        gameArea.classList.remove('oppacity')
        timeMin.textContent = '00'
        timeSec.textContent = '00'
        min = 0
        sec = 0
        idCards = []
        result = 0
        cardsFace.forEach((el) => {
            el.classList.remove('hide')
        })
        setTimeout(() => {
            cardsFace.forEach((element) => {
                cardsSuits.forEach((card) => {
                    card.classList.remove('hide')
                })
                element.classList.add('hide')
            })
            timer()
        }, 5000)
    })
})
