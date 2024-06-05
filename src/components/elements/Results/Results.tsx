import { SavedQuizData } from '../../../types/interfaces/Quiz';

import { SavedQuestion } from '../SavedQuestion';
import { Btn } from '../../ui/Btn';
import { Content } from '../../ui/Content';
import { Subtitle } from '../../ui/Subtitle';
import { Title } from '../../ui/Title';

type Props = {
    correctCount: number;
    questionsLength: number;
    data: SavedQuizData[];
    restartQuiz: () => void;
};

export const Results: React.FC<Props> = ({ correctCount, questionsLength, data, restartQuiz = () => {} }) => {
    return (
        <div className='w-full'>
            <div className='w-full mb-[40px] last:mb-0'>
                <Title className='mb-[8px] last:mb-0'>Congratulations!</Title>
                <Content>You have completed the quiz.</Content>

                <Content className='mb-[20px] last:mb-0'>
                    You've got {correctCount} of {questionsLength} right.
                </Content>

                <Btn onClick={restartQuiz}>Restart Quiz</Btn>
            </div>

            <div className='w-full'>
                <Subtitle className='mb-[20px] last:mb-0'>Your answers</Subtitle>

                <div className='w-full'>
                    {data.map((question) => (
                        <SavedQuestion question={question} key={question.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};
