import { IntersectionsLine } from "../intersections/IntersectionsLine";
import { Feature, Point } from "@turf/helpers";
/**
 * Allows program to link an intersection position to the linked intersections line.
 * Several intersections can lead to the same line.
 */
export declare class IntersectionsMap {
    private readonly _map;
    constructor();
    setLine(intersection: Feature<Point>, line: IntersectionsLine): void;
    getLine(intersection: Feature<Point>): IntersectionsLine;
    getKeys(): string[];
    getAllIntersectionLines(): IntersectionsLine[];
}
