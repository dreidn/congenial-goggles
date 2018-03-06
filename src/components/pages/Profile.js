import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { getProfileByID, getStarship } from "../../actions/peopleActions";

const mapStateToProps = state => {
  return {
    profile: state.profile.data.profile, // _.find(state.people.data.people, person => person.id == state.match)//state.profile.data.profile,
    starships: state.starships.data.starships
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: id => {
      return dispatch(getProfileByID(id));
    },
    getStarship: url => {
      dispatch(getStarship(url));
    }
  };
};

class Profile extends Component {
  constructor() {
    super();
    this.renderStarshipTable = this.renderStarshipTable.bind(this);
    this.renderProfileInfo = this.renderProfileInfo.bind(this);
  }

  componentDidMount() {
    this.props.getProfile(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (
      this.props.profile.starships.length > 0 &&
      this.props.starships.length <= 0
    ) {
      _.forEach(this.props.profile.starships, shipURL => {
        this.props.getStarship(shipURL);
      });
    }
  }
  renderProfileInfo() {
    if (this.props.profile) {
      const {
        name,
        height,
        mass,
        hair_color,
        blond,
        eye_color,
        birth_year,
        gender
      } = this.props.profile;

      return (
        <div>
          <h1>{name}</h1>
          <div>Gender: {gender}</div>
          <div>Birth year: {birth_year}</div>
          <div>Height: {height}</div>
          <div>Mass: {mass}</div>
          <div>Hair color: {hair_color}</div>
          <div>Eye color: {eye_color}</div>
          <br />
        </div>
      );
    } else {
      return undefined;
    }
  }

  renderStarshipTable() {
    const { starships } = this.props;
    console.log("render starships? ", starships);
    if (starships !== undefined && starships.length > 0) {
      let key = 0;

      const headerRows = (
        <tr key={key++}>
          <td>Name</td>
          <td>Model</td>
          <td>Length</td>
          <td>Cost in Credits</td>
          <td>Crew</td>
          <td>Hyperdrive rating</td>
        </tr>
      );

      const peopleRows = _.map(starships, ship => {
        return (
          <tr key={key++}>
            <td>{ship.name}</td>
            <td>{ship.model}</td>
            <td>{ship.length}</td>
            <td>{ship.cost_in_credits}</td>
            <td>{ship.crew}</td>
            <td>{ship.hyperdrive_rating}</td>
          </tr>
        );
      });

      return (
        <div>
          <h2>Starships</h2>
          <table>
            <tbody>
              {headerRows}
              {peopleRows}
            </tbody>
          </table>
        </div>
      );
    } else {
      return undefined;
    }
  }

  render() {
    return (
      <div>
        <div className="innermax padding-20">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 padding-top-20">
              {this.renderProfileInfo()}
              {this.renderStarshipTable()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ConnectedProfile = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ConnectedProfile;
