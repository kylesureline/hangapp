import React from 'react';

export const PastWordsListItem = (props) => (
  <div>{props.word}, {props.wordType}, {props.def}</div>
);

export default PastWordsListItem;
