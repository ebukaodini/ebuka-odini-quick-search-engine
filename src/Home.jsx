import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Home extends Component {
  state = {
    hasError: false,
    errMsg: ""
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
      }
    }
  }

  handleSubmit = () => {
    try {
      this.setState({ hasError: false });
      let path = this.pathGet(this.a, document.getElementById('query').value);
      document.getElementById('path').innerText = path;
    } catch (error) {
      this.setState({ hasError: true, errMsg: error });
    }
  }

  pathGet = (a, query) => {
    try {
      if (query.length === 0) {
        throw new Error('Please enter query')
      }
      for (var prop in a) {
        let value = a.prop;
        if (typeof value === 'object') {
          this.pathGet(value, query);
        } else if (typeof value === 'string'){
          if (value === query) {
            return prop;
          }
        }
      }
    } catch (error) {
      throw error;
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
          <input type='search' id='query' />
          <input type='submit' value='Search' />
        </form>

        <div>
          <br />
          {
            this.state.hasError &&
            <span style={{ color: 'red' }}>
              {this.state.errMsg.toString()}
            </span>
          }
          <span id='path' style={{ color: 'green' }}></span>
        </div>
      </div>
    );
  }
}

export default Home;