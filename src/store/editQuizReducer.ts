import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EditQuizState } from '../types/interfaces/EditQuizState';
import { Quiz } from '../types/interfaces/Quiz';

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
        addQuizName: (state, action: PayloadAction<string>) => {
            state.quizName = action.payload;
        },
    },
});

export const { actions } = editQuizSlice;
export default editQuizSlice.reducer;
