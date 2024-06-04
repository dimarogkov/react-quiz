import { useState } from 'react';

import { isInputValuePresent } from '../../../helpers/isInputValueExist';

import { AnswerInputTypes } from '../../../types/enums/AnswerInputTypes';
import { Answer } from '../../../types/interfaces/Answer';

import { ErrorMessage } from '../../ui/ErrorMessage';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { RemoveBtn } from '../../ui/RemoveBtn';

type Props = {
    answer: Answer;
    editAnswer: (currentId: any, value: any, type: any) => void;
    removeAnswer: (answerId: string) => void;
};

export const EditAnswerForm: React.FC<Props> = ({ answer, editAnswer = () => {}, removeAnswer = () => {} }) => {
    const [answerValue, setAnswerValue] = useState(answer.text);
    const [error, setError] = useState('');

    return (
        <Label className='w-full mb-[16px] md:mb-[20px] last:m-0'>
            <div className='flex items-center w-full mb-[4px] last:mb-0'>
                <Input
                    type={AnswerInputTypes.checkbox}
                    name='answer_checkbox'
                    checked={answer.isCorrectAnswer}
                    onChange={({ target }) => editAnswer(target.value, answer, AnswerInputTypes.checkbox)}
                />

                <Input
                    name='answer_text'
                    placeholder='Add Answer'
                    className='px-[32px]'
                    value={answerValue}
                    isInvalid={error.length > 0}
                    onChange={({ target }) => setAnswerValue(target.value)}
                    onBlur={() => {
                        const value = isInputValuePresent(answerValue, 'Answer could be not empty', setError);
                        editAnswer(value ? value : '', answer, AnswerInputTypes.text);
                    }}
                />

                <RemoveBtn className='top-auto right-[10px]' onClick={() => removeAnswer(answer.id)} />
            </div>

            {error.length > 0 && <ErrorMessage>{error}</ErrorMessage>}
        </Label>
    );
};
