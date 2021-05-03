import {InputPath} from "../../src/inputPath/InputPath";
import {citadelTopToBottomPaths, slalomingAroundLineRun} from "../features/runs";
import {getPathsIntersections} from "../../src/intersections/getPathsIntersections";
import {kdeLineClusteringCore} from "../../src/intersectionsClustering/methods/kde/core";
import { expect } from "chai";
import {citadelRandomLine1, randomLine1} from "../features/lines";
import {RandomLine} from "../../src/randomLine/RandomLine";
import {kdeLineClustering} from "../../src/intersectionsClustering/methods/kde/control";

describe ('KDE clustering', () => {
    describe ('Core', () => {
        // https://gist.github.com/Alystrasz/6ea1c20b0605cc0b482903b76cd5d716
        it ('should populate random line with clustered intersections', () => {
            const inputPath = new InputPath(slalomingAroundLineRun);
            const intersectionsMap = getPathsIntersections([inputPath], [new RandomLine(randomLine1)]);

            // using first line (same line will appear three times)
            const firstLine = intersectionsMap.getAllIntersectionLines()[0];
            const firstIntersection = firstLine.getIntersectionsList()[0];

            kdeLineClusteringCore(firstLine, 81);
            const clusteredIntersection = firstLine.getClusteredIntersection(firstIntersection);
            expect(clusteredIntersection).not.to.equal(undefined);
        });

        // https://gist.github.com/Alystrasz/a6b3599d5a16dafb5cd9f5648f0a3fdf
        it ('should populate random line with two clustered positions w/ four paths going in the same direction', () => {
            const inputPaths = citadelTopToBottomPaths.map((path) => new InputPath(path));
            const intersectionsMap = getPathsIntersections(inputPaths, [new RandomLine(citadelRandomLine1)]);

            // using first line (same line will appear four times)
            const firstLine = intersectionsMap.getAllIntersectionLines()[0];
            const intersections = firstLine.getIntersectionsList();
            // because lines are conveniently sorted from left to right, intersections match lines
            const firstIntersection = intersections[0];
            const secondIntersection = intersections[1];
            const thirdIntersection = intersections[2];
            const fourthIntersection = intersections[3];

            kdeLineClusteringCore(firstLine, 81);

            // first and second paths should point to one cluster
            // third and fourth paths should point to another
            const clusteredIntersection1 = firstLine.getClusteredIntersection(firstIntersection);
            const clusteredIntersection2 = firstLine.getClusteredIntersection(secondIntersection);
            const clusteredIntersection3 = firstLine.getClusteredIntersection(thirdIntersection);
            const clusteredIntersection4 = firstLine.getClusteredIntersection(fourthIntersection);

            expect(clusteredIntersection1).to.deep.equal(clusteredIntersection2);
            expect(clusteredIntersection3).to.deep.equal(clusteredIntersection4);
        });
    });


    describe ('controls', () => {
        // https://gist.github.com/Alystrasz/a6b3599d5a16dafb5cd9f5648f0a3fdf
        it ('should compute two intersection clusters with k=2', () => {
            const inputPaths = citadelTopToBottomPaths.map((path) => new InputPath(path));
            const intersectionsMap = getPathsIntersections(inputPaths, [new RandomLine(citadelRandomLine1)]);

            // using first line (same line will appear four times)
            const firstLine = intersectionsMap.getAllIntersectionLines()[0];
            const intersections = firstLine.getIntersectionsList();
            // because lines are conveniently sorted from left to right, intersections match lines
            const firstIntersection = intersections[0];
            const secondIntersection = intersections[1];
            const thirdIntersection = intersections[2];
            const fourthIntersection = intersections[3];

            kdeLineClustering(firstLine, 2);

            // first and second paths should point to one cluster
            // third and fourth paths should point to another
            const clusteredIntersection1 = firstLine.getClusteredIntersection(firstIntersection);
            const clusteredIntersection2 = firstLine.getClusteredIntersection(secondIntersection);
            const clusteredIntersection3 = firstLine.getClusteredIntersection(thirdIntersection);
            const clusteredIntersection4 = firstLine.getClusteredIntersection(fourthIntersection);

            expect(clusteredIntersection1).to.deep.equal(clusteredIntersection2);
            expect(clusteredIntersection3).to.deep.equal(clusteredIntersection4);
        });
    });
});
