import React from 'react';
import Roulette from './ReactWheel';
import CheckList from './CheckList';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'landing',
      location: '',
      coordinates: '',
      keyword: '',
      list: [],
      checked: [],
      chosen: {}
    }

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.handleWheelDecision = this.handleWheelDecision.bind(this);
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

  getLocation() {
    return axios.get(`/location?search=${this.state.location}`)
    .then((response) => {
      let lat = String(response.data.results[0].geometry.location.lat);
      let lng = String(response.data.results[0].geometry.location.lng);
      this.setState({
        coordinates: `${lat},${lng}`
      })
    })
    .catch((error) => {
      console.log('error getting location:', error);
    })
  }

  getRestaurants() {
    axios.get(`/restaurants?location=${this.state.coordinates}&keyword=${this.state.keyword}`)
    .then((response) => {
      this.setState({
        list: response.data
      })
    })
    .catch((error) => {
      console.log('error getting restaurant list:', error);
    });
  }

  // on submit
  handleSubmit(event) {
    event.preventDefault();
 
    if (!this.state.coordinates) {
      this.setState({
        currentPage: 'wheel'
      })
  
      this.getLocation()
      .then(() => {
        this.getRestaurants();
      })
      .catch((err) => {
        console.log('error getting initial list of restaurants:', err);
      })
    } else {
      this.getRestaurants();
    }
  }

  selectItem(e) {
    this.setState({
      checked: this.state.checked.concat([e.target.name])
    })
  }
  
  handleWheelDecision() {
    // send places details request using id
    // set state of selected
    // pop up modal with place details
  }

  render() {
    return (
      <div id='container'>
        <h1>restaurantor</h1>

        {this.state.currentPage === 'landing' ?
        <div id='landingPage'>
          <form id='locationSearch'>
            <label>Enter location:</label><br></br>
            <input type='text' id='location' onChange={this.handleLocationChange.bind(this)}></input>
            <input type='submit' value='Search' onClick={(e) => (this.handleSubmit(e))}></input>
          </form>
        </div>
        :
        <div id='wheelPage'>
          <form id='restaurantSearch'>
              <label>Add custom restaurants to wheel:</label><br></br>
              <input type='text' id='keyword' onChange={this.handleKeywordChange}></input>
              <input type='submit' value='Search'></input>
          </form>
          <CheckList restaurants={this.state.list} selectItem={this.selectItem}/>
          {this.state.checked.length ? <Roulette options={this.state.checked} /> : undefined}
          <Roulette />
        </div>
        }

        {/* <div id='decisionPage'>
          <h2>restaurant name here</h2>
          <p>display restuarant data here!</p>
        </div> */}
      </div>
    )
  }
};

export default App;

