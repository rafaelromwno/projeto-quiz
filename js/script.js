'use strict'

// declaração de variáveis

const scoreContainer = document.querySelector("#score-container");
const quizContainer = document.querySelector("#quiz-container");
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// perguntas

const questions = 
[
    {
        "question": "Qual a principal funcionalidade do Git?",
        "answers": 
        [
            {
                "answer": "Controle de versão",
                "correct": true
            },
            {
                "answer": "Gerenciamento de pacotes",
                "correct": false
            },
            {
                "answer": "Desenvolvimento de APIs",
                "correct": false
            },
            {
                "answer": "Criação de containers",
                "correct": false
            }
        ]
    },
    {
        "question": "Qual linguagem é mais utilizada para criar aplicativos Android nativos?",
        "answers": 
        [
            {
                "answer": "Swift",
                "correct": false
            },
            {
                "answer": "Kotlin",
                "correct": true
            },
            {
                "answer": "C#",
                "correct": false
            },
            {
                "answer": "JavaScript",
                "correct": false
            }
        ]
    },
    {
        "question": "O que significa a sigla 'SQL'?",
        "answers": 
        [
            {
                "answer": "Secure Query Language",
                "correct": false
            },
            {
                "answer": "Structured Query Language",
                "correct": true
            },
            {
                "answer": "Server Query Language",
                "correct": false
            },
            {
                "answer": "System Query Language",
                "correct": false
            }
        ]
    },
    {
        "question": "Qual tag HTML é usada para criar um link?",
        "answers": 
        [
            {
                "answer": "<a>",
                "correct": true
            },
            {
                "answer": "<link>",
                "correct": false
            },
            {
                "answer": "<href>",
                "correct": false
            },
            {
                "answer": "<url>",
                "correct": false
            }
        ]
    },
    {
        "question": "O que significa 'const' em JavaScript?",
        "answers": 
        [
            {
                "answer": "Declara uma constante",
                "correct": true
            },
            {
                "answer": "Declara uma variável mutável",
                "correct": false
            },
            {
                "answer": "Declara um objeto estático",
                "correct": false
            },
            {
                "answer": "Declara um número inteiro",
                "correct": false
            }
        ]
    },
    {
        "question": "Qual comando é usado para inicializar um repositório Git?",
        "answers": 
        [
            {
                "answer": "git start",
                "correct": false
            },
            {
                "answer": "git init",
                "correct": true
            },
            {
                "answer": "git create",
                "correct": false
            },
            {
                "answer": "git clone",
                "correct": false
            }
        ]
    },
    {
        "question": "Qual estrutura de dados funciona com o conceito LIFO?",
        "answers": 
        [
            {
                "answer": "Fila (Queue)",
                "correct": false
            },
            {
                "answer": "Pilha (Stack)",
                "correct": true
            },
            {
                "answer": "Lista ligada (Linked List)",
                "correct": false
            },
            {
                "answer": "Árvore binária (Binary Tree)",
                "correct": false
            }
        ]
    },
    {
        "question": "Qual é a função do 'flexbox' no CSS?",
        "answers": 
        [
            {
                "answer": "Posicionar elementos em um grid",
                "correct": false
            },
            {
                "answer": "Criar layouts flexíveis e responsivos",
                "correct": true
            },
            {
                "answer": "Definir estilos para textos",
                "correct": false
            },
            {
                "answer": "Aplicar sombras em caixas",
                "correct": false
            }
        ]
    },
    {
        "question": "Qual operador lógico representa 'OU' em JavaScript?",
        "answers": 
        [
            {
                "answer": "&&",
                "correct": false
            },
            {
                "answer": "||",
                "correct": true
            },
            {
                "answer": "!",
                "correct": false
            },
            {
                "answer": "^",
                "correct": false
            }
        ]
    },
    {
        "question": "O que é uma API REST?",
        "answers": 
        [
            {
                "answer": "Uma biblioteca de JavaScript",
                "correct": false
            },
            {
                "answer": "Uma interface para comunicação entre sistemas baseada em HTTP",
                "correct": true
            },
            {
                "answer": "Um servidor de banco de dados",
                "correct": false
            },
            {
                "answer": "Uma ferramenta de versionamento",
                "correct": false
            }
        ]
    }
];


