import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import ReactTable from "react-table";
import "style-loader!css-loader!react-table/react-table.css";

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
      const data = _.map(starships, ship => {
        const {
          name,
          model,
          length,
          cost_in_credits,
          crew,
          hyperdrive_rating
        } = ship;
        return {
          name,
          model,
          length,
          cost_in_credits,
          crew,
          hyperdrive_rating
        };
      });

      const columns = [
        { Header: "Name", accessor: "name" },
        { Header: "Model", accessor: "model" },
        { Header: "Length", accessor: "length" },
        { Header: "Cost in Credits", accessor: "cost_in_credits" },
        { Header: "Crew", accessor: "crew" },
        { Header: "Hyperdrive Rating", accessor: "hyperdrive_rating" }
      ];

      return (
        <div>
          <h3>Starships</h3>{" "}
          <ReactTable
            data={data}
            columns={columns}
            showPagination={false}
            defaultPageSize={data.length + 4}
          />
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
