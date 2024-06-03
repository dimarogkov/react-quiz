import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { shuffleAnswers } from '../helpers/shuffleAnswers';

import { QuizState } from '../types/interfaces/QuizState';
import { Quiz } from '../types/interfaces/Quiz';
import { Answer } from '../types/interfaces/Answer';

const initialState: QuizState = {
    quizName: '',
    currentQuestionIndex: 0,
    correctAnswersCount: 0,
    showResults: false,
    isAnswersSelected: false,
    questions: [],
    selectedAnswers: [],
    correctAnswers: [],
    answers: [],
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
        nextQuestion: (state) => {
            const isResultsShow = state.currentQuestionIndex === state.questions.length - 1;

            state.currentQuestionIndex = !isResultsShow ? state.currentQuestionIndex + 1 : state.currentQuestionIndex;
            state.answers = shuffleAnswers(state.questions[!isResultsShow ? state.currentQuestionIndex : 0].answerArr);
            state.showResults = isResultsShow;
            state.isAnswersSelected = false;
            state.selectedAnswers = [];
            state.correctAnswers = [];
        },
        selectAnswer: (state, action: PayloadAction<Answer>) => {
            state.selectedAnswers.push(action.payload);
        },
        unselectAnswer: (state, action: PayloadAction<Answer>) => {
            const index = state.selectedAnswers.findIndex(({ id }) => id === action.payload.id);
            state.selectedAnswers.splice(index, 1);
        },
        checkAnswers: (state) => {
            const answersEqual = (a: any, b: any) => {
                return Object.keys(a).every((key) => a[key] === b[key]);
            };
            const correctAnswers = state.answers.filter(({ isCorrectAnswer }) => isCorrectAnswer);
            const isCurrentAnswersCorrect = correctAnswers.every((correctAnswer) => {
                return state.selectedAnswers.some((answer) => answersEqual(correctAnswer, answer));
            });
            console.log(isCurrentAnswersCorrect);

            state.correctAnswersCount = isCurrentAnswersCorrect
                ? state.correctAnswersCount + 1
                : state.correctAnswersCount;

            state.correctAnswers = correctAnswers;
            state.isAnswersSelected = true;
        },
        restartQuiz: (state) => {
            state.currentQuestionIndex = 0;
            state.correctAnswersCount = 0;
            state.showResults = false;
            state.isAnswersSelected = false;
            state.correctAnswers = [];
        },
        resetQuiz: () => initialState,
    },
});

export const { actions } = quizSlice;
export default quizSlice.reducer;
