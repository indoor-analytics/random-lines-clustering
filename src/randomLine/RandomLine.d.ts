import { Feature, LineString, Point } from "@turf/helpers";
/**
 * Represents randomly-generated lines that cross the zone of interest.
 * Intersections field is filled by the getPathsIntersections method.
 * Clustered intersections field is filled by the clusterIntersections method.
 */
export declare class RandomLine {
    readonly path: Feature<LineString>;
    private _intersections;
    protected readonly _clusteredIntersections: {
        [pointId: string]: Feature<Point>;
    };
    constructor(line: Feature<LineString>);
    addIntersections(intersections: Feature<Point> | Feature<Point>[]): void;
    getIntersectionsList(): Feature<Point>[];
    /**
     * Returns intersection associated to a given path point.
     * @param point intersection with path point
     */
    getClusteredIntersection(point: Feature<Point>): Feature<Point>;
    /**
     * Allows clusterIntersections method to set _intersections entries for the current random line.
     * @param _intersections array of positions to associate to the new clustered position
     * @param associatedClusteredPoint position to associate to a number of line points
     */
    setClusteredIntersection(intersections: Feature<Point>[], associatedClusteredPoint: Feature<Point>): void;
}
