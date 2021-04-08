import { IntersectionsLine } from "../intersections/IntersectionsLine";
import { Feature, Point } from "@turf/helpers";
export declare class IntersectionsMap {
    private readonly _map;
    constructor();
    setLine(intersection: Feature<Point>, line: IntersectionsLine): void;
    getLine(intersection: Feature<Point>): IntersectionsLine;
    getKeys(): string[];
    getAllIntersectionLines(): IntersectionsLine[];
}
