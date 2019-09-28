import React from 'react';
import CheckListItem from './CheckListItem.js'

const CheckList = (props) => {
  return (
    <div id='restaurantList'>
      {/* map over props.results and invoke CheckListItem */}
      {props.restaurants.map((restaurant, key) => {
        return <CheckListItem restaurant={restaurant} key={key} selectItem={props.selectItem}/>
        // return <input type="checkbox" key={id} name={restaurant.name}></input>
      })}
    </div>
  )
};

export default CheckList;