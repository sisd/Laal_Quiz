import React, { Component } from 'react';
import './ViewPeople.css';

import {Link} from 'react-router-dom'

class AllGenre extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/allgenre/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    console.log(this.state.data)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Genre <Link to={'/NewGenre'}> Create more Genre</Link></h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Genre Name</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                    <tr key = {key}>
                        <td>{item.id}</td>
                        <td><Link to={"/AllQuiz/" + item.id}>{item.Name_of_Genre}</Link></td>
                    </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default AllGenre;
