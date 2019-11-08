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

