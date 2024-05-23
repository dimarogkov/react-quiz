import { useParams } from 'react-router-dom';

export const UpdateQuizPage = () => {
    const { quizId } = useParams();
    const getQuizId = quizId ? +quizId : 0;

    return (
        <section>
            <h1>Update Quiz Page - {getQuizId}</h1>
        </section>
    );
};
