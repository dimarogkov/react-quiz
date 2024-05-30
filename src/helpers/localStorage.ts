import { Quiz } from '../types/interfaces/Quiz';

const localStorageKey = 'quizzes';

export const setDataToLocalStorage = (quizzes: Quiz[]) => {
    return localStorage.setItem(localStorageKey, JSON.stringify(quizzes));
};

export const getDataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(localStorageKey) || '[]');
};
