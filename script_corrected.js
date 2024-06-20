const questions = [
    {
        question: "Who is the current (2024) CJI of India?",
        answers: [
            { text: "S Jayshankar", correct: false },
            { text: "Nirmal Sitaraman", correct: false },
            { text: "D Y Chandrachud", correct: true },
            { text: "N V Ramana", correct: false }
        ]
    },
    {
        question: "Which high court ruled that 'Caste will have no role to play in appointment of temple priests'?",
        answers: [
            { text: "Madras High Court", correct: true },
            { text: "Delhi High Court", correct: false },
            { text: "Allahabad High Court", correct: false },
            { text: "Calcutta High Court", correct: false }
        ]
    },
    {
        question: "Which country will host men's junior Hockey World Cup in 2025?",
        answers: [
            { text: "Germany", correct: false },
            { text: "France", correct: false },
            { text: "India", correct: true },
            { text: "Malaysia", correct: false }
        ]
    },
    {
        question: "UNGA has which year as an 'International year of quantum Science and technology'?",
        answers: [
            { text: "2024", correct: false },
            { text: "2025", correct: true },
            { text: "2026", correct: false },
            { text: "2027", correct: false }
        ]
    },
    {
        question: "What is the theme for 'World Food Safety Day 2024'?",
        answers: [
            { text: "Prepare for the unexpected", correct: true },
            { text: "Food standards save lives", correct: false },
            { text: "Safer food, better health", correct: false },
            { text: "Safe food today for a healthy tomorrow", correct: false }
        ]
    }
];

alert("Welcome to this Quiz Section");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
 
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("box");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        score++;
    }
    showNextButton();
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("incorrect");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("incorrect");
}

function showNextButton() {
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}`;
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerText === "Play Again") {
        startQuiz();
    } else {
        handleNextButton();
    }
});

previousButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
});

startQuiz();
