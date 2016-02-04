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
import MultipeerConnectivity from 'react-native-multipeer';
import styles from './stylesheet';

var REQUEST_URL = 'http://localhost:3000'
var POST_NEW_GAME = '/games'

class BoardEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {board: new Board(), letterPath: ''};
  }

  swap(gameId) {
      MultipeerConnectivity.advertise('channel1', {name: 'User-' + Math.round(Math.random() * 1e6)});
    console.log('now advertising...');
    this.props.navigator.replace({
      id: 'WaitingPage',
      gameId: gameId,
      player: this.state.player,
      peer: this.props.peer
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
      this.setState({
        player: responseData.player
      })
      this.swap(responseData.gameId);
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
        <Text style={styles.boardInstructions}>
        Set your dot pattern and submit when ready.
        </Text>
        <View>
          {rows}
        </View>
        <TouchableHighlight onPress={this.postNewGame.bind(this)}>
          <Text style={styles.boardButton}>
            Submit Board
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = BoardEntry;
