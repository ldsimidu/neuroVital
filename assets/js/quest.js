const questionario = document.getElementById('questionario');
const comecarBtn = document.getElementById('comecar');

let perguntas = [
    {
        pergunta: "O acesso à tecnologia melhora minha capacidade de aprender novos conceitos?",
        opcoes: ["Concordo totalmente", "Concordo", "Nem concordo nem discordo", "Discordo", "Discordo totalmente"]
    },
    {
        pergunta: "Sinto que a tecnologia aumenta minha capacidade de concentração.",
        opcoes: ["Concordo totalmente", "Concordo", "Nem concordo nem discordo", "Discordo", "Discordo totalmente"]
    },
    {
        pergunta: "A tecnologia me ajuda a organizar melhor minhas tarefas diárias.",
        opcoes: ["Concordo totalmente", "Concordo", "Nem concordo nem discordo", "Discordo", "Discordo totalmente"]
    },
    {
        pergunta: "Sinto que uso mais informações de forma crítica ao acessar a tecnologia.",
        opcoes: ["Concordo totalmente", "Concordo", "Nem concordo nem discordo", "Discordo", "Discordo totalmente"]
    },
    {
        pergunta: "O uso constante de dispositivos digitais afeta negativamente minha memória.",
        opcoes: ["Concordo totalmente", "Concordo", "Nem concordo nem discordo", "Discordo", "Discordo totalmente"]
    },
    {
        pergunta: "A tecnologia facilita a colaboração com outras pessoas em projetos.",
        opcoes: ["Concordo totalmente", "Concordo", "Nem concordo nem discordo", "Discordo", "Discordo totalmente"]
    },
    {
        pergunta: "Sinto que me distraio facilmente quando uso a tecnologia.",
        opcoes: ["Concordo totalmente", "Concordo", "Nem concordo nem discordo", "Discordo", "Discordo totalmente"]
    },
    {
        pergunta: "O acesso à informação online melhora minha compreensão de assuntos complexos.",
        opcoes: ["Concordo totalmente", "Concordo", "Nem concordo nem discordo", "Discordo", "Discordo totalmente"]
    },
    {
        pergunta: "A tecnologia me ajuda a desenvolver habilidades de resolução de problemas.",
        opcoes: ["Concordo totalmente", "Concordo", "Nem concordo nem discordo", "Discordo", "Discordo totalmente"]
    },
    {
        pergunta: "Sinto que passo muito tempo navegando em conteúdos que não são relevantes para mim.",
        opcoes: ["Concordo totalmente", "Concordo", "Nem concordo nem discordo", "Discordo", "Discordo totalmente"]
    }
];

let pontuacao = 0;
let perguntaAtual = 0;

function mostrarPergunta(indice) {
    questionario.innerHTML = `
        <p class="pergunta">${perguntas[indice].pergunta}</p>
        <div class="form-check">
            ${perguntas[indice].opcoes.map((opcao, index) => `
                <input class="form-check-input" type="radio" name="resposta${indice}" id="opcao${indice}${index}" value="${index + 1}">
                <label class="form-check-label" for="opcao${indice}${index}">${opcao}</label>
            `).join('')}
        </div>
        <button id="continuar" class="btn btn-primary mt-3">Continuar</button>
    `;

    document.getElementById('continuar').addEventListener('click', () => {
        const respostaSelecionada = document.querySelector('input[name="resposta' + indice + '"]:checked');
        if (respostaSelecionada) {
            pontuacao += parseInt(respostaSelecionada.value);
            perguntaAtual++;

            if (perguntaAtual < perguntas.length) {
                mostrarPergunta(perguntaAtual);
            } else {
                mostrarResultado();
            }
        } else {
            alert("Por favor, selecione uma resposta antes de continuar.");
        }
    });
}

function mostrarResultado() {
    let resultado;
    if (pontuacao >= 40) {
        resultado = "Dependência aguda";
    } else if (pontuacao >= 25) {
        resultado = "Dependência moderada";
    } else {
        resultado = "Dependência leve";
    }

    questionario.innerHTML = `<h2>Resultado:</h2><p>Você se enquadra no perfil de <strong>${resultado}</strong>.</p>`;
}

comecarBtn.addEventListener('click', () => {
    mostrarPergunta(0);
    comecarBtn.style.display = 'none';
});
