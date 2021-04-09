import { RandomLine } from "../randomLine/RandomLine";
import { Feature, Point } from "@turf/helpers";
/**
 * Links an intersection position to an intersections line.
 * As a random line can have several intersections with an input path, several intersections
 * (map keys) can lead to the same line.
 */
export declare class IntersectionsMap {
    private readonly _map;
    constructor();
    setLine(intersection: Feature<Point>, line: RandomLine): void;
    getLine(intersection: Feature<Point>): RandomLine;
    getKeys(): string[];
    getAllIntersectionLines(): RandomLine[];
}
