import { useEffect } from 'react';

import { useAppDispatch } from '../../../store';
import { actions } from '../../../store/createQuizReducer';

import { QuestionsList } from '../../elements/QuestionsList';
import { CreateQuizForm } from '../../elements/CreateQuizForm';
import { Title } from '../../ui/Title';
import { BackLink } from '../../ui/BackLink';

export const CreateQuizPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(actions.resetQuiz());
        };
    }, [dispatch]);

    return (
        <section className='relative w-full'>
            <BackLink href='/' className='mb-[8px] last:mb-0' />

            <Title className='mb-[20px] lg:mb-[24px] last:mb-0'>New Quiz</Title>

            <CreateQuizForm />
            <QuestionsList />
        </section>
    );
};
