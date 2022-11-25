const diffBlock = document.querySelector(".main__choose")
const startButton = document.querySelector(".main__play-button")

diffBlock.addEventListener("click", (event) => {
  document.querySelectorAll(".main__choose_button").forEach((element) => {
    element.classList.remove("choosen")
  })
  const target = event.target
  window.application.cardsDifficult.diff = target.name
  window.application.cardsDifficult.cards = target.dataset.cards
  target.classList.add("choosen")
})

startButton.addEventListener("click", () => {
  document.body.innerHTML = ""
  const screen = document.querySelector("body")

  function renderCards(params) {}

  function startSrceenTemplate(quanityCards) {
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
                      content: "min",
                    },
                    {
                      tag: "h1",
                      content: window.application.time,
                    },
                  ],
                },
                {
                  tag: "div",
                  cls: "info__block-right",
                  content: [
                    {
                      tag: "p",
                      content: "sec",
                    },
                    {
                      tag: "h1",
                      content: window.application.time,
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
          content: [],
        },
      ],
    }
  }
