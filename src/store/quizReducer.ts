import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { shuffleAnswers } from '../helpers/shuffleAnswers';

import { QuizState } from '../types/interfaces/QuizState';
import { Quiz, SavedQuizData } from '../types/interfaces/Quiz';
import { Answer } from '../types/interfaces/Answer';

const initialState: QuizState = {
    quizName: '',
    currentQuestionIndex: 0,
    correctAnswersCount: 0,
    showResults: false,
    questions: [],
    selectedAnswers: [],
    answers: [],
    savedData: [],
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        addQuiz: (state, action: PayloadAction<Quiz>) => {
            state.quizName = action.payload.quizName;
            state.questions = action.payload.quizData;
            state.answers = shuffleAnswers(state.questions[0].answerArr);
        },
        nextQuestion: (state, action: PayloadAction<boolean>) => {
            state.currentQuestionIndex = !action.payload ? state.currentQuestionIndex + 1 : state.currentQuestionIndex;
            state.answers = shuffleAnswers(state.questions[!action.payload ? state.currentQuestionIndex : 0].answerArr);
            state.showResults = action.payload;
            state.selectedAnswers = [];
        },
        selectAnswer: (state, action: PayloadAction<Answer>) => {
            state.selectedAnswers.push(action.payload);
        },
        unselectAnswer: (state, action: PayloadAction<Answer>) => {
            state.selectedAnswers = state.selectedAnswers.filter(({ id }) => id !== action.payload.id);
        },
        checkAnswers: (state, action: PayloadAction<boolean>) => {
            state.correctAnswersCount = action.payload ? state.correctAnswersCount + 1 : state.correctAnswersCount;
        },
        saveData: (state, action: PayloadAction<SavedQuizData>) => {
            state.savedData.push(action.payload);
        },
        restartQuiz: (state) => {
            state.currentQuestionIndex = 0;
            state.correctAnswersCount = 0;
            state.showResults = false;
        },
        resetQuiz: () => initialState,
    },
});

export const { actions } = quizSlice;
export default quizSlice.reducer;
