import cn from 'classnames';
import { useAppSelector } from '../../../store';

export const QuestionsList = () => {
    const state = useAppSelector((state) => state.createQuiz);
    const { quizData } = state;

    return (
        <div className='relative w-full'>
            {quizData.length > 0 &&
                quizData.map(({ id, question, answerArr }) => {
                    return (
                        <div className='w-full mb-[16px] last:mb-0' key={id}>
                            <h3 className='w-full text-[20px] font-medium mb-[4px] last:mb-0'>{question}</h3>

                            <ul className='w-full'>
                                {answerArr.map(({ id, text, isCorrectAnswer }) => (
                                    <li
                                        key={id}
                                        className={cn('relative w-full', {
                                            'text-[#22c55e]': isCorrectAnswer,
                                        })}
                                    >
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
        </div>
    );
};
