import React from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';

import {
  loginFailure,
  loginSuccess,
  logOut,
} from '../dashboard/actionCreators';

const Login = (props) => {
    if (!props.user.imageUrl) {
      return (
        <GoogleLogin
          clientId="751663115292-f4n69p03t1hj8mkrt79d107nrirvbbdc.apps.googleusercontent.com"
          buttonText="Log in"
          onSuccess={props.loginSuccess}
          onFailure={props.loginFailure}
        />
      );
    } else {
      return (
        <div>
          <img
            className="user-block__image"
            src={props.user.imageUrl}
            alt="profile"
          />
          <div className="user-block__logout">
            <button
              className="btn btn-primary"
              onClick={props.logOut}
            >
              log out
            </button>
          </div>
        </div>
      )
    }
}

const mapStateToProps = (state) => ({
	user: state.dashboard.userData,
    userList: state.dashboard.userList,
});

const mapDispatchToProps = (dispatch) => ({
	loginSuccess: (userData) => dispatch(loginSuccess(userData.profileObj)),
  	loginFailure: () => dispatch(loginFailure()),
  	logOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);