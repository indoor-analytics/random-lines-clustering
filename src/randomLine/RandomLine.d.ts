import { Feature, LineString, Point } from "@turf/helpers";
export declare class RandomLine {
    path: Feature<LineString>;
    intersections: Feature<Point>[];
    constructor(line: Feature<LineString>, intersections: Feature<Point>[]);
}
