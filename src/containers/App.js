import React from 'react';
//route
import {BrowserRouter as Router, Route, IndexRoute} from 'react-router-dom';
//components
import { Header, Footer } from 'components';
//containers
import {Home, Login, Register} from 'containers';
//redux
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

class App extends React.Component {
    render(){
        return (
          <Provider store={store}>
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
          </Provider>
        );
    }
}

export default App;
