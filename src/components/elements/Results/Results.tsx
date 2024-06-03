import { useAppDispatch, useAppSelector } from '../../../store';
import { actions } from '../../../store/quizReducer';

import { Btn } from '../../ui/Btn';
import { Content } from '../../ui/Content';
import { Subtitle } from '../../ui/Subtitle';

export const Results = () => {
    const state = useAppSelector((state) => state.quiz);
    const { correctAnswersCount, questions } = state;
    const dispatch = useAppDispatch();

    return (
        <div className='w-full'>
            <div className='w-full mb-[20px] last:mb-0'>
                <Subtitle className='mb-[20px] last:mb-0'>Congratulations!</Subtitle>
                <Content className='mb-[8] last:mb-0'>You have completed the quiz.</Content>

                <Content>
                    You've got {correctAnswersCount} of {questions.length} right.
                </Content>
            </div>

            <Btn onClick={() => dispatch(actions.restartQuiz())}>Restart Quiz</Btn>
        </div>
    );
};
