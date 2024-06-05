import cn from 'classnames';
import { SavedAnswer as SavedAnswerType } from '../../../types/interfaces/Answer';

type Props = {
    answer: SavedAnswerType;
};

export const SavedAnswer: React.FC<Props> = ({ answer }) => {
    return (
        <li
            className={cn(
                'w-full lg:text-[18px] font-medium py-[8px] px-[16px] rounded-[4px] border-2 mb-[8px] last:mb-0',
                {
                    'border-slate-300': !answer.isSelected,
                    'border-slate-950': answer.isSelected,
                }
            )}
        >
            {answer.text}
        </li>
    );
};
