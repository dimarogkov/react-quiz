export interface QuizData {
    question: string;
    incorrectAnswers: string[];
    correctAnswer: string[];
}

export interface Quiz {
    quizName: string;
    quizData: QuizData[];
}
