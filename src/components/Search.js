import React from 'react';

const Search = (props) => {
  return (
    <form id={`${props.id}Form`}>
      <input className='inputBox' type='text' placeholder={`Enter ${props.id}`} onChange={(e) => props.onChange(e)}></input>
      <input className='submitButton' type='submit' value='Submit' onClick={(e) => {props.onClick(e)}}></input>
    </form>
  )
};

export default Search; 
