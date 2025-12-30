import { RelatedTimezone } from "../types/time";

function getRelativeHourMatrix(hour: number) {
    const matrix: number[][] = [];
    for (let i = 0; i <= 24; i++) {
        matrix[i] = []
        for (let j = 0; j <= 24; j++) {
            const t = (hour + i - 12) + (j - 12);
            matrix[i].push(t)
        }
    }
    return matrix.reverse();
}

export function getRelativeHour(hour: number, currentGmt: number, targetGmt: number) {
    const matrix = getRelativeHourMatrix(hour);
    return matrix[12 + currentGmt][12 + targetGmt];
}