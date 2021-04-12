import { Feature, LineString, Point } from "@turf/helpers";
/**
 * Represents randomly-generated lines that cross the zone of interest.
 * Intersections field is filled by the getPathsIntersections method.
 * Clustered intersections field is filled by the clusterIntersections method.
 */
export declare class RandomLine {
    path: Feature<LineString>;
    intersections: Feature<Point>[];
    clusteredIntersections: {
        [pointId: string]: Feature<Point>;
    };
    constructor(line: Feature<LineString>);
}
