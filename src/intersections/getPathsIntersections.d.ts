import { IntersectionsLine } from "./IntersectionsLine";
import { Feature, LineString } from "@turf/helpers";
export declare function getPathsIntersections(inputPaths: Feature<LineString>[], randomLines: Feature<LineString>[]): IntersectionsLine[];
