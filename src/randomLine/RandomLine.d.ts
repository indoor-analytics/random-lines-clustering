import { Feature, LineString, Point } from "@turf/helpers";
/**
 * Represents randomly-generated lines that cross the zone of interest.
 * Intersections field is filled by the getPathsIntersections method.
 *
 * TODO add clustered positions field (map intersection => clustered intersection ?)
 */
export declare class RandomLine {
    path: Feature<LineString>;
    intersections: Feature<Point>[];
    constructor(line: Feature<LineString>);
}
