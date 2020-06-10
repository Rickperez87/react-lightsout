import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightsStartOn: 0.25,
  };

  constructor(props) {
    super(props);
    this.createBoard = this.createBoard.bind(this);
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.state = { board: this.createBoard(), hasWon: false };
    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let newBoard = [];
    let { ncols, nrows } = this.props;
    let trueFalse = [true, false];

    // TODO: create array-of-arrays of true/false values
    for (let x = 0; x <= ncols - 1; x++) {
      newBoard[x] = [];
      for (let y = 0; y <= nrows - 1; y++) {
        newBoard[x][y] =
          Math.floor(trueFalse.length * Math.random()) &&
          Math.floor(trueFalse.length * Math.random())
            ? true
            : false;
      }
    }
    return newBoard;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
        console.log(board);
      }
    }
    flipCell(y, x);
    this.setState({ board });
    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    // this.setState({board, hasWon});
  }

  /** Render game board or winning message. */
  render() {
    if (this.state.hasWon) return "you win!!!";
    return (
      <div>
        <table className="Board">
          <tbody>
            {this.state.board.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <Cell
                    key={`${ri}-${ci}`}
                    id={`${ri}-${ci}`}
                    flipCellsAroundMe={this.flipCellsAround}
                    isLit={cell}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      // if the game is won, just show a winning msg & render nothing else
      // TODO
      // make table board
      // TODO
    );
  }
}

export default Board;
