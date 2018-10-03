import React, { Component } from 'react';
import './NewPerson.css';

import {Link} from 'react-router-dom'

class NewQuestion extends Component {
  constructor(params) {
    super(params);
    this.state = {
      formData: {
        Name_of_Question: "",
        question: "",
        id_quiz: Number(params.match.params.id_quiz),
      },
      submitted: false,
    }
    this.handleQChange = this.handleQChange.bind(this);
    this.handleNChange = this.handleNChange.bind(this);
    this.handleO1Change = this.handleO1Change.bind(this);
    this.handleO2Change = this.handleO2Change.bind(this);
    this.handleO3Change = this.handleO3Change.bind(this);
    this.handleO4Change = this.handleO4Change.bind(this);
    this.handleAChange = this.handleAChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/question/', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }

  handleQChange(event) {
    this.state.formData.question = event.target.value;
  }
  handleO1Change(event) {
    this.state.formData.option1 = event.target.value;
  }
  handleO2Change(event) {
    this.state.formData.option2 = event.target.value;
  }
  handleO3Change(event) {
    this.state.formData.option3 = event.target.value;
  }
  handleO4Change(event) {
    this.state.formData.option4 = event.target.value;
  }
  handleAChange(event) {
    this.state.formData.answer = Number(event.target.value);
  }
  handleNChange(event) {
    this.state.formData.Name_of_Question = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Question</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Question Name</label>
                <input type="text" className="form-control" value={this.state.Name_of_Question} onChange={this.handleNChange}/>
            </div>
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.question} onChange={this.handleQChange}/>
            </div>
            <div className="form-group">
                <label>Option 1</label>
                <input type="text" className="form-control" value={this.state.option1} onChange={this.handleO1Change}/>
            </div>
            <div className="form-group">
                <label>Option 2</label>
                <input type="text" className="form-control" value={this.state.option2} onChange={this.handleO2Change}/>
            </div>
            <div className="form-group">
                <label>Option 3</label>
                <input type="text" className="form-control" value={this.state.option3} onChange={this.handleO3Change}/>
            </div>
            <div className="form-group">
                <label>Option 4</label>
                <input type="text" className="form-control" value={this.state.option4} onChange={this.handleO4Change}/>
            </div>
            <div className="form-group">
                <label>Answer</label>
                <input type="int" className="form-control" value={this.state.answer} onChange={this.handleAChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              New question successfully added.
               <Link to={'/NewQuestion/' + this.state.formData.id_quiz}>Create more Questions</Link>
            </h2>
             This has been printed using conditional rendering.
          </div>
        }

      </div>
    );
  }
}

export default NewQuestion;
