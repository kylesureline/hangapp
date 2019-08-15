import React from 'react';
import moment from 'moment';

export const PastWordsListItem = (props) => (
  <div className="list-item">
    <div className="list-item__word-group">
      <h3 className="list-item__title"><a href={`https://www.merriam-webster.com/dictionary/${props.word}/`} target="_blank">{props.word}</a> <span className="list-item__subtitle list-item__subtitle--word-type">({props.type})</span></h3>
      <p className="list-item__subtitle">{props.def}</p>
    </div>
    <h3 className="list-item__data">{props.won ? 'Won': 'Lost'} on {moment(props.playedAt).format('MMMM Do, YYYY')}</h3>
  </div>
);

export default PastWordsListItem;
