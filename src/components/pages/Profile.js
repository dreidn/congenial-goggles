import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { getProfile } from "../../actions/peopleActions";

const mapStateToProps = state => {
  return { profile: state.profile.data.profile };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: url => {
      dispatch(getProfile(url));
    }
  };
};

class Profile extends Component {
  componentDidMount() {
    this.props.getProfile(this.props.location.state.profileURL);
  }

  render() {
    const {
      name,
      height,
      mass,
      hair_color,
      blond,
      eye_color,
      birth_year,
      gender
    } = this.props.location.state.profile;

    return (
      <div>
        <div className="innermax padding-20">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 padding-top-20">
              <h1>{name}</h1>
              <div>
                <div>Gender: {gender}</div>
                <div>Birth year: {birth_year}</div>
                <div>Height: {height}</div>
                <div>Mass: {mass}</div>
                <div>Hair color: {hair_color}</div>
                <div>Eye color: {eye_color}</div>
              </div>
              <div>{JSON.stringify(this.props.profile)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ConnectedProfile = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ConnectedProfile;
