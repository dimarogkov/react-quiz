import { Link } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';

type Props = {
    href: string;
    className?: string;
};

export const BackLink: React.FC<Props> = ({ href, className = '' }) => {
    return (
        <Link
            to={href}
            className={`w-full flex items-center gap-x-[4px] font-medium lg:text-[18px] transition-opacity duration-300 hover:opacity-70 ${className}`}
        >
            <BsChevronLeft className='w-[12px] h-[12px]' />
            <span>Back</span>
        </Link>
    );
};
