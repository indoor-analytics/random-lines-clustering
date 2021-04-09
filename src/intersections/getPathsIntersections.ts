import {RandomLine} from "../randomLine/RandomLine";
import {Feature, LineString, Point} from "@turf/helpers";
import lineIntersect from "@turf/line-intersect";
import lineSlice from "@turf/line-slice";
import length from "@turf/length";
import angle from "@turf/angle";
import {InputPath} from "../inputPath/InputPath";
import {IntersectionsMap} from "../intersectionsMap/IntersectionsMap";


/**
 * Computes intersections between randomly-generated lines and input paths.
 * Each time an intersection is found, it is pushed to both concerned input path and random line.
 *
 * @param inputPaths paths to cluster
 * @param randomLines randomly-generated lines
 */
export function getPathsIntersections (
    inputPaths: InputPath[],
    randomLines: RandomLine[]
): IntersectionsMap {

    const map = new IntersectionsMap();

    for (const randomLine of randomLines) {
        for (const inputPath of inputPaths) {
            for (const localIntersection of lineIntersect(randomLine.path, inputPath.path).features) {
                localIntersection.properties!.direction = getIntersectionDirection(inputPath.path, randomLine.path, localIntersection);
                randomLine.intersections.push( localIntersection );
                inputPath.addIntersection( localIntersection );

                map.setLine(localIntersection, randomLine);
            }
        }
    }

    return map;
}


/**
 * Returns a number (0 or 1) identifying intersection direction.
 *
 * @param inputPath path to cluster
 * @param randomLine randomly-generated line
 * @param intersection intersection between two lines
 */
export function getIntersectionDirection (
    inputPath: Feature<LineString>,
    randomLine: Feature<LineString>,
    intersection: Feature<Point>
): 0 | 1 {
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
