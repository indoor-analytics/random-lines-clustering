import {Feature, LineString, Point} from "@turf/helpers";
import pointToLineDistance from "@turf/point-to-line-distance";

/**
 * Represents randomly-generated lines that cross the zone of interest.
 * Intersections field is filled by the getPathsIntersections method.
 * Clustered intersections field is filled by the clusterIntersections method.
 */
export class RandomLine {
    public readonly path: Feature<LineString>;
    private _intersections: Feature<Point>[];
    protected readonly _clusteredIntersections: {[pointId: string]: Feature<Point>};

    constructor (
        line: Feature<LineString>
    ) {
        this.path = line;
        this._intersections = [];
        this._clusteredIntersections = {};
    }


    public addIntersections (
        intersections: Feature<Point> | Feature<Point>[]
    ): void {
        this._intersections = this._intersections.concat(intersections);
    }

    public getIntersectionsList (): Feature<Point>[] {
        return this._intersections;
    }


    /**
     * Returns intersection associated to a given path point.
     * @param point intersection with path point
     */
    public getClusteredIntersection (
        point: Feature<Point>
    ) : Feature<Point> {
        if (pointToLineDistance(point, this.path) > 1)
            throw new RangeError("Input point must belong to random line.");

        if (!this._intersections.includes(point))
            throw new RangeError("Input point must be a random line intersection.");

        const key = JSON.stringify(point);
        const associatedClusteredPosition = this._clusteredIntersections[key];

        if (!associatedClusteredPosition)
            throw new RangeError('Input point has no associated clustered position.');

        return associatedClusteredPosition;
    }


    /**
     * Allows clusterIntersections method to set _intersections entries for the current random line.
     * @param intersections array of positions to associate to the new clustered position
     * @param associatedClusteredPoint position to associate to a number of line points
     */
    public setClusteredIntersection (
        intersections: Feature<Point>[],
        associatedClusteredPoint: Feature<Point>
    ): void {
        for (const intersection of intersections) {
            const key = JSON.stringify(intersection);
            this._clusteredIntersections[key] = associatedClusteredPoint;
        }
    }


    /**
     * Clones a random line with its intersections list, but does not clone clustered intersections.
     * @param line object to clone
     */
    static clone (line: RandomLine): RandomLine {
        const clone = new RandomLine(line.path);
        clone.addIntersections(line.getIntersectionsList());
        return clone;
    }
}
