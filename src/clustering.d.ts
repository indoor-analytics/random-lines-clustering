import { Feature, LineString, Polygon } from "@turf/helpers";
/**
 * Clusters a bunch of paths using random-picked lines.
 *
 * @param zoneOfInterest
 * @param paths
 */
export declare function clusterPaths(zoneOfInterest: Feature<Polygon>, paths: Feature<LineString>[]): Feature<LineString>[];
