import {Feature, LineString, Polygon} from "@turf/helpers";
import {
    COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS,
    ComputeRandomLinesOptions,
    getComputeRandomLinesOptions
} from "./ComputeRandomLinesOptions";

export function computeRandomLines (
    area: Feature<Polygon>,
    options: ComputeRandomLinesOptions = COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS
): Feature<LineString>[] {
    const allOptions = getComputeRandomLinesOptions(options);
    return [];
}
