import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import Layout from "./components/layout"
import store from "./store"

const app = document.getElementById('minesweeper')

ReactDOM.render(
    <Provider store={store}>
        <Layout />
    </Provider>, 
    app);