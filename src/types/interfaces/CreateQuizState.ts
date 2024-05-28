import { Answer } from './Answer';
import { QuizData } from './Quiz';

export interface CreateQuizState {
    quizName: string;
    question: string;
    answerArr: Answer[];
    quizData: QuizData[];
}
