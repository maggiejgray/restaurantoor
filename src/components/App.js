import React from 'react';
import Search from './Search';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      coordinates: '',
      searchTerm: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      location: e.target.value
    })
  }

  render() {
    return (
      <div id='body'>
        <h1>restaurantor</h1>
        <Search onChange={this.handleChange}/>
      </div>
    )
  }
};

export default App;

