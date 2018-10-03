import React, { Component } from 'react';
import './ViewPeople.css';

import {Link} from 'react-router-dom'

class AllQuiz extends Component {
  constructor(params) {
    super(params);
    this.state = {
      id_genre: params.match.params.id_genre,
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/allquiz/'+this.state.id_genre);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    console.log(this.state.data)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Quiz <Link to={"/NewQuiz/"+this.state.id_genre}>Create more Quiz {this.state.id_genre} </Link></h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Quiz Name</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                    <tr key = {key}>
                        <td>{item.id}</td>
                        <td><Link to={"/AllQuestion/" + item.id} >{item.Name_of_Quiz}</Link></td>
                    </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default AllQuiz;
