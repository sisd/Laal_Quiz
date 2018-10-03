import React, { Component } from 'react';
import './NewPerson.css';

import {Link} from 'react-router-dom'

class NewQuiz extends Component {
  constructor(params) {
    super(params);
    this.state = {
      formData: {
        Name_of_Quiz: "",
        id_genre: Number(params.match.params.id_genre),
      },
    }
    submitted: false,
    this.handleQChange = this.handleQChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/quiz/', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }

  handleQChange(event) {
    this.state.formData.Name_of_Quiz = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Person</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Quiz Name {this.state.formData.id_genre}</label>
                <input type="text" className="form-control" value={this.state.Name_of_Quiz} onChange={this.handleQChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              New quiz successfully added.
            </h2>
            <h2>
              <Link to={'/NewQuiz/' + this.state.formData.id_genre}>Create More Quiz</Link>
            </h2>
             This has been printed using conditional rendering.
          </div>
        }

      </div>
    );
  }
}

export default NewQuiz;
