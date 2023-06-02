import { CHARACTERS } from '../consts/characters.const';

export const random = {
    aToB: (a = 0, b = 1): number => {
        return Math.floor(Math.random() * (b - a + 1) + a);
    },
    string: (size = 8, characters = CHARACTERS): string => {
        return Array.apply(null, Array(size)).map(() => {
            return random.fromArray<string>(characters.split(''));
        }).join('');
    },
    fromArray: <T>(list: T[]): T => {
        return list[Math.floor(Math.random() * list.length)];
    },
    bool: (): boolean => {
        return Math.random() >= 0.5;
    },
    int: (a = 0, b = 10): number => {
        return random.aToB(a, b);
    },
    float: (a = 0, b = 1): number => {
        return Math.random() * (b - a) + a;
    },
    uuid: (): string => {
        const sections = [8, 4, 4, 4, 12];

        return sections.map(section => {
            return random.string(section);
        }).join('-');
    }
};
