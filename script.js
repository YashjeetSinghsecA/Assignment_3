// script.js
document.addEventListener('DOMContentLoaded', function() {
    const authInput = document.getElementById('auth-code');
    const authButton = document.getElementById('auth-button');
    const authContainer = document.getElementById('auth-container');
    const quizContainer = document.getElementById('quiz');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('next-button');
    const resultsElement = document.getElementById('results');
    const scoreContainer = document.getElementById('score-container');

    const correctAuthCode = 'formula1'; // Fake authentication code
    let currentQuestionIndex = 0;
    let score = 0;

    const questions = [
        {
            question: 'Who won the Formula 1 World Championship in 2023?',
            options: ['Lewis Hamilton', 'Max Verstappen', 'Charles Leclerc', 'Valtteri Bottas'],
            correctAnswer: 'Max Verstappen'
        },
        {
            question: 'Which team won the Constructors\' Championship in 2022?',
            options: ['Mercedes', 'Red Bull Racing', 'Ferrari', 'McLaren'],
            correctAnswer: 'Mercedes'
        },
        {
            question: 'Who holds the record for the most Formula 1 World Championships?',
            options: ['Michael Schumacher', 'Lewis Hamilton', 'Juan Manuel Fangio', 'Sebastian Vettel'],
            correctAnswer: 'Michael Schumacher'
        },
        {
            question: 'Which Grand Prix circuit is known for its street circuit layout and held at night?',
            options: ['Monaco Grand Prix', 'Singapore Grand Prix', 'Azerbaijan Grand Prix (Baku)', 'Abu Dhabi Grand Prix'],
            correctAnswer: 'Singapore Grand Prix'
        },
        {
            question: 'Who is the youngest Formula 1 World Champion in history?',
            options: ['Sebastian Vettel', 'Michael Schumacher', 'Lewis Hamilton', 'Max Verstappen'],
            correctAnswer: 'Sebastian Vettel'
        },
        {
            question: 'Which team introduced the revolutionary "ground effect" car in Formula 1?',
            options: ['Ferrari', 'Lotus', 'McLaren', 'Williams'],
            correctAnswer: 'Lotus'
        }
    ];

    authButton.addEventListener('click', function(event) {
        event.preventDefault();
        const enteredCode = authInput.value.trim();
        if (enteredCode === correctAuthCode) {
            authContainer.style.display = 'none';
            quizContainer.style.display = 'block';
            showQuestion();
        } else {
            alert('Incorrect access code. Please try again.');
            authInput.value = '';
        }
    });

    nextButton.addEventListener('click', function(event) {
        event.preventDefault();
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (!selectedOption) {
            alert('Please select an answer.');
            return;
        }

        const userAnswer = selectedOption.value;
        const currentQuestion = questions[currentQuestionIndex];

        if (userAnswer === currentQuestion.correctAnswer) {
            score++;
            resultsElement.innerHTML = '<p class="correct">Correct!</p>';
        } else {
            resultsElement.innerHTML = `<p class="incorrect">Incorrect! Correct answer: ${currentQuestion.correctAnswer}</p>`;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            progressBar.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;
            showQuestion();
        } else {
            endQuiz();
        }
    });

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;

        optionsElement.innerHTML = '';
        currentQuestion.options.forEach((option, index) => {
            const optionLabel = document.createElement('label');
            optionLabel.innerHTML = `
                <input type="radio" name="answer" value="${option}">
                ${option}
            `;
            optionsElement.appendChild(optionLabel);
        });
    }

    function endQuiz() {
        quizContainer.style.display = 'none';
        scoreContainer.style.display = 'block';
        document.getElementById('score').textContent = `Your Final Score: ${score} out of ${questions.length}`;
    }
});
