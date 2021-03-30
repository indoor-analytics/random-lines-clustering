export interface ComputeRandomLinesOptions {
    linesCount?: number;
    seed?: string;
}

export const COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS: ComputeRandomLinesOptions = {
    linesCount: 10,
    seed: ''    // TODO generate random seed
};

/**
 * Returns a complete options object (with all parameters), overriding
 * default settings with those provided in input parameter.
 *
 * @param options user-provided options
 */
export function getComputeRandomLinesOptions (
    options: ComputeRandomLinesOptions
): ComputeRandomLinesOptions {
    const defaultsClone = JSON.parse(JSON.stringify(COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS));
    return Object.assign(defaultsClone, options);
}
