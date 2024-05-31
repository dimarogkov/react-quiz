export const isInputValuePresent = (
    value: string,
    errorMessage: string,
    setError: React.Dispatch<React.SetStateAction<string>> = () => {}
) => {
    const newValue = value.trim();

    if (!newValue) {
        setError(errorMessage);
        return;
    }

    setError('');
    return newValue;
};
