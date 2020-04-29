export const getStorageKey = (playername: string, word: string): string => {
    return `${playername}-${word}`;
}