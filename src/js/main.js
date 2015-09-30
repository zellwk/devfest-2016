import React from 'react';

console.log('testing');

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hahahaha</h1>
        {/* {this.props.children} */}
      </div>
    );
  }
}

React.render(<App />, document.getElementById('app'));
