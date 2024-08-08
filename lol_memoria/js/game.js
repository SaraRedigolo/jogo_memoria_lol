const grid = document.querySelector('.grid');

const characters = [
    'lulu',
    'milio',
    'kaisa',
    'vayne',
    'yuumi',
    'braum',
    'senna',
    'janna',
    'yasuo',
    'zed'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        // Cartas são iguais, mantenha-as reveladas
        firstCard.removeEventListener('click', revealCard);
        secondCard.removeEventListener('click', revealCard);
        resetCards();
    } else {
        // Cartas são diferentes, esconda-as depois de um pequeno atraso
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            resetCards();
        }, 1000);
    }
}

const resetCards = () => {
    firstCard = '';
    secondCard = '';
}

const revealCard = ({ target }) => {
    if (target.parentNode.classList.contains('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }
}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach(character => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

// Inicia o jogo
loadGame();
