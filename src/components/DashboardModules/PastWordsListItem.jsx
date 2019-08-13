import React from 'react';
import moment from 'moment';

export const PastWordsListItem = (props) => (
  <div>{props.word}, {props.type}, {props.def}, {props.won ? 'won': 'lost'} on {moment(props.playedAt).format('MMMM Do, YYYY')}<br /><br /></div>
);

export default PastWordsListItem;
