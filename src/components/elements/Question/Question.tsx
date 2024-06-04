import { QuizData } from '../../../types/interfaces/Quiz';
import { Answer as AnswerType } from '../../../types/interfaces/Answer';

import { Answer } from '../Answer';
import { Subtitle } from '../../ui/Subtitle';

type Props = {
    question: QuizData;
    selectedAnswers: AnswerType[];
    selectAnswer: (answer: AnswerType) => void;
    unselectAnswer: (answer: AnswerType) => void;
};

export const Question: React.FC<Props> = ({
    question,
    selectedAnswers,
    selectAnswer = () => {},
    unselectAnswer = () => {},
}) => {
    return (
        question && (
            <div className='w-full mb-[20px] last:mb-0'>
                <Subtitle className='mb-[20px] last:mb-0'>{question.question}</Subtitle>

                <ul className='w-full'>
                    {question.answerArr.length > 0 &&
                        question.answerArr.map((answer) => (
                            <Answer
                                answer={answer}
                                isAnswersSelected={selectedAnswers.some(({ id }) => id === answer.id)}
                                selectAnswer={selectAnswer}
                                unselectAnswer={unselectAnswer}
                                key={answer.id}
                            />
                        ))}
                </ul>
            </div>
        )
    );
};
