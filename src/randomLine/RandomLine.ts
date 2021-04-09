import {Feature, LineString, Point} from "@turf/helpers";

/**
 * Represents randomly-generated lines that cross the zone of interest.
 * Intersections field is filled by the getPathsIntersections method.
 */
export class RandomLine {
    path: Feature<LineString>;
    intersections: Feature<Point>[];

    constructor (
        line: Feature<LineString>
    ) {
        this.path = line;
        this.intersections = [];
    }
}
