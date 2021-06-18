import React from 'react';
import './App.css';
import {
  retrieveUserData
} from "./data/data_retriever.js";

class UserDisplay extends React.Component {
  render() {
    const info = this.props.info;
    const showInfo = this.props.showInfo;

    let display;

    if (showInfo) {
      if (info === undefined) {
        // User not found
        display = <p>User not found</p>;
      } else if (info.closed) {
        display = <p>User is closed</p>;
      } else {
        // Parse data and assign DOM elements
        let bulletRating = info.perfs.bullet.rating
        let blitzRating = info.perfs.blitz.rating;
        let rapidRating = info.perfs.rapid.rating;

        display = (
          <>
          <p>Bullet: {bulletRating}</p>
          <p>Blitz: {blitzRating}</p>
          <p>Rapid: {rapidRating}</p>
          </>
        );
      }
    } else {
      display = null;
    }

    return (
      <div className="App-user-display">{display}</div>
    );
  }
}

class UserController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userInfo: undefined,
      // Set to true after user searches a LiChess profile
      showUserInfo: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  handleClick() {
    let userInfo;

    retrieveUserData(this.state.username)
      .then(info => {
        userInfo = info;
        this.setState({
          userInfo: userInfo,
          showUserInfo: true
        });
      });
  }

  render() {
    return (
      <>
      <form className="App-search">
        <input
          className="App-search-text"
          type="text"
          placeholder="Search user"
          onChange={this.handleChange}
        />
        {/* type="button" prevents site from refreshing */}
        <button
          className="App-submit"
          type="button"
          onClick={_ => this.handleClick()}>
          <i className="fas fa-search"></i>
        </button>
      </form>
      <UserDisplay
        info={this.state.userInfo}
        showInfo={this.state.showUserInfo}
      />
      </>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: "No user info"
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>LiChess Profile Viewer</h1>
        </header>
        <div>
          {/* Render search bar and ratings */}
          <UserController />
        </div>
      </div>
    );
  }
}

export default App;
