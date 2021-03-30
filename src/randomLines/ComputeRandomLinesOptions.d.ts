export interface ComputeRandomLinesOptions {
    linesCount?: number;
    seed?: string;
}
export declare const COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS: ComputeRandomLinesOptions;
/**
 * Returns a complete options object (with all parameters), overriding
 * default settings with those provided in input parameter.
 *
 * @param options user-provided options
 */
export declare function getComputeRandomLinesOptions(options: ComputeRandomLinesOptions): ComputeRandomLinesOptions;
