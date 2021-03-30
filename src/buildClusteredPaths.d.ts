import { ClusteredIntersectionsLine } from "./intersectionsClustering/ClusteredIntersectionsLine";
import { Feature, LineString } from "@turf/helpers";
export declare function buildClusteredPaths(clusteredIntersections: ClusteredIntersectionsLine[]): Feature<LineString>[];
