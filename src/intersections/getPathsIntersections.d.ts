import { RandomLine } from "../randomLine/RandomLine";
import { Feature, LineString, Point } from "@turf/helpers";
import { InputPath } from "../inputPath/InputPath";
import { IntersectionsMap } from "../intersectionsMap/IntersectionsMap";
/**
 * Computes intersections between randomly-generated lines and input paths.
 *
 * @param inputPaths
 * @param randomLines
 */
export declare function getPathsIntersections(inputPaths: InputPath[], randomLines: RandomLine[]): IntersectionsMap;
/**
 * Returns a number identifying intersection direction.
 *
 * @param inputPath
 * @param randomLine
 * @param intersection
 */
export declare function getIntersectionDirection(inputPath: Feature<LineString>, randomLine: Feature<LineString>, intersection: Feature<Point>): number;
