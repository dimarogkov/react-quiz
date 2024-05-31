import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store';
import { actions } from '../../../store/editQuizReducer';

import { Content } from '../../ui/Content';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';

export const EditQuizForm = () => {
    const [quizNameValue, setQuizNameValue] = useState('');
    const state = useAppSelector((state) => state.editQuiz);
    const { quizName } = state;
    const dispatch = useAppDispatch();

    useEffect(() => {
        setQuizNameValue(quizName);
    }, [quizName]);

    return (
        <form>
            <Label className='mb-[16px] md:mb-[20px] last:m-0'>
                <Content className='mb-[8px] last:mb-0'>Edit Quiz Name</Content>

                <Input
                    name='quizName'
                    value={quizNameValue}
                    onChange={({ target }) => setQuizNameValue(target.value)}
                    onBlur={() => dispatch(actions.addQuizName(quizNameValue.trim()))}
                    autoFocus
                />
            </Label>
        </form>
    );
};
