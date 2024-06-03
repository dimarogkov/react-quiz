import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store';
import { actions } from '../../../store/quizReducer';

import { QuizData } from '../../../types/interfaces/Quiz';
import { Answer as AnswerType } from '../../../types/interfaces/Answer';

import { Answer } from '../Answer';
import { Subtitle } from '../../ui/Subtitle';

export const Question = () => {
    const [currentQuestion, setCurrentQuestion] = useState<QuizData | null>(null);

    const state = useAppSelector((state) => state.quiz);
    const { isAnswersSelected, currentQuestionIndex, correctAnswers, questions, answers } = state;
    const dispatch = useAppDispatch();

    useEffect(() => {
        setCurrentQuestion(questions[currentQuestionIndex]);
    }, [currentQuestionIndex, questions]);

    const selectAnswer = (answer: AnswerType) => {
        dispatch(actions.selectAnswer(answer));
    };

    const unselectAnswer = (answer: AnswerType) => {
        dispatch(actions.unselectAnswer(answer));
    };

    return (
        currentQuestion && (
            <div className='w-full mb-[20px] last:mb-0'>
                <Subtitle className='mb-[20px] last:mb-0'>{currentQuestion.question}</Subtitle>

                <ul className='w-full'>
                    {answers.length > 0 &&
                        answers.map((answer) => (
                            <Answer
                                answer={answer}
                                isAnswersSelected={isAnswersSelected}
                                correctAnswers={correctAnswers}
                                selectAnswer={selectAnswer}
                                unselectAnswer={unselectAnswer}
                                key={answer.id}
                            />
                        ))}
                </ul>
            </div>
        )
    );
};
