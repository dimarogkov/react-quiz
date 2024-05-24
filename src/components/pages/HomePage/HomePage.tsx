import { CreateQuiz } from '../../elements/CreateQuiz';
import { Title } from '../../ui/Title';

export const HomePage = () => {
    return (
        <section className='relative w-full'>
            <Title className='mb-[20px] lg:mb-[24px] last:mb-0'>All Quizzes</Title>

            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                <CreateQuiz />
            </div>
        </section>
    );
};
