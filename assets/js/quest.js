document.addEventListener('DOMContentLoaded', function () {
    const navbarContainer = document.getElementById('navbar-container');
    
    fetch('assets/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar a navbar:', error));
});

document.addEventListener('DOMContentLoaded', function () {
    const navbarContainer = document.getElementById('footer-container');
    
    // Faz o fetch do conteúdo da navbar
    fetch('assets/components/footer.html')
        .then(response => response.text())
        .then(data => {
            // Insere o conteúdo da navbar dentro do elemento
            navbarContainer.innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar a navbar:', error));
});

const questions = [
    "O acesso à tecnologia melhora minha capacidade de aprender novos conceitos.",
    "Sinto que a tecnologia aumenta minha capacidade de concentração.",
    "A tecnologia me ajuda a organizar melhor minhas tarefas diárias.",
    "Sinto que uso mais informações de forma crítica ao acessar a tecnologia.",
    "O uso constante de dispositivos digitais afeta negativamente minha memória.",
    "A tecnologia facilita a colaboração com outras pessoas em projetos.",
    "Sinto que me distraio facilmente quando uso a tecnologia.",
    "O acesso à informação online melhora minha compreensão de assuntos complexos.",
    "A tecnologia me ajuda a desenvolver habilidades de resolução de problemas.",
    "Sinto que passo muito tempo navegando em conteúdos que não são relevantes para mim.",
    "Acredito que o uso do smartphone prejudica a qualidade do meu sono.",
    "Sinto-me mais ansioso quando estou longe do meu celular.",
    "Uso o smartphone como uma forma de escapar de problemas.",
    "Acredito que o uso excessivo do celular afeta meus relacionamentos interpessoais.",
    "O celular me ajuda a me manter conectado com amigos e familiares.",
    "Sinto-me dependente do meu celular para me sentir conectado ao mundo.",
    "Acredito que o celular me distrai durante atividades que exigem concentração.",
    "Uso o celular como ferramenta de trabalho.",
    "Acredito que o celular limita minha criatividade.",
    "Sinto-me mais produtivo quando uso o celular."
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

    optionsContainer.innerHTML = '';

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

function getSelectedAnswer() {
    const radios = document.querySelectorAll('input[name="answer"]');
    for (let radio of radios) {
        if (radio.checked) {
            return parseInt(radio.value);
        }
    }
    return null;
}

startButton.addEventListener('click', () => {
    document.getElementById('intro').classList.add('hidden');
    quizContainer.classList.remove('hidden');
    showQuestion(currentQuestionIndex);
});

nextButton.addEventListener('click', () => {
    const answer = getSelectedAnswer();
    if (answer === null) {
        alert('Por favor, selecione uma resposta.');
        return;
    }

    score += answer;

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
