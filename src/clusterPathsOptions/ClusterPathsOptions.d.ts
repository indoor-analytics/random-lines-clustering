import { RandomLine } from "../randomLine/RandomLine";
import { ComputeRandomLinesOptions } from "../computeRandomLines/ComputeRandomLinesOptions";
import { Feature, LineString } from "@turf/helpers";
export interface ClusterPathsOptions {
    paths: Feature<LineString>[];
    locationsClusteringMethod?: (line: RandomLine) => void;
    randomGenerationOptions?: Partial<ComputeRandomLinesOptions>;
}
