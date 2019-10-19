import React from 'react';
import axios from 'axios';
import Search from './Search';
import CheckList from './CheckList';
import Stack from './Stack';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'landing',
      location: '',
      coordinates: '',
      keyword: '',
      restaurants: [],
      selected: []
    }

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.getGeoCoordinates = this.getGeoCoordinates.bind(this);
    this.getRestaurants =this.getRestaurants.bind(this);
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    this.handleKeywordSubmit = this.handleKeywordSubmit.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.makeDecision = this.makeDecision.bind(this);
  }

  handleLocationChange(e) {
    this.setState({
      location: e.target.value
    })
  }

  handleKeywordChange(e) {
    this.setState({
      keyword: e.target.value
    })
  }

  getGeoCoordinates() {
    return axios.get(`/location?searchedLoc=${this.state.location}`)
    .then((res) => {
      this.setState({
        coordinates: res.data
      })
      return res.data;
    })
    .catch((err) => {
      console.error('Error getting geo coordinates:', err)
    })
  }

  getRestaurants() {
    axios.get(`/restaurants?coordinates=${this.state.coordinates}&keyword=${this.state.keyword}`)
    .then((res) => {
      this.setState({
        restaurants: res.data
      })
    })
    .catch((err) => {
      console.error('Error getting restaurants:', err)
    })
  }

  handleLocationSubmit(e) {
    e.preventDefault();

    this.setState({
      currentPage: 'decision'
    })

    this.getGeoCoordinates()
    .then(() => {
      this.getRestaurants()
    })
    .catch((err) => {
      console.error('Error handling submit:', err)
    })

    document.getElementById('locationForm').reset();
  }

  handleKeywordSubmit(e) {
    e.preventDefault();

    this.getRestaurants();

    document.getElementById('keywordForm').reset();
  }

  selectItem(e) {
    !this.state.selected.includes(e.target.name) ?
      this.setState({
        selected: this.state.selected.concat(e.target.name)
      })
    :
      this.setState({
        selected: this.state.selected.filter((item) => {
          return item !== e.target.name
        })
      })
  }

  makeDecision(e) {
    e.preventDefault();

    // declare variable to decide length of animation (random between 7 and 15)
    // let animationTime = getRandomInt(5, 15);

    // function getRandomInt(min, max) {
    //   min = Math.ceil(min);
    //   max = Math.floor(max);
    //   return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    // }

    let increment = 200;
    
    // FIX THIS TERRIBLE TIME COMPLEXITY WHEN TIME ALLOWS!!!
    while (200 <= increment <= 2000) {
      for (let i = 0; i < this.state.selected.length; i++) {

        // for (let j = 0; j !== i && j < this.state.selected.length; j++) {
        //   console.log('!!!!!!!!!', document.getElementsByClassName('stackText'));
        //   document.getElementsByClassName('stackText').style.display = none;
        // }

        console.log('!!!', document.getElementById(this.state.selected[i]));
        document.getElementById(this.state.selected[i]).style.display = 'inline';
        
        setTimeout(() => {}, increment);
      }

      increment = increment + 200;
    }

    // get currently displayed element and pop up modal
    // iterate through selected at slowing speeds for x amount of seconds

    //   change style of <p> of all of elements other than current to display: none
    

    // on decision, use key/placeID to getRestaurantDetails()
  }

  getRestaurantDetails() {
    axios.get(`/restaurantDetails?placeID=`)
    .then((res) => {
      // add details for modal (name, number, website, $, rating)
    })
    .catch((err) => {
      console.error('Error getting restaurant details:', err)
    })
  }

  render() {
    return (
      <div id='body'>
        <h1>restaurantOr</h1>
        { this.state.currentPage === 'landing' ? 
        <div id='landingContainer'>
          <Search id={'location'} onChange={this.handleLocationChange} onClick={this.handleLocationSubmit}/>
        </div>
        :
        <div id='decisionContainer'>
          <Search id={'keyword'} onChange={this.handleKeywordChange} onClick={this.handleKeywordSubmit}/>
          <CheckList restaurants={this.state.restaurants} selectItem={this.selectItem}/>
          {this.state.selected.length ? <Stack selected={this.state.selected} onClick={this.makeDecision}/> : null}
        </div>
        }
      </div>
    )
  }
};

export default App;

