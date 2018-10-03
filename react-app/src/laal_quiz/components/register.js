import React, { Component } from 'react';
import './NewPerson.css';

import {Link} from 'react-router-dom'
ID uint `json:"id"`
Firstname string `json:"firstname"`
Lastname string `json:"lastname"`
Username string `json:"username"`
Password string `json:"password"`
Password_salt string `json:"password_salt"`
Admin int `json:"admin"`
class NewUser extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        admin: "",
      },
      submitted: false,
    }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleAChange = this.handleAChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/user/', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }

  handleFChange(event) {
    this.state.formData.firstname = event.target.value;
  }
  handleLChange(event) {
    this.state.formData.lastname = event.target.value;
  }
  handleUChange(event) {
    this.state.formData.username = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }
  handleAChange(event) {
    this.state.formData.Admin = Number(event.target.value);
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Register</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Genre</label>
                <input type="text" className="form-control" value={this.state.firstname} onChange={this.handleFChange}/>
                <input type="text" className="form-control" value={this.state.lastname} onChange={this.handleFChange}/>
                <input type="text" className="form-control" value={this.state.username} onChange={this.handleFChange}/>
                <input type="text" className="form-control" value={this.state.password} onChange={this.handleFChange}/>
                <input type="text" className="form-control" value={this.state.admin} onChange={this.handleFChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              New user successfully added
            </h2>
            <h2>
              <Link to={"/NewUser"}>Register New User</Link>
            </h2>
             This has been printed using conditional rendering.
          </div>
        }

      </div>
    );
  }
}

export default NewGenre;
