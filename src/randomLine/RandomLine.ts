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

        return point;
    }

    /**
     * Allows clusterIntersections method to set intersections map for the current random line.
     * @param map
     */
    public setClusteredIntersections (
        map: {[pointId: string]: Feature<Point>}
    ): void { }
}
