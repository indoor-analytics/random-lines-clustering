import {getPathsIntersections} from "../../src/intersections/getPathsIntersections";
import {actualFlandersRailway} from "../features/zones";
import {randomLine1} from "../features/lines";
import { expect } from "chai";
import {mouais2run, mouaisRun} from "../features/runs";

describe ('getPathsIntersections', () => {
   it ('should build intersection line', () => {
      const intersections = getPathsIntersections(actualFlandersRailway, [mouaisRun, mouais2run], [randomLine1]);
      expect(intersections.length).to.equal(1);
   });
});
