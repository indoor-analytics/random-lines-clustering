import {getPathsIntersections} from "../../src/intersections/getPathsIntersections";
import {randomLine1} from "../features/lines";
import { expect } from "chai";
import {mouais2run, mouaisRun} from "../features/runs";
import pointToLineDistance from "@turf/point-to-line-distance";

describe ('getPathsIntersections', () => {
   it ('should build intersection line', () => {
      const intersections = getPathsIntersections([mouaisRun, mouais2run], [randomLine1]);
      expect(intersections.length).to.equal(1);
      expect(intersections[0].line).to.deep.equal(randomLine1);
   });

   it ('should build line with correct intersections', () => {
      const intersections = getPathsIntersections([mouaisRun, mouais2run], [randomLine1]);
      const intersectLine = intersections[0];

      expect(intersectLine.intersections.length).to.equal(6);

      for (const intersection of intersectLine.intersections)
         expect(pointToLineDistance(intersection, intersectLine.line)).to.be.approximately(0, 0.000000001);
   })
});
