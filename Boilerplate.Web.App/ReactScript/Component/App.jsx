// ./src/common/main.component.jsx
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header'
import CustomerDisp from './CustomerDisp' // Display files
import ProductDisp from './ProductDisp' // Display files
import StoreDisp from './StoreDisp' // Display files
import SalesDisp from './SalesDisp' // Display files

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div >
                <Router>
                    <div className="App">

                        <div>
                            <Route path="/" component={Header} />
                        </div>

                        <div>
                            <Route path="/customer" component={CustomerDisp} />
                        </div>

                        <div>
                            <Route path="/products" component={ProductDisp} />
                        </div>

                        <div>
                            <Route path="/stores" component={StoreDisp} />
                        </div>

                        <div>
                            <Route path="/sales" component={SalesDisp} />
                        </div>
                    </div>
                </Router>
            </div>);
    }
}



export default App;