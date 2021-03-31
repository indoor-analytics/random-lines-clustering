import { v4 as uuidv4 } from 'uuid';

export interface ComputeRandomLinesOptions {
    linesCount: number;
    seedGenerator: () => string;
}

export const COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS: ComputeRandomLinesOptions = {
    linesCount: 10,
    seedGenerator: () => uuidv4()
};

/**
 * Returns a complete options object (with all parameters), overriding
 * default settings with those provided in input parameter.
 *
 * @param options user-provided options
 */
export function getComputeRandomLinesOptions (
    options: Partial<ComputeRandomLinesOptions>
): ComputeRandomLinesOptions {
    const defaultsClone = Object.assign({}, COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS);
    return Object.assign(defaultsClone, options);
}
