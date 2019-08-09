import React from 'react';
import { connect } from 'react-redux';
import PastWordsListItem from './PastWordsListItem.jsx';

export const PastWordsList = (props) => (
  <div>
    {
      props.pastWords.length === 0 ? (
        <div>No past games available</div>
      ) : (
        props.pastWords.map((word) => {
          return <PastWordsListItem key={word} {...word} />
        })
      )
    }
  </div>
);

const mapStateToProps = (state) => ({
  pastWords: state.pastWords || []
});

export default connect(mapStateToProps)(PastWordsList);
