import {Feature, lineString, LineString, MultiLineString, Point, Polygon, Properties} from "@turf/helpers";
import {
    COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS,
    ComputeRandomLinesOptions,
    getComputeRandomLinesOptions
} from "./ComputeRandomLinesOptions";
import {polygonToLine} from "@turf/polygon-to-line";
import length from "@turf/length";
import along from "@turf/along";
import lineSlice from "@turf/line-slice";
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

    function getRandomPositionAlongPerimeter (): Feature<Point> {
        return along(areaPerimeter as Feature<LineString>, randomGenerator.floatBetween(0, perimeterLength));
    }

    // TODO fix number | undefined
    for (let i=0; i<allOptions.linesCount!; i++) {
        const firstPosition = getRandomPositionAlongPerimeter();
        let secondPosition = getRandomPositionAlongPerimeter();

        // not generating lines which are perimeter segments
        while (arePointsOnSameSegment(firstPosition, secondPosition, areaPerimeter as Feature<LineString>))
            secondPosition = getRandomPositionAlongPerimeter();

        lines.push(
            lineString([
                firstPosition.geometry.coordinates,
                secondPosition.geometry.coordinates
            ])
        );
    }

    return lines;
}

function arePointsOnSameSegment(
    point1: Feature<Point>,
    point2: Feature<Point>,
    areaPerimeter: Feature<LineString>
): boolean {
    const perimeterSegment = lineSlice(point1.geometry.coordinates, point2.geometry.coordinates, areaPerimeter);
    return perimeterSegment.geometry.coordinates.length === 2;
}
