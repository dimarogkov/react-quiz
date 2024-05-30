import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store';
import { actions } from '../../../store/createQuizReducer';
import { getDataFromLocalStorage, setDataToLocalStorage } from '../../../helpers/localStorage';

import { Quiz } from '../../../types/interfaces/Quiz';

import { AddQuestionForm } from '../AddQuestionForm';

import { Btn } from '../../ui/Btn';
import { Content } from '../../ui/Content';
import { Label } from '../../ui/Label';
import { Input } from '../../ui/Input';

export const CreateQuizForm = () => {
    const [quizNameValue, setQuizNameValue] = useState('');
    const [isQuestionShow, setIsQuestionShow] = useState(false);

    const state = useAppSelector((state) => state.createQuiz);
    const { quizName, quizData } = state;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const saveQuiz = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const quizzes = getDataFromLocalStorage();
        const newQuiz: Quiz = { id: quizzes.length + 1, quizName, quizData };
        const quizzesArr = [...quizzes, newQuiz];

        setDataToLocalStorage(quizzesArr);
        navigate('/');
    };

    return (
        <form className='w-full mb-[20px] last:mb-0' onSubmit={saveQuiz}>
            <Label className='mb-[16px] md:mb-[20px] last:m-0'>
                <Content className='mb-[8px] last:mb-0'>Add Quiz Name</Content>

                <Input
                    name='quizName'
                    value={quizNameValue}
                    onChange={({ target }) => setQuizNameValue(target.value)}
                    onBlur={() => dispatch(actions.addQuizName(quizNameValue.trim()))}
                    autoFocus
                />
            </Label>

            <div className='w-full mb-[16px] md:mb-[20px] last:mb-0'>
                {!isQuestionShow ? (
                    <Btn disabled={quizNameValue.length <= 0} onClick={() => setIsQuestionShow(true)}>
                        Add Question
                    </Btn>
                ) : (
                    <AddQuestionForm setIsQuestionShow={setIsQuestionShow} />
                )}
            </div>

            {quizData.length > 0 && <Btn type='submit'>Save Quiz</Btn>}
        </form>
    );
};
