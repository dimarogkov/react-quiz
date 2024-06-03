import { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';

import { Answer as AnswerType } from '../../../types/interfaces/Answer';

type Props = {
    answer: AnswerType;
    isAnswersSelected: boolean;
    correctAnswers: AnswerType[];
    selectAnswer: (answer: AnswerType) => void;
    unselectAnswer: (answer: AnswerType) => void;
};

export const Answer: React.FC<Props> = ({
    answer,
    isAnswersSelected,
    correctAnswers,
    selectAnswer = () => {},
    unselectAnswer = () => {},
}) => {
    const [isAnswerSelect, setIsAnswerSelect] = useState(false);

    const isCorrectAnswer = useMemo(() => {
        return correctAnswers.some(({ id }) => id === answer.id);
    }, [answer.id, correctAnswers]);

    const onAnswerClick = useCallback(() => {
        setIsAnswerSelect(!isAnswerSelect);

        !isAnswerSelect ? selectAnswer(answer) : unselectAnswer(answer);
    }, [answer, isAnswerSelect, selectAnswer, unselectAnswer]);

    return (
        <li
            className={cn(
                'w-full lg:text-[18px] font-medium py-[8px] px-[16px] rounded-[4px] border-2 border-slate-200 cursor-pointer mb-[8px] last:mb-0 transition-opacity duration-300 hover:opacity-60',
                {
                    'border-green-400 pointer-events-none': isCorrectAnswer && isAnswersSelected,
                    'border-red-400 pointer-events-none': !isCorrectAnswer && isAnswersSelected,
                    'border-black': isAnswerSelect && !isAnswersSelected,
                }
            )}
            onClick={onAnswerClick}
        >
            {answer.text}
        </li>
    );
};
