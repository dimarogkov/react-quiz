import { Link } from 'react-router-dom';
import { Quiz } from '../../../types/interfaces/Quiz';
import { Content } from '../../ui/Content';
import { Subtitle } from '../../ui/Subtitle';

type Props = {
    quiz: Quiz;
};

export const QuizItem: React.FC<Props> = ({ quiz }) => {
    const { id, quizName, quizData } = quiz;

    return (
        <Link
            to={`quiz/${id}`}
            className='relative w-full h-full min-h-[160px] md:min-h-[200px] flex items-center rounded-[8px] p-[20px] bg-gradient-to-tr from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% cursor-pointer transition-opacity duration-400 hover:opacity-70'
        >
            <div>
                <Subtitle className='text-white mb-[8px] last:mb-0'>{quizName}</Subtitle>
                <Content className='text-white'>Number of questions - {quizData.length}</Content>
            </div>
        </Link>
    );
};
