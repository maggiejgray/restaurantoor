import React from 'react';

const StackItem = (props) => {
  return (
    <div class='stackItem'>
      <p class='stackText'>{props.item}</p>
    </div>
  )
};

export default StackItem;