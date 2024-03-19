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
const questionEl = document.getElementsByClassName('question-text')[0];
const answersEl = questionsSectionEl.getElementsByTagName('ol')[0];
const saveResultButtonEl = document.getElementsByClassName('save-result')[0];
const nameInputEl = document.getElementsByClassName('name-input')[0];
const highscoresButtonEl =
  document.getElementsByClassName('highscores-button')[0];
const highscoresSectionEl = document.getElementById('highscores');
const highscoresTableEl = highscoresSectionEl.getElementsByTagName('table')[0];
const answerFeedbackEl = document.getElementsByClassName('answer-feedback')[0];

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

  isAnswerCorrect ? reward() : punish();

  answerFeedbackEl.classList.remove('hidden');

  setTimeout(() => {
    answerFeedbackEl.classList.add('hidden');
  }, 1000);
  quizState.curQuestionIndex += 1;
};

const reward = () => {
  quizState.score += POINTS_PER_CORRECT_ANSWER;
  answerFeedbackEl.textContent = 'Верно!';
};

const punish = () => {
  answerFeedbackEl.textContent = 'Неверно!';

  if (quizState.timeLeft > PENALTY_TIME) {
    quizState.timeLeft -= PENALTY_TIME;
  } else {
    quizState.timeLeft = 0;
  }
};

const saveResult = event => {
  event.preventDefault();
  if (nameInputEl.value) {
    const highscores = JSON.parse(localStorage.getItem('highscores')) ?? [];
    highscores.push({ name: nameInputEl.value, score: quizState.score });
    highscores.sort((a, b) => b.score - a.score);

    localStorage.setItem('highscores', JSON.stringify(highscores));
    showHighscores();
  }
};

const finishQuiz = () => {
  quizState.isRunnig = false;
  quizState.timeLeft = 0;
  timeEl.textContent = 0;

  highscoresButtonEl.classList.remove('hidden');
  timerEl.classList.add('hidden');
  questionsSectionEl.classList.add('hidden');
  resultSectionEl.classList.remove('hidden');
  timerEl.classList.add('hidden');
  questionsSectionEl.classList.add('hidden');
  scoreEl.textContent = quizState.score;

  saveResultButtonEl.addEventListener('click', saveResult);
};

const startQuiz = event => {
  highscoresButtonEl.classList.add('hidden');
  timerEl.classList.remove('hidden');
  questionsSectionEl.classList.remove('hidden');
  welcomeSectionEl.classList.add('hidden');

  quizState.timeLeft = TIME_LIMIT;
  quizState.isRunnig = true;
  quizState.curQuestionIndex = 0;
  quizState.score = 0;
  renderQuestion();

  timeEl.textContent = quizState.timeLeft;
  const intervalId = setInterval(() => {
    if (
      quizState.timeLeft <= 0 ||
      quizState.curQuestionIndex === QUIZ_DATA.length
    ) {
      clearInterval(intervalId);
      finishQuiz();
    } else {
      quizState.timeLeft -= 1;
      timeEl.textContent = quizState.timeLeft;
    }
  }, 1000);
};

const showHighscores = () => {
  const curHighscoresTableBodyEl =
    highscoresTableEl.getElementsByTagName('tbody');

  if (curHighscoresTableBodyEl) {
    for (let el of curHighscoresTableBodyEl) {
      el.remove();
    }
  }

  headerEl.classList.add('hidden');
  welcomeSectionEl.classList.add('hidden');
  questionsSectionEl.classList.add('hidden');
  resultSectionEl.classList.add('hidden');
  highscoresSectionEl.classList.remove('hidden');

  const highscoresTableBodyEl = document.createElement('tbody');
  highscoresTableEl.appendChild(highscoresTableBodyEl);

  const highscores = JSON.parse(localStorage.getItem('highscores'));
  highscores.forEach((item, i) => {
    const rowEl = document.createElement('tr');
    const numberCellEl = document.createElement('td');
    numberCellEl.textContent = i + 1;
    const nameCellEl = document.createElement('td');
    nameCellEl.textContent = item.name;
    const scoreCellEl = document.createElement('td');
    scoreCellEl.textContent = item.score;
    rowEl.appendChild(numberCellEl);
    rowEl.appendChild(nameCellEl);
    rowEl.appendChild(scoreCellEl);
    highscoresTableBodyEl.appendChild(rowEl);
  });
};

const renderHighscoreTableButtons = () => {
  const curTableActionsContainer =
    highscoresTableEl.querySelector('table-actions');

  if (curTableActionsContainer) {
    curTableActionsContainer.remove();
  }

  const tableActionsContainer = document.createElement('div');
  tableActionsContainer.classList.add('flex-row', 'table-actions');

  const resetHighscoresButtonEl = document.createElement('button');
  resetHighscoresButtonEl.textContent = 'Сбросить результаты';
  resetHighscoresButtonEl.addEventListener('click', resetHighscores);
  tableActionsContainer.appendChild(resetHighscoresButtonEl);

  const goToWelcomeButtonEl = document.createElement('button');
  goToWelcomeButtonEl.textContent = 'Вернуться на главную';
  goToWelcomeButtonEl.addEventListener('click', goToWelcome);
  tableActionsContainer.appendChild(goToWelcomeButtonEl);

  highscoresSectionEl.appendChild(tableActionsContainer);
};

const resetHighscores = () => {
  localStorage.setItem('highscores', JSON.stringify([]));
  showHighscores();
};

const goToWelcome = () => {
  headerEl.classList.remove('hidden');
  welcomeSectionEl.classList.remove('hidden');
  highscoresSectionEl.classList.add('hidden');
};

const init = () => {
  pointsEl.textContent = POINTS_PER_CORRECT_ANSWER;
  penaltyTimeEl.textContent = PENALTY_TIME;
  renderHighscoreTableButtons();
  highscoresButtonEl.addEventListener('click', showHighscores);
  strartButtonEl.addEventListener('click', startQuiz);
};

init();
