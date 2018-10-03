import React, { Component } from 'react';
import './ViewPeople.css';

import {Link} from 'react-router-dom'

class AllUser extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/alluser/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    console.log(this.state.data)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All User<Link to={'/NewUser'}> Create more User</Link></h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                    <tr key = {key}>
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.admin}</td>
                    </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default AllUser;
