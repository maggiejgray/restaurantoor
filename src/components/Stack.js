import React from 'react';
import StackItem from './StackItem';

const Stack = (props) => {
  return (
    <div>
      {props.selected.map((item) => {
        return (
          <StackItem item={item}/> 
        )
      })}
    </div>
  )
};

export default Stack;