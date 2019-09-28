import React from 'react';

const CheckListItem = (props) => {
  return (
    <div class='checklistItem'>
      <input 
        type="checkbox" 
        key={props.key} 
        name={props.restaurant.name} 
        onClick={(e) => {props.selectItem(e)}}
        >
      </input>
      <label>{props.restaurant.name}</label><br></br>
    </div>
  )
};

export default CheckListItem;