import { Feature, LineString } from "@turf/helpers";
import { IntersectionsLine } from "../intersections/IntersectionsLine";
export declare class InputPath {
    path: Feature<LineString>;
    intersections: IntersectionsLine[];
    constructor(path: Feature<LineString>);
}
