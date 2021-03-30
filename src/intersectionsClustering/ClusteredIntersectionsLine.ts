import {IntersectionsLine} from "../intersections/IntersectionsLine";
import {Feature, LineString, Point} from "@turf/helpers";

export class ClusteredIntersectionsLine extends IntersectionsLine {
    clusteredIntersections: Point[];

    constructor (
        line: Feature<LineString>,
        intersections: Feature<Point>[],
        clusteredIntersections: Point[]
    ) {
        super (line, intersections);
        this.clusteredIntersections = clusteredIntersections;
    }
}
