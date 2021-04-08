import {Feature, LineString, Point} from "@turf/helpers";

/**
 * This represents an input path.
 * The intersections field is filled by the getPathsIntersections.
 */
export class InputPath {
    public path: Feature<LineString>;
    public intersections: Feature<Point>[];

    constructor (path: Feature<LineString>) {
        this.path = path;
        this.intersections = [];
    }
}
