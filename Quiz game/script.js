let questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "Which is the largest ocean in the world?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "What is the capital city of France?",
    answers: [
      { text: "Madrid", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "O", correct: false },
      { text: "CO2", correct: false },
      { text: "H2O", correct: true },
      { text: "H2O2", correct: false },
    ],
  },
];

let questionElement = document.getElementById("question"); // это метод JavaScript, который позволяет получить элемент на веб-странице по его уникальному атрибуту id
let answerButtons = document.getElementById("answer-buttons");
let nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next Question"; // innerHTML – самый простой способ считать или изменить HTML-содержимое элемента
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn"); // classList. add('класс'); Этот метод добавляет элементу класс, указанный в скобках
    answerButtons.appendChild(button); // appendChild позволяет вставить в конец какого-либо другой элемент
    if (answer.correct) {
      button.dataset.correct = answer.correct; // dataset позволяет считывать, или устанавливать любые дата-атрибуты на HTML-элементе
    }
    button.addEventListener("click", selectAnswer); // addEventListener() - это метод JavaScript, который позволяет добавлять обработчики событий к элементам на веб-странице.
  });
}

function resetState() {
  nextButton.style.display = "none"; // display определяет тип отображения элемента, как он будет отображаться на веб-странице
  while (answerButtons.firstChild) {
    // Свойство firstChild хранит первый дочерний узел элемента. // Если у элемента нет дочерних элементов - возвращается null .
    answerButtons.removeChild(answerButtons.firstChild); // Метод removeChild позволяет удалить элемент. Применяется к родительскому элементу с указанием элемента, который нужно удалить.
  }
}

function selectAnswer(e) {
  let selectedBtn = e.target; //target - это свойство объекта события (event), которое указывает на элемент, на котором произошло событие.
  let isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct"); // classList. add('класс'); Этот метод добавляет элементу класс, указанный в скобках
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  // Array.from() Функция создаёт новый массив на основе итерируемого или массивоподобного объекта.
  // Свойство children хранит в себе псевдомассив дочерних элементов.
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  localStorage.removeItem("quizState");
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
