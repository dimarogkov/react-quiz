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
        addAnswer: (state, action: PayloadAction<{ questionId: string; answer: Answer }>) => {
            const index = state.quizData.findIndex(({ id }) => id === action.payload.questionId);
            state.quizData[index].answerArr.push(action.payload.answer);
        },
        editQuizName: (state, action: PayloadAction<string>) => {
            state.quizName = action.payload;
        },
        editQuestion: (state, action: PayloadAction<{ questionId: string; value: string }>) => {
            const index = state.quizData.findIndex(({ id }) => id === action.payload.questionId);

            state.quizData.splice(index, 1, {
                ...state.quizData[index],
                question: action.payload.value,
            });
        },
        editAnswer: (state, action: PayloadAction<{ dataId: string; data: QuizData }>) => {
            const index = state.quizData.findIndex(({ id }) => id === action.payload.dataId);
            state.quizData[index] = action.payload.data;
        },
        removeQuestion: (state, action: PayloadAction<string>) => {
            state.quizData = state.quizData.filter(({ id }) => id !== action.payload);
        },
        removeAnswer: (state, action: PayloadAction<{ questionId: string; answerId: string }>) => {
            const index = state.quizData.findIndex(({ id }) => id === action.payload.questionId);
            const arr = state.quizData[index].answerArr;

            state.quizData[index].answerArr = arr.filter(({ id }) => id !== action.payload.answerId);
        },
    },
});

export const { actions } = editQuizSlice;
export default editQuizSlice.reducer;
