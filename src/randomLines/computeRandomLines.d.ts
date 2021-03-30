import { BBox, Feature, LineString } from "@turf/helpers";
import { ComputeRandomLinesOptions } from "./ComputeRandomLinesOptions";
export declare function computeRandomLines(area: BBox, options?: ComputeRandomLinesOptions): Feature<LineString>[];
