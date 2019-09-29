import React from 'react';

const Search = (props) => {
  return (
    <>
      <input type='text' onChange={(e) => {props.onChange(e)}}></input>
      <input type='submit' value='Submit'></input>
    </>
  )
};

export default Search; 
