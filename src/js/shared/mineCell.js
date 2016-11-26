export const MINE = 'mine'

export class MineCell {
    constructor(value, clicked, location) {
        this.location = location
        this.value = value;
        this.clicked = clicked;
    }
    isMine() {
        return this.value === MINE 
    }
    duplicate() {
        return new MineCell(this.value, this.clicked, this.location)
    }
}