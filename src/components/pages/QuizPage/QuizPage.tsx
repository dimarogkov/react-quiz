import { useParams } from 'react-router-dom';

export const QuizPage = () => {
    const { quizId } = useParams();
    const getQuizId = quizId ? +quizId : 0;

    return (
        <section>
            <h1>Quiz Page - {getQuizId}</h1>
        </section>
    );
};
