import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import _ from "lodash";

import { getPeople } from "../../actions/peopleActions";

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
    let key = 0;

    const headerRows = (
      <tr key={key++}>
        <td>Name</td>
        <td>Birth Year</td>
      </tr>
    );
    const peopleRows = _.map(data, p => {
      return (
        <tr key={key++}>
          <td>
            <Link
              to={{
                pathname: "/profile",
                search: `?id=${p.name}`,
                state: { profileURL: p.url, profile: p }
              }}
            >
              {p.name}
            </Link>
          </td>
          <td>{p.birth_year}</td>
        </tr>
      );
    });

    return (
      <div>
        <div className="innermax padding-20">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 padding-top-20">
              <p>Welcome to the home page, everyone can see this!</p>
              <table>
                <tbody>
                  {headerRows}
                  {peopleRows}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);
export default ConnectedHome;
