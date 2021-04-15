import {RandomLine} from "../../randomLine/RandomLine";
import center from "@turf/center";
import {featureCollection} from "@turf/helpers";


/**
 * Clusters intersections by picking a central location for each direction.
 * This function MUST NOT be considered as a real intersections clustering method, but rather as an example of
 * what must be done while implementing a clustering method.
 *
 * @param line line whose intersections are to cluster
 */
export function CentroidLineClustering (
    line: RandomLine
): void {
    const lineIntersections = line.getIntersectionsList();
    const direction0intersections = lineIntersections.filter((intersection) => intersection.properties!.direction === 0);
    const direction1intersections = lineIntersections.filter((intersection) => intersection.properties!.direction === 1);

    // associating intersections to newly-computed clustered locations
    line.setClusteredIntersection(direction0intersections, center(featureCollection(direction0intersections)));
    line.setClusteredIntersection(direction1intersections, center(featureCollection(direction1intersections)));
}
