import React from 'react';
import { hasWordsInLocalStorage, hasPastGamesInLocalStorage } from '../../utils/utils';

export class CachePieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cachedWords: hasWordsInLocalStorage() ? JSON.parse(localStorage.getItem('cachedWords')).length : 0,
      pastGames: hasPastGamesInLocalStorage() ? JSON.parse(localStorage.getItem('pastGames')).length : 0
    };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 2000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick = () => {
    this.setState({
      cachedWords: hasWordsInLocalStorage() ? JSON.parse(localStorage.getItem('cachedWords')).length : 0,
      pastGames: hasPastGamesInLocalStorage() ? JSON.parse(localStorage.getItem('pastGames')).length : 0
    });
  };
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
