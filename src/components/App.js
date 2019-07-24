import React from 'react';
import Roulette from './ReactWheel';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'landing',
      location: '',
      keyword: '',
      list: [],
      checked: [],
      chosen: {}
    }

    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleLocationChange(e) {
    this.setState({
      location: e.target.value
    });
  }

  
  handleKeywordChange(e) {
    this.setState({
      location: e.target.value
    })
  }
  
  // on submit
  handleSubmit() {
    // axios get to /api/restaurants

    // on response map results to create an array of name, id and setState of list
  }

  selectItem() {
    // on click of checkboxes, add tuple to selected with name,id
  }
  
  handleWheelDecision() {
    // send places details request using id
    // set state of selected
    // pop up modal with place details
  }

  render() {
    return (
      <div id='container'>
        <div id='landingPage'>
          <h1>restaurantor</h1>
          <form id='locationSearch'>
            <label>Enter location:</label><br></br>
            <input type='text' id='location' onChange={this.handleLocationChange}></input>
            <input type='submit' value='Search'></input>
          </form>
        </div>

        <div id='wheelPage'>
          <form id='restaurantSearch'>
              <label>Add custom restaurants to wheel:</label><br></br>
              <input type='text' id='restaurant' onChange={this.handleKeywordChange}></input>
              <input type='submit' value='Search'></input>
          </form>
          <Roulette />
        </div>

        {/* <div id='decisionPage'>
          <h2>restaurant name here</h2>
          <p>display restuarant data here!</p>
        </div> */}
      </div>
    )
  }
};

export default App;

