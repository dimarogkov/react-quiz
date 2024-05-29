import { useEffect } from 'react';
import { BsChevronLeft } from 'react-icons/bs';

import { useAppDispatch } from '../../../store';
import { actions } from '../../../store/createQuizReducer';

import { QuestionsList } from '../../elements/QuestionsList';
import { CreateQuizForm } from '../../elements/CreateQuizForm';

import { Title } from '../../ui/Title';
import { SimpleLink } from '../../ui/SimpleLink';

export const CreateQuizPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(actions.resetQuiz());
        };
    }, [dispatch]);

    return (
        <section className='relative w-full'>
            <SimpleLink href='/' className='mb-[8px] last:mb-0'>
                <BsChevronLeft className='w-[12px] h-[12px]' />
                <span>Back</span>
            </SimpleLink>

            <Title className='mb-[20px] lg:mb-[24px] last:mb-0'>New Quiz</Title>

            <CreateQuizForm />
            <QuestionsList />
        </section>
    );
};
