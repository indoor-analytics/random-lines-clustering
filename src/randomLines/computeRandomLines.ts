import {BBox, Feature, lineString, LineString} from "@turf/helpers";
import {
    COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS,
    ComputeRandomLinesOptions,
    getComputeRandomLinesOptions
} from "./ComputeRandomLinesOptions";
import {randomPosition} from "@turf/random";

export function computeRandomLines (
    area: BBox,
    options: ComputeRandomLinesOptions = COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS
): Feature<LineString>[] {
    const allOptions = getComputeRandomLinesOptions(options);
    const lines: Feature<LineString>[] = [];

    // TODO fix number | undefined
    for (let i=0; i<allOptions.linesCount!; i++) {
        const firstPosition = randomPosition(area);
        const secondPosition = randomPosition(area);
        lines.push(
            lineString([firstPosition, secondPosition])
        );
    }

    return lines;
}
