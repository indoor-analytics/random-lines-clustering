import {Feature, LineString, Point} from "@turf/helpers";

/**
 * This represents an input path.
 * The intersections field is filled by the getPathsIntersections.
 */
export class InputPath {
    public path: Feature<LineString>;
    private _intersections: Feature<Point>[];

    constructor (path: Feature<LineString>) {
        this.path = path;
        this._intersections = [];
    }

    /**
     * Adds a new path intersection to the local list of intersections.
     * When added, it sorts the list of intersections by distance from the path origin.
     *
     * @param point new input path intersection
     */
    public addIntersection ( point: Feature<Point> ): void {
        this._intersections.push(point);
    }
}
