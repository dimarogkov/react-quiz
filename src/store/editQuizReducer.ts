import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EditQuizState } from '../types/interfaces/EditQuizState';
import { Quiz, QuizData } from '../types/interfaces/Quiz';
import { Answer } from '../types/interfaces/Answer';

const initialState: EditQuizState = {
    quizName: '',
    quizData: [],
};

const editQuizSlice = createSlice({
    name: 'editQuiz',
    initialState,
    reducers: {
        addQuiz: (state, action: PayloadAction<Quiz>) => {
            state.quizName = action.payload.quizName;
            state.quizData = action.payload.quizData;
        },
        addQuestion: (state, action: PayloadAction<QuizData>) => {
            state.quizData.push(action.payload);
        },
        addAnswer: (state, action: PayloadAction<{ index: number; answer: Answer }>) => {
            state.quizData[action.payload.index].answerArr.push(action.payload.answer);
        },
        editQuizName: (state, action: PayloadAction<string>) => {
            state.quizName = action.payload;
        },
        editQuestion: (state, action: PayloadAction<{ index: number; value: string }>) => {
            state.quizData.splice(action.payload.index, 1, {
                ...state.quizData[action.payload.index],
                question: action.payload.value,
            });
        },
        editAnswer: (state, action: PayloadAction<{ index: number; data: QuizData }>) => {
            state.quizData[action.payload.index] = action.payload.data;
        },
        removeQuestion: (state, action: PayloadAction<string>) => {
            state.quizData = state.quizData.filter(({ id }) => id !== action.payload);
        },
        removeAnswer: (state, action: PayloadAction<{ index: number; answerArr: Answer[] }>) => {
            state.quizData[action.payload.index].answerArr = action.payload.answerArr;
        },
    },
});

export const { actions } = editQuizSlice;
export default editQuizSlice.reducer;
