import React from 'react';

const CheckListItem = (props) => {
  return (
    <div class='checklistItem'>
      <input type="checkbox" id="scales" name="scales"></input>
      <label for="scales">Scales</label>
    </div>
  )
};

export default CheckListItem;