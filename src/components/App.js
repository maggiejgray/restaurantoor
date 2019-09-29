import React from 'react';
import Search from './Search';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      coordinates: '',
      searchTerm: ''
    }

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.getGeoCoordinates = this.getGeoCoordinates.bind(this);
  }

  handleLocationChange(e) {
    this.setState({
      location: e.target.value
    })
  }

  handleSearchTermChange(e) {
    this.setState({
      searchTerm: e.target.value
    })
  }

  getGeoCoordinates() {
    axios.get(`/location?searchedLoc=${this.state.location}`)
    .then((res) => {
      this.setState({
        coordinates: res.data
      })
    })
    .catch(() => {

    })
  }

  render() {
    return (
      <div id='body'>
        <h1>restaurantor</h1>
        <Search onChange={this.handleLocationChange} onClick={this.getGeoCoordinates}/>
      </div>
    )
  }
};

export default App;

