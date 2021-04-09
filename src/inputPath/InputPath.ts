import {Feature, LineString, Point} from "@turf/helpers";
import length from "@turf/length";
import lineSlice from "@turf/line-slice";

/**
 * This represents an input path.
 * The intersections field is filled by the getPathsIntersections method.
 */
export class InputPath {
    public path: Feature<LineString>;
    private readonly _intersections: Feature<Point>[];

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
        const pathOrigin = this._intersections[0];
        this._intersections.sort(((a, b) => {
            return length(lineSlice(pathOrigin, a, this.path)) - length(lineSlice(pathOrigin, b, this.path));
        }));
    }


    /**
     * Returns the intersections list for the current input path.
     */
    public getIntersections (): Feature<Point>[] {
        return this._intersections;
    }
}
