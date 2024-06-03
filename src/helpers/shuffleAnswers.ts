import { Answer } from '../types/interfaces/Answer';

export const shuffleAnswers = (answers: Answer[]) => {
    return answers
        .map((a) => ({ ...a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => ({ ...a }));
};
