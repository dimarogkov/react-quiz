export interface QuizData {
    id: string;
    question: string;
    incorrectAnswers: string[];
    correctAnswer: string[];
}

export interface Quiz {
    id: string;
    quizName: string;
    quizData: QuizData[];
}
