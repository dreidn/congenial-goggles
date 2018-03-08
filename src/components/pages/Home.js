import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import _ from "lodash";

import {
  getPeople,
  getAllPeople,
  getResourceId
} from "../../actions/peopleActions";
import {
  ERROR,
  LOADING,
  SUCCESS,
  NOT_STARTED
} from "../../reducers/statusTypes";

const mapStateToProps = state => {
  return {
    people: state.people.data.people,
    status: state.people.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPeople: () => {
      dispatch(getAllPeople());
    }
  };
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.renderTable = this.renderTable.bind(this);
  }

  /*Fetch people data upon starting, use already fetched data if it exists*/
  componentDidMount() {
    if (this.props.status === NOT_STARTED) this.props.getPeople();
  }

  /*
    Build and return react table component using people data. Returns undefined if status is NOT_STARTED
    or ERROR.
  */
  renderTable() {
    const { people, status } = this.props;
    if (status === NOT_STARTED || status === ERROR) {
      return;
    }
    const data = _.map(this.props.people || [], ({ id, name, birth_year }) => {
      return {
        birth_year,
        name,
        id
      };
    });

    const columns = [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ original }) => (
          <Link
            to={{
              pathname: `/profile/${original.id}`
            }}
          >
            {original.name}
          </Link>
        )
      },
      { Header: "Birth Year", accessor: "birth_year", filterable: false }
    ];

    return (
      <ReactTable
        noDataText={""}
        loading={status === LOADING}
        data={data}
        columns={columns}
        filterable={true}
        showPagination={false}
        minRows={10}
        pageSize={data.length}
        defaultFilterMethod={(filter, row) => {
          const id = filter.pivotId || filter.id;
          return _.startsWith(
            row[id].toLowerCase(),
            filter.value.toLowerCase()
          );
        }}
      />
    );
  }

  render() {
    const { status } = this.props;
    let content;
    if (status === NOT_STARTED) {
      content = undefined;
    } else if (status === ERROR) {
      content = <div>Error: could not fetch data</div>;
    } else {
      content = this.renderTable();
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

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);
export default ConnectedHome;
