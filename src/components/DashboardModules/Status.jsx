import React from 'react';
import { hasLocalStorageSupport } from '../../utils/utils';

export class Status extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      online: navigator.onLine
    }
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick = () => {
    this.setState({
      online: navigator.onLine
    });
  };
  render() {
    const online = this.state.online;
    const localStorageSupport = hasLocalStorageSupport();
    const hasCache = !!localStorage.getItem('cachedWords');

    return (
      <div>
        <h3>Status</h3>
        <p>{online ? 'Online' : 'Offline'}</p>
        {/* Online */}
        {online && <p>New definitions will be fetched from <a href="https://www.merriam-webster.com">m-w.com</a>.</p>}
        {(online && localStorageSupport) && <p>Words and definitions will be cached for offline gameplay</p>}
        {online && <p>Completed games will be saved to account</p>}
        {/* Offline */}
        {(!online && hasCache) && <p>Words, word types, and definitions will come from local cache</p>}
        {(!online && !hasCache) && <p>No definitions or word types will be provided</p>}
        {(!online && localStorageSupport) && <p>Completed games will be cached locally</p>}
      </div>
    );
  }
}

export default Status;
