import { Answer } from './Answer';

export interface quizDataStore {
    id: string;
    question: string;
    answerArr: Answer[];
}
