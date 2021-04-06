import {IntersectionsLine} from "./IntersectionsLine";
import {Feature, LineString, Point} from "@turf/helpers";
import lineIntersect from "@turf/line-intersect";


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

    return randomLines.map((line) => {
        const intersections: Feature<Point>[] = [];

        for (const inputPath of inputPaths) {
            for (const localIntersection of lineIntersect(line, inputPath).features) {
                localIntersection.properties!.direction = getIntersectionDirection(inputPath, line, localIntersection);
                intersections.push( localIntersection );
            }
        }

        return new IntersectionsLine(line, intersections)
    });
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
    return 0;
}
