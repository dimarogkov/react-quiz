import { Input } from '../../ui/Input';

type Props = {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export const Search: React.FC<Props> = ({ searchValue, setSearchValue = () => {} }) => {
    return (
        <Input
            name='search'
            placeholder='Search'
            className='sm:w-[300px]'
            value={searchValue}
            onChange={({ target }) => setSearchValue(target.value)}
        />
    );
};
