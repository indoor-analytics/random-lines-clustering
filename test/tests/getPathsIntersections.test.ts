import {getPathsIntersections} from "../../src/intersections/getPathsIntersections";
import {actualFlandersRailway} from "../features/zones";
import {randomLine1} from "../features/lines";
import { expect } from "chai";
import {mouais2run, mouaisRun} from "../features/runs";
import booleanPointOnLine from "@turf/boolean-point-on-line";

describe ('getPathsIntersections', () => {
   it ('should build intersection line', () => {
      const intersections = getPathsIntersections(actualFlandersRailway, [mouaisRun, mouais2run], [randomLine1]);
      expect(intersections.length).to.equal(1);
      expect(intersections[0].line).to.deep.equal(randomLine1);
   });

   it ('should build line with correct intersections', () => {
      const intersections = getPathsIntersections(actualFlandersRailway, [mouaisRun, mouais2run], [randomLine1]);
      const intersectLine = intersections[0];

      expect(intersectLine.intersections.length).to.equal(6);

      for (const intersection of intersectLine.intersections)
         expect(booleanPointOnLine(intersection, intersectLine.line)).to.equal(true);
   })
});
