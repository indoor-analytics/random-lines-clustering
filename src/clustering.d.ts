import { Feature, LineString } from "@turf/helpers";
/**
 * Clusters a bunch of paths using random-picked lines.
 *
 * @param paths input paths
 */
export declare function clusterPaths(paths: Feature<LineString>[]): Feature<LineString>[];
