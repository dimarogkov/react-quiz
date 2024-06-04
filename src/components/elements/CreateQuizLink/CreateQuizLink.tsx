import { Link } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';

export const CreateQuizLink = () => {
    return (
        <Link
            to='/quiz/new'
            className='relative w-full h-full min-h-[180px] md:min-h-[200px] flex items-center justify-center rounded-[8px] border-2 border-slate-300 cursor-pointer transition-opacity duration-400 hover:opacity-70'
        >
            <BsPlusLg className='absolute w-[32px] md:w-[40px] h-[32px] md:h-[40px] text-slate-400' />
        </Link>
    );
};
