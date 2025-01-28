const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  // Add more questions as needed
];

// Ensure questions is an array before rendering
function renderQuestions() {
  if (!Array.isArray(questions)) {
    throw new TypeError("Expected `questions` to be an array.");
  }

  const questionsElement = document.getElementById("questions");
  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `<h3>${index + 1}. ${question.question}</h3>`;
    question.choices.forEach((choice) => {
      const choiceHtml = `
        <div>
          <input type="radio" name="question-${index}" value="${choice}">
          <label>${choice}</label>
        </div>`;
      questionElement.innerHTML += choiceHtml;
    });
    questionsElement.appendChild(questionElement);
  });
}

// Call renderQuestions after ensuring `questions` is loaded
renderQuestions();
