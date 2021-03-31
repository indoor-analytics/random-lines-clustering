import { Feature, LineString, Polygon } from "@turf/helpers";
import { ComputeRandomLinesOptions } from "./ComputeRandomLinesOptions";
export declare function computeRandomLines(area: Feature<Polygon>, options?: Partial<ComputeRandomLinesOptions>): Feature<LineString>[];
