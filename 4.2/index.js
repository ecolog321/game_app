const diffBlock = document.querySelector('.main__choose');
const startButton = document.querySelector('.main__play-button');

diffBlock.addEventListener('click', (event) => {

    document.querySelectorAll('.main__choose_button').forEach(element => {
        element.classList.remove('choosen');
    });
    const target = event.target;
    window.application.cardsDifficult.diff = target.name;
    window.application.cardsDifficult.cards = target.dataset.cards;
    target.classList.add('choosen');
})

startButton.addEventListener('click', () => {
    document.body.innerHTML = '';
});