import { BsPencil } from 'react-icons/bs';
import { Link } from 'react-router-dom';

type Props = {
    href: string;
    className?: string;
};

export const EditBtn: React.FC<Props> = ({ href, className = '' }) => {
    return (
        <Link to={href} className={`relative w-[16px] h-[16px] ${className}`}>
            <BsPencil className='relative w-full h-full transition-opacity duration-300 hover:opacity-70' />
        </Link>
    );
};
