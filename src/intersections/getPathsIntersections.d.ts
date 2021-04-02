import { IntersectionsLine } from "./IntersectionsLine";
import { Feature, LineString } from "@turf/helpers";
/**
 * Computes intersections between randomly-generated lines and input paths.
 *
 * @param inputPaths
 * @param randomLines
 */
export declare function getPathsIntersections(inputPaths: Feature<LineString>[], randomLines: Feature<LineString>[]): IntersectionsLine[];
