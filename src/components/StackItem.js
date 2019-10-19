import React from 'react';

const StackItem = (props) => {
  return (
    <div className='stackItem'>
      <p className='stackText' id={props.listId}>{props.item}</p>
    </div>
  )
};

export default StackItem;