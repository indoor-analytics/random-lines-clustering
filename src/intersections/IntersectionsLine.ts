import {Feature, LineString, Point} from "@turf/helpers";

export class IntersectionsLine {
    line: Feature<LineString>;
    intersections: Feature<Point>[];

    constructor (
        line: Feature<LineString>,
        intersections: Feature<Point>[]
    ) {
        this.line = line;
        this.intersections = intersections;
    }
}
