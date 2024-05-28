import { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';

import { QuizData } from '../../../types/interfaces/Quiz';
import { Answer } from '../../../types/interfaces/Answer';
import { AnswerInputTypes } from '../../../types/enums/AnswerInputTypes';

import { Btn } from '../../ui/Btn';
import { Content } from '../../ui/Content';
import { Title } from '../../ui/Title';
import { Label } from '../../ui/Label';
import { Input } from '../../ui/Input';
import { RemoveBtn } from '../../ui/RemoveBtn';

import { shuffleAnswers } from '../../../helpers/shuffleAnswers';

export const CreateQuizPage = () => {
    const [quizData, setQuizData] = useState<QuizData[]>([]);
    const [quizName, setQuizName] = useState('');
    const [question, setQuestion] = useState('');

    const [answerArr, setAnswerArr] = useState<Answer[]>([]);
    const [isQuestionShow, setIsQuestionShow] = useState(false);

    const isNewQuestionBtnShow = useMemo(() => {
        return (
            answerArr.length >= 2 &&
            answerArr.every(({ text }) => text.length > 0) &&
            answerArr.some(({ isCorrectAnswer }) => isCorrectAnswer)
        );
    }, [answerArr]);

    const addQuestion = () => {
        setIsQuestionShow(true);
    };

    const addAnswer = () => {
        const newAnswer = {
            id: crypto.randomUUID(),
            text: '',
            isCorrectAnswer: false,
        };

        setAnswerArr((prevState) => [...prevState, newAnswer]);
    };

    const setAnswer = useCallback(
        (value: string, currentAnswer: Answer, type: string) => {
            const newAnswers = [...answerArr];

            switch (type) {
                case AnswerInputTypes.checkbox: {
                    const modifiedAnswers = newAnswers.map((answer) => {
                        answer.id === currentAnswer.id && (answer.isCorrectAnswer = !answer.isCorrectAnswer);
                        return answer;
                    });

                    setAnswerArr(modifiedAnswers);
                    break;
                }
                case AnswerInputTypes.text: {
                    const index = newAnswers.findIndex(({ id }) => id === currentAnswer.id);

                    newAnswers.splice(index, 1, { ...currentAnswer, text: value });
                    setAnswerArr(newAnswers);
                    break;
                }
            }
        },
        [answerArr]
    );

    const setToQuizData = useCallback(() => {
        const quizQuestion: QuizData = {
            question: question,
            incorrectAnswers: answerArr.filter(({ isCorrectAnswer }) => !isCorrectAnswer).map(({ text }) => text),
            correctAnswer: answerArr.filter(({ isCorrectAnswer }) => isCorrectAnswer).map(({ text }) => text),
        };

        setQuizData((prevState) => [...prevState, quizQuestion]);
        removeQuestion();
    }, [question, answerArr]);

    const removeQuestion = () => {
        setIsQuestionShow(false);
        setQuestion('');
        setAnswerArr([]);
    };

    const removeAnswer = (answerId: string) => {
        setAnswerArr((prevState) => prevState.filter(({ id }) => id !== answerId));
    };

    return (
        <section className='relative w-full'>
            <Title className='mb-[20px] lg:mb-[24px] last:mb-0'>New Quiz</Title>

            <form className='w-full mb-[20px] last:mb-0'>
                <Label className='mb-[16px] md:mb-[20px] last:m-0'>
                    <Content className='mb-[8px] last:mb-0'>Add Quiz Name</Content>
                    <Input name='quizName' value={quizName} onChange={({ target }) => setQuizName(target.value)} />
                </Label>

                {!isQuestionShow ? (
                    <Btn disabled={quizName.length <= 0} onClick={addQuestion}>
                        Add Question
                    </Btn>
                ) : (
                    <>
                        <Label className='mb-[16px] md:mb-[20px] last:m-0'>
                            <Content className='mb-[8px] last:mb-0'>Add Question</Content>

                            <div className='flex items-center'>
                                <Input
                                    name='question'
                                    value={question}
                                    onChange={({ target }) => setQuestion(target.value)}
                                    className='pr-[32px]'
                                />
                                <RemoveBtn onClick={removeQuestion} className='top-auto right-[10px]' />
                            </div>
                        </Label>

                        {answerArr.length > 0 &&
                            answerArr.map((answer) => (
                                <Label className='flex items-center mb-[16px] md:mb-[20px] last:m-0' key={answer.id}>
                                    <Input
                                        type={AnswerInputTypes.checkbox}
                                        name='answer_checkbox'
                                        checked={answer.isCorrectAnswer}
                                        onChange={({ target }) =>
                                            setAnswer(target.value, answer, AnswerInputTypes.checkbox)
                                        }
                                    />
                                    <Input
                                        name='answer_text'
                                        placeholder='Add Answer'
                                        value={answer.text}
                                        onChange={({ target }) =>
                                            setAnswer(target.value, answer, AnswerInputTypes.text)
                                        }
                                        className='px-[32px]'
                                    />
                                    <RemoveBtn
                                        onClick={() => removeAnswer(answer.id)}
                                        className='top-auto right-[10px]'
                                    />
                                </Label>
                            ))}

                        <div className='flex w-full gap-x-[8px]'>
                            {isNewQuestionBtnShow && <Btn onClick={setToQuizData}>Add New Question</Btn>}

                            <Btn disabled={question.length <= 0} onClick={addAnswer}>
                                Add Answer
                            </Btn>
                        </div>
                    </>
                )}
            </form>

            {quizData.length > 0 && (
                <div className='relative w-full'>
                    {quizData.map(({ question, incorrectAnswers, correctAnswer }) => {
                        const answers = shuffleAnswers([...incorrectAnswers, ...correctAnswer]);

                        return (
                            <div className='w-full mb-[16px] last:mb-0'>
                                <h3 className='w-full text-[20px] font-medium mb-[4px] last:mb-0'>{question}</h3>

                                <ul className='w-full'>
                                    {answers.map((answer) => (
                                        <li
                                            key={answer}
                                            className={cn('w-full', {
                                                'text-green-500': correctAnswer.includes(answer),
                                            })}
                                        >
                                            {answer}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};
