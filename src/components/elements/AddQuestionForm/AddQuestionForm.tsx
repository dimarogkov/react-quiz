import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store';
import { actions } from '../../../store/createQuizReducer';

import { QuizData } from '../../../types/interfaces/Quiz';

import { Label } from '../../ui/Label';
import { Content } from '../../ui/Content';
import { Input } from '../../ui/Input';
import { RemoveBtn } from '../../ui/RemoveBtn';
import { Btn } from '../../ui/Btn';

import { AddAnswersForm } from '../AddAnswersForm';

type Props = {
    setIsQuestionShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddQuestionForm: React.FC<Props> = ({ setIsQuestionShow }) => {
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

    const addAnswer = () => {
        const newAnswer = {
            id: crypto.randomUUID(),
            text: '',
            isCorrectAnswer: false,
        };

        dispatch(actions.addAnswer(newAnswer));
    };

    const setToQuizData = useCallback(() => {
        const quizQuestion: QuizData = {
            id: crypto.randomUUID(),
            question: question,
            incorrectAnswers: answerArr.filter(({ isCorrectAnswer }) => !isCorrectAnswer).map(({ text }) => text),
            correctAnswer: answerArr.filter(({ isCorrectAnswer }) => isCorrectAnswer).map(({ text }) => text),
        };

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

                <div className='flex w-full items-center'>
                    <Input
                        name='question'
                        value={question}
                        onChange={({ target }) => dispatch(actions.addQuestion(target.value))}
                        className='pr-[32px]'
                    />

                    <RemoveBtn onClick={removeQuestion} className='top-auto right-[10px]' />
                </div>
            </Label>

            {answerArr.length > 0 && <AddAnswersForm />}

            <div className='flex w-full gap-x-[8px]'>
                {isNewQuestionBtnShow && <Btn onClick={setToQuizData}>Add New Question</Btn>}

                <Btn disabled={question.length <= 0} onClick={addAnswer}>
                    Add Answer
                </Btn>
            </div>
        </>
    );
};
