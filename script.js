// Array of 5 quiz questions with their answer choices and correct answer
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
    question: "What is the largest ocean in the world?",
    choices: ["Pacific", "Atlantic", "Indian", "Arctic"],
    answer: "Pacific",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars",
  },
  {
    question: "What is the smallest prime number?",
    choices: ["0", "1", "2", "3"],
    answer: "2",
  },
];

// Function to render all questions and their answer options
function renderQuestions() {
  // Check if questions is an array, otherwise throw an error.
  if (!Array.isArray(questions)) {
    throw new TypeError("Expected `questions` to be an array.");
  }

  // Try to retrieve any saved answers from sessionStorage.
  let progress = {};
  if (sessionStorage.getItem("progress")) {
    progress = JSON.parse(sessionStorage.getItem("progress"));
  }

  // Get the container element where questions will be displayed.
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ""; // Clear any existing content.

  // Loop through each question in the questions array.
  questions.forEach((question, index) => {
    // Create a div element for the current question.
    const questionDiv = document.createElement("div");

    // Add the question text inside an <h3> tag.
    questionDiv.innerHTML = `<h3>${index + 1}. ${question.question}</h3>`;

    // Loop through each answer choice.
    question.choices.forEach((choice) => {
      // If the user previously selected an answer for this question,
      // check if this choice is the saved answer.
      const isChecked = progress[`question-${index}`] === choice ? "checked" : "";
      // Build the HTML for each radio button and its label.
      const choiceHtml = `
        <div>
          <input type="radio" name="question-${index}" value="${choice}" ${isChecked}>
          <label>${choice}</label>
        </div>
      `;
      // Append the radio button HTML to the questionDiv.
      questionDiv.innerHTML += choiceHtml;
    });
    // Append the complete question block to the questions container.
    questionsElement.appendChild(questionDiv);
  });
}

// Render the questions when the page loads.
renderQuestions();

// Use event delegation on the questions container to save progress when a radio button is changed.
document.getElementById("questions").addEventListener("change", function(event) {
  // Check if the changed element is a radio button.
  if (event.target.matches("input[type='radio']")) {
    const name = event.target.name; // For example, "question-0"
    const value = event.target.value; // The choice selected by the user

    // Retrieve any previously saved progress from sessionStorage.
    let progress = {};
    if (sessionStorage.getItem("progress")) {
      progress = JSON.parse(sessionStorage.getItem("progress"));
    }

    // Save the user's answer for this question.
    progress[name] = value;
    // Store the updated progress object back into sessionStorage.
    sessionStorage.setItem("progress", JSON.stringify(progress));
  }
});

// When the page loads, if a score is stored in localStorage, display it.
if (localStorage.getItem("score") !== null) {
  document.getElementById("score").textContent =
    `Your score is ${localStorage.getItem("score")} out of ${questions.length}.`;
}

// Add an event listener to the Submit button to calculate and display the final score.
document.getElementById("submit").addEventListener("click", function() {
  // Retrieve the user's progress (answers) from sessionStorage.
  let progress = {};
  if (sessionStorage.getItem("progress")) {
    progress = JSON.parse(sessionStorage.getItem("progress"));
  }

  // Initialize the score counter.
  let score = 0;

  // Loop through all questions to check each answer.
  questions.forEach((question, index) => {
    // Check if the user answered this question and if the answer is correct.
    if (progress[`question-${index}`] && progress[`question-${index}`] === question.answer) {
      score++;
    }
  });

  // Display the final score in the score div.
  document.getElementById("score").textContent =
    `Your score is ${score} out of ${questions.length}.`;

  // Save the final score in localStorage under the key "score".
  localStorage.setItem("score", score);
});
