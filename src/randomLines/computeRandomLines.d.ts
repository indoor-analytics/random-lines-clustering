import { Feature, LineString, Polygon } from "@turf/helpers";
import { ComputeRandomLinesOptions } from "./ComputeRandomLinesOptions";
/**
 * Generates random segments crossing a zone of interest.
 * Each segment's vertex is located on the ZOI's perimeter, but both cannot belong to the same ZOI's edge.
 *
 * @param area zone of interest
 * @param options options to customize lines generation
 */
export declare function computeRandomLines(area: Feature<Polygon>, options?: Partial<ComputeRandomLinesOptions>): Feature<LineString>[];
