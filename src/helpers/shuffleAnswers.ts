export const shuffleAnswers = (questions: string[]) => {
    return questions
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
};
