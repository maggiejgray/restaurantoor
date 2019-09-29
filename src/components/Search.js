import React from 'react';

const Search = (props) => {
  return (
    <>
      <input type='text' onChange={(e) => {props.onChange(e)}}></input>
      <input type='submit' value='Submit' onClick={(e) => {props.onClick(e)}}></input>
    </>
  )
};

export default Search; 
