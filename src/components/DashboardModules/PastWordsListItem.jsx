import React from 'react';
import moment from 'moment';

export const PastWordsListItem = (props) => (
  <div className="past-games__list-item">{props.word}, {props.type}, {props.def}, {props.won ? 'won': 'lost'} on {moment(props.playedAt).format('MMMM Do, YYYY')}<br /><br /></div>
);

export default PastWordsListItem;
