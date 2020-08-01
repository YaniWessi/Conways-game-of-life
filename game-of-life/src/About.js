import React from "react";

const About = () => {
  return (
    <>
      <h1>About Conways Game of Life</h1>

      <h2>Introduction</h2>
      <p>
        The Game of Life is a cellular automaton devised by the British
        mathematician John Horton Conway in 1970. it is a zero-player game,
        meaning that its evolution is determined by its initial state. Requiring
        no further input .One interact with the Game of Life by creating an
        initial configuration and observing how it evolves.It is turing complete
        and can simulate a universal constructor or any other turing machine.
      </p>

      <h3>Rules</h3>
      <p>
        The universe of the Game of life is an infinte, two-dimensional
        orthogonal grid of sqaure cells, each of which is in one of two possible
        states, live or dead, or populated or unpopulated. Every cell interacts
        with its eight neighbours, which are the cells that are horizontally,
        vertically, or diagonally adjacent. At each step in time, the following
        transitions occur:
      </p>
      <p>
        Any live cell with fewer than two live neighbours dies, as if by
        underpopulation
      </p>
      <p>Any live cell with two or three lives on to the next generation</p>
      <p>
        Any live cell with more than three live neighbours dies, as if by
        overpopulation
      </p>
      <p>
        Any dead cell with exactly three live neighbours becomes a live cell, as
        if by reproduction
      </p>

      <h4>
        These rules, which compare the behavoir of the automaton to real life,
        can be condenced into the following:
      </h4>

      <p>Any live cell with two or three live neighbours survives</p>
      <p>Any dead cell with three live neighbours becomes a live cell</p>
      <p>
        All other live cells die in the next generation. Similary, all other
        cells stay dead
      </p>

      <h5>
        The initial pattern constitues the seed of the system. The first
        generation is created by applying the above Rules simultaneously to
        every cell in the seed; births and deaths occur simultaneously, and the
        discrete moments at which this happens is sometimes called a tick. Each
        generation is a pure function of the preceding one. The rules continue
        to be applied repeatedly to create further generations
      </h5>
    </>
  );
};

export default About;
