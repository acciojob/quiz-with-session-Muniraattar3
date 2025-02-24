// Array of 5 quiz questions with their choices and correct answer
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
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
    answer: "Ottawa",
  },
];

// Function to render quiz questions and options
function renderQuestions() {
  // Ensure questions is an array
  if (!Array.isArray(questions)) {
    throw new TypeError("Expected `questions` to be an array.");
  }

  // Retrieve saved progress from sessionStorage (if any)
  let progress = {};
  if (sessionStorage.getItem("progress")) {
    progress = JSON.parse(sessionStorage.getItem("progress"));
  }

  // Get the container element for the questions
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ""; // Clear previous content

  // Loop through each question
  questions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    // Display only the question text without numbering
    questionDiv.innerHTML = `<h3>${question.question}</h3>`;

    // Loop through each choice for the current question
    question.choices.forEach((choice) => {
      // If the saved answer for this question equals this choice,
      // mark the radio button as checked using checked="true"
      const isChecked =
        progress[`question-${index}`] === choice ? 'checked="true"' : "";
      const choiceHtml = `
        <div>
          <input type="radio" name="question-${index}" value="${choice}" ${isChecked}>
          <label>${choice}</label>
        </div>`;
      questionDiv.innerHTML += choiceHtml;
    });
    // Append the current question block to the container
    questionsElement.appendChild(questionDiv);
  });
}

// Render the questions when the page loads.
renderQuestions();

// Listen for changes on any radio button to update session storage
document.getElementById("questions").addEventListener("change", function (event) {
  if (event.target.matches("input[type='radio']")) {
    const name = event.target.name; // e.g., "question-0"
    const value = event.target.value; // Selected answer

    // Retrieve any saved progress from sessionStorage
    let progress = {};
    if (sessionStorage.getItem("progress")) {
      progress = JSON.parse(sessionStorage.getItem("progress"));
    }

    // Save the user's selection for this question
    progress[name] = value;
    sessionStorage.setItem("progress", JSON.stringify(progress));
  }
});

// On page load, if a final score exists in localStorage, display it.
if (localStorage.getItem("score") !== null) {
  document.getElementById("score").textContent =
    `Your score is ${localStorage.getItem("score")} out of ${questions.length}.`;
}

// Add an event listener to the Submit button to calculate and display the final score.
document.getElementById("submit").addEventListener("click", function () {
  // Retrieve user's answers from sessionStorage
  let progress = {};
  if (sessionStorage.getItem("progress")) {
    progress = JSON.parse(sessionStorage.getItem("progress"));
  }

  // Initialize the score counter
  let score = 0;
  // Check each question's answer against the user's selection
  questions.forEach((question, index) => {
    if (
      progress[`question-${index}`] &&
      progress[`question-${index}`] === question.answer
    ) {
      score++;
    }
  });

  // Display the score in the designated score element
  document.getElementById("score").textContent =
    `Your score is ${score} out of ${questions.length}.`;

  // Save the final score in localStorage
  localStorage.setItem("score", score);
});
