import React from 'react';

export class CachePieChart extends React.Component {
  constructor(props) {
    super(props);

    const dummyData = {
      cachedWords: [
        {
          word: 'cynic',
          type: 'noun',
          def: 'a faultfinding captious critic; especially : one who believes that human conduct is motivated wholly by self-interest'
        },
        {
          word: 'happy',
          type: 'adjective',
          def: 'favored by luck or fortune'
        },
        {
          word: 'friendly',
          type: 'adjective',
          def: 'of, relating to, or befitting a friend: such as'
        }
      ],
      pastGames: [
        {
          word: 'jazz',
          type: 'noun',
          def: 'American music developed especially from ragtime and blues and characterized by propulsive syncopated rhythms, polyphonic ensemble playing, varying degrees of improvisation, and often deliberate distortions of pitch and timbre',
          guessedCorrectly: true
        },
        {
          word: 'piano',
          type: 'adverb',
          def: 'at a soft volume : SOFT —used as a direction in music',
          guessedCorrectly: false
        }
      ]
    };

    localStorage.setItem('cachedWords', JSON.stringify(dummyData.cachedWords));
    localStorage.setItem('pastGames', JSON.stringify(dummyData.pastGames));

    const hasCachedWords = !!localStorage.getItem('cachedWords');
    const hasPastGames = !!localStorage.getItem('pastGames');
    this.state = {
      cachedWords: hasCachedWords ? JSON.parse(localStorage.getItem('cachedWords')).length : 0,
      pastGames: hasPastGames ? JSON.parse(localStorage.getItem('pastGames')).length : 0
    };
  }
  render() {
    return (
      <div>
        <h3>Device Storage</h3>
        <p>Cached Words: {this.state.cachedWords}</p>
        <p>Past Games: {this.state.pastGames}</p>
      </div>
    );
  }
};

export default CachePieChart;
