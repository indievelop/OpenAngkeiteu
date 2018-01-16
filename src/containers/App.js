import React from 'react';
import { App } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest } from 'actions/authentication';

class AppContainer extends React.Component {
  componentDidMount() {
    // get cookie by name
    function getCookie(name) {
        var value = "; " + document.cookie
        var parts = value.split("; " + name + "=")
        if (parts.length == 2) return parts.pop().split(";").shift()
    }

    // get loginData from cookie
    let loginData = getCookie('key')
    // if loginData is undefined, do nothing
    if(typeof loginData === "undefined") return

    // decode base64 & parse json
    loginData = JSON.parse(atob(loginData))

    // if not logged in, do nothing
    if(!loginData.isLoggedIn) return

    // page refreshed & has a session in cookie,
    // check whether this cookie is valid or not
    this.props.getStatusRequest().then(
        () => {
            // if session is not valid
            if(!this.props.status.valid) {
                // logout the session
                loginData = {
                    isLoggedIn: false,
                    email: ''
                };

                document.cookie='key=' + btoa(JSON.stringify(loginData)) + '; Path=/';

                // and notify
                let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                Materialize.toast($toastContent, 4000);

            }
        }
    )
  }

  render(){
    const {searchStatus} = this.props
    return (
      <App {...{searchStatus}}/>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,
        searchStatus: state.search
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
