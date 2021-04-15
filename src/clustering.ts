import {Feature, featureCollection, LineString, Polygon} from "@turf/helpers";
import {computeRandomLines} from "./computeRandomLines/computeRandomLines";
import {getPathsIntersections} from "./intersections/getPathsIntersections";
import envelope from "@turf/envelope";
import {InputPath} from "./inputPath/InputPath";
import {IntersectionsMap} from "./intersectionsMap/IntersectionsMap";
import {clusterIntersections} from "./intersectionsClustering/clusterIntersections";
import {RandomLine} from "./randomLine/RandomLine";
import {buildClusteredPaths} from "./buildClusteredPaths/buildClusteredPaths";
import {KDELineClustering} from "./intersectionsClustering/methods/KDELineClustering";
import {ClusterPathsOptions} from "./clusterPathsOptions/ClusterPathsOptions";
import {COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS} from "./computeRandomLines/ComputeRandomLinesOptions";

/**
 * Clusters a bunch of paths using random-picked lines.
 */
export function clusterPaths
({
    paths,
    locationsClusteringMethod = KDELineClustering,
    randomGenerationOptions = COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS
}: ClusterPathsOptions): Feature<LineString>[]
{
    const inputPaths: InputPath[] = paths.map((path) => {
        return new InputPath(path);
    });


    // 1. Define a bounding box around input paths
    const zoneOfInterest: Feature<Polygon> = envelope(featureCollection(paths));

    // 2. Draw random lines crossing the bounding box
    const randomLines: RandomLine[] = computeRandomLines(zoneOfInterest, randomGenerationOptions);

    // 3. Mark all intersections with input paths
    const intersectionsMap: IntersectionsMap = getPathsIntersections(inputPaths, randomLines);

    // 4. Cluster intersections
    const clusteredIntersectionsMap: IntersectionsMap = clusterIntersections(intersectionsMap, locationsClusteringMethod);

    // 5. Rebuild input paths using clustered intersections
    return buildClusteredPaths(inputPaths, clusteredIntersectionsMap);
}
