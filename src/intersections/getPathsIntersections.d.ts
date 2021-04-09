import { RandomLine } from "../randomLine/RandomLine";
import { Feature, LineString, Point } from "@turf/helpers";
import { InputPath } from "../inputPath/InputPath";
import { IntersectionsMap } from "../intersectionsMap/IntersectionsMap";
/**
 * Computes intersections between randomly-generated lines and input paths.
 * Each time an intersection is found, it is pushed to both concerned input path and random line.
 *
 * @param inputPaths paths to cluster
 * @param randomLines randomly-generated lines
 */
export declare function getPathsIntersections(inputPaths: InputPath[], randomLines: RandomLine[]): IntersectionsMap;
/**
 * Returns a number (0 or 1) identifying intersection direction.
 *
 * @param inputPath path to cluster
 * @param randomLine randomly-generated line
 * @param intersection intersection between two lines
 */
export declare function getIntersectionDirection(inputPath: Feature<LineString>, randomLine: Feature<LineString>, intersection: Feature<Point>): 0 | 1;
