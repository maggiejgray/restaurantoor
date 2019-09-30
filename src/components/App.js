import React from 'react';
import axios from 'axios';
import Search from './Search';
import CheckList from './CheckList';

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
    this.handleSubmit = this.handleSubmit.bind(this);
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
    axios.get(`/restaurants?coordinates=${this.state.coordinates}`)
    .then((res) => {
      this.setState({
        restaurants: res.data
      })
    })
    .catch((err) => {
      console.error('Error getting restaurants:', err)
    })
  }

  handleSubmit(e) {
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
    
  }

  render() {
    return (
      <div id='body'>
        <h1>restaurantor</h1>
        { this.state.currentPage === 'landing' ? 
        <div>
          <Search id={'location'} onChange={this.handleLocationChange} onClick={this.handleSubmit}/>
        </div>
        :
        <div>
          <Search id={'keyword'} onChange={this.handleKeywordChange} onClick={this.handleSubmit}/>
          <CheckList restaurants={this.state.restaurants}/>
        </div>
        }
      </div>
    )
  }
};

export default App;

