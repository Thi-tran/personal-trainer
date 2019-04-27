import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
const AppRouter = () => (
    <BrowserRouter>
        <div className="App">
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;