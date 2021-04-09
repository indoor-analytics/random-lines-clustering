import { Feature, LineString, Point } from "@turf/helpers";
/**
 * This represents an input path.
 * The intersections field is filled by the getPathsIntersections method.
 */
export declare class InputPath {
    path: Feature<LineString>;
    private readonly _intersections;
    constructor(path: Feature<LineString>);
    /**
     * Adds a new path intersection to the local list of intersections.
     * When added, it sorts the list of intersections by distance from the path origin.
     *
     * @param point new input path intersection
     */
    addIntersection(point: Feature<Point>): void;
    /**
     * Returns the intersections list for the current input path.
     */
    getIntersections(): Feature<Point>[];
}
