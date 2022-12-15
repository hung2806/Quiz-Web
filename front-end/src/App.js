import React from 'react';
import ListPage from './pages/ListPage/ListPage';
import AddPage from './pages/AddPage/AddPage';
import UpdatePage from './pages/UpdatePage/UpdatePage';
import { Route,Switch } from "react-router";

export default class App extends React.Component {
    render() {
       return <>
        <Switch>
                <Route exact path="/" component = {ListPage}/> 
                <Route exact path="/add" component = {AddPage}/> 
                <Route path="/edit/:id" component={UpdatePage}/>
        </Switch>
       </>
        
    }
};
