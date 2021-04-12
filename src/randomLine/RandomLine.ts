import {Feature, LineString, Point} from "@turf/helpers";
import pointToLineDistance from "@turf/point-to-line-distance";

/**
 * Represents randomly-generated lines that cross the zone of interest.
 * Intersections field is filled by the getPathsIntersections method.
 * Clustered intersections field is filled by the clusterIntersections method.
 */
export class RandomLine {
    path: Feature<LineString>;
    intersections: Feature<Point>[];
    clusteredIntersections: {[pointId: string]: Feature<Point>}

    constructor (
        line: Feature<LineString>
    ) {
        this.path = line;
        this.intersections = [];
        this.clusteredIntersections = {};
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

        if (!this.intersections.includes(point))
            throw new RangeError("Input point must be a random line intersection.");

        const key = JSON.stringify(point);
        const associatedClusteredPosition = this.clusteredIntersections[key];

        if (!associatedClusteredPosition)
            throw new RangeError('Input point has no associated clustered position.');

        return associatedClusteredPosition;
    }

    /**
     * Allows clusterIntersections method to set intersections entries for the current random line.
     * @param intersections array of positions to associate to the new clustered position
     * @param associatedClusteredPoint position to associate to a number of line points
     */
    public setClusteredIntersection (
        intersections: Feature<Point>[],
        associatedClusteredPoint: Feature<Point>
    ): void {
        for (const intersection of intersections) {
            const key = JSON.stringify(intersection);
            this.clusteredIntersections[key] = associatedClusteredPoint;
        }
    }
}
