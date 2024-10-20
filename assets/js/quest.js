
document.addEventListener('DOMContentLoaded', function () {
    const navbarContainer = document.getElementById('navbar-container');
    
    fetch('../components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar a navbar:', error));
});

const questions = [
    "A tecnologia melhora minha capacidade de concentração no trabalho ou nos estudos.",
    "O uso frequente de dispositivos tecnológicos afeta negativamente minha memória.",
    "A tecnologia aumenta minha capacidade de processar informações rapidamente.",
    "Eu sinto que a tecnologia reduz minha capacidade de pensar de maneira profunda e reflexiva."
];

let currentQuestionIndex = 0;
let score = 0;

const startButton = document.getElementById('startButton');
const nextButton = document.getElementById('nextButton');
const quizContainer = document.getElementById('quiz');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const resultContainer = document.getElementById('result');
const resultText = document.getElementById('resultText');

// Função para mostrar uma pergunta e criar os checkboxes
function showQuestion(index) {
    const question = questions[index];
    questionText.innerText = question;

    // Limpar opções anteriores
    optionsContainer.innerHTML = '';

    // Criar checkboxes
    for (let i = 1; i <= 5; i++) {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="radio" name="answer" value="${i}"> ${i} - ${
            i === 1 ? 'discordo totalmente' :
            i === 2 ? 'discordo' :
            i === 3 ? 'neutro' :
            i === 4 ? 'concordo' : 'concordo totalmente'}
        `;
        optionsContainer.appendChild(label);
    }

    nextButton.classList.add('hidden');
}

// Função para verificar se uma resposta foi selecionada
function getSelectedAnswer() {
    const radios = document.querySelectorAll('input[name="answer"]');
    for (let radio of radios) {
        if (radio.checked) {
            return parseInt(radio.value);
        }
    }
    return null;
}

// Quando o usuário clica no botão "Começar"
startButton.addEventListener('click', () => {
    document.getElementById('intro').classList.add('hidden');
    quizContainer.classList.remove('hidden');
    showQuestion(currentQuestionIndex);
});

// Quando o usuário clica no botão "Próximo"
nextButton.addEventListener('click', () => {
    const answer = getSelectedAnswer();
    if (answer === null) {
        alert('Por favor, selecione uma resposta.');
        return;
    }

    // Adicionar a pontuação da resposta
    score += answer;

    // Ir para a próxima pergunta ou finalizar o quiz
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
});

// Exibir resultado final
function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    resultText.innerText = `Sua pontuação total é: ${score}`;
}

// Monitorar se uma opção foi selecionada para exibir o botão "Próximo"
optionsContainer.addEventListener('click', () => {
    const answer = getSelectedAnswer();
    if (answer !== null) {
        nextButton.classList.remove('hidden');
    }
});
