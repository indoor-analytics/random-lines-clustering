import {Feature, LineString, Polygon} from "@turf/helpers";

/**
 * Clusters a bunch of paths using random-picked lines.
 *
 * @param zoneOfInterest
 * @param paths
 */
export function clusterPaths (
    zoneOfInterest: Feature<Polygon>,
    paths: Feature<LineString>[],
): Feature<LineString>[] {
    // 1. Define a bounding box around the zone of interest
    // 2. Draw random lines crossing the bounding box
    // 3. Mark all intersections with input paths
    // 4. Cluster intersections
    // 5. Rebuild input paths using clustered intersections
    return [];
}
