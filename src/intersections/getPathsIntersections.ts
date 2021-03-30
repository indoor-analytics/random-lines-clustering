import {IntersectionsLine} from "./IntersectionsLine";
import {Feature, LineString, Polygon} from "@turf/helpers";

export function getPathsIntersections (
    zoneOfInterest: Feature<Polygon>,
    inputPaths: Feature<LineString>[],
    randomLines: Feature<LineString>[]
): IntersectionsLine[] {
    return [];
}
