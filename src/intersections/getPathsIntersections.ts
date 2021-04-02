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
            intersections.push(
                ...lineIntersect(line, inputPath).features
            );
        }

        return new IntersectionsLine(line, intersections)
    });
}
