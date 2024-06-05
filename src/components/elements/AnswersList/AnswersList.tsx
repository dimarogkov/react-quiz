import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store';
import { actions } from '../../../store/createQuizReducer';

import { Answer } from '../../../types/interfaces/Answer';
import { AnswerInputTypes } from '../../../types/enums/AnswerInputTypes';

import { AddAnswerForm } from '../AddAnswerForm';

export const AnswersList = () => {
    const answerArr = useAppSelector((state) => state.createQuiz.answerArr);
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

    const removeAnswer = (id: string) => dispatch(actions.removeAnswer(id));

    return (
        <ul>
            {answerArr.length > 0 &&
                answerArr.map((answer) => (
                    <AddAnswerForm answer={answer} setAnswer={setAnswer} removeAnswer={removeAnswer} key={answer.id} />
                ))}
        </ul>
    );
};
