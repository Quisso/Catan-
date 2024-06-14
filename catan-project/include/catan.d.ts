export enum Resource { brick , wood , ore , wheat , sheep , nothing , random }
export enum Color { red , white , orange , blue}

export type card = {
    name:string,
    description: string,
    function: () => void
}

export function shuffleArray<T>(array: T[]): T[] {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}