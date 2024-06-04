import cn from 'classnames';
import { Answer as AnswerType } from '../../../types/interfaces/Answer';

type Props = {
    answer: AnswerType;
    isCheckBtnSelected: boolean;
    isAnswersSelected: boolean;
    selectAnswer: (answer: AnswerType) => void;
};

export const Answer: React.FC<Props> = ({ answer, isCheckBtnSelected, isAnswersSelected, selectAnswer = () => {} }) => {
    return (
        <li
            className={cn(
                'w-full lg:text-[18px] font-medium py-[8px] px-[16px] rounded-[4px] border-2 border-slate-200 cursor-pointer mb-[8px] last:mb-0 transition-opacity duration-300 hover:opacity-60',
                {
                    'border-green-500 pointer-events-none': answer.isCorrectAnswer && isCheckBtnSelected,
                    'border-rose-500 pointer-events-none': !answer.isCorrectAnswer && isCheckBtnSelected,
                    'border-slate-950': isAnswersSelected,
                }
            )}
            onClick={() => selectAnswer(answer)}
        >
            {answer.text}
        </li>
    );
};
