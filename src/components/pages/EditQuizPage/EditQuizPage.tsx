import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';

import { useAppDispatch } from '../../../store';
import { actions } from '../../../store/editQuizReducer';

import { getDataFromLocalStorage } from '../../../helpers/localStorage';

import { Quiz } from '../../../types/interfaces/Quiz';

import { EditQuizForm } from '../../elements/EditQuizForm.ts';
import { SimpleLink } from '../../ui/SimpleLink';
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
            <SimpleLink href='/' className='mb-[8px] last:mb-0'>
                <BsChevronLeft className='w-[12px] h-[12px]' />
                <span>Back</span>
            </SimpleLink>

            <Title className='mb-[20px] lg:mb-[24px] last:mb-0'>Edit Quiz</Title>

            <EditQuizForm quizId={getQuizId} />
        </section>
    );
};
