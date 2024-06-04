import { Quiz } from '../../../types/interfaces/Quiz';
import { QuizItem } from '../QuizItem';

type Props = {
    quizzesArr: Quiz[];
    removeQuiz: (quizId: string) => void;
};

export const QuizzesList: React.FC<Props> = ({ quizzesArr, removeQuiz = () => {} }) => {
    return (
        <>
            {quizzesArr.length > 0 &&
                quizzesArr.map((quiz) => <QuizItem quiz={quiz} removeQuiz={removeQuiz} key={quiz.id} />)}
        </>
    );
};
