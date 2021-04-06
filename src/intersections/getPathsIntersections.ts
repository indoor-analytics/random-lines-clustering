import {IntersectionsLine} from "./IntersectionsLine";
import {Feature, LineString, Point} from "@turf/helpers";
import lineIntersect from "@turf/line-intersect";
import lineSlice from "@turf/line-slice";
import length from "@turf/length";
import angle from "@turf/angle";


/**
 * Computes intersections between randomly-generated lines and input paths.
 *
 * @param inputPaths
 * @param randomLines
 */
export function getPathsIntersections (
    inputPaths: Feature<LineString>[],
    randomLines: Feature<LineString>[]
): IntersectionsLine[] {

    const lines: IntersectionsLine[] = [];

    for (const randomLine of randomLines) {
        const intersections: Feature<Point>[] = [];

        for (const inputPath of inputPaths) {
            for (const localIntersection of lineIntersect(randomLine, inputPath).features) {
                localIntersection.properties!.direction = getIntersectionDirection(inputPath, randomLine, localIntersection);
                intersections.push( localIntersection );
            }
        }

        if (intersections.length !== 0)
            lines.push( new IntersectionsLine(randomLine, intersections) );
    }

    return lines;
}


/**
 * Returns a number identifying intersection direction.
 *
 * @param inputPath
 * @param randomLine
 * @param intersection
 */
export function getIntersectionDirection (
    inputPath: Feature<LineString>,
    randomLine: Feature<LineString>,
    intersection: Feature<Point>
): number {
    const intersectionDistanceToOrigin =
        length(lineSlice(inputPath.geometry.coordinates[0], intersection, inputPath), {units: 'meters'});
    let i = inputPath.geometry.coordinates.length-1;
    let previousPathPoint = null;
    let distanceToOrigin = 0;

    // picking path point before intersection
    do {
        previousPathPoint = inputPath.geometry.coordinates[i];
        distanceToOrigin =
            length(lineSlice(inputPath.geometry.coordinates[0], previousPathPoint, inputPath), {units: 'meters'});
        i -= 1;
    } while (distanceToOrigin > intersectionDistanceToOrigin && i >= 0);

    // get second line point
    const linePoint = randomLine.geometry.coordinates[1];

    return angle(previousPathPoint, intersection, linePoint) > 180 ? 1 : 0;
}
