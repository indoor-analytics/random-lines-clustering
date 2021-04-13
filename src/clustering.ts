import {Feature, featureCollection, LineString, Polygon} from "@turf/helpers";
import {computeRandomLines} from "./computeRandomLines/computeRandomLines";
import {getPathsIntersections} from "./intersections/getPathsIntersections";
import envelope from "@turf/envelope";
import {InputPath} from "./inputPath/InputPath";
import {IntersectionsMap} from "./intersectionsMap/IntersectionsMap";
import {clusterIntersections} from "./intersectionsClustering/clusterIntersections";
import {RandomLine} from "./randomLine/RandomLine";
import {buildClusteredPaths} from "./buildClusteredPaths/buildClusteredPaths";
import {KDELineClustering} from "./intersectionsClustering/KDELineClustering";

/**
 * Clusters a bunch of paths using random-picked lines.
 *
 * @param paths paths to cluster
 * @param clusteringMethod function used to cluster intersections for a given random line
 */
export function clusterPaths (
    paths: Feature<LineString>[],
    clusteringMethod: (line: RandomLine) => void = KDELineClustering
): Feature<LineString>[] {

    const inputPaths: InputPath[] = paths.map((path) => {
        return new InputPath(path);
    });


    // 1. Define a bounding box around input paths
    const zoneOfInterest: Feature<Polygon> = envelope(featureCollection(paths));

    // 2. Draw random lines crossing the bounding box
    const randomLines: RandomLine[] = computeRandomLines(zoneOfInterest);

    // 3. Mark all intersections with input paths
    const intersectionsMap: IntersectionsMap = getPathsIntersections(inputPaths, randomLines);

    // 4. Cluster intersections
    const clusteredIntersectionsMap: IntersectionsMap = clusterIntersections(intersectionsMap, clusteringMethod);

    // 5. Rebuild input paths using clustered intersections
    return buildClusteredPaths(inputPaths, clusteredIntersectionsMap);
}
