import cn from 'classnames';
import { useAppSelector } from '../../../store';

export const QuestionsList = () => {
    const state = useAppSelector((state) => state.createQuiz);
    const { quizData } = state;

    return (
        <>
            {quizData.map(({ id, question, incorrectAnswers, correctAnswer }) => {
                const answers = [...correctAnswer, ...incorrectAnswers];

                return (
                    <div className='w-full mb-[16px] last:mb-0' key={id}>
                        <h3 className='w-full text-[20px] font-medium mb-[4px] last:mb-0'>{question}</h3>

                        <ul className='w-full'>
                            {answers.map((answer) => (
                                <li
                                    key={answer}
                                    className={cn('relative w-full', {
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
        </>
    );
};
