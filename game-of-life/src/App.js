import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import About from "./About";

const numRows = 50;
const numCols = 50;

// computing the grid of neibors using an arry of opperations
// each location of the value is represented by the operation

const operations = [
  [0, 1],
  [0, -1],
  [1 - 1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

// this generates an empty grid
const produceEmptyGrid = () => {
  // this creates the grid / initailizing the state in the use state
  const rows = [];
  // iterate to create rows and colums
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};
//^^^^^^^creates the grid. The values are constenly changing. (so thetate is stored in a usestate hook) grid

function App() {
  const [grid, setGrid] = useState(() => {
    return produceEmptyGrid();
  });

  //store whether we have started or not in state. if it running display the value stop otherwise stop
  const [running, setRunning] = useState(false);

  const [counter, setCounter] = useState(0);

  const [speed, setSpeed] = useState(100);

  // to run the simulation we will have a function here called run simulate
  // i dont want it to recreate every render so i will use the react use callBack hook
  // this is like a recursice function

  const runningRef = useRef(running);

  // the current value of the reff is whatever the value of running is

  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      // simulate and see if its currenly running. if not running return
      // the useCallback hook so the fuction those not change-basically to not recreate every render
      // the running value in the state changes but our fuction those not change
      // so its not going to keep up to date with the value of what keepinf running is
      // we are actually going to store it in a ref, using the ref hook
      return;
    }

    //so it going to go through the current grid (9). every cell in it. then commpute the number of neighbors it has
    //the if statememt will check to make sure we dont go out of bonds.
    //once we compute the amount of neibors we apply the second if condition. this determins wether a cell becomes zero or a cell
    // becomes 1
    // then mutating the using the produce function that is going to generate a new grid for us and update the set grid value
    // then we call set time out to run it agian in one second

    // simulte
    // rules for simulation

    // Any live cell with fewer than two live neighbours dies, as if by underpopulation
    // Any live cell with two or three live neighbours on the next generation.
    setGrid(g => {
      // the propuse of this function is the parameter here will be the current value of the grid
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          //the double for loop with go through every cell in the grid
          for (let j = 0; j < numCols; j++) {
            // this is another place where we will update values in the grid and we want to mutate them const; newGrid
            // compute the number of neibors the cell has and determine what to do to it
            let neighbors = 0; //this is going to tell us for a given cell how many neibors it has
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              // check the bound so we don't go above or below what we can
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ];
              }
            });
            // rules covered by this
            // ( rule 1-->Any live cell with fewer than two live neighbours dies, as if by underpopulation)
            // ( rule 2-->Any live cell eith more than three live neighbours dies, as if by overpopulation)
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    // Any live cell eith more than three live neighbours dies, as if by overpopulation.
    // Any dead cell with eactly three live neighbours becomes a live cell, as if by reproduction:

    setTimeout(runSimulation, 100);
    setCounter(counter => (counter += 1));
  }, []); //[] <--- this will make sure that this function is only created once

  // displaying the grid

  return (
    <>
      <About />
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "stop" : "start"}
      </button>
      <button
        onClick={() => {
          const rows = [];
          // iterate to create rows and colums
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.1 ? 1 : 0))
            );
          }

          setGrid(rows);
        }}
      >
        random
      </button>
      <div>{speed}</div>
      <button
        onClick={() => {
          setSpeed(speed + 10);
        }}
      >
        speed
      </button>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Counter{counter}
      </button>
      <button
        onClick={() => {
          setGrid(produceEmptyGrid());
          setCounter(0);
        }}
      >
        Clear
      </button>

      <div
        style={{
          // this displays the grid
          display: "grid",
          //specify how many colums i want - the second property is how big i want them to be 20px for each one
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
      >
        {grid.map((rows, i) =>
          //row i column index j
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              // make our div click able so we can change each cell to pink
              onClick={() => {
                //onclick we are going to set the current index to a
                //I want to update the value of the grid at position i-k/ in stead of
                // updating the value from state like grid[i][k] = because it will mutate it.
                // install a library that will help do that called immer/ immer has a function that we can use called produce.immer make it a mutualable change and make a new grid for us.

                const newGrid = produce(grid, gridCopy => {
                  //make it toggle back and forth position [i][k] ?  if currently alive make it dead=0 or alive=1
                  // now we can set an initial state for our grid to actually start simuliting this
                  gridCopy[i][j] = grid[i][j] ? 0 : 1;
                  //toggle if currently alive make it dead. 0 --> 1
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                background: grid[i][j] ? "blue" : undefined,
                border: "solid 1px red"
              }}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
