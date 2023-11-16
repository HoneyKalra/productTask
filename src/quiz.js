const quizData = [
    {
        question: "What is the capital of India?",
        options: ["Delhi", "Berlin", "Madrid", "Rome"],
        correctAnswer: "Delhi"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    }
    
];


let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");

    questionContainer.textContent = currentQuestion.question;

    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("label");
        optionElement.className = "block cursor-pointer";
        optionElement.innerHTML = `
        <input type="radio" name="option" value="${index}">
        <span class="ml-2">${option}</span>
    `;
        optionsContainer.appendChild(optionElement);
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        return; // No option selected
    }

    const selectedIndex = parseInt(selectedOption.value, 10);
    const currentQuestion = quizData[currentQuestionIndex];
    const resultContainer = document.getElementById("result");
    const scoreContainer = document.getElementById("score");

    if (currentQuestion.correctAnswer === currentQuestion.options[selectedIndex]) {
        score++;
        resultContainer.textContent = "Correct!";
    } else {
        resultContainer.textContent = "Wrong! The correct answer is: " + currentQuestion.correctAnswer;
    }

    // Disable options after answering
    const options = document.querySelectorAll('input[name="option"]');
    options.forEach(option => option.disabled = true);


}

function nextQuestion() {
    const resultContainer = document.getElementById("result");
    resultContainer.textContent = ""; // Clear previous result

    // Enable options for the next question
    const options = document.querySelectorAll('input[name="option"]');
    options.forEach(option => option.disabled = false);

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        // Display final score when all questions are answered
        document.getElementById("question-container").textContent = "Quiz completed!";
        document.getElementById("options-container").innerHTML = "";
        document.getElementById("result").textContent = "Your final score is: " + score + " out of " + quizData.length;
        document.getElementById("score").textContent = "Score: " + score; // Display the final score
        document.getElementsByTagName("button")[0].style.display = "none"; // Hide the "Next" button
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementsByTagName("button")[0].style.display = "block"; // Show the "Next" button
    loadQuestion();
    document.getElementById("result").textContent = "";
    document.getElementById("score").textContent = "";
}

// Initial load function called//
loadQuestion();