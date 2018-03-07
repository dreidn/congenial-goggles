import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "style-loader!css-loader!react-table/react-table.css";

import _ from "lodash";

import { getPeople, getResourceId } from "../../actions/peopleActions";

const mapStateToProps = state => {
  return {
    people: state.people.data.people
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPeople: () => {
      dispatch(getPeople());
    }
  };
};

class Home extends Component {
  componentDidMount() {
    this.props.getPeople();
  }

  render() {
    const data = this.props.people || [];

    const rt_data = _.map(data, p => {
      const { id, url, name, birth_year } = p;
      return {
        filter: name,
        birth_year,
        name: (
          <Link
            to={{
              pathname: `/profile/${id}`
            }}
          >
            {name}
          </Link>
        )
      };
    });

    const columns = [
      { Header: "Name", accessor: "name" },
      { Header: "Birth Year", accessor: "birth_year" },
      { accessor: "filter", show: false }
    ];

    return (
      <div>
        <div className="innermax padding-20">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 padding-top-20">
              <ReactTable
                data={rt_data}
                columns={columns}
                defaultPageSize={10}
                showPagination={false}
                filterable={true}
                defaultFilterMethod={(filter, row) => {
                  return _.startsWith(
                    row.filter.toLowerCase(),
                    filter.value.toLowerCase()
                  );
                }}
                onPageChange={() => {
                  console.log("PAGE CHANGE!");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);
export default ConnectedHome;
