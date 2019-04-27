import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import HomePage from '../pages/HomePage';
import CalendarView from '../pages/CalendarView';
import NotFoundPage from '../pages/NotFoundPage';
const AppRouter = () => (
    <BrowserRouter>
        <div className="App">
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/calendar" component={CalendarView} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;