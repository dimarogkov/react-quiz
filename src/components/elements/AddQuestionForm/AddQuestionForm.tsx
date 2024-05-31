import { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../../store';
import { actions } from '../../../store/createQuizReducer';

import { isInputValuePresent } from '../../../helpers/isInputValueExist';

import { QuizData } from '../../../types/interfaces/Quiz';

import { AnswersList } from '../AnswersList';

import { Label } from '../../ui/Label';
import { Content } from '../../ui/Content';
import { Input } from '../../ui/Input';
import { RemoveBtn } from '../../ui/RemoveBtn';
import { Btn } from '../../ui/Btn';
import { ErrorMessage } from '../../ui/ErrorMessage';

type Props = {
    setIsQuestionShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddQuestionForm: React.FC<Props> = ({ setIsQuestionShow }) => {
    const [questionValue, setQuestionValue] = useState('');
    const [error, setError] = useState('');

    const state = useAppSelector((state) => state.createQuiz);
    const { question, answerArr } = state;
    const dispatch = useAppDispatch();

    const isNewQuestionBtnShow = useMemo(() => {
        return (
            answerArr.length >= 2 &&
            answerArr.every(({ text }) => text.length > 0) &&
            answerArr.some(({ isCorrectAnswer }) => isCorrectAnswer)
        );
    }, [answerArr]);

    console.log(answerArr);

    const addDefaultAnswer = () => {
        const newAnswer = {
            id: crypto.randomUUID(),
            text: '',
            isCorrectAnswer: false,
        };

        dispatch(actions.addAnswer(newAnswer));
    };

    const setToQuizData = useCallback(() => {
        const quizQuestion: QuizData = { id: crypto.randomUUID(), question, answerArr };

        dispatch(actions.addQuizData(quizQuestion));
        dispatch(actions.removeQuestion());
        setIsQuestionShow(false);
    }, [answerArr, dispatch, question, setIsQuestionShow]);

    const removeQuestion = () => {
        dispatch(actions.removeQuestion());
        setIsQuestionShow(false);
    };

    return (
        <>
            <Label className='mb-[16px] md:mb-[20px] last:m-0'>
                <Content className='mb-[8px] last:mb-0'>Add Question</Content>

                <div className='relative w-full'>
                    <div className='flex w-full items-center mb-[4px] last:mb-0'>
                        <Input
                            name='question'
                            className={cn('pr-[32px]', { 'border-red-500': error.length > 0 })}
                            value={questionValue}
                            onChange={({ target }) => setQuestionValue(target.value)}
                            onBlur={() => {
                                const value = isInputValuePresent(
                                    questionValue,
                                    'Question could be not empty',
                                    setError
                                );
                                value && dispatch(actions.addQuestion(value));
                            }}
                        />

                        <RemoveBtn onClick={removeQuestion} className='top-auto right-[10px]' />
                    </div>

                    {error.length > 0 && <ErrorMessage>{error}</ErrorMessage>}
                </div>
            </Label>

            <AnswersList />

            <div className='flex flex-col sm:flex-row w-full gap-[8px]'>
                <Btn disabled={!questionValue || error.length > 0} onClick={addDefaultAnswer}>
                    Add Answer
                </Btn>

                <Btn disabled={!isNewQuestionBtnShow} onClick={setToQuizData}>
                    Add New Question
                </Btn>
            </div>
        </>
    );
};
