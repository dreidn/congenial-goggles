import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { getProfile } from "../../actions/peopleActions";

const mapStateToProps = state => {
  return { profile: state.profile.data.profile };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: id => {
      dispatch(getProfile(id));
    }
  };
};

class Profile extends Component {
  componentDidMount() {
    this.props.getProfile(1);
  }

  render() {
    return (
      <div>
        <div className="innermax padding-20">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 padding-top-20">
              <p>Welcome to the profile page, everyone can see this!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ConnectedProfile = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ConnectedProfile;
