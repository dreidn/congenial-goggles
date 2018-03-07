import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import ReactTable from "react-table";
import "style-loader!css-loader!react-table/react-table.css";
import {
  ERROR,
  LOADING,
  SUCCESS,
  NOT_STARTED
} from "../../reducers/statusTypes";

import FilterTable from "../FilterTable";
import { getProfileByID, getStarship } from "../../actions/peopleActions";

const mapStateToProps = state => {
  return {
    status: state.profile.status,
    profile: state.profile.data.profile,
    starships: state.profile.data.starships
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: id => {
      return dispatch(getProfileByID(id));
    },
    getStarship: url => {
      return dispatch(getStarship(url));
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
    this.props.getProfile(this.props.match.params.id).then(res => {
      console.log(res);
      _.forEach(res.payload.starships, this.props.getStarship);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id != this.props.match.params.id) {
      this.props.getProfile(this.props.match.params.id).then(res => {
        console.log(res);
        _.forEach(res.payload.starships, this.props.getStarship);
      });
    }
  }

  renderProfileInfo() {
    if (this.props.status === SUCCESS) {
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
    const { status, starships } = this.props;
    if (status === SUCCESS && starships.length > 0) {
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
          <ReactTable
            data={data}
            columns={columns}
            minRows={data.length}
            showPagination={false}
          />
        </div>
      );
    } else if (status === SUCCESS) {
      return <div>{name} has no starships!</div>;
    } else {
      return undefined;
    }
  }

  render() {
    const { status } = this.props;

    const content =
      status === LOADING ? (
        <div>loading...</div>
      ) : (
        <div>
          {this.renderProfileInfo()}
          <h3>Starships</h3> {this.renderStarshipTable()}
        </div>
      );

    return (
      <div>
        <div className="innermax padding-20">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 padding-top-20">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ConnectedProfile = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ConnectedProfile;
