import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Home extends Component {
  state = {
    hasError: false,
    errMsg: "",
    path: "",
    query: "",
    pathFound: false
  }

  a = {
    user: {
      id: 1,
      name: {
        firstName: "James",
        lastName: "Ibori"
      },
      location: {
        city: "Ikoyi",
        state: "Lagos",
        address: "One expensive house like that"
      },
    }
  }

  handleSubmit = () => {
    try {
      let query = document.getElementById('query').value;
      let path = this.pathGet(this.a, query);
      this.setState({ hasError: false, query: query, pathFound: true, path: path });
    } catch (error) {
      this.setState({ hasError: true, errMsg: error });
    }
  }

  pathGet = (a, query) => {
    try {
      if (query.length === 0) {
        throw new Error('Please enter search query')
      }
      let path = this.traversePath(a, query, ['a']);
      if (path === undefined) {
        throw new Error('Path not found')
      } else {
        return path;
      }
    } catch (error) {
      throw error;
    }
  }

  traversePath = (object, query, path) => {
    for (var prop in object) {
      if (!object.hasOwnProperty(prop)) continue;
      let value = object[prop];

      if (typeof value === 'object') {
        path.push(prop);
        let traverse = this.traversePath(value, query, path);
        if (traverse === undefined) continue; else {
          return traverse;
        };
      } else {
        // eslint-disable-next-line eqeqeq
        if (value == query) { // eqeqeq was disabled to allow numbers and strings to pass
          path.push(prop);
          return path.join(".");
        }
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h4 style={{ margin: 0 }}>
            <img src={logo} className="App-logo" alt="logo" />
          QUICK SEARCH ENGINE
        </h4>
        </header>
        <p>Run a Quick Search</p>

        <form onSubmit={(e) => { e.preventDefault(); this.handleSubmit() }}>
          <input type='search' id='query' style={{ padding: '5px' }} />
          <input type='submit' value='Search' style={{ padding: '5px', }} />
        </form>

        <div>
          <br />
          {
            this.state.hasError === true ?
              <>
                <span style={{ color: 'red' }}>
                  {this.state.errMsg.toString()}
                </span>
                <br />
              </>
              :
              this.state.pathFound &&
              <>
                <span>
                  Path for <i>{this.state.query.toString()}</i> :
                </span>
                <br />
                <span style={{ color: 'lightgreen', }}>{this.state.path}</span>
              </>
          }
        </div>
      </div>
    );
  }
}

export default Home;