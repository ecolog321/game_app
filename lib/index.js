/* eslint-disable no-undef */
const diffBlock = document.querySelector(".main__choose")
const startButton = document.querySelector(".main__play-button")

function renderCards(cards, i) {
  return {
    tag: "div",
    cls: "game__block-card",
    attrs: {
      style: `background-image:url(${cards[i].sourse})`,
    },
  }
}

function startSrceenTemplate(arr) {
  return {
    tag: "div",
    cls: "game__screen",
    content: [
      {
        tag: "div",
        cls: "info__block",
        content: [
          {
            tag: "div",
            cls: "info__block_time",
            content: [
              {
                tag: "div",
                cls: "info__block-left",
                content: [
                  {
                    tag: "p",
                    cls: "time_text",
                    content: "min",
                  },
                  {
                    tag: "h1",
                    cls: "time_numbers",
                    content: "00",
                  },
                ],
              },
              {
                tag: "p",
                cls: "time_numbers",
                content: ".",
              },
              {
                tag: "div",
                cls: "info__block-right",
                content: [
                  {
                    tag: "p",
                    cls: "time_text",
                    content: "sec",
                  },
                  {
                    tag: "h1",
                    cls: "time_numbers",
                    content: "00",
                  },
                ],
              },
            ],
          },
          {
            tag: "button",
            cls: "info__block_button",
            content: "Начать заново",
          },
        ],
      },
      {
        tag: "div",
        cls: "game__block",
        content: [arr],
      },
    ],
  }
}

diffBlock.addEventListener("click", (event) => {
  document.querySelectorAll(".main__choose_button").forEach((element) => {
    element.classList.remove("choosen")
  })
  const target = event.target
  window.application.diff = target.name
  window.application.cards = target.dataset.cards
  target.classList.add("choosen")
})

startButton.addEventListener("click", () => {
  document.body.innerHTML = ""
  let playCards = []

  const screen = document.querySelector("body")

  for (let i = 0; i < window.application.cards; i++) {
    playCards.push(renderCards(cards, i))
    playCards.push(renderCards(cards, i))
  }
  playCards.sort(function () {
    return Math.random() - 0.5
  })

  screen.appendChild(templateEngine(startSrceenTemplate(playCards)))
  let closeCards = document.querySelectorAll(".game__block-card")
  setTimeout(() => {
    closeCards.forEach((element) => {
      element.style.backgroundImage = "url(../cards_images/Mask%20group.svg)"
      element.style.backgroundColor = "#E4FBFF"
    })
  }, 5000)
})
