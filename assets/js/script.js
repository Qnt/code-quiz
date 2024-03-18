const QUIZ_DATA = [
  {
    id: 1,
    question:
      'Какой из следующих операторов является оператором строгого равенства в JavaScript?',
    answers: [
      { id: 1, text: '==', correct: false },
      { id: 2, text: '===', correct: true },
      { id: 3, text: '=', correct: false },
      { id: 4, text: '!=', correct: false },
    ],
  },
  {
    id: 2,
    question:
      'Какое ключевое слово используется для объявления переменной в JavaScript, имеющей область видимости в пределах блока кода, в котором она определена?',
    answers: [
      { id: 1, text: 'var', correct: false },
      { id: 2, text: 'let', correct: true },
      { id: 3, text: 'const', correct: false },
      { id: 4, text: 'local', correct: false },
    ],
  },
  {
    id: 3,
    question:
      'Какой метод используется для проверки того, является ли определенное значение массивом в JavaScript?',
    answers: [
      { id: 1, text: 'isArray()', correct: true },
      { id: 2, text: 'isArr()', correct: false },
      { id: 3, text: 'checkArray()', correct: false },
      { id: 4, text: 'arrayCheck()', correct: false },
    ],
  },
  {
    id: 4,
    question:
      'Какой из следующих методов JavaScript используется для удаления элемента по индексу из массива?',
    answers: [
      { id: 1, text: 'removeElement()', correct: false },
      { id: 2, text: 'splice()', correct: true },
      { id: 3, text: 'slice()', correct: false },
      { id: 4, text: 'deleteElement()', correct: false },
    ],
  },
  {
    id: 5,
    question:
      'Какой тип данных будет возвращен при выполнении операции typeof для функции в JavaScript?',
    answers: [
      { id: 1, text: 'function', correct: true },
      { id: 2, text: 'object', correct: false },
      { id: 3, text: 'undefined', correct: false },
      { id: 4, text: 'callable', correct: false },
    ],
  },
  {
    id: 6,
    question:
      'Какой метод используется для преобразования строки в массив символов в JavaScript?',
    answers: [
      { id: 1, text: 'toArray()', correct: false },
      { id: 2, text: 'split()', correct: true },
      { id: 3, text: 'separate()', correct: false },
      { id: 4, text: 'explode()', correct: false },
    ],
  },
  {
    id: 7,
    question:
      'Какой оператор используется для объединения двух или более массивов в JavaScript?',
    answers: [
      { id: 1, text: 'merge()', correct: false },
      { id: 2, text: 'join()', correct: false },
      { id: 3, text: 'concat()', correct: true },
      { id: 4, text: 'combine()', correct: false },
    ],
  },
  {
    id: 8,
    question:
      'Какой тип данных будет возвращен при выполнении операции typeof для null в JavaScript?',
    answers: [
      { id: 1, text: 'object', correct: true },
      { id: 2, text: 'null', correct: false },
      { id: 3, text: 'undefined', correct: false },
      { id: 4, text: 'void', correct: false },
    ],
  },
  {
    id: 9,
    question:
      'Какой метод используется для определения того, содержит ли массив определенный элемент в JavaScript?',
    answers: [
      { id: 1, text: 'hasElement()', correct: false },
      { id: 2, text: 'contains()', correct: false },
      { id: 3, text: 'includes()', correct: true },
      { id: 4, text: 'findElement()', correct: false },
    ],
  },
  {
    id: 10,
    question:
      'Какой из следующих циклов в JavaScript не гарантирует выполнение хотя бы одного прохода по своему телу кода?',
    answers: [
      { id: 1, text: 'for loop', correct: false },
      { id: 2, text: 'do...while loop', correct: false },
      { id: 3, text: 'while loop', correct: false },
      { id: 4, text: 'forEach loop', correct: true },
    ],
  },
];

const TIME_LIMIT = 60;
const PENALTY_TIME = 10;
const POINTS_PER_CORRECT_ANSWER = 1;

const quizState = {
  isRunnig: false,
  curQuestionIndex: 0,
  timeLeft: TIME_LIMIT,
  score: 0,
};

const headerEl = document.getElementsByTagName('header')[0];
const pointsEl = document.getElementById('points');
const penaltyTimeEl = document.getElementById('penalty-time');
const timerEl = document.getElementById('timer');
const timeEl = document.getElementById('time');
const strartButtonEl = document.getElementById('start-button');
const welcomeSectionEl = document.getElementById('welcome');
const questionsSectionEl = document.getElementById('questions');
const resultSectionEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const questionEl = questionsSectionEl.getElementsByTagName('h3')[0];
const answersEl = questionsSectionEl.getElementsByTagName('ol')[0];

const renderQuestion = () => {
  while (answersEl.firstChild) {
    answersEl.removeChild(answersEl.firstChild);
  }
  if (quizState.curQuestionIndex === QUIZ_DATA.length) {
    return;
  }
  const questionData = QUIZ_DATA[quizState.curQuestionIndex];
  questionEl.textContent = questionData.question;
  questionData.answers.forEach(answer => {
    const answerLiEl = document.createElement('li');
    const answerButtonEl = document.createElement('button');
    answerButtonEl.addEventListener('click', checkAnswer);
    answerButtonEl.addEventListener('click', renderQuestion);
    answerLiEl.appendChild(answerButtonEl);
    answersEl.appendChild(answerLiEl);
    answerButtonEl.textContent = answer.text;
    answerButtonEl.setAttribute('data-answer-id', answer.id);
  });
};

const checkAnswer = event => {
  const answerId = +event.target.getAttribute('data-answer-id');
  const isAnswerCorrect = QUIZ_DATA[quizState.curQuestionIndex].answers.find(
    answer => answer.id === answerId
  ).correct;

  isAnswerCorrect
    ? (quizState.score += POINTS_PER_CORRECT_ANSWER)
    : deductPenaltyTime();

  console.log(quizState.score);
  quizState.curQuestionIndex += 1;
};

const deductPenaltyTime = () => {
  if (quizState.timeLeft > PENALTY_TIME) {
    quizState.timeLeft -= PENALTY_TIME;
  } else {
    quizState.timeLeft = 0;
  }
};

const finishTest = () => {
  quizState.isRunnig = false;
  quizState.timeLeft = 0;
  timeEl.textContent = 0;

  timerEl.classList.add('hidden');
  questionsSectionEl.classList.add('hidden');
  resultSectionEl.classList.remove('hidden');
  timerEl.classList.add('hidden');
  questionsSectionEl.classList.add('hidden');
  scoreEl.textContent = quizState.score;
};

const startQuiz = event => {
  headerEl.classList.remove('hidden');
  questionsSectionEl.classList.remove('hidden');
  welcomeSectionEl.classList.add('hidden');

  renderQuestion();
  quizState.isRunnig = true;

  // timeEl.textContent = quizState.timeLeft;
  const timerId = setInterval(() => {
    if (
      quizState.timeLeft <= 0 ||
      quizState.curQuestionIndex === QUIZ_DATA.length
    ) {
      clearInterval(timerId);
      finishTest();
    } else {
      quizState.timeLeft -= 1;
      timeEl.textContent = quizState.timeLeft;
    }
  }, 1000);
};

const init = () => {
  pointsEl.textContent = POINTS_PER_CORRECT_ANSWER;
  penaltyTimeEl.textContent = PENALTY_TIME;
  strartButtonEl.addEventListener('click', startQuiz);
};

init();