import { Answer } from './Answer';
import { QuizData } from './Quiz';
import { quizDataStore } from './QuizDataStore';

export interface CreateQuizState {
    quizName: string;
    question: string;
    answerArr: Answer[];
    quizData: QuizData[];
    quizDataStore: quizDataStore[];
}
