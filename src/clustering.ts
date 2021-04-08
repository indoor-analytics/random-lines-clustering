import {Feature, featureCollection, LineString, Polygon} from "@turf/helpers";
import {computeRandomLines} from "./computeRandomLines/computeRandomLines";
import {getPathsIntersections} from "./intersections/getPathsIntersections";
import envelope from "@turf/envelope";
import {InputPath} from "./inputPath/InputPath";
import {IntersectionsMap} from "./intersectionsMap/IntersectionsMap";
import {clusterIntersections} from "./intersectionsClustering/clusterIntersections";
import {buildClusteredPaths} from "./buildClusteredPaths";
import {RandomLine} from "./randomLine/RandomLine";

/**
 * Clusters a bunch of paths using random-picked lines.
 *
 * @param paths input paths
 */
export function clusterPaths (
    paths: Feature<LineString>[]
): Feature<LineString>[] {
    // 1. Define a bounding box around input paths
    const zoneOfInterest: Feature<Polygon> = envelope(featureCollection(paths));

    // 2. Draw random lines crossing the bounding box
    const randomLines: RandomLine[] = computeRandomLines(zoneOfInterest);


    const inputPaths: InputPath[] = paths.map((path) => {
        return new InputPath(path);
    });

    // 3. Mark all intersections with input paths
    const intersectionsMap: IntersectionsMap = getPathsIntersections(inputPaths, randomLines);


    // TODO 4. Sort intersections for each input path

    // 4. Cluster intersections
    const clusteredIntersectionsMap: IntersectionsMap = clusterIntersections(intersectionsMap);

    // 5. Rebuild input paths using clustered intersections
    return buildClusteredPaths(inputPaths, clusteredIntersectionsMap);
}
