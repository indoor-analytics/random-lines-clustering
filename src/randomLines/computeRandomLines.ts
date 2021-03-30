import {BBox, Feature, lineString, LineString} from "@turf/helpers";
import {
    COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS,
    ComputeRandomLinesOptions,
    getComputeRandomLinesOptions
} from "./ComputeRandomLinesOptions";
const randomSeedGenerator = require('random-seed');

export function computeRandomLines (
    area: BBox,
    options: ComputeRandomLinesOptions = COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS
): Feature<LineString>[] {
    const allOptions = getComputeRandomLinesOptions(options);
    const lines: Feature<LineString>[] = [];
    const randomGenerator = randomSeedGenerator.create(allOptions.seed);

    // TODO fix number | undefined
    for (let i=0; i<allOptions.linesCount!; i++) {
        const line = lineString([
            [
                randomGenerator.floatBetween(area[0], area[2]),
                randomGenerator.floatBetween(area[1], area[3])
            ],
            [
                randomGenerator.floatBetween(area[0], area[2]),
                randomGenerator.floatBetween(area[1], area[3])
            ],
        ]);

        lines.push( line );
        console.log(line.geometry.coordinates);
    }

    return lines;
}
