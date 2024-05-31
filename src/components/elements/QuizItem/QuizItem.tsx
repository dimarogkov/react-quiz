import { Quiz } from '../../../types/interfaces/Quiz';

import { Content } from '../../ui/Content';
import { Subtitle } from '../../ui/Subtitle';
import { RemoveBtn } from '../../ui/RemoveBtn';
import { BtnLink } from '../../ui/BtnLink';
import { EditBtn } from '../../ui/EditBtn';

type Props = {
    quiz: Quiz;
    removeQuiz: (id: string) => void;
};

export const QuizItem: React.FC<Props> = ({ quiz, removeQuiz = () => {} }) => {
    const { id, quizName, quizData } = quiz;

    return (
        <div className='relative w-full h-full min-h-[160px] md:min-h-[200px] rounded-[8px] p-[20px] border-2 border-slate-300'>
            <div className='flex flex-col w-full h-full'>
                <div className='flex-grow w-full mb-[16px] last:mb-0'>
                    <Subtitle className='mb-[8px] last:mb-0'>{quizName}</Subtitle>
                    <Content>Number of questions - {quizData.length}</Content>
                </div>

                <BtnLink href={`quiz/${id}`}>Open Quiz</BtnLink>

                <div className='absolute top-[10px] right-[10px] flex gap-[10px]'>
                    <EditBtn href={`quiz/edit/${id}`} />
                    <RemoveBtn className='relative top-auto right-auto' onClick={() => removeQuiz(id)} />
                </div>
            </div>
        </div>
    );
};
