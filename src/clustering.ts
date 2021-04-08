import {Feature, featureCollection, LineString, Polygon} from "@turf/helpers";
import {computeRandomLines} from "./randomLines/computeRandomLines";
import {IntersectionsLine} from "./intersections/IntersectionsLine";
import {getPathsIntersections} from "./intersections/getPathsIntersections";
import {getClusteredIntersections} from "./intersectionsClustering/getClusteredIntersections";
import {ClusteredIntersectionsLine} from "./intersectionsClustering/ClusteredIntersectionsLine";
import {buildClusteredPaths} from "./buildClusteredPaths";
import envelope from "@turf/envelope";
import {InputPath} from "./inputPath/InputPath";
import {IntersectionsMap} from "./intersectionsMap/IntersectionsMap";

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
    const randomLines: Feature<LineString>[] = computeRandomLines(zoneOfInterest);


    const inputPaths: InputPath[] = paths.map((path) => {
        return new InputPath(path);
    });

    // 3. Mark all intersections with input paths
    const intersectionsMap: IntersectionsMap = getPathsIntersections(inputPaths, randomLines);

    // 4. Cluster intersections
    // const clusteredIntersections: ClusteredIntersectionsLine[] = getClusteredIntersections(intersections);

    // 5. Rebuild input paths using clustered intersections
    return []; // buildClusteredPaths(clusteredIntersections);
}
