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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectItem = this.selectItem.bind(this);
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
          {/* <Search id={'keyword'} onChange={this.handleKeywordChange} onClick={this.handleSubmit}/> */}
          <CheckList restaurants={this.state.restaurants} selectItem={this.selectItem}/>
          <Stack selected={this.state.selected}/>
        </div>
        }
      </div>
    )
  }
};

export default App;

