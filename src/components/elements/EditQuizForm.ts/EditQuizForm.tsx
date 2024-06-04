import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store';
import { actions } from '../../../store/editQuizReducer';

import { getDataFromLocalStorage, setDataToLocalStorage } from '../../../helpers/localStorage';
import { isInputValuePresent } from '../../../helpers/isInputValueExist';

import { Quiz } from '../../../types/interfaces/Quiz';

import { EditQuestionForm } from '../EditQuestionForm';
import { Content } from '../../ui/Content';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { ErrorMessage } from '../../ui/ErrorMessage';
import { Btn } from '../../ui/Btn';

type Props = {
    quizId: string;
};

export const EditQuizForm: React.FC<Props> = ({ quizId }) => {
    const [quizNameValue, setQuizNameValue] = useState('');
    const [error, setError] = useState('');

    const state = useAppSelector((state) => state.editQuiz);
    const { quizName, quizData } = state;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setQuizNameValue(quizName);
    }, [quizName]);

    const isAddBtnDisabled = useMemo(() => {
        return quizData.every(({ question }) => question.length > 0);
    }, [quizData]);

    const isSaveBtnDisabled = useMemo(() => {
        return quizData.every(({ question, answerArr }) => {
            return question.length > 0 && answerArr.every(({ text }) => text.length > 0);
        });
    }, [quizData]);

    const addDefaultQuestion = () => {
        const newQuestion = {
            id: crypto.randomUUID(),
            question: '',
            answerArr: [],
        };

        dispatch(actions.addQuestion(newQuestion));
    };

    const saveQuiz = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const quizzes: Quiz[] = getDataFromLocalStorage();
        const index = quizzes.findIndex(({ id }) => id === quizId);

        quizzes.splice(index, 1, { ...quizzes[index], quizName, quizData });
        setDataToLocalStorage(quizzes);
        navigate('/');
    };

    return (
        <form className='w-full' onSubmit={saveQuiz}>
            <Label className='mb-[16px] md:mb-[20px] last:m-0'>
                <Content className='mb-[8px] last:mb-0'>Edit Quiz Name</Content>

                <Input
                    name='quizName'
                    className='mb-[4px] last:mb-0'
                    value={quizNameValue}
                    isInvalid={error.length > 0}
                    onChange={({ target }) => setQuizNameValue(target.value)}
                    onBlur={() => {
                        const value = isInputValuePresent(quizNameValue, 'Quiz Name could be not empty', setError);
                        value && dispatch(actions.editQuizName(value));
                    }}
                    autoFocus
                />

                {error.length > 0 && <ErrorMessage>{error}</ErrorMessage>}
            </Label>

            {quizData.length > 0 &&
                quizData.map((data, index) => <EditQuestionForm data={data} index={index} key={data.id} />)}

            <div className='flex flex-col sm:flex-row w-full gap-[8px]'>
                <Btn disabled={!isAddBtnDisabled} onClick={addDefaultQuestion}>
                    Add Question
                </Btn>

                <Btn type='submit' disabled={!isSaveBtnDisabled}>
                    Save Quiz
                </Btn>
            </div>
        </form>
    );
};
