import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CreateQuizState } from '../types/interfaces/CreateQuizState';
import { Answer } from '../types/interfaces/Answer';
import { QuizData } from '../types/interfaces/Quiz';
import { quizDataStore } from '../types/interfaces/QuizDataStore';

const initialState: CreateQuizState = {
    quizName: '',
    question: '',
    answerArr: [],
    quizData: [],
    quizDataStore: [],
};

const createQuizSlice = createSlice({
    name: 'createQuiz',
    initialState,
    reducers: {
        addQuizName: (state, action: PayloadAction<string>) => {
            state.quizName = action.payload;
        },
        addQuestion: (state, action: PayloadAction<string>) => {
            state.question = action.payload;
        },
        removeQuestion: (state) => {
            state.question = '';
            state.answerArr = [];
        },
        addAnswer: (state, action: PayloadAction<Answer>) => {
            state.answerArr.push(action.payload);
        },
        removeAnswer: (state, action: PayloadAction<string>) => {
            state.answerArr = state.answerArr.filter(({ id }) => id !== action.payload);
        },
        updateAnswers: (state, action: PayloadAction<Answer[]>) => {
            state.answerArr = action.payload;
        },
        addQuizData: (state, action: PayloadAction<QuizData>) => {
            state.quizData.push(action.payload);
        },
        addQuizDataStore: (state, action: PayloadAction<quizDataStore>) => {
            state.quizDataStore.push(action.payload);
        },
        resetQuiz: (state) => {
            console.log(initialState);
            state = initialState;
        },
    },
});

export const { actions } = createQuizSlice;
export default createQuizSlice.reducer;
