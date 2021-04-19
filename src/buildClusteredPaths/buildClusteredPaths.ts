import {Feature, lineString, LineString} from "@turf/helpers";
import {InputPath} from "../inputPath/InputPath";
import {IntersectionsMap} from "../intersectionsMap/IntersectionsMap";

export function buildClusteredPaths (
    inputPaths: InputPath[],
    intersectionsMap: IntersectionsMap
) : Feature<LineString>[] {
    const pathSegmentsWeights: {[segmentString: string]: number} = {};

    for (const path of inputPaths) {
        let pathIntersections = path.getIntersections();
        let currentIntersection = pathIntersections[0];
        pathIntersections.shift();  // not comparing first point with itself

        for (const intersection of pathIntersections) {
            const segment = lineString([
                intersectionsMap.getLine(currentIntersection)
                    .getClusteredIntersection(currentIntersection).geometry.coordinates,
                intersectionsMap.getLine(intersection)
                    .getClusteredIntersection(intersection).geometry.coordinates
            ]);

            const segmentWeightKey: string = JSON.stringify(segment);
            pathSegmentsWeights[segmentWeightKey]
                ? pathSegmentsWeights[segmentWeightKey] += 1
                : pathSegmentsWeights[segmentWeightKey] = 1;
            currentIntersection = intersection;
        }
    }

    // assigning path segments weights
    return Object.keys(pathSegmentsWeights).map((object) => {
        const segment: Feature<LineString> = JSON.parse(object);
        segment.properties!.weight = pathSegmentsWeights[JSON.stringify(segment)];
        return segment;
    });
}
