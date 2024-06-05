import { SavedQuizData } from '../../../types/interfaces/Quiz';
import { SavedAnswer } from '../SavedAnswer';
import { Content } from '../../ui/Content';

type Props = {
    question: SavedQuizData;
};

export const SavedQuestion: React.FC<Props> = ({ question }) => {
    return (
        <div className='w-full mb-[24px] last:mb-0'>
            <Content className='mb-[12px] last:mb-0'>{question.question}</Content>

            <ul className='w-full'>
                {question.answerArr.map((answer) => (
                    <SavedAnswer answer={answer} key={answer.id} />
                ))}
            </ul>
        </div>
    );
};
