import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../../store';
import { actions } from '../../../store/editQuizReducer';

import { getDataFromLocalStorage } from '../../../helpers/localStorage';

import { Quiz } from '../../../types/interfaces/Quiz';

import { EditQuizForm } from '../../elements/EditQuizForm.ts';
import { BackLink } from '../../ui/BackLink';
import { Title } from '../../ui/Title';

export const EditQuizPage = () => {
    const dispatch = useAppDispatch();
    const { quizId } = useParams();
    const getQuizId = quizId ? quizId : '';

    useEffect(() => {
        const quizzes: Quiz[] = getDataFromLocalStorage();
        const currentQuiz = quizzes.find(({ id }) => id === getQuizId) || null;

        currentQuiz && dispatch(actions.addQuiz(currentQuiz));
    }, [dispatch, getQuizId]);

    return (
        <section className='relative w-full'>
            <BackLink href='/' className='mb-[8px] last:mb-0' />

            <Title className='mb-[20px] lg:mb-[24px] last:mb-0'>Edit Quiz</Title>

            <EditQuizForm quizId={getQuizId} />
        </section>
    );
};
