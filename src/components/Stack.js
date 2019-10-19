import React from 'react';
import StackItem from './StackItem';

class Stack extends React.Component {
  constructor(props)  {
    super(props);

    this.state = {

    }
  }

  // set all but one to display: none
  // iterate through which is showing
  // start loop fast and make it slower
  // set animation length
  // whichever is diplayed at that time, display modal

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

  render() {
    return (
      <div id='stack'>
        {this.props.selected.map((item, index) => {
          return (
            <StackItem item={item} key={item} listId={item}/> 
          )
        })}
        <button onClick={(e) => {this.props.onClick(e)}}>Decide!</button>
      </div>
    )
  }
}

export default Stack;