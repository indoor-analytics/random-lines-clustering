import {Feature, LineString} from "@turf/helpers";
import {IntersectionsLine} from "../intersections/IntersectionsLine";

export class InputPath {
    public path: Feature<LineString>;
    public intersections: IntersectionsLine[];

    constructor (path: Feature<LineString>) {
        this.path = path;
        this.intersections = [];
    }
}
