export type Unit = 'bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';
export type UnitPrecisionMap = {
    [u in Unit]: number;
};

const defaultPrecisionMap: UnitPrecisionMap = {
    bytes: 0,
    KB: 0,
    MB: 1,
    GB: 1,
    TB: 2,
    PB: 2
};

/*
 * Convert bytes into largest possible unit.
 * Takes an precision argument that can be a number or a map for each unit.
 */
export const parseSize = (bytes: number = 0, precision: number | UnitPrecisionMap = defaultPrecisionMap): string => {

    const units: Unit[] = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) {
        return '?';
    }

    let unitIndex = 0;
    while (bytes >= 1024) {
        bytes /= 1024;
        unitIndex++;
    }

    const unit = units[unitIndex];

    if (typeof precision === 'number') {
        return `${bytes.toFixed(precision)} ${unit}`;
    }

    return `${bytes.toFixed(precision[unit])} ${unit}`;
}
