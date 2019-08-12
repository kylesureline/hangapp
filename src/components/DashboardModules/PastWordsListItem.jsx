import React from 'react';

export const PastWordsListItem = (props) => (
  <div>{props.word}, {props.type}, {props.def}</div>
);

export default PastWordsListItem;
