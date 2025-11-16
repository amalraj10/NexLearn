import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  markedForReview: [],
  visitedQuestions: [],
  examInfo: null,
  timeRemaining: 0,
  examStarted: false,
  examSubmitted: false,
  results: null,
};

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setExamInfo: (state, action) => {
      state.examInfo = action.payload;
      state.timeRemaining = action.payload.total_time * 60; // Convert to seconds
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestionIndex = action.payload;
      // Mark question as visited
      const questionId = state.questions[action.payload]?.question_id || state.questions[action.payload]?.id;
      if (questionId && !state.visitedQuestions.includes(questionId)) {
        state.visitedQuestions.push(questionId);
      }
    },
    setAnswer: (state, action) => {
      const { questionId, optionId } = action.payload;
      state.answers[questionId] = optionId;
    },
    toggleMarkForReview: (state, action) => {
      const questionId = action.payload;
      const index = state.markedForReview.indexOf(questionId);
      if (index > -1) {
        state.markedForReview.splice(index, 1);
      } else {
        state.markedForReview.push(questionId);
      }
    },
    decrementTime: (state) => {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      }
    },
    startExam: (state) => {
      state.examStarted = true;
    },
    submitExam: (state) => {
      state.examSubmitted = true;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    resetExam: (state) => {
      return initialState;
    },
  },
});

export const {
  setQuestions,
  setExamInfo,
  setCurrentQuestion,
  setAnswer,
  toggleMarkForReview,
  decrementTime,
  startExam,
  submitExam,
  setResults,
  resetExam,
} = examSlice.actions;

export default examSlice.reducer;
