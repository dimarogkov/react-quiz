import { useState } from 'react';

import { getDataFromLocalStorage, setDataToLocalStorage } from '../../../helpers/localStorage';

import { Quiz } from '../../../types/interfaces/Quiz';

import { CreateQuizLink } from '../../elements/CreateQuizLink';
import { QuizzesList } from '../../elements/QuizzesList';
import { Title } from '../../ui/Title';
import { Search } from '../../elements/Search';

export const HomePage = () => {
    const [quizzesArr, setQuizzesArr] = useState<Quiz[]>(getDataFromLocalStorage());
    const [searchValue, setSearchValue] = useState('');

    const filteredQuizzes = () => {
        const arr = [...quizzesArr];

        if (searchValue.length > 0) {
            return arr.filter(({ quizName }) => quizName.toLowerCase().includes(searchValue.toLowerCase()));
        }

        return arr;
    };

    const removeQuiz = (quizId: string) => {
        const quizzes = filteredQuizzes();
        const newQuizzesArr = quizzes.filter(({ id }) => id !== quizId);

        setQuizzesArr(newQuizzesArr);
        setDataToLocalStorage(newQuizzesArr);
    };

    return (
        <section className='relative w-full'>
            <div className='flex flex-col sm:flex-row items-center justify-between gap-[12px] mb-[20px] lg:mb-[24px] last:mb-0'>
                <Title className='sm:w-auto'>All Quizzes</Title>
                <Search searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>

            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[12px]'>
                <QuizzesList quizzesArr={filteredQuizzes()} removeQuiz={removeQuiz} />
                <CreateQuizLink />
            </div>
        </section>
    );
};
