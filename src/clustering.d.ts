import { Feature, LineString } from "@turf/helpers";
import { RandomLine } from "./randomLine/RandomLine";
/**
 * Clusters a bunch of paths using random-picked lines.
 *
 * @param paths paths to cluster
 * @param clusteringMethod function used to cluster intersections for a given random line
 */
export declare function clusterPaths(paths: Feature<LineString>[], clusteringMethod?: (line: RandomLine) => void): Feature<LineString>[];
