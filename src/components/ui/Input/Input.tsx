import cn from 'classnames';
import { AnswerInputTypes } from '../../../types/enums/AnswerInputTypes';

type Props = {
    type?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    className?: string;
    checked?: boolean;
    autoFocus?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export const Input: React.FC<Props> = ({
    type = AnswerInputTypes.text,
    name = 'name',
    value = '',
    placeholder = '',
    className = '',
    checked = false,
    autoFocus = false,
    onChange = () => {},
    onBlur = () => {},
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
            onBlur={onBlur}
            autoFocus={autoFocus}
            className={cn({
                [textStyles]: type === AnswerInputTypes.text,
                [checkboxStyles]: type === AnswerInputTypes.checkbox,
            })}
        />
    );
};
