import { useCallback, useState } from 'react';
import cn from 'classnames';

import { useAppDispatch } from '../../../store';
import { actions } from '../../../store/editQuizReducer';

import { isInputValuePresent } from '../../../helpers/isInputValueExist';

import { QuizData } from '../../../types/interfaces/Quiz';
import { AnswerInputTypes } from '../../../types/enums/AnswerInputTypes';
import { Answer } from '../../../types/interfaces/Answer';

import { EditAnswerForm } from '../EditAnswerForm';

import { Content } from '../../ui/Content';
import { ErrorMessage } from '../../ui/ErrorMessage';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { RemoveBtn } from '../../ui/RemoveBtn';
import { Btn } from '../../ui/Btn';

type Props = {
    data: QuizData;
};

export const EditQuestionForm: React.FC<Props> = ({ data }) => {
    const [questionValue, setQuestionValue] = useState(data.question);
    const [error, setError] = useState('');
    const dispatch = useAppDispatch();

    const addDefaultAnswer = () => {
        const newAnswer = {
            id: crypto.randomUUID(),
            text: '',
            isCorrectAnswer: false,
        };

        dispatch(actions.addAnswer({ questionId: data.id, answer: newAnswer }));
    };

    const editAnswer = useCallback(
        (value: string, currentAnswer: Answer, type: string) => {
            const newAnswers = [...data.answerArr];

            switch (type) {
                case AnswerInputTypes.checkbox: {
                    const modifiedAnswers = newAnswers.map((answer) => {
                        if (answer.id === currentAnswer.id) {
                            return { ...answer, isCorrectAnswer: !answer.isCorrectAnswer };
                        }

                        return answer;
                    });

                    const editedData = { dataId: data.id, data: { ...data, answerArr: modifiedAnswers } };
                    dispatch(actions.editAnswer(editedData));
                    break;
                }
                case AnswerInputTypes.text: {
                    const index = newAnswers.findIndex(({ id }) => id === currentAnswer.id);

                    newAnswers.splice(index, 1, { ...currentAnswer, text: value });

                    const editedData = { dataId: data.id, data: { ...data, answerArr: newAnswers } };
                    dispatch(actions.editAnswer(editedData));
                    break;
                }
            }
        },
        [data, dispatch]
    );

    const removeAnswer = (answerId: string) => {
        dispatch(actions.removeAnswer({ questionId: data.id, answerId }));
    };

    return (
        <div className='w-full mb-[20px] last:mb-0'>
            <Label className='mb-[16px] md:mb-[20px] last:m-0'>
                <Content className='mb-[8px] last:mb-0'>Edit Question</Content>

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
                                value && dispatch(actions.editQuestion({ questionId: data.id, value }));
                            }}
                        />

                        <RemoveBtn
                            onClick={() => dispatch(actions.removeQuestion(data.id))}
                            className='top-auto right-[10px]'
                        />
                    </div>

                    {error.length > 0 && <ErrorMessage>{error}</ErrorMessage>}
                </div>
            </Label>

            {data.answerArr.length > 0 &&
                data.answerArr.map((answer) => (
                    <EditAnswerForm
                        answer={answer}
                        editAnswer={editAnswer}
                        removeAnswer={removeAnswer}
                        key={answer.id}
                    />
                ))}

            <Btn onClick={addDefaultAnswer}>Add Answer</Btn>
        </div>
    );
};
