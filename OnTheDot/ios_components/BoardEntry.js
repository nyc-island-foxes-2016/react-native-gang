'use strict';

import React, {
  Component,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Board from './Board';
import Dot from './Dot';

var REQUEST_URL = 'http://localhost:3000'
var POST_NEW_GAME = '/games'

class BoardEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {board: new Board(), letterPath: ''};
  }

  swap() {
    this.props.navigator.replace({
      id: 'WaitingPage'
    });
  }

  postNewGame() {
    fetch(REQUEST_URL + POST_NEW_GAME, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        body: JSON.stringify({
          player: 'Game-' + Math.round(1e6 * Math.random()),
          board: this.state.letterPath
        })
      })
    .then((response) => response.json())
    .then((responseData) => {
      this.swap();
    });
  }

  handleDotClick(row: number, col: number, letter: char) {
    if(this.state.board.isClicked(row, col)) {
      return;
    }

    var letterPath = this.state.letterPath;

    this.setState({
      board: this.state.board.mark(row, col),
      letterPath: letterPath + letter
    });
  }

  render() {
    var letterSet = ['D', 'C', 'B', 'A'];

    var rows = this.state.board.grid.map((dots, row) =>
      <View key={row} style={styles.row}>
        {dots.map((clicked, col) =>
          <Dot
            key={col}
            clicked={clicked}
            onPress={this.handleDotClick.bind(this, row, col, letterSet.pop())}/>
        )}
      </View>
    );

    return (
      <View style={styles.container}>
        <View>
          {rows}
        </View>
        <TouchableHighlight onPress={this.postNewGame.bind(this)}>
          <Text style={styles.welcome}>
            Post your board!
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    padding: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  dot: {
    height: 60,
    width: 60,
    margin: 60,
    borderRadius: 30,
  },
  clickedDot: {
    backgroundColor: '#DA8',
    borderColor: '#642',
    borderStyle: 'solid',
    borderWidth: 4
  },
  unclickedDot: {
    backgroundColor: '#ABC',
    borderColor: '#456',
    borderStyle: 'solid',
    borderWidth: 4
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = BoardEntry;
