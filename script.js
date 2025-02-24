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
    choices: ["Russia", "Canada", "China", "USA"],
    answer: "Russia",
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
          <
