function calcResult() {

    if (choicesList.one === choicesList.two || choicesList.one === choicesList.three) {
        return choicesList.one;
    }
    
    else if (choicesList.two === choicesList.three ) {
        return choicesList.two;
    }

    else 
        return choicesList.one;   

}

function isQuizFinished() {

    if (choicesList.one !== null && choicesList.two !== null && choicesList.three !== null) {

        // Tolgo i listener

        const answers = document.querySelectorAll('.choice-grid div');
        for (let answer of answers) {
            answer.removeEventListener('click', selection);
        }

        // Mostro il risultato

        const section = document.querySelector('#result');
        section.classList.remove('hidden');

        const result = calcResult();

        const title = document.querySelector('#title');
        const contents = document.querySelector('#contents');
            
        title.textContent = RESULTS_MAP[result].title;
        contents.textContent = RESULTS_MAP[result].contents;
        
    }
    
}

function restartQuiz(event) {

    // Cancello le classi e aggiungo di nuovo i listener

    const answers = document.querySelectorAll('.choice-grid div');
    for (let answer of answers) {

        answer.addEventListener('click', selection);
        answer.classList.remove("unselected");
        answer.classList.remove("selected");
        const checkboxes = answer.querySelector(".checkbox");
        checkboxes.src = 'images/unchecked.png';
        
    }

    // Nascondo il risultato

    const section = document.querySelector('#result');
    section.classList.add('hidden');

    // Resetto le scelte

    choicesList.one = null;
    choicesList.two = null;
    choicesList.three = null;
    
}

function assignChoice(choice, index) {

    choicesList[index] = choice;
    console.log(choicesList);

}

function selection(event) {

    // Selezione del box

    const container = event.currentTarget;
    container.classList.add('selected');
    container.classList.remove('unselected');
    const check = container.querySelector('.checkbox');
    check.src = 'images/checked.png';

    // Inserisco la scelta nella mappa

    assignChoice(container.dataset.choiceId, container.dataset.questionId);

    // Deselezione degli altri box 

    const parent = container.parentNode;
    const children = parent.querySelectorAll('div');
    for (let child of children) {
        if (child !== container) {
            child.classList.add("unselected");
            child.classList.remove("selected");
            const childCheckbox = child.querySelector(".checkbox");
            childCheckbox.src = 'images/unchecked.png';
        }
    }

    // Verifica se ho dato tutte le risposte

    isQuizFinished();
}


// Variabili e listener

const answers = document.querySelectorAll('.choice-grid div');
for (let answer of answers) {
    answer.addEventListener('click', selection);
}

const choicesList = {

    // Mappa: data-question-id -> data-choice-id

    "one" : null,
    "two" : null,
    "three" : null

}; 

const button = document.querySelector('button');
button.addEventListener("click", restartQuiz);