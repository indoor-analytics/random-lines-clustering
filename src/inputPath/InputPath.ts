import {Feature, LineString, Point} from "@turf/helpers";

export class InputPath {
    public path: Feature<LineString>;
    public intersections: Feature<Point>[];

    constructor (path: Feature<LineString>) {
        this.path = path;
        this.intersections = [];
    }
}
