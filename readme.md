# @indoor-analytics/random-lines-clustering

Clusters a bunch of paths using random-picked lines.

## How to use

Add this line to `~/.npmrc` to set up the package registry:
```shell
@indoor-analytics:registry=https://npm.pkg.github.com/indoor-analytics
```

In your project, install the package:
```shell
npm i --save @indoor-analytics/random-lines-clustering
```

Import the function in your code:
```javascript
import {clusterPaths} from '@indoor-analytics/random-lines-clustering';
```

## Clustering options

`clusterPaths` takes an options object as unique argument; here are available options:

| Parameter | Required | Default value | Comment |
|:-------|:--------|:-------|:-------|
| paths: Feature<LineString>[]  | `true` | `undefined` | input paths to cluster |
| locationsClusteringMethod: (line: RandomLine) => void   | `false`  | `CentroidLineClustering` | this algorithm clusters all intersections of a given line |
| randomGenerationOptions: Partial\<ComputeRandomLinesOptions\> | `false` | `{ linesCount: 10, seedGenerator: () => uuidv4() }` | you can decide here how many random lines will be generated, and how they are generated (provide a constant seed if you want to obtain reproducible results) |

Please note that the default intersections clustering method (`CentroidLineClustering`) is a **dummy algorithm**, and 
**must be replaced** by an implementation of your choice. 


## Algorithm formalization

```text
Inputs:
    * a zone of interest (ZOI) on a single floor;
    * paths to cluster.

We create a bunch of straight lines, each line being defined by two ZOI random-picked points.

For each line:
    * MARK each intersection with a path (while saving intersection direction)
    * CLUSTER intersections with provided algorithm
    
For each path, we rebuild path using previously-clustered points:
    * if path segment between two points does not exist, create it
    * else increase its weight by one
```
