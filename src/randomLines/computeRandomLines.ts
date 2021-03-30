import {Feature, LineString, Polygon} from "@turf/helpers";
import {ComputeRandomLinesOptions, getComputeRandomLinesOptions} from "./ComputeRandomLinesOptions";

export function computeRandomLines (
    area: Feature<Polygon>,
    options: ComputeRandomLinesOptions
): Feature<LineString>[] {
    const allOptions = getComputeRandomLinesOptions(options);
    return [];
}
