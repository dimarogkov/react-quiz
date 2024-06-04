export const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    const newMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const newSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${newMinutes} : ${newSeconds}`;
};
