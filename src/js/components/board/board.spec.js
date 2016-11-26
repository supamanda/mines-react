import React from 'react'
import { shallow, mount } from 'enzyme'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store';

import ConnectedBoard, { Board as BoardComponent } from './board'

import { Provider } from "react-redux"
import { Board } from '../../reducers/board'

const middleware = [thunk]
const mockStore = configureStore(middleware)

function setup() {
    const props = {
        board: new Board(2),
        clickCell: jasmine.createSpy()
    }
    const enzymeWrapper = shallow(<BoardComponent {...props} />)
    
    return {
        props,
        enzymeWrapper
    }
}

describe('board_component', () => {
    describe('Board', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper, props } = setup()
            // console.log(enzymeWrapper.find('Board'))
            expect(enzymeWrapper.find('table').hasClass('board')).toBe(true)
            // console.log(enzymeWrapper.render())
            const trs = enzymeWrapper.find('tr')
            // console.log(trs) 
            expect(trs.length).toBe(2)
            const cells = enzymeWrapper.find('Cell')
            // console.log(cells)
            // console.log(props)
            expect(cells.length).toBe(4)
            const firstCellProps = cells.nodes[0].props
            expect(firstCellProps.clicked).toBe(false)
            expect(firstCellProps.row).toBe(0)
            expect(firstCellProps.column).toBe(0)
        })
    })
})