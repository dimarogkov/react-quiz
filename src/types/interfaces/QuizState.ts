import { Answer } from './Answer';
import { QuizData } from './Quiz';

export interface QuizState {
    quizName: string;
    currentQuestionIndex: number;
    correctAnswersCount: number;
    showResults: boolean;
    isAnswersSelected: boolean;
    questions: QuizData[];
    selectedAnswers: Answer[];
    correctAnswers: Answer[];
    answers: Answer[];
}
