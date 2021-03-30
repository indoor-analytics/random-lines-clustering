import {Feature, LineString, Polygon} from "@turf/helpers";
import bbox from "@turf/bbox";
import bboxPolygon from "@turf/bbox-polygon";
import {computeRandomLines} from "./computeRandomLines";
import {IntersectionsLine} from "./intersections/IntersectionsLine";
import {getPathsIntersections} from "./intersections/getPathsIntersections";
import {getClusteredIntersections} from "./intersectionsClustering/getClusteredIntersections";
import {ClusteredIntersectionsLine} from "./intersectionsClustering/ClusteredIntersectionsLine";
import {buildClusteredPaths} from "./buildClusteredPaths";

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
    const boundingBox: Feature<Polygon> = bboxPolygon(bbox(zoneOfInterest));

    // 2. Draw random lines crossing the bounding box
    const randomLines: Feature<LineString>[] = computeRandomLines(boundingBox);

    // 3. Mark all intersections with input paths
    const intersections: IntersectionsLine[] = getPathsIntersections(boundingBox, paths, randomLines);

    // 4. Cluster intersections
    const clusteredIntersections: ClusteredIntersectionsLine[] = getClusteredIntersections(intersections);

    // 5. Rebuild input paths using clustered intersections
    return buildClusteredPaths(clusteredIntersections);
}
