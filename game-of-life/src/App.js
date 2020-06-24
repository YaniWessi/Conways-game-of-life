import React, { useState } from "react";

const numRows = 50;
const numCols = 50;

function App() {
  // the values are constently changing so we use the state so the grid state is going to be stores in a state hook.

  const [grid, setGrid] = useState(() => {
    const rows = [];
    // iterate to create rows and colums
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  });

  // displaying the grid

  return (
    <div
      style={{
        // this displays the grid
        display: "grid",
        //specify how many colums i want - the second property is how big i want them to be 20px for each one
        gridTemplateColumns: `repeat(${numCols}, 20px)`
      }}
    >
      {grid.map((rows, i) =>
        rows.map((col, k) => (
          <div
            key={`${i}-${k}`}
            style={{
              width: 20,
              height: 20,
              background: grid[i][k] ? "pink" : undefined,
              border: "solid 1px black"
            }}
          />
        ))
      )}
    </div>
  );
}

export default App;
