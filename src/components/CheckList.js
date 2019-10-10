import React from 'react';
import CheckListItem from './CheckListItem'

const CheckList = (props) => {
  return (
    <div id='restaurantList'>
      {props.restaurants.map((restaurant) => {
        return <CheckListItem restaurant={restaurant} key={restaurant.place_id} selectItem={props.selectItem} unselectItem={props.unselectItem}/>
      })}
    </div>
  )
};

export default CheckList;