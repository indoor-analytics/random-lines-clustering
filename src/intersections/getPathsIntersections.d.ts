import { IntersectionsLine } from "./IntersectionsLine";
import { Feature, LineString, Point } from "@turf/helpers";
import { InputPath } from "../inputPath/InputPath";
/**
 * Computes intersections between randomly-generated lines and input paths.
 *
 * @param inputPaths
 * @param randomLines
 */
export declare function getPathsIntersections(inputPaths: InputPath[], randomLines: Feature<LineString>[]): IntersectionsLine[];
/**
 * Returns a number identifying intersection direction.
 *
 * @param inputPath
 * @param randomLine
 * @param intersection
 */
export declare function getIntersectionDirection(inputPath: Feature<LineString>, randomLine: Feature<LineString>, intersection: Feature<Point>): number;
