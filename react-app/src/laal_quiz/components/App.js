import React, { Component } from 'react';
import Home from './Home';
import NewGenre from './NewGenre';
import NewQuiz from './NewQuiz';
import NewQuestion from './NewQuestion';
import AllGenre from './AllGenre';
import AllQuiz from './AllQuiz';
import AllQuestion from './AllQuestion';
import NewUser from './NewUser';
import AllUser from './AllUser';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/NewUser'}>Register Here</Link></li>
                  <li><Link to={'/AllUser'}>All Users</Link></li>
                  <li><Link to={'/NewGenre'}>Add New Genre</Link></li>
                  <li><Link to={'/AllGenres'}>Show All Genres</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/NewGenre' component={NewGenre} />
            	   <Route exact path='/NewQuiz/:id_genre' component={NewQuiz} />
                 <Route exact path='/NewQuestion/:id_quiz' component={NewQuestion} />
                 <Route exact path='/AllGenres' component={AllGenre} />
                 <Route exact path='/AllQuiz/:id_genre' component={AllQuiz} />
                 <Route exact path='/AllQuestion/:id_quiz' component={AllQuestion} />
                 <Route exact path='/NewUser' component={NewUser} />
                 <Route exact path='/AllUser' component={AllUser} />
      </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
