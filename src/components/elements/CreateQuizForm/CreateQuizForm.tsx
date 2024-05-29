import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store';
import { actions } from '../../../store/createQuizReducer';

import { AddQuestionForm } from '../AddQuestionForm';

import { Btn } from '../../ui/Btn';
import { Content } from '../../ui/Content';
import { Label } from '../../ui/Label';
import { Input } from '../../ui/Input';

export const CreateQuizForm = () => {
    const [isQuestionShow, setIsQuestionShow] = useState(false);
    const state = useAppSelector((state) => state.createQuiz);
    const { quizName } = state;
    const dispatch = useAppDispatch();

    return (
        <form className='w-full mb-[20px] last:mb-0'>
            <Label className='mb-[16px] md:mb-[20px] last:m-0'>
                <Content className='mb-[8px] last:mb-0'>Add Quiz Name</Content>

                <Input
                    name='quizName'
                    value={quizName}
                    onChange={({ target }) => dispatch(actions.addQuizName(target.value.trim()))}
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
    );
};
