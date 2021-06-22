import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import AppLogin from './Components/login';
import {withRouter} from "react-router";

function App() {
    return (
        <Router>
            <Route exact path={['/', '/item']} component={withRouter(AppLogin)}/>
            
        </Router>

    );
}

export default App;