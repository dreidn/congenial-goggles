import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import ReactTable from "react-table";

import { getProfileByID, getStarship } from "../../actions/peopleActions";
import {
  ERROR,
  LOADING,
  SUCCESS,
  NOT_STARTED
} from "../../reducers/statusTypes";

const mapStateToProps = state => {
  return {
    status: state.profile.status,
    error: state.profile.error,
    profile: state.profile.data.profile,
    starships: state.profile.data.starships
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: id => {
      return dispatch(getProfileByID(id)).then(res => {
        _.forEach(res.payload.starships, shipURL => {
          dispatch(getStarship(shipURL));
        });
      });
    }
  };
};

class Profile extends Component {
  constructor() {
    super();
    this.renderStarshipTable = this.renderStarshipTable.bind(this);
    this.renderProfileInfo = this.renderProfileInfo.bind(this);
  }

  /*
    Get profile data on mount
  */
  componentDidMount() {
    this.props.getProfile(this.props.match.params.id);
  }

  /*
    Fetch new profile and update if the id url parameter changed.
  */
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id != this.props.match.params.id) {
      this.props.getProfile(this.props.match.params.id);
    }
  }

  /*
    Render profile info if profile status is SUCCESS, otherwise return undefined.
  */
  renderProfileInfo() {
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
        <h1 className="header">{name}</h1>
        <div className="profileBox">
          <div className="profileRow flex">
            <span>Gender:</span>
            <span>{gender}</span>
          </div>
          <div className="profileRow flex">
            <span>Birth Year:</span>
            <span>{birth_year}</span>
          </div>
          <div className="profileRow flex">
            <span>Height:</span>
            <span>{height}</span>
          </div>
          <div className="profileRow flex">
            <span>Mass:</span>
            <span>{mass}</span>
          </div>
          <div className="profileRow flex">
            <span>Hair Color:</span>
            <span>{hair_color}</span>
          </div>
          <div className="profileRow flex">
            <span>Eye Color:</span>
            <span>{eye_color}</span>
          </div>
        </div>
        <br />
      </div>
    );
  }

  /*
  Render table using starship data.
  */
  renderStarshipTable() {
    const { status, starships, profile } = this.props;
    const tableIsLoading =
      status.profile === SUCCESS &&
      this.props.profile.starships.length > starships.length;

    if (tableIsLoading || starships.length > 0) {
      const data = _.map(
        starships,
        ({ name, model, length, cost_in_credits, crew, hyperdrive_rating }) => {
          return {
            name,
            model,
            length,
            cost_in_credits,
            crew,
            hyperdrive_rating
          };
        }
      );

      const columns = [
        { Header: "Name", accessor: "name" },
        { Header: "Model", accessor: "model" },
        { Header: "Length", accessor: "length", maxWidth: 100 },
        { Header: "Cost in Credits", accessor: "cost_in_credits" },
        { Header: "Crew", accessor: "crew", maxWidth: 100 },
        {
          Header: "Hyperdrive Rating",
          accessor: "hyperdrive_rating",
          maxWidth: 180
        }
      ];

      return (
        <div>
          <ReactTable
            loading={tableIsLoading && this.props.status.starships != ERROR}
            noDataText={
              this.props.status.starships != ERROR
                ? ""
                : "Error loading starship data"
            }
            data={data}
            columns={columns}
            minRows={data.length}
            showPagination={false}
          />
        </div>
      );
    } else if (status.profile === SUCCESS && profile.starships.length === 0) {
      return <div>{this.props.profile.name} has no starships!</div>;
    }
  }

  /*
    Display a messsage while status is LOADING, otherwise attempt to render content
  */
  render() {
    const { status } = this.props;

    let content;
    if (status.profile === NOT_STARTED) {
      content = undefined;
    } else if (status.profile === LOADING) {
      content = <div>Loading...</div>;
    } else if (status.profile === ERROR) {
      content = <div>Error: could not fetch data</div>;
    } else {
      content = (
        <div>
          {this.renderProfileInfo()}
          <h2 className="header">Starships</h2> {this.renderStarshipTable()}
        </div>
      );
    }

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
