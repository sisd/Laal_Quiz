import React, { Component } from 'react';
import './ViewPeople.css';

import {Link} from 'react-router-dom'

class AllQuestion extends Component {
  constructor(params) {
    super(params);
    this.state = {
      id_quiz: params.match.params.id_quiz,
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/allquestion/'+this.state.id_quiz);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    console.log(this.state.data)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Question <Link to={'/NewQuestion/'+this.state.id_quiz}>Create more Question</Link></h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question Name</th>
              <th>Question</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                    <tr key = {key}>
                        <td>{item.id}</td>
                        <td>{item.Name_of_Question}</td>
                        <td>{item.question}</td>
                        <td>{item.option1}</td>
                        <td>{item.option2}</td>
                        <td>{item.option3}</td>
                        <td>{item.option4}</td>
                    </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default AllQuestion;
