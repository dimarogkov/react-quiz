import { useState } from 'react';

import { Answer } from '../../../types/interfaces/Answer';
import { AnswerInputTypes } from '../../../types/enums/AnswerInputTypes';

import { Label } from '../../ui/Label';
import { Input } from '../../ui/Input';
import { RemoveBtn } from '../../ui/RemoveBtn';

type Props = {
    answer: Answer;
    setAnswer: (value: string, currentAnswer: Answer, type: string) => void;
    removeAnswer: (id: string) => void;
};

export const AddAnswerForm: React.FC<Props> = ({ answer, setAnswer = () => {}, removeAnswer = () => {} }) => {
    const [answerValue, setAnswerValue] = useState('');

    return (
        <Label className='flex items-center mb-[16px] md:mb-[20px] last:m-0'>
            <Input
                type={AnswerInputTypes.checkbox}
                name='answer_checkbox'
                checked={answer.isCorrectAnswer}
                onChange={({ target }) => setAnswer(target.value, answer, AnswerInputTypes.checkbox)}
            />

            <Input
                name='answer_text'
                placeholder='Add Answer'
                className='px-[32px]'
                value={answerValue}
                onChange={({ target }) => setAnswerValue(target.value)}
                onBlur={() => setAnswer(answerValue.trim(), answer, AnswerInputTypes.text)}
            />

            <RemoveBtn className='top-auto right-[10px]' onClick={() => removeAnswer(answer.id)} />
        </Label>
    );
};
