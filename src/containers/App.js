import React from 'react';
//route
import {BrowserRouter as Router, Route, IndexRoute} from 'react-router-dom';
//components
import { Header, Footer } from 'components';
//containers
import {Home, Login, Register} from 'containers';

class App extends React.Component {
    render(){
        return (
          <Router>
            <div id='app'>
              <header>
                <Header/>
              </header>
              <main>
                <Route exact path = '/' component = {Home}/>
                <Route path = '/login' component = {Login}/>
                <Route path = '/register' component = {Register}/>
              </main>
              <footer className='page-footer'>
                <Footer/>
              </footer>
            </div>
          </Router>
        );
    }
}

export default App;
