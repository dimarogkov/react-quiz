import { Link } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
    href: string;
    className?: string;
};

export const SimpleLink: React.FC<Props> = ({ children, href, className = '' }) => {
    return (
        <Link
            to={href}
            className={`w-full flex items-center gap-x-[4px] font-medium lg:text-[18px] transition-opacity duration-300 hover:opacity-70 ${className}`}
        >
            {children}
        </Link>
    );
};
