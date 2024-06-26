type Props = {
    children: React.ReactNode;
    className?: string;
};

export const Label: React.FC<Props> = ({ children, className = '' }) => {
    return <label className={`relative block w-full ${className}`}>{children}</label>;
};
