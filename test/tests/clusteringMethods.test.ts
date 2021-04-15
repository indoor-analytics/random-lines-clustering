import {InputPath} from "../../src/inputPath/InputPath";
import {slalomingAroundLineRun} from "../features/runs";
import {getPathsIntersections} from "../../src/intersections/getPathsIntersections";
import {RandomLine} from "../../src/randomLine/RandomLine";
import {randomLine1} from "../features/lines";
import { expect } from "chai";
import {KDELineClustering} from "../../src/intersectionsClustering/methods/KDELineClustering";
import {CentroidLineClustering} from "../../src/intersectionsClustering/methods/CentroidLineClustering";


describe ('Clustering methods', () => {
    describe ('KDE line clustering', () => {
        // https://gist.github.com/Alystrasz/6ea1c20b0605cc0b482903b76cd5d716
        it ('should populate random line with clustered intersections', () => {
            const inputPath = new InputPath(slalomingAroundLineRun);
            const intersectionsMap = getPathsIntersections([inputPath], [new RandomLine(randomLine1)]);

            // using first line (same line will appear three times)
            const firstLine = intersectionsMap.getAllIntersectionLines()[0];
            const firstIntersection = firstLine.getIntersectionsList()[0];

            KDELineClustering(firstLine);
            const clusteredIntersection = firstLine.getClusteredIntersection(firstIntersection);
            expect(clusteredIntersection).not.to.equal(undefined);
        });
    });


    describe ('Centroid line clustering', () => {
        // https://gist.github.com/Alystrasz/6ea1c20b0605cc0b482903b76cd5d716
        it ('should populate random line with clustered intersections', () => {
            const inputPath = new InputPath(slalomingAroundLineRun);
            const intersectionsMap = getPathsIntersections([inputPath], [new RandomLine(randomLine1)]);

            // using first line (same line will appear three times)
            const firstLine = intersectionsMap.getAllIntersectionLines()[0];

            const intersections = firstLine.getIntersectionsList();
            const firstIntersection = intersections[0];
            const secondIntersection = intersections[1];
            const thirdIntersection = intersections[2];

            CentroidLineClustering(firstLine);

            // first and third intersections should lead to the same clustered
            // location, as they both have the same direction
            const clusteredIntersection0 = firstLine.getClusteredIntersection(firstIntersection);
            const clusteredIntersection2 = firstLine.getClusteredIntersection(thirdIntersection);
            expect(clusteredIntersection0).to.deep.equal(clusteredIntersection2);

            // clustered location from second intersection should be different from other clustered location
            const clusteredIntersection1 = firstLine.getClusteredIntersection(secondIntersection);
            expect(clusteredIntersection1).to.not.equal(clusteredIntersection0);
        });
    });
});
