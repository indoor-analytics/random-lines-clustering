import {IntersectionsMap} from "../intersectionsMap/IntersectionsMap";
import {RandomLine} from "../randomLine/RandomLine";

export function clusterIntersections (
    map: IntersectionsMap,
    clusteringMethod: (line: RandomLine) => void
): IntersectionsMap {

    for (const randomLine of map.getAllIntersectionLines()) {
        clusteringMethod(randomLine);
    }

    return map;
}
