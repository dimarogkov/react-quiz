import { getDataFromLocalStorage } from '../../../helpers/localStorage';

import { Quiz } from '../../../types/interfaces/Quiz';
import { QuizItem } from '../QuizItem';

export const QuizzesList = () => {
    const quizzes: Quiz[] = getDataFromLocalStorage();

    return <>{quizzes.length > 0 && quizzes.map((quiz) => <QuizItem quiz={quiz} key={quiz.id} />)}</>;
};
