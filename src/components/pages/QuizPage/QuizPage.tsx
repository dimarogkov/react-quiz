import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store';
import { actions } from '../../../store/quizReducer';

import { getDataFromLocalStorage } from '../../../helpers/localStorage';

import { Quiz } from '../../../types/interfaces/Quiz';

import { Question } from '../../elements/Question';
import { Results } from '../../elements/Results';
import { BackLink } from '../../ui/BackLink';
import { Title } from '../../ui/Title';
import { Content } from '../../ui/Content';
import { Btn } from '../../ui/Btn';

export const QuizPage = () => {
    const [isCheckBtnSelected, setIsCheckBtnSelected] = useState(false);
    const state = useAppSelector((state) => state.quiz);
    const { quizName, currentQuestionIndex, showResults, questions, selectedAnswers } = state;
    const dispatch = useAppDispatch();

    const { quizId } = useParams();
    const getQuizId = quizId ? quizId : '';

    useEffect(() => {
        const quizzes: Quiz[] = getDataFromLocalStorage();
        const currentQuiz = quizzes.find(({ id }) => id === getQuizId) || null;

        currentQuiz && dispatch(actions.addQuiz(currentQuiz));

        return () => {
            dispatch(actions.resetQuiz());
        };
    }, [dispatch, getQuizId]);

    const btnText = useMemo(() => {
        const isLastQuestion = currentQuestionIndex === questions.length - 1;

        return isLastQuestion ? 'End Quiz' : 'Next Question';
    }, [currentQuestionIndex, questions.length]);

    const checkAnswers = () => {
        dispatch(actions.checkAnswers());
        setIsCheckBtnSelected(true);
    };

    const goToNextQuestion = () => {
        dispatch(actions.nextQuestion());
        setIsCheckBtnSelected(false);
    };

    return (
        <section className='relative w-full'>
            <BackLink href='/' className='mb-[8px] last:mb-0' />

            {showResults && <Results />}

            {!showResults && (
                <>
                    <div className='w-full mb-[20px] last:mb-0'>
                        <Title className='mb-[8px] last:mb-0'>{quizName}</Title>

                        <Content>
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </Content>
                    </div>

                    <Question />

                    {!isCheckBtnSelected ? (
                        <Btn disabled={selectedAnswers.length <= 0} onClick={checkAnswers}>
                            Check
                        </Btn>
                    ) : (
                        <Btn onClick={goToNextQuestion}>{btnText}</Btn>
                    )}
                </>
            )}
        </section>
    );
};
