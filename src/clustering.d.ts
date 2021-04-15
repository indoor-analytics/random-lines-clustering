import { Feature, LineString } from "@turf/helpers";
import { ClusterPathsOptions } from "./clusterPathsOptions/ClusterPathsOptions";
/**
 * Clusters a bunch of paths using random-picked lines.
 */
export declare function clusterPaths({ paths, locationsClusteringMethod, randomGenerationOptions }: ClusterPathsOptions): Feature<LineString>[];
