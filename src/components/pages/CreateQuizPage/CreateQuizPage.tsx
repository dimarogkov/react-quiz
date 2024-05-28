import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store';
import { actions } from '../../../store/createQuizReducer';

import { Btn } from '../../ui/Btn';
import { Content } from '../../ui/Content';
import { Title } from '../../ui/Title';
import { Label } from '../../ui/Label';
import { Input } from '../../ui/Input';

import { QuestionsList } from '../../elements/QuestionsList';
import { AddQuestionForm } from '../../elements/AddQuestionForm';

export const CreateQuizPage = () => {
    const [isQuestionShow, setIsQuestionShow] = useState(false);
    const state = useAppSelector((state) => state.createQuiz);
    const { quizName, quizData } = state;
    const dispatch = useAppDispatch();

    return (
        <section className='relative w-full'>
            <Title className='mb-[20px] lg:mb-[24px] last:mb-0'>New Quiz</Title>

            <form className='w-full mb-[20px] last:mb-0'>
                <Label className='mb-[16px] md:mb-[20px] last:m-0'>
                    <Content className='mb-[8px] last:mb-0'>Add Quiz Name</Content>

                    <Input
                        name='quizName'
                        value={quizName}
                        onChange={({ target }) => dispatch(actions.addQuizName(target.value))}
                    />
                </Label>

                {!isQuestionShow ? (
                    <Btn disabled={quizName.length <= 0} onClick={() => setIsQuestionShow(true)}>
                        Add Question
                    </Btn>
                ) : (
                    <AddQuestionForm setIsQuestionShow={setIsQuestionShow} />
                )}
            </form>

            {quizData.length > 0 && <QuestionsList />}
        </section>
    );
};
