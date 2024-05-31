import { Answer } from './Answer';

export interface QuizData {
    id: string;
    question: string;
    answerArr: Answer[];
}

export interface Quiz {
    id: string;
    quizName: string;
    quizData: QuizData[];
}
