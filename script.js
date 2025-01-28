// Store user answers
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Display questions on the page
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ""; // Clear previous content

  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");

    // Add question text
    const questionText = document.createElement("h3");
    questionText.textContent = `${index + 1}. ${question.question}`;
    questionElement.appendChild(questionText);

    // Add choices
    question.choices.forEach((choice) => {
      const choiceContainer = document.createElement("div");

      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${index}`;
      choiceElement.value = choice;

      // Check if the choice was previously selected
      if (userAnswers[index] === choice) {
        choiceElement.checked = true;
      }

      // Save progress when a choice is selected
      choiceElement.addEventListener("change", () => {
        userAnswers[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;

      choiceContainer.appendChild(choiceElement);
      choiceContainer.appendChild(choiceLabel);

      questionElement.appendChild(choiceContainer);
    });

    questionsElement.appendChild(questionElement);
  });
}

// Calculate and display the score
function calculateScore() {
  let score = 0;

  questions.forEach((question, index) => {
    if (userAnswers[index] === question.answer) {
      score++;
    }
  });

  // Display the score
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Store the score in local storage
  localStorage.setItem("score", score);
}

// Add event listener to the Submit button
document.getElementById("submit").addEventListener("click", () => {
  calculateScore();
});

// Render questions when the page loads
renderQuestions();
