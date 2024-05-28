import cn from 'classnames';
import { AnswerInputTypes } from '../../../types/enums/AnswerInputTypes';

type Props = {
    type?: string;
    name?: string;
    value?: string;
    checked?: boolean;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
};

export const Input: React.FC<Props> = ({
    type = AnswerInputTypes.text,
    name = 'name',
    value = '',
    checked = false,
    placeholder = '',
    onChange = () => {},
    className = '',
}) => {
    const textStyles = `w-full h-[40px] px-[16px] rounded-[4px] border border-slate-300 outline-none transition-all duration-300 focus:border-black ${className}`;
    const checkboxStyles = `absolute left-[10px] w-[16px] h-[16px] cursor-pointer ${className}`;

    return (
        <input
            type={type}
            name={name}
            value={value}
            checked={checked}
            placeholder={placeholder}
            onChange={onChange}
            className={cn({
                [textStyles]: type === AnswerInputTypes.text,
                [checkboxStyles]: type === AnswerInputTypes.checkbox,
            })}
        />
    );
};
