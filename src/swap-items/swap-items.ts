/**
 * @param items - array
 * @param previousIndex - number
 * @param currentIndex - number
 * @param mutate - mutate original array, or return swapped
 */
export const swapItems = (
    items: any[],
    previousIndex: number,
    currentIndex: number,
    mutate = true
): void | any[] => {

    const copy = mutate ? items : [...items];

    const first = copy[previousIndex];
    const second = copy[currentIndex];

    copy[currentIndex] = first;
    copy[previousIndex] = second;

    if (mutate) {
        return;
    }

    return copy;
}
