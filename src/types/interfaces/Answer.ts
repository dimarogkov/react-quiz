export interface SavedAnswer extends Answer {
    isSelected: boolean;
}

export interface Answer {
    id: string;
    text: string;
    isCorrectAnswer: boolean;
}
