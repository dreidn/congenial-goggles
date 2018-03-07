import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "style-loader!css-loader!react-table/react-table.css";
import _ from "lodash";

import FilterTable from "../FilterTable";
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

  componentDidMount() {
    if (this.props.status === NOT_STARTED) this.props.getPeople();
  }

  renderTable() {
    const { people, status } = this.props;
    if (status === ERROR) {
      return undefined;
    }
    const data = _.map(this.props.people || [], p => {
      const { id, url, name, birth_year } = p;
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
        showPagination={false}
        filterable={true}
        minRows={data.length}
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
    const { people, next, previous, count } = this.props;

    return (
      <div>
        <div className="innermax padding-20">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 padding-top-20">
              {this.renderTable()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);
export default ConnectedHome;
