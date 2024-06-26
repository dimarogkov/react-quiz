type Props = {
    children: React.ReactNode;
    className?: string;
};

export const Title: React.FC<Props> = ({ children, className = '' }) => {
    return (
        <h1 className={`w-full text-[28px] md:text-[32px] lg:text-[40px] xl:text-[48px] font-semibold ${className}`}>
            {children}
        </h1>
    );
};
