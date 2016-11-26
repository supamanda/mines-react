export class Point {
    constructor(row, col) {
        this.row = row
        this.col = col
        // this.equals = this.equals.bind(this)
    }

    equals(other) {
      return this.row === other.row && this.col === other.col
    }
}