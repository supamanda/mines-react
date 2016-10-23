import * as actions from './boardActions'

describe('actions', () => {
    it('should assert true', () => {
        expect(true).toEqual(true)
    })
    it('should create an action to click a cell', () => {
        const row = 15, column = 17
        const expectedAction = {
            type: 'CLICKED_CELL',
            payload: {
                row: row, column: column
            }
        }
        expect(actions.clickCell(row, column)).toEqual(expectedAction)
    })
})