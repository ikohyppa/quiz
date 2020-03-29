//QuizReduzer.js

const reducer = (state, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  //Huom voidaan käsitellä spreadilla. FixMe!
  switch (action.type) {
    case 'initialize':
      return action.data;

    case 'addDbQuizzes':
      action.quizData.forEach(quiz => {
        newState.push(quiz);
      });
      return newState;

    case 'addDbQuestions':
      newState[action.index].questions = action.questions;
      return newState;

    case 'userChangeCheck':
      newState[action.quizIndex].questions[action.questionIndex].options[action.optionIndex].selected = action.value;
      return newState;

    case 'adminChangeCheck':
      newState[action.quizIndex].questions[action.questionIndex].options[action.optionIndex].correct = action.value;
      return newState;

    case 'adminChangeOption':
      newState[action.quizIndex].questions[action.questionIndex].options[action.optionIndex].answer = action.value;
      return newState;

    case 'adminAddOption':
      newState[action.quizIndex].questions[action.questionIndex].options.push({
        option_id: action.option_id,
        question_id: action.question_id,
        answer: null,
        correct: false,
        selected: false
      });
      return newState;

    case 'addCorrect':
      newState[action.quizIndex].questions.forEach(question => {
        question.options.forEach(option => {
          action.correct.forEach(answer => {
            if (answer.option_id === option.option_id) option.correct = answer.correct;
          });
        });
      });
      return newState;

    case 'adminDeleteOption':
      newState[action.quizIndex].questions[action.questionIndex].options.splice([action.optionIndex], 1);
      return newState;

    case 'adminChangeTopic':
      newState[action.quizIndex].questions[action.questionIndex].topic = action.topic;
      newState[action.quizIndex].questions[action.questionIndex].topic_id = action.topic_id;
      return newState;

    case 'adminChangeTopic2':
      newState.forEach((quiz, quizIndex) => {
        quiz.questions.forEach((question, questionIndex) => {
          if (question.topic_id === action.topic_id) newState[quizIndex].questions[questionIndex].topic = action.topic;
        });
      });
      return newState;

    case 'adminDeleteTopic':
      newState.forEach((quiz, quizIndex) => {
        quiz.questions.forEach((question, questionIndex) => {
          if (question.topic === action.deletedTopic) newState[quizIndex].questions[questionIndex].topic = null;
        });
      });
      return newState;

    case 'adminAddQuestion':
      newState[action.quizIndex].questions.push({
        question_id: action.question_id,
        question: '',
        quiz_id: action.quiz_id,
        topic_id: '',
        topic: '',
        allCorrect: false,
        options: []
      });
      return newState;

    case 'adminChangeQuestion':
      newState[action.quizIndex].questions[action.questionIndex].question = action.question;
      return newState;

    case 'adminDeleteQuestion':
      newState[action.quizIndex].questions.splice([action.questionIndex], 1);
      return newState;

    case 'adminAddQuiz':
      newState.push({
        quiz_id: action.quiz_id,
        quiz: action.quiz,
        questions: []
      });
      return newState;

    case 'adminChangeQuiz':
      newState[action.quizIndex].quiz = action.quiz;
      return newState;

    case 'adminDeleteQuiz':
      newState.splice([action.quizIndex], 1);
      return newState;

    case 'toggleQuizOrder':
      // if action.order is true quizzes are ordered alphabetically
      if (action.order) newState.sort((a, b) => a.quiz.localeCompare(b.quiz, 'fi', { sensitivity: 'accent' }));
      else newState.sort((a, b) => b.quiz.localeCompare(a.quiz, 'fi', { sensitivity: 'accent' }));
      return newState;

    default:
      throw new Error();
  }
};

export default reducer;
