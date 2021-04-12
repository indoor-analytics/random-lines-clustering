import {IntersectionsMap} from "../intersectionsMap/IntersectionsMap";

export function clusterIntersections (
    map: IntersectionsMap
): IntersectionsMap {

    for (const randomLine of map.getAllIntersectionLines()) {
        // TODO cluster line
    }

    return map;
}
