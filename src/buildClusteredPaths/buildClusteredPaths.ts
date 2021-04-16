import {Feature, lineString, LineString} from "@turf/helpers";
import {InputPath} from "../inputPath/InputPath";
import {IntersectionsMap} from "../intersectionsMap/IntersectionsMap";

export function buildClusteredPaths (
    inputPaths: InputPath[],
    intersectionsMap: IntersectionsMap
) : Feature<LineString>[] {
    const pathSegments: Feature<LineString>[] = [];

    for (const path of inputPaths) {
        let pathIntersections = path.getIntersections();
        let currentIntersection = pathIntersections[0];
        pathIntersections.shift();  // not comparing first point with itself

        for (const intersection of pathIntersections) {
            // TODO not push if segment already exists
            pathSegments.push(
                lineString([
                    intersectionsMap.getLine(currentIntersection)
                        .getClusteredIntersection(currentIntersection).geometry.coordinates,
                    intersectionsMap.getLine(intersection)
                        .getClusteredIntersection(intersection).geometry.coordinates
                ])
            );
            currentIntersection = intersection;
        }
    }

    // TODO link segments

    return pathSegments;
}
