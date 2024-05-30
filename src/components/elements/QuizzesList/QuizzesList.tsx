import { useState, useCallback } from 'react';
import { getDataFromLocalStorage, setDataToLocalStorage } from '../../../helpers/localStorage';
import { Quiz } from '../../../types/interfaces/Quiz';
import { QuizItem } from '../QuizItem';

export const QuizzesList = () => {
    const [quizzesArr, setQuizzesArr] = useState<Quiz[]>(getDataFromLocalStorage());

    const removeQuiz = useCallback(
        (quizId: string) => {
            const newQuizzesArr = [...quizzesArr].filter(({ id }) => id !== quizId);

            setQuizzesArr(newQuizzesArr);
            setDataToLocalStorage(newQuizzesArr);
        },
        [quizzesArr]
    );

    return (
        <>
            {quizzesArr.length > 0 &&
                quizzesArr.map((quiz) => <QuizItem quiz={quiz} removeQuiz={removeQuiz} key={quiz.id} />)}
        </>
    );
};
