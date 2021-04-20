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

## Algorithm formalization

```text
Inputs:
    * a zone of interest (ZOI) on a single floor;
    * paths to cluster.

We create a bunch of straight lines, each line being defined by two ZOI random-picked points.

For each line:
    * MARK each intersection with a path (+ saving keeping intersection direction)
    * CLUSTER intersections (with k-nn or another algorithm)
    
For each path, we rebuild path using previously-clustered points:
    * if path segment between two points does not exist, create it
    * else increase its weight by one
```
