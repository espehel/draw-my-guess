export const getStorageKey = (id: string, playername: string, word: string): string => {
    return `${id}-${playername}-${word}`;
}