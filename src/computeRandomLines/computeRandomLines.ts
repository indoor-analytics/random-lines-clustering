import {Feature, lineString, LineString, Point, Polygon} from "@turf/helpers";
import {
    COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS,
    ComputeRandomLinesOptions,
    getComputeRandomLinesOptions
} from "./ComputeRandomLinesOptions";
import {polygonToLine} from "@turf/polygon-to-line";
import length from "@turf/length";
import along from "@turf/along";
import lineSlice from "@turf/line-slice";
import {RandomLine} from "../randomLine/RandomLine";
const randomSeedGenerator = require('random-seed');


/**
 * Generates random segments crossing a zone of interest.
 * Each segment's vertex is located on the ZOI's perimeter, but both cannot belong to the same ZOI's edge.
 *
 * @param area zone of interest
 * @param options options to customize lines generation
 */
export function computeRandomLines (
    area: Feature<Polygon>,
    options: Partial<ComputeRandomLinesOptions> = COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS
): RandomLine[] {
    const allOptions = getComputeRandomLinesOptions(options);
    const lines: RandomLine[] = [];
    const randomGenerator = randomSeedGenerator.create(allOptions.seedGenerator!());

    const areaPerimeter = polygonToLine(area);
    const perimeterLength = length(areaPerimeter);

    /**
     * Returns a random position along ZOI's perimeter by generating a random distance from perimeter's origin.
     */
    function getRandomPositionAlongPerimeter (): Feature<Point> {
        return along(areaPerimeter as Feature<LineString>, randomGenerator.floatBetween(0, perimeterLength));
    }

    for (let i=0; i<allOptions.linesCount; i++) {
        const firstPosition = getRandomPositionAlongPerimeter();
        let secondPosition = getRandomPositionAlongPerimeter();

        // not generating lines which are perimeter segments
        while (arePointsOnSameSegment(firstPosition, secondPosition, areaPerimeter as Feature<LineString>))
            secondPosition = getRandomPositionAlongPerimeter();

        lines.push(
            new RandomLine(
                lineString([
                    firstPosition.geometry.coordinates,
                    secondPosition.geometry.coordinates
                ])
            )
        );
    }

    return lines;
}


/**
 * Tells if two points are on the same ZOI's edge.
 *
 * @param point1
 * @param point2
 * @param areaPerimeter
 */
function arePointsOnSameSegment(
    point1: Feature<Point>,
    point2: Feature<Point>,
    areaPerimeter: Feature<LineString>
): boolean {
    const perimeterSegment = lineSlice(point1.geometry.coordinates, point2.geometry.coordinates, areaPerimeter);
    return perimeterSegment.geometry.coordinates.length === 2;
}
