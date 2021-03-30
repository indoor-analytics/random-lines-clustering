import {Feature, lineString, LineString, MultiLineString, Polygon, Properties} from "@turf/helpers";
import {
    COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS,
    ComputeRandomLinesOptions,
    getComputeRandomLinesOptions
} from "./ComputeRandomLinesOptions";
import {polygonToLine} from "@turf/polygon-to-line";
import length from "@turf/length";
import along from "@turf/along";
const randomSeedGenerator = require('random-seed');

export function computeRandomLines (
    area: Feature<Polygon>,
    options: ComputeRandomLinesOptions = COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS
): Feature<LineString>[] {
    const allOptions = getComputeRandomLinesOptions(options);
    const lines: Feature<LineString>[] = [];
    const randomGenerator = randomSeedGenerator.create(allOptions.seedGenerator!());

    const areaPerimeter = polygonToLine(area);
    const perimeterLength = length(areaPerimeter);

    // TODO fix number | undefined
    for (let i=0; i<allOptions.linesCount!; i++) {
        const line = lineString([
            along(areaPerimeter as Feature<LineString>, randomGenerator.floatBetween(0, perimeterLength)).geometry.coordinates,
            along(areaPerimeter as Feature<LineString>, randomGenerator.floatBetween(0, perimeterLength)).geometry.coordinates
        ]);

        lines.push( line );
        console.log(line.geometry.coordinates);
    }

    return lines;
}
