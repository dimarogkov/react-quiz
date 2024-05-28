export interface QuizData {
    id: string;
    question: string;
    incorrectAnswers: string[];
    correctAnswer: string[];
}

export interface Quiz {
    quizName: string;
    quizData: QuizData[];
}
