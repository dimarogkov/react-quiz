import { BsFillTrash3Fill } from 'react-icons/bs';

type Props = {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const RemoveBtn: React.FC<Props> = ({ onClick = () => {}, className = '' }) => {
    return (
        <button type='button' onClick={onClick} className={`absolute top-0 right-0 w-[16px] h-[16px] ${className}`}>
            <BsFillTrash3Fill className='relative w-full h-full text-red-600 transition-colors duration-300 hover:text-red-400' />
        </button>
    );
};
