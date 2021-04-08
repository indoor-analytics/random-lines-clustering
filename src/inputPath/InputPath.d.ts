import { Feature, LineString, Point } from "@turf/helpers";
/**
 * This represents an input path.
 * The intersections field is filled by the getPathsIntersections.
 */
export declare class InputPath {
    path: Feature<LineString>;
    intersections: Feature<Point>[];
    constructor(path: Feature<LineString>);
}
