import {clusterPaths} from "../../src/clustering";
import {aroundCitadelPath1, aroundCitadelPath2} from "../features/runs";
import { expect } from "chai";

describe ('clusterPaths', () => {
    describe ('arguments', () => {
        it ('should build segments with no optional arguments', () => {
            const segments = clusterPaths({paths: [aroundCitadelPath1, aroundCitadelPath2]});
            expect(segments.length).not.to.equal(0);
        });

        it ('should build segments with random generation options', () => {
            const segments = clusterPaths({
                paths: [aroundCitadelPath1, aroundCitadelPath2],
                randomGenerationOptions: {
                    linesCount: 42,
                    seedGenerator: () => "hello there"
                }
            });
            expect(segments.length).not.to.equal(0);
        });
    });
});
