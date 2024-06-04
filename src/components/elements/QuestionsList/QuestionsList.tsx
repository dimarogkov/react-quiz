import cn from 'classnames';
import { useAppSelector } from '../../../store';
import { Subtitle } from '../../ui/Subtitle';

export const QuestionsList = () => {
    const quizData = useAppSelector((state) => state.createQuiz.quizData);

    return (
        <div className='relative w-full'>
            {quizData.length > 0 &&
                quizData.map(({ id, question, answerArr }) => {
                    return (
                        <div className='w-full mb-[16px] last:mb-0' key={id}>
                            <Subtitle className='mb-[4px] last:mb-0'>{question}</Subtitle>

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
