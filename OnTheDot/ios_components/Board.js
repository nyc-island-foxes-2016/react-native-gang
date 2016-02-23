
'use strict';

class Board {
  grid: Array<Array<number>>;

  constructor() {
    var size = 2;
    var grid = Array(size);
    for (var y = 0; y < size; y++) {
      var row = Array(size);
      for (var x = 0; x < size; x++) {
        row[x] = 0;
      }
      grid[y] = row;
    }
    this.grid = grid;
  }

  mark(row: number, col: number): Board {
    this.grid[row][col] = 1;
    return this;
  }

  isClicked(row, col) {
    return this.grid[row][col] === 1;
  }
}

module.exports = Board;
