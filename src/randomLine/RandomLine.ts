import {Feature, LineString, Point} from "@turf/helpers";

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
