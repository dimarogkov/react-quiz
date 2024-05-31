import { useState } from 'react';
import cn from 'classnames';

import { isInputValuePresent } from '../../../helpers/isInputValueExist';

import { Answer } from '../../../types/interfaces/Answer';
import { AnswerInputTypes } from '../../../types/enums/AnswerInputTypes';

import { Label } from '../../ui/Label';
import { Input } from '../../ui/Input';
import { RemoveBtn } from '../../ui/RemoveBtn';
import { ErrorMessage } from '../../ui/ErrorMessage';

type Props = {
    answer: Answer;
    setAnswer: (value: string, currentAnswer: Answer, type: string) => void;
    removeAnswer: (id: string) => void;
};

export const AddAnswerForm: React.FC<Props> = ({ answer, setAnswer = () => {}, removeAnswer = () => {} }) => {
    const [answerValue, setAnswerValue] = useState('');
    const [error, setError] = useState('');

    return (
        <Label className='w-full mb-[16px] md:mb-[20px] last:m-0'>
            <div className='flex items-center w-full mb-[4px] last:mb-0'>
                <Input
                    type={AnswerInputTypes.checkbox}
                    name='answer_checkbox'
                    checked={answer.isCorrectAnswer}
                    onChange={({ target }) => setAnswer(target.value, answer, AnswerInputTypes.checkbox)}
                />

                <Input
                    name='answer_text'
                    placeholder='Add Answer'
                    className={cn('px-[32px]', { 'border-red-500': error.length > 0 })}
                    value={answerValue}
                    onChange={({ target }) => setAnswerValue(target.value)}
                    onBlur={() => {
                        const value = isInputValuePresent(answerValue, 'Question could be not empty', setError);
                        setAnswer(value ? value : '', answer, AnswerInputTypes.text);
                    }}
                />

                <RemoveBtn className='top-auto right-[10px]' onClick={() => removeAnswer(answer.id)} />
            </div>

            {error.length > 0 && <ErrorMessage>{error}</ErrorMessage>}
        </Label>
    );
};
