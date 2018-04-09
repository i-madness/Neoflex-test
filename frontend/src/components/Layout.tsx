import * as React from 'react';
const styles = require('./Layout.css');

class App extends React.Component {
  render() {
    return (
      <div className={styles.Layout}>
        <header className="App-header">
          <h1 className="App-title">Hello there</h1>
        </header>
        <p className="App-intro">
          General Kenobi?
        </p>
      </div>
    );
  }
}

export default App;
