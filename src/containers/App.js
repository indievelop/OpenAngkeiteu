import React from 'react';
//route
import {BrowserRouter as Router, Route, IndexRoute} from 'react-router-dom';
//components
import { Header, Footer, Sidemenu } from 'components';
//containers
import {Home, Login, Register, WriteAngkeiteu, ReadAngkeiteu} from 'containers';
import { connect } from 'react-redux';
import { getStatusRequest } from 'actions/authentication';

class App extends React.Component {

  componentDidMount() {
    // get cookie by name
    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    // get loginData from cookie
    let loginData = getCookie('key');

    // if loginData is undefined, do nothing
    if(typeof loginData === "undefined") return;

    // decode base64 & parse json
    loginData = JSON.parse(atob(loginData));

    // if not logged in, do nothing
    if(!loginData.isLoggedIn) return;

    // page refreshed & has a session in cookie,
    // check whether this cookie is valid or not
    this.props.getStatusRequest().then(
        () => {
            console.log(this.props.status);
            // if session is not valid
            if(!this.props.status.valid) {
                // logout the session
                loginData = {
                    isLoggedIn: false,
                    email: ''
                };

                document.cookie='key=' + btoa(JSON.stringify(loginData));

                // and notify
                let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                Materialize.toast($toastContent, 4000);

            }
        }
    );
  }

  render(){
      return (
          <Router>
            <div id='app'>
              <header>
                <Header/>
              </header>
              <main>
                <Sidemenu/>
                <Route exact path = '/' component = {Home}/>
                <Route path = '/login' component = {Login}/>
                <Route path = '/register' component = {Register}/>
                <Route path = '/writeAngkeiteu' component = {WriteAngkeiteu}/>
                <Route path = '/readAngkeiteu' component = {ReadAngkeiteu}/>
              </main>
              <footer className='page-footer'>
                <Footer/>
              </footer>
            </div>
          </Router>
      );
  }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
