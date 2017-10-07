import React from 'react';
//route
import {BrowserRouter as Router, Route, IndexRoute} from 'react-router-dom';
//components
import { Header } from 'components';
//containers
import {Home, Login, Register} from 'containers';

class App extends React.Component {
    render(){
        return (
                <Router>
                  <div>
                  <Header/>
                    <Route exact path = '/' component = {Home}/>
                    <Route path = '/login' component = {Login}/>
                    <Route path = '/register' component = {Register}/>
                  </div>
                </Router>
        );
    }
}

export default App;
