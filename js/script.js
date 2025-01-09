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
        "question": "PHP foi desenvolvido para qual fim?",
        "answers": 
        [
            {
                "answer": "back-end",
                "correct": true
            },
            {
                "answer": "front-end",
                "correct": false
            },
            {
                "answer": "Sistema operacional",
                "correct": false
            },
            {
                "answer": "Banco de dados",
                "correct": false
            },
        ]
    },
    {
        "question": "Uma forma de declarar variável em JavaScript:",
        "answers": 
        [
            {
                "answer": "$var",
                "correct": false
            },
            {
                "answer": "var",
                "correct": true
            },
            {
                "answer": "@var",
                "correct": false
            },
            {
                "answer": "#let",
                "correct": false
            },
        ]
    },
    {
        "question": "Qual o seletor de id no CSS?",
        "answers": 
        [
            {
                "answer": "#",
                "correct": true
            },
            {
                "answer": ".",
                "correct": false
            },
            {
                "answer": "@",
                "correct": false
            },
            {
                "answer": "/",
                "correct": false
            },
        ]
    },
]

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
                console.log(this);
            })


            console.log(answerTemplate);

        }
    );

    // próxima questão (incrementa o índice da questão) 

    actualQuestion++;

}   

// inicialização do quiz

init();
  