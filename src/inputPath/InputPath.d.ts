import { Feature, LineString, Point } from "@turf/helpers";
export declare class InputPath {
    path: Feature<LineString>;
    intersections: Feature<Point>[];
    constructor(path: Feature<LineString>);
}
