import React from 'react';

const CheckListItem = (props) => {
  return (
    <div className='checklistItem'>
      <input 
        type="checkbox" 
        name={props.restaurant.name} 
        onClick={(e) => {props.selectItem(e)}}
        >
      </input>
      <label>{props.restaurant.name}</label><br></br>
    </div>
  )
};

export default CheckListItem;