// início do jogo

function init()
{
    // criar a primeira pergunta

    createQuestion(0);

}

// cria uma pergunta

function createQuestion(indexOfActualQuestion)
{
    // limpar a questão anterior

    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach
    (
        function(btn)
        {
            btn.remove();
        }
    )

    // alterar o número e texto da questão  

    const questionText = question.querySelector('#question-text');
    const questionNumber = question.querySelector('#question-number');

    questionText.textContent = questions[indexOfActualQuestion].question;
    questionNumber.textContent = indexOfActualQuestion + 1;

    // insere as alternativas

    questions[indexOfActualQuestion].answers.forEach
    (
        function(answer, index)
        {
            // cria o modelo do botão do quizz

            const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

            const letterBtn = answerTemplate.querySelector('.btn-letter');
            const answerText = answerTemplate.querySelector('.question-answer');

            letterBtn.textContent = letters[index];
            answerText.textContent = answer['answer'];

            answerTemplate.setAttribute('correct-answer', answer['correct']);

            // remover classes não utilizadas

            answerTemplate.classList.remove('hide');
            answerTemplate.classList.remove('answer-template');

            // inserir alternativa na tela 

            answersBox.appendChild(answerTemplate);

            // inserir um evento de clique no botão

            answerTemplate.addEventListener("click", function(){
                checkAnswer(this);
            })


            console.log(answerTemplate);

        }
    );

    // próxima questão (incrementa o índice da questão) 

    actualQuestion++;

}   

// esconder ou mostrar (toggle) o quiz e placar

function hideOrShowQuizAndScoreBoard()
{

    quizContainer.classList.toggle('hide');
    scoreContainer.classList.toggle('hide');

}

// exibe resultado final

function showResultMessage()
{
    // ocultar o quiz e exibir o placar

    hideOrShowQuizAndScoreBoard();

    // calcular a pontuação

    const score = ((points / questions.length) * 100).toFixed(2);

    // trocar os dados da tela de resultado

    const displayScore = document.querySelector('#display-score span');
    displayScore.textContent = score.toString();

    // alterar o número de perguntas corretas

    const correctAnswers = document.querySelector('#correct-answer');
    correctAnswers.textContent = points.toString();

    // alterar o número de perguntas totais

    const questionsQty = document.querySelector('#questions-qty');
    questionsQty.textContent = questions.length.toString();
    
}

// exibir próxima pergunta

function nextQuestion()
{
    // timer para usuário ver as respostas

    setTimeout
    (
        function()
        {
            // verifica se ainda há perguntas

            if(actualQuestion >= questions.length)
            {
                // apresenta o resultado do quiz

                showResultMessage();

                return; // sair da função
            }

            createQuestion(actualQuestion);

        }
        , 1600
    )
}

// checando a resposta do usuário

function checkAnswer(button)
{
    // selecionar todos os botões

    const buttons =  answersBox.querySelectorAll('button');

    // verifica se a resposta está correta e adiciona classes aos botões

    buttons.forEach
    (
        function(btn)
        {
            if(btn.getAttribute('correct-answer') === "true")
            {
                btn.classList.add('correct-answer');

                // checa se o usuário acertou a pergunta

                if(btn === button)
                {
                    // incremento dos pontos

                    points++;
                }

            }
            else
            {
                btn.classList.add('wrong-answer');
            }
        }
    );

    // exibir próxima pergunta

    nextQuestion(); 

}

// reiniciar o quiz

const restartButton = document.querySelector('#restart');

restartButton.addEventListener
(
    "click", 
    function()
    {
        // zerar o jogo

        actualQuestion = 0;
        points = 0;

        // ocultar o placar e exibir o quiz

        hideOrShowQuizAndScoreBoard();

        // iniciar o jogo novamente

        init()
    }
)

// inicialização do quiz

init();
  