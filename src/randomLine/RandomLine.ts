import {Feature, LineString, Point} from "@turf/helpers";

export class RandomLine {
    path: Feature<LineString>;
    intersections: Feature<Point>[];

    constructor (
        line: Feature<LineString>,
        intersections: Feature<Point>[]     // TODO delete this
    ) {
        this.path = line;
        this.intersections = intersections;
    }
}
