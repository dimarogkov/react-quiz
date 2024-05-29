import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store';
import { actions } from '../../../store/createQuizReducer';

import { Answer } from '../../../types/interfaces/Answer';
import { AnswerInputTypes } from '../../../types/enums/AnswerInputTypes';

import { Label } from '../../ui/Label';
import { Input } from '../../ui/Input';
import { RemoveBtn } from '../../ui/RemoveBtn';

export const AddAnswersForm = () => {
    const state = useAppSelector((state) => state.createQuiz);
    const { answerArr } = state;
    const dispatch = useAppDispatch();

    const setAnswer = useCallback(
        (value: string, currentAnswer: Answer, type: string) => {
            const newAnswers = [...answerArr];

            switch (type) {
                case AnswerInputTypes.checkbox: {
                    const modifiedAnswers = newAnswers.map((answer) => {
                        if (answer.id === currentAnswer.id) {
                            return { ...answer, isCorrectAnswer: !answer.isCorrectAnswer };
                        }

                        return answer;
                    });

                    dispatch(actions.updateAnswers(modifiedAnswers));
                    break;
                }
                case AnswerInputTypes.text: {
                    const index = newAnswers.findIndex(({ id }) => id === currentAnswer.id);

                    newAnswers.splice(index, 1, { ...currentAnswer, text: value });
                    dispatch(actions.updateAnswers(newAnswers));
                    break;
                }
            }
        },
        [answerArr, dispatch]
    );

    return (
        <>
            {answerArr.length > 0 &&
                answerArr.map((answer) => (
                    <Label className='flex items-center mb-[16px] md:mb-[20px] last:m-0' key={answer.id}>
                        <Input
                            type={AnswerInputTypes.checkbox}
                            name='answer_checkbox'
                            checked={answer.isCorrectAnswer}
                            onChange={({ target }) => setAnswer(target.value, answer, AnswerInputTypes.checkbox)}
                        />

                        <Input
                            name='answer_text'
                            placeholder='Add Answer'
                            value={answer.text}
                            onChange={({ target }) => setAnswer(target.value, answer, AnswerInputTypes.text)}
                            className='px-[32px]'
                        />

                        <RemoveBtn
                            onClick={() => dispatch(actions.removeAnswer(answer.id))}
                            className='top-auto right-[10px]'
                        />
                    </Label>
                ))}
        </>
    );
};
