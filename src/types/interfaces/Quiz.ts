import { Answer, SavedAnswer } from './Answer';

export interface SavedQuizData {
    id: string;
    question: string;
    answerArr: SavedAnswer[];
}

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
