import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store';
import { actions } from '../../../store/quizReducer';

import { getDataFromLocalStorage } from '../../../helpers/localStorage';

import { Quiz } from '../../../types/interfaces/Quiz';
import { Answer } from '../../../types/interfaces/Answer';

import { Question } from '../../elements/Question';
import { Results } from '../../elements/Results';
import { Timer } from '../../elements/Timer';
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

    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const btnText = isLastQuestion ? 'End Quiz' : 'Next Question';
    const question = questions[currentQuestionIndex];

    const selectAnswer = (answer: Answer) => {
        const isAnswerAdded = selectedAnswers.some(({ id }) => id === answer.id);
        !isAnswerAdded ? dispatch(actions.selectAnswer(answer)) : dispatch(actions.unselectAnswer(answer));
    };

    const checkAnswers = () => {
        const correctAnswers = question.answerArr.filter(({ isCorrectAnswer }) => isCorrectAnswer);
        const incorrectAnswers = question.answerArr.filter(({ isCorrectAnswer }) => !isCorrectAnswer);
        const findAnswer = (id: string) => !!selectedAnswers.find((answer) => answer.id === id);

        const isCurrentAnswersCorrect = correctAnswers.every(({ id }) => findAnswer(id));
        const isCurrentAnswersIncorrect = incorrectAnswers.some(({ id }) => findAnswer(id));

        dispatch(actions.checkAnswers(isCurrentAnswersCorrect && !isCurrentAnswersIncorrect));
        setIsCheckBtnSelected(true);
    };

    const goToNextQuestion = () => {
        dispatch(actions.nextQuestion(isLastQuestion));
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

                    <Question
                        question={question}
                        isCheckBtnSelected={isCheckBtnSelected}
                        selectedAnswers={selectedAnswers}
                        selectAnswer={selectAnswer}
                    />

                    <div className='flex flex-col sm:flex-row items-center justify-between w-full gap-[8px]'>
                        {!isCheckBtnSelected ? (
                            <Btn disabled={selectedAnswers.length <= 0} onClick={checkAnswers}>
                                Check
                            </Btn>
                        ) : (
                            <Btn onClick={goToNextQuestion}>{btnText}</Btn>
                        )}

                        <Timer />
                    </div>
                </>
            )}
        </section>
    );
};
