# Documentation

## Installation and setup

```
git clone https://github.com/miletovaa/ml-dm-project.git
cd ./ml-dm-project/app
npm run dev
``` 

## User Guide

1. **Add Points**
   - Use the "Add point" form to input X and Y coordinates.
   - Click "+" to add it to the list. Coordinates (0, 0) are ignored.

2. **Choose Linkage Type**
   - "Single" (S): Minimum distance between clusters.
   - "Complete" (C): Maximum distance between clusters.

3. **Run Clustering**
   - Click **"Calculate results"**.
   - View resulting:
     - Dendrogram (visual cluster tree)
     - Step-by-step distance matrices


## Sample data:
**Input:**
```
    { id: '1', x: 5, y: 5 },
    { id: '2', x: 4, y: 4 },
    { id: '3', x: 1, y: 2 },
    { id: '4', x: 1, y: 1 },
    { id: '5', x: 2, y: 1 },
    { id: '6', x: 10, y: 10 }
```


## Project structure:

app/
├── src/
│   ├── components/
│   │   ├── Dendrogram.tsx
│   │   ├── DistanceMatrixPlot.tsx
│   │   ├── InsertNewPoint.tsx
│   │   ├── PointsScatterPlot.tsx
│   │   └── UserInputContainer.tsx
│   ├── state/
│   ├── types/
│   │   ├── dendrogram.ts
│   │   ├── linkageType.ts
│   │   ├── matrix.ts
│   │   └── point.ts
│   ├── utils/
│   │   ├── clusteringAlgorithm.ts
│   │   └── dendrogram.ts
│   ├── App.tsx
│   └── index.tsx


## Key functions

1. `calculateInitialDistanceMatrix(points: Points): DistanceMatrix` (clusteringAlgorithm.ts)
    *Input*: An array of 2D points.
    ```javascript
    type Point = {
        id: string
        x: number
        y: number
    }

    type Points = Point[]
    ```
    *Output*: A distance matrix where each cell represents the Manhattan distance between two points.
    ```javascript
    type Distance = {
        id: string
        distance: number
    }

    type Point = {
        id: string
        distances: Distance[]
    }

    export type DistanceMatrix = Point[]
    ```

2. `getClosestPoints(matrix: DistanceMatrix): ClosestPoints
` (clusteringAlgorithm.ts)
    *Input*: A DistanceMatrix.
    *Output*: The ids of the pair of points with the smallest non-zero distance.
    ```javascript
    type ClosestPoints = {
        pointAId: string
        pointBId: string
        minDist: number
    }
    ```

3. `calculateNewDistanceMatrix(oldMatrix, closestPoints, linkageType): DistanceMatrix` (clusteringAlgorithm.ts)
    *Input*: oldMatrix -- previous distance matrix, closestPoints, linkageType.
    ```javascript
    type LinkageType = "S" | "C" // S = Single, C = Complete
    ```
    *Output*: An updated distance matrix after merging the closest pair.

4. `clusteringAlgorithm(initialPoints, linkageType): { matrices, nodes }` (clusteringAlgorithm.ts)
    *Input*: initialPoints -- an array of Point objects, linkageType.
    *Output*: An object with:
    - matrices: Distance matrices for each clustering step
	- nodes: Tree nodes used for building the dendrogram
    ```javascript
    type DendrogramNode = {
    index: string
    height: number
    isLeaf?: boolean
    children?: DendrogramNode[]
    }
    ```

5. `getDendrogram(data: DendrogramNode, options?): SVGElement` (dendrogram.ts)
    *Input*: data -- final dendrogram root node, options: display settings (e.g., dimensions, font, cut height)
    *Output*: An SVG element with the drawn dendrogram.

## State management


| Atom              | Type                | Description                             | Used In                      |
|-------------------|---------------------|-----------------------------------------|-------------------------------|
| `pointsState`     | `Points[]`          | Array of user-defined points            | `InsertNewPoint`, `Scatter`, `UserInputContainer` |
| `linkageTypeState`| `"S"` or `"C"`      | Clustering method                       | `UserInputContainer`         |


## UI Components

#### InsertNewPoint.tsx
- Handles adding new points to global state (pointsState)
- UI: Two inputs (x, y) + “+” button

#### PointsScatterPlot.tsx
- Plots points on a Recharts scatter plot
- Dynamically shows/hides when there are no points

#### UserInputContainer.tsx
- Lets user choose linkage type and run clustering
- Shows results:
- Dendrogram (using <Dendrogram />)
- Distance matrices (using <DistanceMatrixPlot />)

#### Dendrogram.tsx
- Uses getDendrogram() to render the final tree

#### DistanceMatrixPlot.tsx
- Renders a matrix table using <table> from matrix data