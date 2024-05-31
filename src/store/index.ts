import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, createDispatchHook, createSelectorHook } from 'react-redux';

import createQuizReducer from './createQuizReducer';
import editQuizReducer from './editQuizReducer';

export const store = configureStore({
    reducer: {
        createQuiz: createQuizReducer,
        editQuiz: editQuizReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = createDispatchHook<RootState>();
export const useAppSelector: TypedUseSelectorHook<RootState> = createSelectorHook();
